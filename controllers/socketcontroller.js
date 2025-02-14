import Message from "../models/messages.js";
// 

export default function socketcontroller(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // server listens emitted event from client
    socket.on("joinRoom", (username) => {
      try {
        socket.join(username);
        console.log(`${username} joined the chatRoom`);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("sendMessage", (newMessage) => {
      try {
        const msg = new Message(newMessage);
        

        // emit this message to the receiver's socket room
        io.to(newMessage.receiver).emit("receiveMessage", msg);
      } catch (error) {
        console.error(error);
      }
    });
  });
}
