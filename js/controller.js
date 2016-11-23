
angular.module('myApp.controllers', [])
    .controller('summaryPageCtrl', function($scope,$state,$timeout,$sessionStorage) {
		$scope.signout=function(){
      //location.reload();
            clevertap.logout();
      $sessionStorage.SessionClientCode="none";
      $timeout(function() {location.reload();}, 10);
      $state.go('home');
    }
	})

.controller('navTabsCtrl', ['$scope','$state', function ($scope,$state) {
    $scope.navTabs = [{
            title: 'PROFILE',
            url: 'account'
        }, {
            title: 'ABOUT US',
            url: 'aboutUs'
        }, {
            title: 'FAQ',
            url: 'faq'
    }];

    $scope.currentTab = 'templates/summaryTab.html';

    $scope.onClickTab = function (tab) {
        $state.go(tab.url);
    }
    $scope.defaultTab = function () {
      $state.go('tabsController');
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}])
.controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Summary',
            url: 'templates/summaryPage.html'
        }, {
            title: 'Calculator',
            url: 'templates/calculator.html'
        }, {
            title: 'Transactions',
            url: 'templates/recentTransactions.html'
    }];

    $scope.currentTab = 'templates/summaryPage.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}])

	.controller('withdrawCtrl', function($scope,$sessionStorage,getReportService,$state,$interval,$rootScope,$timeout,loadSpin,ngDialog) {
  if($sessionStorage.instaAmount>=0){$scope.insta=$sessionStorage.instaAmount;}
else{$scope.insta=0;}
  	if($sessionStorage.clientType=="GO"){
		$scope.schemeNamep = "GOLD";
	}
	else if($sessionStorage.clientType=="PL") {
		$scope.schemeNamep = "PLATINUM";
  }

$scope.faq = function(){$state.go('faq')}
$scope.policy = function()
{
	//window.open('http://finozen.com/policy.html','_self');
	var ref = window.open('http://finozen.com/policy.html','_blank');
  //$ionicHistory.goBack(-1);
}
$scope.terms = function()
{
	//window.open('http://finozen.com/t&c.html','_self');
	var ref = window.open('http://finozen.com/t&c.html','_blank');
  //$ionicHistory.goBack(-1);

}

  $scope.clientName= $sessionStorage.SessionClientName;
  $scope.clientMobile= $sessionStorage.SessionMobNo;
$scope.xirrRate= function(){

	if($sessionStorage.xirr == null){return 0;}
	else if($sessionStorage.xirr <= 0){return 0;}
	else if($sessionStorage.xirr >= 15){return 15;}
	else if($sessionStorage.xirr <= 6.5){return 6.5;}
	else{return $sessionStorage.xirr;}
}
  $scope.balance= function() {
    if ($sessionStorage.mktValue == null) {
      return 0;
    }
    else {
      return $sessionStorage.mktValue;
    }
  }
    $scope.investAmount= function(){
    if($sessionStorage.netInv == null){return 0;}

    else {return $sessionStorage.netInv;
    }
  }
	$scope.gainToday=function(){
		if($sessionStorage.gainToday == null){return 0;}
		else {return $sessionStorage.gainToday;
		}
	}
	$scope.netGain=function(){
		if($sessionStorage.gainTotal == null){return 0;}
		else {return $scope.balance()-$scope.investAmount();
		}
	}
	$scope.gainMonth=function(){
		if($sessionStorage.gainMonth == null){return 0;}
		else {return $sessionStorage.gainMonth;
		}
	}
	console.log('entered');


         var Report = getReportService.get();
         Report.$promise.then(function(data){
         if(data.responseCode=="Cali_SUC_1030"){
         $scope.products=data.jsonStr;

 
         }
         })

    $interval(function () {
      $timeout(function(){
        $rootScope.$broadcast('flip',{});
      },4000)
      
    },5000);

      $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    })


    .controller('loginChech',function($scope,$sessionStorage,$state){
      console.log("$sessionStorage.SessionClientCode   "+ $sessionStorage.SessionClientCode);
      if($sessionStorage.SessionClientCode=="none" || $sessionStorage.SessionClientCode==undefined){$state.go('home');}
    })
.controller('popupController', function($scope,$window) {
// Triggered on a button click, or some other target

})

	.controller('calculatorCtrl', function($scope,$timeout,$sessionStorage) {
		$scope.returnsAmount=0;
		$scope.errorInputs="";
		$scope.clearValues=function(){
			$scope.investmentAmount='';
			$scope.returnsAmount='';
			$scope.totalDays='';
		}
		$scope.calculateValues=function(){
			var count=0;
			var investAmount=$scope.investmentAmount;
			var returnsAmount=$scope.returnsAmount;
			var totalDays=$scope.totalDays;
			console.log(returnsAmount , investAmount);
			
  	if($sessionStorage.clientType=="GO"){
		$scope.averageRate=7.0;
	}
	  else if($sessionStorage.clientType=="PL") {
	  $scope.averageRate=8.0;
    }
			var constant=$scope.averageRate/(365*100);
			if(investAmount==undefined){count++}
			if(totalDays==undefined){count++}
			if(count>=2){
				$scope.errorInputs="You should enter atleast two inputs";
					$timeout(function(){
						$scope.errorInputs="";
					},5000)
			}
			else{
				$scope.errorInputs="";

					returnsAmount=(Math.ceil(investAmount*constant*totalDays*100))/100;

                //clevertap calculator information for that client
                clevertap.event.push("calculator", {
                    "name":$sessionStorage.name,
                    "portofiolioNo":$sessionStorage.SessionPortfolio,
                    "amount tried":$scope.investmentAmount,
                    "No of Days":$scope.totalDays,
                    "Final Amount":returnsAmount,
                });
			}
		}

	})
	
	
	
.controller('AuthSigninCtrl', function($scope,$state,$sessionStorage,$http,ngDialog,loginInfoService,$localStorage,$timeout, $rootScope,loadSpin) {
 $sessionStorage.SessionClientCode="none";
 $scope.mobileNumber=$localStorage.loginData;
	$scope.signIn = function(form,loginForm) {
		if(form.$valid) {
			if($scope.rememberMe){ $localStorage.loginData=$scope.mobileNumber;}
			else{$localStorage.loginData='';}
			//$ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
      loadSpin.showSpin($scope.spinneractive );
			$scope.loginDetails=JSON.parse(JSON.stringify({}));
			$scope.loginDetails.login=$scope.mobileNumber;
			$scope.loginDetails.password=$scope.digitPin;
			console.log($scope.loginDetails);
			$sessionStorage.loginData=$scope.loginDetails;
			console.log($localStorage.loginData);
			$scope.sendSignIn();
		}
		else{loadSpin.stopSpin($scope.spinneractive );}
	}

	  
    $scope.forgotPin=function(signinformData){
		console.log(signinformData);
		if(signinformData.$valid){
			$sessionStorage.forgotPinPhone = $scope.mobileNumber;
			var ph=$sessionStorage.forgotPinPhone;
			$http.get('https://finotrust.com/WealthWeb/ws/clientFcps/forgotPassword?mobileNumber='+ph); //sending the otp to the phone number
			$state.go('forgot_pin');
		}
		else{
			$scope.message="Please enter your mobile number to reset PIN";
			$timeout(function(){
				$scope.message="";
			},3000)

		}
  }

  $scope.sendSignIn=function() {
    loginInfoService.getJsonId($sessionStorage.loginData).then(function(data){

      if(data.responseCode=="Cali_SUC_1030"){
        $sessionStorage.SessionIdstorage = data.msg;
        $sessionStorage.SessionPortfolio =data.jsonStr[0].pfolioCode;
        $sessionStorage.SessionStatus =data.jsonStr[0].activeStatus;
        $sessionStorage.SessionClientName =data.jsonStr[0].clientName;
        $sessionStorage.SessionClientCode =data.jsonStr[0].clientCode;
        $sessionStorage.SessionMobNo =data.jsonStr[0].mobileNo;
        $sessionStorage.SessionFolioNums =(data.jsonStr[0].folioNums).length;
        $sessionStorage.clientActive = data.jsonStr[0].clientActive;
        $sessionStorage.nachStatus=data.jsonStr[0].nachStatus;
        console.log($sessionStorage.SessionFolioNums);
        $sessionStorage.folioNums = data.jsonStr[0].folioNums[0];
        $sessionStorage.clientType= data.jsonStr[0].clientType;
		$sessionStorage.docStatus=data.jsonStr[0].docStatus;
		console.log($sessionStorage.docStatus + "docStatus");


          //clevertap integration for user login
          clevertap.onUserLogin.push({
              "Site": {
                  "Name": $sessionStorage.SessionClientName,            // String
                  "ClientStatus": $sessionStorage.clientActive,        // string(char)
                  "Phone":$sessionStorage.SessionMobNo,               // Phone
                  "DocStatus":$sessionStorage.docStatus,             //string
                  "ActiveStatus":$sessionStorage.SessionStatus,     //string
                  "ClientType":$sessionStorage.clientType,         // string(char)
              }
          });

 
        $state.go('tabsController');
        }
        else if(data.responseCode=="Cali_ERR_9002") {
          loadSpin.stopSpin($scope.spinneractive );
        $scope.passwordError="Password not valid";
		$timeout(function(){
		$scope.passwordError="";
	},3000)
       }
        else if(data.responseCode=="Cali_ERR_1969") {
          loadSpin.stopSpin($scope.spinneractive );
        $scope.passwordError="Password not valid";
		$timeout(function(){
		$scope.passwordError="";
	},3000)
       }
        else{
        $scope.passwordError="Signin failed, Please try again later";
        loadSpin.stopSpin($scope.spinneractive );
		$timeout(function(){
		$scope.passwordError="";
	},3000)
       }

        },function(error){
        $scope.serverError = "Entered Credentials did not validate";
        loadSpin.stopSpin($scope.spinneractive );
		$timeout(function(){
		$scope.serverError="";
	},3000)
    });

  }
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    })

