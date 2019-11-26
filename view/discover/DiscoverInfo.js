/**
 * Sample React Native DiscoverInfo
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
  findNodeHandle,
  Dimensions,
  Image,
  ImageBackground,
  ListView,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'


import GameImageMain from './GameImageMain'


import NetService from '../../utils/NetService'

const displayNone  = 'none'
const displayFlex  = 'flex'

//发现界面详情
export default class DiscoverInfo extends Component {
  constructor(props) {
    super(props);
    this.moded = this.props.navigation.state.params.info.data

    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});//listviewdata
    this.mode =[]//显示listview的数据源

    this.DisInfo = {} //接受服务器发送过来的数据
    this.games = [] //显示详情里面的游戏列表
    this.isOne = false    //是否是第一个  排版用的
    

    this.adindex = 0    //当前数量 和下表
    this.isrefrenshow = true    //是否刷新显示
    this.bottomView     //上啦刷新用的
    this.bottomView2    //上啦刷新用的   后来这个需求不用了  就遗留下来了
    this.isNotHaveMore = false  //同上 不用了
    

    this.state = {
      dataSource: this.listData.cloneWithRows(this.mode),
      background:'http://aad.png',
      data:{
        title:'老克勒棋牌',         //名字
        logo:'http://aad.png',    //logo
        introduction:'山东 i 那是你发来看的快拉上你的快乐那可怜的哪里看到那可怜的那段克拉深南东路看到但看了看淡',  //描述
        tags:[{title:'智力开发'},{title:'社交礼仪'}],     //tag 
        mark:8.9,                 //评分
        ranking:1000,             //暂时废弃了
      }
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
      ///maria/topics/${topicId}?beginId=${beginId}&offset=${offset}&access_token=${access_token}
      //发送消息 获取详情
      var id = this.moded.id
      var token = DataUtil.getinstance().getUserData().access_token
      let params = {'beginId':0,'offset':10,'selection':false,'access_token':token};
      var mod = {
          url:'/maria/topics/'+id,
          params:params,
          params1:{},
          headers:['application/json','application/json'],
          callback:this.showInfo
      }

      var farry = []
      var dataArry = []
      farry.push(NetService.senddicaverInfo)
      dataArry.push(mod)
  
      NetService.doArry(farry,dataArry)
  }

  //发送消息回调
  showInfo = (responseJson)=>{
    console.log(responseJson)
    this.DisInfo = responseJson
    this.games = responseJson.games
    this.getallmessagetodata()
  }


  //显示标签
  showpblist = ()=>{
    var temp = [];
    var len = this.state.data.tags.length
    len = len>3?3:len;
    for(var i = 0 ;i<len; i++){
      temp.push(
        <View
          key = {i}
          style = {styles.bbgstyle}
        >
          <Text 
          style = {styles.pbtextStyle}> {this.state.data.tags[i].title} </Text>
        </View>
      )
    }
    return temp
  }


  //显示中间游戏的模块相关
  showImdow = (data)=>{
      return (
      <View style = {styles.milView} >
        <View style = {styles.leftmidView}>
            <Image
                style = {styles.headImage}
                source={{uri:data.logo}}>
            </Image>
        </View>
        <View style = {styles.rightView}>
            <Text 
            numberOfLines = {1}
            style = {styles.gametitle}>
              {data.title}
            </Text>
            {/* <Text style = {styles.textStyle}
            numberOfLines = {3}
            >
              {data.introduction}
            </Text> */}
            <View style = {styles.pbview}>
              {this.showpblist()}
            </View>
        </View>
        {/* <ImageBackground  
              source = {require('./img/pfbg.png')}
              style = {styles.pfImageStyle}
        >
          <Text style = {styles.pfText}>{data.mark.toFixed(1)}</Text>
        </ImageBackground> */}
      </View>)
  }

  //线条
  showLine = ()=>{
    return(
      <Image
      style = {{width:SceneUtils.size.width*0.95,marginTop:30}}
      source = {require('./img/line_01.png')}
      ></Image>
    )
  }

  //跳转到游戏详情界面
  togame = (data)=>{
    const { navigate } = this.props.navigation;
        navigate('Game',{ info:{id:data.id}})
  }

  //显示game相关
  showGameInfode = (data)=>{
    //style = {styles.gameInfoView}
    var numberd = this.isOne?0.20:0
    this.isOne = true
    return ( 
      <TouchableWithoutFeedback
        onPress = {this.togame.bind(this,data)}
      >
        <View style ={{alignItems:'center',justifyContent:'center', marginTop:30}}>
          <View style = {styles.gameMainView}>
              <GameImageMain data = {data}></GameImageMain>
              <View ></View>
              {this.showImdow(data)}
            
          </View>
          {this.showLine()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  //显示top的图片和背景色
  showTopViewdataBg = ()=>{
    return (
      <View style = {styles.topView}>
          <ImageBackground 
            resizeMode = {'stretch'}
            style = {styles.bgImga2}
            source={require('./img/1.png')}
           >
            <Image
              style = {styles.bgImga}
              source={{uri:this.DisInfo.background}}>
            </Image>
          </ImageBackground>
        </View>
    )
  }

  //显示文字
  showTextInfo = ()=>{
    return (<View style = {{alignItems:'center',justifyContent:'center',
      height:SceneUtils.size.height*0.2,
    }}>
      <Text style = {{width:SceneUtils.size.width*0.90,color:'white',textAlign:'center',fontSize:18}}>{this.DisInfo.content}</Text>
    </View>)
  }

  //根据对象拼接显示不同的类容
  showOneList = (data)=>{
    if('infod' in data){
      return this.showTopViewdataBg()
    }else if('text' in data){
      return this.showTextInfo()
    }else if('qq' in data){
      if(data.qq.q === 1){
          return this.showqq()
      }else{
          return this.showqq2()
      }
  }else{
      return this.showGameInfode(data)
    }


    
    if(data.phone[0].url_1  === null){
        data.phone[0].url_1 = 'http://d.png'
    }
    return (
        <View style = {styles.listOne}>
            <View style = {styles.listOneMain}>
                <Image
                    style = {styles.headImg}
                    source={{uri:data[0].url_1}}>
                </Image>
            </View>
        </View>
    )
}

//根据数据  组装成不同的类型  
getallmessagetodata = ()=>{
  var maxlen = this.games.length
  var isqq1 = maxlen <= this.adindex? true:false
  var len = this.mode.length
  var adc = len===0?true:false
  if(adc){
    this.mode.push({infod:{}})
    this.mode.push({text:{}})
  }
  var max = this.adindex + 1000
  for(;this.adindex<max ;this.adindex++){
      if(maxlen>this.adindex){
          this.mode.push(this.games[this.adindex])
      }else{
          break;
      }
  }
  var modedd = []
  modedd = modedd.concat(this.mode)
    modedd.push({
          qq:{q:2}
      })
  this.setState({
      dataSource: this.listData.cloneWithRows(modedd),
      isShow:false,
  })
  this.isrefrenshow = false

  return isqq1
}

//不需要了

showqq = ()=>{
  return(<View key = {135} ref = {ref=>this.bottomView = ref}
   style={styles.hidView}>
          <ActivityIndicator size="small" color="white" />
          <Text style = {{fontSize:12,color:'white'}}>{'加载中...'}</Text>
      </View>)
}

//不需要
showqq2 = ()=>{
  return(<View key = {188} ref = {ref=>this.bottomView2 = ref}
      style={styles.bottomViewStyle}>
             <Image
                //style = {}
                style = {{height:20,width:SceneUtils.size.width*0.76,resizeMode:'cover',
                height:SceneUtils.size.width*0.75/2248*136,}}
                source = {require('./img/end.png')}
            ></Image>
         </View>)
}

//不需要
onPullRelease=(resolve)=>{
  return
  setTimeout(() => {
      this.isNotHaveMore = false
          resolve();
          this.bottomView2 && this.bottomView2.setNativeProps({style: styles.hidView});
      }, 2000);
}

//不需要
listEndback = ()=>{
  return
    if(this.isNotHaveMore){
        return
      }
      if(this.isrefrenshow){
          return
      }
    if(this.isrefrenshow || !this.bottomView){
        return
    }
    this.isrefrenshow = true
    setTimeout(() => {
      this.isNotHaveMore = this.getallmessagetodata();
      setTimeout(() => {
          this.bottomView && this.bottomView.setNativeProps({style: styles.hidView});
          if(this.isNotHaveMore){
              this.bottomView2 && this.bottomView2.setNativeProps({style: styles.bottomViewStyle});
          }
      }, 1);
  }, 1000);
  
  if(this.bottomView){
      setTimeout(() => {
          this.bottomView && this.bottomView.setNativeProps({style: styles.bottomViewStyle});
      }, 1);
  }
}

//不需要
topIndicatorRender = (pulling, pullok, pullrelease) =>{
  setTimeout(() => {
    if (pulling) {
        this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
        this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
    } else if (pullok) {
        this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
        this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
    } else if (pullrelease) {
        this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
        this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
    }
}, 1);
return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
        <ActivityIndicator size="small" color="white" />
        <Text ref={(c) => {this.txtPulling = c;}} style={styles.hide}>{'下拉加载...'}</Text>
        <Text ref={(c) => {this.txtPullok = c;}} style={styles.hide}>{'松开进行加载...'}</Text>
        <Text ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>{'加载中...'}</Text>
    </View>
);
}


  render() {
    var mainS = [styles.main]
    if('backRgb' in this.DisInfo){
      console.log('this.DisInfo')
      mainS.push({backgroundColor:this.DisInfo.backRgb})
    }
    return (
      <View style ={mainS}>

        <ListView 
          showsVerticalScrollIndicator = {false}
          showsHorizontalScrollIndicator = {false}
          onPullRelease={this.onPullRelease} 
          topIndicatorRender={this.topIndicatorRender} 
          topIndicatorHeight={60}
          dataSource = {this.state.dataSource}
          renderRow = {this.showOneList}
          enableEmptySections={true}
          onEndReached = {this.listEndback}
          onEndReachedThreshold = {1}                    
                  />
        {/* <View style = {styles.topView}>
          <Image
              style = {styles.bgImga}
              source={{uri:this.state.background}}>
          </Image>
        </View>
        {this.showImdow()}
        <View style = {styles.bottomView}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.showOneList}
                enableEmptySections={true}
            ></ListView>                
        </View> */}

        <TouchableWithoutFeedback
                onPress = {()=>{
                    this.props.navigation.goBack();
                }}
            >
            <Image 
            style = {styles.closeImage}
            source = {require('../../utils/img/close.png')} 
            ></Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
  },
  bgImga:{
    height:SceneUtils.size.width*422/750,
    width:SceneUtils.size.width,
  },
  bgImga2:{
    height:SceneUtils.size.width*422/750,
    width:SceneUtils.size.width,
  },
  topView:{
    height:SceneUtils.size.width*422/750,
    width:SceneUtils.size.width,
  },
  milView:{
    flexDirection:'row',
    height:SceneUtils.size.height*0.09,
    width:SceneUtils.size.width,
    marginTop:SceneUtils.size.height*0.01,
  },

  gameMainView:{
    paddingBottom:SceneUtils.size.height*0.01,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'rgb(240,240,240)',
  },

  gameInfoView:{
    height:SceneUtils.size.height*0.36,
  },
  bottomView:{
    borderTopWidth:1,
    borderColor:'rgb(230,230,230)',
    height:SceneUtils.size.height*0.39,
    width:SceneUtils.size.width,
  },
  leftmidView:{
    width:SceneUtils.size.width*0.15,
    height:SceneUtils.size.width*0.15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9,
    marginLeft:11,
    backgroundColor:'rgb(230,230,230)'
  },
  rightView:{
    height:SceneUtils.size.width*0.15,
    width:SceneUtils.size.width*0.6,
    justifyContent:'space-between',
    marginLeft:11,
  },
  gametitle:{
    fontSize:21,
    color:'white',
    fontWeight:'900',
    width:SceneUtils.size.width*0.7,
    fontFamily:'MicrosoftYaHei'
  },
  listOne:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.27,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'rgb(245,245,245)',
},
listOneMain:{
    marginTop:4,
    width:SceneUtils.size.width*0.92,
    height:SceneUtils.size.height*0.25,
    marginBottom:4,
    borderRadius:16,
},
headImg:{
  width:SceneUtils.size.width*0.92,
  height:SceneUtils.size.height*0.25,
  borderRadius:15,
},
  textStyle:{
    marginTop:5,
    fontSize:8,
    width:SceneUtils.size.width*0.6,
    height:SceneUtils.size.height*0.04,
    color:'white'
  },
  pbview:{
    flexDirection:'row',
    alignItems:'center',
    //justifyContent:'center',
    height:SceneUtils.size.height*0.035,
    width:SceneUtils.size.width*0.6,
  },
  bbgstyle:{
    width:SceneUtils.size.width*0.15,
    height:SceneUtils.size.height*0.03,
    marginRight:9,
    borderRadius:2,
    borderWidth:1,
    borderColor:'rgb(128,184,34)',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(128,184,34)'
  },
  pbtextStyle:{
    fontSize:9,
    color:'white',
    fontWeight:'700',
  },
  pfImageStyle:{
    width:SceneUtils.size.width*0.15,
    height:SceneUtils.size.width*0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:7,
  },
  pfText:{
    fontSize:17,
    color:'white',
    fontWeight:'900'
  },
  headImage:{
    width:SceneUtils.size.width*0.15,
    height:SceneUtils.size.width*0.15,
    borderRadius:10,
  },
  rightUp:{
    flexDirection:'row',
    alignItems:'flex-end',
    height:SceneUtils.size.height*0.04,
    width:SceneUtils.size.width*0.8,
    justifyContent:'space-between',
    marginLeft:4,
  },
  bqOneView:{
    borderWidth:1,
    borderColor:'rgb(19,185,199)',     //#13B9C7
    justifyContent: 'center',
    alignItems: 'center',
    margin:2,
    paddingTop:4,
    paddingBottom:4,
    paddingLeft:2,
    paddingRight:2,
    borderRadius: SceneUtils.size.height*0.06*0.2,
},
dowTextView:{
  width:SceneUtils.size.width*0.8,
  height:SceneUtils.size.height*0.04,
  fontSize:SceneUtils.size.width*0.03,
  color:'rgb(170,170,170)',
},
  bottomPView:{
    position: 'absolute',
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    bottom:10,
    right:10,
    height:SceneUtils.size.height*0.09,
    width:SceneUtils.size.width-6,
    //justifyContent:'flex-end',
  },
  xxImageView:{
    height:15,
    width:15,
    marginLeft:4,
    marginRight:4,
  },

  bottomViewStyle:{
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 255,
    display:displayFlex,
},
hidView:{
    display:displayNone,
},hide: {
  position: 'absolute',
  left: 10000
},
show: {
  position: 'relative',
  left: 0,
  color:'white'
},
closeImage:{
  position: 'absolute',
  width:30,
  height:30,
  top:10,
  left:10
},

});
