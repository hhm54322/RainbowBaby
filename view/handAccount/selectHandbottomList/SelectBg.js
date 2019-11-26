/**
 * React Native SelectBg
 * Create Data 2018 5 8
 * @ by XJS
 */

import React, { Component } from 'react';
//import tinycolor from 'tinycolor2';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
  ListView,
} from 'react-native';
import Head from './Head'
//import {Images} from '../index'
import {BG} from '../Images'

import NetService from '../../../utils/NetService'
import DataUtil from '../../../utils/DataUtil'


//背景选择界面  

export default class SelectBg extends Component {
  constructor(props) {
    super(props);
    this.touchback = this.props.back
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.shuju = []
    this.mode = []      //listview 数据源
    
    // var allimgre = Images.bg
    // var imglen = allimgre.length
    // for(var i = 0; i < imglen; i++){
    //     this.shuju.push({type:1,url:allimgre[i],name:i,id:i,se: i===2,d:i<=3})
    // }
    //所有的背景图片装入到数组
    BG.forEach((v,k)=>{
        this.shuju.push({value:v,key:k})
    })
    this.lirthisArr()
    this.childId = this.props.navigation.state.params.info.childId
    var image = this.props.navigation.state.params.info.image
    this.imagebgBengin = image === undefined || image === null?'1':image
    this.state = {
        imageBG:image === undefined || image === null?'1':image,
        dataSource: this.listData.cloneWithRows(this.mode),
    }

  }

  componentDidMount() {

  }
  //吧数据放入到mod里面  供list用
  lirthisArr = ()=>{
      this.mode = []
      var alllenth = this.shuju.length
      var len = this.shuju.length/3;
      var all = 0
      for(var i=0; all<alllenth&&i<len;i++){
          var arr = []
         for(var j = 0;j<3;j++){
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

  //消息结果返回
  messageBack = (j)=>{
    var acb = DataUtil.getinstance().getMainFamliy()
    var l = acb.main.children.length
    for(var i = 0;i<l;i++){
        if(acb.main.children[i].id === this.childId){
            acb.main.children[i].notebookBackground = this.state.imageBG
        }
    }
    DataUtil.getinstance().setMainFamliy(acb)
  }

  //发送修改背景的消息
  sendChangepf = (i)=>{
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token};
    var p = {
        notebookBackground:this.state.imageBG
    }
    var mod = {
        url:'/maria/account/family/main/children/'+this.childId,
        params:params,
        params1:p,
        headers:['application/json','application/json'],
        callback:this.messageBack
    }
    var farry = []
    var dataArry = []
    farry.push(NetService.sendBabyEditer)
    dataArry.push(mod)

    NetService.doArry(farry,dataArry)
    
  }

  //关闭的时候 发现有过更改就发送消息给服务器  更改数据
  close = ()=>{

    if(this.imagebgBengin != this.state.imageBG){
        this.sendChangepf();
    }

    var mode = this.props.navigation.state.params
    if(mode.info.back){
        mode.info.back(this.state.imageBG)
    }
    var d = this.props.navigation;
    d.pop();
  }

  show = ()=>{
  }

  onRequestClose(){
    //Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
  }

  //返回回调
  _TouchBack = ()=>{
      this.close()
  }


  //点击其中一个背景  再重新刷新
  _touchOne =(id)=>{
      var iid = id
      var back = ()=>{
          this.lirthisArr();
          this.setState({
            imageBG:iid.key,
            dataSource: this.listData.cloneWithRows(this.mode),
          })
      }
      return back
  }

  //渲染这个背景是否被选择
  showImgIsSelect = (key)=>{
    var boold = key === this.state.imageBG
    return (
        <View style = {[styles.bgViewgreen,{backgroundColor:boold?'rgb(134,184,34)':'rgb(230,230,230)'}]}>
        </View>
    )    
  }

  //背景是否被下载  废弃
  showImgNotDown = (se,d)=>{
      if(se)
      return 
    if(d === false){
        return (
            <View style = {styles.itemViewBg}>
                <Image 
                style = {styles.imgView}
                source={require('./img/xztb.png')} 
                ></Image>
            </View>
        )
    }
  }

  //
  showHuise = (se,d)=>{
      if(!se && d){
        return (
            <View style = {styles.bgViewhuise}>

            </View>
        )
      }
  }

  //渲染其中一个item

  showItemOnew = (rowData)=>{
        var l = rowData.length
        var lin = []
        for(var i=0;i<l;i++){
            lin.push(
                <TouchableWithoutFeedback
                    key = {i}
                    onPress = {this._touchOne(rowData[i])}
                >
                    <View 
                        style = {styles.itemView}
                    >
                        <Image style = {styles.imgItem}
                        source={rowData[i].value}
                        >
                        </Image>
                        {this.showImgIsSelect(rowData[i].key)}
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return lin
  }

  //listview 渲染函数
  showOneLine =(rowData)=>{
        return (
            <View style = {styles.itemLine}>
                {this.showItemOnew(rowData)}
            </View>
        )
  }

  render() {
    return(
        <View
        style = {{flex:1,}}
        >
            <Head 
            touchBack = {this._TouchBack}
            headstr = '背景'></Head>

            <ListView
                style = {styles.mainView}
                dataSource={this.state.dataSource}
                renderRow={this.showOneLine}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        backgroundColor:'rgb(51,51,51)',
        
    },
    itemLine :{
        flexDirection:'row',
    },
    itemView:{
        width:Dimensions.get('window').width*0.3,
        height:Dimensions.get('window').height*0.24,
        marginLeft:Dimensions.get('window').width*0.1/4,
        marginBottom:Dimensions.get('window').height*0.025,
        marginTop:Dimensions.get('window').height*0.025,
        justifyContent: 'center',  
        alignItems:'center', 
        backgroundColor:'rgb(210,210,210)'
    },
    itemViewBg:{
        position: 'absolute',
        width:Dimensions.get('window').width*0.3,
        height:Dimensions.get('window').height*0.24,
        backgroundColor:'rgba(150, 150, 150, 0.3)'
    },
    imgView:{
        position: 'absolute',
        width:20,
        height:20,
        resizeMode:'contain',
        right:0,
        bottom:0,
    },
    imgItem:{
        width:Dimensions.get('window').width*0.3,
        height:Dimensions.get('window').height*0.24,
        resizeMode:'stretch',
    },

    bgViewhuise:{
        position: 'absolute',
        width:20,
        height:20,
        right:0,
        bottom:0,
        backgroundColor:'rgb(230,230,230)',
        borderRadius:13,
    },
    bgViewgreen:{
        position: 'absolute',
        width:20,
        height:20,
        right:0,
        bottom:0,
        borderRadius:13,
        borderColor:'rgb(30,30,30)',
        borderWidth:1,
    },
 
});


