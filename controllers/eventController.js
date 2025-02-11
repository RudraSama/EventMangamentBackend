const Event = require("../models/Event");
const { uploadToCloudinary } = require("../config/cloudinary");

const createEvent = async(req, res)=>{
    try {
        
        const imageUrl = await uploadToCloudinary(req.files.event_banner[0]);

        const newEvent = new Event({
            eventName: req.body.event_name,
            eventDescription: req.body.event_description,
            eventCategory: req.body.event_category,
            eventDate: new Date(req.body.event_date),
            eventLocation: req.body.event_location,
            eventBannerUrl: imageUrl,
        });

        await newEvent.save();
        res.status(201).json({ message: "Event Created Successfully!", event: newEvent });

    } catch (error) {
        console.error("Error Creating Event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const getEvents = async(req, res)=>{
    try {
        const { category, startDate, endDate } = req.query;
        let filter = {};

        // Filter by category
        if (category) {
            filter.eventCategory = category;
        }

        // Filter by date range
        if (startDate && endDate) {
            filter.eventDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const events = await Event.find(filter).sort({ eventDate: -1 });
        res.json(events);

    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const getEvent = async(req, res)=>{
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const registerAttendie = async(req, res)=>{
    try{
        const user_id = req.body.user_id;
        const event = await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({ message: "Event not found" });
        }

        console.log(user_id);

        if(!user_id){
            return res.status(401).json({message: "User not found"});
        }
        
        let attendies = event.eventAttendies;
        attendies.push(user_id);

        let set = new Set(attendies);
        attendies = [];
        attendies = [...set];

        event.eventAttendies = attendies;
        await event.save();

        res.status(201).json({message: "Registered for the Event"});
    }
    catch(error){
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const unregisterAttendie = async(req, res)=>{
    try{
        const user_id = req.body.user_id;

        if(!user_id){
            return res.status(401).json({message: "User not found"});
        }
        await Event.findByIdAndUpdate(req.params.id,
            {$pull: { eventAttendies: user_id}},
            {new: true}
        );

        res.status(201).json({message: "UnRegistered for the Event"});
    }
    catch(error){
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {createEvent, getEvents, getEvent, registerAttendie, unregisterAttendie};

