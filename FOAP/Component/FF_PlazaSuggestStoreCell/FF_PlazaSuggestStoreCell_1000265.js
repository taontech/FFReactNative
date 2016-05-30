/**
 * Created by aksoftware on 16/3/9.
 */
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



var FFPlazaFlashSaleCell100265 = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data['suggest_store']),
        };
    },

    render:function(){
        var windowWidth =  Dimensions.get('window').width

        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View style={{backgroundColor:'#EEEEEE',height:10}}>
                </View>
                <View style={{height:44,flexDirection:'row',width:windowWidth,}}>
                    <Text style= {{fontSize:17,left:10,top:10,color:'#FF0000'}}>
                        达人推荐</Text>
                    <Text style= {{fontSize:11,left:25,top:15}}>
                        发现热门好店
                    </Text>
                </View>
            <ListView
                      contentContainerStyle={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        backgroundColor: '#FFFFFF',}
                      }
                      pageSize={3}
                      // horizontal = {true}
                      pagingEnabled = {true}
                      directionalLockEnabled={true}
                      renderRow = {this.renderRow}
                      dataSource= {this.state.dataSource}>
            </ListView>
            </View>

        );

    },

    renderRow:function(store){
        var windowWidth =  Dimensions.get('window').width
        return (
            <TouchableHighlight
                onPress={() => this.tappAdvertise(store)}>
                <View style = {{width:300 / 640 * windowWidth, height:146.0 / 640 * windowWidth + 45.0,alignItems:'center'}}>
                    <Image style = {{width:146.0 / 640 * windowWidth, height:146.0 / 640 * windowWidth}}
                           source={{uri:this._imageUrl(146.0 / 640 * windowWidth,store['icon'])}}>
                    </Image>
                    <View style = {{flexDirection:'row'}}>
                        <Text style = {{color:'#555555',fontSize:18,top:5,width:146.0 / 640 * windowWidth,textAlign:'center'}} numberOfLines={0}>
                            {store['title']}
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    },

    tappAdvertise:function(store) {
        var schme  = require('react-native').NativeModules.FFReactManager

        schme.nav2Url(store['url'])
    },
    _imageUrl: function(width, name) : string
    {
        var width
        console.log('http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name;
    }

});


module.exports = FFPlazaFlashSaleCell100265;
