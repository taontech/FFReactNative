/**
 * Created by shaofeng on 16/5/16.
 */

'use strict'

import React,{
    Component,
    View,
    Image
} from 'react-native';

var FFImageUrlUtils = require('../../Utils/FFImageUrlUtils');
//http://api.ffan.com/ffan/v1/brand/baseinfo?brandId=10000051&cityId=110100
class FFBrandDetailImageCell_01 extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            logo:""
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData(){
        var url = 'http://api.ffan.com/ffan/v1/brand/baseinfo?brandId=' + this.props.data.brandId + '&cityId=' + this.props.data.cityId;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var data = responseData["data"];
                var logo = data["logo"];

                var logoStr = FFImageUrlUtils.getImageUrlWithId(logo);
                console.log(logoStr);
                this.setState({
                    logo:logoStr
                });
            })
    }

    render() {
        return(
            <View style={{height:150}}>
                <Image style={{flex: 1,resizeMode:'cover'}} source={{uri : this.state.logo}}/>
            </View>
        )
    }
}

module.exports = FFBrandDetailImageCell_01;