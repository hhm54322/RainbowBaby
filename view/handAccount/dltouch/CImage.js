/**
 * Sample React Native CImage
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


//image  图片类型 里面装的image对象
export default class CImage extends Component {
  constructor(props) {
    super(props);
    this._child = null
    this.inpute
    this._width=388*0.5,    //初始化  w
    this._height=408*0.5,   //初始化  h
    this.type = 1,
    this.state = {
        url:'',           //废弃
        refrenshow:true,      //刷新
        req:require('../imgs/cx/cx-(1).png')    //图片的链接  可能是 url  可能是req id  就是图片的引用id
    }
  }
  componentWillMount(){

  }
  componentDidMount(){

  }

  //设置初始化属性
  setHAndWAndReq = (req,h,w,type)=>{
    this._width=w
    this._height=h
    var uri = undefined
    if(type === 1){
      uri = req
    }else{
      uri = {uri:req}
    }
    this.setState({
      req:uri
    })
  }

  toEditer = ()=>{
    //this.inpute.show()
  }

  //设置宽和高
  toSetHeightAndWidth = (height,width)=>{
    this._width = width
    this._height = height
    this.setState({
      refrenshow:!this.state.refrenshow
    })
  }

  render() {
    return (
        <Image
            style = {[styles.main,{height:this._height,width:this._width}]}
            source={this.state.req}
            //source = {{uri:'./tt.png'}}
        ></Image>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    resizeMode:'contain',
  }
});
