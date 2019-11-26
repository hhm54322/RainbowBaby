import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  Platform,
  TextInput,
  Button,
  TouchableWithoutFeedback

} from 'react-native';
import DltextInput from './DltextInput';
import DLImg from './DLImg';
//废弃
export default class HandsView extends Component {
  constructor(props) {
    super(props);
    this._inputMap = new Map();
    this._inputindex = 0
    this._mainview
    this._inputItem= new Map();
    this._fontName=''
    this.state = {
      _number:0,
      
    };
  }

  _onChangeText = (newText) => {

  }

  _onTouchEnded = ()=>{

      this._inputMap.set(this._inputindex,'BigruixianBlackGBV1.0')
      this._inputindex+=1
      this.setState(
        {
          _number:this.state._number+1
        }
      )
  }

  _onTouchEnded2 = (index)=>{
    var inde = index

    ontouchend = ()=>{
      var cc = inde==1? 'BigruixianBlackGBV1.0':'BigruixianBlackGBV1.0'
      // for(var i=0;i<this._inputItem.length; i++){
      //   console.log(this._inputItem[i].props)
      //   //indexd =  this._inputItem[i].props.refrenshowFont(cc)
      //   //this._inputMap.set(indexd,cc);
      // }
      this._inputItem.forEach((element, index, array) => {
            var indexd = element.refrenshowFont(cc)
            this._inputMap.set(indexd,cc);
      })
      
    }
    return ontouchend
  }

  refrenshowEnd = (index,fontname) =>{
  } 

  deleteInpute = (index)=>{
    this._inputMap.delete(index)
    this._inputItem.delete(index)
  }


  addindex = ()=>{
    var inputItem = []
    this._inputMap.forEach((element, index, array) => {
      // element: 指向当前元素的值
      // index: 指向当前索引
      // array: 指向Array对象本身

      inputItem.push(
        <DltextInput 
        ref={ ref => this._inputItem.set(index,ref)}
        key={index} 
        index = {index}
        refrenshowEnded = {this.refrenshowEnd}
        deleteBack = {this.deleteInpute}
        fontName = {element}
        height = {20}
        width = {130}
        style={styles.textInputStyle}
        keyboardType={'default'}
        underlineColorAndroid='transparent'
        onChangeText={this._onChangeText.bind(this)} />
      );
    });
    return inputItem;
  }

  render() {
    return (
      <View 
      ref={ ref => this._mainview = ref}
      style={[styles.container]}>
        <View style ={styles.buttons}
        onTouchEnd = {this._onTouchEnded}
        >
        </View>

        <View style ={styles.buttons2}
        onTouchEnd = {this._onTouchEnded2(1)}
        >
        </View>

        <View style ={styles.buttons2}
        onTouchEnd = {this._onTouchEnded2(2)}
        >
        </View>

        <DLImg
        style = {[{zIndex:0}]}
        imgsrc = {"add.jpg"}
        width = {200}
        height = {200}
        >
        </DLImg>

        {this.addindex()}
        
      </View>
    );
  }
}

const IsIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  buttons:{
    width:30,
    height:30,
    backgroundColor:'blue',
    zIndex:200,

  },

  buttons2:{
    width:30,
    height:30,
    margin:30,
    backgroundColor:'green',
    zIndex:200,

  },
  container:{
    position: 'relative',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
 },
 textInputStyle:{
   fontSize:15,
   //backgroundColor: 'rgba(135, 65, 0, 0.5)',
   
   borderColor: '#CCC',
   borderRadius: 4,
   borderWidth: 1,
   zIndex:100,
 },
});
