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

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

const getAllModels = () => {
  let data = {};

  return Hotel.findAll()
    .then(hotels => {
      data.hotels = hotels;
      return Restaurant.findAll()
    })
    .then((restaurants) => {
      data.restaurants = restaurants;
      return Activity.findAll()
    })
    .then((activities) => {
      data.activities = activities;
      return data;
    });
}



const sync = () => {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  getAllModels,
  models: {
    Place,
    Hotel,
    Activity,
    Restaurant
  }
};
