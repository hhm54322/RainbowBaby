'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';

///？？？？？？？？？？？？？
export default class NikeNameView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nikeName: '',
            code:'',
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source = {require('../../images/ICON_07.png')} style = {styles.logoIcon}/>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.view}>
                        <Text style={styles.text}>    你的昵称：</Text>
                        <TextInput
                        underlineColorAndroid='transparent'
                            style={styles.textInputStyle}
                            placeholder="请输入您的昵称           "
                            onChangeText={(text) => {
                                this.setState({
                                    nikeName: text
                                });
                            }}
                            value={this.state.nikeName}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>家庭邀请码：</Text>
                        <TextInput
                        underlineColorAndroid='transparent'
                            style={styles.textInputStyle}
                            placeholder="请输入您的家庭邀请码（选填）        "
                            onChangeText={(text) => {
                                this.setState({
                                    code: text
                                });
                            }}
                            value={this.state.code}
                        />
                    </View>
                    <View style={styles.nextView}>
                        <ImageBackground source = {
                            this.state.nikeName === '' ? require('./ICON_01.png') : require('./ICON_06.png')} style = {styles.btnImage}>
                            <TouchableOpacity
                                style={styles.btn}
                                activeOpacity={1}
                                onPress={() => {
                                    if(this.state.nikeName !== ''){
                                        if(this.state.code !== ''){
                                            navigate('JoinFamily')
                                        }else{
                                            navigate('CreateBaby')
                                        }
                                        //navigate('Login')
                                    }
                                }
                            }>
                                <Text style={styles.btnText}>下一步</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    },
    logoView:{
        flex:1,
    },
    logoIcon:{
        width:SceneUtils.size.width * 0.75,
        height:SceneUtils.size.width * 0.75*0.8,
        resizeMode:'contain',
        alignSelf:'center',
    },
    inputView: {
        flex:2,
    },
    view: {
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor: '#d6d7da',
        marginHorizontal:30,
    },
    text: {
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
        // fontWeight: '500',
    },
    textInputStyle: {
        lineHeight: 36,
        fontSize: 14,
        // fontWeight: '500',
        marginLeft:30,
    },
    nextView:{
        alignSelf:'center',
        marginTop:70,
    },
    btnImage:{
        width:SceneUtils.size.width - 60,
        height:50,
    },
    btn: {
        width:SceneUtils.size.width - 60,
        height:50,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:20,
        color:'#fff',
    },
});