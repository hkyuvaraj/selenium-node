var log4js = require('log4js');
log4js.configure('config/log4js_config.json');
var Logger = log4js.getLogger();


var recorder = require('screen-capture-recorder');
var scene    = new recorder({ x:0, y:0, w:100, h:100 });
 
function ScreenRecorder(){

}


ScreenRecorder.prototype.start = function(){
    Logger.debug('Got request to start recording....');
    
    return new Promise(function(resolve, reject){

      scene.warmup(function(err){
      //Logger.debug('Warmup for recording....');
      //recorder is ready, now start capture
      scene.StartRecord(function(err){
      //Logger.debug('Trying to Start recording....');
      if(err)
      Logger.warn("Error starting recording:" + err.stack);
      //capture start _very_ quicky (60ms)
        });
  
      });

            resolve('Screen Recording started successfully');
            reject(Error('Not able tp start recording:' + err.stack));

    });

       

};


ScreenRecorder.prototype.stop = function(string, maxLength){
       Logger.debug('Got request to stop recording....');


       return new Promise(function(resolve, reject){


        scene.once(recorder.EVENT_DONE, function(err, path){
        if(!err)
            Logger.debug("Everything is ok, find recorded video in %s", path);
        });
 
        scene.StopRecord(function(err){
        if(err)
        Logger.warn("Error stopping recording:" + err.stack);
        else
        Logger.debug('Stopped recording successfully.');
        
        }); 
      
             resolve('Screen Recording stopped successfully');
              reject(Error('Not able tp stop recording:' + err.stack));


       });

       



    };


module.exports = ScreenRecorder;