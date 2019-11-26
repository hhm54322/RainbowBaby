/**
 * React Native DLImg2
 * @XJS
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
export default class DLImg2 extends Component {

    constructor(props) {
        super(props);
        this._top;
        this._canClick;
        this._left;
        this._textinput;
        this._showButton =true;
        this._content;
        this._isScase;
        this._lenth;
        this._showImg = true;
        this.imgsrc = this.props.imgsrc
        this.deletethis = this.props.deletecallback
        this._indeximg = this.props.index
        this.deleteAndrefrenshow = this.props.deleteAndrefrenshow
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
  
      if (evt.nativeEvent.changedTouches.length <= 1) {
        this._content == -10086
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
        
      }
    }
    _onPanResponderTerminate = (evt, gestureState)=>{
    }

    getContentLenth(p1,p2,m1,m2){

        var l2 = (p1-m1)*(p1-m1) + (p2-m2)*(p2-m2)
        var l = Math.pow(l2, 0.5)
        return l
    }
    
      _xxonTouchended=(event) =>{
        // if(this.deleteAndrefrenshow)
        // {
        //   this.deleteAndrefrenshow()
        //   return
        // }
        this._showImg = false;
        this.setState({
          //_showAll:false,
          _scale:this.state._scale
        })
      }
      _ggonTouchended=(event) =>{
        
      }

      onViewTouend =()=>{
        this._showImg = true;
        this.state._scale = 1
        this.setState({
          _scale:1
        })
      }

      showimgOrView =(dis,xheight,xwidth,angle)=>{
        if(this._showImg){
          return (
            <View>
              <Image 
                  {...this._panResponder.panHandlers}
                  style={[styles.titleimg,{
                      width:this.state._width*this.state._scale,
                      height:this.state._height*this.state._scale,
                  },
                 // {transform:[{scale:this.state._scale}]}
                ]}  
                  source={require('./adds.jpg')} 
              >
              </Image>
                  
            <View 
              onTouchEnd = {this._xxonTouchended}
              style = {[styles.viewXstyle,
              {display:dis},
               //{transform:[{translateX:-30-xwidth },{translateY:-30-xheight}]}
              ]}>
                  <Text>X</Text>
              </View>
            </View>)
        }else{
          return(
          <View 
              onTouchEnd = {this.onViewTouend}
              style = {{height:10,width:100,borderRadius:5,backgroundColor:'rgb(100, 78, 30)'}}>
              <Text>ddddddddddd</Text>
          </View>)
          
        }
      }

  render() {
    if(!this.state._showAll)
    {
      //this.deletethis(this._indeximg)
      return null
    }
    var dis = this._showButton? displayFlex:displayNone
    var xheight = (this.state._scale-1) * this.state._height/2
    var xwidth = (this.state._scale-1) * this.state._width/2
    var angle = this.state._angle + 'deg'
    return (
      <View style = {[{
            height:this.state._scale*this.state._height+30,
            width:this.state._scale*this.state._width+30,
            transform:[{rotate:angle}],
            top: this.state.top,
            left: this.state.left,
            //backgroundColor:'blue'
      },styles.mainView]}>
          {this.showimgOrView(dis,xheight,xwidth,angle)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewXstyle:{
        position: 'absolute',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:30,
        width:30,
        borderRadius:15,
        backgroundColor:'rgba(0, 0, 0, 0.0)',

    },
    viewcircle:{
        //position: 'absolute',
        height:20,
        width:20,
        borderRadius:10,
        backgroundColor:'rgba(15, 65, 98, 0.5)',
    },
    mainView:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        //position: 'absolute'
    },
    titleimg:{
        resizeMode:'contain'
    },
});
