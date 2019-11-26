/**
 * React Native App
 * Create Data 2018 4 8
 * @ by XJS
 */

import React, { Component } from 'react';
import {StorageHelper} from '../../../utils/modStruct'
import {
  captureRef,
  captureScreen,
} from "react-native-view-shot";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  PanResponder,
  Image,
  ImageBackground,
} from 'react-native';

import CText from './../dltouch/CText'
import CImage from './../dltouch/CImage'
import One from './../dltouch/template/One'

// import TouchComponentImg from '../dltouch/TouchComponentImg'
// import TouchComponentMod from '../dltouch/TouchComponentMod'
// import TouchComponentText from '../dltouch/TouchComponentText'

import {BG} from '../Images'

import SelectListView from '../selectHandbottomList/SelectListView'
import SelectButton from '../selectHandbottomList/SelectButton'

import {ArryTop} from '../../../utils/ArryTop'
import SelectDate from '../selectHandbottomList/SelectDate'

import TouchTab from '../selectHandbottomList/TouchTab'
import Head from '../selectHandbottomList/Head'

//import TextInputView from '../../../utils/TextInputView'
import {EditerHelper} from './EditerHelper'
import SelectTop from '../selectHandbottomList/SelectTop'

import ChoessOkorNot from '../../../utils/ChoessOkorNot'
import Date1 from '../dltouch/template/Date4'

// import {Images} from '../index'
import SceneUtils from '../../../utils/SceneUtils';

const displayFlex  = 'flex'
const displayNone  = 'none'


//手账编辑模块
export default class HandsCcountEdite extends Component {
  constructor(props) {
    super(props);
    this.childId   //孩子id
    this.toBack     //返回函数
    this.newdata    //date  时间对象用来区分取消还是滑动
    this._tabseView    //文字选中编辑后的弹窗
    this._headTop     //顶部head
    this._choessOk  //点击确定
    this.indexKey = -1  //选中的id
    this.comHelper = new EditerHelper() //渲染帮助类
    this.indexNumber = 0  //下标
    this.editerRefMap = new Map()   //编辑区渲染的内容
    this.isEditerText = -1      //选中的文字下标
    this.bgType = 1         //背景的类型 现在只有本地图 以后再支持网络图
    this.arrtop = new ArryTop()     //控制层级关系对象
    this.nowDate = 0          //时间
    this.arrtop.setSerchBack(
      (mod,key)=>{
          return mod.key === key
      }
    )
    this.state={
      refshow:true,
      reqImg:'1',
    }
    //对象的属性
    this.mode = {
      top:100,
      left:100,
      angle:0,
      type:0,
      uri:'',
      fontSize:16,
      fontColor:'rgb(0,0,0)',
      fontStr:'',
      fontName:'Georgia',
      comName:'',
      key:0,
      width:200,
      height:0,
      imageType:1,
      datec:'',
      dateMod:'',
      scale:1,
    }

  }


  //获取对象属性进行初始化
  setFirsMod = ()=>{
    var mod = this.props.navigation.state.params.info.mod
    this.toBack = this.props.navigation.state.params.info.back
    this.nowDate = this.props.navigation.state.params.info.date
    this.childId = this.props.navigation.state.params.info.childId


    this.state.reqImg = this.props.navigation.state.params.info.image
    this.state.reqImg = this.state.reqImg === ''?null : this.state.reqImg
    this.state.reqImg = this.state.reqImg === undefined || this.state.reqImg === null? '1':this.state.reqImg
    if(mod === null)
    return
    var len = mod.edites.length
    for(var i = 0;i<len;i++){
      var m = mod.edites[i]
      m.key = this.indexNumber
      m.bools = false
      this.arrtop.pushBack(m)
      this.indexNumber++;
    }
  }

