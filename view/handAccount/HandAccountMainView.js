/**
 * 
 * 
 * 
 */
//var applicationList = this.props.navigation.state.params.info.applicationList;
//onApplicationRecord={(data) => navigate('ApplicationList',{ info: data })}
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  NativeScrollEvent,
  ImageBackground,
  
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils'
export default class HandAccountMainView extends Component {
  constructor(props) {
    super(props);
    this.scrollView
    this.mode = []
    this.babylen = 6;
    this.isCanclic = true
    for(var i =0;i<this.babylen;i++){
      this.mode.push({
        headshot:'http://dsadasdasasas,png',
        notebookBackground:'http://dsdasada.png',
        nickname:'大宝'+i,
        createTime:1531308237797-24*60*60*1000*4,
      })
    }
    this.state ={
      currentIndex : 0
    }
  }
    componentDidMount() {
    }
    getbabyTime = (time)=>{
      var now = new Date().getTime()
      var td = new Date(time).getTime()
      td = (now - td)/1000/60/60/24 
      td = parseInt(td)
      return '手帐天数 ： ' + td + '天'
    }
    showHeadView = ()=>{
      return (
        <View style = {styles.headimgView}>
          <View style = {styles.headimgBgview}>
            <Image 
                style = {styles.headimg}
                source={require('./img/headimg.png')}
                roundAsCircle = {true}
            ></Image>
          </View>
        </View>
      )
    }

    renderItem= ()=>{
      var temp = []
      var len = this.mode.length
      for(var i=0;i<len;i++){
        var stylen = i === 0? styles.bookOneViewf:styles.bookOneView
        if( i === len - 1){
          stylen = styles.bookOneViewEnd
        }
        temp.push(
        <View 
          key = {i}
          style = {stylen}>
          <TouchableWithoutFeedback 
            onPress = {
              ()=>{
                if(!this.isCanclic){
                  return
                }
                const { navigate } = this.props.navigation;
                navigate('HandsDate',{ info: {index:this.state.currentIndex}})
              }
            }
          >
          <ImageBackground
            style = {styles.imageBackgroundView}
            source={require('./img/fengmian.png')}
            resizeMode='cover'
          >
              <Text style = {styles.nameText}>
                  {this.mode[i].nickname}
              </Text>
              <Text style = {styles.dayText}>
                  {this.getbabyTime(this.mode[i].createTime)}
              </Text>
          </ImageBackground>
          </TouchableWithoutFeedback>
        </View>)
      }
      return temp
    }
    onAnnotationEnd = (e)=>{
      //console.log(this.scrollView);
      var index = e.nativeEvent.contentOffset.x/(Dimensions.get('window').width*0.7)
      index = parseInt(index)
      //console.log(index);
      //e.nativescrollEvent.
      if(this.state.currentIndex != index){
        this.setState({currentIndex:index})
      }
      this.isCanclic =true
    }
    onScrollEndDrag = (e)=>{
      var scrollWidth = SceneUtils.size.width*0.7
      var index = parseInt(e.nativeEvent.contentOffset.x / scrollWidth);
      var event = e.nativeEvent
      var contentOffset = event.contentOffset
      var len = this.mode.length
      var velocity = e.nativeEvent.velocity.x;
        if(index < len-1){
            if(velocity > 0 || (velocity == 0 && e.nativeEvent.contentOffset.x % scrollWidth > scrollWidth / 2)){
                index++;
            }
        }
      this.scrollView.scrollTo({x:index * scrollWidth});
    }
    dragStart = (e)=>{
      console.log("dragStart")
    }
    showBoolView = ()=>{
      return (
        <View style = {styles.bookView}>
            <ScrollView 
                  style = {styles.scrollviewStyles}
                    ref={ ref => this.scrollView = ref}
                    horizontal={true}
                    //bounces = {false}
                    //keyboardDismissMode ={'on-drag'}
                    showsHorizontalScrollIndicator={false}
                    //pagingEnabled={true}
                    onScrollBeginDrag={this.dragStart}
                    onScrollEndDrag = {this.onScrollEndDrag}
                    onMomentumScrollEnd={this.onAnnotationEnd}
                    onMomentumScrollBegin = {
                      ()=>{
                        this.isCanclic =false
                      }
                    }
                    //onTouchStart={this.onTouchStarted}
                    //onTouchMove={this.onTouchMoved}
                    //onTouchEnd={this.onTouchEnded}
                    // topScroll={this.onAnnotationEnd}
                  >
                    {this.renderItem()}
            </ScrollView> 
        </View>
      )
    }

