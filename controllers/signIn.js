 const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("Sorry, incorrect form submission");
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); 
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject("Unable to get user"))
      } else {
        Promise.reject("Wrong credentials");
      }
    })
    .catch(err => Promise.reject("Wrong credentials")) 
}

const getAuthTokenId = () => {
  console.log('auth is A-OK');
}

const signInAuthentication = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId() :
    handleSignIn(req, res, db, bcrypt)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
}

module.exports = {
  signInAuthentication
}
