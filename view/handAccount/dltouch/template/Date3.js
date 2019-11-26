/**
 * Sample React Native Date3 temp
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
  ImageBackground,
  
} from 'react-native'
import {Images} from './Images'
import resolveAssetSource from 'resolveAssetSource'

//纯显示页面  第3个日期
export default class Date3 extends Component {
  constructor(props) {
    super(props);
    this._child = null
    this.inpute
    this._maxWidth = 1152,
    this._width = 1152,
    this._height = 557,
    this.date = this.props.date
    this._scale = this.props.scale
    this.images = Images
    var dateStru = new Date(this.date)
    this.year = dateStru.getFullYear()
    this.day = dateStru.getDate()
    this.mon = dateStru.getMonth()
    this.monthHight = 0;
    this.monthWidth = 0;
    //this.year = 
    this.state = {
    }

    this.setmonthImageStr()
  }
  componentWillMount(){

  }
  componentDidMount(){

  }

  setmonthImageStr =()=>{
    var source = resolveAssetSource(this.images.month[this.mon])
    this.monthWidth = source.width
    this.monthHight = source.height
  }

  toEditer = ()=>{
    //this.inpute.show()
  }

  getHeight =()=>{
    return {height:this._height*this._scale,width:this._width*this._scale,scale:this._scale};
}

    toSetHeightAndWidth = (height,width,scale)=>{
        this._scale = width/this._maxWidth
        this.setState({
            show:!this.state.show
        })
    }

  pushBackArr =(arry1,arry2)=>{
        var len = arry2.length
        for(var i = 0;i<len;i++){
            arry1.push(arry2[i])
        }
  }


  showYearNumber = ()=>{
      //  64     75
      var yearstring = this.year.toString()
      var temp = []
      var numberarry =[]
      var yeararr = yearstring.slice('')
      this.pushBackArr(numberarry,yeararr)
      numberarry.push(10)
      numberarry.push(this.mon)
      numberarry.push(10)
      var daystr = this.day.toString()
      var dayarr = daystr.slice('')
      this.pushBackArr(numberarry,dayarr)
      var len = numberarry.length
    for(var i = 0;i<len;i++){
        temp.push(
            <Image
            key = {i}
            source={this.images.number[numberarry[i]]}
            style = {{
                width:55*this._scale,
                height:67*this._scale,
                marginTop:214*this._scale,
                resizeMode:'contain',
                marginBottom:130*this._scale,
                marginLeft:1,
            }}
            >
            </Image>
        )
    }
    return temp
      

  }

  render() {
    var stylemain = {
        width:this._width*this._scale,
        height:this._height*this._scale,
    }
    return (
        <View 
        style = {stylemain}>
        <ImageBackground
            source={require('./rq-03.png')}
            style = {{
                width:this._width*this._scale,
                height:this._height*this._scale,
            }}
        >
            <View style = {{ justifyContent: 'center',
            alignItems: 'center',
            }}>
                <View style ={{flexDirection:'row',}}>
                    {this.showYearNumber()}
                </View>
            </View>
        </ImageBackground>

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
