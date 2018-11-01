const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
  const errorResponse = err => {
    res.status(400).json('Sorry, unable to work with API');
  };
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(errorResponse);
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  const errorResponse = err => {
    res.status(400).json('Unable to get entries');
  };
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(errorResponse);
};

module.exports = {
  handleImage,
  handleApiCall,
};
