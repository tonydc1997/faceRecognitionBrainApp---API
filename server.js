const express = require('express');

const app = express();

const database = {
  users: [
    {
      id: '001',
      name: 'John',
      email: 'john@gmail.com',
      password: '0000',
      entries: 0,
      joined: new Date()
    },
    {
      id: '002',
      name: 'Doe',
      email: 'doe@gmail.com',
      password: '0001',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send('This is working!');
})

app.post('/signIn', (req, res) => {
  res.send('signing in...');
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signIn --> POST = success / fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
