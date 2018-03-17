var socket = io();


socket.on('connect', function () {
  console.log('connected to server');

// socket.emit('createEmail', {
//   to: 'evo@outlook.com',
//   text: 'Hey, this is important message'
// });

// socket.emit('createMessage', {
//   from:'Hitesh',
//   text: 'We recieved your message'
// });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
