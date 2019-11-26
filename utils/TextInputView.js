/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component ,
  Platform,} from 'react';
import {
  
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import SceneUtils from './SceneUtils';
import Head from '../view/handAccount/selectHandbottomList/Head'


//手账文字输入模块 
export default class TextInputView extends Component {

  constructor(props) {
    super(props);
    var mode = this.props.navigation.state.params
    this.callBack = mode.info.callBack   //点击确认后的回调函数
    this.disBack = mode.info.disBack    //点击取消后的回调函数
    this.state = {
        _text:mode.info.str,
    }
  }
  componentDidMount(){

  }

  //文字改变后的实时刷新  做动态增长
  _onChange = (event)=>{
    this.setState({
      _text: event.nativeEvent.text
  });
  }

  //动态获取文字的高度
  _onContentSizeChange(event) {
      this.setState({
        _height: event.nativeEvent.contentSize.height,
      });
  }

  //取消
  _isclear = ()=>{
    if(this.disBack){
      this.disBack();
    }
    var d = this.props.navigation;
    d.pop();
  }

  //确认
  _isok = ()=>{
      if(this.callBack)
      {
        this.callBack(this.state._text)
      }
      var d = this.props.navigation;
      d.pop();
  }
  
  close = ()=>{
  }


  //显示头部
  showHeadView = ()=>{
    return (
      <Head 
        rightstr = '确定'
        headstr = '文本'
        touchBack = {this._isclear}
        touchok = {this._isok}
      ></Head>

  //   <View  style = {styles.viewHead}>
  //     {/* head */}
  //     <TouchableWithoutFeedback 
  //       onPress = {this._isclear}
  //     >
  //     <View style = {{width:65,height:Dimensions.get('window').height*0.1-10,
  //     marginTop:27,marginLeft:7,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     }}>
  //         <Image
  //             tyle= {styles.viewImageRight}
  //             //source={require('./img/close.png')} 
  //         ></Image>
  //     </View>
  //     </TouchableWithoutFeedback>

  //     <TouchableWithoutFeedback 
  //       onPress = {this._isok}
  //     >
  //     <View style = {{
  //     justifyContent: 'center',
  //     alignItems: 'center',width:65,height:Dimensions.get('window').height*0.1-10,
  //     marginTop:27,marginRight:11
  //     }}>
  //         <Text style = {{fontSize:18}}>
  //         确定
  //         </Text>
  //     </View>
  //     </TouchableWithoutFeedback>
  // </View>)
    )
  }

  render() {
    var str = this.state._text  ===''? '请输入文字':''
    return (
      <View style={styles.container}>
        
        {this.showHeadView()}
        <View style ={
            {
                width:(Dimensions.get('window').width),
                height:(Dimensions.get('window').height*0.8),
                //justifyContent: 'center',
                alignItems: 'center',
            }
        }>

            

            <View style = {{
              width:SceneUtils.size.width*0.95,
              height:SceneUtils.size.height*0.8,
              marginTop:10,
              backgroundColor:'rgb(130,130,130)',
              borderRadius:7,
              alignItems:'center',
            }}>
              <Text style={{
                  position: 'absolute',
                  fontSize:15,
                  color:'white',
                  fontWeight:'700',
                  transform: [{translateY:2}],
                  left:5,
                  top:3,
              }}>
                  {str}
              </Text>
              <TextInput
              underlineColorAndroid='transparent'
              style = {{
                  width:SceneUtils.size.width*0.95-10,
                  height: Math.max(20, this.state._height)+10,
                  fontSize:15,
                  color:'white'
              }}
              value={this.state._text}
              onChange={this._onChange}
              multiline={true}
              returnKeyType = 'done'
              blurOnSubmit = {true}
              onContentSizeChange={this._onContentSizeChange.bind(this)}
              >
              </TextInput>
            </View>
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:'rgb(51,51,51)'
  },
  viewHead:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width :(Dimensions.get('window').width),
    height:(Dimensions.get('window').height*0.1),
  },
  viewImageLeft:{
    width:(Dimensions.get('window').height*0.08),
    height:(Dimensions.get('window').height*0.08),
    resizeMode:'contain',
  },
  viewImageRight:{
    width:30,
    height:30
  },
  

});
