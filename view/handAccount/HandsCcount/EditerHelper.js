/**
 * Sample React Native EditerHelper
 * 
 * @xjs
 */

import React, { Component } from 'react';

import CText from './../dltouch/CText'
import CImage from './../dltouch/CImage'
import One from './../dltouch/template/One'

import TouchComponentImg from '../dltouch/TouchComponentImg'
import TouchComponentMod from '../dltouch/TouchComponentMod'
import TouchComponentText from '../dltouch/TouchComponentText'


import Date1 from '../dltouch/template/Date1'
import Date2 from '../dltouch/template/Date2'
import Date3 from '../dltouch/template/Date3'
import Date4 from '../dltouch/template/Date4'


//所有的模块需要注册//    由于之前不知道rn  有自己系统自带的注册方法    所以也就这么将就用
//有空会重构修改 不重构也是可以的
export class EditerHelper {

    constructor() {
        this.registMap = new Map()
        this.registMap.set('TouchComponentImg',this._TouchComponentImg)
        this.registMap.set('TouchComponentMod',this._TouchComponentMod)
        this.registMap.set('TouchComponentText',this._TouchComponentText)

        

        this.registMapCom = new Map()
        this.registMapCom.set('Date1',this._Date1)
        this.registMapCom.set('Date2',this._Date2)
        this.registMapCom.set('Date3',this._Date3)
        this.registMapCom.set('Date4',this._Date4)
    }

    getregistMapCom (){
        return this.registMapCom
    }

    _Date1 = (dated,scaled)=>{
       return(<Date1 date = {dated}scale = {scaled}></Date1>) 
    }
    _Date2 = (dated,scaled)=>{
        return(<Date2 date = {dated}scale = {scaled}></Date2>) 
    }
    _Date3 = (dated,scaled)=>{
        return(<Date3 date = {dated}scale = {scaled}></Date3>) 
    }
    _Date4 = (dated,scaled)=>{
        return(<Date4 date = {dated}scale = {scaled}></Date4>) 
    }

    deCopy(obj){
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ? 
                cloneObj(obj[i]) : obj[i]; 
            }
        }
        return newobj;
    }

    _TouchComponentText = (mod,refd)=>{
        var tepm =  (
            <TouchComponentText
            key = {mod.key}
            ref = {ref=> refd.ref = ref}
            mode = {mod}
            selectBack = {refd.selectBack}
            deleteBack= {refd.deleteBack}
            comEditerBack = {refd.comEditerBack}
            >
                <CText></CText>
            </TouchComponentText>
        )
        return tepm
    }
    _TouchComponentImg = (mod,refd)=>{
        var tepm =  (
            <TouchComponentImg
            key = {mod.key}
            ref = {ref=> refd.ref = ref}
            mode = {mod}
            selectBack = {refd.selectBack}
            deleteBack= {refd.deleteBack}
            >
                <CImage></CImage>
            </TouchComponentImg>
        )
        return tepm
    }
    _TouchComponentMod = (mod,refd)=>{
        var tepm =  (
            <TouchComponentMod
            key = {mod.key}
            ref = {ref=> refd.ref = ref}
            mode = {mod}
            selectBack = {refd.selectBack}
            deleteBack= {refd.deleteBack}
            >
                {this.registMapCom.get(mod.dateMod)(mod.datec,mod.scale)}
            </TouchComponentMod>
        )
        return tepm
    }
    
    //创建渲染  返回dom虚拟对象
    //mod 对象为 编辑界面的mod对象   ref   为了获取真实对象 传入

    toSetMode = (mod,ref)=>{
        return this.registMap.get(mod.comName)(mod,ref)
    }
    
  }
  
  