const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Sorry! Not found.')
      }
    })
    .catch(err => res.status(400).json('Sorry! There was a problem getting the user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req. params;
  const { name, age, book } = req.body.formInput;
  db('users')
    .where({ id: id })
    .where({ name: name })
    .then(resp => {
      if (resp) {
        res.json('Success!');
      } else {
        res.status(400).json('Unable to update');
      }
    })
    .catch(err => res.status(400).json('Error updating user'));
}

module.exports = {
  handleProfileGet, 
  handleProfileUpdate
}