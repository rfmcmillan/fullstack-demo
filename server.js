const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
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

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_db'
);

const User = db.define('user', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const [moe, larry, lucy] = await Promise.all(
      ['moe', 'larry', 'lucy'].map((user) => User.create({ name: user }))
    );
  } catch (error) {
    console.log(error);
  }
};

init();
