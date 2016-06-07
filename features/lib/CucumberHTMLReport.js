var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();

var Report = require('cucumber-html-report');

var options = {
                source: './logs/cucumber_report.json',
                dest: './logs/reports',
                name: 'cucumber_report.html',
                title: 'Yuvaraj Cucumber Report'
              };
  

        
function CucumberHTMLReport(){

}


CucumberHTMLReport.prototype.generate = function(){
    Logger.debug('Started genearting HTML report from json file....');
    var report = new Report(options);
        report.createReport();
    Logger.debug('HTML report generation successful !');    
};



module.exports = CucumberHTMLReport;