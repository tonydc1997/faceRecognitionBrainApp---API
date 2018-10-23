const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI);

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

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized.");
    }
    return res.json({id: reply})
  })
}

const signToken = (id) => {
  const jwtPayload = { id };
  return jwt.sign(jwtPayload, process.env.JWT_S, { expiresIn: '2 days' });
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
}

const createSessions = (user) => {
  // Create JWT Token, return user data
  const { id, email } = user;
  const token = signToken(id);
  return setToken(token, id)
    .then(() => {
      return {
      success: 'true', userId: id, token: token }
    })
    .catch(console.log);
}

const signInAuthentication = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) :
    handleSignIn(req, res, db, bcrypt)
      .then(data => {
        return data.id && data.email ? createSessions(data) :
          Promise.reject(data);
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
}

module.exports = {
  signInAuthentication
}
