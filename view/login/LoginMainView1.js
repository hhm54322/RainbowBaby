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
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import Util from '../../utils/Util';
import NetUtil from '../../utils/NetUtil';
import DataUtil from '../../utils/DataUtil';
import md5 from "react-native-md5";
import {StorageHelper} from '../../utils/modStruct'


//废弃
export default class LoginMainView1 extends Component{
    constructor(props) {
        super(props);
        this.netutil
        this.state = {
            username: '',
            code:'',
            counting:false,
            timerCount:20,
            timerCode:'获取验证码',
        };
    }
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
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    //
    logInMessgeBack = (responseJson)=>{
        DataUtil.getinstance().setUserData(responseJson)
        var mode  = {
            phoneNum:this.state.username,
            access_token:responseJson.access_token,
            refresh_token:responseJson.refresh_token
        }
        StorageHelper.save('pStruct',mode)
        const { navigate } = this.props.navigation;
        navigate('CreateBaby')
    }
    sendLoginMsg = ()=>{
        let m = md5.hex_md5(this.state.code);
        m = md5.hex_md5(m);
        let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP','grant_type': 'password', 'password': m,'username':'86' + this.state.username};
        var mod = {
            type:'post',
            url:'/maria/oauth/token',
            params:params,
            params1:{},
            headers:['application/x-www-form-urlencoded','application/json'],
            callback:this.logInMessgeBack
        }
        this.netutil.pushMessage(mod)
        this.netutil.sendMessage()
    }
    sendRegistrationMsg = ()=>{
        let m = md5.hex_md5(this.state.code);
        m = md5.hex_md5(m);
        let params = {'cellPhoneNumber':this.state.username,'countryCode':'86','smsCode': m};
        NetUtil.post('/maria/account/services/registration',{},params,['application/json','application/json'], (responseJson) =>{
            //下面的就是请求来的数据
            console.log(responseJson);
            this.sendLoginMsg();
        })
    }
    sendMsmCode(){
        //http://139.196.167.85:7070/joplus-crm/crmUser/crmsUserList post,
        let params = {cellPhoneNumber:this.state.username,countryCode:'86'};
        NetUtil.post('/maria/account/services/sms_code_generating',{},params,['application/json','application/json'],function (responseJson) {
            //下面的就是请求来的数据
            console.log(responseJson);
        })

        // let params2 = {startRow:0,pageSize:15};
        // NetUtil.post('/joplus-crm/crmUser/crmsUserList',{},params2,['',''],function (responseJson) {
        //     //下面的就是请求来的数据
        //     console.log(responseJson);
        // })
        // let params = {startRow: 0, pageSize: "15", mobile: "", orderNo: ""}
        // NetUtil.get('/joplus-crm/thirdpartyOrder/list/order',params,['',''],function (responseJson) {
        //     //下面的就是请求来的数据
        //     console.log(responseJson);
        // })

        
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
                        <Text style={styles.text}>CN+86</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="请输入手机号码           "
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({
                                    username: text
                                });
                            }}
                            value={this.state.username}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>验证码 </Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="请输入验证码           "
                            keyboardType='numeric'
                            maxLength={6}
                            onChangeText={(text) => {
                                this.setState({
                                    code: text
                                });
                            }}
                            value={this.state.code}
                        />
                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                            if(Util.phoneNumCheck(this.state.username)){
                                if(!this.state.counting && this.state.timerCode === '获取验证码'){
                                    this._countDownAction();
                                    this.setState({counting:true});
                                    this.sendMsmCode();



                                    // let params = {'start':'0',limit:'20','isNeedCategory': true, 'lastRefreshTime': '2016-09-25 09:45:12'};
                                    // NetUtil.post('http://www.pintasty.cn/home/homedynamic',params,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJVLTliZGJhNjBjMjZiMDQwZGJiMTMwYWRhYWVlN2FkYTg2IiwiZXhwaXJhdGlvblRpbWUiOjE0NzUxMTg4ODU4NTd9.ImbjXRFYDNYFPtK2_Q2jffb2rc5DhTZSZopHG_DAuNU',function (set) {
                                    //     //下面的就是请求来的数据
                                    //     console.log(set)
                                    // })

                                    // NetUtil.get('https://www.baidu.com/','',function (set) {
                                    //     //下面是请求下来的数据
                                    //     console.log(set)
                                    // })
                                }
                            }else{
                                //手机号码格式错误
                            }
                        }}>
                            <Text style={styles.timerCodeText}>{this.state.timerCode}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginView}>
                        <Text style={styles.loginText}
                        onPress={() => navigate('Login')}>有账号 ? 去登录></Text>
                    </View>
                    <View style={styles.registerView}>
                        <ImageBackground source = {
                            Util.phoneNumCheck(this.state.username) && this.state.code.length === 6 ? require('./ICON_06.png') : require('./ICON_01.png')} style = {styles.btnImage}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.btn}
                                onPress={() => {
                                    if(Util.phoneNumCheck(this.state.username) && this.state.code.length === 6){

                                        //navigate('CreateBaby')
                                        this.sendRegistrationMsg();
                                    }
                                }
                            }>
                                <Text style={styles.btnText}>注册</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.userAgreementView}>
                        <Text style={styles.userAgreementText}>点击【注册】按钮，即代表你同意</Text>
                        <Text style={styles.userAgreementLinkText}
                        onPress={()=>{
                            
                        }}>《用户协议》</Text>
                    </View>
                </View>
                <NetUtil
                    ref= {ref=>{this.netutil = ref}}
                ></NetUtil>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        //justifyContent:'space-around',
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
    loginView:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    loginText: {
        lineHeight: 36,
        fontSize: 14,
        color:'#00C5CD',
        marginRight:30,
    },
    registerView:{
        alignSelf:'center',
        marginTop:40,
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
    userAgreementView:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    userAgreementText: {
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
        // marginRight:30,
    },
    userAgreementLinkText: {
        lineHeight: 36,
        fontSize: 14,
        color:'#00C5CD',
    },
    timerCodeText:{
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
        marginLeft:30,
    },


});