  //设置触摸事件
  componentWillMount(){
    this.setFirsMod()
    this._panResponder=PanResponder.create({  
      onStartShouldSetPanResponder: (evt, gestureState) => true,  
      onMoveShouldSetPanResponder:(evt, gestureState) => false,  
      onPanResponderGrant:this._onPanResponderGrant,  
      onPanResponderMove:this._onPanResponderMove,  
      onPanResponderRelease:this._onPanResponderEnd,  
    }); 
  }

  componentDidMount(){
    
  }


  //触摸事件的显示方法类
  _onPanResponderGrant = (evt, gestureState)=>{
    
    this.newdata = new Date().valueOf()
  }
  _onPanResponderMove = (evt, gestureState)=>{
  }
  _onPanResponderEnd = (evt, gestureState)=>{
    var cc = new Date().valueOf()
    if(cc - this.newdata<=100 )
    {
      this.comTouchBack(-1,-1)
    }
  }

  isObjectValueEqual(a, b) {

    var eq1 = JSON.stringify(a) === JSON.stringify(b)
    return eq1;
}


//返回到上一个界面去
  goBacktoParent = () =>{
    this.props.navigation.goBack();
    if(this.toBack)
    {
      this.toBack()
    }
  }

  //存储到本地 这个东西目前用不到 
  _headTouchBack = ()=>{
    //backd
    StorageHelper.get('handsmod',(mod)=>{
      var sc = this.getModByEditor()
      if(this.isObjectValueEqual(sc ,mod)){
        this.goBacktoParent()
      }else{
        this._choessOk.show()
      }
    })
    
  }


  //拿到所有的编辑栏里面的信息
  getModByEditor = ()=>{
    var serMode = {}
    var te = []
    this.editerRefMap.forEach((element, index, array) => {
        var cc=element.ref.getMod()
        te.push(cc)
        //te.push(element.ref.getMod);
    })

    serMode.edites = te
    return serMode
  }

  //head touche ok back
  _headTouchOk=()=>{
      //ok
      var serMode = this.getModByEditor()
      //cmp(objA, objB)
      StorageHelper.save('handsmod',serMode)
      this.snapshot('editer')()

  }

  //截取屏幕生成图片
  snapshot = vname => () =>{

    // var adddd = captureScreen({
    //   format: "png",
    //   quality: 0.8,
    //   result: "tmpfile",
    //   snapshotContentContainer: false
    // })
    
    // console.log(adddd)
    // return;
    var widthd = (Dimensions.get('window').width);
    var heightd = Dimensions.get('window').height*0.8
    var ad = this.refs[vname]
    var ccs = captureRef(this.refs[vname], {
      format: "png",
      quality: 0.8,
      result: "base64",
      height:heightd,
      width:widthd,
      snapshotContentContainer:false,
    })
    ccs.then(
      uri => (
        //var imgbase64 = 'data:image/png;base64,' +uri,
       StorageHelper.save('imgbase64',  'data:image/png;base64,' +uri )
       //console.log ("ddddd   = = = =  ==     " + JSON.stringify({base64:'data:image/png;base64,' +uri}.base64)),
       //console.log ("data:image/png"+";base64," + uri)
      ),
      //console.log ("data:image/png"+";base64," + uri)
      //error => console.error("Oops, snapshot failed"+ error)
    )
    ccs.catch(
      error => (
        console.warn(error)
      ));
  }


  //根据底部tabbtn点击回调显示对应的界面
  _selectBack = (type)=>{
      //gaigai
      //this.comTouchBack(-1,-1)
      if(type == 0){
        const { navigate } = this.props.navigation;
        navigate('SelectBg',{ info:{back:this._bgselectBack,image:this.state.reqImg,childId:this.childId}})
      }
      else if(type == 1){
        //this._pfseView.show()
      }
      else if(type == 3){
        const { navigate } = this.props.navigation;
        navigate('SelectImage',{ info:{back:this._imgselectBack}})
      }
      else if(type == 4){
        const { navigate } = this.props.navigation;
        navigate('TextInputView',{ info:{callBack:this._textCall,disBack:this.disBack,str:""}})
        
      }else if(type == 5){
        SelectDate.showSelectDate(this._wffselectBack,this.nowDate)
      }
  }

