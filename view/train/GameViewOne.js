'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';

//游戏  暂时废弃
export default class GameViewOne extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data.game
        // this.data = {
        //     id:1000,
        //     logo:"/game/log/1000.jpg",
        //     title:"王者荣耀",
        //     mark:6,
        //     minAge:3,
        //     price:6,
        //     tags:[{"id":1,"title":"新品推荐"},{"id":2,"title":"0岁精品"}],
        // }

    }
    componentDidMount(){

    }

    showStar = (s)=>{
        var temp = []
        for(var i=0;i<5;i++){
          var image
          if(i<s){
              image = require('../game/img/bgxxb.png')
          }else{
              image = require('../game/img/bgkxx.png')
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
  
    showbqListView =(arr)=>{
          var temp = []
          var len = arr.length
          for(var i=0;i<len;i++){
              temp.push(
                  <View 
                  key = {i}
                  style = {styles.bqOneView}>
                      <Text style = {{fontSize:10,color:'white'}} >
                      {arr[i].title}</Text>
                  </View>
              )
          }
          return temp
      }

    
    render() {
        var data = this.data
        //rgb(238,176,99)
        if(this.state.is === true){
            this.props.data.trained = 1
        }
        var textd = this.props.data.trained === 0?'训练宝宝':'已完成'
        var bac = this.props.data.trained === 0? {backgroundColor:'rgb(143,184,34)'}:{backgroundColor:'rgb(238,176,99)'}
        return (
            <TouchableWithoutFeedback
                onPress = {()=>{

                }}
            >
            <View style={styles.mainView}>
                <View style = {styles.centerView}>
                    <View style = {styles.leftView}>
                        <View style = {styles.leftView2}>
                                <Image style = {styles.imageView}
                                source={{uri:data.logo}}
                                >
                                </Image>
                        </View>
                        <View style = {styles.centerView2}>

                                <Text style = {styles.titletextStyle}
                                numberOfLines = {1}
                                    >{data.title}
                                </Text>
                                <View style = {{flexDirection:'row',marginTop:6}}>
                                    {this.showStar(data.mark/2)}
                                    <Text style = {styles.marltext}>{data.mark}</Text>
                                </View>
                                <View style = {styles.bottomView}>
                                    {this.showbqListView(data.tags)}
                                </View>
                                
                        </View>

                    </View>
                    <View style = {[styles.btnView,bac]}>
                            <Text style = {styles.fontxl}>{textd}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'rgb(240,240,240)'
    },
    centerView:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.26,
        borderRadius:12,
        backgroundColor:'rgb(150,150,150)',
    },
    leftView:{
        flexDirection:'row',
        marginTop:SceneUtils.size.height*0.14,
        width:SceneUtils.size.width*0.65,
    },
    leftView2:{
        marginLeft:3,
        width:SceneUtils.size.width*0.2,
        height:SceneUtils.size.height*0.12,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    imageView:{
        width:SceneUtils.size.width*0.2-10,
        height:SceneUtils.size.width*0.2-10,
        borderRadius:8,
        backgroundColor:'white'
    },
    centerView2:{
        marginLeft:3,
        marginRight:3,
        marginTop:4,
        width:SceneUtils.size.width*0.6-13,
        height:SceneUtils.size.height*0.12,
    },
    imgStr:{
        width:SceneUtils.size.width*0.2*0.13,
        height:SceneUtils.size.width*0.2*0.13,
    },
    titletextStyle:{
        marginTop:6,
        fontSize:16,
        fontWeight:'700',
        width:SceneUtils.size.width*0.4,
        color:'white',
    },
    marltext:{
        marginLeft:6,
        fontSize:10,
        color:"white"
    },
    bottomView:{
        flexDirection:'row',
        //justifyContent: 'center',  
        alignItems:'center', 
    },

    bqOneView:{
        borderWidth:1,
        borderColor:'rgb(128,184,34)',     //#13B9C7
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:4,
        marginTop:6,
        borderRadius: SceneUtils.size.height*0.06*0.1,
        paddingLeft:4,
        paddingRight:4,
        height:SceneUtils.size.height*0.12*0.25,
    },
    btnView:{
        position: 'absolute',
        right:12,
        bottom:10,
        width:60,
        height:28,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    fontxl:{
        color:'white',
        fontWeight:'700',
        fontSize:12,
    },
});