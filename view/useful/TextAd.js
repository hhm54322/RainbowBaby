/**
 * Sample React Native TextAd
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
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'
import Swiper from 'react-native-swiper';


//文本广告  内容和游戏广告一样  
import NetService from '../../utils/NetService'
export default class TextAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adar:[],
    }

  }
  componentWillMount(){

  }
  componentDidMount(){
    this.sendAdvertisementmessage()
  }

  //发送给广告请求
  sendAdvertisementmessage = ()=>{
    // var token = DataUtil.getinstance().getUserData().access_token
    // let params = {'beginId':0,'offset':50,'target':'discover' ,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
    // var mod1 = {
    //     type:'get',
    //     url:'/maria/advertisement',
    //     params:params,
    //     params1:{},
    //     headers:['application/json','application/json'],
    //     callback:this.showAd
    // }
    // this.netutil.pushMessage(mod1)



    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'beginId':0,'offset':4,'target':'careChoice' ,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
      var mod = {
          params:params,
          params1:{},
          headers:['application/json','application/json'],
          callback:(responseJson) =>{
            //下面的就是请求来的数据
            console.log(responseJson)
            if(responseJson === null){
              return
            }
            setTimeout(()=>{
              this.setState({
                adar:responseJson,
              })
          },1)
        }
      }
    NetService.do(NetService.sendadvertisement,mod)
}   


//点击跳转到游戏
toGame = (data)=>{
  if(data.gameVo != null){
      const { navigate } = this.props.navigation;
      navigate('Game',{ info:{id:data.gameVo.id}})
  }

}

//滚动图里面每一个显示对象
  showAdImage = ()=>{
    var temp = []
    var data = this.state.adar
    if(data === null){
      return
    }
    if(this.state.adar === null){
      return
    }
    console.log('data')
    console.log(data)
    var len = data.length
    for(var i = 0 ; i<len ;i++){
      temp.push(
      <View key = {i}
        style = {{alignItems:'center',justifyContent:'center'}}
      >
      <TouchableWithoutFeedback
          onPress={this.toGame.bind(this, data[i])}>
        <Image
            style = {styles.adImageView}
            source={{uri:data[i].referenceImg}}>
        </Image>
        </TouchableWithoutFeedback>
      </View>
      )
    }
    return temp
  }

  

  //显示滚动图对象
  showreder = ()=>{
    var data = this.state.adar
    var isNo = false
    if(data === null){
      isNo = true
    }
    if(data.length <= 0){
      isNo = true
    }
    if(isNo){
      return (<Image
        style = {styles.adImageView2}
        source={require('../discover/img/2.png')}>
    </Image>)
    }
    return (
      <Swiper 
        key = {this.state.adar.length}
        style={styles.wrapper} 
        autoplay={true}
        loop = {true}
        index = {0}
        removeClippedSubviews={false}
        //showsButtons={true}
        paginationStyle={styles.paginationStyle}
        //dotStyle={styles.dotStyle}
        //activeDotStyle={styles.activeDotStyle}
        >
        {this.showAdImage()}
      </Swiper>
    )
    
  }

  render() {
    //"react-native-swiper": "^1.5.13",
    return (
        <View>
            {this.showreder()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{

  },
  wrapper:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.29,
  },
  adImageView:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.29,
    resizeMode:'stretch',
  },
  adImageView2:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.29,
    resizeMode:'stretch',
    backgroundColor:'rgb(51,51,51)'
  },

  paginationStyle: {
    bottom:8,
  },
   dotStyle: {
    width: 10,
    height:10,
    backgroundColor: '#fffaa1',
    opacity: 0.4,
    borderRadius: 0,
  },
  activeDotStyle: {
    width: 10,
    height:10,
    backgroundColor: 'rgb(10,10,10)',
    borderRadius: 0,
  },
});
