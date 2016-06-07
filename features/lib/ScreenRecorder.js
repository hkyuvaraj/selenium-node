var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();

var RecordRTC = require('recordrtc');

var options = {
   type: 'video',
   recorderType: RecordRTC.WhammyRecorder,
   frameInterval: 20 // minimum time between pushing frames to Whammy (in milliseconds) 
};


var recordRTC = RecordRTC({},options);
 


function ScreenRecorder(){

}


ScreenRecorder.prototype.start = function(){
    Logger.debug('Got request to start recording....');
    
    return new Promise(function(resolve, reject){

            recordRTC.startRecording();
            resolve('Screen Recording started successfully');
            reject(Error('Not able to start recording:' + err.stack));

    });

       
};


ScreenRecorder.prototype.stop = function(string, maxLength){
       Logger.debug('Got request to stop recording....');


       return new Promise(function(resolve, reject){

            recordRTC.stopRecording(function(videoURL) {
            video.src = videoURL;
            
            Logger.debug('videoURL: ' + videoURL);
 
            var recordedBlob = recordRTC.getBlob();
            
            recordRTC.save('ajiteshvideo');

            recordRTC.getDataURL(function(dataURL) {
               Logger.debug('dataURL: ' + dataURL);
 
             });
            });
      
             

              resolve('Screen Recording stopped successfully:');
              reject(Error('Not able to stop recording:' + err.stack));


       });


    };


module.exports = ScreenRecorder;