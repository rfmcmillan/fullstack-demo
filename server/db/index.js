const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy] = await Promise.all(
      ['moe', 'larry', 'lucy'].map((user) => User.create({ name: user }))
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { syncAndSeed, models: { User } };
