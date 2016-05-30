/**
 * Created by aksoftware on 16/3/9.
 */
'use strict';
import React, {
    AppRegistry,
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
      const str = "正在获取天气数据。。。";
      const wp = "http://api.map.baidu.com/images/weather/night/qing.png";
      return{
        weatherstring: str,
        weatherpic:wp,
      }
    },
    render:function(){
      console.log(this.state.data);
        return (
            <View style={{backgroundColor:'#FFFFFF',flexDirection: 'row',height:60,}}
            >
            <Image
            style={{top:15,width:42,height:30,left:10,}}
            source={{uri:this.state.weatherpic}}
            >
            </Image>
            <Text style={{top:20,left:20,height:40}}>
            {this.state.weatherstring}
            </Text>

            </View>
        );

    },
    executeQuery: function () {
      var string = 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=ABac42e4195202a9f98949e8513bcc9f';

      fetch(string,{
        headers: {
        'Cache-Control': 'no-cache'
      },
      async:true,
      })
        .then(response => response.json())
        .then((responseData) => {
          console.log(responseData);
           this.setState({
            weatherstring: responseData['results'][0]['weather_data'][0]['date']+"  "+responseData['results'][0]['weather_data'][0]['weather'],
            weatherpic:responseData['results'][0]['weather_data'][0]['dayPictureUrl'],
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
});
// module.exports = weathercell;

AppRegistry.registerComponent('weathercell', () => weathercell);
