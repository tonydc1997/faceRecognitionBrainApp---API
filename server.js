const express = require('express');

const app = express();

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
