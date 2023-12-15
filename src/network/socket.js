import { io } from "socket.io-client";

import { createContext, useContext, useEffect } from 'react';



const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = io('http://localhost:3000'); 
socket.on('connect',()=>{
    console.log(`you connected with id:${socket.id}`)
})
socket.emit('custom-event',10,'Hi',{a:'a'})// send an event to the server
    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
