const express = require('express');
const path = require('path');
const swig = require('swig');
swig.setDefaults({ cache: false });
const models = require('./models');

const app = express();
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next)=> {
  res.render('index');
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
models.sync()
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`);
    });
  });
