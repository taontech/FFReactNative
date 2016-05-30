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

//goodId: 2000008953,
//    goodName: "茵曼2016夏季新款短袖连衣裙文艺休闲运动风印花裙女",
//    goodPic: "T1Q8xTBXZT1RCvBVdK",
//    storeId: "0",
//    plazaId: "0",
//    brandId: "20016106",
//    goodMinPrice: "239.00"
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
var FF_BrandDetailGoodCell_01 = React.createClass({

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    },

    renderRow:function(store){
        var windowWidth =  Dimensions.get('window').width;
        var imgUrl = 'http://img5.ffan.com/' + store['goodPic'];
        var goodName = store['goodName'];
        var goodMinPrice = store['goodMinPrice'];

        return (
            // <TouchableHighlight
            //    onPress={() => this.tappAdvertise(store)}>
            //    <View style = {styles.listRowView}>
            //        <Image style = {styles.listRowImageView}
            //               source={{uri:this._imageUrl(windowWidth*0.5,store['icon'])}}>
            //        </Image>
            //        <Text style = {styles.listRowTitle} >
            //            {store['title']}
            //        </Text>
            //        <Text style = {styles.listRowSubTitle}>
            //            {this.salePrice(store['pay_type'] , store['sale_price'])}
            //        </Text>
            //        <Text style = {styles.listRowSubTitle}>
            //            {store['storeName']}
            //        </Text>
            //    </View>
            //</TouchableHighlight>
            <TouchableWithoutFeedback
               onPress={() => this.tappAdvertise(store)}>
            <View style={{height:windowWidth/2+40,width:windowWidth/2}}>
                <Image style={{flex: 1,resizeMode:'cover'}} source={{uri : imgUrl}}/>
                <Text style={{fontSize:11,marginTop:4,marginLeft:8}}>{goodName}</Text>
                <View style={{flexDirection:'row',marginLeft:8}}>
                  <Text style={{fontSize:8,color:'#858585'}}>参考价:</Text>
                  <Text style={{fontSize:8,color:'#FF5866'}}>{goodMinPrice}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    },

    tappAdvertise:function(store) {
        var schme  = require('react-native').NativeModules.FFReactManager
        var query = {};
        query['goodId'] = store['goodId'];
        query['showGoodInfo'] = 'YES';
        query['brandId'] = store['brandId'];
        query['merchantId'] = store['merchantId'];
        query['storeId'] = store['storeId'];
        // query['cityId'] = this.props.data['cityId'];
        // query['plazaId'] = this.props.data['plazaId'];

        schme.openViewControllerWithControllerName('FFShoppingBrandGoodStoreListViewController',query,0)
    },

    _imageUrl: function(width, name) : string
    {
        var width
        console.log('http://img5.ffan.com/'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/' + name;
    },

    render:function(){
        //console.log("*(*(*(*(");
        //console.log(this.props);
        return (
            <View style={styles.bottomView}>
                <View style={{backgroundColor:'#EEEEEE',height:4}}>
                </View>
                <TouchableWithoutFeedback >
                    <View style={{height:44,flexDirection:'row'}}>
                        <Text style= {{fontSize:15,left:10,top:12,flex:1}}>
                            商品</Text>

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
module.exports = FF_BrandDetailGoodCell_01;
