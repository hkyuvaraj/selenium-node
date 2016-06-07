var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var webdriver = require('selenium-webdriver');
var driver;




function SeleniumBrowserSetup(){

}


SeleniumBrowserSetup.prototype.getBrowser = function(browserName){

    if(browserName.toLowerCase() === 'chrome'){
      return this.getChromeBrowser();
    }

    else if(browserName.toLowerCase() === 'firefox'){
       return this.getFirefoxBrowser();
    }    

    else if(browserName.toLowerCase() === 'chrome-android'){
       return this.getAndroidChromeBrowser();
    } 

    
    else {
        throw new Error('Invalid Browser requested: ' + browserName);
    }

};

SeleniumBrowserSetup.prototype.getChromeBrowser = function(){

              driver = new webdriver.Builder()
                                    .forBrowser('chrome')
                                    .build();
              driver.manage().window().maximize();
                                    
        return driver;
};

SeleniumBrowserSetup.prototype.getFirefoxBrowser = function(){

              driver = new webdriver.Builder()
                                    .forBrowser('firefox')
                                    .build();
              driver.manage().window().maximize();
                                                  
        return driver;
};


SeleniumBrowserSetup.prototype.getAndroidChromeBrowser = function(){

               driver = new webdriver.Builder()
                                    .usingServer('http://localhost:4723/wd/hub')
                                    .withCapabilities({
                                                      platformName: 'Android',
                                                      platformVersion: '4.4',
                                                      deviceName: 'TA93303LN9',
                                                      browserName: 'Chrome'
                                                      })
                                    .build();

                                    
        return driver;


};

SeleniumBrowserSetup.prototype.closeBrowser = function(driverToClose){

    Logger.debug('Got request to close browsers...');
    return driverToClose.quit();
    
};


SeleniumBrowserSetup.prototype.getScreenshot = function(driver){

    Logger.debug('Got request to take Screenshot...');
     return driver.takeScreenshot();
    
};


module.exports = SeleniumBrowserSetup;