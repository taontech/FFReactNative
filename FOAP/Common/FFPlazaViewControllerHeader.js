/**
 * Created by aksoftware on 16/3/9.
 */
'use strict';
import React, {
    Component,
    View,
    ListView,
    Image,
    TouchableHighlight,
    Dimensions
  } from 'react-native';


var FFPlazaViewControllerHeader = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    },

    render:function(){
        return (
            <ListView style = {{backgroundColor:'#EDEDED'}}
                                  horizontal = {true}
                                  pagingEnabled = {true}
                      directionalLockEnabled={true}
                                  renderRow = {this.renderRow}
                                  dataSource= {this.state.dataSource}>
            </ListView>
        );

    },

    renderRow:function(advertiseModel){
        return (
            <TouchableHighlight onPress={() => this.tappAdvertise(advertiseModel)}>
                <Image style={{width:Dimensions.get('window').width,height:Dimensions.get('window').width*9/16}}
                       source={{uri:'http://facebook.github.io/react/img/logo_og.png'}}>
                </Image>
            </TouchableHighlight>

        );
    },

    tappAdvertise:function(advertiseModel) {


    }

});
module.exports = FFPlazaViewControllerHeader;
