var socket = io();

function scrollBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = messages.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //console.log('Should scroll');
    messages.scrollTop(scrollHeight);
  }
}

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
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // console.log('New message', message);
//
//   var li = jQuery('<li></li>');
//   li.text(`${message.from} ${formattedTime} : ${message.text}`);
//
//   jQuery('#messages').append(li);
 });


socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();


  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
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

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser. ');
  }

locationButton.attr('disabled', 'disabled').text('Sending location..');

navigator.geolocation.getCurrentPosition(function (position) {
  // console.log(position);
  locationButton.removeAttr('disabled').text('Send location');
  socket.emit('createLocationMessage', {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}, function () {
    locationButton.removeAttr('disabled').text('Send location');
  alert('Unable to fetch the location');
  });
});