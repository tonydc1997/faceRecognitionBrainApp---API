const { getAuthTokenId } = require('../controllers/signIn');
const { createSessions } = require('../controllers/signIn');

const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return Promise.reject('Sorry, incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  return db
    .transaction(trx => {
      trx
        .insert({
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
            .then(user => user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => Promise.reject('Sorry! Unable to register.'));
};

const registerAuthentication = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleRegister(req, res, db, bcrypt)
        .then(data => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = {
  registerAuthentication,
};
