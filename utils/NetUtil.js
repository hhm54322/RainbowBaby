'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ResponseStatus,
    
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FloatText from './FloatText'
import DataUtil from '../utils/DataUtil'
import {StorageHelper}  from '../utils/modStruct'
//isShow
import LoadingView from './LoadingView'
import {Error} from './Error'

//已经废弃
var adc = setInterval(async () =>{
    console.log('is enter ')
    var modd = DataUtil.getinstance().getUserData()
    if(modd === null){
        return
    }
    console.log(modd)
    let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP',
            'grant_type':'refresh_token','refresh_token':modd.refresh_token};
    var url = '/maria/oauth/token'
    url = 'http://47.99.57.113:10001'+url
    url = NetUitl.getUrlByparams(url,params)
    try {
        console.log(url)
        let res = await fetch(url,{
        method: 'POST',
        headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
        },
        //body:JSON.stringify(params),
                    //timeout:2*1000
        })
        console.log(res)
        if(res.ok === true){
            let responseJson = {}
            if(res._bodyText !== ''){
                responseJson = await res.json();
                console.log(responseJson);
                DataUtil.getinstance().setUserData(responseJson)
                var mode  = {
                    phoneNum:DataUtil.getinstance().getPhoneNumber(),
                    access_token:responseJson.access_token,
                    refresh_token:responseJson.refresh_token
                    }
                StorageHelper.save('pStruct',mode)

            }
                    
            }else{
            }
        
            } catch (error) {
                //请求出错
                console.log(error)
            }
},1000*60*45)



class NetUitl extends Component{
    constructor(props) {
        super(props);
        this.messageCallBack = null
        this.fMap = new Map()
        this.fMap.set('get', NetUitl.get)
        this.fMap.set('post', NetUitl.post)
        this.fMap.set('put', NetUitl.put)
        this.fMap.set('delete', NetUitl.delete)
        this.fMap.set('patch', NetUitl.patch)

        
        

        this.sendArry = []
        this.state = {
            show:false,
        };
    }
    /*
     *  get请求
     *  url:请求地址
     *  params:url参数
     *  params1:body参数
     *  callback:回调函数
     * */
    //static urlH  = 'http://139.196.167.85:7070'
    //static urlH = 'http://139.196.167.85:7070'
    static urlH  = 'http://47.99.57.113:10001'    //zijide s

    //static urlH  = 'http://172.32.15.178'

    //static urlH  = 'http://172.32.19.192'  //ceshi xiaz
    //static urlH  = 'http://client.dingdangddc.com//sms/sendAuthCode.do?accountId=30&phone=15221317429'

    /**
     * mod:{
     * type   //get post put
     * url
     * params
     * params1
     * headers
     * callback    //用es6表达式
     * }
     */
    show = ()=>{
        console.log('show')
        this.setState({
            show:true
        })
    }
    hid = ()=>{
        console.log('hid')
        this.setState({
            show:false
        })
    }
    pushMessage = (mod)=>{
        //show
        this.sendArry.push(mod)
    }

    //设置消息队列里面的消息全部执行完毕之后的回调   可选
    setMessageCallBack = (backfun)=>{ 
        if(backfun){
            this.messageCallBack = backfun
        }
    }

