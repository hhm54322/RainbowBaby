/**
 * Sample React Native CommentView
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


//评论  已经废弃
export default class CommentView extends Component {
  constructor(props) {
    super(props);
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.mode =[]
    //this.mod = this.props.mod
    for(var i=0;i<2;i++){
      this.mode.push({
          user:{
              id:1,
              headshot:null,
              nickname:'我是老大',
              mark:5,
          },
          content:'fiasndiansifjnasidnaisnfiansidnasnfiasndiasnifnasidnasifniasndiansifnasidnaisnfiuanasindiasninasi'
          +'dasdsaadasinfioansdionasoifnaoisndoiasnofnaosindoiasniofnasiondoiasnmfmasokdnasdmaosinmoaisn',
          //pf:(i+5)%6,
          text:'dddd'
      })
    }

    this.state = {
      dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
   this.showMessage();
  }

  showMessage = (mod)=>{
    return;
    // var token = DataUtil.getinstance().getUserData().access_token
    // let params = mod.params
    // NetUtil.get(mod.url,params,{},['application/json',
    // 'application/json'], (responseJson) =>{
    //     console.log(responseJson);
    //     this.mode = responseJson
    //     if(this.mode.length === 0){
    //         for(var i=0;i<1;i++){
    //             this.mode.push({
    //                 user:{
    //                     id:1,
    //                     headshot:null,
    //                     nickname:'s',
    //                     mark:5,
    //                 },
    //                 content:'d',
    //                 //pf:(i+5)%6,
    //                 text:'a'
    //             })
    //         }
    //     }
    //     this.setState({
    //       dataSource: this.listData.cloneWithRows(this.mode),
    //     })
    // })
  }
  showOneList =(data)=>{
      return (
        <View style = {styles.mainOne}>
            <View style = {styles.showOne}>
                <View style = {styles.oneTopStyle}>
                  <Image
                        style = {styles.headImage}
                        source={data.user.headshot === null? require('./img/head.png'):
                        {uri:data.user.headshot}}
                        //source={require('./img/head.png')}
                      >
                  </Image>
                  <View style = {{width:SceneUtils.size.width*0.75}}>
                    <Text style = {styles.nikeName}>{data.user.nickname}</Text>
                  </View>
                  <Text style = {styles.jbtextView}>{'举报'}</Text>
                  
              </View>
              <View style = {styles.bottomStyle}>
                <Text style = {styles.bottomText}
                numberOfLines = {3}
                >{data.content}</Text>
              </View>
            </View>
        </View>
      )
  }

  render() {
    var mainStyle = {
        width:this.props.width,
        height:this.props.height,
    }
    return (
        <View style = {mainStyle}>
            <ListView 
                style = {{backgroundColor:'white'}}
                dataSource={this.state.dataSource}
                renderRow={this.showOneList}
                enableEmptySections={true}
            ></ListView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainOne:{
    height:SceneUtils.size.height*0.16,
    width:SceneUtils.size.width,
    marginTop:7,
    alignItems:'center',
    justifyContent:'center',
  },
  showOne:{
    height:SceneUtils.size.height*0.158,
    width:SceneUtils.size.width*0.97,
    backgroundColor:'rgb(238,238,238)',
    alignItems:'center',
    justifyContent:'center',
  },
  oneTopStyle:{
    flexDirection:'row',
    marginTop:6,
    height:SceneUtils.size.height*0.06,
    width:SceneUtils.size.width*0.97,
  },
  bottomStyle:{
    height:SceneUtils.size.height*0.07,
    width:SceneUtils.size.width*0.97,
  },
  bottomText:{
    marginLeft:16,
    height:SceneUtils.size.height*0.06,
    width:SceneUtils.size.width*0.8,
    color:'rgb(50,50,50)',
    fontSize:10,
  },

  headImage:{
    height:SceneUtils.size.width*0.085,
    width:SceneUtils.size.width*0.085,
    marginLeft:8,
},
nikeName:{
  marginTop:4,
  marginLeft:16,
  fontSize:13,
},
jbtextView:{
  marginTop:6,
  fontSize:10,
  color:'red',
},

});
