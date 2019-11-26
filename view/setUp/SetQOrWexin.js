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

//废弃  暂时不用
export default class SetQOrWexin extends Component {
    constructor(props) {
        super(props);
    }
    setIcon(type){
        return(
            <View style = {styles.btn}>
                <Text
                style = {{fontSize:12,
                    color:'white',
                }}
                > {'绑定'}</Text>
            </View>
        )
    }
    _onSelect(type){
        //0 qq  1 weixin
        return 
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
                        <Text style={styles.text}>QQ</Text>
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
                        <Text style={styles.text}>微信</Text>
                        {this.setIcon(1)}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:7,
        paddingLeft:20,
        paddingBottom:8,
        marginLeft:12,
    },
    text: {
        fontSize: 12,
        fontWeight: '400',
        color:'rgb(40,40,40)'
    },
    btn:{
        width:40,
        height:24,
        marginRight:30,
        backgroundColor:'rgb(128,183,34)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
    },

});