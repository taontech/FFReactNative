/**
 * Created by aksoftware on 16/3/9.
 */
'use strict';
import React, {
    Component,
    View,
    ListView,
    Image,
    Text,
    TouchableHighlight,
    Dimensions
    } from 'react-native';

var FFPlazaFlashSaleCell = React.createClass({
    getInitialState: function() {
      const pinfo = this.props.data['plazaInfo'];
      var data = pinfo;
        return {
            data: pinfo,
        };
    },

    render:function(){
      var imageUrl = this.state.data['plazaPics'];
      var windowWidth =  Dimensions.get('window').width

        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
            <Image style = {{top:0,width: windowWidth, height:200, left:0}}
                   source={{uri:this._imageUrl(windowWidth,imageUrl)}}>
            </Image>

            </View>
        );

    },

    _imageUrl: function(width, name) : string
    {
        var width
        console.log('http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name;
    },
});
module.exports = FFPlazaFlashSaleCell;
