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
}

module.exports = {
  handleProfileGet
}