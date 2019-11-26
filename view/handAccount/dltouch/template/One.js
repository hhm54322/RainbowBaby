/**
 * Sample React Native One temp
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

export default class One extends Component {
  constructor(props) {
    super(props);
    this._child = null
    this.inpute
    this._maxWidth = 300,
    this._width = 300,
    this._height = 300,
    this._scale = this.props.scale
    this.state = {
    }
  }
  componentWillMount(){

  }
  componentDidMount(){

  }

  toEditer = ()=>{
    //this.inpute.show()
  }

  getHeight =()=>{
    return {height:this._height,width:this._width};
  }

  toSetHeightAndWidth = (height,width,scale)=>{
    this._width = width
    this._height = height
    this._scale = width/this._maxWidth
  }

  _onLayout = (event) =>{
    {
      let {x, y, width, height} = event.nativeEvent.layout;
      this._height = height    
      this._width = width
    }
  }

  render() {
    var stylemain = {
      width:this._width,
      height:this._height,
    }
    return (
        <View 
        onLayout={this._onLayout}
        style = {stylemain}>
          <View style = {[styles.topView,{height:100 *this._scale}]}>
              <Text style ={{fontSize :24*this._scale,
              }}>你好</Text>
          </View>
          <View style = {[styles.topView,{height:200 *this._scale,
          }]}>
              <Text style ={{fontSize :18*this._scale,width:190*this._scale}}>fhaosifaidadadadasdadddasasndansunasudnasiu</Text>
          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    
  },
  topView:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});
