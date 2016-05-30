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
    Dimensions,
    StyleSheet,
    PropTypes,
} from 'react-native';

var styles = StyleSheet.create({
  headerViewStyle : {
    backgroundColor:'#FFFFFF',
  },
  headerTextStyle: {
    height : 44,
    width: Dimensions.get('window').width,
  },
  titleStyle: {
    width: 30,
    height: 20,
    alignSelf: 'flex-start',
  },
  saleStyle: {
    width: Dimensions.get('window').width - 30,
    height: 20,
    alignSelf: 'flex-start',
  }
})

var FFPlazaFlashSaleCell = React.createClass({
    propTypes: {
        cityId: PropTypes.string,
        plazaId: PropTypes.string,
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
        };
    },

    render:function(){
        return (
            <View style={styles.headerViewStyle}>
                <View style={styles.headerTextStyle}>
                    <Text style={styles.titleStyle}>闪购</Text>
                    <Text style={styles.saleStyle}>距离开售仅售</Text>
                </View>
                <ListView
                      horizontal = {true}
                      pagingEnabled = {true}
                      directionalLockEnabled={true}
                      renderRow = {this.renderRow}
                      dataSource= {this.state.dataSource}>
                </ListView>
            </View>
        );
    },

    renderRow:function(advertiseModel){
        var windowWidth =  Dimensions.get('window').width
        return (
            <TouchableHighlight
                onPress={() => this.tappAdvertise(advertiseModel)}>
                <View style = {{padding:5,margin: 3, width:178.0 / 640 * windowWidth, height:178.0 / 640 * windowWidth + 67,alignItems:'center'}}>
                    <Image style = {{width:178.0 / 640 * windowWidth, height:178.0 / 640 * windowWidth}}
                           source={{uri:'http://facebook.github.io/react/img/logo_og.png'}}>
                    </Image>
                    <Text style = {{color:'#5C5C5C',fontSize:12,top:9}}>
                        烤鸭
                    </Text>
                    <View style = {{flexDirection:'row'}}>
                        <Text style = {{color:'#C32E26',fontSize:12}}>
                            WIFi
                        </Text>
                        <Text style = {{color:'#737373',fontSize:8}}>
                            WIFi
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    },

    tappAdvertise:function(advertiseModel) {


    }

});
module.exports = FFPlazaFlashSaleCell;