    showLine = ()=>{
      return (
        <View style = {styles.lineView}>
            {this.showOneOther()}
        </View>
      )
    }
    showOneOther = ()=>{
      var temp = []
      var len = this.mode.length
      var lineOneWidth = SceneUtils.size.width*0.60/len
      var lineOneHeight =6
      //124 205 124
      var colorw = 'white'
      var colorg = 'rgb(124,205,124)'
      for(var i=0;i<len;i++){
        var styleOne = {
          width:lineOneWidth,
          height:lineOneHeight,
          backgroundColor:i === this.state.currentIndex?colorg:colorw
        }
        temp.push(<View 
          key = {i}
          style = {styleOne}>
        </View>)
      }
      return temp
    }

  render() {
    return(
        <View style={styles.mainView}>
            <View style = {styles.headView}> 
                <Text style = {styles.headFont}>宝宝手账</Text>
            </View>
            <View style = {styles.midleView}>
                {this.showHeadView()}
                {this.showBoolView()}
                {this.showLine()}
            </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
      mainView:{
        flex:1,
      },
      headView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.09,
        justifyContent: 'center',  
        alignItems:'center',
      },
      headFont:{
        marginTop:23,
        fontSize:16,
        fontWeight:'400'
      },
      midleView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.9,
        backgroundColor:'rgb(255,230,213)',
        alignItems:'center',
      },
      headimgView:{
        marginTop:21,
        width:SceneUtils.size.width*0.18,
        height:SceneUtils.size.width*0.18,
        borderRadius:SceneUtils.size.width*0.125,
        marginBottom:20 + SceneUtils.size.height*0.61 - SceneUtils.size.width*0.60*(800/450),
      },
      headimgBgview:{
        width:SceneUtils.size.width*0.18,
        height:SceneUtils.size.width*0.18,
        borderRadius:SceneUtils.size.width*0.125,
        backgroundColor:'rgb(220,220,220)'
      },
      headimg:{
        width:SceneUtils.size.width*0.18,
        height:SceneUtils.size.width*0.18,
        borderRadius:SceneUtils.size.width*0.125,
      },
      bookView:{
        width:SceneUtils.size.width,
      },
      scrollviewStyles:{
        width:SceneUtils.size.width,
      },
      bookOneViewf:{
        marginLeft:SceneUtils.size.width*0.15,
        marginTop:3,
        marginRight:3,
        width:SceneUtils.size.width*0.7,
        // justifyContent: 'center',
        alignItems:'center',
      },
      bookOneView:{
        marginTop:3,
        marginRight:3,
        width:SceneUtils.size.width*0.7,
        // justifyContent: 'center',
        alignItems:'center',
      },
      bookOneViewEnd:{
        marginTop:3,
        marginRight:3,
        width:SceneUtils.size.width*0.7,
        // justifyContent: 'center',
        alignItems:'center',
        marginRight:SceneUtils.size.width*0.15,
      },
      imageBackgroundView:{
        width:SceneUtils.size.width*0.60,
        height:SceneUtils.size.width*0.60*(800/450),
        alignItems:'center',
      },
      nameText:{
        marginTop:SceneUtils.size.width*0.60*(800/450)*0.8,
        fontSize:19,
        fontWeight:'700',
      },
      dayText:{
        marginTop:8,
        fontSize:16,
      },
      lineView:{
        flexDirection:'row',
        marginTop:10,
        width:SceneUtils.size.width*0.60,
        height:6,
        backgroundColor:'white'
      }


});
