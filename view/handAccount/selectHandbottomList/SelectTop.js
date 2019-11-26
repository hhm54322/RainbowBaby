/**
 * React Native SelectTop
 * Create Data 2018 5 21
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

const displayFlex  = 'flex'
const displayNone  = 'none'


//选中上下移动层界面  进入编辑状态后  顶部状态栏  控制层级形式
export default class SelectTop extends Component {
  constructor(props) {
    super(props);
    this._touchb = this.props.touchBack     //点击回调
    this._toucho = this.props.touchok       //点击确认回调，或者说 设置回调
    this.que = this.props.rightstr          //右边的文字  废弃
    this.textarr = ['移到顶层','向上一层','向下一层','移到底层']        //显示的文字
    this.textImage = [require('./img/d.png'),           //4张图片
    require('./img/s.png'),
    require('./img/x.png'),
    require('./img/di.png')
    ]
    this.state = {
        show:false
    }

  }

  componentDidMount() {

  }

  //显示
  show = ()=>{
    this.setState({
      show:true,
    })
}
//关闭
close = ()=>{
  this.setState({
      show:false
    })
}

//点击之后调用回调
  _onTouchBack = ()=>{
     if(this._touchb){
        this._touchb()
     }
  }

  //点击之后回调
  _onTouchOk = ()=>{
        if(this._toucho){
            this._toucho()
        }
  }


  //选择层级之后的回调
  touchZoder = (i)=>{
        var ii =i 
        var back = ()=>{
            if(this._toucho){
                this._toucho(ii)
            }
        }
        return back
  }

  //显示btn 和下面的文字
  showForButton = ()=>{
      var temp = []
        var len = this.textarr.length
        for(var i=0;i<len;i++){
            temp.push(<View 
                onTouchEnd = {this.touchZoder(i)}
            key = {i}
            style = {styles.headeCenter}>
                <Image style = {styles.topImg}
                source={this.textImage[i]} 
                ></Image>
                <Text style = {{fontSize:8,color:'white'}}>{this.textarr[i]}</Text>
            </View>)
        }
        return temp
  }

  render() {
    var showStr = this.state.show ? displayFlex:displayNone
    return(
        <View style={{display:showStr,position: 'absolute'}}>
            <View style = {[styles.headView,this.props.style]}
            >
                {this.showForButton()}
            </View>
            <View style = {styles.line}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headView : {
        top:0,
        flexDirection:'row',
        backgroundColor:'rgb(51,51,51)',
        height:Dimensions.get('window').height*0.105,
        width:Dimensions.get('window').width,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    ImgView:{
        width:Dimensions.get('window').height*0.048-4,
        height:Dimensions.get('window').height*0.048-4,
        resizeMode:'contain',
        marginLeft:10,
        marginTop:3,
    },
    line:{
        width :Dimensions.get('window').width,
        borderBottomWidth:1,
        borderColor:'#D4D4D4',
    },
    headeCenter :{
        justifyContent: 'center',  
        alignItems:'center', 
        marginLeft:15,
        marginRight:15,
    },
    topImg:{
        width:Dimensions.get('window').height*0.03,
        height:Dimensions.get('window').height*0.03,
        resizeMode:'contain',
        marginTop:15,
        marginBottom:4,

    },
 
});