//FAQ controllers START
    .controller('FundsMethodCtrl', function($scope) {
              $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
        $scope.message = "In FinoZen, we have ensured that there is minimal risk to your investments with high returns and almost instantaneous liquidity. Your investments directly go to a pre-selected liquid mutual fund. FinoZen selection algorithm is based on following parameters �";
        $scope.groups = [];
        $scope.groups["0"] = {name: "A. Net Assets of Liquid Fund", items: ["We give high weightage to the Net Amount Invested in a fund, and only those funds with greater than Rs. 2,000 Cr. in net assets are considered. This ensures that there is no liquidity crunch."] };
        $scope.groups["1"] = {name: "B. Size of Asset Management Company" , items: ["Size of Asset Management Company is given due importance and only top 10 fund houses are selected by us."] };
        //$scope.groups["2"] = {name: "C. Expense Ratio" , items: ["The expense ratio of a stock or asset fund is the total percentage of fund assets used for administrative, management, advertising and all other expenses. We select only the funds with very low expense ratio to ensure higher returns."] };
        $scope.groups["2"] = {name: "C. Average Credit Quality" , items: ["To ensure safety of investments, we select only those funds which invest in short term AAA or AA rated securities, ensuring that funds are extremely low risk."] };
        $scope.groups["3"] = {name: "D. Technical Indicators" , items: ["Our algorithm takes into factors 5 important technical indicators � Standard Deviation, Sharpe Ratio, Alpha, Beta and R-Squared to benchmark liquid funds. This ensures high returns with lowest risk."] };


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };


$scope.policy = function()
{
	//window.open('http://finozen.com/policy.html','_self');
	window.open('http://finozen.com/policy.html','_self', 'location=no');
  //$ionicHistory.goBack(-1);
}
$scope.terms = function()
{
	//window.open('http://finozen.com/t&c.html','_self');
	window.open('http://finozen.com/t&c.html','_self', 'location=no');
  //$ionicHistory.goBack(-1);

}

    })

  .controller('bankDetailsCTRL',function($scope,$state,$sessionStorage,bankDetailsService,$window,proofRedirectFactory,myService){
    $scope.accountTypeOptions = [
    { name: 'Savings', value: 'SB_New' },
    { name: 'Current', value: 'CA_new' }
    ];

    $scope.accountType = {type : $scope.accountTypeOptions[0].value};

    $scope.pastInvestmentsOptions = [
    { name: 'Yes', value: 'SB_New' },
    { name: 'No', value: 'CA_new' }
    ];

    $scope.pastInvestments = {type : $scope.pastInvestmentsOptions[0].value};


    $scope.bankUpload=function(bankData){
    if(bankData.$valid){
        var bank = JSON.parse(JSON.stringify({}));
            bank.clientCode=$sessionStorage.SessionClientCode;
            //bank.kyphCode="CRN23919";
            bank.panNumber= $scope.panNo //pan number
            bank.bankAccNo= $scope.accNumber //bank account number
            bank.ifscCode= $scope.IFSC_code//ifsc Code
            bank.accountType= $scope.accountType.type//savings type either savings or personal
            bank.updateNach= "N" //either yes or no
            bank=JSON.stringify(bank);
            console.log(bank);
               bankDetailsService.save(bank,function(data){
                 if(data.responseCode == "Cali_SUC_1030") {
                  $sessionStorage.docStatus=data.jsonStr.docStatus; // document status received on bank submittion of bank details  (have to update value according to response)
                  $sessionStorage.SessionStatus=data.jsonStr.activeStatus;
                  console.log($sessionStorage.SessionStatus+ "   bank submit $sessionStorage.SessionStatus");
                  console.log($sessionStorage.docStatus+ "   bank submit $sessionStorage.docStatus");
                    if($sessionStorage.SessionStatus=="T"){$state.go('activeClientStatus');}
                    else if($sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus==null || $sessionStorage.SessionStatus=="null" || $sessionStorage.SessionStatus==undefined ){$state.go('inactiveClient');}
                    else{$state.go('verifySuccess');}
                 }

                 else {
                  ngDialog.openConfirm({
                    template: "<h4 class='popupHead'>Sorry for the inconvenience</h4><p style='padding:1em;'>Please check your internet and try again</p>"+
                    '<div class="ngdialog-buttons text-center">' +
                          '<button type="button"  class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                    '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
                  })
                .then(function(value){
                    console.log('resolved:' + value);
                    location.reload();
                    // Perform the save here
                }, function(value){
                    console.log('rejected:' + value);

                });

                 }

               },function(error){

         if(error.data.responseCode == "Cali_ERR_2021"){
              console.log('IFSC Code invalid') ;
                  ngDialog.openConfirm({
                    template: "<h4 class='popupHead'>IFSC Code invalid</h4><p style='padding:1em;'>Please check your internet and try again</p>"+
                    '<div class="ngdialog-buttons text-center">' +
                          '<button type="button"  class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                    '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
                  })
                .then(function(value){
                    console.log('resolved:' + value);
                    location.reload();
                    // Perform the save here
                }, function(value){
                    console.log('rejected:' + value);

                });

 
         }
         else if(error.data.responseCode == "Cali_ERR_2035"){

             console.log('Account Number Duplicate') ;

         }
         else{
          console.log('error check the error code') ;
         }

               });
  }
             }
    $scope.bankSkip=function(){
      console.log($sessionStorage.SessionStatus + "    $sessionStorage.SessionStatus");
      if($sessionStorage.SessionStatus=="T"){$state.go('activeClientStatus');}
          else if($sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus==null || $sessionStorage.SessionStatus=="null" || $sessionStorage.SessionStatus==undefined ){$state.go('inactiveClient');}
          else{$state.go('verifySuccess');}
           }
      $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
  })


    .controller('languageCtrl', function($scope,$state,$localStorage) {
		//console.log($localStorage.language + " language selected");
		$scope.changeLan=function(){$translate.use("1");}

	})
          /*for question's*/
    .controller('questionsCTRL',function($scope,myService,proofRedirectFactory,questionsService,ngDialog,$sessionStorage,$state,$window, $rootScope,loadSpin){
$scope.diasbleSkip=$sessionStorage.disbledSkip;
     $scope.clientIncomeOptions = [
    { name: 'Below 1 Lakh', value: '31' },
    { name: '1 - 5 Lakh', value: '32' },
    { name: '5 - 10 Lakh', value: '33' },
    { name: '10 - 25 Lakh', value: '34' },
    { name: '25 Lakh - 1 Cr', value: '35' },
    { name: 'Above 1 Cr', value: '36' }
    ];
    $scope.clientIncome = {type : $scope.clientIncomeOptions[2].value};

     $scope.clientOccupationOptions = [
    { name: 'Business', value: 'Business_New' },
    { name: 'Professional', value: 'Professional_New' },
    { name: 'Public Sector', value: 'Service_New' },
    { name: 'Private Sector', value: 'Professional_New' },
    { name: 'Government Service', value: 'Service_New' },
    { name: 'Agriculturist', value: 'Farmer_New' },
    { name: 'Housewife', value: 'Household_New' },
    { name: 'Student', value: 'Student_New' },
    { name: 'Retired', value: 'Retired_New' },
    { name: 'Others', value: 'Others_New' }
    ];

    $scope.clientOccupation = {type : $scope.clientOccupationOptions[3].value};

     $scope.clientPEPOptions = [
    { name: 'Not Applicable', value: 'N' },
    { name: 'Politically Exposed Person', value: 'Y' },
    { name: 'Related to Politically Exposed Person', value: 'R' }
    ];

    $scope.clientPEP = {type : $scope.clientPEPOptions[0].value};


    $scope.question=function(){
      if($sessionStorage.SessionStatus=="T"){$state.go('bank');}
      else if($sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus==null || $sessionStorage.SessionStatus==undefined ){$state.go('bank');}
      else{$state.go('bank');}
    }
      $scope.questionUpload = function(form){
        if(form.$valid){
          var questUpload=JSON.parse(JSON.stringify({}));
          questUpload.kyphCode = $sessionStorage.SessionClientCode;
          questUpload.income=$scope.clientIncome.type; // income level from 31-36
          questUpload.occup=$scope.clientOccupation.type; // for the occupation
          questUpload.pep=$scope.clientPEP.type; //for the pep status either Y or N
          questUpload.resStatus="Individual"; // for the resdential status hardcoding it to individual
          questUpload = JSON.stringify(questUpload);
          console.log($scope.clientIncome.type + " clientIncome");
          console.log($scope.clientPEP.type + " clientPEP");
          console.log($scope.clientOccupation.type + " clientOccupation");
          console.log(questUpload + " questUpload");

              questionsService.save(questUpload,function(data){
              if($sessionStorage.SessionStatus=="T"){$state.go('bank');}
              else if($sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus==null || $sessionStorage.SessionStatus==undefined ){$state.go('bank');}
              else{$state.go('bank');}
                         
            //}
            },function(error){
              //$state.go('signature');     //comment this line if api is working
              if($sessionStorage.SessionStatus=="T"){$state.go('bank');}
              else if($sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus==null || $sessionStorage.SessionStatus==undefined ){$state.go('bank');}
              else{$state.go('bank');}
                });
          }
        }
          $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    })
    .controller('AccountfaqCtrl', function($scope) {
        $scope.groups = [];
        $scope.groups["0"] = {name: "What is FinoZen?",items: ["FinoZen is a mobile app where you can watch your money grow, literally! It enables you to invest and withdraw in just a click while your money grows at an expected rate of 7.0 ñ 8.5% p.a."] };
        $scope.groups["1"] = {name: "How does FinoZen work?" , items: ["FinoZen channels your money to the selected liquid/ultra-short term debt mutual fund which gives the best return at lowest risk. You will have full visibility and control of your money at all times. You can choose to Add or withdraw money anytime, anywhere with no penalties applicable."] };
        $scope.groups["2"] = {name: "Who is FinoZen meant for?" , items: ["FinoZen is meant for anyone who has excess money parked in their bank account. If you wish to make your money work for you and earn you interest to the tune of 7.0-8.5% p.a. in just a click, then FinoZen is meant for you.  You should be an Indian National, NRI or an Indian Company investing in person capacity. "] };
        $scope.groups["4"] = {name: "Why should I use Finozen over other options like savings accounts, fixed deposits?" , items: ["If your money is in Savings account, you get low returns at best quarterly.  Fixed Deposits and other saving instruments will have higher returns but have a lock in period. With FinoZen, your returns are usually 7.0-8.5%, returns get credited in your account everyday, and you can add or withdraw any time!"] };
        $scope.groups["3"] = {name: "How does FinoZen make money?",items: ["FinoZen earns 0.05% - 0.25% per annum for investments made through its app i.e. if you invest Rs. 10,000 through FinoZen and keep it for a year, FinoZen gets anywhere between Rs. 5 to Rs. 25. This commission is paid to FinoZen by the Mutual Fund company."] };
        $scope.groups["0"] = {name: "What is FinoZen?",items: ["FinoZen is a mobile app where you can watch your money grow, literally! It enables you to invest and withdraw in just a click while your money grows at an expected rate of 7.0 � 8.5% p.a."] };
        $scope.groups["1"] = {name: "How does FinoZen work?" , items: ["FinoZen channels your money to the selected liquid mutual fund which gives the best return at lowest risk. You will have full visibility and control of your money at all times. You can choose to Add or withdraw money anytime, anywhere with no penalties applicable. "] };
        $scope.groups["2"] = {name: "Who is FinoZen meant for?" , items: ["FinoZen is meant for anyone who has excess money parked in their bank account. If you wish to make your money work for you and earn you interest to the tune of 7.0-8.5% p.a. in just a click, then FinoZen is meant for you.  You should be an Indian National investing in individual capacity.FinoZen is not available for NRIs, companies, firms, trusts etc."] };
        $scope.groups["3"] = {name: "Why should I use Finozen over other options like savings accounts, fixed deposits?" , items: ["If your money is in Savings account, you get low returns at best quarterly.  Fixed Deposits  and other saving instruments will have higher returns but have a lock in period. With FinoZen, your returns are usually 7.0-8.5%, returns get credited in your account everyday, and you can add or withdraw any time!"] };

  $scope.oneAtATime = true;

  $scope.groups2 = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */

  $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

    })
    .controller('AddMoneyCtrl', function($scope) {
        $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

        $scope.groups = [];
        $scope.groups["0"] = {name: "I have signed up, what happens next?",items: ["Congratulations and welcome to Finozen! Here are the next steps:",
            "  1) Welcome Call: We will call you shortly (during office hours) and introduce FinoZen to you. Our executive will answer all your queries and will request you to proceed for Account Activation.",
            "  2) Account Activation: It�s a 6 step process which takes around 3 mins to complete. After you have submitted the necessary details, It will take us 5 mins. to activate your account (during office hours).  We will get in touch with you to inform you about the activation. ",
            "  3) Start Investing: Post activation of account, you can click on �Add Money� and start investing through netbanking.",
            "  4) Welcome to FinoZen family, now you can watch your money grow! "
        ] };
        $scope.groups["1"] = {name: "Why are these documents required?",items: [" These requirements are specified by SEBI (Securities and Exchange Board of India) and other regulatory bodies. We submit these documents to the Mutual fund for account creation."] };


    })

    .controller('WithdrawMoneyCtrl', function($scope) {
        $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

        $scope.groups = [];
        $scope.groups["0"] = {name: "Where does my money go?",items: ["FinoZen channels your money to the selected liquid/ultra-short term debt mutual fund which gives the best return at lowest risk. You will have full visibility and control of your money at all times. You can choose to Add or withdraw money anytime, anywhere with no penalties applicable.  "] };
        $scope.groups["1"] = {name: "How soon can I start investing?",items: ["Please enter your PAN No. and Bank Account No. to instantly activate your account, post which you can start investing."] };
        $scope.groups["2"] = {name: "How often can I invest/Add money or withdraw?",items: ["You can invest/add money or withdraw as often as you want. There are no restrictions on the frequency of your transactions. Also, there are no penalties or charges applicable when you withdraw your money."] };
        $scope.groups["3"] = {name: "How soon will my investments reflect on FinoZen?",items: ["All Investments will be processed on next working day and will reflect in your FinoZen account at 11:30 am on next day of processing.","Working days are Monday to Friday except Bank Holidays.", "For ex: An investment done on Sunday, will be processed on Monday and will reflect in your FinoZen account on 11:30 am Tuesday."] };
        $scope.groups["4"] = {name: "Where does my money go once I withdraw?",items: ["Your money will be deposited back to the bank account you registered with us at the time of your account opening."] };
        $scope.groups["5"] = {name: "How soon can I access my withdrawn money?",items: ["If you bank is IMPS enabled, withdrawal will be processed and money will be deposited in your account in less than 30 mins. If your Bank is not IMPS enabled then following is the withdrawal schedule: (continue to show the current table)"] };
        $scope.groups["6"] = {name: "How much can I invest at a time? Is there a minimum or a maximum?",items: ["You can invest any amount from a minimum of INR 500."] };
        $scope.groups["7"] = {name: "How long do I need to stay invested? Is there a lock-in period?",items: ["There is no minimum period or lock-in. You have the option to withdraw your money anytime. "] };
        $scope.groups["8"] = {name: "Can I invest through cash/cheque?",items: ["No. You can invest only through app or FinoZen website through Netbanking or Debit Card.  "] };


    })

    .controller('OthersCtrl', function($scope) {
        $scope.groups = [];
        $scope.groups["0"] = {name: "Where is your office?",items: ["Our office is located at:","25, 18th Cross,","9th Main, Behind McDonald,","HSR Layout,Sector 7, ","Bengaluru, 560102 Karnataka","Our business hours are Monday to Friday 10 am to 8 pm."] };
        $scope.groups["1"] = {name: "How can I reach you in case of any questions?",items: ["You can call us Monday to Friday 10am to 8 pm by using the dialer icon on the top right corner on any page of the app. ","You can also reach us via email at support@finozen.com. We will respond to your queries within 1 business days. ","You can also send us your feedback by going to the ìContact Usî section on the left menu panel of the app."] };

  $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

    })


    .controller('transListController',function($scope,$sessionStorage,getPerformanceService,ngDialog,getNAVService,getReportService,$timeout, $rootScope,loadSpin) {

var timeNow = new Date().getUTCHours();
var reportDate = getPerformanceService.get();
reportDate.$promise.then(function(data){
  loadSpin.showSpin($scope.spinneractive );
 if (data.responseCode == "Cali_SUC_1030") {
loadSpin.stopSpin($scope.spinneractive );
$sessionStorage.gainMonth=data.jsonStr.gainMonth;
$sessionStorage.gainToday=data.jsonStr.gainToday;
$sessionStorage.gainTotal=data.jsonStr.gainTotal;
$sessionStorage.list=data.jsonStr.list;
$sessionStorage.mktValue=data.jsonStr.mktValue;
$sessionStorage.msg=data.jsonStr.msg;
$sessionStorage.netInv=data.jsonStr.netInv;
$sessionStorage.paymentMode=data.jsonStr.paymentMode;
$sessionStorage.quantity=data.jsonStr.quantity;
$sessionStorage.xirr=data.jsonStr.xirr;
loadSpin.stopSpin($scope.spinneractive );
 }
})

  var Report = getReportService.get();
  Report.$promise.then(function(data){
    loadSpin.showSpin($scope.spinneractive );
    if(data.responseCode=="Cali_SUC_1030"){
	$sessionStorage.allTransactions=(data.jsonStr).length ;
	console.log($sessionStorage.allTransactions + "total number of transactions");
    $scope.products=data.jsonStr;
	if((data.jsonStr).length <= 0){
		console.log("no txn");
		$scope.noTxnIcon="img/no_leaves.png";
    }
    loadSpin.stopSpin($scope.spinneractive );
    }
  })


  var navDate = getNAVService.get();
  navDate.$promise.then(function(data){
    loadSpin.showSpin($scope.spinneractive );
    if(data.responseCode=="Cali_SUC_1030"){

    for(var i = 0; i < (data.jsonStr).length; i++) {
      if(data.jsonStr[i].recco=="Accumulate"){
		  console.log($sessionStorage.clientType+ "   client type");
		  if($sessionStorage.clientType ==="PL"){
			if(JSON.stringify(data.jsonStr[i].schemeName)[1]=="P"){
				console.log(JSON.stringify(data.jsonStr[i].schemeName)[1] +"   i am platinum");
				$sessionStorage.schemeName=data.jsonStr[i].schemeName;
				$sessionStorage.nav=data.jsonStr[i].nav;
				console.log($sessionStorage.nav + "  platinum");
				$sessionStorage.rtaCode=data.jsonStr[i].rtaCode;
				$sessionStorage.amcCode=data.jsonStr[i].amcCode;
			}
		  }
		  else if($sessionStorage.clientType  ==='GO'){
			  if(JSON.stringify(data.jsonStr[i].schemeName)[1]=="G"){
				console.log("i am gold");
				$sessionStorage.schemeName=data.jsonStr[i].schemeName;
				$sessionStorage.nav=data.jsonStr[i].nav;
				console.log($sessionStorage.nav + "  Gold");
				$sessionStorage.rtaCode=data.jsonStr[i].rtaCode;
				$sessionStorage.amcCode=data.jsonStr[i].amcCode;
			}

		  }
		 // else{console.log("not enteringg goo");}

      }

    }
    console.log("stop load");
  //  $scope.spinneractive = false;
    loadSpin.stopSpin($scope.spinneractive );
    }
  },function(error){
    console.log("error");
     loadSpin.stopSpin($scope.spinneractive );
  })


  //Client-side pagination example
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.totalPages = 0;
    $scope.pagedData = [];
    $scope.data = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.pageButtonDisabled = function(dir) {
      if (dir == -1) {
      return $scope.currentPage == 0;
      }
    return $scope.currentPage >=  $scope.products.length/$scope.pageSize - 1;
    }

    $scope.paginate = function(nextPrevMultiplier) {
      $scope.currentPage += (nextPrevMultiplier * 1);
      $scope.pagedData =  $scope.products.slice($scope.currentPage*$scope.pageSize);
    }

    function init() {
      $scope.totalPages = Math.ceil( $scope.products.length/$scope.pageSize);
      $scope.pagedData =  $scope.products;
    }

   
$timeout(function() {
   init();
}, 00);

    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
})
  /*add money page check*/
