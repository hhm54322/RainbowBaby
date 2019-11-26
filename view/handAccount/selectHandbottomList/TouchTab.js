/**
 * React Native TouchTab
 * Create Data 2018 5 10
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
  Modal,
  ListView,
} from 'react-native';

const displayFlex  = 'flex'
const displayNone  = 'none'

import SelectButton from './SelectButton'
import {ColorMod} from './Colors'

import RootSibling from 'react-native-root-siblings';

let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

export default class TouchTab extends Component {
    static showTouchTab(touchBack){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <TouchTab
                    touchBack = {touchBack}
                    destroy={() => destroy()}
                />);
        }
        var root = {root:rootSibling,close:destroy}
        return root;
    }

  constructor(props) {
    super(props);
    this._touchb = this.props.touchBack
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.shuju = []
    this.mode = []
    this.colors = ColorMod.color
    for(var i = 0; i < 11; i++){
        this.shuju.push({url:i,name:i,id:i,se: i===2,d:i<=3,fontName : i%2===0? 'FENGGWY':'YANGGZA'})
    }
    this.lirthisArr()
    this.state = {
        index:-1,
        dataSource: this.listData.cloneWithRows(this.mode),
        show:true
    }
  }

  componentDidMount() {

  }
  
  show = ()=>{
  }

  close = ()=>{
    this.props.destroy()
  }

  lirthisArr = ()=>{
        this.mode = []
        var alllenth = this.shuju.length
        var len = this.shuju.length/2;
        var all = 0
            for(var i=0; all<alllenth&&i<len;i++){
                var arr = []
            for(var j = 0;j<2;j++){
                if(all >= alllenth){
                    all++;
                }else{
                    arr.push(this.shuju[all])
                    all++
                }
            }
            if(arr.length>=1){
                this.mode.push(arr)
            }
        }
    }


    backColor = (color)=>{
        var tcolor = color
        var back = ()=>{
            if(this._touchb){
                this._touchb(0,tcolor)
            }
        }
        return back
    }
  colorOne =()=>{
      var tem = []
      var len = this.colors.length
      console.log(len)
      for(var i=0;i<len;i++){
        tem.push(
            <TouchableWithoutFeedback
            key = {i}
            onPress = {this.backColor(this.colors[i])}
            >
            <View 
            
            style = {[styles.colorCirl,{backgroundColor:this.colors[i]}]}></View></TouchableWithoutFeedback>
        )
      }
      return tem
  }
  colorView = ()=>{
      return (
        <View style = {[styles.bottomView,styles.colorView]}>
            {this.colorOne()}
        </View>
      )
  }

  _touchOne =(name)=>{
    var iid = name
    var back = ()=>{
        if(this._touchb){
            this._touchb(1,name)
        }
    }
    return back
}

showImgIsSelect = (se)=>{
    if(se === true){
        return (
            <Image 
                style = {styles.imgView}
                source={require('./blg.png')} 
            ></Image>
        )
    }
  }

  showItemOnew = (rowData)=>{
    var l = rowData.length
    var lin = []
    for(var i=0;i<l;i++){
        lin.push(
            <TouchableWithoutFeedback
                key = {i}
                onPress = {this._touchOne(rowData[i].fontName)}
            >
                <View 
                style = {styles.itemView}
                >
                    <Text style = {{fontFamily:rowData[i].fontName}}>
                      {rowData[i].fontName}
                    </Text>
                    {this.showImgIsSelect(rowData[i].se)}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return lin
}

  showOneLine =(rowData)=>{
    return (
        <View style = {styles.itemLine}>
            {this.showItemOnew(rowData)}
        </View>
    )
  }

  fontView =()=>{
    return (
        <View style = {[styles.bottomView,styles.colorView]}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.showOneLine}
            />
        </View>
      )
  }

  showView =()=>{
    if(this.state.index<0){
        return
    }
    if(this.state.index !== 1){
        return this.colorView()
    }else if(this.state.index !== 0){
        return this.fontView()
    }
  }
  touchback = (ind)=>{
    if(ind !== 'ok' && (ind ===1 || ind ===0)){
        this.setState({
            index:ind
        })
    }
    if(ind === 'ok'){
        this.close()
        if(this._touchb){
            this._touchb(-1,'ok')
        }
    }
    if(ind === 2 || ind === 3){
        this._touchb(ind,'--')
    }
  }

  render() {
    var showStr = this.state.show ? displayFlex:displayNone
    return(
        <View style = {[styles.mainView,{display:showStr}]}>
            <SelectButton
            back = {this.touchback}
            ></SelectButton>
            <View>
                {this.showView()}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    mainView:{
        position: 'absolute',
        bottom:0,
    },
    bottomView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.4,
        backgroundColor:'rgb(51,51,51)'
    },
    colorView:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    colorCirl:{
        width:Dimensions.get('window').width*0.09,
        height:Dimensions.get('window').width*0.09,
        borderRadius:Dimensions.get('window').width*0.05,
        marginLeft:Dimensions.get('window').width*0.37/14,
        marginRight:Dimensions.get('window').width*0.37/14,
        marginTop:Dimensions.get('window').width*0.37/7.5,
    },
    itemLine :{
        flexDirection:'row',
    },
    itemView:{
        width:Dimensions.get('window').width*0.4,
        height:Dimensions.get('window').height*0.08,
        borderWidth:1,
        marginLeft:Dimensions.get('window').width*0.2/3,
        marginTop:Dimensions.get('window').height*0.035,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        backgroundColor:'rgb(170,170,170)'
    },
    imgView:{
        position: 'absolute',
        width:20,
        height:20,
        resizeMode:'contain',
        right:0,
        bottom:0,
    }
 
});
