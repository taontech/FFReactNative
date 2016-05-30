/**
 * Created by shaofeng on 16/5/17.
 */


'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    Component,
    Dimensions
    } = ReactNative;

var FFImageUrlUtils = require('../../Utils/FFImageUrlUtils');

class FF_BrandDetailIntroduceCell_01 extends Component{

    constructor(props) {
        super(props)
        console.log("&&&&&&&&&&&");
        console.log(this.props.data);
    }

    render(){
        return(
            <View style={styles.bottomView}>
            <View style={{backgroundColor:'#EEEEEE',height:4}}>
            </View>
            <TouchableWithoutFeedback  onPress={() => this.tappMore()}>
                <View style={{height:44,flexDirection:'row'}}>
                    <Text style= {{fontSize:15,left:10,top:12,flex:1}}>
                        品牌介绍</Text>

                    <View style={{justifyContent: 'center',
        alignItems: 'center',paddingRight:15}}>
                        <Image source={require('image!brand2016_moreRightBlack')}>
                        </Image>
                    </View>

                </View>
            </TouchableWithoutFeedback>
            <View style={{height:120,justifyContent:'center'}}>
                <Text style={{height:120,fontSize:12}}>{this.props.data}</Text>
            </View>
        </View>);
    }
}

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
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        color:"#00C1F9",
        //  backgroundColor:"#888888",
        fontSize:16,
        marginTop:5
    },
});

module.exports = FF_BrandDetailIntroduceCell_01;