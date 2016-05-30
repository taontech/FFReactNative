'use strict';

import React, {
    Component,
    View,
    ListView,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    PropTypes,
} from 'react-native';



class ColTwoNav extends Component {
    static propTypes = {
        cityId: PropTypes.string.isRequired,
        plazaId: PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.fetchPlazaData();
        this.state = {
            supportBanners: [],
        }
    }
    fetchPlazaData() {
        var requestUrl = 'http://api.ffan.com/ffan/v2/summary?'+'city_id='+this.props.cityId+'&plaza_id='+
            this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var supportBanners = responseData['data']['supportBanners'];
                this.setState({
                    supportBanners: supportBanners,
                });
            })
            .done();
    }
    renderColTwoView() {
        var array = this.state.supportBanners;
        var newArray = new Array();
        if (array.length == 1) {
            var movieType = array[0]["type"];
            var movieTitle = array[0]["title"];
            var movieDesc = array[0]["desc"];
            var movieIconType = 0;
            var movieColorType = '#FC7B1C';

            if (movieType == 0) {
                movieIconType = 3;
                movieColorType = '#FC7B1C';
            }else if (movieType == 1) {
                movieIconType = 4;
                movieColorType = '#FF3737';
            }else {
                movieIconType = 5;
                movieColorType = '#5F549E';
            }

            newArray.push(<View style={{flexDirection:'row',borderBottomWidth: 1,borderBottomColor: '#eeeeee'}}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center',borderRightColor: '#eeeeee'}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 90,resizeMode: Image.resizeMode.stretch}} source={this.iconName(movieIconType)} />
                    </View>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:movieColorType}}>{array[0]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[0]["desc"]}</Text>
                    </View>
                </View>
            </View>);
        }
        else if(array.length==2){

            var movieType = array[0]["type"];
            var movieTitle = array[0]["title"];
            var movieDesc = array[0]["desc"];
            var movieIconType = 0;
            var movieColorType = '#FC7B1C';

            if (movieType == 0) {
                movieIconType = 0;
                movieColorType = '#FC7B1C';
            }else if (movieType == 1) {
                movieIconType = 1;
                movieColorType = '#FF3737';
            }else {
                movieIconType = 2;
                movieColorType = '#5F549E';
            }
            var cateType = array[1]["type"];
            var cateTitle = array[1]["title"];
            var cateDesc = array[1]["desc"];
            var cateColorType = '#FC7B1C';
            var cateIconType = 1;
            if (cateType == 0) {
                cateIconType = 0;
                cateColorType = '#FC7B1C';
            }else if (cateType == 1) {
                cateIconType = 1;
                cateColorType = '#FF3737';
            }else {
                cateIconType = 2;
                cateColorType = '#5F549E';
            }

            newArray.push(<View style={{flexDirection: 'row',backgroundColor: '#ffffff'}}>
                <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',borderRightColor: '#eeeeee',borderRightWidth: 1}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 56,resizeMode: Image.resizeMode.stretch}} source={this.iconName(movieIconType)} />
                    </View>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:movieColorType}}>{array[0]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[0]["desc"]}</Text>
                    </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 56,resizeMode: Image.resizeMode.stretch}} source={this.iconName(cateIconType)} />
                    </View>
                    <View style={{flex: 1,alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:cateColorType}}>{array[1]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[1]["desc"]}</Text>
                    </View>
                </View>
            </View>);
        }
        else if(array.length>2){

            var movieType = array[0]["type"];
            var movieTitle = array[0]["title"];
            var movieDesc = array[0]["desc"];
            var movieIconType = 0;
            var movieColorType = '#FC7B1C';

            if (movieType == 0) {
                movieIconType = 3;
                movieColorType = '#FC7B1C';
            }else if (movieType == 1) {
                movieIconType = 4;
                movieColorType = '#FF3737';
            }else {
                movieIconType = 5;
                movieColorType = '#5F549E';
            }

            var cateType = array[1]["type"];
            var cateTitle = array[1]["title"];
            var cateDesc = array[1]["desc"];
            var cateColorType = '#FC7B1C';
            var cateIconType = 1;
            if (cateType == 0) {
                cateIconType = 0;
                cateColorType = '#FC7B1C';
            }else if (cateType == 1) {
                cateIconType = 1;
                cateColorType = '#FF3737';
            }else {
                cateIconType = 2;
                cateColorType = '#5F549E';
            }

            var shoppingType = array[2]["type"];
            var shoppingTitle = array[2]["title"];
            var shoppingDesc = array[2]["desc"];
            var shoppingColorType = '#FC7B1C';
            var shoppingIconType = 1;
            if (shoppingType == 0) {
                shoppingIconType = 0;
                shoppingColorType = '#FC7B1C';
            }else if (shoppingType == 1) {
                shoppingIconType = 1;
                shoppingColorType = '#FF3737';
            }else {
                shoppingIconType = 2;
                shoppingColorType = '#5F549E';
            }

            newArray.push(<View key={1} style={{flexDirection:'row',borderBottomWidth: 1,borderBottomColor: '#eeeeee'}}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center',borderRightColor: '#eeeeee'}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 90,resizeMode: Image.resizeMode.stretch}} source={this.iconName(movieIconType)} />
                    </View>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:movieColorType}}>{array[0]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[0]["desc"]}</Text>
                    </View>
                </View>
            </View>);
            newArray.push(<View key={2} style={{flexDirection: 'row',backgroundColor: '#ffffff'}}>
                <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',borderRightColor: '#eeeeee',borderRightWidth: 1}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 56,resizeMode: Image.resizeMode.stretch}} source={this.iconName(cateIconType)} />
                    </View>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:cateColorType}}>{array[1]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[1]["desc"]}</Text>
                    </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{flex: 1,borderRightColor: '#eeeeee'}}>
                        <Image style={{height: 56,resizeMode: Image.resizeMode.stretch}} source={this.iconName(shoppingIconType)} />
                    </View>
                    <View style={{flex: 1,alignItems: 'center',backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize:17,justifyContent: 'flex-end',color:shoppingColorType}}>{array[2]["title"]}</Text>
                        <Text style={{fontSize:11,color:'#787878'}}>{array[2]["desc"]}</Text>
                    </View>
                </View>
            </View>);
        }
        else {

        }
        return newArray;
    }

    render(){
        return(
            <View style={styles.outsideView}>
                <View style={{flex: 1}}>
                    {this.renderColTwoView()}
                </View>
            </View>
        )
    }

    iconName(type){
        switch (type) {
            case 0:
                return require('image!plaza_channel_movie')
            case 1:
                return require('image!plaza_channel_cate')
            case 2:
                return require('image!plaza_channel_shopping')
            case 3:
                return require('image!plaza_channel_movie_wide')
            case 4:
                return require('image!plaza_channel_cate_wide')
            case 5:
                return require('image!plaza_channel_shopping_wide')
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
    }
}

const styles = StyleSheet.create({
    outsideView:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        backgroundColor: '#ffffff'
    },
    insideLeftView:{
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#eeeeee'
    },
    box:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#eeeeee'
    },
    boxImg:{
        width: 35,
        height: 35,
        marginBottom: 10
    },
    boxItem:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    boxText:{
        color : '#333333',
        fontSize : 12
    }
})



module.exports = ColTwoNav;
