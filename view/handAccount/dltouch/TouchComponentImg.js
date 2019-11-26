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

import resolveAssetSource from 'resolveAssetSource';

import {ALL} from '../Images'

import DataUtil from '../../../utils/DataUtil'
import SceneUtils from '../../../utils/SceneUtils';

const displayFlex  = 'flex'
const displayNone  = 'none'


//image 包裹的touch层
export default class TouchComponentImg extends Component {

  constructor(props) {
    super(props);   
    this._child = null        //child
    this._varchild;           //虚拟dom
    this.isMove = false       //是否移动过
    this._left = 0            //left
    this._top = 0             //top
    this.nowLeft              //现在的left
    this.nowTop               //现在的top   用于储存
    this.showThis = this.props.mode.bools     //是否显示点击状态后的内容   
    this.newdata            //新对象
    this._lenth = 0
    this.nowWidth           //现在的nowWidth
    this.nowHeight          //现在的nowHeight


    this.touchBack = this.props.selectBack      //点击回调
    this.strMod = this.props.mode               //传入的数据模型
    this.deleteBack= this.props.deleteBack       //删除后的回调


    this.state = {
      top:this.strMod.top,
      left:this.strMod.left,
      width:this.strMod.width,
      height:this.strMod.height,
      angle:this.strMod.angle,
      //scale:1,
    }
  }

  //赋值
  getMod = ()=>{
    var mode = {
      top:this.state.top,
      left:this.state.left,
      width:this.state.width,
      height:this.state.height,
      angle:this.state.angle,
      type:this.strMod.type,
      uri:this.strMod.uri,
      comName:this.strMod.comName,
      imageType:this.strMod.imageType,
      key:this.strMod.key,
      bools:this.strMod.bools,
      color:this.strMod.color,
      
    }
    return mode
  }
  
  //设置ref
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