  //背景选择回调
  _bgselectBack = (image) =>{
      this.setState({
        reqImg:image,//this.imageBacktoType(type,uri),
      })
  }
  _pfselectBack = (index)=>{

  }
//img选择回调
  _imgselectBack = (image)=>{
    console.log('_imgselectBack   ' +image)
      var tp = {
        type:3,
        comName:'TouchComponentImg',
        uri:image,//this.imageBacktoType(type,index),
        width:200,
        height:200,
        imageType:1,
      }
      this.copymode(tp)
  }

  //pf选择回调
  _wffselectBack = (index)=>{
    console.log(index)
    var tp = {
      type:3,
      comName:'TouchComponentMod',
      width:200,
      height:200,
      dateMod:index
    }
    this.copymode(tp)
  }

  imageBacktoType = (type,uri) => {
    if(type === 1 ){
        return uri
    }else{
      return {uri:uri}
    }
  }



  //文字菜单栏显示的东西做对应的操作
  _tabback = (type,mod) =>{
    if(mod === 'ok'){
      this.comTouchBack(-1,-1)
    }
    else if(type === 1){
      //fontName
      var text = this.editerRefMap.get(this.indexKey)
      if(text){
        text.ref._child.setFontName(mod)
      }
    }else if(type === 2){
      //-
      var text = this.editerRefMap.get(this.indexKey)
      if(text){
        text.ref._child.setFontSize(-0.5)
      }
    }
    else if(type === 3){
      //+
      var text = this.editerRefMap.get(this.indexKey)
      if(text){
        text.ref._child.setFontSize(0.5)
      }
    }else if(type === 0){
      var text = this.editerRefMap.get(this.indexKey)
      if(text){
        text.ref._child.setFontColor(mod)
      }
    }

  }
  
  copymode = (touchmode)=>{
    var mode = this.comHelper.deCopy(this.mode)
    mode.type = touchmode.type
    mode.comName = touchmode.comName
    //mode.fontColor = touchmode.fontColor
    mode.fontStr = touchmode.fontStr
    //mode.fontName = touchmode.fontName
    //mode.fontSize = touchmode.fontSize
    mode.imageType = touchmode.imageType
    mode.key = this.indexNumber
    mode.uri = touchmode.uri
    mode.width = touchmode.width
    mode.height = touchmode.height
    mode.bools = true
    mode.datec = this.nowDate
    mode.dateMod = touchmode.dateMod
    mode.scale = 0.2
    this.arrtop.pushBack(mode)
    this.indexNumber++

    this.indexKey = mode.key

    this.comTouchBack(mode.key,mode.type)
    this.setState({
      refshow:!this.state.refshow
    })

  }
  _textCall = (mod)=>{
    if(this.isEditerText>=0)
    {
      this.editerRefMap.get(this.isEditerText).ref._child.setThisString(mod)
      this.isEditerText = -1
      return 
    }

    var tp = {
      type:4,
      comName:'TouchComponentText',
      fontName:'',
      fontStr:mod,
      fontColor:'',
      fontSize:19,
      width:111,
    }
    this.copymode(tp)
  }
  
  comTouchBack = (keyd,typed) =>{
    //tohidOrShow
    if(this._tabseView){
      this._tabseView.close()
      this._tabseView = null
    }
    this.editerRefMap.forEach((element, index, array) => {
      element.ref.tohidOrShow(keyd)
    })

    this.indexKey = keyd

    if(keyd === -1){
      this._headTop.close()
      this.arrtop.backtemporary()
    }else{
      this._headTop.show()
      this.arrtop.toToptemporary(this.indexKey)
    }

    if(typed === 4){
      //this._tabseView.show()
      this._tabseView = TouchTab.showTouchTab(this._tabback)
    }

    this.setState({
      refshow:!this.state.refshow
    })
  }

