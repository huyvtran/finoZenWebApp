angular.module('myApp', ['ngRoute','myApp.services','myApp.directives','myApp.controllers','ngMessages','ngResource','ngStorage','ui.router','ui.bootstrap'])

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
       

;   
});
