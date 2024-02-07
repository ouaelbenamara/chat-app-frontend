
export const setUpNetwork =(socket,user,io)=>{
    socket = io("http://localhost:5000");
    socket.emit("setup", user?._id);
    return socket
} 
export const handleRecieveMessage = (socket,)=>{
  const {message,sender} = socket.on("recieve-message", (message, sender) => {
        return {message,sender}
        // console.log('Recieved message:',message);
        // setMessages(prev => ([...prev, { sender, content: message }]))
    });
    return {message,sender}
}
export const joinRoom = (socket,roomId)=>{
    socket.emit('join-room',{roomId})

}