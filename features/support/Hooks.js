var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();

var config = require('config');
Logger.debug('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));


var Report = require(process.cwd() + '/features/lib/CucumberHTMLReport');
var DateTime = require(process.cwd() + '/features/lib/DateTime');
var ScreenRecorder = require(process.cwd() + '/features/lib/ScreenRecorder');

var BrowserSetup = require(process.cwd() + '/features/lib/SeleniumBrowserSetup');


var recorder;

var hooks = function () {

this.Before({tags: ["@web"]}, function (scenario) {

  	/*
    scenario:getName
	scenario:getDescription
	scenario:getUri
	scenario:getLine
	scenario:getTags
	scenario:isSuccessful
	scenario:isFailed
	scenario:isPending
	scenario:isUndefined
	scenario:isSkipped
	scenario:getException
	scenario:getAttachments
	scenario:attach
  	*/
    	Logger.debug('Started before hook for scenario:' + scenario.getName());
         process.env.testtool = 'Selenium';

        var driver = new BrowserSetup().getBrowser('Chrome-Android');
		    this.setDriver(driver);
        
        /*
         recorder = new ScreenRecorder();
         return recorder.start().then(function(){
            Logger.debug('Before Scenario Hook Message:Recording Started...');
         }).catch(function(errmessage){
            Logger.error('Before Scenario Hook Message: '+ errmessage);
         }); 
        */

  });


this.Before({tags: ["@mobileweb"] , timeout: 60 * 1000},function (scenario) {

      var _this = this;

      Logger.debug('Started before hook for scenario:' + scenario.getName());
      process.env.testtool = 'Appium';

        var driver = new BrowserSetup().getAndroidBrowser('chrome');
        _this.setDriver(driver);
                

  });



this.After({tags: ["@web"]},function (scenario) {
 
    	Logger.debug('Started After hook for scenario:' + scenario.getName() + ' [ Is run successful = ' +  scenario.isSuccessful() + ']');
       
       //Attach screenshot if scenario failed
    	 if(scenario.isFailed()){
    	   	 new BrowserSetup().getScreenshot(this.getDriver()).then(function(stream){
           var decodedImage = new Buffer(stream, 'base64').toString('binary');
    			 scenario.attach(decodedImage, 'image/png');
    	  	  Logger.debug('Browser screenshot attached sucessfully');		
    	   });
    	  
    	 }
    	
      //stop the recording for the scenario
       /*
        recorder.stop().then(function(){
          Logger.debug('After Scenario Hook Message: Recording Stopped');
        }).catch(function(errmessage) {
          Logger.error('After Scenario Hook Message: '+ errmessage);
        });
       */


       //Close all the browser windows
    	 return new BrowserSetup().closeBrowser(this.getDriver()).then(function(){
    	 	Logger.debug('Current scenario Browser instances closed sucessfully');		
    	 });

	
  });


this.registerHandler('AfterFeatures', function (event, callback) {
    // clean up!
    // Be careful, there is no World instance available on `this` here
    // because all scenarios are done and World instances are long gone.
       /*  Generate the HTML report
       */
        var dt = new DateTime();

        Logger.debug('AfterAll features Hook started at: ' + dt.getCurrentDateTime());    
         
        var report = new Report();
            report.generate();
         
    callback();
  });




};

module.exports = hooks;