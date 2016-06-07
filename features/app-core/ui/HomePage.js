var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var config = require('config');
var SeleniumBasePage = require('../../lib/SeleniumBasePage');


var seleniumwd = require('selenium-webdriver');
var By = seleniumwd.By;

/*
* Locators for the Home page Elements
*
*/

var draggableLinkLocator = By.css("img[src$='draggable.jpg']");
var signInLinkLocator = By.linkText("Signin");
var userTextBoxLocator = By.css("form[class='ajaxlogin'] input[name='username']");
var passwordTextBoxLocator = By.css("form[class='ajaxlogin'] input[name='password']");
var loginButtonLocator =  By.css("form[class='ajaxlogin'] input[value='Submit']");


/*
* Constructor for the Home page
*
*/

function HomePage(webdriver){
		Logger.debug("Current working directory: " + process.cwd());
	    Logger.debug('Started HomePage constructor execution....');
	    SeleniumBasePage.call(this,webdriver);
	    this.launchApp();
	    return this; //without return not working for appium
}


//Hooking up prototypal inheritance to BasePage
HomePage.prototype = Object.create(SeleniumBasePage.prototype);
//Declaring constructor
HomePage.prototype.constructor = HomePage;


/*
* Functions for the Home page 
*
*/

HomePage.prototype.launchApp = function(){
//Logger.debug(config.util.getConfigSources());
Logger.debug('Started function launchApp...');

return this.gotoURL(config.get('webapp.url'));

};



HomePage.prototype.isLoaded = function(){
return this.waitForLocated(draggableLinkLocator,60);
};

HomePage.prototype.gotoLoginPage = function(){

Logger.debug('Started gotoLoginPage Function....');	
 this.clickElement(draggableLinkLocator);
 this.waitForNewWindow();
 this.switchToNewWindow();
 this.waitForLocated(signInLinkLocator,60);
 this.clickElement(signInLinkLocator);
 return this.waitForLocated(loginButtonLocator,60);

};

HomePage.prototype.loginWith = function(username, password){

this.enterText(userTextBoxLocator,username);
this.enterText(passwordTextBoxLocator,password);
return this.clickElement(loginButtonLocator);

};

module.exports = HomePage;