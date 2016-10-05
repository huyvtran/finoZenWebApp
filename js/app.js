angular.module('myApp', ['ngRoute','myApp.services','myApp.directives','myApp.controllers','ngMessages','ngIdle','ngResource','ngStorage','ui.router','ui.bootstrap'])
.config(function(IdleProvider, KeepaliveProvider) {
  IdleProvider.idle(10*60); // 10 minutes idle
  IdleProvider.timeout(10); // after 30 seconds idle, time the user out
  KeepaliveProvider.interval(5*60); // 5 minute keep-alive ping
})
.run(function($rootScope,$state) {
    $rootScope.$on('IdleTimeout', function() {
        // end their session and redirect to login
        $state.go('home');
    });
})
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'templates/login.html',
		controller:'AuthSigninCtrl'
	})
	.state('tabsController', {
		url: '/summary',
		templateUrl: 'templates/tabsController.html',
		controller: 'withdrawCtrl'
	})
	        
     .state('sliders', {
    url: '/sliders',
    templateUrl: 'templates/slides.html',
    controller: ''
    })
    .state('signup', {
      url: '/page8',
      templateUrl: 'templates/signup.html'
    })
     .state('forgot_pin', {
    url: '/forgot_pin',
    templateUrl: 'templates/forgot_password.html',
    controller: 'forgotPinCtrl'
    })
          .state('faq', {
      url: '/faq',         
          templateUrl: 'templates/faq.html',
          controller: ''     
    })
          .state('faq5', {
      url: '/faq_fundsMethods',         
          templateUrl: 'templates/faq5.html',
          controller: 'FundsMethodCtrl'     
    })
          .state('faq1', {
      url: '/faq_account',         
          templateUrl: 'templates/faq1.html',
          controller: 'AccountfaqCtrl'     
    })
          .state('faq2', {
      url: '/faq_add',         
          templateUrl: 'templates/faq2.html',
          controller: 'AddMoneyCtrl'     
    })
          .state('faq3', {
      url: '/faq_withdraw',         
          templateUrl: 'templates/faq3.html',
          controller: 'WithdrawMoneyCtrl'     
    })
          .state('faq4', {
      url: '/faq_others',         
          templateUrl: 'templates/faq4.html',
          controller: 'OthersCtrl'     
    })  
        
        .state('account', {
            url: '/account',
            templateUrl: 'templates/account.html'
        })
        
                
        .state('aboutUs', {
            url: '/aboutUs',
            templateUrl: 'templates/aboutUs.html'
        })
       
    .state('invest', {
      url: '/invest',         
          templateUrl: 'templates/invest.html'

    })  

    .state('withdraw', {
      url: '/withdraw',         
          templateUrl: 'templates/withdraw.html',
          controller: 'withdrawCtrl'     
    }) 
     .state('successPage', {
    url: '/success',
    templateUrl: 'templates/payment_success.html'
    })
       

;   
});
