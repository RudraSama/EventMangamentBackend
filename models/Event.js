const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    eventBannerUrl: { type: String, required: true }, 
    eventCategory: { type: String, required: true },
    eventAttendies: {type: Array, required: false}
});

module.exports = mongoose.model("Event", EventSchema);
