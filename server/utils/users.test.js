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

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove the user', () => {
    let userId = '10';
    let user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should not find the user', () => {
    var userId = '21' ;
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should  find the user', () => {
    var userId = '2' ;
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should return names of Node boys', () => {
    var userList = users.getUserList('Node boys');

    expect(userList).toEqual(['Lol', 'Lolki']);
  });
});
