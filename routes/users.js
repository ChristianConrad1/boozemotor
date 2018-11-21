var express = require('express');
var router = express.Router();
var game = require('../gamelogic/game');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = "trutzi123";
var Game = new game();

router.post('/login', function(req, res, next) {
  let name = req.body.name;
  Game.addPlayer(name, (id) => {
    const token = jwt.sign({
      data: {
        "id": id,
        "name": name
      }
    }, secret, {
      expiresIn: '5h'
    });
    res.send(token);
  });

})
router.get('/game', function(req, res, next) {
  res.render('game', {
    title: 'Boozemotor'
  });
});

router.get('/myMoney', (req, res, next) => {
  let playerID = checkToken(req);
  if (playerID != null) {
    let money = Game.players[playerID].money;
    res.send(money);
  }
});

router.get('/myCards', (req, res, next) => {
  let playerID = checkToken(req);
  if (playerID != null) {
    let myCards = Game.players[playerID].cards;
    console.log(myCards);
    res.send(myCards);
  }
});

router.get('/topCard', (req, res, next) => {
  res.send(Game.topCard);
});


router.post('/bet', (req, res, next) => {
  let money = parseInt(req.body.value);
  let playerID = checkToken(req);

  if (playerID != null && money != null) {
    Game.bet(playerID, money, (callback) => {
      res.sendStatus(callback);
    });
  }
})


function checkToken(req) {
  const token = req.headers['x-access-token'];
  var decoded = jwt.verify(token, secret);
  return decoded.data.id;
}

module.exports = router;