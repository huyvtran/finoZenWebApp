

var confirmation=0;
angular.module('myApp', ['ngRoute','myApp.services','myApp.directives','myApp.controllers','ngMessages','ngIdle','ngResource','ngStorage','ui.router','ui.bootstrap','ngDialog','angularSpinner','naif.base64'])

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
    .state('bank', {
    url: '/bank',         
        templateUrl: 'templates/bank.html',
        controller: ''     
    }) 
     .state('questions', {
      url: '/questions',         
          templateUrl: 'templates/questions.html',
          controller: ''     
    })
    
    .state('signup', {
      url: '/signup',
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
    .state('panImage', {
      url: '/panImage',         
          templateUrl: 'templates/panImage.html'

    })  
    .state('selfiImage', {
      url: '/selfiImage',         
          templateUrl: 'templates/selfiImage.html'

    })  
    .state('addressSelect', {
      url: '/addressSelect',         
          templateUrl: 'templates/addressSelect.html'

    })  
    .state('addressFrontImage', {
      url: '/addressFrontImage',         
          templateUrl: 'templates/addressFrontImage.html'

    })  
    .state('backFrontImage', {
      url: '/backFrontImage',         
          templateUrl: 'templates/backFrontImage.html'

    })  
    .state('signature', {
      url: '/signature',         
          templateUrl: 'templates/signature.html'

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
    .state('change_password', {
    url: '/change_password',
    templateUrl: 'templates/change_password.html'
    })   
    .state('mutualFund', {
      url: '/mutualFund',         
          templateUrl: 'templates/mutualFund.html'   
    })  
   .state('inactiveClient', {
      url: '/inactiveClient',         
          templateUrl: 'templates/inactiveClient.html'
    })
  
    .state('status', {
      url: '/status',
      templateUrl: 'templates/status.html',
    })
        
    .state('activeClientStatus', {
      url: '/activeClientStatus',         
          templateUrl: 'templates/activeClientStatus.html'
})
   .state('verifySuccess', {
      url: '/verifySuccess',         
          templateUrl: 'templates/success.html'
    })

;   
});
