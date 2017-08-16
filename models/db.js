const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost:5432/tripplanner_db', {
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
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT
  },
  amenities: {
    type: Sequelize.JSON
  }
});

const Activity = conn.define('activity', {
  name: {
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  }
});

const Restaurant = conn.define('restaurant', {
  name: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.JSON
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = {
  models: {
    Place,
    Hotel,
    Activity,
    Restaurant
  }
}