    async sendMessage(){
        this.show()
        var ac = true
        var len = this.sendArry.length
        console.log(this.sendArry)
        for(var i=0;i<len;i++){
            
            var item = this.sendArry[i]
            var er = await this.fMap.get(item.type)(item.url,item.params,item.params1,item.headers,item.callback)
            if(er === true){
                ac = false
                break;
            }
        }
        this.sendArry = []
        this.hid()
        if(this.messageCallBack  && ac){
            this.messageCallBack = this.messageCallBack()
        }
        
    }
    
    
    static async get(url,params,params1,headers,callback){
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        var isError = false
        console.log(url)
        //fetch请求
        try {
            let res = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                //body:JSON.stringify(params1),
            })
            if(res.ok === true){
                let responseJson = {}
                if(res._bodyText !== ''){
                    responseJson = await res.json();
                }
                console.log(res)
                console.log(responseJson)
                NetUitl.handleRes(responseJson , callback)
                isError = false
            }else{
                isError = true
                console.log(res.status)
                if(callback){
                    console.log(callback)
                    callback(null,false)
                }
                Error.errorfloat(res)
            }
        }catch (error) {
            if(callback){
                callback(null,false)
            }
        }
        console.log('return')
        return isError
    }
    /*
     *  post请求
     *  url:请求地址
     *  params:参数
     *  headers:消息头
     *  callback:回调函数
     * */

    static async  postf(url,params,params1,headers,callback){
        //fetch请求
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        var isError = false
        try {
                let res = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:params1,
                //timeout:2*1000
            })
            console.log(res)
            if(res.ok === true){
                // let responseJson = {}
                // if(res._bodyText !== ''){
                //     responseJson = await res.json();
                // }
                NetUitl.handleRes(res._bodyText , callback)
            }else{
                isError = true
                Error.errorfloat(res)
                console.log(res.status)
                console.log(res)
            }
    
        } catch (error) {
            //请求出错
            console.log(error)
            console.log(error.name +'  :  '+error.message)
        }
        return isError

    }


    static async  post(url,params,params1,headers,callback){
        //fetch请求
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        console.log(url)
        console.log(params1)
        var isError = false
        try {
                let res = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1),
                //timeout:2*1000
            })
            console.log(res)
            if(res.ok === true){
                let responseJson = {}
                if(res._bodyText !== ''){
                    responseJson = await res.json();
                }
                NetUitl.handleRes(responseJson , callback)
            }else{
                if(callback){
                    console.log(callback)
                    callback(null,false)
                }
                console.log(res.status)
                console.log(res)
                isError = true
                Error.errorfloat(res)
            }
    
        } catch (error) {
            //请求出错
            console.log(error)
            console.log(error.name +'  :  '+error.message)
        }
        return isError

    }

    static async patch(url,params,params1,headers,callback){
        //fetch请求
        
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        console.log(url)
        console.log(params1)
        var isError = false
        try {
                let res = await fetch(url,{
                method: 'PATCH',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1),
                //timeout:2*1000
            })
            console.log(res)
            if(res.ok === true){
                let responseJson = {}
                if(res._bodyText !== ''){
                    responseJson = await res.json();
                }
                NetUitl.handleRes(responseJson , callback)
            }else{
                console.log(res.status)
                console.log(res)
                isError = true
                Error.errorfloat(res)
            }
    
        } catch (error) {
            //请求出错
            console.log(error)
            console.log(error.name +'  :  '+error.message)
        }
       return isError;

    }
    static async put(url,params,params1,headers,callback){
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        console.log(url)
        console.log(params1)
        var isError = false
        try {
            //fetch请求
            let res = await fetch(url,{
                method: 'PUT',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1)
            })
            if(res.ok === true){
                let responseJson = {}
                if(res._bodyText !== ''){
                    responseJson = await res.json();
                }
                NetUitl.handleRes(responseJson , callback)
            }else{
                console.log(res.status)
                console.log(res)
                isError = true
                Error.errorfloat(res)
            }
        } catch (error) {
            console.log(error)
            console.log(error.name +'  :  '+error.message)
        }
        return isError

    }
    static async delete(url,params,params1,headers,callback){
        url = NetUitl.urlH+url
        url = NetUitl.getUrlByparams(url,params)
        console.log(url)
        console.log(params1)
        var isError = false
        try {
            //fetch请求
            let res = await fetch(url,{
                method: 'DELETE',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1)
            })
            if(res.ok === true){
                let responseJson = {}
                if(res._bodyText !== ''){
                    responseJson = await res.json();
                }
                NetUitl.handleRes(responseJson , callback)
            }else{
                console.log(res.status)
                console.log(res)
                isError = true
                Error.errorfloat(res)
            }
        } catch (error) {
            console.log(error)
            console.log(error.name +'  :  '+error.message)
        }
        return isError
    }
    static getUrlByparams = (url,params)=>{
        if (params && JSON.stringify(params)!== '{}') {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            console.log(paramsArray)
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else{
                url += '&' + paramsArray.join('&')
            }
        }
        return url
    }
    static handleRes(responseJson , callback){
        if(callback){
            callback(responseJson,true)
        }
        if (responseJson) {
            
        }else {
            //请求失败
        }
    }
    render(){
        return(<LoadingView
            isShow = {this.state.show}
        >
        </LoadingView>)
        return (
            <Spinner visible={this.state.show} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        )
    }

}
export default NetUitl;