.controller('transactionAccessCtrl', function($scope,$sessionStorage,$state,relianceInstantAmountAPI, $rootScope,loadSpin){
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
  $scope.investCheck=function(){
  if($sessionStorage.SessionStatus=="N" || $sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus== 'null' ||$sessionStorage.SessionStatus==undefined ){
    $state.go("inactiveClient");
  }
  else{
      if($sessionStorage.SessionStatus=="P" || ($sessionStorage.SessionStatus=="Q" && $sessionStorage.docStatus!='11111')) {
      $state.go("status");
      }
      else {
      $state.go("invest");
      }
  }

  }
  $scope.withdrawCheck=function(){
    //$ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
  //loadSpin.showSpin($scope.spinneractive );
  if($sessionStorage.SessionStatus=="N" || $sessionStorage.SessionStatus=="I" || $sessionStorage.SessionStatus== 'null' || $sessionStorage.SessionStatus==undefined ){
    //$ionicLoading.hide();
    $sessionStorage.instaAmount=0;
    $state.go("withdraw");
  }
  else{
      //for reliance instant amount
      var bankcall={};
        bankcall.gateWayType ="RG",
        bankcall.gateWayPayLoad= "https://online.reliancemf.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/RedemptionSchemeDetails?acno="+$sessionStorage.folioNums+"&scheme=LP&plan=IG&arncode=ARN-107100&branch=FP99&proxybranch=&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=c3d2f2f3-7d23-4f48-9fe6-82db5449a562"
        bankcall=JSON.stringify(bankcall);
        console.log(bankcall+"bank call");
        var bankedit;
        loadSpin.showSpin($scope.spinneractive );
        relianceInstantAmountAPI.save(bankcall,function(data){

        console.log(data);

        if(data.responseCode == "Cali_SUC_1030") {
          console.log(data.jsonStr.rgResponse[0]);
          //console.log(data.jsonStr.rgResponse.BankAccNo);
          console.log((JSON.parse(data.jsonStr.rgResponse)).Insta_Amount+ "   Insta_Amount");
          $sessionStorage.instaAmount=(JSON.parse(data.jsonStr.rgResponse)).Insta_Amount;
          $scope.insta=$sessionStorage.instaAmount;
        //  $ionicLoading.hide();
          loadSpin.stopSpin($scope.spinneractive );
         $state.go("withdraw");
        }
      })



  }

  }

})

