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
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    },

    render:function(){
        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View style={{backgroundColor:'#EEEEEE',height:10}}>
                </View>
                <View style={{height:44}}>
                    <Text>闪购</Text>
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
