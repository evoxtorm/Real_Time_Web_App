const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {

var users;

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Lol',
    room: 'Node boys'
  }, {
    id: '2',
    name: 'Lol0',
    room: 'Node girls'
  }, {
    id: '3',
    name: 'Lolki',
    room: 'Node boys'
  }];
});

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id : '123',
      name: 'Hitesh',
      room: 'developer'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names of Node boys', () => {
    var userList = users.getUserList('Node boys');

    expect(userList).toEqual(['Lol', 'Lolki']);
  });
});
