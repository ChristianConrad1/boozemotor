var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Boozemotor'
  });
});

router.post('/login', function(req, res, next) {
  res.render('game', {
    title: 'Boozemotor',
    name: req.body.name
  });
})

module.exports = router;