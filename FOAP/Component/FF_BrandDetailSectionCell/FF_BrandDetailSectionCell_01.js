/**
 * Created by shaofeng on 16/5/16.
 */


'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Component,
    Dimensions
    } = ReactNative;

var FF_BrandDetailSectionCell_01 = React.createClass({

    getInitialState: function() {

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            allItem : 1
        }
    },

    componentWillMount: function() {
        this.fetchData();
    },

    fetchData: function(){
        var url = 'http://api.ffan.com/ffan/v1/brand/baseinfo?brandId=' + this.props.data.brandId + '&cityId=' + this.props.data.cityId;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var data = responseData["data"];

                var item = {};

                item["all"] = 0;
                var itemDic = data["item"];
                var flag = 1;

                for (var i in itemDic)
                {
                    var itemdata = itemDic[i];
                    if (itemdata !== 0) {
                        item[i] = itemdata;
                        flag ++;
                    }
                }

                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(item),
                    allItem:flag

                })

            })
    },

    pressRow: function(rowID: string) {
        this.props.data.fun(rowID);
    },

    renderRow: function(rowData, sectionID, rowID) {
        var windowWidth =  Dimensions.get('window').width;
        var width = windowWidth/this.state.allItem;
        var title = rowID;
        var value = rowData;
        if (value === 0)
        {
            value = "";
        }

        if (rowID === 'all')
        {
            title = "全部";
        }
        else if(rowID === 'goods')
        {
            title = "商品";
        }
        else if(rowID === 'stores')
        {
            title = "门店";
        }
        else if(rowID === 'news')
        {
            title = "资讯";
        }

    return (
        <TouchableHighlight onPress={() => this.pressRow(rowID)}>
            <View key = {rowID} style={{width:width,flexDirection: 'row',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#ffffff',
        flex:1,height:40}}>
                <View style={{justifyContent: 'center',alignItems: 'center',height:40,flexDirection: 'column'}}>
                    <Text style={styles.text}>
                        {title}
                    </Text>
                    <Text style={styles.subText}>
                        {value}
                    </Text>
                </View>
                <View style={styles.separator} />
            </View>
        </TouchableHighlight>
    );
},
    render: function(){
        return(<ListView style={{height:40,flexDirection: 'column',flex:1,backgroundColor:'#111111'}}
                         horizontal={true}
                         bounces = {false}
                         dataSource={this.state.dataSource}
                         renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}>
        </ListView>);
    }
});

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#ffffff',
        flex:1,
    },
    separator: {
        height: 1,
        backgroundColor: '#C1111C',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        color:"#00C1F9",
        fontSize:14,
        marginTop:5
    },
    subText: {
        flex: 1,
        color:"#00C1F9",
        fontSize:10,
        marginTop:2
    },
});

module.exports = FF_BrandDetailSectionCell_01;
