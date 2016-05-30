/**
 * Created by shaofeng on 16/5/16.
 */


'use strict'

module.exports = {
    getImageUrlWithId(imageId){
        var hashID = 1;
        if (imageId.length > 4) {
            var tt = imageId.substring(3, 1);
            hashID = parseInt(tt) % 6;
            hashID++;
        }
        var strUrl = 'http://img'+hashID+'.ffan.com/'+ 'orig' +'/' + imageId;
        return strUrl;
    }
};