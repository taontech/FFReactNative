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

var weathercell = React.createClass({
    getInitialState: function() {
      this.executeQuery();
      const pm25 = 0;
      const wp = "http://a4.att.hudong.com/18/00/300000214331132435006480605_950.jpg";
      return{
        weatherstring: pm25,
        weatherpic:wp,
      }
    },

    render:function(){
      console.log(this.state.data);
      var windowWidth =  Dimensions.get('window').width

        return (
            <View style={{backgroundColor:'#00000000',height:80}}
            >
            <Image
            style={{top:0,width:windowWidth,height:80,left:0,}}
            source={{uri:this.state.weatherpic}}
            >
            </Image>
            <Text style={{top:-30,left:20,height:40,color:'white'}}>
            当前PM2.5:
            </Text>
            <Text style={{top:-80,left:100,height:40,color:'#FF0000',fontSize:30}}>
            {this.state.weatherstring}
            </Text>
            </View>
        );

    },
    executeQuery: function () {
      var string = 'http://api.map.baidu.com/telematics/v3/weather?location=guangzhou&output=json&ak=ABac42e4195202a9f98949e8513bcc9f';

      fetch(string)
        .then(response => response.json())
        .then((responseData) => {
          console.log(responseData);
           this.setState({
            weatherstring: responseData['results'][0]['pm25'],
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
});
module.exports = weathercell;
