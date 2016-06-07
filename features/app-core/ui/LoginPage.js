var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();

var SeleniumBasePage = require('../../lib/SeleniumBasePage');
var seleniumwd = require('selenium-webdriver')
var By = seleniumwd.By;

/*
* Locators for the LoginPage Elements
*
*/

var userTextBoxLocator = By.css("form[class='ajaxlogin'] input[name='username']");
var passwordTextBoxLocator = By.css("form[class='ajaxlogin'] input[name='password']");
var loginButtonLocator =  By.css("form[class='ajaxlogin'] input[value='Submit']");
var invalidUserPwdLocator = By.css("p[id='alert1']"); //contains('Invalid username password.')

/*
* Constructor for the LoginPage
*
*/

function LoginPage(webdriver){
	Logger.debug('Started LoginPage constructor execution....');
	SeleniumBasePage.call(this,webdriver);
	
}

//Hooking up prototypal inheritance to SeleniumBasePage
LoginPage.prototype = Object.create(SeleniumBasePage.prototype);
//Declaring constructor
LoginPage.prototype.constructor = LoginPage;

/*
* Functions for the LoginPage
*
*/


LoginPage.prototype.loginWith = function(username, password){

this.enterText(userTextBoxLocator,username);
this.enterText(passwordTextBoxLocator,password);
this.clickElement(loginButtonLocator);
return this.waitForLocated(invalidUserPwdLocator,10); 

};

module.exports = LoginPage;