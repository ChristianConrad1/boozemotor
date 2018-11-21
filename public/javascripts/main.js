$(document).ready(function() {
  if (sessionStorage.getItem('jwt') == null) {
    sessionStorage.setItem("jwt", "123");
  }
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('x-access-token', sessionStorage.getItem('jwt'));
    }
  });

  $(document).on('click', '#loginButton', (e) => {
    e.preventDefault();
    let form = $('#loginform');
    var url = "/users/login"
    var formData = {};
    $(form).find("input[name]").each(function(index, node) {
      formData[node.name] = node.value;
    });
    $.post(url, formData).done(function(jwt) {
      sessionStorage.setItem("jwt", jwt);

      window.location.href = "/users/game";
    });
  });

  showTopCard();

  $(document).on('click', '#myCards', () => {
    $('section').hide();
    $('#cardList').empty();
    $.get('/users/myCards', (data) => {
      data.forEach((card) => {
        $('#cardList').append(getCard(card));
      })
    })
    $('#cards').show();
  })

  $(document).on('click', '#topCard', () => {
    showTopCard();
  })

  $(document).on('click', '#myMoney', () => {
    $('section').hide();
    $('#moneyList').empty();
    $.get('/users/myMoney', (data) => {
      data.forEach((money) => {
        $('#moneyList').append(getMoneyCard(money));
      })
    })
    $('#money').show();
  })

  $(document).on('click', '.moneyCard', (e) => {
    var url = "/users/bet"
    let formData = {};
    formData['value'] = e.target.id
    $.post(url, formData, () => {
      showTopCard();
    })
  });

  function showTopCard() {
    $('section').hide();
    $('#game').empty();
    $.get('/users/topCard', (data) => {
      $('#game').append(getTopCard(data));
    })
    $('#game').show();
  }

  function getTopCard(card) {
    let thumb = "👍";
    let quantity_needed = "🃏";
    if (card.goal === "low") {
      thumb = "👎";
    }
    for (i = 1; i < card.quantity_needed; i++) {
      quantity_needed += "🃏";
    }
    return `
    <div class="col s12">
    <div class="boozecard green darken-2 z-depth-4">
      <div class="boozecard-top">
        <h2 class="boozecard-title">${card.name}</h2>
        <div class="boozecard-rightside">
        <span class="boozecard-needed">${quantity_needed}</span>
        <span class="boozecard-goal">${thumb}</span>
        </div>
      </div>
      <div class="boozecard-center ">
      </div>
      <div class="boozecard-bottom">
        <span class="boozecard-text">${card.text}</span>
        <span class="boozecard-total">${card.quantity_total}x</span>
      </div>
    </div>
  </div>
  `
  }


  function getMoneyCard(number) {
    return `
    <div class="col s3">
      <div class="card-panel teal moneyCard" id="${number}">
        <span class="white-text">
        ${number}
        </span>
      </div>
    </div>
  `
  }

  function getCard(card) {
    return `
    <div class="col s6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">${card.name}</span>
        <p>${card.text}</p>
      </div>
      <div class="card-action">
      </div>
    </div>
    </div>
  `
  }





})