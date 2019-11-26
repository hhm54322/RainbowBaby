/**
 * Sample React Native ImageFi
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
  Dimensions,
  ListView,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'
import Swiper from 'react-native-swiper';


//判断横竖显示图片  ，    只能通过宽高来模糊判断     没法通过内容智能判断
export default class ImageFi extends Component {
  constructor(props) {
    super(props);
    this.imguri = this.props.imguri
    this.state = {
        type:-1
    }

  }
  componentWillMount(){

  }
  componentDidMount(){
      //return
    Image.getSize(this.imguri,(w,h)=>{
        var type = 0
        if(w>h){
            type = 1
        }
        this.setState({
            type:type
        })
      },(err)=>{
        console.log(err)
      })
  }
  showImage = ()=>{
    var typed = {}
    if(this.state.type === 0){   // |
        typed  = {
            width:SceneUtils.size.width*0.94 *0.536666,
            height:SceneUtils.size.width*0.94 *0.536666*750/422,
            borderRadius:7,
        }
    }else{
        typed  = {
            height:SceneUtils.size.width*0.94*422/750,
            width:SceneUtils.size.width*0.94,
            borderRadius:7,
            
        }
    }
    var tran = require('../discover/img/2.png')
    
    
    if(this.state.type === 0){
        tran = require('../discover/img/3d.png')
    }
    console.log(typed)
    return (
        <ImageBackground style = {[typed]}
        source={tran}
    >
        <Image style = {typed}
            source={{uri:this.props.imguri}}
            >
        </Image>
    </ImageBackground>)
  }

  render() {
    //"react-native-swiper": "^1.5.13",
    return (
        <View style = {{marginLeft:SceneUtils.size.width*0.03,marginRight:SceneUtils.size.width*0.03,alignItems:'center',justifyContent:'center'}}>
            {this.showImage()}
        </View>
    );
  }
}

const styles = StyleSheet.create({

    topViewImage:{
        height:SceneUtils.size.width*0.94*422/750,
        width:SceneUtils.size.width*0.94,
        borderRadius:7,
    }


});
