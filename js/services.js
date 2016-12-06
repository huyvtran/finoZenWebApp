angular.module('myApp.services', [])

.factory('BlankFactory', [function(){

}])

.factory('accessUrlService', ['$resource',function($resource){
	return $resource('http://52.66.96.81/WealthWeb/ws/login/restLogin');
}])

/*For Sign up*/
.factory('SignUpUrlService', ['$resource',function($resource){
	return $resource('http://52.66.96.81/WealthWeb/ws/clientFcps/clientFcp');
}])

.factory('getPerformanceService', ['$resource','$filter','$sessionStorage',function($resource,$filter,$sessionStorage){
	var date = new Date();
    date = $filter('date')(date,'MM/dd/yyyy');
	return $resource('http://52.66.96.81/WealthWeb/ws/clientRepos/getPerfomRepo?pfolioCode='+$sessionStorage.SessionPortfolio+'&endDate='+date+'&noOfDays=40');
}])

/*For fetching the NAV webservices*/
  .factory('getNAVService', ['$resource','$sessionStorage',function($resource,$sessionStorage){
    return $resource('http://52.66.96.81/WealthWeb/ws/clientRepos/getInvReco?pfolioCode='+$sessionStorage.SessionPortfolio);
  }])


  /*For fetching the transaction webservices*/
  .factory('getReportService', ['$resource','$sessionStorage',function($resource,$sessionStorage){
    return $resource('http://52.66.96.81/WealthWeb/ws/clientRepos/getOrders?pfolioCode='+$sessionStorage.SessionPortfolio+'&noOfOrders=100');
  }])

  /*Reliance ZBF page service*/
   .factory('getZBFService', ['$resource','$sessionStorage',function($resource,$sessionStorage){
	   console.log($sessionStorage.portfolioCode+"portfolioCode");
    return $resource('http://52.66.96.81/WealthWeb/ws/clientOrders/zbf?portfolioCode=CRN26946E20018&rtaCode=RMFLPIG');
  }])

  /*Reliance folio number sending it to backend */
   .factory('relianceInstantZBF',['$resource','$sessionStorage',function($resource,$sessionStorage){
       var relianceZBF = $resource('http://52.66.96.81//ealthweb/ws/clientorders/createfolio',{},{
          save:{
              method:'POST',
              headers:{
                  'Content-Type' :'application/json'
              }
          }
      });

      return relianceZBF;
  }])

  // Referral Factory


 .factory('getReferalStat', ['$resource','$sessionStorage',function($resource,$sessionStorage){
	console.log($sessionStorage.SessionMobNo);
	return $resource('hhttp://52.66.96.81/WealthWeb/ws/login/getMyReferrals?mobile='+$sessionStorage.SessionMobNo);

}])
/*For reliance api instant redemption and getting the bank details*/
  .factory('relianceInstantAmountAPI',['$resource','$sessionStorage',function($resource,$sessionStorage){
       var relianceIntsaAmount = $resource('http://52.66.96.81/WealthWeb/ws/pymt/wrapperWS',{},{
          save:{
              method:'POST',
              headers:{
                  'Content-Type' :'application/json'
              }
          }
      });

      return relianceIntsaAmount;
  }])


.factory('proofRedirectFactory', function() {
  return {
      name : ['panImage','selfie','imageSelection','addressProofImage','signature','feedback']
  };
})

.factory('myService', function() {
 return {
 myFunction: function(proofStatus){
	 /*
	 console.log(proofStatus)
	 var proofStatusValue=(proofStatus+100000).toString();
var fromIndex=0;
var totalIndex = [];
var keepGoing= true;
angular.forEach([1,2,3,4,5,6], function(value) {
     if(keepGoing) {
     var currentIndex = proofStatusValue.indexOf("0",fromIndex);
    if(currentIndex == -1){
      keepGoing = false;
    }
    else{
		this.push(currentIndex);
    }
  }
  fromIndex=currentIndex+1;

}, totalIndex);
console.log(totalIndex +"     in service");
return totalIndex;




*/

var values = [1,2,3,4,5];
//var xx=(proofStatus+100000).toString();
xx=proofStatus;
var ss=0;
var totalIndex = [];
var keepGoing= true;
angular.forEach(values, function(value) {
  //this.push(': xzczx ' + value);
     if(keepGoing) {
     var a = xx.indexOf("0",ss);
    if(a == -1){
      keepGoing = false;
    }
    else{
    this.push(a);
    }
  }
  ss=a+1;

}, totalIndex);
console.log(totalIndex +"     in service");
return totalIndex;


}
 };
 })
