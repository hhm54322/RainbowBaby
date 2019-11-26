/**
 * React Native SelectDate
 * Create Data 2018 5 15
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


import One from '../dltouch/template/One'
import One2 from '../dltouch/template/One2'
import {EditerHelper} from '../HandsCcount/EditerHelper'

import RootSibling from 'react-native-root-siblings';
import SceneUtils from '../../../utils/SceneUtils';


const displayFlex  = 'flex'
const displayNone  = 'none'

const NowWidth = Dimensions.get('window').width*0.46



let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

//日期选择界面
export default class SelectDate extends Component {

    //静态显示方法  直接调用就可以出现
    static showSelectDate(touchback,date){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <SelectDate
                    date={date}
                    touchback = {touchback}
                    destroy={() => destroy()}
                />);
        }
        return rootSibling;
    }
  constructor(props) {
    super(props);
    this.touchback = this.props.touchback       //传入回调
    this.date = this.props.date                 //传入的时间
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});        //listview数据
    this.editerHelper =new EditerHelper()       
    this.editermodeMap = this.editerHelper.getregistMapCom()
    this.shuju = []         //数据显示
    this.mode = []             //listview 数据 源
    this.editermodeMap.forEach((element, index, array) => {
        this.shuju.push({name:index})
        //te.push(element.ref.getMod);
    })
    this.lirthisArr()
    this.state = {
        isModalVisible:true,
        dataSource: this.listData.cloneWithRows(this.mode),
    }

  }

  componentDidMount() {

  }

  //根据数据做mod设置数据给listview显示
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

  //关闭
  close = ()=>{
    this.props.destroy()
  }

  //显示 已经废弃
  show = ()=>{
      this.setState({
        isModalVisible:true
      })
  }

  //安卓设置销毁对象
  onRequestClose(){
    Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
  }

  //关闭页面
  _TouchBack = ()=>{
      this.close()
  }
  //选择其中的一个时间样式
  _touchOne =(id)=>{
      var iid = id
      var back = ()=>{
        if(this.touchback){
            this.touchback(iid)
            this.close()
        }
      }
      return back
  }

  //返回一个dom对象 用来显示
  showmodecomdate = (str)=>{
     return (this.editermodeMap.get(str)(this.props.date,0.13))
  }

  //渲染每一个item
  showItemOnew = (rowData)=>{
    var l = rowData.length
    var lin = []
    for(var i=0;i<l;i++){
        lin.push(
            <TouchableWithoutFeedback
                key = {i}
                onPress = {this._touchOne(rowData[i].name)}
            >
                <View 
                style = {styles.itemView}
                >
                    {this.showmodecomdate(rowData[i].name)}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return lin
        
  }
  

  //listview 渲染回调函数
  showOneLine =(rowData)=>{
        return (
            <View style = {styles.itemLine}>
                {this.showItemOnew(rowData)}
            </View>
        )
  }

  render() {
    var showStr = this.state.isModalVisible ? displayFlex:displayNone
    return(
        <TouchableWithoutFeedback onPress = {this.close}>
        <View style = {{display:showStr,width:SceneUtils.size.width,height:SceneUtils.size.height,
            position: 'absolute',bottom:0,
        }}>
            <TouchableWithoutFeedback onPress = {()=>{}}>
            <View style = {[styles.mainView,{display:showStr}]}>

                <View style = {styles.headView}> 
                    <TouchableWithoutFeedback
                        onPress ={this._TouchBack}
                    >
                        <Image style = {styles.ImgView}
                        source={require('./icon/down.png')} 
                        >
                        </Image>
                    </TouchableWithoutFeedback>
                </View>
                <View style = {styles.line}></View>
                <ListView
                    style = {{backgroundColor:'rgb(100,100,100)'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneLine}
                />
            </View>
            </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        position: 'absolute',
        height:Dimensions.get('window').height*0.49,
        bottom:0,
        
    },
    itemLine :{
        flexDirection:'row',
    },
    line:{
        width :Dimensions.get('window').width,
        borderBottomWidth:1,
        borderColor:'#D4D4D4',
    },
    headView:{
        width:Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    ImgView:{
        width:Dimensions.get('window').height*0.048-4,
        height:Dimensions.get('window').height*0.048-4,
        resizeMode:'contain',
    },
    itemView:{
        width:Dimensions.get('window').width*0.45,
        height:Dimensions.get('window').height*0.12,
        borderWidth:1,
        marginLeft:Dimensions.get('window').width*0.09/3,
        marginTop:Dimensions.get('window').height*0.03,
        justifyContent:'center',
        alignItems:'center',
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
