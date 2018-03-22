const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin to Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));


  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // socket.emit('newEmail', {
  //   from: 'hola@gmail.com',
  //   text: 'Hey, where are you',
  //   createAt: 12
  // });

  // socket.emit('newMessage', {
  //   from: 'Evo',
  //   text: 'Hope this is better',
  //   createdAt: 12
  // });

// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });

socket.on('createMessage', (message, callback) => {
  console.log('new Message',message );
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback('This is from the server');
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });
});

socket.on('createLocationMessage', (coords) => {
  io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
});

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//console.log(publicPath);
