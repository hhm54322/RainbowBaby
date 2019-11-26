/**
 * Sample React Native Mp3View
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
  ImageBackground,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils'
import DataUtil from '../../utils/DataUtil'
import Video from 'react-native-video'
import {PullList} from 'react-native-pull';

import NetService from '../../utils/NetService'

const displayFlex  = 'flex'
const displayNone  = 'none'

//mp3界面
export default class Mp3View extends Component {
  constructor(props) {
    super(props);
    this.mode = []      //lsitview渲染的数据源
    this.isShowButton= false    //是否显示重新加载按钮
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.alldata = [];    //所有数据  临时对象
    this.firstSend = 10;      //初始化数据条数
    this.addSend = 10;        //每次请求增加多少条数
    this.maxSmod = 20;        //最大保存的条目数量
    this.state = {
      dataSource: this.listData.cloneWithRows(this.mode),   //listview渲染远
      pid:-1,     //当前点击id
      videoSc:'http://dsadadas/dad/da',         //播放的链接
      paused:true,        //是否暂停
      title:'abcde',      //名字
      alltime:20,         //所有的时间
      nowTime:30,         //当前的时间
      isShowButtonNow:false     //是否显示重新加载按钮
    }
  }
  componentWillMount(){

  }

  //如果没有数据 显示重新加载按钮 表示加载失败
  showButtonReset = ()=>{
    if(this.state.isShowButtonNow){
        return (
                <View 
                key = {1809}
                    style = {styles.viewButton}>
                        <Text   onPress = {()=>{this.sendemeeage()}}>{'数据加载失败，点击重新加载'}</Text>
                </View>
        )
    }
  }


  //消息返回
  messageBack = (responseJson,is)=>{
    console.log(responseJson)
    this.getMessageThenToSetMod(responseJson)
  }

  //根据返回的消息内容  放入mode 里面 用来给listview渲染

  getMessageThenToSetMod = (responseJson)=>{
      this.isShowButton = false
      this.mode = []
      this.mode = responseJson
      this.mode = this.mode.concat(this.alldata)
      this.alldata = this.mode
      if(this.mode.length > this.maxSmod){
        this.mode = this.mode.slice(0,this.maxSmod)
        console.log(this.mode)
      }
      if(this.mode.length > 0){
        var time = new Date()
        var savestr = {
          time:time.getTime(),
          data:this.mode
        }
        var strdd = JSON.stringify(savestr)
        DataUtil.getinstance().setDataByType(3,JSON.parse(strdd))
        this.mode.push({
          noMore:1
        })
      }else{
        this.isShowButton = true
      }
      var adf = true
      var len = this.mode.length 
      for(var i = 0;i<len;i++){
        if(this.state.pid === this.mode[i].id){
          adf = false
          break
        }
      }
      this.setState({
        dataSource: this.listData.cloneWithRows(this.mode),
        isShowButtonNow:this.isShowButton,
        paused:adf
      })
  }


  //发送消息
  sendemeeage = ()=>{

    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token,'offset':10};
    var mod = {
        type:'get',
        url:'/maria/boardcast',
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:this.messageBack
    }

    var farry = []
    var dataArry = []
    farry.push(NetService.sendboardcast)
    dataArry.push(mod)

    NetService.doArry(farry,dataArry)
  }

  //存数据 如果时间大于3*60*60*1000  或者没有数据 就发送洗消息  不然就直接显示
  savegetBack = (data)=>{
    console.log(data)
    if(data != null){
      this.alldata = data.data
      var timenow = new Date()
      console.log(timenow.getTime())
      console.log((timenow.getTime() - data.time))
      //3*60*60*1000
      if(timenow.getTime() - data.time > 3*60*60*1000){
        this.sendemeeage()
        return
      }else{
        this.getMessageThenToSetMod([])
      }
    }else{
      this.sendemeeage()
    }
  }

  //拿取本地数据
  componentDidMount(){
    DataUtil.getinstance().getDateByTypeHlep(3,this.savegetBack)
    //this.sendemeeage()
  }

  //显示时间
  showTime (time){
    var timed = time
    var f = parseInt(timed/60)
    var m =  parseInt(timed%60) 
    return (f+':'+m).toString()
  }

  //点击播放或者暂停
  touchppBack = (data)=>{
      return ()=>{
          var tid = data.id
          var pausedd = false
          if(data.id === this.state.pid){
            tid = -10;
            pausedd = true;
          }
          this.setState({
            pid:tid,
            videoSc:data.link,
            paused:pausedd,
            title:data.title,
            alltime:data.duration,
            nowTime:this.showTime(data.duration),
            dataSource: this.listData.cloneWithRows(this.mode),
            
          })
          console.log('touchppBack   is   enter')
      }
  }

  //显示右边那一部分 播放按钮等
  showright = (data)=>{
    var rei = data.id === this.state.pid?require('./z.png'):require('./f.png')
    var color = data.id === this.state.pid?'rgb(134,183,34)':'rgb(200,200,200)'
    return (
    <TouchableWithoutFeedback onPress ={this.touchppBack(data)}>
      <View style ={[styles.rightView,{backgroundColor:color}]}>
        <Image
              style = {styles.ffImg}
              source={rei}>
          </Image>
      </View>
    </TouchableWithoutFeedback>
    )
  }


  //
  showMp3One = (data)=>{
    return (
      <View style= {styles.listOneView}>

        <View style = {styles.leftView}>
            <Image
                style = {styles.headImg}
                source={{uri:data.images}}>
            </Image>
        </View>
        
        <ImageBackground
          source  ={require('./img/bgg.png')}
          style = {styles.imageBackgroundStyle}>
            <View style ={styles.mmView}>
                  <Text style = {styles.textStyle}>{data.title}</Text>
            </View>
            {this.showright(data)}
        </ImageBackground>
        
      </View>
    )
  }

  //显示底部 没有跟多了
  showNoMore = ()=>{
    return (
      <View style ={{height:30,width:SceneUtils.size.width,alignItems:'center',borderTopWidth:1,borderColor:'rgb(150,150,150)',marginTop:10}}>
          <Text style = {{color:'white',marginTop:10}}>{'没有更多了'}</Text>
      </View>
    )
  }

  //listview显示
  showOneLine = (data) => {
      if('noMore' in data){
        return this.showNoMore()
      }else{
        return this.showMp3One(data)
      }
  }

  //播放进度  显示时间
  _onProgress = (e)=>{
      this.setState({
        nowTime:this.showTime(this.state.alltime - e.currentTime)
      })
  }

  //显示底部横条正在播放等内容
  showIng = ()=>{
    console.log(this.state.nowTime)
    var dis = !this.state.paused? displayFlex:displayNone
    return (
      <View style = {[styles.ingppView,{display:dis}]}>
        <Text style = {{marginLeft:6}}>
          {' 正在播放: '}
        </Text>
        <Text>{this.state.title}</Text>
        <Text>{'  '+this.state.nowTime}</Text>
      </View>
    )
  }


  //下拉回调
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
          this.getMessageThenToSetMod(responseJson)
          resolve();
      }
    }
    NetService.do(NetService.sendboardcast,mod)
  }

  render() {
    return (
        <View style = {styles.main}>
             {/* <ListView
                dataSource={this.state.dataSource}
                renderRow={this.showOneLine}
                enableEmptySections = {true}
            /> */}
            <PullList 
                    style  = {{width:SceneUtils.size.width}}
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    onPullRelease={this.onPullRelease} 
                    topIndicatorHeight={60}
                    //topIndicatorRender={this.topIndicatorRender} 
                    dataSource = {this.state.dataSource}
                    renderRow = {this.showOneLine}
                    enableEmptySections={true}
                 />

            <Video 
              source={{ uri: this.state.videoSc}}
              paused={this.state.paused}
              onProgress={(e) => this._onProgress(e)}   //  进度控制，每250ms调用一次，以获取视频播放的进度
            >
            </Video>
            {this.showIng()}
            {this.showButtonReset()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:SceneUtils.size.height*0.048-1 + (DataUtil.getinstance().getVueStrByp()==='IOS'?23:0),
  },
  ingppView:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    height:SceneUtils.size.height*0.03,
    width:SceneUtils.size.width,
    backgroundColor:'rgb(240,240,240)',
    alignItems:'center',
    //justifyContent:'center',
  },
  listOneView:{
    flexDirection:'row',
    alignItems:'center',
    //justifyContent:'center',
    width:SceneUtils.size.width,
    height:SceneUtils.size.width*0.9*0.11,
    marginTop:10,
    marginBottom:10,
  },
  imageBackgroundStyle:{
    flexDirection:'row',
    top:0,
    left:SceneUtils.size.width*0.05,
    position: 'absolute',
    height:SceneUtils.size.width*0.9*0.11,
    width:SceneUtils.size.width*0.9,
  },

  leftView:{
    width:SceneUtils.size.height*0.06,
    height:SceneUtils.size.width*0.9*0.09,
    marginLeft:6,
  },
  mmView:{
    width:SceneUtils.size.width*0.65-14,
    height:SceneUtils.size.width*0.9*0.11,
    //alignItems:'center',
    justifyContent:'center',
    marginLeft:50,
    marginTop:-4,
  },
  textStyle:{
    marginTop:8,
    fontSize:13,
    color:'rgb(60,60,60)',
  },
  rightView:{
    position: 'absolute',
    width:SceneUtils.size.width*0.13,
    height:SceneUtils.size.width*0.9*0.11,
    right:0,
    alignItems:'center',
    justifyContent:'center',
  },
  ffImg:{
    width:SceneUtils.size.width*0.1*0.35,
    height:SceneUtils.size.width*0.1*0.35,
  },
  headImg:{
    width:SceneUtils.size.height*0.11,
    height:SceneUtils.size.width*0.9*0.1,
    //borderRadius:SceneUtils.size.width*0.07,
    resizeMode:'stretch',
    marginLeft:15,
    marginTop:-3,
  },
  viewButton:{
    position: 'absolute',
    width:200,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(134,184,34)',
    top:SceneUtils.size.height*0.50,
    left:SceneUtils.size.width*0.5-100
    
  },
});
