const router = require('express').Router();
const db = require('../models');

router.get('/', function(req, res, next) {
  db.getAllModels()
    .then(models => {
      console.log(models.get());
      res.render('index', { models });
    })
    .next();
});

module.exports = router;
