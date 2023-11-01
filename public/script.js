// import { io } from 'node_modules/socket.io/client-dist/socket.io.js';

const socket = io('http://localhost:3001');

socket.on('chat-message', (data) => {
    console.log(data);
});