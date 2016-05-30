module.exports={
    getObjectClass:function (obj) {
        if (obj && obj.constructor && obj.constructor.toString()) {

            /*
             *    for browsers which have name property in the constructor
             * of the object,such as chrome
             */
            if(obj.constructor.name) {
                return obj.constructor.name;
            }
            var str = obj.constructor.toString();
            console.log('str2='+str);
            /*
             * executed if the return of object.constructor.toString() is
             * "[object objectClass]"
             */

            if(str.charAt(0) == '[')
            {
                var arr = str.match(/\[\w+\s*(\w+)\]/);
            } else {
                /*
                 * executed if the return of object.constructor.toString() is
                 * "function objectClass () {}"
                 * for IE Firefox
                 */
                var arr = str.match(/function\s*(\w+)/);
            }
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
        return undefined;
    }
};