/**
 * React Native SelectPF
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
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
  ListView,
} from 'react-native';
import Head from './Head'
//import {Images} from '../index'
import {ZX,CX,JX} from '../Images'
import SceneUtils from '../../../utils/SceneUtils'
//img选择界面
export default class SelectImage extends Component {
  constructor(props) {
    super(props);
    this.touchback = this.props.back  //回调函数
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});        //lsitdata
    this.leftarry = ['最新','畅销','精选']      //图片的三种类型
    this.shuju = []
    this.mode = []      //listview 数据 源
    this.refrenshowAll(0);      
    this.state = {
        type:0,
        dataSource: this.listData.cloneWithRows(this.mode),
    }

    
  }

  componentDidMount() {

  }

  getArry = (arry,map)=>{
        var temp = [];
        map.forEach((v,k)=>{
            temp.push({value:v,key:k})
        })
        return temp;
  }

  //根据类型把数据放mod里面
  refrenshowAll = (type)=>{
    this.shuju = []
    this.mode = []
    this.shuju = type === 0?this.getArry(this.shuju,ZX):(type === 1?this.getArry(this.shuju,CX):this.getArry(this.shuju,JX))
    this.lirthisArr()
  }

  //生成供listview使用的数据数组
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

  //关闭返回界面
  close = ()=>{
    var d = this.props.navigation;
    d.pop();
  }

  show = ()=>{
  }

  //返回调用
  _TouchBack = ()=>{
      this.close()
  }

  //点击其中一个图片
  _touchOne =(data)=>{
      var back = ()=>{
        var mode = this.props.navigation.state.params
        if(mode.info.back){
            mode.info.back(data.key)
        }
        var d = this.props.navigation;
        d.pop();
      }
      return back
  }

  //图片是否被下载 废弃  暂时此版本不用
  showImgNotDown = (se,d)=>{
    if(se)
    return 
    if(d === false){
        return (
            <Image 
                style = {styles.imgView}
                source={require('./img/xztb.png')} 
            ></Image>
        )
    }
}

//显示itmeOne
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
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return lin
  }

  //listView显示回调
  showOneLine =(rowData)=>{
        return (
            <View style = {styles.itemLine}>
                {this.showItemOnew(rowData)}
            </View>
        )
  }

  //根据点击类型重新得到数据
  touchTopOne = (i)=>{
    if(i != this.state.type){
        this.refrenshowAll(i);
        this.setState({
            type:i,
            dataSource: this.listData.cloneWithRows(this.mode),
        })
    }
  }


  //渲染一个标签
  showTopOne = ()=>{
      var temp = []
      var len = this.leftarry.length
      for(var i = 0;i<len;i++){
        temp.push(
        <TouchableWithoutFeedback 
        key = {i}
        onPress = {this.touchTopOne.bind(this,i)}>
            <View style = {this.state.type === i?styles.selectStyle:styles.notSelectStyle}>
                <Text style={{color:'white',fontWeight:'700'}}>{this.leftarry[i]}</Text>
            </View>
        </TouchableWithoutFeedback>)
      }
      return temp;
  }

  //渲染标签列表
  showTopBtn = ()=>{
      return (<View style = {styles.topView}>
          <View style= {{width:SceneUtils.size.width*0.1}}></View>
          {this.showTopOne()}
          <View style= {{width:SceneUtils.size.width*0.1}}></View>
        </View>)
  }


  render() {
    return(
        <View style = {{flex:1,backgroundColor:'rgb(51,51,51)'}}
        >
            <Head 
            touchBack = {this._TouchBack}
            headstr = '图标'></Head>
            {this.showTopBtn()}

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.showOneLine}
            />
            {/* <View style = {styles.mainView}>
                <View
                style = {styles.leftView}
                >
                    <View style = {{marginTop:36}}></View>
                   {this.showLeftTab()}
                    <View style = {{borderTopWidth:1,
                        width:Dimensions.get('window').width*0.3,
                        borderColor:'rgb(100,100,100)',}}>
                    </View>
                </View>
                <View style={{width:Dimensions.get('window').width*0.7,backgroundColor:'rgb(230,230,230)'}}>
                    
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.showOneLine}
                    />
                </View>
            </View> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    topView :{
        width:SceneUtils.size.width,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:10,
    },
    itemLine:{
        flexDirection:'row',
    },
    selectStyle:{
        width:SceneUtils.size.width*0.15,
        height:30,
        borderColor:'rgb(134,184,34)',
        borderBottomWidth:3,
        alignItems:'center',
        justifyContent:'center',
    },
    notSelectStyle:{
        width:SceneUtils.size.width*0.15,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        
    },

    itemView:{
        width:Dimensions.get('window').width*0.27,
        height:Dimensions.get('window').width*0.27,
        marginLeft:Dimensions.get('window').width*0.19/6,
        marginRight:Dimensions.get('window').width*0.19/6,
        marginBottom:Dimensions.get('window').height*0.04,
        justifyContent: 'center',  
        alignItems:'center', 
        backgroundColor:'rgb(180,180,180)',
        borderRadius:7,
    },
    imgView:{
        position: 'absolute',
        width:20,
        height:20,
        resizeMode:'contain',
        right:0,
        bottom:0,
    },
    fontpbStyle:{
        fontSize:19,
        color:'white'
    },
    imgItem:{
        width:Dimensions.get('window').width*0.26,
        height:Dimensions.get('window').width*0.26,
        resizeMode:'contain',
    },
    bgViewgreen:{
        position: 'absolute',
        width:20,
        height:20,
        right:0,
        bottom:0,
        backgroundColor:'rgb(50,205,50)',
        borderRadius:13,
    },
 
});
