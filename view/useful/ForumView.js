/**
 * Sample React Native ForumView
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

//论坛 废弃    以后会重做
export default class ForumView extends Component {
  constructor(props) {
    super(props);
    this.mode = []
    this.touchBack = this.props.touchBack
    for(var i = 0;i<1;i++){
      this.mode.push({
        title:' nihao de dada',
        commentCount:89,
        readingCount:1345,
        postImg:'http:/d/d/d.png'
      })
    }
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }

  resetMessageBack = (responseJson)=>{
    console.log(responseJson)
    this.mode = responseJson
    this.setState({
      dataSource: this.listData.cloneWithRows(this.mode),
    })
  }

  componentDidMount(){
    return

    // var dataed = DataUtil.getinstance().getDateByTypeHlep(4,(data)=>{})
    // if(dataed !== null){
    //     this.resetMessageBack(dataed)
    //     return 
    // }


    // var token = DataUtil.getinstance().getUserData().access_token
    // let params = {'access_token':token,'beginId':0,'offset':20,'essential':false};
    // NetUtil.get('/maria/bbs/forums/1/posts',params,{},['application/json',
    // 'application/json'], (responseJson) =>{
    //     //下面的就是请求来的数据
    //     console.log(responseJson);
    //     this.mode = responseJson
    //     DataUtil.getinstance().setDataByType(4,responseJson)
    //     this.setState({
    //       dataSource: this.listData.cloneWithRows(this.mode),
    //     })
    // })
  }

  touchOne = (id)=>{
    if(this.touchBack){
      this.touchBack(id)
    }
  }

  showOneLine = (data)=>{
  
    return (
      <TouchableWithoutFeedback
      onPress = {this.touchOne.bind(this, data.id)}
      >
      <View style = {styles.listOneView}>
          <View style = {styles.rightView}>
              <Image 
              style= {styles.imgv}
              source={{uri:  data.postImg === ''? 'http://attimg.dospy.com/img/day_090619/20090619_03bb2474b2657bfc1a771ttcHsDm8tho.png':data.images}}>
              </Image>
          </View>
          <View style= {styles.leftView}>
              <View style = {styles.TextView}>
                <Text style={styles.texttitleStyle}>{data.title}</Text>
              </View>
              <View style ={styles.pfView}>
                  <Image 
                  style = {styles.imageSpeek}
                  source = {require('./img/shuohua.png')}
                  ></Image>
                  <Text style ={{color:'rgb(100,100,100)',fontSize:SceneUtils.size.width*0.66*0.05,}}>
                    {'  '+data.commentCount+'  阅览: '+data.readingCount}
                  </Text>
              </View>
          </View>
      </View>
      </TouchableWithoutFeedback>
    )
    
  }

  render() {
    return (
        <View style = {styles.main}>

            <Text style ={{color:'white'}}>{'暂未开放'}</Text>
            {/* <View style= {styles.listView}>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.showOneLine}
                  enableEmptySections={true}
              />
            </View> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    height:SceneUtils.size.height -100,
    width:SceneUtils.size.width,
    marginTop:SceneUtils.size.height*0.048-1 + (DataUtil.getinstance().getVueStrByp()==='IOS'?23:0),

    alignItems:'center',
    justifyContent:'center',
  },
  ScollView:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.3,
  },
  listView:{
    width:SceneUtils.size.width,
    height:SceneUtils.size.height*0.52,
  },
  listOneView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:SceneUtils.size.height*0.125,
    width:SceneUtils.size.width,
    borderBottomWidth:1,
    borderColor:'rgb(180,180,180)'
  },
  leftView:{
    width:SceneUtils.size.width*0.66,
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
    marginTop:11,
    fontSize:13,
    fontWeight:'700',
  },
  pfView:{
    flexDirection:'row',
    //alignItems:'center',
    justifyContent:'center',
    width:SceneUtils.size.width*0.66,
    height:SceneUtils.size.height*0.022,
    marginBottom:3,
  },
  imgv:{
    width:SceneUtils.size.width*0.33-10,
    height:SceneUtils.size.height*0.124-10,
  },
  imageSpeek:{
    marginLeft:SceneUtils.size.width*0.2,
    width:16,
    height:16
  },

});