  //设置ref  和  触摸
  componentWillMount(){
      this._varchild = React.cloneElement(this.props.children
        ,{ref : ref =>{this._child =ref}} )
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

  // ,{onLayout: ({nativeEvent:e}) => { this.layout(e)}}  layout=(e)=>{  console.log(e)  }


  //初始化对象  是本地图片还是网络图片
  componentDidMount(){
    if(this.strMod.imageType === 1){
      var image = ALL.get(this.strMod.uri)
      var source = resolveAssetSource(image)
      this.strMod.width = source.width
      this.strMod.height = source.height

      this.setState({
        width:source.width,
        height:source.height
      })
      this._child.setHAndWAndReq(image,this.strMod.height,this.strMod.width,this.strMod.imageType)
    }else{
      var cc = this.strMod.uri
      Image.getSize(cc,(w,h)=>{
        this.strMod.width = w
        this.strMod.height = h
        this.setState({
          width:w,
          height:h
        })
        this._child.setHAndWAndReq(this.strMod.uri,this.strMod.height,this.strMod.width,this.strMod.imageType)
      },(err)=>{
        console.log(err)
      })
    }
      
  }


  //废弃
  tohidOrShow = (key)=>{
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

  //初始化点击开始的数据
  _onPanResponderGrant = (evt, gestureState)=>{
        //touchBegin
        this.nowWidth = this.state.width
        this.nowHeight = this.state.height
        this._top = this.state.top
        this._left = this.state.left
        this.isMove = false
  }


  //移动时候的判断逻辑
  _onPanResponderMove = (evt, gestureState)=>{
    this.isMove = true
      if(!this.showThis)
      return
   //判断边距
    if (evt.nativeEvent.changedTouches.length <= 1) {
        var ttop = this._top+gestureState.dy      //触摸的的y值
        var tleft = this._left+gestureState.dx    //触摸的的x值
        var htop = Dimensions.get('window').height*0.105      //偏移量
        var htopEnd = Dimensions.get('window').height* ((SceneUtils.size.width/706*1033+Dimensions.get('window').height*0.105)/SceneUtils.size.height)
        var hwidth = 0                               //偏移量
        var hwidthEnd = Dimensions.get('window').width      //宽度

        var rightb = hwidthEnd - this.nowWidth/2         //右边距离
        var leftb = -this.nowWidth/2                    //左边

        var topsb = - this.nowHeight/2              //上边
        var topeb = htopEnd - this.nowHeight/2      //底部
        
        tleft = tleft >rightb?rightb:tleft
        tleft = tleft<leftb?leftb:tleft

        ttop = ttop>topeb?topeb:ttop
        ttop = ttop<topsb?topsb:ttop
        
        //此逻辑为越界的情况下    返回到边界

        //位置刷新
        this.setState({
            top: ttop,
            left:tleft,
          })
      }
  }

  //触摸结束回调函数
  _onPanResponderEnd = (evt, gestureState)=>{
        var olddate = this.newdata;
        this.newdata = new Date().valueOf()
        if(!this.isMove && this.showThis && (this.newdata - olddate<=150)){
          //是否进入编辑模式
          this.childToEdite()
        }
        //end
        if(!this.showThis  && !this.isMove){
            this.showThis = true
            this.setState({
                top:this.state.top
            })
            if(this.touchBack){
              //调用触摸结束的函数
              this.touchBack(this.strMod.key,this.strMod.type)
            }
        }
  }

  _onPanResponderTerminate = (evt, gestureState)=>{

  }

  childToSelect = ()=>{
      //调用子控件进入选中模式并告诉父组件对 堆 进行插入置顶
  }
  //调用编辑模式
  childToEdite = ()=>{
      //通知子控件进行编辑
      this._child.toEditer()
  }
  
  _showThisComponent = ()=>{
      return (
        this._varchild
      )
  }

  //显示中间的部分
  _showCenter = ()=>{
    var borderw = this.showThis? 1:0
    var padingbottom = this.showThis ? 0:1

    var styleimg = {
      borderWidth:borderw,
      borderStyle : 'dashed',
      borderColor:'red',
      padding:padingbottom,
      justifyContent: 'center',
      alignItems: 'center',
      //width:this.state.width,
      //height:this.state.height
      //transform:[{scale:this.state.scale}]
    }
    return(    
    <View 
    ref = {ref => this.viewmain = ref}
      {...this._panResponder.panHandlers}
      style = {styleimg}
    >
      {this._showThisComponent()}
    </View>)
  }

  //数学计算2点的长度
  getContentLenth(p1,p2,m1,m2){

    var l2 = (p1-m1)*(p1-m1) + (p2-m2)*(p2-m2)
    var l = Math.pow(l2, 0.5)
    return l
  }


  //根据event算出长度  点击点到中间
  getLenbyEvent = (event) =>{
    var y = this.nowTop + (this.nowHeight/2)
    var x = this.nowLeft+ (this.nowWidth/2)

    var px=event.nativeEvent.pageX
    var py=event.nativeEvent.pageY - Dimensions.get('window').height*0.105

    var _lenth = this.getContentLenth(px,py,x,y)
    return _lenth
  }


  //2点之间的角度
  setAngleForPoint(px,py,x,y){
    var lx = Math.abs(px-x);
    var ly = Math.abs(py-y);
    var lz = Math.sqrt(Math.pow(lx,2)+Math.pow(ly,2));
    var cos = ly/lz;
    var radina = Math.acos(cos);  //用反三角函数求弧度
    var angle = Math.floor(180/(Math.PI/radina));   
    return angle;
  }

  //touch事件  开始
  _onTouchBegin =(event) =>{
    if(!this.showThis)return

    this.nowWidth = this.state.width
    this.nowHeight = this.state.height
    this.nowLeft = this.state.left
    this.nowTop = this.state.top 

    this._lenth = this.getLenbyEvent(event)
    //初始化数据   并且算出点击点到中间的长度
  }


  //touch  滑动回调
  _onTouchMove = (event)=>{
      if(!this.showThis)return

      var y = this.nowTop + this.nowHeight/2
      var x = this.nowLeft + this.nowWidth/2
  
      var px=event.nativeEvent.pageX
      var py=event.nativeEvent.pageY - Dimensions.get('window').height*0.105

      //上面是点击点   和   当前的位置

      var angle = this.setAngleForPoint(px,py,x,y)   //算出来的弧度

      //算出来的初始化角度
      var angle2 = this.setAngleForPoint(this.nowLeft + this.nowWidth,this.nowTop  + this.nowHeight,x,y)
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



      var len = this.getLenbyEvent(event)
      //算出编辑后的长度
      var sc = (len/this._lenth)
      var neww = this.nowWidth + (this.nowWidth*(sc-1))
      var newh = this.nowHeight + (this.nowHeight*(sc-1))
      this._child.toSetHeightAndWidth(newh,neww)
      //设置数据 然后界面刷新
      this.setState({
        width:neww,
        height:newh,
        angle:angle,
        top:this.nowTop - (this.nowHeight*(sc-1))/2,
        left:this.nowLeft - (this.nowWidth*(sc-1))/2,
      })
  }

  _onTouchEnd = (event)=>{
      if(!this.showThis)return
  }

  _onTouchEndDelete = ()=>{
    if(this.deleteBack){
      this.deleteBack(this.strMod.key)
    }
  }

  render() {
    var addViewCirlWidth = 0;
    var angle = this.state.angle + 'deg'
    var showStr = this.showThis? displayFlex:displayNone
    var add =  DataUtil.getinstance().getVueStrByp() === 'Android'? 25:0
    var mainStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:this.state.top,
        left:this.state.left,
        transform:[{rotate:angle}],
        width:this.state.width+add,
        height:this.state.height+add,
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
    left:DataUtil.getinstance().getVueStrByp() === 'Android'? 15:0,
    top:DataUtil.getinstance().getVueStrByp() === 'Android'? 15:0,
    transform: [{translateX:-10},{translateY:-10}]
  },
  cirlViewRight:{
    justifyContent: 'center',
    alignItems: 'center',
    right:DataUtil.getinstance().getVueStrByp() === 'Android'? 15:0,
    bottom:DataUtil.getinstance().getVueStrByp() === 'Android'? 15:0,
    position: 'absolute',
    width:25,
    height:25,
    borderRadius:10,
    transform: [{translateX:10},{translateY:10}]
  },
  viewImageRight:{
    width:23,
    height:23,
    resizeMode:'contain',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
