'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Switch,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil';

//设置主界面  纯显示界面
export default class SetUpView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchIsOn:false,
        };
    }


    static navigationOptions = ({navigation}) => (
        {
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
            borderColor:'rgb(100,100,100)',
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });
    setBasicView(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.basicView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>基本设置</Text>
                </View>
                <View style={styles.topView}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>省流量模式</Text>
                        <Text style={styles.leftText2}>开启后，仅在WIFI网络下加载高清图片和视频播放</Text>
                    </View>
                    <View style = {{width:37}}></View>
                    <View style={styles.rightView}>
                        <Switch
                            onValueChange={(value) => {
                                DataUtil.getinstance().setsimodssl(value)
                                this.setState({switchIsOn: value})}}
                            value={DataUtil.getinstance().getsimodssl()} />
                    </View>
                </View>
                <View style={styles.downView2}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>自动播放视频</Text>
                        <Text style={styles.leftText2}>仅在WIFI下自动播放</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            navigate('SetUpVideo')
                        }}>
                        <Image
                            style={[styles.rightView,styles.jumpIcon]}
                            source={require('./img/seright.png')} />
                    </TouchableOpacity> 
                </View>
            </View>
        )
    }
    setAccountView(){
        const { navigate } = this.props.navigation;
        var acc = DataUtil.getinstance().getAccont()
        var textd = acc.cellphone+'  ID:'+acc.id
        if(true){
            return(
                <View style={styles.accountView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>账号设置</Text>
                    </View>
                    <View style={styles.topView}>
                        <View style={styles.leftView}>
                            <Text style={styles.leftText1}>当前账号登录</Text>
                            <Text style={styles.leftText2}>{textd}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.downView}>
                        <View style={styles.leftView}>
                            <Text style={styles.leftText1}>编辑资料</Text>
                            <Text style={styles.leftText2}>修改昵称</Text>
                        </View>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                                navigate('EditProfile')
                            }}>
                            <Image
                                style={[styles.rightView,styles.jumpIcon]}
                                source={require('./img/seright.png')} />
                        </TouchableOpacity> 
                    </View> */}

                    {/* <View style={styles.downView}>
                        <View style={styles.leftView}>
                            <Text style={styles.leftText1}>绑定社交账号</Text>
                            <Text style={styles.leftText2}>绑定微信，qq等</Text>
                        </View>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                                 navigate('SetQOrWexin')
                            }}>
                            <Image
                                style={[styles.rightView,styles.jumpIcon]}
                                source={require('./img/seright.png')} />
                        </TouchableOpacity> 
                    </View> */}
                </View>
            )   
        }else{
            return null;
        }
    }
    setOtherView(){
        return
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.accountView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>其他</Text>
                </View>
                <View style={styles.topView}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>检测更新</Text>
                        <Text style={styles.leftText2}>当前版本：v0.0.1</Text>
                    </View>
                </View>
                <View style={styles.topView}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>语言</Text>
                        <Text style={styles.leftText2}>跟随系统</Text>
                    </View>
                </View>
                {/* <View style={styles.topView}>
                    <View style={{alignSelf:'center'}}>
                        <Text style={styles.leftText1}>关于彩虹鸟</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            console.log('关于彩虹鸟跳转');
                        }}>
                        <Image
                            style={[styles.rightView,styles.jumpIcon]}
                            source={require('./img/seright.png')} />
                    </TouchableOpacity> 
                </View> */}
                <View style={styles.downView}>
                    <View style={styles.leftView}>
                        <Text style={styles.leftText1}>清理缓存</Text>
                        <Text style={styles.leftText2}>999.9MB</Text>
                    </View>
                </View>
            </View>
        )
    }
    setLayoutBtn(){
        if(true){
            return(
                <View style={styles.btnView}>
                    
                        <TouchableOpacity
                            //activeOpacity={1}
                            //style={styles.btn}
                            onPress={() => {
                                console.log('切换账号');
                                // 退出账号
                                const { navigate } = this.props.navigation;
                                navigate('Login')
                            }
                        }>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>切换账号</Text>
                        </View>
                        </TouchableOpacity>
                </View>
            )
        }else{
            return null;
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                 <View style = {styles.lineView2}></View>
                {this.setBasicView()}
                <View style = {{height:6,width:SceneUtils.size.width,
                backgroundColor:'rgb(100,100,100)',marginTop:10,}}>
                </View>
                {/* <View style = {[styles.lineView,styles.marginTopstyle]}></View> */}
                {this.setAccountView()}
                {/* <View style = {[styles.lineView,styles.marginTopstyle]}></View> */}
                {this.setOtherView()}
                {this.setLayoutBtn()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(51,51,51)',
        alignItems:'center'
    },
    marginTopstyle:{
        marginTop:12,
    },
    basicView:{
        width:SceneUtils.size.width*0.94
    },
    titleView: {
        marginTop:5,
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        paddingBottom:10,
    },
    lineView2:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        marginBottom:10,
    },
    lineView:{
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        marginLeft:SceneUtils.size.width*0.03,
    },
    titleText: {
        fontSize: 12,
        fontWeight: '900',
        color:'rgb(150,150,150)',
        marginLeft:3,
    },
    topView:{
        flexDirection:'row',
        marginLeft:3,
        marginTop:9,
        justifyContent:'space-between',
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        paddingBottom:10,
    },
    leftView:{
        marginTop:5,

    },
    leftText1:{
        fontSize: 15,
        color:'white'
    },
    leftText2:{
        fontSize: 12,
        color:'rgb(100,100,100)'
    },
    rightView:{
        alignSelf:'center',
        marginRight:7,
    },
    downView2:{
        flexDirection:'row',
        marginLeft:3,
        justifyContent:'space-between',
        marginTop:7,
        width:SceneUtils.size.width*0.94,
    },
    downView:{
        flexDirection:'row',
        marginLeft:3,
        justifyContent:'space-between',
        marginTop:7,
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        paddingBottom:10,
    },
    accountView:{
        marginTop:6,
        width:SceneUtils.size.width*0.94
    },
    jumpIcon:{
        width:14,
        height:22,
        resizeMode:'contain',
        tintColor:'white',
    },


    btnView:{
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    btnImage:{
        width:SceneUtils.size.width,
        height:40,
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.94,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(128,183,34)',
        borderRadius:6,
    },
    btnText:{
        fontSize:19,
        color:'white',
        fontWeight:'900',
    },
});





