const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  const errorResponse = err => {
    res.status(400).json('Sorry! Something went wrong');
  };
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        errorResponse;
      }
    })
    .catch(errorResponse);
};

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, book } = req.body.formInput;
  const errorResponse = err => {
    res.status(400).json('There was an update error');
  };
  db('users')
    .where({ id })
    .update({ name, age, book })
    .then(resp => {
      if (resp) {
        res.json('Success!');
      } else {
        errorResponse;
      }
    })
    .catch(errorResponse);
};

module.exports = {
  handleProfileGet,
  handleProfileUpdate,
};
