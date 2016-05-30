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
    PropTypes,
} from 'react-native';


var FFPlazaBaseInfoCell = React.createClass({
    propTypes: {
        cityId: PropTypes.string.isRequired,
        plazaId: PropTypes.string,
    },
    getDefaultProps: function() {
        plazaId: '1000772'
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.fetchPlazaData();
        return {
            dataSource: ds.cloneWithRows([]),
        };
    },
    fetchPlazaData:function () {
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary?'+'city_id='+this.props.cityId+'&plaza_id='+
            this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var supportBtns = responseData['data']['supportBtns'];
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(supportBtns),
                });
            })
            .done();
    },
    render:function(){
        var windowWidth =  Dimensions.get('window').width;
        var lineCount = (this.state.dataSource.getRowCount() + 1) / 2;
        var lineNumber = 0;
        if (lineCount > 2) {
            lineNumber = 2;
        } else {
            lineNumber = 1;
        }
        return (
            <ListView
                contentContainerStyle={{justifyContent: 'space-around',
                                         flexDirection: 'row',
                                              flexWrap: 'wrap'}}
                style = {{backgroundColor:'#115511',width:windowWidth}}
                      renderRow = {this.renderRow}
                      dataSource= {this.state.dataSource}>
            </ListView>
        );

    },
    renderRow:function(data){
        var windowWidth =  Dimensions.get('window').width;
        var lineCount = (this.state.dataSource.getRowCount() + 1) / 2;
        return (
            <TouchableHighlight onPress={() => this.tappAdvertise(data)}>
               <View style = {{width:120, height:windowWidth * 146.0 / 640,alignItems:'center'}}>
                   <Image style = {{width:60, height:60,top:10}}
                          source={this.iconName(data['type'])}>
                   </Image>
                   <Text style = {{top:15,fontSize:14,color:'#FFFFFF'}}>
                       {data['name']}
                   </Text>
               </View>
            </TouchableHighlight>

        );
    },
    iconName:function(type){
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
        // var schme  = require('react-native').NativeModules.FFReactManager
        //
        // switch (data['type']) {
        //     case 0:
        //     {
        //         var query = {}
        //             query['type'] = 2
        //             query['buriedType'] = 10
        //             query['cityId'] = this.props.cityId
        //             query['plazaId'] = this.props.plazaId
        //
        //         schme.openViewControllerWithControllerName('FFNewFindSearchViewController', query, 0)
        //
        //     }
        //         break;
        //     case 1:
        //     {
        //
        //     }
        //         break;
        //     case 2:
        //     {
        //         var query = {}
        //         query['qsrc'] = '4'
        //         query['resourceId'] = '3'
        //         query['cityId'] = this.props.cityId
        //         query['plazaId'] = this.props.plazaId
        //         schme.openViewControllerWithControllerName('FFCouponsViewController', query, 0)
        //     }
        //         break;
        //     case 3:
        //     {
        //         var query = {}
        //         query['qsrc'] = '4'
        //         query['resourceId'] = '3'
        //         query['cityId'] = this.props.cityId
        //         query['plazaId'] = this.props.plazaId
        //         query['beaconDeployer'] = this.props.beaconDeployer
        //         schme.openViewControllerWithControllerName('FFShakeViewController', query, 0)
        //     }
        //         break;
        //     case 4:
        //     {
        //         var query = {}
        //         query['qsrc'] = '4'
        //         query['resourceId'] = '3'
        //         query['cityId'] = this.props.cityId
        //         query['plazaId'] = this.props.plazaId
        //         schme.openViewControllerWithControllerName('FDQueuedNumberListViewController', query, 0)
        //     }
        //         break;
        //     case 5:
        //     {
        //             var query = {}
        //             query['qsrc'] = '4'
        //             query['resourceId'] = '3'
        //             query['cityId'] = this.props.cityId
        //             query['plazaId'] = this.props.plazaId
        //             schme.openViewControllerWithControllerName('FFMapViewController', query, 0)
        //     }
        //         break;
        //     case 6:
        //     {
        //         //[[FFStatistics sharedInstance] statEvent:PLAZA_DETAIL_PARKING];
        //         //[GlobalNextViewControlerManager openParkViewContorllerWith:self.controller.navigator];
        //     }
        //         break;
        //     case 7:
        //     {
        //         var query = {}
        //         query['type'] = 2
        //         query['resourceId'] = '3'
        //         query['cityId'] = this.props.cityId
        //         query['plazaId'] = this.props.plazaId
        //         schme.openViewControllerWithControllerName('FFFavourablePayViewController', query, 0)
        //     }
        //         break;
        //     case 8:
        //     {
        //     }
        //         break;
        //     case 9:
        //     {
        //     }
        //         break;
        //     case 10:
        //     {
        //     }
        //     default:
        //         break;
        // }
    }
});
module.exports = FFPlazaBaseInfoCell;
