'use strict';

import TimerMixin from 'react-timer-mixin'
import Dimensions from 'Dimensions'

import Sss from '../../Common/react-native-swiper'

import React,{
    StyleSheet,
    Component,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    PropTypes,
} from 'react-native';


var styles = StyleSheet.create({
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

class CloverSlider extends Component {
    static propTypes = {
        cityId: PropTypes.string.isRequired,
        plazaId: PropTypes.string,
        aliasName: PropTypes.string,
    };
    static defaultProps = {
        aliasName: '59CBB22C443D5B9AEEFC993DC3E61698'
    };
    constructor(props) {
        super(props);

        this.fetchData();
        this.state={
            dataSource: null,
            selectedPic: 0
        }
    }

    fetchData() {
        var requestUrl = 'http://api.ffan.com/advertise/v3/materials?aliasName=' + this.props.aliasName +
            '&cityId='+ this.props.cityId + '&plazaId=' + this.props.plazaId;
        fetch(requestUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var plans = responseData['data']['datas'][2]['plans'];
                var arrayObj = new Array();
                for (var i = 0; i < plans.length; i++) {
                    if (plans[i]['image']) {
                        arrayObj.push(plans[i]);
                    }
                }
                this.setState({
                    dataSource: arrayObj
                });
            })
            .done();
    }

    touchUpInside(store) {

    }

    renderItems(data) {
        var newArray = new Array();
        var windowWidth =  Dimensions.get('window').width;

        for (var i = 0; i < data.length; i++) {
            var imageurl = data[i]['image'];
            newArray.push(
                <TouchableOpacity key={i} style={{flex: 1,backgroundColor:'#445566'}} activeOpacity={1}
                                  onPress={() => this.touchUpInside(data[i])}>
                    <View style={{flex: 1,backgroundColor:'#445566'}}>
                        <Image style={{flex: 1}} source={{uri : 'http://img5.ffan.com/norm_m_'+ parseInt(windowWidth)
                         +'/' + imageurl}}>
                        </Image>
                    </View>
                </TouchableOpacity>);
        }
        return newArray;
    }

    render() {
        var dataArray = this.state.dataSource;
        if (!dataArray) {
            return (<View style={{flex: 1,backgroundColor:'#445566'}}></View>)
        }
        return (
            <Sss style={styles.wrapper} height={240} horizontal={true} autoplay={true} showsButtons={true}>
                {this.renderItems(dataArray)}
            </Sss>
        )
    }
}

module.exports = CloverSlider;
