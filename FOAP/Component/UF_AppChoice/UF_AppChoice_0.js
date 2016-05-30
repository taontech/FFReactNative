1/**
 * Created by aksoftware on 16/3/9.
 */
'use strict';
// var CodePush = require(“react-native-code-push”);
import React, {
    Component,
    View,
    ListView,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
  } from 'react-native';
  var styles = StyleSheet.create({
      listContentStyles : {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap : 'wrap',
        flex : 0,
        position: 'relative',
      },
    })
  const applist = [
    { name:"大象医疗",icon:"http://pic.5577.com/up/2015-8/201587101921.png",scheme:"http://www.eleph.cn/en/index" },
    { name:"万达电影",icon:"http://img4.imgtn.bdimg.com/it/u=712933712,3452046272&fm=21&gp=0.jpg",scheme:'http://www.wandafilm.com' },
    { name:"手机百度",icon:"http://pic.5577.com/up/2015-8/201587101921.png",scheme:'BaiduBoxApp://' },
    { name:"新浪微博",icon:"http://img1.imgtn.bdimg.com/it/u=39424065,2723915992&fm=21&gp=0.jpg",scheme:"sinaweibo://" },
    { name:"QQ",icon:"http://img4.imgtn.bdimg.com/it/u=712933712,3452046272&fm=21&gp=0.jpg",scheme:'mqq://' },
    { name:"微信",icon:"http://pic.5577.com/up/2015-8/201587101921.png",scheme:"wechat://" },
    { name:"支付宝",icon:"http://img5.imgtn.bdimg.com/it/u=4266129146,571732549&fm=21&gp=0.jpg",scheme:'Alipay://' },
    { name:"飞凡",icon:"http://img5.imgtn.bdimg.com/it/u=4266129146,571732549&fm=21&gp=0.jpg",scheme:'wandaappfeifan://FFFindSearchViewController?cityId=110100&plazaId=1000265&type=1&buriedType=1'},
  ];

var FFPlazaBaseInfoCell = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(applist),
        };
    },
    // componentDidMount: function() {
    //   CodePush.sync();
    // },
    render:function(){
        var windowWidth =  Dimensions.get('window').width
        var lineCount = (applist.length + 1) / 2;
        var lineNumber = lineCount > 2 ? 2 : 1;
        return (
            <ListView
                contentContainerStyle={styles.listContentStyles}
                style = {{backgroundColor:'#FFFFFF',width:windowWidth, height:windowWidth * 146.0 / 640 * lineNumber}}
                renderRow = {this.renderRow}
                dataSource= {this.state.dataSource}>
            </ListView>
        );
    },

    renderRow:function(data){
        var windowWidth =  Dimensions.get('window').width
        var lineCount = (applist.length + 1) / 2;
        var lineNumber = lineCount > 2 ? 2 : 1;
        return (
            <TouchableHighlight onPress={() => this.tappAdvertise(data)}>
               <View style = {{width:windowWidth / lineCount, height:windowWidth * 146.0 / 640,alignItems:'center'}}>
                   <Image style = {{width:50, height:50,top:10}}
                          source={{uri:data['icon']}}>
                   </Image>
                   <Text style = {{top:15,fontSize:13}}>
                       {data['name']}
                   </Text>
               </View>
            </TouchableHighlight>
        );
    },

    iconName:function(type) {
        switch (type) {
            case 0:
                return require('image!plaza_find_store')
            case 1:
                return require('image!plaza_wifi')
            case 2:
                return require('image!plaza_coupon')
            case 3:
                return require('image!plaza_shaking')
            case 4:
                return require('image!plaza_map')
            case 5:
                return require('image!plaza_parking')
            case 6:
                return require('image!plaza_lepay')
            case 7:
                return require('image!plaza_member')
            case 8:
                return require('image!plaza_coupon')
            case 9:
                return require('image!plaza_sign_in')
            case 10:
                return require('image!plaza_ar')

        }
        return "image!plaza_find_store"
    },

    tappAdvertise:function(data) {
      var FFRN  = require('react-native').NativeModules.FFReactManager
      FFRN.nav2Url(data['scheme']);
    }
});
module.exports = FFPlazaBaseInfoCell;
