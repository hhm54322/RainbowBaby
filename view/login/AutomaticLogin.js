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
    Linking,
} from 'react-native';

import Orientation from 'react-native-orientation';
import SceneUtils from '../../utils/SceneUtils';
import Util from '../../utils/Util';
import DataUtil from '../../utils/DataUtil';
import {StorageHelper} from '../../utils/modStruct'

import FloatText from '../../utils/FloatText'

import Babyconfig from '../../utils/Babyconfig'

import *as wechat from 'react-native-wechat'

import NetService from '../../utils/NetService'


//初始化界面
export default class AutomaticLogin extends Component{
    constructor(props) {
        super(props);
        this.struct
        this.versionInfo   //版本信息

        this.version_number   //版本号

        //对应到接口文档同字段
        this.version_examine   //
        this.force_update
        this.recent_update_version
        this.download_url
        //对应到接口文档同字段

        this.recent_update_all

        this.strall

        this.isScucees = true
        
    }
   
    componentWillUnmount(){
    }

    
    onclickcancel = ()=>{

        if(this.force_update === 1  || (this.recent_update_all > this.strall)){
            //退出
        }else{
            this.loginto()
        }
            //ok
    }

    //安卓更新跳转到链接
    onclicksure = ()=>{
        var baiduURL = this.download_url
        if(DataUtil.getinstance().getVueStrByp() === 'IOS'){
            //apps
        }else{
            //liulanqi
            Linking.canOpenURL(baiduURL).then(supported => { 
                 if (!supported) { 
                 } else { 
                    return Linking.openURL(baiduURL); 
                 } 
             }).catch(err => console.error('An error occurred',baiduURL)); 
        } 
    }

    //消息返回数据
    getVersionBack =(j)=>{
        console.log(j)
        this.versionInfo = j
        var len = j.length
        for(var i = 0;i<len;i++){
            var info  = j[i];
            if(info.key === 'version_number'){
                this.version_number = info.value
            }else if(info.key === 'version_examine' ){
                this.version_examine = info.value
            }else if(info.key === 'force_update' ){
                this.force_update = info.value
            }else if(info.key === 'recent_update_version' ){
                this.recent_update_version = info.value
            }else if(info.key === 'download_url'){
                this.download_url = info.value
            }
        }

        this.selectUpdate()
    }

    //计算版本  是否需要更新 
    selectUpdate = ()=>{
        

        var serverNowVersion = (String)(this.version_number)
        var serverNowVersionArry = serverNowVersion.split(".");
        var serverNowversionAll = parseInt(parseInt(serverNowVersionArry[0])*1000000+parseInt(serverNowVersionArry[1])*10000+parseInt(serverNowVersionArry[2]))

        var strcon = Babyconfig
        var strsarry = strcon.split(".");
        this.strall = parseInt(parseInt(strsarry[0])*1000000+parseInt(strsarry[1])*10000+parseInt(strsarry[2]))



        var recent_update_versionver = (String)(this.recent_update_version)
        var recent_update_arry = recent_update_versionver.split(".")
        this.recent_update_all = parseInt(parseInt(recent_update_arry[0])*1000000+parseInt(recent_update_arry[1])*10000+parseInt(recent_update_arry[2]))
        


        var isver = parseInt(this.version_examine) 
        console.log(isver)
        if(isver === 1){
            if(this.strall === serverNowversionAll){
                DataUtil.getinstance().setISsh(true)
            }

            if(this.recent_update_all <= this.strall){
                //this.feiqianggengxin()
                //DataUtil.getinstance().setISsh(true)
            }else{
                this.qiangengxin()
                return
            }
            this.loginto()
            return
        }

        if(serverNowversionAll <= this.strall){
            this.loginto()
            return
        }else{
            if(this.force_update === 1){
                this.qiangengxin()
            }else{
                if(this.recent_update_all <= this.strall){
                    this.feiqianggengxin()
                }else{
                    this.qiangengxin()
                }
            }
        }
    }

    //更新弹窗
    qiangengxin = ()=>{
        Alert.alert('版本更新', '有了新的版本需要您跟新', [
            //{text: '·知道了', onPress: () => console.log('OK Pressed')},
            {text: '前往', onPress: () => { this.onclicksure()  }},
          ],{
            cancelable: false,
            onDismiss: () => {
                this.onclickcancel()
              }
          })
    }

    feiqianggengxin = ()=>{
        Alert.alert('版本更新', '有了新的版本需要您跟新', [
            {text: '取消', onPress: () => {  this.onclickcancel() }, style: 'cancel'},
            //{text: '·知道了', onPress: () => console.log('OK Pressed')},
            {text: '前往', onPress: () => { this.onclicksure()  }},
          ],{
            onDismiss: () => {
                this.onclickcancel()
              }
          })
    }

    getServerVerSion2 = ()=>{
        var mod = {
            params:{},
            params1:{},
            headers:['application/json','application/json'],
            callback:this.getVersionBack
        }
        NetService.do(NetService.sendConfigurations,mod)
    }
    
    //微信分享的注册码
    componentDidMount(){
        // Orientation.lockToPortrait();
        wechat.registerApp('wxb8e97c28e06ce8e9')
        //wechat.registerAppWithDescription('wxb8e97c28e06ce8e9','1')
        DataUtil.getinstance().getNetInfo()
        this.getServerVerSion2()
    }

    //拿取本地数据  有的话 就直接登陆  没有就跳到登陆界面
    loginto = ()=>{
        //StorageHelper.delete('pStruct')
        StorageHelper.get('pStruct',(struct)=>{
            console.log(struct)
            if(struct != null){
                DataUtil.getinstance().setUserData(struct)
                this.struct = struct
                this.sendLoginMsg(struct)
                
            }else{
                const { navigate } = this.props.navigation;
                navigate('Login')
            }
        })
    }

    //登陆消息返回
    logInMessgeBack = (responseJson)=>{
        DataUtil.getinstance().setUserData(responseJson)
        DataUtil.getinstance().setPhoneNumber(this.struct.phoneNum)
        
        var mode  = {
            phoneNum:this.struct.phoneNum,
            access_token:responseJson.access_token,
            refresh_token:responseJson.refresh_token
        }
        StorageHelper.save('pStruct',mode)

    }

    //家庭消息返回
    famliyListBack = (responseJson)=>{
        console.log(responseJson)
        DataUtil.getinstance().setMainFamliy(responseJson)
    }

    //用户消息返回
    pushzhBack = (responseJson)=>{
        DataUtil.getinstance().setAccont(responseJson)
        setTimeout(() => {
            var responseJson = DataUtil.getinstance().getMainFamliy()
            if(responseJson && responseJson.main.children.length>=1){
                const { navigate } = this.props.navigation;
                navigate('Main')
            }else{
                const { navigate } = this.props.navigation;
                navigate('CreateBaby',{info:false})
            }
        }, 10);
    }


    //跳转到main界面
    listBack = ()=>{
        const { navigate } = this.props.navigation;
        navigate('Main')
    }
    
    //跳转到login
    loginError  =()=>{
        const { navigate } = this.props.navigation;
        navigate('Login')
    }

    //发送登陆消息
    sendLoginMsg = (mod)=>{
        console.log('sendLoginMsg enter')
        let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP',
                'grant_type': 'refresh_token','refresh_token':mod.refresh_token};
        var mod1 = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.logInMessgeBack,
            errorBack:this.loginError
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendtoken)
        dataArry.push(mod1)
        NetService.doArry(farry,dataArry,this.loginEnd)
    }

    //登陆结束
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
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
});