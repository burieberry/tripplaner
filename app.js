const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swig = require('swig');
swig.setDefaults({ cache: false });

const models = require('./models');
const Hotel = require('./models').models.Hotel,
      Restaurant = require('./models').models.Restaurant,
      Activity = require('./models').models.Activity;

const app = express();
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jQuery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

let config = process.env;
try {
  config = require('./env.json');
}
catch (ex) {

}
app.use((req, res, next) => {
  res.locals.GOOGLE_API_KEY = config.GOOGLE_API_KEY;
  next();
});

app.get('/', (req, res, next) => {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
    ])
    .then(([ hotels, restaurants, activities ]) => {
      return res.render('index', { hotels, restaurants, activities });
    })
    .catch(next);
});

app.use((req, res, next)=> {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next)=> {
  res.status(err.status || 500).render('error', { error: err });
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

// models.sync()
//   .then(()=> {
//     app.listen(port, ()=> {
//       console.log(`listening on port ${port}`);
//     });
//   });
