var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var Client = require('node-rest-client').Client;

var client;

function RestClient(){

}

RestClient.prototype.get = function(getURL){
 	client = new Client();
    var result = {};
 	

    return new Promise(function(resolve, reject){
            //do some async stuff
    		client.get(getURL,function(data,response){
    			
    			/*
    			for (var prop in response) {
    			 	Logger.debug('RestClient get function response object:' + prop);
    			}
			
    			Logger.debug('RestClient get function response:' + response.statusCode);
    			Logger.debug('RestClient get function response:' + response.statusMessage);
    			Logger.debug('RestClient get function data:' + data);
    		    */

    			result.statusCode = response.statusCode;
    			result.statusMessage = response.statusMessage;
    			result.responsedata = data;

    			resolve(result);
         	 	reject(Error('Rest Client Get request Failed'));
    		});	

         	 

         });


};


RestClient.prototype.getWithAuth = function(getURL, authentication){
    client = new Client(authentication);
    var result = {};
    

    return new Promise(function(resolve, reject){
            //do some async stuff
            client.get(getURL,function(data,response){
                
                result.statusCode = response.statusCode;
                result.statusMessage = response.statusMessage;
                result.responsedata = data;

                resolve(result);
                reject(Error('Rest Client Get request with Authentication Failed'));
            }); 

             

         });


};

module.exports = RestClient;