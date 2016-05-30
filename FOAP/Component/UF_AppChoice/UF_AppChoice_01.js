
'use strict';

import React,{
  Component,
  StyleSheet,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';

var headDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var bottomDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class AppChoice01 extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.renderSourceRow = this.renderSourceRow.bind(this);
    this.props={
      hDataSource: ["1","3"],
      bDataSource: ["1","3","4"],
    }
    this.state={
      headDataSource: headDs.cloneWithRows(this.props.hDataSource),
      bottomDataSource: bottomDs.cloneWithRows(this.props.bDataSource)
    }
  }

  hTappAdvertise(activity,index) {
    this.props.hDataSource.remove
    this.setState({headDataSource:headDs.cloneWithRows(["1"])});
  }

  bTappAdvertise(activity,index) {
    this.setState({headDataSource:bottomDs.cloneWithRows(["1"])});
  }

  renderRow(activity,index){
      var windowWidth =  Dimensions.get('window').width;
      return (
          <TouchableHighlight
              onPress={() => this.hTappAdvertise(activity,index)}>
              <View style = {{height:50,flexDirection:'row'}}>
                  <Image style = {{top:0,width: windowWidth/4,
                     height:50, left:0,backgroundColor:'#345333'}}
                         >
                  </Image>
              </View>
          </TouchableHighlight>
      )
  }

  renderSourceRow(activity,index){
      var windowWidth =  Dimensions.get('window').width
      return (
          <TouchableHighlight
              onPress={() => this.bTappAdvertise(activity,index)}>
              <View style = {{height:50,flexDirection:'row'}}>
                  <Image style = {{top:0,width: windowWidth/4,
                     height:50, left:0,backgroundColor:'#345333'}}
                         >
                  </Image>
              </View>
          </TouchableHighlight>
      )
  }

  render(){
    return(
      <View style={{height:160}}>
      <ListView contentContainerStyle={{
                               flexDirection: 'row',
                                    flexWrap: 'wrap'}}
                renderRow = {this.renderRow}
                dataSource= {this.state.headDataSource}>
      </ListView>
      <View style={{height:80}}>
          <Text>测试</Text>
      </View>

      <ListView contentContainerStyle={{
                               flexDirection: 'row',
                                    flexWrap: 'wrap'}}
                renderRow = {this.renderSourceRow}
                dataSource= {this.state.bottomDataSource}>
      </ListView>
      </View>
    )
  }
}

module.exports = AppChoice01;
