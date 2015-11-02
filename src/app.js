var app = window.angular.module('app', [])

app.factory('pokemonApi', pokemonApi)
app.controller('mainCtrl', mainCtrl)
app.value('gifLinks', [
  {
    name: 'Vaporean',
    url: 'http://31.media.tumblr.com/00d4fafe23890d4a225944f1096226e5/tumblr_msokgenSrz1scncwdo1_500.gif'
  },
  {
    name: 'Muk',
    url: 'http://38.media.tumblr.com/e4d3d0ea3669b8764cda27e8f25f61a7/tumblr_mg698yWDjL1rmu6i5o1_500.gif'
  },
  {
    name: 'Dratini',
    url: 'https://33.media.tumblr.com/89a227df27d59599b5af3685c25a0726/tumblr_mit9amvdp11qa0wpjo1_500.gif'
  },
  {
    name: 'Cindaquill',
    url: 'http://25.media.tumblr.com/tumblr_mdyr86lwWe1qgd7tso1_500.gif'
  }
])

function pokemonApi ($http) {

  var API_ROOT = 'pokemon'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },

    add: function (data) {
      return $http
        .post(API_ROOT, data)
        .then(function (resp) {
          return resp.data
        })
    }
  }

}

function mainCtrl ($scope, pokemonApi, gifLinks) {

  $scope.links = gifLinks
  $scope.addPokemon = addPokemon

  pokemonApi.get().then(setPokemon)

  function addPokemon (form) {
    pokemonApi.add({
      url: form.url
    }).then(setPokemon)

    form.url = ''
  }

  function setPokemon (data) {
    $scope.pokemon = data
  }

}