/*Get data*/
.factory('loginInfoService', ['accessUrlService','$q',function(accessUrlService,$q){
	return  {
	getJsonId: function(loginData) {
		var deferred = $q.defer();
		accessUrlService.save(loginData,function(data){
		deferred.resolve(data);
		},function(error){
			console.log("eror");
			deferred.reject(error);
		});
		return deferred.promise;
		}
	}
}])


.factory('changePinService', ['$resource','$sessionStorage', function($resource,$sessionStorage){
//console.log();
	var jsid=$sessionStorage.SessionIdstorage;
	console.log(jsid + "  jsid");
	 var change = $resource('http://52.66.96.81/WealthWeb/ws/secure/fcpSecure/changePassword',{},{
        save:{
            method:'POST',
            headers:{
            'X-AUTH-TOKEN':jsid
            }
        }
    });
		return change;

}])

	/*PAN image factory*/
	.factory('panImageService',['$resource','$sessionStorage',function($resource){
		var panupload = $resource('http://52.66.96.81/WealthWeb/ws/kycs/kyphImg',{},{
			save:{
				method:'POST',
				method:'POST',
					headers:{
					'Content-Type' :'application/json'
				}
			}
		});
		return panupload;

}])

/*Bank Details*/
    .factory('bankDetailsService',['$resource',function($resource){
      var bankUpload = $resource('http://52.66.96.81/WealthWeb/ws/kycs/bankDetails',{},{
        save:{
          method:'POST',
          headers:{
            'Content-Type' :'application/json'
          }
        }
      });
		return bankUpload;
    }])

      /*Questions factory*/
  .factory('questionsService',['$resource',function($resource){
    var bankUpload = $resource('http://52.66.96.81/WealthWeb/ws/kycs/addlKyc',{},{ //in final build change it to finotrust.com
      save:{
        method:'POST',
        headers:{
          'Content-Type' :'application/json'
        }
      }
    });
    return bankUpload;
  }])
/*Sign up Service*/
.factory('signUpService', ['SignUpUrlService','$q',function(SignUpUrlService,$q){

	return  {
	sendSignUp: function(formdata) {
		var deferred = $q.defer();
		SignUpUrlService.save(formdata,function(data){
		deferred.resolve(data);
		},function(error){
			console.log("eror");
			deferred.reject(error);
		});
		return deferred.promise;
		}
	}
}])

/*send MF orders*/
.factory('mfOrderUrlService', ['$resource',function($resource){
	var mfOrderRequest= $resource('http://52.66.96.81/WealthWeb/ws/clientOrders/clientOrderMfBuy',{},{
		save:{
			method:'POST',
		},
	});
	return mfOrderRequest;
	//http://52.66.96.81/WealthWeb/ws/clientOrders/clientOrderMfBuy
}])

/*send MF sell order*/
.factory('mfSellUrlService', ['$resource',function($resource){
	var mfSellRequest= $resource('http://52.66.96.81/WealthWeb/ws/clientOrders/clientOrderMfSell',{},{
		save:{
			method:'POST',
		},
	});
	return mfSellRequest;
}])

.factory('GetTransactionService', ['$q,getTransactionService', function(getTransactionService,$q){
	return {


	};
}])

.factory('dateService', ['$filter',function($filter){
	return  {
		getDate: function(){
			var date = new Date();
			date = $filter('date')(date,'yyyy-MM-dd');
			return date;
		}

	}

}])

//http://52.66.96.81


.service('loadSpin', ['usSpinnerService', function (usSpinnerService) {
    this.showSpin = function(spinneractive) {
      console.log(spinneractive+"  in service")
      if (!spinneractive) {
        usSpinnerService.spin('spinner-1');
      }
    }
    this.stopSpin = function(spinneractive) {
      console.log(spinneractive+"  in service")
      if (spinneractive) {
        usSpinnerService.stop('spinner-1');
      }
    };
}])


