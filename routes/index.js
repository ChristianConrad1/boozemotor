var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Boozemotor'
  });
});

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Boozemotor'
  });
});

module.exports = router;