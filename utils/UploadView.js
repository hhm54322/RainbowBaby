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

import NetWork from './NetWork'
import DataUtil from './DataUtil'
import RootSibling from 'react-native-root-siblings';


let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}


//图片上传模块
export default class UploadView extends Component {

    //调用显示方法
    static showUploadView(source,back){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <UploadView
                    source={source}
                    back = {back}
                    destroy={() => destroy()}
                />);
        }
        return rootSibling;
    }

    constructor(props) {
      super(props);
      this.source  = this.props.source
      this.state = {
          valuePercent:0.0
      }
    }
    componentDidMount(){
        this.doajax(this.source)
    }


    //图片上传实现
    doajax = (source)=>{
        var a = source.path
        var arr = a.split('\/');
        var name = arr[arr.length-1]   //获取文件的名字
        var request = new XMLHttpRequest();
        
        request.upload.addEventListener('progress',(event)=>{
            //上传进度的回调
            if (event.lengthComputable) {
                var value = (event.loaded / event.total * 100 | 0);
                this.setState({
                    valuePercent:value
                })
              }
        })
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
                if(this.props.back){
                    this.props.back(JSON.parse(request.responseText))
                }
            } else {
                console.log(request)
                console.log(e)
            }
        };
        var formData = new FormData()
        let file = {uri: source.path, type:'application/octet-stream', name: name};
        formData.append('file',file)    
        console.log(file)
        var url = NetWork.rootUrl + '/maria/services/image_uploading?access_token='+DataUtil.getinstance().getUserData().access_token
        console.log(url)
        request.open('POST', url,true);
        request.setRequestHeader('Content-Type',"multipart/form-data");
        request.setRequestHeader('Accept',"application/json");
        request.send(formData);
    }

    //关闭
    onClose = ()=>{
        this.props.destroy()
    }

    render (){
        var w = this.state.valuePercent / 100 *150
        if(this.state.valuePercent === 100){
            setTimeout(() => {
                this.onClose()
            }, 10);
        }
        return (
            <Modal
            animationType='none'
            onRequestClose  = {
                ()=>{

                }
            }
        > 
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Image style = {{width:150,height:150,borderRadius:75}}
                        source = {{uri: this.source.path}} 
                    >
                    </Image>
                    <View style = {{position:'absolute',width:w,height:150,borderRadius:75,
                        backgroundColor:'rgba(51,51,51,0.2)',right:0
                    }}>
                    </View>
                </View>
            </View>
        </Modal>
        )
    }
}