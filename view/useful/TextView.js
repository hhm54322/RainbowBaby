/**
 * Sample React Native TextView
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
  Dimensions,
  ListView,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'
import {PullList} from 'react-native-pull';
import TextAd from './TextAd'

import NetService from '../../utils/NetService'

const displayNone  = 'none'
const displayFlex  = 'flex'

//新闻页面 
export default class TextView extends Component {
  constructor(props) {
    super(props);
    this.touchBack = this.props.touchBack   //点击后面的回调
    this.modemessage = []     //modessage 临时对象
    this.mode = []        //listview 渲染的源头
    this.isShowButton = false     //是否显示重新加载按钮

    this.alldata = [];      //所有的对象  临时对象
    this.firstSend = 10;    //首次进入的时候  发送消息拿到多少条消息
    this.addSend = 10;      //每次上啦刷新 拿到多少条消息
    this.maxSmod = 50;      //所有消息的最大值



    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }


  //消息回调
  resetMessageBack = (responseJson)=>{
    console.log(responseJson);
    this.modemessage = responseJson
    this.getallmessagetodata(responseJson)
  }

  //发送消息
  sendmeesagedthisView = ()=>{
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token,'offset':this.firstSend};
    var mod = {
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:this.messagebackd
    }

    var farry = []
    var dataArry = []
    farry.push(NetService.sendarticles)
    dataArry.push(mod)

    NetService.doArry(farry,dataArry)

  }

  //消息回调
  messagebackd = (responseJson,is)=>{
    this.resetMessageBack(responseJson)
  }


  //数据存入本地  如果超过时间3*60*60*1000  或者 没有数据  那么就重新发送消息请求数据
  savegetBack = (data)=>{
    console.log(data)
    if(data != null){
      this.alldata = data.data
      var timenow = new Date()
      if(timenow.getTime() - data.time > 3*60*60*1000){
        this.sendmeesagedthisView()
        return
      }else{
        this.getallmessagetodata([])
      }
    }else{
      this.sendmeesagedthisView()
    }
  }

  componentDidMount(){
    //本地拿去数据
    DataUtil.getinstance().getDateByTypeHlep(2,this.savegetBack)
  }

  //点击其中一个文字的回调
  touchOne = (id)=>{
    if(this.touchBack){
      this.touchBack(id)
    }
  }

  //拿到所有的数据  拼接  mod  给listview渲染用
  getallmessagetodata = (responseJson)=>{
      this.isShowButton = false
      this.mode = []
      this.mode = responseJson
      console.log(this.mode)
      this.mode = this.mode.concat(this.alldata)
      this.alldata = this.mode
      if(this.mode.length > 0){
        var time = new Date()
        var savestr = {
          time:time.getTime(),
          data:this.mode
        }
        var strd = JSON.stringify(savestr)
        DataUtil.getinstance().setDataByType(2,JSON.parse(strd))
      }
      this.mode = []
      this.mode.push({
        infod:1
      })
      this.mode = this.mode.concat(this.alldata)
      if(this.mode.length > this.maxSmod){
        this.mode = this.mode.slice(0,this.maxSmod)
      }
      if(this.mode.length > 1){
        this.mode.push({
          noMore:1
        })
      }else{
        this.isShowButton = true
      }
      this.setState({
        dataSource: this.listData.cloneWithRows(this.mode)
      })
  }
  

  //请求数据   下啦请求数据
  onPullRelease=(resolve)=>{
      var token = DataUtil.getinstance().getUserData().access_token
      let params = {'access_token':token,'offset':this.addSend};

      var mod = {
          params:params,
          params1:{},
          headers:['application/json','application/json'],
          callback:(responseJson) =>{
            //下面的就是请求来的数据
            console.log(responseJson)
            this.getallmessagetodata(responseJson)
            resolve()
        }
      }
      NetService.do(NetService.sendarticles,mod)
  }

  
  // topIndicatorRender = (pulling, pullok, pullrelease) =>{
  //   setTimeout(() => {
  //     if (pulling) {
  //         this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
  //         this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
  //         this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
  //     } else if (pullok) {
  //         this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
  //         this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
  //         this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
  //     } else if (pullrelease) {
  //         this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
  //         this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
  //         this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
  //     }
  // }, 1);
  // return (
  //     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
  //         <ActivityIndicator size="small" color="white" />
  //         <Text ref={(c) => {this.txtPulling = c;}} style={styles.hide}>{'下拉加载...'}</Text>
  //         <Text ref={(c) => {this.txtPullok = c;}} style={styles.hide}>{'松开进行加载...'}</Text>
  //         <Text ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>{'加载中...'}</Text>
  //     </View>
  // );
  // }



  //显示每一个item
  showTextOne = (data)=>{
    return (
      <TouchableWithoutFeedback
      
      onPress = {this.touchOne.bind(this, data.id)}
      >
      <View 
      style = {{alignItems:'center',justifyContent:'center'}}
      >
      <View style = {styles.listOneView}>
          
          <View style= {styles.leftView}>
              <View style = {styles.TextView}>
                <Text style={styles.texttitleStyle}>{data.title}</Text>
              </View>
              <Text style = {{color:'white'}}>{data.createTime}</Text>
              
          </View>
          <View style = {styles.rightView}>
              <Image 
               style= {styles.imgv}
               source={{uri:  data.images}}>
              </Image>
          </View>
      </View>
      <View style = {{
            width:SceneUtils.size.width *0.94,
            borderBottomWidth:1,
            borderColor:'rgb(100,100,100)'
      }}></View>
      </View>
      
      
      </TouchableWithoutFeedback>
    )
  }

  //显示顶部的广告
  showTopAd = ()=>{
    return(<View style = {styles.ScollView}>
          <TextAd  navigation = {this.props.navigation}  ></TextAd>
      </View>)
  }


  //加载失败的时候显示重新加载的按钮
  showButtonReset = ()=>{
    if(this.isShowButton){
        return (
                <View 
                key = {100}
                    style = {styles.viewButton}>
                        <Text   onPress = {()=>{this.sendmeesagedthisView()}}>{'数据加载失败，点击重新加载'}</Text>
                </View>
        )
    }
  }

  //显示最后的没有更多了
  showNoMore = ()=>{
    return (
      <View style ={{height:50,width:SceneUtils.size.width,alignItems:'center',marginTop:10}}>
        <Text style = {{color:'white',marginTop:10,marginBottom:10}}>{'没有更多了'}</Text>
      </View>
    )
  }
  

  //根据数据类型  显示不同的渲染类型
  showOneLine = (data)=>{
    if('infod' in data){
      return this.showTopAd()
    }else if('noMore' in data){
      return this.showNoMore()
    }else{
      return this.showTextOne(data)
    }

  }

  render() {
    console.log(' rendoer');
    return (
        <View style = {styles.main}>
              <PullList
                  dataSource={this.state.dataSource}
                  renderRow={this.showOneLine}
                  showsVerticalScrollIndicator = {false}
                  showsHorizontalScrollIndicator = {false}
                  onPullRelease={this.onPullRelease} 
                  //topIndicatorRender={this.topIndicatorRender} 
                  topIndicatorHeight={60}
                  enableEmptySections={true}
              />
            {this.showButtonReset()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    height:SceneUtils.size.height -SceneUtils.size.height*0.048 - (DataUtil.getinstance().getVueStrByp()==='IOS'?43:0),
    width:SceneUtils.size.width,
    marginTop:SceneUtils.size.height*0.048-1 + (DataUtil.getinstance().getVueStrByp()==='IOS'?23:0),
  },
  ScollView:{
    width:SceneUtils.size.width,
    backgroundColor:'rgb(255,255,255)',
    marginBottom:10,
  },
  listOneView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:SceneUtils.size.height*0.165,
    width:SceneUtils.size.width*0.94,
  },
  leftView:{
    marginLeft:3,
    width:SceneUtils.size.width*0.66-8,
    height:SceneUtils.size.height*0.124,
  },
  rightView:{
    width:SceneUtils.size.width*0.33,
    height:SceneUtils.size.height*0.124,
    alignItems:'center',
    justifyContent:'center',
  },
  TextView:{
    width:SceneUtils.size.width*0.66,
    height:SceneUtils.size.height*0.1,
    //alignItems:'center',
    //justifyContent:'center',
  },
  texttitleStyle:{
    fontSize:16,
    marginTop:4,
    color:'white',
    fontWeight:'700',
  },
  imgv:{
    width:SceneUtils.size.width*0.33-10,
    height:SceneUtils.size.height*0.124-10,
  },
  bottomViewStyle:{
    width:SceneUtils.size.width,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 60,
    backgroundColor:'white',
    display:displayFlex,
},
viewButton:{
  position: 'absolute',
  width:200,
  height:30,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'rgb(134,184,34)',
  top:SceneUtils.size.height*0.55,
  left:SceneUtils.size.width*0.5-100
  
},
hidView:{
  display:displayNone,
},
hide: {
position: 'absolute',
left: 10000
},
show: {
position: 'relative',
left: 0,
color:'white'
}

});
