/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
} from 'react-native';

const ISRC = '../../../res/'
const displayFlex  = 'flex'
const displayNone  = 'none'

//废弃
export default class DLImg extends Component {

    constructor(props) {
        super(props);
        this._top;
        this._canClick;
        this._left;
        this._textinput;
        this._showButton;
        this._content;
        this._isScase;
        this._lenth;
        this.imgsrc = this.props.imgsrc
        this.state = {
          _height:this.props.height,
          _width:this.props.width,
          _scale:1.0,
          _angle:0,
          top:0,
          left:0,
          _showAll:true
        };
    }

    componentWillMount(){
        this._content=-10086;
        this._canClick=false;
        this._showButton=false;
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
      _onPanResponderStart = (evt, gestureState)=>{
    
    }
    _onPanResponderGrant = (evt, gestureState)=>{
      
      this._canClick = true
      this._top = this.state.top
      this._left = this.state.left
      this._isScase = false;

      this.setState({
        isClick:true
      })
      
    }
    _onPanResponderMove = (evt, gestureState)=>{
      this._canClick =false
      if(this._showButton)
      {
        this._showButton = false
      }
  
      if (evt.nativeEvent.changedTouches.length <= 1) {
        this._content == -10086
        if(!this._isScase)
        {
          this.setState({
            top: this._top+gestureState.dy,
            left: this._left+gestureState.dx
          })
        }
       
      }else{
        this._isScase = true;
        var x=evt.nativeEvent.changedTouches[0].pageX;
        var y=evt.nativeEvent.changedTouches[0].pageY;
        var x1 =evt.nativeEvent.changedTouches[1].pageX;
        var y1=evt.nativeEvent.changedTouches[1].pageY;
        if(this._content == -10086)
        {
          this._content = Math.pow(((x - x1)*(x - x1) + (y - y1)*(y - y1)), 0.5);
          return
        }
  
        var content = Math.pow(((x - x1)*(x - x1) + (y - y1)*(y - y1)), 0.5);
        var cc = content - this._content   //zj
        //var cc =  this._content -content   //ceshi
        var scalsed = this.state._scale;
        var cha = (scalsed +=cc/100)
        cha = cha>1.5?1.5:cha
        cha = cha<0.8?0.8:cha
        this._content = content
        this.setState({
            _scale:cha
        })
      }
    }
    _onPanResponderEnd = (evt, gestureState)=>{
      this._content=-10086;
      if(this._canClick)
      {
        this._showButton = true
        this.setState({
          isClick:false
        })
      }
    }
    _onPanResponderTerminate = (evt, gestureState)=>{
    }

    getContentLenth(p1,p2,m1,m2){

        var l2 = (p1-m1)*(p1-m1) + (p2-m2)*(p2-m2)
        var l = Math.pow(l2, 0.5)
        return l
      }
      setAngleForPoint(px,py,x,y){
        var lx = Math.abs(px-x);
        var ly = Math.abs(py-y);
        var lz = Math.sqrt(Math.pow(lx,2)+Math.pow(ly,2));
        var cos = ly/lz;
        var radina = Math.acos(cos);  //用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));   //将弧度转换成角度
        return angle;
      }
    
      _onTouchStarted = (event) =>{
    
        var y = this.state.top
        var x = this.state.left
    
        y+=(this.state._scale*this.state._height+60)/2
        x+=(this.state._scale*this.state._width+60)/2
    
        var px=event.nativeEvent.pageX
        var py=event.nativeEvent.pageY
    
        this._lenth = this.getContentLenth(px,py,x,y)
      }
    
      _onTouchMoved =(event) =>{
    
        var y = this.state.top
        var x = this.state.left
    
        y+=(this.state._scale*this.state._height+60)/2
        x+=(this.state._scale*this.state._width+60)/2
    
        var px=event.nativeEvent.pageX
        var py=event.nativeEvent.pageY
    
        var len = this.getContentLenth(px,py,x,y)
        var bl = len - this._lenth
        bl = bl/300
        var angle = this.setAngleForPoint(px,py,x,y)
        var angle2 = this.setAngleForPoint(x,y,x-(this.state._scale*this.state._width)/2,y-(this.state._scale*this.state._height)/2)
        var angle2 = 180 - angle2 - 90;
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
        angle = angle - 90*3 -angle2
    
        var cha = bl + this.state._scale
        cha = cha>1.5?1.5:cha
        cha = cha<0.8?0.8:cha
        
        this.setState({
          _angle:angle,
          _scale:cha
        })
      }
      _onTouchEnded =(event) =>{
    
      }
      _xxonTouchended=(event) =>{
        this.setState({
          _showAll:false
        })
      }
      _ggonTouchended=(event) =>{
        
      }

  render() {
    if(!this.state._showAll)
    {
      return null
    }
    var dis = this._showButton? displayFlex:displayNone
    var xheight = (this.state._scale-1) * this.state._height/2
    var xwidth = (this.state._scale-1) * this.state._width/2
    var angle = this.state._angle + 'deg'
    return (
      <View style = {[styles.mainView,{
            height:this.state._scale*this.state._height+60,
            width:this.state._scale*this.state._width+60,
            transform:[{scale:this.state._scale},{rotate:angle}],
            top: this.state.top,
            left: this.state.left,
            backgroundColor:'blue'
      }]}>

          <View>
            <Image 
                {...this._panResponder.panHandlers}
                style={[styles.titleimg,{
                    width:this.state._width,
                    height:this.state._height,
                },
                {transform:[{scale:this.state._scale}]}
              ]}  
                source={require('./add.jpg')} 
            >
            </Image>
            <View 
            onTouchEnd = {this._xxonTouchended}
            style = {[styles.viewXstyle,
            {display:dis},
            {transform:[{translateX:-15-xwidth },{translateY:-15-xheight}]}
            ]}>
                <Text>X</Text>
            </View>
            <View style = {[styles.viewXstyle,
            {display:dis},
            {transform:[{translateX:(this.state._width-15)+xwidth},{translateY:-15-xheight}]}
            ]}>
                <Text>√</Text>
            </View>
            <View 
              onTouchStart = {this._onTouchStarted}
              onTouchMove = {this._onTouchMoved}
              onTouchEnd = {this._onTouchEnded}
            style = {[styles.viewcircle
            ,{transform:[{translateX:(this.state._width-10)+xwidth},{translateY:(this.state._height-10)+xheight}]},
            {display:dis},

            ]}>
                
            </View>

          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewXstyle:{
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center',
        height:30,
        width:30,
        borderRadius:15,
        backgroundColor:'rgba(0, 0, 0, 0.0)',

    },
    viewcircle:{
        position: 'absolute',
        height:20,
        width:20,
        borderRadius:10,
        backgroundColor:'rgba(15, 65, 98, 0.5)',
    },
    mainView:{
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute'
    },
    titleimg:{
        resizeMode:'contain'
    },
});