.controller('statusPageCtrl', function($scope ,$sessionStorage,$state,proofRedirectFactory,myService,$window){




  if($sessionStorage.docStatus=='11111'){
    $scope.para1="We have received your details and they are being verified. We will update you within 12 hours on status of your account activation.";
    $scope.para2="However, you can start investing right away. Happy Investing!";
    $scope.docstatus=true;
    $scope.notNow="Start Investing";
  }
  else{
    $scope.para1="Congratulations you can start investing. However, we will need additional details to process your investments.";
    $scope.para2="We will update you once your account is ready for transactions. Happy Investing!";
    $scope.docstatus=false;
    $scope.notNow="Not Now";
  }
  if($sessionStorage.SessionStatus=='I'){
    $scope.investNowFunction= function(){$state.go('invest');}
    $scope.withdrawNowFunction= function(){$state.go('withdraw');}
    $scope.notnowFunction= function(){
    /*  var nextStepsUrl=proofRedirectFactory.name;
      var totalSteps=myService.myFunction($sessionStorage.docStatus).length;
  //    var nextSteps=myService.myFunction($sessionStorage.docStatus);
      $sessionStorage.stepCount=0;
      $state.go(nextStepsUrl[$scope.nextSteps[$sessionStorage.stepCount]]);*/
        if ($window.confirm("Please Submit your documents to support@finozen.com"))
        $state.go("tabsController");
        else
        $scope.result = "No";
    }
    $scope.docsToSubmit=['Photo of your PAN card ', 'Your selfie with PAN Card', 'Photo of your Address Proof Front', 'Photo of your Address Proof back', 'Your Signature'];
    $scope.nextSteps=myService.myFunction($sessionStorage.docStatus);
    console.log($scope.nextSteps);
  }
  else{
    $scope.investNowFunction= function(){$state.go('invest');}
    $scope.withdrawNowFunction= function(){$state.go('withdraw');}
    $scope.notnowFunction= function(){
        if ($window.confirm("Please Submit your documents to support@finozen.com"))
        $state.go("tabsController");
        else
        $scope.result = "No";
    }
    $scope.docsToSubmit=['Photo of your PAN card ', 'Your selfie with PAN Card', 'Photo of your Address Proof Front', 'Photo of your Address Proof Back', 'Your Signature'];
    $scope.nextSteps=myService.myFunction($sessionStorage.docStatus);
    console.log($scope.nextSteps);
  }
})
.controller('sampleCtrl', function ($scope,$state,mfOrderUrlService,$sessionStorage,dateService,$timeout, $rootScope,loadSpin,ngDialog) {

  var finalComputedVal;
    if($sessionStorage.clientType=="GO"){
    console.log($sessionStorage.clientType+ "  gold")
    $scope.schemePlan="RELIANCE LIQUID FUND - TREASURY PLAN - IP - Growth";
    $scope.averageRate=7.5;
    $scope.minInv=500;
  }
    else if($sessionStorage.clientType=="PL") {
    console.log($sessionStorage.clientType+ "  platinum")
    $scope.schemePlan="Reliance Money Manager Fund ñ Growth Plan"; //money managaer needs to come here
    $scope.averageRate=8.3;
    $scope.minInv=500;
    }
  var dayNow = new Date().getDay();
  console.log(dayNow);
  if(dayNow >=1 && dayNow <5){$scope.nav=$sessionStorage.nav*(1+ 0.0002);}
  else if(dayNow ==5) {$scope.nav=$sessionStorage.nav*(Math.pow((1+ 0.0002),3));}
  else if(dayNow ==6) {$scope.nav=$sessionStorage.nav*(Math.pow((1+ 0.0002),2));}
  else if(dayNow ==0) {$scope.nav=$sessionStorage.nav;}

  console.log($scope.nav);
 // till here

    $scope.final=function(initial,nav,suggest){
      console.log($scope.averageRate + "    averageRate");
    console.log($scope.nav + "nav");
    var theory=initial/nav ;
    var rounded= Math.round(theory * 1000)/1000;
    //loss=theory-rounded;
    var diff=rounded*nav-initial;
    if(initial>0){
    if(diff>0){
    finalComputedVal=initial;
    return suggest;
    }
    else{
    return $scope.test(initial,nav,suggest);
    }
    }
    else{return 0;}
  }
    $scope.test=function(initial,nav,suggest){
    suggest++;
    initial=initial+1;
            return $scope.final(initial,nav,suggest);
        }

    $scope.Invest = function(form) {
            if(form.$valid && $scope.initial>=100) {
        if($sessionStorage.allTransactions > 0 && $sessionStorage.SessionFolioNums==0){
          $ionicPopup.alert({
          title: 'Transaction In-Progress',
          template: 'Your first transaction is in progress. For next transaction, we request you to wait till the first investment reflects in your FinoZen account.'
          });
          }
          // comment this part for nachStatus
          /*
          $ionicLoading.show({templateUrl:"templates/loading.html"});
          console.log('its entering the nach mandate');
          $scope.sendMfOrder()
          */
          // till here

          //Nach status redirection

        else if($sessionStorage.nachStatus !='A'){
               // $ionicLoading.show({templateUrl:"templates/loading.html"});
               loadSpin.showSpin($scope.spinneractive );
              console.log('its entering the nach mandate');
              if($sessionStorage.SessionStatus=="P" ){
                if($scope.initial<=1000){$scope.sendMfOrder();}
                else{
                  //$ionicLoading.hide();
                  var log=$ionicPopup.alert({
                    title: 'Acctivate account',
                    template: 'You are not allowed to Invest more than Rs.1000 untill you submit all documents'
                    });
                    log.then(function(res) {
                    state.go("invest");
                  });
                }
              }
              else{
                $scope.sendMfOrder();
              }
            }
            else{
              //$ionicLoading.show({templateUrl:"templates/loading.html"});
              loadSpin.showSpin($scope.spinneractive );
              $scope.nach();
            }
            }
        }

        $scope.sendMfOrder=function() {
            var date=dateService.getDate();
            mfOrderUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": $sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount": finalComputedVal,"folioNo":$sessionStorage.folioNums},function(data){
                if(data.responseCode=="Cali_SUC_1030"){
                  var ref =  window.open('https://finotrust.com/WealthWeb/ws/pymt/pymtView?mfOrderId='+data.id,'_self');
                }
        else{
          alert("$ionicLoading.hidelert");
        }
            },function(error){
        //$ionicLoading.hide();

        $scope.mess="Enter a value";
            });
        };

  //nach status
  $scope.nach=function() {
    var date=dateService.getDate();
    mfOrderUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": $sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount": finalComputedVal,"folioNo":$sessionStorage.folioNums,"paymentMode" : "a"},function(data){
      if(data.responseCode=="Cali_SUC_1030"){


          //clevertap charging notification
          clevertap.event.push("Charged", {
              "Amount": finalComputedVal, //amount entered
              "Fund Name": $sessionStorage.rtaCode, //reliance code
              "Charged ID":data.id ,  // important to avoid duplicate transactions due to network failure

          });
       $state.go('invest_success');
      }
      else{
       // $ionicLoading.hide();
      }

    },function(error){

      $scope.mess="Enter a value";
    });
  };
        var mid=$sessionStorage.orderId;//dynamic id
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
})

