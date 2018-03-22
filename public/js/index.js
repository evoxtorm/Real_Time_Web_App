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
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');


  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Hitesh',
//   text: 'hey'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();
  // event.stopPropagation();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser. ');
  }

navigator.geolocation.getCurrentPosition(function (position) {
  // console.log(position);
  socket.emit('createLocationMessage', {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}, function () {
  alert('Unable to fetch the location');
});
});
