


var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();



//var Logger = require(process.cwd() + '/config/Logging.js');

var config = require('config');
var restClient = require('../../lib/RestClient');


/*
* Constructor for the JenkinsWS
*
*/

function JenkinsWS(){
	Logger.debug('Started JenkinsWS constructor execution....');
	}


/*
* Functions for the JenkinsWS 
*
*/

JenkinsWS.prototype.getJenkinsData = function(){
 var resultToReturn;
 var auth = {};
 	 auth.user = config.get('webservice.username');
 	 auth.password = config.get('webservice.password');
 	 	 
 
 return restClient.getWithAuth(config.get('webservice.url'), auth).then(function(result){
 	//Logger.debug('getJenkinsData value statusCode= : ' + result.statusCode);
 	//Logger.debug('getJenkinsData value StatusMessage= : ' + result.statusMessage);
 	//Logger.debug('getJenkinsData value data= : ' + result.responsedata);
 	//return result.statusMessage; // this works fine.
 	//return JSON.stringify(result.responsedata); //use this to see the objects
     return result.responsedata.displayName;

 }).catch(function(err){
 	Logger.error('getJenkinsData error caught= : ' + err.stack);
 	
 });
};



module.exports = JenkinsWS;