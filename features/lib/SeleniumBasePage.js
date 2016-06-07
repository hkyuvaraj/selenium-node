var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var seleniumwd = require('selenium-webdriver');
var driver;

var until = seleniumwd.until;

var MAX_RETRIES = 5;
var retry = 0;
	

function SeleniumBasePage(webdriver){
	this.driver = webdriver;
}

SeleniumBasePage.prototype.waitForLocated = function(locator, timeout){
	timeout = timeout || WAIT_TIME_PRESENT;
	var _this = this;
	//the actual wait but we handle the error
	return _this.driver.wait(until.elementLocated(locator),timeout).then(function(){
		Logger.debug('Element Located successfully using locator: ' + locator);
	}).thenCatch(function(err){

		//if(err.name !== 'StaleElementReferenceError'){
		//	throw new Error(err.stack);
		//}
	//fail after max retry
	if(retry >= MAX_RETRIES){
		Logger.error('Failed Max retries(' + MAX_RETRIES + '), error:' + err.stack);
		throw new Error('Failed Max retries(' + MAX_RETRIES + '), error:' + err.stack);
	}	
	// retry
	retry ++;
	Logger.warn('Element not located with locator ' + locator + 'retrying.. attempt' + retry);
	return _this.waitForLocated(locator,timeout,retry);

	});

};

//This function is not working currently - DO NOT USE
SeleniumBasePage.prototype.waitForNotVisible = function(locator, timeout){
	timeout = timeout || WAIT_TIME_PRESENT;
	var _this = this;
	//the actual wait but we handle the error
	return _this.driver.wait(until.elementIsNotVisible(locator),timeout).thenCatch(function(err){

	//fail after max retry
	if(retry >= MAX_RETRIES){
		Logger.error('Failed Max retries(' + MAX_RETRIES + '), error:' + err.stack);
		throw new Error('Failed Max retries(' + MAX_RETRIES + '), error:' + err.stack);
	}	
	// retry
	retry ++;
	Logger.warn('Element is visible with locator ' + locator + 'retrying.. attempt' + retry + ' Stacktrace:' + err.stack);
	return _this.waitForNotVisible(locator,timeout,retry);

	});

};


SeleniumBasePage.prototype.gotoURL = function(url){
  var _this = this;
  return _this.driver.get(url).then(function(){}).catch(function(err){
		Logger.error('Navigate to URL failed due to reason :' + err.stack);
		throw new Error('Navigate to URL failed due to reason :' + err.stack);
	});
};



SeleniumBasePage.prototype.clickElement = function(locator){
	var _this = this;
	return _this.driver.findElement(locator).click().thenCatch(function(err){
		Logger.error('Click Element failed due to reason :' + err.stack);
		throw new Error('Click Element failed due to reason :' + err.stack);
	});


};

SeleniumBasePage.prototype.enterText = function(locator,textToEnter){
	var _this = this;
	return _this.driver.findElement(locator).sendKeys(textToEnter).thenCatch(function(err){
		Logger.error('Sendkeys to Element failed due to reason :' + err.stack);
		throw new Error('Sendkeys to Element failed due to reason :' + err.stack);
	});


};


SeleniumBasePage.prototype.closeBrowser = function(locator){
	var _this = this;
	return _this.driver.quit().thenCatch(function(err){
		Logger.error('Unable to Quit Browser :' + err.stack);
		throw new Error('Unable to Quit Browser :' + err.stack);
	});


};

retry = 0;

SeleniumBasePage.prototype.waitForNewWindow = function(){
	var _this = this;
   
    return _this.driver.wait(function(){

  		return _this.driver.getAllWindowHandles();

 			},5*1000).thenCatch(function(err){

	if(retry > MAX_RETRIES){
		throw new Error('Failed Max retries for window swtich (' + MAX_RETRIES + '), error:' + err.stack);
	 }	

	// retry
	retry ++;
	Logger.warn('Window not present to switch retrying.. attempt' + retry + " stack trace:" + err.stack);
	Logger.debug('Total Window present currently is: ' + _this.driver.getTitle());
	return _this.waitForNewWindow(retry);

	});

	
	/*
	var parentWindow = _this.driver.getWindowHandle();

	var allWindows = [];
		allWindows = _this.driver.getAllWindowHandles();
    
     Logger.debug('Total no of windows present before swiching =:' + parentWindow);
		
	for (var i= 0; i< allWindows.length; i++ ) {
		if(allWindows[i] !== parentWindow) {
			return _this.driver.switchTo().window(allWindows[i]).getTitle().thenCatch(function(err){
					Logger.error('Unable to Switch to new Window :' + err.stack);
					throw new Error('Unable to Switch to new Window :' + err.stack);
			});
		}
	}
    */

	};


SeleniumBasePage.prototype.switchToNewWindow = function(){
   	var _this = this;
    
	return _this.driver.getAllWindowHandles().then(function(handles){
		if( handles.length > 1 ){
			return _this.driver.switchTo().window(handles[1]);
		}
		else
			throw new Error('New Window is not present to switch');
		
	});
	
	
 };


SeleniumBasePage.prototype.isTextPresentOnPage = function(text){
   	var _this = this;

        return _this.driver.wait(function(){

				return _this.driver.getPageSource().then(function(htmlsource){
		if( htmlsource.indexOf(text) > -1 ) {
			return true;
		} 
		
	});  		
 			},20*1000).thenCatch(function(err){

	if(retry > MAX_RETRIES){
		throw new Error('Failed Max retries for Text present on page (' + MAX_RETRIES + '), error:' + err.stack);
	 }	

	// retry
	retry ++;
	Logger.warn('Text not present on page.retrying.. attempt' + retry + " stack trace:" + err.stack);
	return _this.isTextPresentOnPage(retry);

	});


/*    
	return _this.driver.getPageSource().then(function(htmlsource){
		if( htmlsource.indexOf(text) > -1 ) {
			return true;
		}
		else
			throw new Error('Text [' + text + '] Not present in Page.');
		
	});
	
*/

 };

module.exports = SeleniumBasePage;