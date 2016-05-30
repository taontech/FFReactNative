
 var FFReactLocationManager = require('react-native').NativeModules.FFReactLocationManager;
module.exports = {
    getLocalData:function(data,error){
       FFReactLocationManager.getLocationInfoWithSuccessCallback(data,error);
      }
};
