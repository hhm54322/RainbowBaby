/**
 * Sample React Native CText
 * 
 * @xjs
 */

import React, { Component } from 'react';
import TextInputView from '../../../utils/TextInputView'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
  findNodeHandle,
  Dimensions,
} from 'react-native';


//text   文字类型 里面装的文字对象
export default class CText extends Component {
  constructor(props) {
    super(props);
    this._child = null
    this.inpute
    var strd = this.props.str
    this._text;
    this._height;
    this._width;
    this.state = {
      str:strd,
      color:'rgb(20,20,144)',
      fontName:'Georgia',
      fontSize:1

    }
  }
  componentWillMount(){

  }
  componentDidMount(){
  }

  setFontName = (name)=>{
    this.setState({
      fontName:name
    })
  }
  setFontColor = (color)=>{
    this.setState({
      color:color
    })
  }

  getModText = ()=>{
    var mode ={
      fontColor:this.state.color,
      fontName:this.state.fontName,
      fontSize:this.state.fontSize,
      str:this.state.str,
    }
      return mode
  }

  setFontSize = (size)=>{
    var s  = this.state.fontSize+size
    s = s>25? 25:s
    s = s<10? 10:s
    this.setState({
      fontSize:s
    })
  }

  getHeight =()=>{
    return {height:this._height,width:this._width};
  }

  setStringToStr = (mode)=>{
      var strn = mode.fontStr
      this.setState({
        str:strn,
        fontName:mode.fontName,
        color:mode.fontColor,
        fontSize:mode.fontSize
      })
      //this.getHeight();
  }

  setThisString = (strn)=>{
    this.setState({
      str:strn,
    })
  }

  getStrd = ()=>{
    return this.state.str
  }

  _onLayout = (event) =>{
    {
      //获取根View的宽高，以及左上角的坐标值
      let {x, y, width, height} = event.nativeEvent.layout;
      this._height = height    
      this._width = width
      // console.log('通过onLayout得到的宽度：' + width);
      // console.log('通过onLayout得到的高度：' + height);
    }
    //通过Dimensions API获取屏幕宽高
    // let {width, height} = Dimensions.get('window');
    // console.log('通过Dimensions得到的宽度：' + width);
    // console.log('通过Dimensions得到的高度：' + height);
  }


  render() {
    return (
      <Text 
      onLayout={this._onLayout}
      ref = {ref =>{this._text = ref}}
      style = {[this.props.style,{color:this.state.color
      ,fontFamily:this.state.fontName,
        fontSize:this.state.fontSize
      }]}>
        {this.state.str}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
  }
});
