const router = require('express').Router();

router.get('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', {  });
});

module.exports = router;
