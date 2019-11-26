'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Alert,
  ImageBackground,
  
  
} from 'react-native';

import ImagePicker from './ImagePicker'
import NetWork from './NetWork'
import DataUtil from './DataUtil'
import UploadView from './UploadView'


//head  头像内嵌修改头像相关的相册 相机相关等   
export default class ImagePickView extends Component {
    constructor(props) {
      super(props);
      this.source = null
      this.state = {
          url:this.props.source         //显示头像的地址
      }
    }


    //上传头像
    doajax = (source)=>{
        this.source = source
        UploadView.showUploadView(source,this.getimageUri)
    }

    //获取上传头像后的图像的地址
    getimageUri = (uriStruct)=>{
        this.source = uriStruct
    }

    //拿到图像名字
    getImageName = ()=>{
        if(this.source){
            return this.source.tmpFileName
        }else{
            return ''
        }
        
    }


    //打开相机等后续操作
    openCamera = ()=>{
        ImagePicker.openCamera((source)=>{
            console.log(source)
            this.setState({
                url:{uri:(source.path)}
            })
            this.doajax(source)
        })
    }

    //打开piker
    openPicker = ()=>{
        ImagePicker.openPicker((source)=>{
            console.log(source)
            this.setState({
                url:{uri:(source.path)}
            })
            this.doajax(source)
        })
    }


    //选择相机或者选择相册 ///////  相机没法到模拟器中调起
    toShowPhotoAndPhotos = ()=>{

        Alert.alert('选择图片', '', [
            {text: '相机里面选择', onPress: () => { this.openCamera() }, style: 'cancel'},
            //{text: '·知道了', onPress: () => console.log('OK Pressed')},
            {text: '相册里面选择', onPress: () => { this.openPicker()  }},
            {text: '取消', onPress: () => {  } ,style: 'cancel'},
          ],{
            onDismiss: () => {
              }
          })
    }

    render (){
        return (
            <TouchableWithoutFeedback
                onPress = {this.toShowPhotoAndPhotos}
            >
                <View>
                    <ImageBackground 
                        borderRadius = {this.props.borderRadius}
                        style = {[this.props.style,{alignItems:'center',justifyContent:'center'}]}
                        source = {this.state.url}
                    >
                        <Image style = {{width:40,height:40}}
                            source = {require('../view/baby/img/ppp.png')}
                        >
                        </Image>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}