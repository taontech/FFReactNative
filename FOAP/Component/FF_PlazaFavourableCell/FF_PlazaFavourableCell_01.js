
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

class PlazaFavourableCell extends Component {
  constructor() {
    super()
  }

  tappAdvertise(){
      // var schme  = require('react-native').NativeModules.FFReactManager
      // var query = {}
      // query['type'] = 2
      // query['resourceId'] = '3'
      // query['cityId'] = this.props.cityId
      // query['plazaId'] = this.props.plazaId
      // schme.openViewControllerWithControllerName('FFFavourablePayViewController', query, 0)
  }
  render(){
    var windowWidth =  Dimensions.get('window').width
      return (
          <View style={{backgroundColor:'#FFFFFF'}}>
              <View style={{backgroundColor:'#EEEEEE',height:10}}>
              </View>
              <View style={{top:6,height:20}}>
                  <Text>乐付</Text>
              </View>

              <TouchableHighlight onPress={() => this.tappAdvertise()}>
                <View>
                  <Image style={{width:windowWidth,height:140}} source={{uri:'http://m.ffan.com/images/plaza/lefuBanner.png'}}></Image>
                </View>
              </TouchableHighlight>
          </View>
      );
  }
}

module.exports = PlazaFavourableCell;
