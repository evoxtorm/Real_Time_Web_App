const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin to Welcome to the chat app


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

socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    callback('Name and room name are required');
  }


  socket.join(params.room);



  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));


  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
  callback();
});



socket.on('createMessage', (message, callback) => {
  console.log('new Message',message );
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback();
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });
});

socket.on('createLocationMessage', (coords) => {
  io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//console.log(publicPath);
