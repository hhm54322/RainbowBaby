/**
 * Sample React Native TouchComponentImg
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';

import DataUtil from '../../../utils/DataUtil'
import SceneUtils from '../../../utils/SceneUtils';
const displayFlex  = 'flex'
const displayNone  = 'none'

//文字 包裹的touch层
//所有的实现 参照img  都是一样的代码和实现
export default class TouchComponentText extends Component {

  constructor(props) {
    super(props);
    this._child = null
    this._varchild;
    this.isMove = false       //是否移动过
    this._left = 0
    this._top = 0
    this.showThis = this.props.mode.bools     //是否显示点击状态后的内容   
    this.newdata
    this._lenth = 0

    this.nowLeft
    this.nowTop
    this.nowWidth
    this.nowHeight

    this.touchBack = this.props.selectBack
    this.strMod = this.props.mode
    this.comEditerBack = this.props.comEditerBack
    this.deleteBack= this.props.deleteBack

    this.state = {
      top:this.strMod.top,
      left:this.strMod.left,
      width:this.strMod.width,
      angle:this.strMod.angle,
      height:this.strMod.height,
    }
  }

  setChild(child){
      if(child !== null)
      this._child = child
      //setTimeout()
    //   this._child.measure((x,y,width,height,left,top)=>{
    //     console.log('x  ==  '+x)
    //     console.log('y  ==  '+y)
    //     console.log('height ==  '+height)
    //     console.log('width  ==  '+width)
    //     console.log('top  ==  '+top)
    //     console.log('left ==  '+left)
    // })
      //console.log(this._child)
    //   this._child.props.children = 'nihaom'
    //   this._child.setNativeProps({
    //     style:{
    //         color:'blue',
    //         fontSize:25,
    //         width:110,
    //         letterSpacing:0.5,
    //         borderWidth:1,
    //         borderStyle : 'dotted'
    //     },
    //     value:'llllllll'
    // });
      // console.log(this._child)
      // this.setState({
      //   top:2
      // })
  }

  getMod = ()=>{
    var tmd = this._child.getModText()
    var mode = {
      top:this.state.top,
      left:this.state.left,
      width:this.state.width,
      height:this.state.height,
      angle:this.state.angle,
      type:this.strMod.type,
      uri:this.strMod.uri,
      comName:this.strMod.comName,
      fontColor:tmd.fontColor,
      fontName:tmd.fontName,
      fontStr:tmd.str,
      fontSize:tmd.fontSize,
      key:this.strMod.key,
      bools:this.strMod.bools
    }
    return mode
  }

  componentWillMount(){
      this._varchild = React.cloneElement(this.props.children, 
        {
          //onLayout : this._onLayout,
          ref : ref =>{this._child =ref},
          refrenshowFirst:this.refrenshowFirst
        }
    )
      this._panResponder=PanResponder.create({  
      onStartShouldSetPanResponder: (evt, gestureState) => true,  
      onMoveShouldSetPanResponder:(evt, gestureState) => true,  
      onPanResponderStart:this._onPanResponderStart,
      onPanResponderGrant:this._onPanResponderGrant,  
      onPanResponderMove:this._onPanResponderMove,  
      onPanResponderRelease:this._onPanResponderEnd,  
      onPanResponderTerminate:this._onPanResponderTerminate,  
    }); 
  }
  refrenshowFirst  =(width,height)=>{
    this.setState({
      width:width+1,
      height:height+1
    })
  }
  componentDidMount(){
    this._child.setStringToStr(this.strMod)
    this.setState({
      width:this._child.getHeight().width+1,
      height:this._child.getHeight().height+1
    })
  }

  tohidOrShow =(key)=>{
    this.showThis = false
    if(key === this.strMod.key){
      this.showThis =true
    }
    this.setState({
      top:this.state.top
    })
  }

  _onPanResponderStart = (evt, gestureState)=>{

  }

  _onPanResponderGrant = (evt, gestureState)=>{
        //touchBegin
        this.nowWidth = this._child.getHeight().width+1
        this.nowHeight = this._child.getHeight().height+1
        this._top = this.state.top
        this._left = this.state.left
        this.isMove = false
  }

  _onPanResponderMove = (evt, gestureState)=>{
    this.isMove = true
      if(!this.showThis)
      return
   //move
    if (evt.nativeEvent.changedTouches.length <= 1) {
        var ttop = this._top+gestureState.dy
        var tleft = this._left+gestureState.dx

        var htop = Dimensions.get('window').height*0.105
        var htopEnd = Dimensions.get('window').height* ((SceneUtils.size.width/706*1033+Dimensions.get('window').height*0.105)/SceneUtils.size.height)
        var hwidth = 0
        var hwidthEnd = Dimensions.get('window').width

        var rightb = hwidthEnd - this.nowWidth/2
        var leftb = -this.nowWidth/2

        var topsb = - this.nowHeight/2
        var topeb = htopEnd - this.nowHeight/2
        
        tleft = tleft >rightb?rightb:tleft
        tleft = tleft<leftb?leftb:tleft

        ttop = ttop>topeb?topeb:ttop
        ttop = ttop<topsb?topsb:ttop
        this.setState({
            top: ttop,
            left:tleft 
          })
      }
      
  }
  _onPanResponderEnd = (evt, gestureState)=>{
        var olddate = this.newdata;
        this.newdata = new Date().valueOf()
        if(!this.isMove && this.showThis && (this.newdata - olddate<=150)){
          if(this.comEditerBack){
            this.comEditerBack(this.strMod.key,this.strMod.type,this._child.getStrd())
          }
        }
        //end
        if(!this.showThis  && !this.isMove){
            this.showThis = true
            this.setState({
                top:this.state.top
            })
            if(this.touchBack){
              this.touchBack(this.strMod.key,this.strMod.type)
            }
        }
  }

  _onPanResponderTerminate = (evt, gestureState)=>{

  }

  childToSelect = ()=>{
      //调用子控件进入选中模式并告诉父组件对 堆 进行插入置顶
  }
  childToEdite = ()=>{
      //通知子控件进行编辑
  }
  
  _showThisComponent = ()=>{
      return (
        this._varchild
      )
  }

  _showCenter = ()=>{
    var borderw = this.showThis? 1:0
    var padingbottom = this.showThis ? 0:1
    return(    
    <View 
    ref = {ref => this.viewmain = ref}
      {...this._panResponder.panHandlers}
      style = {{
          borderWidth:borderw,
          borderStyle : 'dashed',
          borderColor:'red',
          width:this.state.width,
          padding:padingbottom
      }}
    >
      {this._showThisComponent()}
    </View>)
  }

  setAngleForPoint(px,py,x,y){
    var lx = Math.abs(px-x);
    var ly = Math.abs(py-y);
    var lz = Math.sqrt(Math.pow(lx,2)+Math.pow(ly,2));
    var cos = ly/lz;
    var radina = Math.acos(cos);  //用反三角函数求弧度
    var angle = Math.floor(180/(Math.PI/radina));   
    return angle;
  }

  getContentLenth(p1,p2,m1,m2){

    var l2 = (p1-m1)*(p1-m1) + (p2-m2)*(p2-m2)
    var l = Math.pow(l2, 0.5)
    return l
  }

  _onTouchBegin =(event) =>{
      if(!this.showThis)return
      this.nowWidth = this._child.getHeight().width+1
      this.nowHeight = this._child.getHeight().height+1
      this.nowLeft = this.state.left
      this.nowTop = this.state.top
      var x = this.nowLeft +this.nowWidth /2
      var y = this.nowTop +this.nowHeight/2
      this._lenth = this.getContentLenth(this.state.left,this.state.top,x,y)
  }


  _onTouchMove = (event)=>{
      if(!this.showThis)return
      var x = this.nowLeft + this.nowWidth/2
      var y = this.nowTop + this.nowHeight/2
      var px=event.nativeEvent.pageX
      var py=event.nativeEvent.pageY
      var le = this.getContentLenth(px,py,x,y)
      var sc = le/this._lenth
      var neww = this.nowWidth + (this.nowWidth*(sc-1))
      le = le<15?15:le
      this.setState({
        width:neww,
        top:this.nowTop + (this.nowHeight*(sc-1))/2,
        left:this.nowLeft - (this.nowWidth*(sc-1))/2,
      })
  }
  _onTouchEnd = (event)=>{
      if(!this.showThis)return
  }

  _onTouchBeginr = (event)=>{
    if(!this.showThis)return

    this.nowWidth = this._child.getHeight().width
    this.nowHeight = this._child.getHeight().height
    this.nowLeft = this.state.left
    this.nowTop = this.state.top

  }

  _onTouchMover = (event)=>{
    if(!this.showThis)return
    var y = this.nowTop + this.nowHeight/2
    var x = this.nowLeft + this.nowWidth/2

    var px=event.nativeEvent.pageX
    var py=event.nativeEvent.pageY - Dimensions.get('window').height*0.105

    var angle = this.setAngleForPoint(px,py,x,y)

    var angle2 = this.setAngleForPoint(this.nowLeft + this._child.getHeight().width,this.nowTop + this._child.getHeight().height,x,y)

    if(x>px&&y>py){//鼠标在第四象限
      angle = 180 - angle;
    }

    if(x==px&&y>py){//鼠标在y轴负方向上
      angle = 180;
    }

    if(x>px&&y==py){//鼠标在x轴正方向上
      angle = 90;
    }

    if(x<px&&y>py){//鼠标在第三象限
      angle = 180+angle;
    }

    if(x<px&&y==py){//鼠标在x轴负方向
      angle = 270;
    }

    if(x<px&&y<py){//鼠标在第二象限
      angle = 360 - angle;
    }
    angle = angle + angle2

    this.setState({
      angle:angle
    })


  }
  _onTouchEndr = (event)=>{
    if(!this.showThis)return

  }

  _onTouchEndDelete = ()=>{
    if(this.deleteBack){
      this.deleteBack(this.strMod.key)
    }
  }

  render() {
    var addViewCirlWidth = 0;
    var showStr = this.showThis? displayFlex:displayNone

    var angle = this.state.angle + 'deg'
    var paddingd = DataUtil.getinstance().getVueStrByp() === 'Android'? 25:0
    var mainStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:this.state.top - paddingd,
        left:this.state.left - paddingd,
        transform:[{rotate:angle}],
        width:this.state.width + paddingd,
        paddingTop:paddingd/2,
        paddingBottom:paddingd/2,
    }
    return (
      <View 
      style= {mainStyle}>
        {this._showCenter()}
        <View 
         onTouchEnd = {this._onTouchEndDelete}
        style = {[styles.cirlView,{display:showStr}]}>
            <Image style= {styles.viewImageRight}
                source={require('./img/xx.png')} 
            ></Image>
        </View>
        <View style = {[styles.cirlViewRight,{display:showStr}]}
          onTouchStart = {this._onTouchBegin}
          onTouchMove = {this._onTouchMove}
          onTouchEnd = {this._onTouchEnd}
        >
            <Image style= {styles.viewImageRight1}
                source={require('./img/lr.png')} 
            ></Image>
        </View>
        <View 
        onTouchStart = {this._onTouchBeginr}
        onTouchMove = {this._onTouchMover}
        onTouchEnd = {this._onTouchEndr}
        style = {[styles.cirlViewRightTop,{display:showStr}]}>
              <Image style= {styles.viewImageRight}
                source={require('./img/xz.png')} 
            ></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#D5DCDD',
    //borderWidth:1,
    //borderStyle : 'dashed'
  },
  cirlView:{
    position: 'absolute',
    width:25,
    height:25,
    borderRadius:10,
    left:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    top:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    transform: [{translateX:-10},{translateY:-10}]
  },
  cirlViewRightTop:{
    justifyContent: 'center',
    alignItems: 'center',
    right:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    bottom:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    position: 'absolute',
    width:25,
    height:25,
    borderRadius:13,
    transform: [{translateX:10},{translateY:10}]
  },
  cirlViewRight:{
    justifyContent: 'center',
    alignItems: 'center',
    right:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    top:DataUtil.getinstance().getVueStrByp() === 'Android' ? 13:0,
    position: 'absolute',
    width:25,
    height:25,
    borderRadius:13,
    transform: [{translateX:10},{translateY:-10}]
  },
  viewImageRight:{
    width:25,
    height:25,
    resizeMode:'contain',
  },
  viewImageRight1:{
    width:25,
    height:25,
    resizeMode:'contain',
  },
});
