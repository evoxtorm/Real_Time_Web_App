var expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage', () => {
  it('should gnerate correct message object', () => {
    var from = 'Hit';
    var text = 'hey yo';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
