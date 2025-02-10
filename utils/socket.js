const socketIo = require('socket.io');
let io; 

let events = {};

const initSocket = (server)=>{
    io = socketIo(server, {
        cors: {
            origin: "*",  // Update with your frontend URL
            methods: ["GET", "POST"],
          }
    });


    io.on('connection', (socket) => {

        socket.on('joinEvent', (data) => {

            console.log(`${data.user_id} joined event ${data.event_id}`);

            if(!data.user_id || !data.event_id){
                return;
            }


            if (!events[data.event_id]) {
                events[data.event_id] = new Set();
            }

            events[data.event_id].add(data.user_id);  

            io.emit('eventUpdated', { event_id: data.event_id, count: events[data.event_id].size});
        });

        socket.on('leaveEvent', (data) => {
      
            if (events[data.event_id]) {
                events[data.event_id].delete(data.user_id);

                io.emit('eventUpdated', { event_id: data.event_id, count: events[data.event_id].size});
            }
        });
    });
}
module.exports = {initSocket,  getIo: () => io};