  //选择文字
  comEditerBack = (key,type,childStr) =>{
      if(type === 4){
        this.isEditerText = key
        const { navigate } = this.props.navigation;
        navigate('TextInputView',{ info:{callBack:this._textCall,disBack:this.disBack,str:childStr}})
      }
  }
  //删除回调
  deleteBack = (key) =>{
      this.arrtop.deleteByFun(key)
      this.arrtop.clearIndex()
      this.editerRefMap.delete(key)
      this.setState({
        refshow:!this.state.refshow
      })
  }

  //重新显示编辑区内的元素
  showEdierView = ()=>{
    var temp = []
    var len = this.arrtop.getLenth()
    for(var i =0;i<len;i++){
      var adad = this.arrtop.get(i)
      var mode = {ref:{},deleteBack:this.deleteBack,selectBack:this.comTouchBack,comEditerBack:this.comEditerBack}
      temp.push(
        //this.editerRefMap
        this.comHelper.toSetMode(this.arrtop.get(i),mode)
      )
      this.editerRefMap.set(this.arrtop.get(i).key,mode)
    }
    return temp;
  }

  _headTopTouchBack =()=>{

  }

  //编辑状态中的  层级选择回调  左到右 依次是 0 1 2 3
  _headTopTouchOk = (i)=>{
    this.arrtop.clearIndex()
    if(i === 0){
        this.arrtop.toTopByFun(this.indexKey)
    }else if(i === 1){
      this.arrtop.addIndexOder(this.indexKey)
    }else if(i === 2){
      this.arrtop.disIndexOder(this.indexKey)
    }else if(i === 3){
      this.arrtop.todisByFun(this.indexKey)
    }
    this.setState({
      refshow : !this.state.refshow
    })
  }
  //取消
  disBack = ()=>{
    this.isEditerText = -1
  }
  
  render() {
    // return (
    //   <View>
    //     <View style = {{height:200}}>
    //     </View>

    //     <Date1
    //       date={this.nowDate}
    //       scale = {0.2}
    //     >
    //     </Date1>
    //   </View>
    // )
    //706  1029
    var width = SceneUtils.size.width
    var height = width/706*1033

    var size = {width:width,height:height}

    return(
      <View style = {styles.viewCenter}>
        <ImageBackground
          resizeMode = {'stretch'}
          style = {[styles.imgBgView,size]}
          source={BG.get(this.state.reqImg)} 
        >
          <View 
          {...this._panResponder.panHandlers}
          ref = 'editer'
          style = {[styles.editerView,size]}>
              {this.showEdierView()}
          </View>     
        
        </ImageBackground>
         

        <Head 
          rightstr = '保存'
          headstr = '美化手账'
          touchBack = {this._headTouchBack}
          touchok = {this._headTouchOk}
          style = {{position: 'absolute'}}
        ></Head>
        <SelectListView
          style = {styles.bottomListView}
          selectBack = {this._selectBack}
        ></SelectListView>

        <SelectTop
        ref = {ref=> this._headTop = ref }
        touchBack = {this._headTopTouchBack}
        touchok = {this._headTopTouchOk}
        ></SelectTop>

        <ChoessOkorNot
        str = '您并未保存，确定要退出吗？'
        callBack = {(isok)=>{
          if(isok){
            this.goBacktoParent()
          }
        }}
        ref = {ref =>{this._choessOk = ref}}
        >
        </ChoessOkorNot>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewCenter:{
        height:SceneUtils.size.height,
        width:SceneUtils.size.width,
        backgroundColor:'rgb(51,51,51)',
    },
    bottomListView:{
      position: 'absolute',
      bottom:0,
    },
    editerView:{
      position: 'absolute',
      backgroundColor:'rgba(0,0,0,0)'
    },
    imgBgView:{
      top:Dimensions.get('window').height*0.105,
      position: 'absolute',
      //top:Dimensions.get('window').height*0.08,
    },
});
