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

//加入家庭输入邀请码页面
export default class JoinFamilyView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code:'',  //邀请码
        };
    }
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
    //   title: `Chat with ${navigation.state.params.user}`,
        //title:'加入急',
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style = {styles.topView}>
                    <Image
                        source = {require('../../images/logo.png')}
                        style = {styles.titleIamgeStyle}
                    ></Image>
                </View>

                <View style = {{
                    width:SceneUtils.size.width,
                    borderBottomWidth:1,
                    borderColor:'rgb(100,100,100)',
                    marginTop:10,
                }}></View>

                <View style = {styles.centerInputeView}> 
                    <Text style = {styles.textJstyle}>{'加入家庭：'}</Text>
                    <TextInput
                    underlineColorAndroid='transparent'
                            style={styles.textInputStyle}
                            placeholder="请输入您要加入的家庭邀请码 "
                            onChangeText={(text) => {
                                this.setState({
                                    code: text
                                });
                            }}
                            value={this.state.code}
                        />
                </View>
                


                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            navigate('JoinFamilyTwo',{ info: this.state.code })
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'下一步'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.otherView}>
                    <Image source = {require('../../images/ICON_07.png')} style = {styles.logoIcon}/>
                    <View style={styles.view}>
                        <Text style={styles.text}>加入家庭：</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="请输入您要加入的家庭邀请码 "
                            onChangeText={(text) => {
                                this.setState({
                                    code: text
                                });
                            }}
                            value={this.state.code}
                        />
                    </View>
                </View>
                <View style={styles.nextView}>
                    <ImageBackground source = {require('./ICON_06.png')} style = {styles.btnImage}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={1}
                            onPress={() => {
                                if(this.state.code !== ''){
                                    navigate('JoinFamilyTwo',{ info: this.state.code })
                                }
                            }
                        }>
                            <Text style={styles.btnText}>下一步</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View> */}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },

    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
        alignItems:'center',
        justifyContent:'center',
    },
    titleIamgeStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
    },

    centerInputeView:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:34,
        width:SceneUtils.size.width,
        
    },
    textJstyle:{
        fontSize:16,
        color:'rgb(150,150,150)'
    },
    textInputStyle: {
        fontSize: 14,
        marginLeft:8,
        borderWidth:0,
        borderRadius:5,
        backgroundColor:'white',
        height:30,
        width:SceneUtils.size.width*0.65
    },




    btnView:{
        position:'absolute',
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(143,184,34)',
        borderRadius:5,
    },
    btnText:{
        fontSize:17,
        color:'white',
        fontWeight:'900'
    },
});