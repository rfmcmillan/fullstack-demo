const express = require('express');
const app = express();
const path = require('path');
const {
  conn,
  syncAndSeed,
  models: { User },
} = require('./db');

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '../index.html'))
);

app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
