const redisClient = require('../controllers/signIn').redisClient;
const getAuthTokenId = require('../controllers/signIn').getAuthTokenId;
const signToken = require('../controllers/signIn').signToken;
const setToken = require('../controllers/signIn').setToken;
const createSessions = require('../controllers/signIn').createSessions;

const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('Sorry, incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
        hash,
        email,
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('Sorry! Unable to register.'));
};

const registerAuthentication = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res)
    : handleRegister(req, res, db, bcrypt)
        .then(data => {
          return data.id && data.email ? createSessions(data)
            : Promise.reject(data);
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = {
  registerAuthentication,
};
