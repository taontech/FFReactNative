/**
 * Created by aksoftware on 16/3/10.
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
    Dimensions,
    PropTypes,
} from 'react-native';


var FFPlazaActivityCell = React.createClass({
    propTypes: {
        cityId: PropTypes.string.isRequired,
        plazaId: PropTypes.string,
    },
    getDefaultProps:function () {
        plazaId: '1000772'
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.fetchPlazaData();
        return {
            dataSource: ds.cloneWithRows(this.props.data['activities']),
        };
    },
    fetchPlazaData:function () {
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary?'+'city_id='+this.props.cityId+'&plaza_id='+
            this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var datasource = responseData['data']['activities'];
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(datasource),
                });
            })
            .done();
    },
    render:function(){
        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View style={{backgroundColor:'#EEEEEE',height:10}}>
                </View>
                <View style={{height:44,flexDirection:'row'}}>
                    <Text style= {{fontSize:17,left:10,top:10,flex:1}}>
                        精彩后动</Text>
                    <TouchableHighlight  onPress={() => this.tappMore()}>
                        <View>
                            <Text style ={{top:15}}>
                                更多
                            </Text>
                            <Image>
                            </Image>
                        </View>
                    </TouchableHighlight>
                </View>
                <ListView
                    renderRow = {this.renderRow}
                    dataSource= {this.state.dataSource}>
                </ListView>
            </View>
        );
    },

    tappMore:function(){
        // var schme  = require('react-native').NativeModules.FFReactManager
        // var query = {}
        // query['isShowAllAvtivity'] = false
        // query['cityId'] = this.props.cityId
        // query['plazaId'] = this.props.plazaId
        // schme.openViewControllerWithControllerName('FFActivityContainerViewController', query, 0)
    },
    renderRow:function(activity){
        var windowWidth =  Dimensions.get('window').width
        var image_path = activity['image_path']
        var imageUrl
        imageUrl = image_path[0]['img']
        return (
            <TouchableHighlight
                onPress={() => this.tappAdvertise(activity)}>
                <View style = {{  height:(256.0 / 640 * windowWidth * 9 / 16) + 10,flexDirection:'row'}}>
                    <Image style = {{top:5,width:256.0 / 640 * windowWidth, height:(256.0 / 640 * windowWidth * 9 / 16), left:15}}
                           source={{uri:this._imageUrl(256.0 / 640 * windowWidth,imageUrl)}}>
                    </Image>
                    <View style={{left:10,alignItems:'center',flex:1,alignSelf:'center'}}>
                        <Text style = {{color:'#000000',fontSize:16,textAlign:'center',width:windowWidth - 256.0 / 640 * windowWidth - 15}}
                              numberOfLines = {1}>
                            {activity['title']}
                        </Text>
                        <Text style = {{color:'#999999',fontSize:14,textAlign:'center',width:windowWidth - 256.0 / 640 * windowWidth - 15}}>
                            {activity['sub_title']}
                        </Text>
                        <Text style = {{color:'#858585',fontSize:12,textAlign:'center',width:windowWidth - 256.0 / 640 * windowWidth - 15}}>
                            {activity['start_date'] +'-'+ activity['end_date']}
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    },

    _imageUrl: function(width, name) : string
    {
        var width
        console.log('http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name)
        return 'http://img5.ffan.com/norm_m_'+ parseInt(width) +'/' + name;
    },


    tappAdvertise:function(activity) {
        // var schme  = require('react-native').NativeModules.FFReactManager
        // schme.nav2Url('http://h5.ffan.com/app/activity?aid='+activity['id'])
    }

});
module.exports = FFPlazaActivityCell;