.controller('schemeText', function($scope,$sessionStorage) {
  /*{
    $scope.schemeName="Reliance Liquid Fund Cash Plan - Growth";
    $scope.schemeBody="Reliance Liquid Fund ensure that your investments are very low risk, no-lock in on withdrawl and generate stable returns. This fund primarily invests in money market instruments of public sector banks like Axis Bank, Kotak Mahindra Bank and undertakings such as Steel Authority of India, Idea Cellular, Tata Capital making it ultra-safe (almost as safe as your savings bank deposits) to invest your money. ";
    $scope.returnsOneM="7.2%";
    $scope.returnsThreeM="7.6%";
    $scope.returnsOneY="7.4%";
    $scope.returnsThreeY="8.1%";
    $scope.returnsFiveY="8.5%";
    $scope.currentAUM=" Rs. 3,775 Crores";
    $scope.TaxBenifits=" Unlike FD, there is no TDS for investments in this fund. Also, for investments more than 3 years, tax payout becomes negligible as there is indexation benefits. However for investments less than 3 years, you will have to declare the returns from this investment at the time of tax filing and pay tax as per your salary bracket.";
    $scope.schemeLink="http://www.moneycontrol.com/mutual-funds/nav/reliance-liquid-fund-cash-plan/MRC014";
    $scope.schemeLinkText=" to read more about Reliance Liquid Fund Cash Plan � Growth on moneycontrol.";
  }
  else{
    $scope.schemeName="Reliance Liquid Fund Treasury Plan (IP) � G";
    $scope.schemeBody="Reliance Liquid Fund ensure that your investments are very low risk, no-lock in on withdrawl and generate stable returns. This fund primarily invests in money market instruments of public sector banks and undertakings such as HUDCO, L&T and Tata Steel  making it ultra-safe (almost as safe as your savings bank deposits) to invest your money.";
    $scope.returnsOneM="7.1%";
    $scope.returnsThreeM="7.1%";
    $scope.returnsSixM="7.46%";
    $scope.returnsNineM="7.65%";
    $scope.returnsOneY="7.84%";
    $scope.returnsThreeY="8.56%";
    $scope.currentAUM=" INR 20,722 Crores";
    $scope.TaxBenifits=" Unlike FD, there is no TDS for investments in this fund. Also, for investments more than 3 years, tax payout becomes negligible as there is indexation benefits. However for investments less than 3 years, you will have to declare the returns from this investment at the time of tax filing and pay tax as per your salary bracket.";
    $scope.schemeLink="http://www.moneycontrol.com/mutual-funds/nav/reliance-liquid-fund-treasury-plan-ip/MRC046";
    $scope.schemeLinkText=" to read more about Reliance Liquid Fund Treasury Plan (IP) � G on moneycontrol.";
  }
  /*else{
    $scope.schemeName="Reliance Money Manager Fund � Growth Plan";
    $scope.schemeBody="Reliance Money Manager Fund ensures that your investments are at low risk, no lock-in on withdrawal and generate stable returns. This fund primarily invests in money market instruments and NCDs of public sector banks and AAA rated companies like Axis Bank, ICICI Bank, HDFC Ltd. etc. making it a safe option to park your surplus bank balance.";
    $scope.returnsOneM="7.80%";
    $scope.returnsThreeM="9.04%";
    $scope.returnsOneY="9.26%";
    $scope.returnsThreeY="8.77%";
    $scope.returnsFiveY="8.63%";
    $scope.currentAUM=" Rs. 14,469 Crores";
    $scope.TaxBenifits=" Unlike FD, there is no TDS for investments in this fund. Also, for investments more than 3 years, tax payout becomes negligible as there is indexation benefits. However for investments less than 3 years, you will have to declare the returns from this investment at the time of tax filing and pay tax as per your salary bracket.";
    $scope.schemeLink="http://www.moneycontrol.com/mutual-funds/nav/reliance-liquid-fund-treasury-plan-ip/MRC046";
    $scope.schemeLinkText=" to read more about Reliance Liquid Fund Treasury Plan (IP) � G on moneycontrol.";
  }*/
})

