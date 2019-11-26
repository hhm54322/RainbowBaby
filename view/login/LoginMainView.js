'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import Util from '../../utils/Util';
import DataUtil from '../../utils/DataUtil';
import md5 from "react-native-md5";
import {StorageHelper} from '../../utils/modStruct'
import NetService from '../../utils/NetService'
import Agreement from './Agreement'

//注册页面
export default class LoginMainView extends Component{
    constructor(props) {
        super(props);
        this.isLogin = false
        this.openid = this.props.navigation.state.params.openid     //微信的opid
        this.wxToken = this.props.navigation.state.params.wxToken      //微信的token
        this.state = {
            username: '',       //username
            code:'',            //验证码
            counting:false,     
            timerCount:20,                  
            timerCode:'获取验证码',     //验证码文字
        };
    }

    //判断是现实  获取验证码  还是重新获取需要等待的时间
    _countDownAction(){
        if(this.state.counting) {return}
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() =>{
            const timer = this.state.timerCount - 1
            if(timer===0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: 20,
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
    //删除定时器
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    

    //登陆消息回调数据村本地
    logInMessgeBack = (responseJson)=>{
        console.log(responseJson)
        DataUtil.getinstance().setUserData(responseJson)
        DataUtil.getinstance().setPhoneNumber(this.state.username)
        var mode  = {
            phoneNum:this.state.username,
            access_token:responseJson.access_token,
            refresh_token:responseJson.refresh_token
        }
        StorageHelper.save('pStruct',mode)
    }

    //家庭成员消息回调
    famliyListBack = (responseJson)=>{
        console.log(responseJson)
        DataUtil.getinstance().setMainFamliy(responseJson)
    }

    //跳转到main  或者 创建宝宝   如果是注册过的  跳转到main
    listBack = ()=>{
        const { navigate } = this.props.navigation;
        if(this.isLogin){
            navigate('Main')
            return
        }
        navigate('CreateBaby',{info:false})
    }


    ///登陆过后根据是否有宝宝  来跳转到main  或者创建宝宝
    pushzhBack = (responseJsonz)=>{
        DataUtil.getinstance().setAccont(responseJsonz)

        var responseJson = DataUtil.getinstance().getMainFamliy()
        if(responseJson && responseJson.main.children.length>=1){
            const { navigate } = this.props.navigation;
            navigate('Main')
        }else{
            const { navigate } = this.props.navigation;
            navigate('CreateBaby',{info:false})
        }
    }


    //发送登陆消息
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

    //login过后 发送宝宝的相关的消息
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


    //发送注册的消息
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

    //发送获取验证码的消息
    sendMsmCode(){
        let params = {'cellPhoneNumber':this.state.username,'countryCode':'86',wechatNumber:this.openid,
            accessToken:this.wxToken,
        };
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

    //显示文字
    showLogWenziView = ()=> {
        return (
            <View style = {styles.logTextView}></View>
        )
    }

    //获取验证码回调函数
    ontoutchCodeViewBack = ()=>{
        if(Util.phoneNumCheck(this.state.username)){
            if(!this.state.counting && this.state.timerCode === '获取验证码'){
                this._countDownAction();
                this.setState({counting:true});
                this.sendMsmCode();
            }
        }else{
            //手机号码格式错误
        }
    }
    
    showTextInput = ()=>{
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
                <View style = {styles.codeView}>
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
                }
            }}
        >
        <View style = {styles.btnView}>
            <Text style = {styles.logintext}>{'开启彩虹之旅'}</Text>
        </View>
        </TouchableWithoutFeedback>
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
                <View style = {styles.lineView}></View>
                {this.showxieyi()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        height:SceneUtils.size.height,
        width:SceneUtils.size.width,
        backgroundColor:'rgb(45,45,45)',
        //justifyContent:'center',
        alignItems:'center',
    },
    imageViewlogo:{
        marginTop:15,
        width:SceneUtils.size.width
    },
    logoIcon:{
        width:SceneUtils.size.width*0.96,
        height:SceneUtils.size.width*0.96*0.68,
    },
    logTextView:{
        marginTop:3,
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
    j86View:{
        width:SceneUtils.size.width*0.16,
        height:SceneUtils.size.height*0.065,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    j86Text:{
        fontSize:12,
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
        fontSize:12,
        color:'white'
    },
    lineView:{
        height:SceneUtils.size.height*0.025,
    },
    btnView:{
        backgroundColor:'rgb(127,186,0)',
        width:SceneUtils.size.width *0.92,
        height:SceneUtils.size.height*0.065,
        justifyContent:'center',
        alignItems:'center',
    },
    logintext:{
        fontSize:16,
        color:'white',
        fontWeight: '900',
    },

    textddenglu:{
        marginTop:SceneUtils.size.height*0.095,
        fontSize:13,
        color:'rgb(200,200,200)',
    },
    loginBtnView:{
        marginTop:SceneUtils.size.height*0.019,
        width:SceneUtils.size.width*0.92,
        height:SceneUtils.size.height*0.065,
        backgroundColor:'rgb(45,45,45)',
        borderWidth:1,
        borderColor:'rgb(70,70,70)',
        justifyContent:'center',
        alignItems:'center',
    },
    loginBtnText:{
        fontSize:14,
        fontWeight: '900',
        color:'white',
    },

});
