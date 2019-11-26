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
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import Util from '../../utils/Util';
import DataUtil from '../../utils/DataUtil';
import md5 from "react-native-md5";
import {StorageHelper} from '../../utils/modStruct'

import FloatText from '../../utils/FloatText'
import *as wechat from 'react-native-wechat'
import DateUtil from '../../utils/DateUtil'

import NetService from '../../utils/NetService'

import Agreement from './Agreement'

//登陆页面   整体流程和消息  和 loginMainView完全一样

export default class LoginView extends Component{
    constructor(props) {
        super(props);
        this.index = 0;     
        this.isLogin = false        //是否登陆过
        this.openid = 0                 //微信的opid
        this.wxToken = ''               //微信token
        this.aaaaaa                     //临时放一下对象
        this.state = {
            username:'15221317429',         //usaername
            code:'000000',                  //验证码
            counting:false,
            timerCount:0,                   //时间
            timerCode:'获取验证码',             //获取验证码文字
        };
    }

    //判断是现实  获取验证码  还是重新获取需要等待的时间
    _countDownAction(){
        if(this.state.counting) {return}
        this.state.timerCount = 60
        this.interval = setInterval(() =>{
            const timer = this.state.timerCount - 1
            if(timer===0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: 0,
                    timerCode: '获取验证码',
                    counting:false,
                })
            }else{
                this.setState({
                    timerCount:timer,
                    timerCode: `重新获取(${timer}s)`,
                })
            }
        },1000)
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        //删除时间函数
        clearInterval(this.interval)
    }
    logInMessgeBack = (responseJson)=>{
        console.log(responseJson)
        DataUtil.getinstance().setUserData(responseJson)
        var mode  = {
            phoneNum:this.state.username,
            access_token:responseJson.access_token,
            refresh_token:responseJson.refresh_token
        }
        StorageHelper.save('pStruct',mode)
    }

    ontoutchCodeViewBack = ()=>{
        if(Util.phoneNumCheck(this.state.username)){
            if(!this.state.counting && this.state.timerCode === '获取验证码'){
                this._countDownAction();
                this.setState({counting:true});
                this.sendMsmCode();
            }
        }else{
            //手机号码格式错误
            FloatText.show('手机号码格式错误')
        }
    }

    famliyListBack = (responseJson)=>{
        console.log(responseJson)
        // var js = JSON.stringify(responseJson)
        // var ac = JSON.parse(js)
        //DataUtil.getinstance().setMainFamliy(responseJson)
        this.aaaaaa = responseJson
        //DataUtil.getinstance().setMainFamliy(this.aaaaaa)
    }
    pushzhBack = (responseJson)=>{
        DataUtil.getinstance().setAccont(responseJson)

        setTimeout(() => {
            DataUtil.getinstance().setMainFamliy(this.aaaaaa)
            var responseJson = this.aaaaaa //DataUtil.getinstance().getMainFamliy()
            if(responseJson && responseJson.main.children.length>=1){
                const { navigate } = this.props.navigation;
                navigate('Main')
            }else{
                const { navigate } = this.props.navigation;
                navigate('CreateBaby',{info:false})
            }
        }, 10);

    }

    sendRegistrationMsg = ()=>{
        if(this.isLogin){
            this.sendLoginMsg();
            return
        }
        let m = md5.hex_md5(this.state.code);
        m = md5.hex_md5(m);
        let params = {'cellPhoneNumber':this.state.username,'countryCode':'86','smsCode': m};
        var mod = {
            params:{},
            params1:params,
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.sendLoginMsg();
            }
        }
        NetService.do(NetService.sendregistration,mod)
    }

    listBack = ()=>{

        setTimeout(() => {
            DataUtil.getinstance().setMainFamliy(this.aaaaaa)
            var responseJson = this.aaaaaa //DataUtil.getinstance().getMainFamliy()
            if(responseJson && responseJson.main.children.length>=1){
                const { navigate } = this.props.navigation;
                navigate('Main')
            }else{
                const { navigate } = this.props.navigation;
                navigate('CreateBaby',{info:false})
            }
        }, 10);
    }
    sendLoginMsg = ()=>{

        var farry = []
        var dataArry = []

        let m = md5.hex_md5(this.state.code);
        m = md5.hex_md5(m);
        var number = this.state.username  //15221317429//
        let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP','grant_type': 'password', 'password': m,'username':'86' + number};
        var mod = {
            //type:'post',
            //url:'/maria/oauth/token',
            params:params,
            params1:{},
            headers:['application/x-www-form-urlencoded','application/json'],
            callback:this.logInMessgeBack
        }
        farry.push(NetService.sendtoken)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry,this.loginEnd)
    }

    loginEnd = ()=>{
        var farry = []
        var dataArry = []
        var token = DataUtil.getinstance().getUserData().access_token
        let params1t = {'access_token':token};
        var mod2 = {
            //type:'get',
            //url:'/maria/account/family',
            params:params1t,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.famliyListBack
        }
        farry.push(NetService.sendfamily)
        dataArry.push(mod2)

        let params2t = {'access_token':token};
        var mod3 = {
            type:'get',
            url:'/maria/account/info',
            params:params2t,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.pushzhBack
        }
        farry.push(NetService.sendinfo)
        dataArry.push(mod3)

        NetService.doArry(farry,dataArry)
    }

    sendMsmCode(){

        let params = {'cellPhoneNumber':this.state.username,'countryCode':'86'};
        var mod = {
            params:{},
            params1:params,
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.isLogin = responseJson
            }
        }
        NetService.do(NetService.sendsms_code_generating,mod)
    }

    showLogWenziView = ()=> {
        return (
            <View style = {styles.logTextView}></View>
        )
    }

    showTextInput = ()=>{
        var adc = null
        if(this.state.timerCount >0){
            adc = {
                backgroundColor:'rgb(150,150,150)',
                width:SceneUtils.size.width*0.21,
                height:SceneUtils.size.height*0.065,
                justifyContent:'center',
                alignItems:'center',
                marginLeft:5
            }
        }else{
            adc = styles.codeView
        }
        return (<View style = {styles.textInputView}>
            <View style = {styles.lineInpute}>
                <View style = {styles.j86View}>
                    <Text style = {styles.j86Text}>{'CN+86'}</Text>
                </View>
                <TextInput style = {styles.inputPhone}
                            underlineColorAndroid='transparent'
                            placeholder="请输入手机号码"
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({
                                    username: text
                                });
                            }}
                            value={this.state.username}
                ></TextInput>
            </View>

            <View style = {styles.lineView}></View>

            <View style = {styles.lineInpute}>
                <View style = {styles.j86View}>
                    <Text style = {styles.j86Text}>{'验证码'}</Text>
                </View>
                <TextInput style = {styles.inputCode}
                            underlineColorAndroid='transparent'
                            placeholder="请输入验证码"
                            keyboardType='numeric'
                            maxLength={6}
                            onChangeText={(text) => {
                                this.setState({
                                    code: text
                                });
                            }}
                            value={this.state.code}
                ></TextInput>

                <TouchableOpacity activeOpacity={1} onPress={
                    this.ontoutchCodeViewBack}>
                <View style = {adc}>
                    <Text style={styles.textCode}>
                        {this.state.timerCode}
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>)
    }
    

    showLoginBtn = ()=>{
        return (
        <TouchableWithoutFeedback
            onPress = {() => {
                if(Util.phoneNumCheck(this.state.username) && this.state.code.length === 6){
                    this.sendRegistrationMsg();
                }else{
                    FloatText.show('手机号码格式错误')
                }
            }}
        >
        <View style = {styles.btnView}>
            <Text style = {styles.logintext}>{'登陆'}</Text>
        </View>
        </TouchableWithoutFeedback>
        )
    }



    sendWxMessage  = (code)=>{
        var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxb8e97c28e06ce8e9&secret=017732783344dff26c3faf6e12e98ef2&code='+code+'&grant_type=authorization_code'
        try{ 
            fetch(url, {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json'
                },
              }).then((response)=>{
                if (response.ok) {
                    return response.json()
                  }
              }).then((data)=>{
                    console.log(data)
                    this.getOpenId(data)
              })
           } catch(e){ 
            console.log("error") 
           }
    }

    getOpenId = (data)=>{
        this.openid = data.openid
        console.log('this.openid = data.openid')
        console.log(data)
        this.wxToken = data.access_token
        let params = {'wechatNumber':this.openid};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.yzWeChat
        }
        var farry = []
        var dataArry = []
        farry.push(NetService.sendcheck_wechat)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)
    }

    yzWeChat = (j)=>{
        console.log(j)
        if(j == '0'){
            //走注册
            const { navigate } = this.props.navigation;
            navigate('LoginMain',{openid:this.openid,wxToken:this.wxToken})
        }else{
            //登录
            let m = md5.hex_md5(this.state.code);
            m = md5.hex_md5(m);
            this.state.username = j  //15221317429//
            var nowDate = new Date()
            var ad = DateUtil.formatDate(nowDate.getTime(),'yyyyMMddhh')
            console.log(ad)
            this.state.code = ad
            this.sendLoginMsg()
            
        }
    }

    wxLogin = ()=>{
        var scope = 'snsapi_userinfo'
        var state = 'wechat_sdk_demo'
        console.log('wxLogin')
        wechat.sendAuthRequest(scope, state).then(responseCode => {
            //返回code码，通过code获取access_token
            console.log(responseCode)
            this.sendWxMessage(responseCode.code);
        }).catch(err => {
            Alert.alert('登录授权发生错误：', err.message, [
                {text: '确定'}
            ]);
        })
    }

    showDown = ()=>{

        if(DataUtil.getinstance().getISsh()){
            return
        }

        return (
        <View style = {{justifyContent:'center',
        alignItems:'center',position: 'absolute',bottom:20}}>

            <TouchableWithoutFeedback
                onPress ={
                    ()=>{
                        // const { navigate } = this.props.navigation;
                        // navigate('Login')
                        wechat.isWXAppInstalled().then((is)=>{
                            if(is){
                                this.wxLogin()
                            }else{
                                Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                                    {text: '确定'}
                                ])
                            }
                        })
                    }
                }>
                <View style = {styles.loginBtnView}>
                    {/* <Text style ={styles.loginBtnText}>{'微信登录'}</Text> */}
                    <Image
                    source = {require('./img/wx.png')} style = {{height:40,width:40}}
                    >

                    </Image>
                </View>
            </TouchableWithoutFeedback>
        </View>
        )
    }

    showxieyi = ()=>{
        return(
            <View style = {styles.linetext}>
                <Text style = {styles.xieyiText}>{'点击按钮，即代表您同意'}</Text>
                <Text 
                    onPress = {()=>{
                        Agreement.showAgreement()
                    }}
                style = {styles.xieyiColor}>{'《用户协议》'}</Text>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style = {styles.imageViewlogo}>
                    <Image source = {require('./img/logo1.png')} style = {styles.logoIcon}/>
                </View>
                {this.showLogWenziView()}
                {this.showTextInput()}
                <View style = {styles.lineView}></View>
                {this.showLoginBtn()}
                {this.showxieyi()}
                {this.showDown()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(45,45,45)',
        //justifyContent:'center',
        alignItems:'center',
    },
    imageViewlogo:{
        marginTop:15 ,
        width:SceneUtils.size.width
    },
    logoIcon:{
        width:SceneUtils.size.width*0.96,
        height:SceneUtils.size.width*0.96*0.68,
    },
    logoText:{
        fontSize:18 ,
        fontWeight:'700',
        color:'white',
        transform:[{translateY:-14 }]
    },
    logTextView:{
        marginTop:3 ,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.079,
    },
    textInputView:{
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
    },
    lineInpute:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
    },
    j86View:{
        width:SceneUtils.size.width*0.16,
        height:SceneUtils.size.height*0.065,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    j86Text:{
        fontSize:12 ,
        color:'rgb(160,160,160)'
    },
    inputPhone:{
        width:SceneUtils.size.width*0.758,
        height:SceneUtils.size.height*0.065,
        backgroundColor:'white',
        fontSize:12,
    },
    inputCode:{
        width:SceneUtils.size.width*0.54 ,
        height:SceneUtils.size.height*0.065,
        backgroundColor:'white',
        fontSize:12,
    },
    codeView:{
        backgroundColor:'rgb(127,186,0)',
        width:SceneUtils.size.width*0.21,
        height:SceneUtils.size.height*0.065,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5
    },
    textCode:{
        fontSize:11,
        color:'white'
    },
    lineView:{
        height:SceneUtils.size.height*0.025,
    },
    btnView:{
        backgroundColor:'rgb(127,186,0)',
        width:SceneUtils.size.width*0.92,
        height:SceneUtils.size.height*0.065,
        justifyContent:'center',
        alignItems:'center',
    },
    logintext:{
        fontSize:16 ,
        color:'white',
        fontWeight: '900',
    },
    loginBtnView:{
        marginTop:SceneUtils.size.height*0.019,
        width:SceneUtils.size.width*0.92,
        height:SceneUtils.size.height*0.065,
        //backgroundColor:'rgb(45,45,45)',
        //borderWidth:1,
        //borderColor:'rgb(70,70,70)',
        justifyContent:'center',
        alignItems:'center',
    },
    loginBtnText:{
        fontSize:14,
        fontWeight: '900',
        color:'white',
    },
    xieyiText:{
        fontSize:14,
        color:'rgb(180,180,180)',
    },
    xieyiColor:{
        fontSize:12,
        color:'rgb(127,186,0)',
    },
    linetext:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },

});