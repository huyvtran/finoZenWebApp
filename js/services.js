angular.module('myApp.services', [])

.factory('BlankFactory', [function(){

}])

.factory('accessUrlService', ['$resource',function($resource){
	return $resource('https://finotrust.com/WealthWeb/ws/login/restLogin');
}])

/*For Sign up*/
.factory('SignUpUrlService', ['$resource',function($resource){
	return $resource('https://finotrust.com/WealthWeb/ws/clientFcps/clientFcp');
}])

.factory('getPerformanceService', ['$resource','$filter','$sessionStorage',function($resource,$filter,$sessionStorage){
	var date = new Date();
    date = $filter('date')(date,'MM/dd/yyyy');
	return $resource('https://finotrust.com/WealthWeb/ws/clientRepos/getPerfomRepo?pfolioCode='+$sessionStorage.SessionPortfolio+'&endDate='+date+'&noOfDays=40');
}])

/*For fetching the NAV webservices*/
  .factory('getNAVService', ['$resource','$sessionStorage',function($resource,$sessionStorage){
    return $resource('https://finotrust.com/WealthWeb/ws/clientRepos/getInvReco?pfolioCode='+$sessionStorage.SessionPortfolio);
  }])


  /*For fetching the transaction webservices*/
  .factory('getReportService', ['$resource','$sessionStorage',function($resource,$sessionStorage){
    return $resource('https://finotrust.com/WealthWeb/ws/clientRepos/getOrders?pfolioCode='+$sessionStorage.SessionPortfolio+'&noOfOrders=30');
  }])

/*For reliance api instant redemption and getting the bank details*/
  .factory('relianceInstantAmount',['$resource','$sessionStorage',function($resource,$sessionStorage){
    //arn code needs to be added as per the we get from the back-end
    //return('https://220.226.201.234/rmfuat/mowblyserver/wsapi/rmf/prod/wsapi/RedInvbankDetails_V1?acno=499155246676&scheme=LP&plan=IG&arncode=ARN-107100&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=0fe4fcca-63c2-453d-b4f0-06adb516923c');
    return $resource('https://online.reliancemf.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/RedemptionSchemeDetails?acno='+$sessionStorage.folioNums+'&scheme=LP&plan=IG&arncode=ARN-107100&branch=FP99&proxybranch=&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=c3d2f2f3-7d23-4f48-9fe6-82db5449a562') ;
}])
  .factory('relianceUserBank',['$resource','$sessionStorage',function($resource,$sessionStorage){
    //arn code needs to be added as per the we get from the back-end
    return $resource('https://online.reliancemf.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/RedInvbankDetails_V1?arncode=ARN-107100&acno='+$sessionStorage.folioNums+'&scheme=LP&plan=IG&deviceid=PARTNERAPI&appVersion=1.0.1&appName=FINOTRUST&apikey=c3d2f2f3-7d23-4f48-9fe6-82db5449a562');
      }])


.factory('proofRedirectFactory', function() {
  return {
      name : ['panImage','selfie','imageSelection','addressProofImage','signature','feedback']
  };
})

.factory('myService', function() {
 return {
 myFunction: function(proofStatus){
var values = [1,2,3,4,5];
//var xx=(proofStatus+100000).toString();
xx=proofStatus;
var ss=0;
var totalIndex = [];
var keepGoing= true;
angular.forEach(values, function(value) {
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
	 var change = $resource('https://finotrust.com/WealthWeb/ws/secure/fcpSecure/changePassword',{},{
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
		var panupload = $resource('https://finotrust.com/WealthWeb/ws/kycs/kyphImg',{},{
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
      var bankUpload = $resource('https://finotrust.com/WealthWeb/ws/kycs/bankDetails',{},{
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
    var bankUpload = $resource('https://finotrust.com/WealthWeb/ws/kycs/addlKyc',{},{
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
	var mfOrderRequest= $resource('https://finotrust.com/WealthWeb/ws/clientOrders/clientOrderMfBuy',{},{
		save:{
			method:'POST',
		},
	});
	return mfOrderRequest;
}])

/*send MF sell order*/
.factory('mfSellUrlService', ['$resource',function($resource){
	var mfSellRequest= $resource('https://finotrust.com/WealthWeb/ws/clientOrders/clientOrderMfSell',{},{
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

//https://finotrust.com






