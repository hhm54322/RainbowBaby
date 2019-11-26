/**
 * React Native SelectButton
 * Create Data 2018 5 8
 * @ by XJS
 */

import React, { Component } from 'react';
//import tinycolor from 'tinycolor2';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from 'react-native';

import SceneUtils from '../../../utils/SceneUtils'


//自定义头部对象 纯显示
export default class Head extends Component {
  constructor(props) {
    super(props);
    this.headstr = this.props.headstr       //头部的文字内容
    this._touchb = this.props.touchBack     //点击返回回调
    this._toucho = this.props.touchok       //点击确认的回调
    this.que = this.props.rightstr          //右边文字
    this.state = {
    }

  }

  componentDidMount() {

  }

  //点击返回
  _onTouchBack = ()=>{
     if(this._touchb){
        this._touchb()
     }
  }

  //点击确认
  _onTouchOk = ()=>{
        if(this._toucho){
            this._toucho()
        }
  }

  render() {
    return(
        <View style = {this.props.style}>
            <View style = {[styles.headView]}
            >
                <TouchableWithoutFeedback
                    onPress = {this._onTouchBack}
                >
                <Image
                style = {styles.ImgView}
                source={require('./img/back.png')} 
                ></Image>
                </TouchableWithoutFeedback>

                <Text style = {{fontSize:16,fontWeight:'900',
                marginTop:8,
                marginLeft:19,
                color:'white'
                
            }}>{this.headstr}</Text>

                <TouchableWithoutFeedback
                        onPress = {this._onTouchOk}
                >
                <View style = {{width:Dimensions.get('window').width*0.15}}>
                    <Text style = {{fontSize:16,fontWeight:'400',color:'white',
                    marginTop:9}}> {this.que }</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>
            <View style = {styles.line}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headView : {
        flexDirection:'row',
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.height*0.105,
        width:SceneUtils.size.width,
        justifyContent: 'space-between',  
        alignItems:'center', 
        //backgroundColor:'rgb(51,51,51)'
    },
    ImgView:{
        width:Dimensions.get('window').height*0.0130,
        height:Dimensions.get('window').height*0.037,
        resizeMode:'contain',
        marginLeft:20,
        marginTop:7,
    },
    line:{
        width :Dimensions.get('window').width,
        borderBottomWidth:1,
        borderColor:'#D4D4D4',
    },
 
});
