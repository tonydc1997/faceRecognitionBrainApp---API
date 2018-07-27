const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'de99c3789e5b40439fb7bc3c59213f8b'
 });

 const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Sorry, unable to work with API'))
 }

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}