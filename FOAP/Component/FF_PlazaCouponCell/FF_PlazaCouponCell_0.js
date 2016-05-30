/**
 * Created by aksoftware on 16/3/10.
 */

'use strict';

import React, {
    Component,
    View,
    ListView,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    PropTypes,
    NativeModules,
} from 'react-native';


var refreshStatusNone = 1;
var refreshStatusInit = 2; //初始状态
var refreshStatusLoadmore = 3; //加载更多
var refreshStatusDone = 4; //加载完成

var loadCouponOffset = 0;

var FFPlazaCouponCell = React.createClass({
    propTypes: {
        cityId: PropTypes.string.isRequired,
        plazaId: PropTypes.string,
        couponCellCount: PropTypes.number,
        pullDistance: PropTypes.number,
        renderFooterloading: PropTypes.func,
        couponLoadmore: PropTypes.func,
        renderFooterDone: PropTypes.func,
    },
    getDefaultProps: function() {
        return {
            couponCellCount : 10,
            pullDistance: 60,
            renderFooterloading: function () {
                return (
                    <View style={styles.listFooterVew}>
                        <Text style={styles.text}>
                            加载更多...
                        </Text>
                    </View>
                );
            },
            couponLoadmore: function () {
                loadCouponOffset += this.props.couponCellCount;
                this.fetchCouponData();
            },
            renderFooterDone: function () {
                return (
                    <View style={styles.listFooterVew}>
                        <Text style={styles.text}>
                            已经加载所有的数据了
                        </Text>
                    </View>
                );
            },
        };
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.fetchPlazaData();
        return {
            dataSource : ds.cloneWithRows([]),
            advertise: {},
            refreshStatus: refreshStatusNone,
            isLoadedAllData: false,
        };
    },
    comonetWillMount:function () {

    },
    fetchPlazaData:function () {
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary?'+'city_id='+this.props.cityId+'&plaza_id='+
            this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var advertise = responseData['data']['general_coupon'][0];
                var datasource = responseData['data']['coupons'];
                console.log('advertis=',advertise);
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(datasource),
                    advertise: advertise,
                });
            })
            .done();
    },
    fetchCouponData: function(){
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary/coupons?city_id='+this.props.cityId+'&plaza_id='+
            this.props.plazaId+'&offset='+loadCouponOffset+'&page_size='+this.props.couponCellCount;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var couponData = this.state.dataSource;
                var datasource = responseData['data']['coupons'];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(datasource.concat(couponData)),
                })
            })
            .done();
    },
    handleScroll:function (event) {
        var nativeEvent = event.nativeEvent;
        var status = this.state.refreshStatus;
        console.log('nativeEvent='+nativeEvent+'status='+status);
        if (status === refreshStatusLoadmore || status === refreshStatusInit) {
            var y = nativeEvent.contentInset.top + nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height
                - nativeEvent.contentSize.height;
            if (this.footerIsRender) {
                y += this.props.footerHeight;
            }
            if (status === refreshStatusInit && y > this.props.pullDistance) {
                this.setState({status: refreshStatusLoadmore});
            } else if (status === refreshStatusLoadmore && y <= this.props.pullDistance) {
                this.setState({status: refreshStatusDone});
            }
        }
    },
    hideFooter: function() {
        this.setState({status:refreshStatusNone});
    },
    handleResponderGrant:function(event) {
        var nativeEvent = event.nativeEvent;
        var y0 = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height - nativeEvent.contentSize.height;
        if (y0 > 0 ) {
            this.setState({status:refreshStatusDone});
        }
    },
    handleResponderRelease: function (event) {
        var nativeEvent = event.nativeEvent;
        var status = this.state.refreshStatus;
        console.log('nativeEvent='+nativeEvent+'status='+status);
        if (status === refreshStatusInit) {
            this.setState({status:refreshStatusLoadmore});
            this.couponLoadmore();
        } else if (status === refreshStatusDone) {
            this.setState({status:refreshStatusNone});
        }
    },
    renderFooter: function() {
        var status = this.state.refreshStatus;
        this.footerIsRender = true;
        if (status === refreshStatusInit) {
            return this.props.renderFooterloading();
        }
        else if (status === refreshStatusDone) {
            return this.props.renderFooterDone();
        }
        this.footerIsRender = false;
        return null;
    },
    render:function(){
        return (
            <View style={styles.bottomView}>
                <View style={styles.couponHeadView}>
                    <Text style= {styles.couponText}>
                        优惠
                    </Text>
                    <TouchableHighlight onPress={() => this.tappMore()}>
                        <View>
                            <Text style ={styles.couponMoreText}>
                                更多
                            </Text>
                            <Image>
                            </Image>
                        </View>
                    </TouchableHighlight>
                </View>
                <ListView
                    {...this.props}
                    contentContainerStyle = {styles.listView}
                    horizontal = {false}
                    directionalLockEnabled={true}
                    renderHeader = {this.renderHeader}
                    renderFooter={this.renderFooter}
                    renderRow = {this.renderRow}
                    dataSource= {this.state.dataSource}
                    onResponderRelease={this.handleResponderRelease}
                    onResponderGrant={this.handleResponderGrant}
                    onScroll= {this.handleScroll}>
                </ListView>
            </View>
        );
    },
    renderHeader:function () {
      var url = 'http://img5.ffan.com/norm_m_640/'+this.state.advertise['image'];
      return (<TouchableHighlight onPress={()=>this.tapGernalCoupon()}>
                    <Image style={styles.listHeaderView}
                            source={{uri:url}}>
                    </Image>
          </TouchableHighlight>);
    },
    renderRow:function(store){
        var windowWidth =  Dimensions.get('window').width
        return (
            <TouchableHighlight
                onPress={() => this.tappAdvertise(store)}>
                <View style = {styles.listRowView}>
                    <Image style = {styles.listRowImageView}
                           source={{uri:this._imageUrl(windowWidth*0.5,store['icon'])}}>
                    </Image>
                    <Text style = {styles.listRowTitle} >
                        {store['title']}
                    </Text>
                    <Text style = {styles.listRowSubTitle}>
                        {this.salePrice(store['pay_type'] , store['sale_price'])}
                    </Text>
                    <Text style = {styles.listRowSubTitle}>
                        {store['storeName']}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    },
    salePrice:function(saleType, salePrice):string {
        switch(saleType){
            case 0:
                return '免费'
            case 1:
                return '¥ '+ salePrice
            case 2:
                return salePrice + '积分'
        }
    },
    tappMore:function(){
        var query = {}
        query['qsrc'] = '4'
        query['resourceId'] = '3'
        query['cityId'] = this.props.cityId
        query['plazaId'] = this.props.plazaId
        var schme  = require('react-native').NativeModules.FFReactManager
        schme.openViewControllerWithControllerName('FFCouponsViewController', query, 0)
    },
    tappAdvertise:function(store) {
        var dic = {}
        dic['couponId'] = store['product_id']
        dic['app_type'] = 'app_type'
        dic['cityId'] = this.props.cityId
        dic['plazaId'] = this.props.plazaId

        var par = {}
        par['dataDic'] = dic
        par['title'] = '券详情'
        par['moduleName'] = 'couponDetail'
        par['urlString'] = 'http://localhost:8081/couponDetailMain.bundle?platform=ios&dev=true'

        // schme.openViewControllerWithControllerName('FFReactViewController', par, 0)
        schme.nav2Url('reactNativePage://weathercell');
    },
    _imageUrl: function(width, name) : string  {
        console.log('http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name;
    },
    tapGernalCoupon:function() {

    },
});
var styles = StyleSheet.create({
    bottomView: {
        backgroundColor: '#FFFFFF',
    },
    couponHeadView: {
        height: 44,
        flexDirection: 'row',
    },
    couponText: {
        fontSize: 17,
        left: 10,
        top: 10,
        flex: 1,
    },
    couponMoreText: {
        fontSize: 13,
        top: 15,
        right: 10,
        flex: 1,
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
    listFooterVew: {
        height:50,
        justifyContent:'center',
        alignItems:'center',
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
    text: {
        fontSize:16,
    },
});
module.exports = FFPlazaCouponCell;
