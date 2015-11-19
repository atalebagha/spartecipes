angular.module('recipes', [
  'recipes.services',
  'recipes.recipes',
  'recipes.search',
  'recipes.auth',
  'recipes.signup',
  'ui-router',
  'ui.bootstrap'
])
.config(function($routeProvider,  $httpProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: '/',
      template: 'app/views/main.html',
      controller: 'HeaderController',
      data: {
        requireLogin: false
      }
    })
    .state('main.recipes', {
      url: '/recipes',
      template: 'app/views/recipes-grid.html',
      controller: 'SearchController',
      parent: 'main',
      data: {
        requireLogin: false
      }
    })
    .state('main.recipes.details', {
      url: '/recipes/:recipe',
      template: 'app/views/recipe-detail.html',
      parent: 'main.recipes',
      data: {
        requireLogin: false
      }
    })
    .state('main.login', {
      url: '/login',
      template: 'app/login/login.html',
      controller: 'AuthController',
      parent: 'main',
      data: {
        requireLogin: false
      }
      // child state of `app`
      // requireLogin === true
    })
    .state('main.signup', {
      url: '/signup',
      template: 'app/signup/signup.html',
      controller: 'AuthController',
      parent: 'main',
      data: {
        requireLogin: false
      }
      // child state of `app`
      // requireLogin === true
    })
    .state('main.list', {
      url: '/list',
      template: '/shoppinglist/shoppinglist.html',
      controller: 'ShoppinglistController',
      parent: 'main',
      data: {
        requireLogin: true
      }
    })
    .state('main.logout', {
      url: '/logout',
      controller: 'AuthController',
      parent: 'main',
    });
})

// we will use this when we implement jwt
//
.factory('AttachTokens', function ($window) {

  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('spartanShield');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});
// .run(function ($rootScope, $location, Auth) {
//   $rootScope.$on('$stateChangeStart',
//     function(event, toState, toParams, fromState, fromParams){
//       if(toState.data.requireLogin && !Auth.isAuth()) {
//         $location.path('/');
//       }
//   })
// });
