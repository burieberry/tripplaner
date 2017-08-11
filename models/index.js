const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Foo = conn.define('foo', {});

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Foo
  }
};
