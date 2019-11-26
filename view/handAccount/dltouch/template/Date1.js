/**
 * Sample React Native Date1 temp
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


//纯显示页面  第一个日期
export default class Date1 extends Component {
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
        show:true
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
                width:64*this._scale,
                height:75*this._scale,
                marginTop:150*this._scale,
                resizeMode:'contain',
                marginBottom:80*this._scale,
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
            source={require('./rq-01.png')}
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

                <View>
                <Image
                    source={this.images.month[this.mon]}
                    style = {{
                    width:this.monthWidth*this._scale,
                    height:this.monthHight*this._scale,
                    resizeMode:'contain',
            }}
            >
            </Image>
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
