/**
 * Created by shaofeng on 16/5/17.
 */

'use strict'

import TimerMixin from 'react-timer-mixin'
import Dimensions from 'Dimensions'

import Swiper from '../../Common/react-native-swiper'

import React,{
    StyleSheet,
    Component,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

class UF_AdvertisementCell_02 extends Component {
    constructor(props) {
        super(props)
    }

    touchUpInside(store) {
        // var schme  = require('react-native').NativeModules.FFReactManager;
        // schme.nav2Url('url');
    }
    renderItems(data) {
        var newArray = new Array();
        var windowWidth =  Dimensions.get('window').width;

        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            if (dataItem)
            {
                var imageurl = dataItem["img"];


                newArray.push(<TouchableOpacity key={i} style={{flex: 1,backgroundColor:'#445566'}}
                                                activeOpacity={1}
                                                onPress={() => this.touchUpInside(data[i])}
                >
                    <View style={{flex: 1,backgroundColor:'#445566'}}>
                        <Image style={{flex: 1,resizeMode:'stretch'}} source={{uri : 'http://img5.ffan.com/' + imageurl}}/>
                    </View></TouchableOpacity>);
            }

        }
        return newArray;
    }

    render() {
        return (
            <View style={styles.bottomView}>
                <View style={{backgroundColor:'#EEEEEE',height:4}}>
                </View>
                <TouchableWithoutFeedback  onPress={() => this.tappMore()}>
                <View style={{height:44,flexDirection:'row'}}>
                    <Text style= {{fontSize:15,left:10,top:12,flex:1}}>
                        资讯</Text>

                        <View style={{justifyContent: 'center',
        alignItems: 'center',paddingRight:15}}>
                            <Image source={require('image!brand2016_moreRightBlack')}>
                            </Image>
                        </View>

                </View>
                </TouchableWithoutFeedback>
            <Swiper style={styles.wrapper} height={180} horizontal={true} autoplay={true} showsButtons={false}>
                {this.renderItems(this.props.data)}
            </Swiper>
                </View>
        )
    }

}//brand2016_moreRightBlack

var styles = StyleSheet.create({
    bottomView :{
        backgroundColor: '#FFFFFF',
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
    }
})

module.exports = UF_AdvertisementCell_02;