.controller('changeCtrl', function(changePinService,$scope,$sessionStorage,$state, $rootScope,loadSpin,ngDialog){

$scope.resetPinFn=function(changePinForm,pin,confirm){
    if(changePinForm.$valid){
      pin.clientCode=$sessionStorage.SessionClientCode;
      pin=JSON.stringify(pin);
      console.log(pin + " form data");
//changePinService.changePin(changePinForm);
      changePinService.save(pin,function(data){
          console.log(data);
          if(data.responseCode == "Cali_SUC_1030") {


              console.log('PIN Changed Successfully');
  
          }
          else {
              console.log('PIN Changed unSuccessfully');
          }
      },function(error){
          console.log("eror");
          ngDialog.openConfirm({
            template: "<h4 class='popupHead'>Sorry for the inconvenience</h4><p style='padding:1em;'>Please Login again</p>"+
            '<div class="ngdialog-buttons text-center">' +
                  '<button type="button"  class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
            '</button></div>',
          plain: true,
          className: 'ngdialog-theme-default',
          closeByEscape : false,
          closeByDocument: false,
          showClose:false,
          scope: $scope
          })
        .then(function(value){
            console.log('resolved:' + value);
              $sessionStorage.SessionClientCode="none";
              location.reload();
              $state.go('home');
            // Perform the save here
        }, function(value){
            console.log('rejected:' + value);

        });


      });

    }
  }
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
})


    .controller('AuthWithdrawlCtrl', function($scope, $state,mfSellUrlService,dateService,$sessionStorage,relianceInstantAmountAPI, $rootScope,loadSpin,ngDialog) {
        if($sessionStorage.instaAmount>=0){$scope.insta=$sessionStorage.instaAmount;}
        else{$scope.insta=0;}

        $scope.Withdrawl = function(form) {
        console.log($scope.amount);
        console.log($scope.checked_withdraw );
        console.log(($scope.amount!=undefined || $scope.checked_withdraw) );
            var date=dateService.getDate();
            if(form.$valid) {
            if(($scope.amount!=undefined || $scope.checked_withdraw) && ($scope.amount>0 || $scope.checked_withdraw)) {

          if($scope.checked_withdraw == true){
/*
ngDialog.openConfirm({
    template:
      '<p>Are you sure you want to close the parent dialog?</p>' +
      '<div class="ngdialog-buttons text-center">' +
          '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No' +
          '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm' +
      '</button></div>',
    plain: true,
    className: 'ngdialog-theme-default',
    closeByEscape : false,
    closeByDocument: false,
    showClose:false,
    scope: $scope
})
.then(function(value){
    console.log('resolved:' + value);
    // Perform the save here
}, function(value){
    console.log('rejected:' + value);

});



*/

            if($sessionStorage.clientType ==="PL"){
               var confirmPopup = ngDialog.openConfirm({
                template: "<p>Your amount will be credited to </br>" +"Account No:"+$sessionStorage.bankName+"<br/> Bank Name: "+$sessionStorage.bankAccNo + "</p>"+"<p><br/>Amount not eligible for instant withdrawal</p>"+
                  '<div class="ngdialog-buttons text-center">' +
                      '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                  '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
              });
            }
            else{
               var confirmPopup = ngDialog.openConfirm({
                template: "<h4 class='popupHead'>Withdraw complete balance?</h4><p style='padding:1em;'>Your amount will be credited to </br>" +"Account No:"+$sessionStorage.bankName+"<br/> Bank Name: "+$sessionStorage.bankAccNo+"</p>"+
                '<div class="ngdialog-buttons text-center">' +
                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                '</button></div>',
            plain: true,
            className: 'ngdialog-theme-default',
            closeByEscape : false,
            closeByDocument: false,
            showClose:false,
            scope: $scope
              });
            }
            confirmPopup.then(function(result) {
              if(result) {
                loadSpin.showSpin($scope.spinneractive );
                mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode": $sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"allUnits":"Y","folioNo":$sessionStorage.folioNums},function(data){
                            console.log(data.responseCode);

                if(data.responseCode=="Cali_SUC_1030") {
                  loadSpin.stopSpin($scope.spinneractive );
                  $state.go('successPage');
                }
                else
                {
                  $scope.withdraw_Networkerror="Please try again";
                }
                        },function(error){

                $scope.withdraw_Networkerror="Please try again";
                        });
              }
            });
          }
          else{
  /*          
              mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode":$sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount":$scope.amount,"folioNo":$sessionStorage.folioNums},function(data){
                  console.log(data.responseCode);
                  if(data.responseCode!="Cali_SUC_1030") {
                    console.log("failed");
                    $scope.withdraw_Networkerror="Unable to accept request. Please re-login and try again";

                  }
                  else
                  {
                    console.log("success");
                    $state.go('successPage');
                  }
                },function(error){
                  $scope.withdraw_Networkerror="Unable to accept request. Please re-login and try again";
                });




*/



        if($sessionStorage.bankAccNo==undefined || $sessionStorage.bankName==null ){
           var confirmPopup =ngDialog.openConfirm({
            template: "<h4 class='popupHead'>Confirm</h4>" + "<p style='padding:1em;'>Withdraw INR "+ $scope.amount +" ?</p>"+
                  '<div class="ngdialog-buttons text-center">' +
                      '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                  '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
          });
          confirmPopup.then(function(result) {
            if(result) {
            $ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
            mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode":$sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount":$scope.amount,"folioNo":$sessionStorage.folioNums},function(data){
                console.log(data.responseCode);
                if(data.responseCode!="Cali_SUC_1030") {
                  $ionicLoading.hide();
                  console.log("failed");
                  $scope.withdraw_Networkerror="Unable to accept request. Please re-login and try again";
                  var log=$ionicPopup.alert({
                    title: 'Sorry for the inconvenience',
                    template: 'Please Login again'
                    });
                  log.then(function(res) {
                    ionic.Platform.exitApp();
                    });
                }
                else
                {
                  $ionicLoading.hide();
                  console.log("success");
                  $state.go('successPage');
                }
              },function(error){
                  console.log("eror");
                  ngDialog.openConfirm({
                    template: "<h4 class='popupHead'>Sorry for the inconvenience</h4><p style='padding:1em;'>Please Login again</p>"+
                    '<div class="ngdialog-buttons text-center">' +
                          '<button type="button"  class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                    '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
                  })
                .then(function(value){
                    console.log('resolved:' + value);
                      $sessionStorage.SessionClientCode="none";
                      location.reload();
                      $state.go('home');
                    // Perform the save here
                }, function(value){
                    console.log('rejected:' + value);
                });

              });
            }
          });
        }
        else{
          if($sessionStorage.clientType ==="PL"){
            if($scope.amount >= 500 &&  $scope.amount<=$scope.insta ){
               var confirmPopup =ngDialog.openConfirm({
                template: "<h4 class='popupHead'>Withdraw INR"+ $scope.amount +" ?</h4>" + "<p style='padding:1em;'>Account No: "+$sessionStorage.bankName+"<br/> Bank Name: "+$sessionStorage.bankAccNo+ "<br/>Amount will be credited within 30 minutes.</p>" +
                  '<div class="ngdialog-buttons text-center">' +
                      '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                  '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
              });
            }
            else {
               var confirmPopup =ngDialog.openConfirm({
                template: "<h4 class='popupHead'>Withdraw INR"+ $scope.amount +" ?</h4>" + "<p style='padding:1em;'>Your amount will be credited to " +"Account No:"+$sessionStorage.bankName+"<br/> Bank Name: "+$sessionStorage.bankAccNo + "<br/>Amount not eligible for instant withdrawal</p>" +
                  '<div class="ngdialog-buttons text-center">' +
                      '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                  '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
              });
            }
          }
          else{
             var confirmPopup =ngDialog.openConfirm({
              template: "<h4 class='popupHead'>Confirm</h4>" + "<p style='padding:1em;'>Your amount will be credited to<br/> Account No:"+$sessionStorage.bankName+"<br/> Bank Name: "+$sessionStorage.bankAccNo +"</p>"+
                  '<div class="ngdialog-buttons text-center">' +
                      '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">CANCEL' +
                      '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                  '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
            });
            }
          confirmPopup.then(function(result) {
            if(result) {
            $ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
            mfSellUrlService.save({"portfolioCode": $sessionStorage.SessionPortfolio,"amcCode":$sessionStorage.amcCode,"rtaCode":$sessionStorage.rtaCode,"orderTxnDate": date,"amount":$scope.amount,"folioNo":$sessionStorage.folioNums},function(data){
                console.log(data.responseCode);
                if(data.responseCode!="Cali_SUC_1030") {
                  $ionicLoading.hide();
                  console.log("failed");
                  $scope.withdraw_Networkerror="Unable to accept request. Please re-login and try again";
                  var log=$ionicPopup.alert({
                    title: 'Sorry for the inconvenience',
                    template: 'Please Login again'
                    });
                  log.then(function(res) {
                    ionic.Platform.exitApp();
                    });
                }
                else
                {
                  $ionicLoading.hide();
                  console.log("success");
                  $state.go('successPage');
                }
              },function(error){
                $scope.withdraw_Networkerror="Unable to accept request. Please re-login and try again";
                  console.log("eror");
                  ngDialog.openConfirm({
                    template: "<h4 class='popupHead'>Sorry for the inconvenience</h4><p style='padding:1em;'>Please Login again</p>"+
                    '<div class="ngdialog-buttons text-center">' +
                          '<button type="button"  class="ngdialog-button ngdialog-button-primary button-positive" ng-click="confirm(1)">OK' +
                    '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default',
                  closeByEscape : false,
                  closeByDocument: false,
                  showClose:false,
                  scope: $scope
                  })
                .then(function(value){
                    console.log('resolved:' + value);
                      $sessionStorage.SessionClientCode="none";
                      location.reload();
                      $state.go('home');
                    // Perform the save here
                }, function(value){
                    console.log('rejected:' + value);

                });

              });
            }
          });
        }


          }
                }
          else{
            $scope.withdraw_error="Please enter a valid amount.";
          }
        }

            };

            $scope.amountClear= function() {
                $scope.amount='';
            }

    //reliance bank api call

        $scope.RelianceBank=function(){
        var bankcall={};
        bankcall.gateWayType ="RG",
        bankcall.gateWayPayLoad= "https://online.reliancemf.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/RedInvbankDetails_V1?arncode=ARN-107100&acno="+$sessionStorage.folioNums+"+&scheme=LP&plan=IG&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=c3d2f2f3-7d23-4f48-9fe6-82db5449a562"
        bankcall=JSON.stringify(bankcall);
        console.log(bankcall+"bank call");
        var bankedit;
        relianceInstantAmountAPI.save(bankcall,function(data){

        console.log(data);

        if(data.responseCode == "Cali_SUC_1030") {
          console.log(data.jsonStr.rgResponse);
        //console.log(data.jsonStr.rgResponse.BankAccNo);
        console.log((JSON.parse(data.jsonStr.rgResponse))[0].BankAccNo);
        $sessionStorage.bankName=(JSON.parse(data.jsonStr.rgResponse))[0].BankAccNo;
        $sessionStorage.bankAccNo=(JSON.parse(data.jsonStr.rgResponse))[0].BankName;

              }
      })
    }
    //reliance InstaAmount Api call
    $scope.RelianceInstaAmount=function(){
        var bankcall={};
        bankcall.gateWayType ="RG",
        bankcall.gateWayPayLoad= "https://online.reliancemf.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/RedemptionSchemeDetails?acno="+$sessionStorage.folioNums+"&scheme=LP&plan=IG&arncode=ARN-107100&branch=FP99&proxybranch=&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=c3d2f2f3-7d23-4f48-9fe6-82db5449a562"
        bankcall=JSON.stringify(bankcall);
        console.log(bankcall+"bank call");
        var bankedit;
        relianceInstantAmountAPI.save(bankcall,function(data){

        console.log(data);

        if(data.responseCode == "Cali_SUC_1030") {
          console.log(data.jsonStr.rgResponse[0]);
        //console.log(data.jsonStr.rgResponse.BankAccNo);
        console.log((JSON.parse(data.jsonStr.rgResponse)).Insta_Amount);
        $sessionStorage.instaAmount=(JSON.parse(data.jsonStr.rgResponse)).Insta_Amount;
        if($sessionStorage.instaAmount==null || $sessionStorage.instaAmount == undefined){$scope.insta=0;}
        else{$scope.insta=$sessionStorage.instaAmount;}
              }
      })
    }
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    $scope.RelianceBank();
    })


  /*forgot pin controller*/
    .controller('forgotPinCtrl', function($scope,$sessionStorage,$http,$state,$timeout, $rootScope,loadSpin,ngDialog) {
      $scope.resetPinFn=function(form,change,newPIN) {
        if(form.$valid) {
          console.log("data match "+ newPIN, $scope.confirmPin);
          if(newPIN==$scope.confirmPin){
            $scope.forget5 = JSON.parse(forgotPin2(change));
            $scope.forget5.mobileNumber = JSON.stringify($sessionStorage.forgotPinPhone);
            var forgotpinPass = JSON.stringify($scope.forget5);
            console.log(forgotpinPass + 'string');
            $http.post('https://finotrust.com/WealthWeb/ws/clientFcps/setNewPassword', forgotpinPass).success(function(data){
              console.log(data+'response');
              if(data.responseCode=="Cali_SUC_1030"){

                var popup= $ionicPopup.alert({
                  title: 'PIN Change status',
                  template: 'PIN Changed Successfully'
                });

                popup.then(function(res) {
                  $state.go("login");
                });
              }
         else if(data.responseCode=="Cali_ERR_2059"){ 

                  $scope.error_pin="Entered OTP didn't mached";
                    $timeout(function(){
                    $scope.error_pin="";
                  },3000)
          }
          else{
            console.log("failure Error");
          }


            }).error(function(data){
              {
                console.log("Error");
                $ionicPopup.alert({
                  title: 'PIN Change status',
                  template: 'PIN Changed UnSuccessfully'
                });
              }
            });
          }
          else{

  $scope.error_pin="Entered password didn't match";
    $timeout(function(){
    $scope.error_pin="";
  },3000)
              
          }
        }
          else{

                  $scope.error_pin="Entered match";
                    $timeout(function(){
                    $scope.error_pin="";
                  },3000)
              
          }
      }
        var  forgotPin2 = function(change2){
            return JSON.stringify(change2)
        }


    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
})
    .controller('AuthSignUpCtrl', function($scope, $state,signUpService,$sessionStorage, $rootScope,loadSpin,ngDialog) {

        $scope.signUp = function(form,searchText2,signupForm) {
            $sessionStorage.SessionClientName=signupForm.fName+' '+signupForm.lName;
            $sessionStorage.SessionMobNo=signupForm.mobileNumber;
            if(angular.equals(signupForm.pin,searchText2))
            {
                if( signupForm.mobileNumber==signupForm.referral) {
          console.log("same number");
          form.referral.$dirty=false;
          console.log( form.referral.$dirty+ " in cont");
          $scope.error_referal="Entered mobile number and referral number should be different";
        }
        else{

          if(form.$valid) {
            console.log("not same number");
            //$ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
            loadSpin.showSpin($scope.spinneractive );
            $sessionStorage.signUpData = (signupForm);
            $scope.addUserInfo();
          }
        }
            }
            else{
                $scope.error_pin="Entered password didn't match";
            }
        }

        $scope.addUserInfo=function(){
            signUpService.sendSignUp($sessionStorage.signUpData).then(function(data){
        //$sessionStorage.

                if(data.responseCode!="Cali_SUC_1030"){


          if(data.responseCode=="Cali_ERR_2050" || data.responseCode=="Cali_ERR_2066" ){

            $scope.mobileError="Mobile number in use";
          }
          else if(data.responseCode=="Cali_ERR_1838" || data.responseCode=="Cali_ERR_1838" ){
            $scope.serverError="Please enter your full name";
          }
          else{
            $scope.serverError="Sign Up failed, please try again";
          }
        }
                else {
                  $sessionStorage.SessionStatus='I';
          //saving the signUp data with similar name convention as per sign in controller
          $sessionStorage.SessionPortfolio=(JSON.parse(data.jsonStr)).portfolioCode;
          $sessionStorage.SessionClientCode=(JSON.parse(data.jsonStr)).clientCode;
          $sessionStorage.clientType=(JSON.parse(data.jsonStr)).clientType;
          $sessionStorage.stepCount=0;
          $sessionStorage.disbledSkip=false;

                    //clevertap integration for user signup
                    //clevertap integration for withdraw
                    clevertap.profile.push({
                        "SignUp": {
                            "Name": $sessionStorage.name, // User's name
                            "amount":$scope.amount,
                            "date":date
                        }
                    });



                    $state.go('sliders');    // new sign upflow
          //$state.go('reference');
         // $ionicLoading.hide();
                }
            },function(error){
        //$ionicLoading.hide();
        console.log(data.responseCode + "hdfdhskjhkjh");
                $scope.serverError="Sign Up failed, please call us";

            });
        }
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    })
.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 4000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png'],
      headding: ['Watch your money grow', 'Invest & withdraw @ One Click', 'Your money is safe', "We're only a call away"],
      text: ['Your money is expected to grow at an annualized rate of 7.0 - 8.5%, you can see it growing everyday and withdraw anytime you want!',
             'At FinoZen, we have made the entire process of investing extremely simple, now you can invest and withdraw almost instantaneously in One Click!',
             "At FinoZen, you'll be investing in Fino selected liquid mutual fund which has extremely low risk - almost as safe as your savings bank deposit or fixed deposits. You can invest as low as Rs. 500!",
             "You can chat with us or call us anytime from Monday to Saturday between 9 am to 9 pm, we'll resolve all your queries within minutes!"][slides.length % 4],
      id: currIndex++
    });
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
})


