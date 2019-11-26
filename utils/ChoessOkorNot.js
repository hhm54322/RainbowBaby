/**
 * Sample React Native ChoessOkorNot
 * 
 * 
 * <ChoessOkorNot
    str = '此为提示的语句'
    ref = {ref =>{this.xxx = ref}}
    callBack = {this.xxxxx} //回调函数   //当点击为确定的时候回调此函数 参数为bool
    ></ChoessOkorNot>

    this.xxx.show()  //调用显示弹窗
 * 
 * 
 * 
 * @xjs
 */

import React, { 
    Component,
    Platform, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';



/**
 * 一个用于用户选择的弹窗，，    确认  or  取消
 * @xjs
 */
export default class ChoessOkorNot extends Component {

  constructor(props) {
    super(props);
    this.callBack = this.props.callBack  //传入callback函数用于回调
    this.state ={
        isModalVisible:false    //是否显示此弹窗
    }
  }
  componentDidMount(){
  }

  //销毁弹窗  不然安卓有内存泄漏
  onRequestClose(){
    Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
  }

  show=()=>{
    this.setState({
        isModalVisible:true
    })
  }

  //点击按钮确认之后回调
  _isOk = ()=>{
      this._isclear()
      if(this.callBack){
          this.callBack(true)
      }
  }

  //取消显示
  _isclear = ()=>{
    this.setState({
        isModalVisible:false
    })
  }

  render() {

    return (
      <Modal
        onRequestClose={() => {this.onRequestClose()}}
        transparent = {true}
        visible={this.state.isModalVisible}
        >
        <View style = {styles.container}>
            <View style = {styles.mainView}>
                <View style = {styles.textView}>
                    <Text>{this.props.str}</Text>
                </View>
                <View style = {styles.line} ></View>
                <View style={styles.bottomView}>
                    <TouchableWithoutFeedback
                        onPress = {
                            ()=>{
                                this._isclear()
                            }
                        }
                    >
                    <View style = {styles.leftView}>
                        <Text>取消</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style = {styles.centerlin}></View>
                    <TouchableWithoutFeedback
                        onPress = {()=>{
                            this._isOk()
                        }}
                    >
                        <View style = {styles.rightView}>
                            <Text style={{color:'red'}}>确定</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(211,211,211,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView:{
    width:(Dimensions.get('window').width*0.75),
    height:(Dimensions.get('window').height*0.25),
    borderRadius: 20,
    backgroundColor:'rgba(255,255,255,1)',
    alignItems: 'center',
  },
  textView:{
    justifyContent: 'center',
    alignItems: 'center',
    width:(Dimensions.get('window').width*0.5),
    height:(Dimensions.get('window').height*0.17),
  },
  line:{
    width:(Dimensions.get('window').width*0.75),
    borderBottomWidth:1,
    borderColor:'rgba(245,245,245,1)',
  },
  bottomView:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:(Dimensions.get('window').width*0.75),
    height:(Dimensions.get('window').height*0.079),
  },
  leftView:{
    justifyContent: 'center',
    alignItems: 'center',
    width:(Dimensions.get('window').width*0.75/2-1),
  },
  centerlin:{    
    height:(Dimensions.get('window').height*0.079),
    borderLeftWidth:1,
    borderColor:'rgba(245,245,245,1)',
},
  rightView:{
    justifyContent: 'center',
    alignItems: 'center',
    width:(Dimensions.get('window').width*0.75/2-1),
  },
});
