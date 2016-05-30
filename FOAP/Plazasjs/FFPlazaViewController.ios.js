'use strict';

import React, {
    AppRegistry,
    Component,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    Dimensions,
    NativeModules
} from 'react-native';

import CodePush from 'react-native-code-push';
var Header = require('../Common/FFPlazaViewControllerHeader')
var stylelist = require('../Component/stylelist');

var FFPlazaViewController = React.createClass({
    getInitialState: function() {
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        var getSectionData = (dataBlob, sectionID, rowID) => {
            return 'ddd';
        };
        var dataSource = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.fetchData();

        return {
            dataSource: dataSource.cloneWithRowsAndSections({}, [], []),
            dataDic: [],
        };
    },
    componentWillMount:function() {
        CodePush.sync();
    },
    componentDidMount:function () {

    },
    render:function(){
        return(
            <ListView style = {{backgroundColor:'#EDEDED'}}
                      renderRow = {this.renderRow}
                      horizontal = {false}
                      directionalLockEnabled={true}
                      dataSource= {this.state.dataSource}>
            </ListView>
        );
    },
    fetchData:function(){
        var requestUrl = 'http://10.213.42.227:11824/api/apps/55';
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var dataArray = responseData["app_content"]["elements"];
                var styleArray = new Array();
                for (var i = 0; i < dataArray.length; i++) {
                    var flag = dataArray[i];
                    var moduleType = flag["moduleType"];

                    switch (moduleType) {
                        case 'PicSlider'://轮播图
                            styleArray.push({'UF_AdvertisementCell':'UF_AdvertisementCell_01'});
                            break;
                        case 'ColFiveNav'://导航按钮（5个）
                            styleArray.push({'FF_PlazaBaseInfoCell':'FF_PlazaBaseInfoCell_0'});
                            break;
                        case 'ColTwoNav'://导航按钮（2个）
                            // styleArray.push({'UF_ColTwoNav':'UF_ColTwoNav_01'});
                            break;
                        case 'LefuIndex'://乐付专区入口
                            styleArray.push({'FF_PlazaFavourableCell':'FF_PlazaFavourableCell_01'});
                            break;
                        case 'FlashbuyIndex'://闪购入口
                            styleArray.push({'UF_FlashCell':'UF_FlashCell_01'});
                            break;
                        case 'CouponIndex'://优惠券入口
                            styleArray.push({'FF_PlazaCouponCell':'FF_PlazaCouponCell_0'});
                            break;
                        case 'ActivityIndex'://活动入口
                            styleArray.push({'FF_PlazaActivityCell':'FF_PlazaActivityCell_0'});
                            break;
                        default:

                    }
                }
                this.setState({
                    dataDic: styleArray,
                })
                 this.getData()
            })
            .done();
    },
    getData:function(){
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary?'+'city_id=' + this.props.cityId +  '&plaza_id=' +
            this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var data = responseData['data']
                var dataBlob = {};
                var rowIDs = [];
                var sectionIDs = [];
                sectionIDs.push('1')
                dataBlob['1'] = '1'
                rowIDs[0] = [];

                var styleArray = this.state.dataDic;
                console.log(data);
                styleArray.forEach(styles => {
                    for(var key in styles){
                        console.log('添加：'+key);
                        rowIDs[0].push(key);
                        dataBlob[key] = data; // 传送全部数据
                    }
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
                })
            })
            .done();
    },
    renderRow:function(data,section,row) {
        var styleArray = this.state.dataDic;
        console.log('shsh'+styleArray);
        var Cell = null;
        styleArray.forEach(style => {
            var type = row;
            console.log('section,row:::'+style+row+style[type]);
            if(style[type]!= null && style[type] != undefined) {
                Cell = stylelist.plazaCells[style[type]];
            }
        });
        console.log('renderRow:'+row+Cell);

        if(Cell != null){
            return ( <Cell
                plazaId = {this.props.plazaId}
                cityId = {this.props.cityId}>
            </Cell> );
        };

        return(<View></View>);
    },
    renderSectionHeader:function(sectionData, sectionID) {
        console.log(sectionData)
        var isFirst = (sectionID == 'Section 0')
        return (
            <View
                style={{height:isFirst ? 0 : 15 }} opacity = {0}>
            </View>
        );
    }
});

AppRegistry.registerComponent('FFPlazaViewController', () => FFPlazaViewController);