.controller('verifySuccessCtrl', function($scope,$sessionStorage,$state,myService,proofRedirectFactory,$timeout,$window) {
console.log($sessionStorage.SessionStatus+"   $sessionStorage.SessionStatus verifySuccessCtrl");
  $timeout(function(){
    //$window.location.reload(true)
    $scope.initial();
  },3000)
  $scope.notnowFunction= function(){
  if(confirmation==1){$state.go("tabsController");}
  else{
    if ($sessionStorage.SessionStatus=='I' || $sessionStorage.SessionStatus=='N' || $sessionStorage.SessionStatus==null ){
      $state.go("tabsController");
    }
    else if ($sessionStorage.SessionStatus=='T'){
      $state.go("tabsController");
    }
    else if ($sessionStorage.SessionStatus=='P' || $sessionStorage.SessionStatus=='Q' ){
      if($sessionStorage.docStatus !="11111"){
        if ($window.confirm("Please Submit your documents to support@finozen.com"))
        $state.go("tabsController");
        else
        $scope.result = "No";
      }
    }
  }
}
  $scope.investNowFunction= function(){
    if(confirmation==1){$state.go("tabsController");}
    else{
      if ($sessionStorage.SessionStatus=='I' || $sessionStorage.SessionStatus=='N' || $sessionStorage.SessionStatus==null ){
        $state.go("bank");
      }
      else if ($sessionStorage.SessionStatus=='T'){
        $state.go("tabsController");
      }
      else if ($sessionStorage.SessionStatus=='P' || $sessionStorage.SessionStatus=='Q' ){
        $state.go("tabsController");
      }
    }
}
  $scope.initial= function(){
    $scope.features=true;
    if(confirmation==1){
      $scope.disbledSkip=true;
      $scope.statusImage="img/steplast.jpg";
      $scope.para1="We have received your details, we will update you within 12 hours on account activation";
      $scope.para2="You can start investing now. Happy Investing!";
      $scope.notNow="Know more";
      $scope.startInvesting="Start Investing";
    }
    else{
      if ($sessionStorage.SessionStatus=='I' || $sessionStorage.SessionStatus=='N' || $sessionStorage.SessionStatus== null ){
        $scope.disbledSkip=true;
        $scope.statusImage="img/step1.jpg";
        $scope.para1="Your FinoZen account is currently inactive. Do you wish to start saving and growing your money everyday?";
        $scope.para2="If yes, please click on �Activate Now� and submit your PAN Number and Bank Details. We will activate your account instantaneously!";
        $scope.notNow ="Not Now";
        $scope.startInvesting="Activate Now";
      }
      else if ($sessionStorage.SessionStatus=='T'){
        $scope.disbledSkip=false;
        $scope.statusImage="img/steplast.jpg";
        $scope.para1="We have received and verified your details, your FinoZen account is now active.";
        $scope.para2="You can start investing now. Happy Investing!";
        $scope.startInvesting="Start Investing";
        $scope.notNow="Activate Now";
      }
      else if ($sessionStorage.SessionStatus=='P'){
        $scope.disbledSkip=false;
        $scope.statusImage="img/step1.jpg";
        $scope.para1="We have received and verified your details and you can start investing.";
        $scope.para2="However, we will need additional details to process your investments.";
        $scope.para3="Pan Card";
        $scope.para4="Address proof (Aadhar/ Driving Licence/ Voter ID/ Passport/ Ration Card)";
        //$scope.para2="We will update you within 12 hours on account activation. Happy Investing!";
        $scope.notNow="Complete Activation";
        $scope.startInvesting="Start Investing";
      }
      else if ($sessionStorage.SessionStatus=='Q'){
        if ($sessionStorage.docStatus=='11111'){
          $scope.disbledSkip=true;
          $scope.statusImage="img/steplast.jpg";
          $scope.para1="We have received your details, we will update you within 12 hours on account activation";
          $scope.para2="You can start investing now. Happy Investing!";
          $scope.notNow="Know more";
          $scope.startInvesting="Start Investing";
        }
        else{
          $scope.disbledSkip=false;
          $scope.statusImage="img/step3.jpg";
          $scope.para1="One of your details is pending for account activation.";
          $scope.para2="Please Submit your documents to support@finozen.com";
          $scope.notNow="Activate Now";
          $scope.startInvesting="Start Investing";
        }
      }
    }
  }
})



