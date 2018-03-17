const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'hola@gmail.com',
  //   text: 'Hey, where are you',
  //   createAt: 12
  // });

  socket.emit('newMessage', {
    from: 'Evo',
    text: 'Hope this is better',
    createdAt: 12
  });

// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });

socket.on('createMessage', (message) => {
  console.log('new Message',message );
});

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//console.log(publicPath);
