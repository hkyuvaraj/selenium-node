var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();

var HomePage = require('../../app-core/ui/HomePage.js');
var LoginPage = require('../../app-core/ui/LoginPage.js');


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var JenkinsWS = require('../../app-core/services/JenkinsWS.js');

var driver;

var ways2automationStep = function ways2automationStep(){

     var hp;
     var lp;
     var jenkinsWS;

    
 	this.Given(/^I am on the waytoAutomation login page$/, {timeout: 60 * 1000}, function () {

         driver = this.getDriver(); //driver from hooks.js
         hp = new HomePage(driver); 
         hp.isLoaded();
         return hp.gotoLoginPage();
         
       });

	   
	 this.When(/^I login using (.*) and (.*)$/, {timeout: 60 * 1000}, function (username, password) {
        lp = new LoginPage(driver);
        return lp.loginWith(username,password);
        
       });	   
	   
	this.Then(/^I should see the results displayed$/, {timeout: 60 * 1000}, function () {
         
         jenkinsWS = new JenkinsWS();
        
        return chai.expect(jenkinsWS.getJenkinsData()).to.eventually.equal('yuva-automation');
        
        });
};
module.exports = ways2automationStep;