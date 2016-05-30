/**
 * Created by shaofeng on 16/5/17.
 */

'use strict';
import React, {
    Component,
    View,
    ListView,
    Image,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions
} from 'react-native';

//storeId: "10036648",
//    picture: "T1Q4hTByKT1RCvBVdK",
//    storeName: "茵曼+体验店",
//    plazaName: "北京市朝阳区建国路93号万达广场A座新世界百货4楼茵曼专柜",
//    rank: 3,
//    latitude: 39.914368,
//    longitude: 116.47923,
//    storeUrl: "http://h5.ffan.com/app/merchant?storeid=10036648",
//    distance: ""
var styles = StyleSheet.create({
    bottomView :{
        backgroundColor: '#FFFFFF',
    },
    listView: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listHeaderView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 205 / 640,
        flex: 1,
        resizeMode:'stretch',
    },
    listRowView: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5 * 9 / 16 + 73,
        flex: 1,
        paddingRight: 0.5,
    },
    listRowImageView: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5 * 9 / 16,
    },
    listRowTitle: {
        color: '#999999',
        fontSize: 12,
        top: 8,
        left: 15,
        right: 5,
        width: Dimensions.get('window').width * 0.5,
    },
    listRowSubTitle: {
        color: '#F44336',
        fontSize: 12,
        top: 15,
        left: 15,
        right: 5,
        width: Dimensions.get('window').width * 0.5,
    },
});
var FF_BrandDetailStore_01 = React.createClass({

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    },

    renderRow:function(store){
        var windowWidth =  Dimensions.get('window').width
        console.log("&*&*&*&*&*&*&*&")
        console.log(store);
        var imgUrl = 'http://img5.ffan.com/' + store['picture'];
        var plazaName = store['plazaName'];
        var storeName = store['storeName'];
        var distance = store['distance'];
        return (
          <TouchableWithoutFeedback
             onPress={() => this.tappAdvertise(store)}>
            <View style={{height:60,width:windowWidth,flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <View style={{flex:1,width:100}}>
                        <Image style={{flex: 1,resizeMode:'cover'}} source={{uri : imgUrl}}/>
                    </View>
                </View>
                <View style={{flex:2,marginLeft:16}}>
                    <Text style={{fontSize:9,color:'#444444'}}>
                        {storeName}
                    </Text>
                    <Text style={{fontSize:12,marginTop:4}}>
                        {plazaName}
                    </Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Image></Image>
                    <Text>{distance}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    },

    tappAdvertise:function(store) {
        var schme  = require('react-native').NativeModules.FFReactManager
        var storeUrl = store['storeUrl'];
        schme.openUrl(storeUrl);
    },

    _imageUrl: function(width, name) : string
    {
        var width
        console.log('http://img5.ffan.com/'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/' + name;
    },

    render:function(){
        console.log("*(*(*(*(");
        console.log(this.props);
        return (
            <View style={styles.bottomView}>
                <View style={{backgroundColor:'#EEEEEE',height:4}}>
                </View>
                <TouchableWithoutFeedback >
                    <View style={{height:44,flexDirection:'row'}}>
                        <Text style= {{fontSize:15,left:10,top:12,flex:1}}>
                            门店</Text>

                        <View style={{justifyContent: 'center',
        alignItems: 'center',paddingRight:15}}>
                            <Image source={require('image!brand2016_moreRightBlack')}>
                            </Image>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
                <ListView
                    contentContainerStyle = {styles.listView}
                    horizontal = {false}
                    pagingEnabled = {true}
                    directionalLockEnabled={true}
                    renderRow = {this.renderRow}
                    dataSource= {this.state.dataSource}>
                </ListView>

            </View>
        );
    }
});
module.exports = FF_BrandDetailStore_01;
