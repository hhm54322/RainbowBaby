/**
 * Sample React Native Date2 temp
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
  
} from 'react-native';
import {Images} from './Images'
import resolveAssetSource from 'resolveAssetSource';

//纯显示页面  第2个日期
export default class Date2 extends Component {
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

  showMonAndDay = ()=>{
      var temp = []
      var daystr = this.day.toString()
      var numberarry = []
      numberarry.push(this.mon)
      numberarry.push(10)
      var dayarr = daystr.slice('')
      var lend = dayarr.length
      for(var i = 0;i<lend;i++){
        numberarry.push(dayarr[i])
      }

        var len = numberarry.length
        for(var i = 0;i<len;i++){
        temp.push(
            <Image
            key = {i}
            source={this.images.number[numberarry[i]]}
            style = {{
                width:82*this._scale,
                height:101*this._scale,
                resizeMode:'contain',
                margin:2,
            }}
            >
            </Image>
        )
    }
    return temp
  }


  showYearNumber = ()=>{
      //  64     75
      var yearstring = this.year.toString()
      var temp = []
      var numberarry = yearstring.slice('')
      
    for(var i = 0;i<4;i++){
        temp.push(
            <Image
            key = {i}
            source={this.images.number[numberarry[i]]}
            style = {{
                width:44*this._scale,
                height:51*this._scale,
                marginTop:235*this._scale,
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
            source={require('./rq-02.png')}
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

                <View style ={{flexDirection:'row',}}>
                    {this.showMonAndDay()}
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
