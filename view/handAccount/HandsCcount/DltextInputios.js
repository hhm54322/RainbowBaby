
import React, { Component } from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  Platform,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
} from 'react-native';

const displayFlex  = 'flex'
const displayNone  = 'none'

//废弃
export default class DltextInpute extends Component {
  constructor(props) {
    super(props);
    this._top;
    this._canClick;
    this._left;
    this._textinput;
    this._showButton = this.props.showButton;
    this._content;
    this._isScase;
    this._lenth;
    this._fontName = this.props.fontName
    this._fontNameNow = this.props.fontName
    this.refrenshowendBack =this.props.refrenshowEnded
    this.deletethisback = this.props.deleteBack
    this._index =this.props.index 
    this._canSelectInpute = this.props.canInput
    this._inputType = this.props.inputType
    this.onePass = this.props.onePass

    this.ontouchEndCallBack = this.props.ontouchEndCallBack
    
    this.state = {
      _fountColor:'#70c1b3',
      _height:this.props.height,
      top:0,
      left:0,
      isClick:true,
      _text:'请输入内容',
      _width:this.props.width,
      _scale:1.0,
      _angle:0,
      _showAll:true
    };
    this.resetToStruct(this.props.modstr)
    if(this._canSelectInpute)
    {
      this.state._text = '2018 3 8'
    }
  }

  resetToStruct = (mod)=>{
    if(!mod)
    {
        return
    }
    this.state.top = mod.top
    this.state.left = mod.left
    this.state._angle = mod.angle
    this.state._scale = mod.scale
    this.state._width = mod.width
    this.state._height = mod.height
    this.state._fountColor = mod.color
    this.state._text = mod.text
    this._fontNameNow = mod.fontname
  }

  modTostring = ()=>{
    var ac = {
      top:this.state.top,
      left:this.state.left,
      angle:this.state._angle,
      scale:this.state._scale,
      width:this.state._width,
      height:this.state._height,
      color:this.state._fountColor,
      text:this.state._text,
      fontname:this._fontNameNow
    }
   //var stringd = JSON.stringify(ac)
   //console.log('modTostring     ====    '    + stringd)
   //var mod = JSON.parse(stringd); //由JSON字符串转换为JSON对象
   return ac
  }

  componentDidMount(){
      this.refrenshowendBack(this._index,this._fontNameNow)
  }
  componentDidUpdate(){
      
  }

  getIndexAndFontName = ()=>{
    return {
      index:this._index,
      fontName:this._fontNameNow
    }
  }

  isSelect = ()=>{
    return this._showButton;
  }

  refrenshowFontName =(fontname,b) =>{
    if(b)
    {
      this._fontNameNow = fontname
      return;
    }
    if(this._showButton)
    {
      this._fontNameNow = fontname
    }
  }

