var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


function DateTime(){

}


DateTime.prototype.getCurrentDateTime = function(){
    
     var now = new Date(),
            year = this.addLeadingZeros(now.getFullYear(), 2),
            month = this.addLeadingZeros(now.getMonth() + 1, 2),
            day = this.addLeadingZeros(now.getDate(), 2),
            hours = this.addLeadingZeros(now.getHours(), 2),
            minutes = this.addLeadingZeros(now.getMinutes(), 2),
            seconds = this.addLeadingZeros(now.getSeconds(), 2),
            milliSeconds = this.addLeadingZeros(now.getMilliseconds(), 3);

        var dateTime = year + '-' + month + '-' + day + '-' + hours + '.' + minutes + '.' + seconds + '.' + milliSeconds;
        return dateTime;

};

DateTime.prototype.addLeadingZeros = function(string, maxLength){
    
    return string.toString().length < maxLength ? this.addLeadingZeros("0" + string, maxLength) : string;
};


module.exports = DateTime;