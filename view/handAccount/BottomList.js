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
  ScrollView,
  
} from 'react-native';

import RootSibling from 'react-native-root-siblings';
import SceneUtils from '../../utils/SceneUtils';

import PMap from './PMap'


let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}
//皮肤选择列表
export default class BottomList extends Component {


    //静态函数显示选择皮肤列表
    static showBottomList(selectFun,sureFun,index){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <BottomList 
                selectfun = {selectFun}
                surefun = {sureFun}
                index = {index}
                />);
        }
        return rootSibling;
    }

    constructor(props) {
      super(props);
      this.imageMap = PMap      //皮肤图片
      this.state = {
          currentindex:this.props.index         //选择的下标
      }
    }
    componentDidMount(){
    }


    //关闭 返回选中的下标
    onClose = (i)=>{
        if(this.props.surefun){
            this.props.surefun(i)
        }
        destroy()
    }


    //选择后 调用选择的回调函数
    select = (i)=>{
        this.state.currentindex = i;
        if(this.props.selectfun){
            this.props.selectfun(i)
        }
    }

    //显示顶部的下箭头样式
    showTopView = ()=>{
        return(<View style = {styles.topView}>
            <TouchableWithoutFeedback
                onPress = {()=>{
                    this.onClose(this.state.currentindex);
                }}
            >
                <Image style = {{
                    width:SceneUtils.size.width*0.07,
                    height:SceneUtils.size.width*0.07,
                    marginRight:10,
                }} source = {require("./img/62down.png")}></Image>
            </TouchableWithoutFeedback>
        </View>)
    }

    showItmeOne = (index,image)=>{
        return (
            <TouchableWithoutFeedback key = {index} 
                onPress = {this.select.bind(this,index)}
            >
                <ImageBackground  
                    key = {index}
                    source = {image[1]}
                    style = {{
                        width:150/750*SceneUtils.size.width,
                        height:235/150*(150/750*SceneUtils.size.width),
                        marginLeft:30/750*SceneUtils.size.width,
                        marginRight:30/750*SceneUtils.size.width,
                    }}
                >
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }

    //显示每一个itme
    showItems = ()=>{
        console.log(this.imageMap)
        var temp = [];
        var index = 0
        for (var x of this.imageMap) { // 遍历Map
            temp.push(this.showItmeOne(index,x));
            index++;
        }
        return temp
    }

    render (){
        
        return (
            <Modal
            animationType='none'
            visible={true}
            transparent = {true}
            onRequestClose  = {
                ()=>{
                    Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
                }
            }
        > 
            <TouchableWithoutFeedback onPress = {()=>{
                    this.onClose(-1);
                }}>
                <View style ={{flex:1}}>
                </View>
            </TouchableWithoutFeedback>

            <View style = {styles.mainView}>
                            {this.showTopView()}
                            <View style = {styles.scrollViewView}>
                            <ScrollView 
                                style = {styles.scrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.showItems()}
                            </ScrollView>
                    </View>
            </View>
            
        </Modal>
        )
    }
}


var styles = StyleSheet.create({
    mainView:{
        position:'absolute',
        bottom:0,
        backgroundColor:'rgb(51,51,51)'
    },
    topView:{
        flexDirection:'row',
        width:SceneUtils.size.width,
        justifyContent:'flex-end',
        borderColor:"rgb(100,100,100)",
        borderBottomWidth:1,
        padding:4,
    },
    scrollViewView:{
        marginTop:10,
        marginBottom:10,
        width:SceneUtils.size.width,

    }
});