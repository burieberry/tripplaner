const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const Place = conn.define('place', {
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
});

const Hotel = conn.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.FLOAT
  },
  amenities: {
    type: Sequelize.STRING
  }
});

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Place,
    Hotel
  }
};
