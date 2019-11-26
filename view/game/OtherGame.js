/**
 * Sample React Native OtherGame
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
  ListView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';

import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'


//other game 其他推荐游戏列表
export default class OtherGame extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id
    this.mode = []
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.backd = this.props.ontouchbanc
    for(var i=0;i<8;i++){
        this.mode.push({
            title:'老克勒棋牌',
            mark:8.9,
            tags:['艺术创造'],
            logo:'http://dasdasdad.png',
        })
    }

    this.state = {
        dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
      this.sendOtherGameMessage()
  }

  //根据游戏的id  发送消息  拿到同类型的游戏
  sendOtherGameMessage = ()=>{
    var url ='/maria/games/' +this.id +'/recommend'
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'beginId':0,'offset':5,'access_token':token};
    var mod = {
        url:url,
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:(responseJson) =>{
          //下面的就是请求来的数据
            console.log(responseJson)
            this.mode  = responseJson
            this.setState({
                dataSource: this.listData.cloneWithRows(this.mode),
            })
      }
    }
    NetService.do(NetService.sendotherGame,mod)
  }

  //点击其他游戏的回调
  touchOne = (data)=>{
    return ()=>{
        if(this.backd){
            this.backd(data.id)
        }
    }
  }

  //显示每一个item
  showOneList = (data)=>{
        return (
            <TouchableWithoutFeedback 
                onPress = {this.touchOne(data)}
            >
            <View style = {styles.listOneView}>

                 <Image
                    style = {styles.imageHeadView}
                    source={{uri:data.logo}}>
                </Image>
                <Text
                    numberOfLines ={1}
                     style = {
                    {
                        fontSize:12,
                        color:'white',
                        marginTop:13,
                        fontWeight:'700'
                    }
                }>
                    {data.title}
                </Text>
                {/* <View style = {styles.bottomView}>
                    <View style ={styles.textView} >
                        <Text style = {{color:'rgb(255,255,255)',fontSize:9}}>
                        {data.categories[0]}</Text>
                    </View>
                    <Text style = {{color:'white',
                    marginLeft:2,
                    marginRight:2,
                    fontSize:8}}>
                    {data.mark}</Text>
                    <Image
                    style = {styles.imgStar}
                    source={require('./img/bgxxb.png')}
                    >
                    </Image>
                </View> */}
            </View>
            </TouchableWithoutFeedback>
        )
  }

  render() {
    return (
      <View>
          <View style= {styles.topView}>
                <Text style = {styles.ttTextStyle}>
                    {'推荐相关游戏'}
                </Text>
          </View>
          <ListView 
                    showsHorizontalScrollIndicator={false}
                    horizontal = {true}
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneList}
                    enableEmptySections={true}
            ></ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.27*0.19,
        flexDirection:'row',
        //justifyContent: 'center',  
        alignItems:'center',
        marginBottom:8,
    },
    ttTextStyle:{
        marginLeft:13,
        fontSize:18,
        fontWeight:'900',
        color:'white',
        marginTop:6,
    },
    line:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(240,240,240)',
    },
    listOneView:{
        width:SceneUtils.size.width*0.23,
        height:SceneUtils.size.height*0.23*0.7,
        justifyContent: 'center',  
        //alignItems:'center',
        marginLeft:SceneUtils.size.width*0.03,
    },
    imageHeadView:{
        width:SceneUtils.size.width*0.23*0.9,
        height:SceneUtils.size.width*0.23*0.9,
        borderRadius:11,
    },
    bottomView:{
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'center',  
        alignItems:'center',
    },
    textView:{
        marginTop:5,
        marginBottom:5,
        width:SceneUtils.size.width*0.25*0.55,
        height:SceneUtils.size.height*0.26*0.11,
        backgroundColor:'rgb(129,184,35)',
        justifyContent: 'center',  
        alignItems:'center',
        borderRadius:4
    },
    imgStar:{
        width:SceneUtils.size.width*0.25*0.09,
        height:SceneUtils.size.width*0.25*0.09,
    },
});
