var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var driver;


var HomePage = require('../../app-core/ui/RedBusHomePage.js');
var LoginPage = require('../../app-core/ui/LoginPage.js');



var redbusStep = function redbusStep(){

     var hp;
     var lp;
     var jenkinsWS;
    
  	   
  this.Given(/^I am on the redbus home page$/,  {timeout: 60 * 1000}, function () {
          driver = this.getDriver(); //driver from hooks.js
          hp = new HomePage(driver); 
          return hp.isLoaded();

         //return hp.gotoLoginPage();
     });

  

  this.When(/^I select (.+) and (.+)$/,  {timeout: 60 * 1000}, function (from, to) {
    //callback.pending();
      hp.selectSourceCity(from);
      return hp.selectDestCity(to);
       
  });

  this.When(/^I select the (.+)$/,  {timeout: 60 * 1000}, function (traveldate) {
    //callback.pending();
  });

  this.When(/^I search Buses$/,  {timeout: 60 * 1000}, function () {
    //callback.pending();
  });


  this.Then(/^I should have available seats in the (.+)$/,  {timeout: 60 * 1000}, function (travelsname) {
    //callback.pending();
  });

 




};
module.exports = redbusStep;