  refrenshowFontColor =(color) =>{
    if(this._showButton)
    {
      this.setState({
        _fountColor:color
      })
    }
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

    this._textinput.blur();
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
      var ttop = this._top+gestureState.dy
      var tleft = this._left+gestureState.dx
      ttop = ttop<-this.state._height/2?-this.state._height/2:ttop
      ttop = ttop>Dimensions.get('window').height*0.6 - this.state._height/2?Dimensions.get('window').height*0.6 - this.state._height/2:ttop
      tleft = tleft<-this.state._width/2?-this.state._width/2:tleft
      tleft = tleft>Dimensions.get('window').width - this.state._width/2?Dimensions.get('window').width - this.state._width/2:tleft
      if(!this._isScase)
      {
        this.setState({
          top: ttop,
          left:tleft 
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
      
      //return;
      //  this.setState({
      //    isClick:false
      //  })
    }
    this.state.isClick = true
    this._showButton = true
    if(this.ontouchEndCallBack)
    {
      //console.log(this._index  +   '        '+this.state._fountColor);
        this.ontouchEndCallBack(this._index,this.state._fountColor)
    }
  }
  _onPanResponderTerminate = (evt, gestureState)=>{
  }
  
  
  refrenshowall(){

    //this.refrenshowFontColor(this.state._fountColor)

    //321
    //console.log('refrenshowall')
    // this.setState({
    //   _angle:this.state._angle
    // })
  }

  refrenshowBtn(index){
    this._textinput.blur();
    console.log('sssssssss')
    this._showButton = this._index === index? true:false
    this.setState({
      isClick:!this._showButton
    })
  }

  _onContentSizeChange(event) {
    if(this.onePass === 0)
    {
      this.onePass++;
      return;
    }
    console.log('event.nativeEvent.contentSize'+event.nativeEvent.contentSize.height)
    this.setState({
      _height: event.nativeEvent.contentSize.height,
      //_fountColor:this.state._fountColor
    });
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
    this.deletethisback(this._index)
  }
  _ggonTouchended=(event) =>{
    
  }

  _getinputOrText = (bwidth)=>{
      if(!this._canSelectInpute)
      {
          return (
            <TextInput 
            underlineColorAndroid='transparent'
                  value={this.state._text}
                  onChange={this._onChange}
                  defaultValue ='dddddddd'
                  returnKeyType = 'done'
                  ref= {(e) => {this._textinput = e;}}
                  caretHidden = {true}
                  blurOnSubmit = {true}
                  //editable = {!this._canSelectInpute} 
                  editable = {true} 
                  onStartShouldSetResponderCapture ={()=>false}
                  onMoveShouldSetResponderCapture ={()=>false}
                  {...this.props} 
                  {...this.style}
                  multiline={true}
                  onContentSizeChange={this._onContentSizeChange.bind(this)}
                  style={[this.props.style, 
                    {height: Math.max(20, this.state._height)+20},
                    //{height: 'auto'},
                    {width: Math.max(100, this.state._width)},
                    {paddingTop:10},
                    {transform:[{scale:this.state._scale}]},
                    {textAlign:'center',borderWidth:bwidth,
                    borderRadius:5,
                    justifyContent:'center',
                    alignItems:'center',
                    fontFamily: this._fontNameNow,
                    color :this.state._fountColor
                    }
                  ]}
                  >
            </TextInput>
          )
      }else
      {
        return (
        
        <View style = {[//this.props.style, 
          {height: Math.max(20, this.state._height)},
          {width: Math.max(100, this.state._width)},
          //{paddingTop:10},
          {transform:[{scale:this.state._scale}]},
          {//textAlign:'center',
          justifyContent:'center',
          alignItems:'center',
          borderWidth:bwidth,
          borderRadius:5,
          //fontFamily: this._fontNameNow
          }
        ]}>
        <Text 
        //value={this.state._text}
        //onChange={this._onChange}
        //defaultValue ='dddddddd'
        ref= {(e) => {this._textinput = e;}}
        //caretHidden = {true}
        //editable = {!this._canSelectInpute} 
        //onMoveShouldSetResponderCapture ={()=>false}
        //{...this.props} 
        //{...this.style}
        //multiline={true}
        //onContentSizeChange={this._onContentSizeChange.bind(this)}
        style={[
          {
          fontFamily: this._fontNameNow,
          color:this.state._fountColor,
          },
          //{transform:[{translateY:-5}],}
        ]}
        >
        {this.state._text}
        </Text></View>
        )
      }

  }

  _onChange = (event)=>{
    this.setState({
      _text: event.nativeEvent.text
  });
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
    var bwidth = this._showButton? 1:0
    var bl = this.state.isClick
    var add = -10;
    if(this._canSelectInpute){
        bl = true;
    }else{
      add =10
    }
    return (
      <View 
      ref= {(e) => {this._myView = e;}}
      style = {[{
        "top": this.state.top,
        "left": this.state.left
        },{position: 'absolute'},{
            height:this.state._scale*this.state._height+60,
            width:this.state._scale*this.state._width+60,
            justifyContent:'center',
            alignItems:'center',
            transform:[{scale:this.state._scale},{rotate:angle}],
        },
      ]}>
        <View>
            <View style={[styles.viewXX
            ,{
                display:dis,
                
            }, {transform:[{translateX:-15-xwidth },{translateY:-15-xheight}]}
            ]}
            onTouchEnd = {this._xxonTouchended}
            >
                <Text style = {{fontSize:25}}>X</Text>
            </View>

            <View style = {{justifyContent:'center',
            alignItems:'center',}}
                {...this._panResponder.panHandlers}
                onStartShouldSetResponderCapture= {()=>bl}
            >
                  {
                    this._getinputOrText(bwidth)
                 }
            </View>

            <View 
            onTouchStart = {this._onTouchStarted}
            onTouchMove = {this._onTouchMoved}
            onTouchEnd = {this._onTouchEnded}
            style={[styles.viewcircle
            ,{display:dis},
              {transform:[{translateX:(this.state._width-10)+xwidth},{translateY:(this.state._height+add)+xheight}]}
            ]}>
            </View>
         </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
 viewcircle:{
   position: 'absolute',
   height:20,
   width:20,
   borderRadius:10,
   backgroundColor:'rgba(15, 65, 98, 0.5)',
   //transform: [{translateX:200},{translateY:-15}]
 },
 viewXX:{
  position: 'absolute',
  justifyContent:'center',
  alignItems:'center',
  height:30,
  width:30,
  borderRadius:15,
  backgroundColor:'rgba(0, 0, 0, 0.0)',
  
  //transform: [{translateX:200},{translateY:15}]
 }
});