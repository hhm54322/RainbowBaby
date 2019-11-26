/**
 * Sample React Native GameComment
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
    ImageBackground,
    Image,
    ListView,
    TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils'
import NetUtil from '../../utils/NetUtil'
import DataUtil from '../../utils/DataUtil'


//游戏评论模块 已经废弃
export default class GameComment extends Component {
  constructor(props) {
    super(props);
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.mode =[]
    this.ishow = this.props.ishow
    for(var i=0;i<1;i++){
        this.mode.push({
            user:{
                id:1,
                headshot:'1',
                nickname:'s',
                mark:5,
            },
            content:'d',
            //pf:(i+5)%6,
            text:'a'
        })
    }
    this.state = {
        dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
  }

  showMessage = (mod)=>{
    var token = DataUtil.getinstance().getUserData().access_token
    let params = mod.params
    NetUtil.get(mod.url,params,{},['application/json',
    'application/json'], (responseJson) =>{
        console.log(responseJson);
        this.mode = responseJson
        if(this.mode.length === 0){
            for(var i=0;i<4;i++){
                this.mode.push({
                    user:{
                        id:1,
                        headshot:'1',
                        nickname:'你知道'+i,
                        mark:5,
                    },
                    content:'  is 那佛 i 那送到那可是你放'+
                    '打算打算打算打啊打算',
                    //pf:(i+5)%6,
                    text:'fasoidnaisonfioasndasndkjasnkfnasjkdnkajsnfkjasndklasn'
                })
            }
        }
        this.setState({
          dataSource: this.listData.cloneWithRows(this.mode),
        })
    })
  }

  showStar = (s)=>{
    console.log(s)
    var temp = []
    for(var i=0;i<5;i++){
      var image
      if(i<s){
          image = require('./images/star1.png')
      }else{
          image = require('./images/star0.png')
      }
      temp.push(
          <Image 
          key ={i}
          style = {styles.imgStr}
              source={image}
          ></Image>
      )
    }
    return temp
}

  showOneList = (data) =>{
      if(data.user.headshot === null){
        data.user.headshot = '1'
      }
      return (
        <View style = {styles.oneMainView}>
            <View style = {styles.onMadeView}>
                <View style = {styles.topview}>
                    <Text style = {[styles.tfontSize,styles.yhfont]}> {'用户评论'}</Text>
                    <Text style = {[styles.tfontSize,styles.jubfont]}> {'举报'}</Text>
                </View>
                <View style = {styles.bottomView}>
                    <View style = {styles.leftView}>
                    <Image
                      style = {styles.headImage}
                      source={data.user.headshot === '1'? require('../useful/ICON_01.png'):
                      {uri:data.user.headshot}
                    }>
                      </Image>
                    </View>
                    <View style = {styles.rightView}>
                        <Text style = {styles.nikestyle}>
                            {data.user.nickname}
                        </Text>
                        <Text style = {styles.textView2}
                            numberOfLines = {3}
                        >
                            {data.content}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
      )



    // return (
    //     <View style = {{marginTop:2}}>
    //         <View style ={styles.listoneTopView}>
    //               <View style = {{justifyContent: 'center',  
    //                   alignItems:'center',marginTop:2,}}>
    //                   <Image
    //                   style = {styles.headImage}
    //                   source={data.user.headshot === '1'? require('../useful/ICON_01.png'):
    //                   {uri:data.user.headshot}
    //                 }>
    //                   </Image>
    //               </View>
    //               <View style={{width:SceneUtils.size.width*0.78}}>
    //                   <Text>{data.user.nickname}</Text>
    //                   <View style ={{flexDirection:'row',height:SceneUtils.size.height*0.19*0.78*0.07}}>
    //                       {/* {this.showStar(data.pf)}   */}
    //                   </View>
    //               </View>
    //               <View style = {styles.jbView}>
    //                   <Text style ={{color:'rgb(120,120,120)'}}>{'举报'}</Text>
    //               </View>
    //         </View>
    //         <Text style = {styles.textView2}>
    //               {data.content}
    //         </Text>
    //     </View>
    //)
}

  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.showOneList}
            enableEmptySections={true}
        ></ListView>
    );
  }
}

const styles = StyleSheet.create({

    oneMainView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.16,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    onMadeView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.145,
        backgroundColor:'rgb(243,243,243)'
    },
    topview:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.029,
        backgroundColor:'rgb(220,220,220)',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tfontSize:{
        fontSize:10,
    },
    yhfont:{
        color:'rgb(80,80,80)',
        marginLeft:8,
    },
    jubfont:{
        color:"red",
        marginRight:10,
    },
    bottomView:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.11,
    },
    textView2:{
        marginTop:10,
        fontSize:10,
        width:SceneUtils.size.width*0.80,
        height:SceneUtils.size.height*0.10,
        color:'rgb(100,100,100)'
    },
    leftView:{
        width:SceneUtils.size.width*0.115,
        height:SceneUtils.size.height*0.11,
        alignItems: 'center',
    },
    rightView:{
        width:SceneUtils.size.width*0.7,
        height:SceneUtils.size.height*0.11,
    },
    nikestyle:{ 
        marginTop:6,
        fontSize:10,
        color:'rgb(50,50,50)'
    },
    lankuai:{
        width:3,
        height:SceneUtils.size.height*0.19*0.2*0.8,
        backgroundColor:'rgb(19,185,199)',
    },
    penImage:{
        width:SceneUtils.size.height*0.19*0.5*0.2,
        height:SceneUtils.size.height*0.19*0.5*0.2,
        marginLeft:SceneUtils.size.width*0.55,
    },
    listoneTopView:{
        height:SceneUtils.size.height*0.19*0.78*0.3,
        width:SceneUtils.size.width-10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop:2,
    },
    headImage:{
        marginTop:6,
        height:SceneUtils.size.width*0.08,
        width:SceneUtils.size.width*0.08,
    },
    jbView:{
        //marginLeft:SceneUtils.size.width*0.5,
        transform:[{translateY:-SceneUtils.size.height*0.19*0.78*0.1}],
    },

    imgStr:{
        width:SceneUtils.size.height*0.19*0.78*0.14,
        height:SceneUtils.size.height*0.19*0.78*0.14,
    },

});
