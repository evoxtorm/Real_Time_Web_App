const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
     return callback('Name and room name are required');
  }


  socket.join(params.room);
  users.removeUser(socket.id);
  users.addUser(socket.id, params.name, params.room);


  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
  callback();
});



socket.on('createMessage', (message, callback) => {
  // console.log('new Message',message );
  var user = users.getUser(socket.id);


  if (user && isRealString(message.text)) {
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
  }

  callback();
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });
});

socket.on('createLocationMessage', (coords) => {
  var user = users.getUser(socket.id);

  if (user) {
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  }
});

  socket.on('disconnect', () => {
    // console.log('User was Disconnected');
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//console.log(publicPath);
