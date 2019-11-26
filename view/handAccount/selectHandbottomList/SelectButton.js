/**
 * React Native SelectButton
 * Create Data 2018 5 8
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
} from 'react-native';
import SceneUtils from '../../../utils/SceneUtils';


//按钮选择界面   编辑文字   菜单选项按钮
export default class SelectButton extends Component {
  constructor(props) {
    super(props);
    this.touchback = this.props.back
    this.state = {
        index:-1,
    }

  }

  componentDidMount() {

  }

  //点击设置回调
  isOk = ()=>{
    if(this.touchback){
        this.touchback('ok')
    }
  }

  //点击按钮后的回调
  _onPress = (i)=>{
    var ind =i
    var backd = ()=>{
        if(this.touchback){
            this.touchback(ind)
            this.setState({
                index:ind
            })
        }
    }
    return backd
  }

  //左到右依次渲染4个图标按钮
  render() {

    var t = {tintColor:'rgb(127,186,0)'}
    var d = {tintColor:'white'}

    return(
      <View style = {[styles.mainView]}>
            <View style = {styles.centerView}>
                <TouchableWithoutFeedback
                    onPress = {this._onPress(0)}
                >
                    <Image 
                    style = {[styles.ImgView1,this.state.index === 0?t:d]}
                    source={require('../img/1d.png')} 
                    ></Image>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback
                onPress = {this._onPress(1)}
                >
                    <Image
                    style = {[styles.ImgView,this.state.index === 1?t:d]}
                    source={require('../img/2d.png')} 
                    ></Image>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                onPress = {this._onPress(2)}
                >
                    <Image
                    style = {[styles.ImgView,this.state.index === 2?t:d]}
                    source={require('../img/3d.png')} 
                    ></Image>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                onPress = {this._onPress(3)}
                >
                    <Image
                    style = {[styles.ImgView,this.state.index === 3?t:d]}
                    source={require('../img/4d.png')} 
                    ></Image>
                </TouchableWithoutFeedback>

                <Text 
                style= {styles.textView}
                onPress = {this.isOk}
                >确定</Text>
            </View>
            <View style = {[styles.line,{transform:[{translateY:-0.5}]}]}></View>
            {/* <View style = {[styles.line,{transform:[{translateY:0.5}]}]}></View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        backgroundColor:'rgb(51,51,51)',
        paddingBottom:1,
        height:97/1330*SceneUtils.size.height,
        alignItems:'center',
        justifyContent: 'center',  
    },
    line:{
        width :Dimensions.get('window').width,
        borderBottomWidth:1,
        borderColor:'#C7C7C7',
    },
    centerView:{
        flexDirection:'row',
        height:Dimensions.get('window').height*0.06,
        //justifyContent: 'center',  
        alignItems:'center', 
    },
    ImgView:{
        width:Dimensions.get('window').height*0.048-4,
        height:Dimensions.get('window').height*0.048-4,
        resizeMode:'contain',
        margin:10,
    },
    ImgView1:{
        width:Dimensions.get('window').height*0.048-4,
        height:Dimensions.get('window').height*0.048-4,
        resizeMode:'contain',
        marginLeft:30,
        marginRight:10,
    },
    textView:{
        color:'white',
        fontWeight:'900',
        marginLeft:Dimensions.get('window').width*0.3,
    },
    
   
});