.controller('testCtrl', function ($scope) {
  $scope.test=function(){
    console.log("test");
  }
})
.controller('spinController', ['$scope', 'usSpinnerService', '$rootScope','loadSpin','ngDialog',
  function($scope, usSpinnerService, $rootScope,loadSpin,ngDialog) {
$scope.startSpin=function(){
  loadSpin.showSpin($scope.spinneractive );
}
$scope.stopSpin=function(){
  loadSpin.stopSpin($scope.spinneractive );
}
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });

  }
])

.controller('MainDialogCtrl', function ($scope, ngDialog) {
    $scope.clickToOpen = function () {
        var dialog= ngDialog.open({
                    template: 'modalDialogId',
                    className: 'ngdialog-theme-default',
                    closeByEscape : false,
                    closeByDocument: false
                })
    };
    $scope.close=function(){
      ngDialogData.closeAllNow();
    }

    $scope.openConfirm = function () {
      ngDialog.openConfirm({
          template:
            '<p>Are you sure you want to close the parent dialog?</p>' +
            '<div class="ngdialog-buttons text-center">' +
                '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No' +
                '<button type="button" class="ngdialog-button ngdialog-button-primary button-positive " ng-click="confirm(1)">Confirm' +
            '</button></div>',
          plain: true,
          className: 'ngdialog-theme-default',
          closeByEscape : false,
          closeByDocument: false,
          showClose:false,
          scope: $scope
      })
      .then(function(value){
          console.log('resolved:' + value);
          // Perform the save here
      }, function(value){
          console.log('rejected:' + value);

      });
  };


})
    .controller('quotesCtrl', function($scope,$timeout,$interval) {
    $scope.headsUpData=[
    "\"An investment in knowledge pays the best interest.' - Benjamin Franklin",
    "\"The individual investor should act consistently as an investor and not as a speculator.\"",
    "\"Know what you own, and know why you own it.\" - Peter Lynch",
    "\"I would not pre-pay. I would invest instead and let the investments cover it.\"",
    "\"We will only do with your money what we would do with our own\"",
    "\"Do not save what is left after spending but spend what is left after saving\"",
    "\"You will either tell your money what to do or the lack of it will always manage you\"",
    "\"Never depend on a single income. Make investments to create a second source\"",
    "\"Do not save what is left after spending but spend what is left after saving \""
    ];
    $scope.textt =$scope.headsUpData[Math.floor(Math.random() * 9)];
    $scope.plzWait2=function(){
      $interval(function () {
        $scope.textt =$scope.headsUpData[Math.floor(Math.random() * 9)];
            }, 5000);
    }
  $scope.plzWait2();

  })

.controller('Frames', function($scope,$location) {
  $scope.iframeLoadedCallBack = function(loc){
        var loc2= document.getElementById("iframe_id").contentWindow.location;
        //var n = loc2.includes("finozen.com");
        console.log(loc2.href);
        if(loc2=="https://app.finozen.com/"){
          console.log(loc2 + 'true')  ;
        }
    }
});
