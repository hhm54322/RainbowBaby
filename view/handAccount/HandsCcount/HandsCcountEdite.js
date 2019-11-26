/**
 * React Native App
 * Create Data 2018 4 8
 * @ by XJS
 */

import React, { Component } from 'react';
import SelecthandListView from '../selectHandbottomList/SelecthandListView'
import DLImg from './DLImg'
import DLImg2 from './DLImg2'
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
} from 'react-native';
var urli = './DltextInput'
if(Platform.OS === 'ios'){
  urli = './DltextInputios'
}


//已经废弃
import DltextInput from './DltextInputios'

//['模板','图片','文字','日期','笔刷']

const displayFlex  = 'flex'
const displayNone  = 'none'

export default class HandsCcountEdite extends Component {
  constructor(props) {
    super(props);
    this.newdata;
    this._inputMap = new Map()
    this._inputItem= new Map()
    this._inputindex = 0

    this._inputMap2 = new Map()    //储存
    this._imgtMap2 = new Map()    //储存
    this._isdate = false;

    this._imgtMap = new Map()
    this._imgItem= new Map()
    this._imgindex = 1000

    this._editeView;

    this._dataImpute;

    this.mainViewList

    this._moodimg 

    this._inputNumber = 0
    this._mainview
    this._dateInputeindex = -1
    this._selecthandListView;
    this.ceshi = 0;
    this.toBack;

  //   StorageHelper.get('handsmod').then((tags) => {
  //     var stringd = JSON.stringify(tags)
  //     console.log('stringd   = = =      ' + stringd)
  // });
    this._insertInputeDateMod
    this._insertFirstString= ''

    this.inputedatestring = '{"top":43.96565246582031,"left":84.88947296142578,"angle":0,"scale":1,"width":100,"height":25,"color":"#70c1b3","text":"2018 3 8","fontname":"FENGGWY"}';
    this.inputestring = '[{"top":146.14737701416016,"left":81.10003662109375,"angle":-23,"scale":1.3409916618262374,"width":130,"height":76,"color":"#70c1be","text":"请输入内容dasdasfasfasfssfsafsfsafsfsfaf","fontname":"FENGGWY"}]'
    this.imgstring = '[{"top":77.77049255371094,"left":87.88555908203125,"angle":34,"scale":0.8,"width":200,"height":200,"url":""}]'


    this.state={
      moodimg:0,
      _inputNumber:0,
      _imgNumber:0,
      _moodNumber:1,
      _type:0,
      _selectTouchindex:-1,
      _selectTouchImgIndex:-2,
      fonts:[{name:'FENGGWY',state:1},{name:'YANGGZA',state:1},{name:'FENGGWY',state:0},{name:'YANGGZA',state:0},{name:'FENGGWY',state:1},{name:'FENGGWY',state:1},{name:'FENGGWY',state:1}],
      imgs:[{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'}],
      mood:[{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'},{name:'adds'}]
    }

    this.inserteMod();

  }

  componentWillMount(){
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

  _onPanResponderGrant = (evt, gestureState)=>{
    
    this.newdata = new Date().valueOf()
  }
  _onPanResponderMove = (evt, gestureState)=>{
  }
  _onPanResponderEnd = (evt, gestureState)=>{
    var cc = new Date().valueOf()
    if(cc - this.newdata<=100 )
    {
      this.disallbuttonmod(-200);
    }
  }

inserteMod = ()=>{
  var applicationList = this.props.navigation.state.params.info.mod;
  if(applicationList === null)
  return

  this.toBack = this.props.navigation.state.params.info.back
  var inmputarr = applicationList.inputemod
  var imgarr = applicationList.imgmod
  var dateinpute = applicationList.datainpute

  var mod = JSON.parse(this.inputestring);
  var lengthd = inmputarr.length
  for(var i=0;i<lengthd;i++)
  {
    this._inputMap2.set(this._inputindex,inmputarr[i])
    this._inputindex+=1
  }
  
  if( JSON.stringify(dateinpute)  != "{}")
  {
    this._insertInputeDateMod = dateinpute
    this._isdate = true;
  }

  var modimg = JSON.parse(this.imgstring);
  var imglenth = imgarr.length
  for(var i=0;i<imglenth;i++)
  {
    this._imgtMap2.set(this._imgindex,imgarr[i])
    this._imgindex+=1
  }
}


_selectBack = (type,index)=>{
    if(type === 2)
    {
      if(index === 0 )
      {
        if(this._inputMap.size>9){
          return
        }
        this._inputMap.set(this._inputindex,this.state.fonts[0].name)
        this.disallbuttonmod(-11)
        this._selecthandListView.refrenshowType(2,'#70c1b3')
        this.setState({
          _type:type,
          _selectTouchindex:this._inputindex,
          _inputNumber:this.state._inputNumber+1
        })
        this._inputindex+=1
      }else{
        //shuaxinzifu
        //refrenshowFontName
        var name = this.state.fonts[index-1].name
        
        this._inputItem.forEach((element, index, array) => {
              if(element){
                var b = element.isSelect();
                if(b){
                  element.refrenshowFontName(name,false)
                  this.setState({
                    _type:type,
                  })
                  return
                }
              }
          })
        this.setState({
          _type:type,
        })
      }
      
    }
    if(type == 3)
    {
      if(index === 0  && !this._isdate)
      {
        this._selecthandListView.refrenshowType(3,'#70c1b3')
        this._dateInputeindex = 10086
        this.disallbuttonmod(-11)
        this.setState({
          _type:type,
        })
      }else{
        if(this._dateInputeindex === 10086){
          var name = this.state.fonts[index-1].name
          this._dataImpute.refrenshowFontName(name,true)
          this.setState({
            _type:type,
          })
        }
        //shuaxin
      }

    }
    if(type == 1)
    {
      
      if(index != 0)
      {
        if(this._imgtMap.size>4){
          return
        }
        this._imgtMap.set(this._imgindex,this.state.imgs[index-1].name)
        this.disallbuttonmod(-11)
        this.setState({
          _type:type,
          _selectTouchImgIndex:this._imgindex,
          _imgNumber:this.state._imgNumber+1
        })
        this._imgindex+=1
      }else{
        //打开相册
      }
      
    }
    if(type == 0)
    {
        if(this.state._moodNumber == 0)
        {
          this.setState({
            _type:type,
            _moodNumber:this.state._moodNumber+1
          })
        }else if(this.state._moodNumber == 1)
        {
            //刷新moodimg
        }
    }

}
_selectTypeBack = (type)=>{

  if(type != 0)
  {
    this._inputItem.forEach((element, index, array) => {
      if(element){
        element.refrenshowall();
      }
    })
  }
  
  //2002
  this.disallbuttonmod(-200);
  this.setState({      //暂时清空  以后修改
    _type:type,
    _inputNumber:this.state._inputNumber
  })
}




_onPress = ()=>{
  this.disallbuttonmod(-200);
  var inputmode = [];
  var imgmode =[];
  var datamode ={};
  
  this._inputItem.forEach((element, index, array) => {
    if(element){
      inputmode.push(element.modTostring())
    }
  })

  if(this._dataImpute)
  {
    datamode = this._dataImpute.modTostring()
  }

  this._imgItem.forEach((element, index, array) => {
    if(element){
      imgmode.push(element.modTostring())
    }
  })

  var modeAll = {
    inputemod:inputmode,
    imgmod:imgmode,
    datainpute:datamode,
  }
  StorageHelper.save('handsmod',modeAll)


  var add = StorageHelper.get('handsmod',(mod)=>{
    var str = JSON.stringify(mod)
    console.log('str   = = = =    '+ str)
  });

  this.snapshot('editeView')();

}

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
  var heightd = Dimensions.get('window').height*0.65
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

deleteImg = (index) =>{
  this._imgtMap.delete(index)
  this._imgtMap2.delete(index)
  this._imgItem.delete(index)
}

disallbuttonmod = (indexd)=>{
  this._inputItem.forEach((element, index, array) => {
    if(element){
      element.refrenshowBtn(indexd);
    }
  })

  this._imgItem.forEach((element, index, array) => {
      if(element){
      element.refrenshowBtn(indexd);
      }
  })

  if(this._dataImpute)
  {
    this._dataImpute.refrenshowBtn(indexd)
  }

  this.setState({
    _type:this.state._type
  })
}

deletedataInpute = (index)=>{
  if(this._isdate ){
    this._isdate = false;
    this.setState({
      _type:this.state._type
    })
  }
  
  if(this._dateInputeindex === index){
    this._dateInputeindex = -1
    this._dataImpute = null
    this.setState({
      _type:this.state._type
    })
  }
}

deleteInpute = (index)=>{
  this._inputMap.delete(index)
  this._inputItem.delete(index)
  this._inputMap2.delete(index);
  this.setState({
    _type:this.state._type
  })
}

refrenshowEnd = (index,fontname) =>{

} 

ontouchInputEndDataCallBack = (indexd,color)=>{
  this.disallbuttonmod(indexd);
  //this.state._selectTouchindex = indexd
  if(this._dataImpute)
  {
    this._dataImpute.refrenshowBtn(10086)
  }

  if(this._selecthandListView)
  {
    this._selecthandListView.refrenshowType(3,color)
  }
 
}

ontouchInputEndCallBack = (indexd,color)=>{
  this.disallbuttonmod(indexd);
  this.state._selectTouchindex = indexd
  if(this._selecthandListView)
  {
    this._selecthandListView.refrenshowType(2,color)
  }

}

onTouchImgEndCallBack = (indexd) =>{
    this.disallbuttonmod(indexd);
    this.state._selectTouchImgIndex = indexd
    if(this._selecthandListView)
    {
        this._selecthandListView.refrenshowType(1,'#70c1b3')
    }
}


_showImg = ()=>{
  var inputItem = []
  this._imgtMap.forEach((element, index, array) => {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    inputItem.push(
      <DLImg
        //style={{zIndex:cc}}
        ref={ ref => this._imgItem.set(index,ref)}
        deletecallback = {this.deleteImg}
        ontouchEndCallBack = {this.onTouchImgEndCallBack}
        showButton = {this.state._selectTouchImgIndex === index}
        key = {index}
        index = {index}
        style = {[{zIndex:0}]}
        imgsrc = {"adds.jpg"}
        width = {200}
        height = {200}>
        </DLImg>
    );
  });
  return inputItem
}

showDataInpute = ()=>{
  if(this._dateInputeindex === -1)
  {
      return
  }
  return (<DltextInput 
    key = {10086}
    ref={ ref => this._dataImpute = ref}
    index = {10086}
    canInput = {true}
    showButton = {true}
    refrenshowEnded = {this.refrenshowEnd}
    deleteBack = {this.deletedataInpute}
    ontouchEndCallBack = {this.ontouchInputEndDataCallBack}
    fontName = {this.state.fonts[0].name}
    height = {25}
    width = {100}
    style={styles.textInputStyle}
    keyboardType={'default'}
    underlineColorAndroid='transparent'
    //onChangeText={this._onChangeText.bind(this)} 
    />)
}

_showInput = ()=>{
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
      onePass = {10}
      canInput = {false}
      showButton = {this.state._selectTouchindex == index}
      refrenshowEnded = {this.refrenshowEnd}
      deleteBack = {this.deleteInpute}
      ontouchEndCallBack = {this.ontouchInputEndCallBack}
      fontName = {element}
      height = {20}
      width = {130}
      style={styles.textInputStyle}
      keyboardType={'default'}
      underlineColorAndroid='transparent'
      //onChangeText={this._onChangeText.bind(this)} 
      />
    );
  });
  return inputItem;
}
deleteMoodimg = (indx)=>{
  this.setState({
    _moodNumber:0
  })
}



showMoodimg = ()=>{
  if(this.state._moodNumber == 1){
    return(<DLImg2
      ref= {(e) => {this._moodimg = e;}}
      deleteAndrefrenshow = {this.deleteMoodimg}
      index = {0}
      style = {[{zIndex:0}]}
      imgsrc = {"adds.jpg"}
      width = {200}
      height = {200}>
  </DLImg2>)
  }else
  {
    return ( null)
  }
}

showMoodView = ()=>{
  var dis = this.state._type === 0? displayFlex:displayNone
  return (
    <View style = {[styles.showViewmood,{display:dis},
      { justifyContent:'flex-end',
        alignItems:'flex-end',
    }]}>
          {this.showMoodimg()}
    </View>
  )
}
_onmainViewTouchendBack = ()=>{
  this.disallbuttonmod(-200);
}


inserteModeInpute = ()=>{
  var iteminpute = []
  this._inputMap2.forEach((element, index, array) => {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    iteminpute.push(
      <DltextInput 
      ref={ ref => this._inputItem.set(index,ref)}
      key={index} 
      index = {index}
      modstr = {element}
      onePass = {0}
      canInput = {false}
      showButton = {this.state._selectTouchindex == index}
      refrenshowEnded = {this.refrenshowEnd}
      deleteBack = {this.deleteInpute}
      ontouchEndCallBack = {this.ontouchInputEndCallBack}
      fontName = {element.fontname}
      height = {20}
      width = {130}
      style={styles.textInputStyle}
      keyboardType={'default'}
      underlineColorAndroid='transparent'
      //onChangeText={this._onChangeText.bind(this)} 
      />
    );
  });
    return iteminpute
}


inserteImgmod = ()=>{
  var inputItem = []
  this._imgtMap2.forEach((element, index, array) => {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    inputItem.push(
      <DLImg
        ref={ ref => this._imgItem.set(index,ref)}
        deletecallback = {this.deleteImg}
        ontouchEndCallBack = {this.onTouchImgEndCallBack}
        showButton = {this.state._selectTouchImgIndex === index}
        key = {index}
        modstr = {element}
        index = {index}
        style = {[{zIndex:0}]}
        imgsrc = {"adds.jpg"}
        width = {200}
        height = {200}>
      </DLImg>
    );
  });
  return inputItem
}

showinsertedatainpute = ()=>{
  if(!this._isdate)
  {
    return;
  }
  var mod = this._insertInputeDateMod
  return (<DltextInput 
    key = {10086}
    ref={ ref => this._dataImpute = ref}
    index = {10086}
    modstr = {mod}
    canInput = {true}
    showButton = {false}
    refrenshowEnded = {this.refrenshowEnd}
    deleteBack = {this.deletedataInpute}
    ontouchEndCallBack = {this.ontouchInputEndDataCallBack}
    fontName = {this.state.fonts[0].name}
    height = {25}
    width = {100}
    style={styles.textInputStyle}
    keyboardType={'default'}
    underlineColorAndroid='transparent'
    //onChangeText={this._onChangeText.bind(this)} 
    />)
}

showEdterView = ()=>{
  var dis = this.state._type != 0? displayFlex:displayNone

  
  // if(this.ceshi >= 5)
  // {
  //   console.log('this.ceshi   ===   ',this.ceshi)
  //   return this.mainViewList;
  // }      //测试重复刷新

  this.ceshi++;
  this.mainViewList =(

    // <TouchableWithoutFeedback
    //   onPress = {this._onmainViewTouchendBack}
    // >
      <View 
      ref="editeView"
            {...this._panResponder.panHandlers}
            style = {[styles.showView,{display:dis}]}>
            {[this.inserteImgmod(),  this._showImg() ,this.inserteModeInpute() , this._showInput(),this.showDataInpute(),this.showinsertedatainpute()]}
    </View>
    // </TouchableWithoutFeedback>

  )
  return this.mainViewList
}

showMainEditView = ()=>{
    this.showMoodView()
    this.showEdterView()

}

onColorBack = (color) =>{
      this._inputItem.forEach((element, index, array) => {
        if(element){
          var b = element.isSelect();
          if(b){
            element.refrenshowFontColor(color,false)
            return
          }
        }
    })

        if(this._dataImpute)
        {
          this._dataImpute.refrenshowFontColor(color,true)
        }
    
}

_onPressimgExit = ()=>{

  if(this.toBack)
  {
    this.toBack()
  }
  this.props.navigation.goBack();
}


  render() {
    return(
      // <BottomView>

      // </BottomView>
      <View style = {styles.viewCenter}>
        <View style = {styles.titleView}>
        <TouchableWithoutFeedback
         onPress = {this._onPressimgExit}
        >
            <Image 
            style = {styles.exitImgstyle}
              source={require('../../../resource/img/selectBook/left.png')}
            ></Image>
            </TouchableWithoutFeedback>
        </View>

        <View style = {styles.showView}>
            {this.showMoodView()}
            {this.showEdterView()}
        </View>
        <View>        
          <SelecthandListView
        ref={ ref => this._selecthandListView = ref}
          selectBack = {this._selectBack}
          selecttypeBack = {this._selectTypeBack}
          colorBack = {this.onColorBack}
          type = {this.state._type}
        ></SelecthandListView>
        </View>

        <TouchableWithoutFeedback
         onPress = {this._onPress}
        >
        <View
        style = {[styles.buttonView,styles.viewCenter]}
        >
          <Text>保存</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    );


  }
}

const styles = StyleSheet.create({
  titleView:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height*0.06,
    //backgroundColor:'rgba(0,0,255,1.0)',
    justifyContent: 'center',  
    marginTop:10,
  },
  exitImgstyle:{
    width:Dimensions.get('window').width*0.13,
    height:Dimensions.get('window').height*0.04,
    resizeMode:'contain',
  },
  mainView:{
    flex:1,
  },
  viewCenter:{
    justifyContent: 'center',  
    alignItems:'center',  
  },
  showView:{
    width:(Dimensions.get('window').width),
    height:(Dimensions.get('window')).height*0.65,
    backgroundColor:'rgba(30,144,255,1.0)',
  },
  showViewmood:{
    width:(Dimensions.get('window').width),
    height:(Dimensions.get('window')).height*0.65,
    backgroundColor:'rgba(30,144,0,1.0)',
  },
  buttonView:{
    width :(Dimensions.get('window').width-40),
    height:30,
    backgroundColor:'rgba(30,144,255,1.0)',
    borderRadius: 5,
  }
});
