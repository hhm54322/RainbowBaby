'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

//视频播放设置
export default class SetUpVideoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setType:DataUtil.getinstance().getg4g(),    //获取记录
        };
    }

    //重写head
    static navigationOptions = ({navigation}) => (
        {
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:1,
            borderColor:'rgb(150,150,150)'
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });
    
    //选择设置当前的内容
    setIcon(type){
        var st = styles.icon
        if(this.state.setType === type){
            var st = styles.icon1
        }

        return(
            <View style = {st}></View>
        )
    }
    _onSelect(type){
        DataUtil.getinstance().setg4g(type)
        if(this.state.setType !== type){
            this.setState({setType:type})
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this._onSelect(0);
                    }
                }>
                    <View style={styles.view}>
                        <Text style={styles.text}>任何网络下都自动播放</Text>
                        {this.setIcon(0)}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this._onSelect(1);
                    }
                }>
                    <View style={styles.view}>
                        <Text style={styles.text}>仅在WIFI下自动播放</Text>
                        {this.setIcon(1)}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this._onSelect(2);
                    }
                }>
                    <View style={styles.view}>
                        <Text style={styles.text}>不自动播放</Text>
                        {this.setIcon(2)}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgb(51,51,51)'
    },
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:7,
        paddingLeft:15,
        paddingBottom:7,
        marginLeft:10,
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color:'white'
    },
    icon:{
        width:23,
        height:23,
        marginRight:25,
        backgroundColor:'rgb(220,220,220)',
        borderRadius:12,
    },
    icon1:{
        width:23,
        height:23,
        marginRight:25,
        backgroundColor:'rgb(128,183,34)',
        borderRadius:12,
    },
});