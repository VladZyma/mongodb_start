const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { connectToDb, getDb } = require('./db');

const PORT = 3000;

const app = express();

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`Listening port ${PORT}`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error: ${err}`);
  }
});

const handleError = (res, error) => {
  res.status(500).json({error});
}

app.get('/movies', (req, res) => {
  const movies = [];

  db
  .collection('movies')
  .find()
  .sort({title: 1})
  .forEach(movie => movies.push(movie))
  .then(() => {
    res.status(200).json(movies);
  })
  .catch(() => handleError(res, 'Something went wrong....'));
});

app.get('/movies/:id', (req, res) => {
  const {id} = req.params;

  if (ObjectId.isValid(id)) {
    db
      .collection('movies')
      .findOne({ _id: new ObjectId(id)})
      .then((doc) => {
        res.status(200).json(doc)
      })
      .catch(() => handleError(res, 'Something went wrong....'));
  } else {
    handleError(res, 'Wrong id');
  }

});

app.delete('/movies/:id', (req, res) => {
  const {id} = req.params;

  if (ObjectId.isValid(id)) {
    db
      .collection('movies')
      .deleteOne({_id: new ObjectId(id)})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => handleError(res, 'Something went wrong....'));
  } else {
    handleError(res, 'Wrong id');
  }
})