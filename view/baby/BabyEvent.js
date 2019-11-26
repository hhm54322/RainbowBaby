'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    // Slider,
} from 'react-native';
import Slider from "react-native-slider";
import SceneUtils from '../../utils/SceneUtils';


import {StorageHelper} from '../../utils/modStruct'
import DataUtil from '../../utils/DataUtil'


//宝宝事件页面
export default class BabyEvent extends Component {
    constructor(props) {
        super(props);
        this.scrollView
        this.eventList = DataUtil.getinstance().getMainFamliy().main.eventList
        console.log(this.eventList)
        this.isCanClic = true
        this.state = {
            currentIndex:0,  //当前显示下标记
        };
    }

    componentWillMount(){

    }
    componentDidMount(){

    } 

    //显示每一页的样式
    renderItem= ()=>{
        var temp = []
        var len = this.eventList.length
        for(var i=0;i<len;i++){
          var stylen = i === 0? styles.bookOneViewf:styles.bookOneView
          if( i === len - 1){
            stylen = styles.bookOneViewEnd
          }
          stylen = styles.bookOneViewEnd
          temp.push(
          <View 
            key = {i}
            style = {[stylen]}>
            <Image style = {styles.ImageVIew}
                source = {{uri:this.eventList[i].background}}
            >
            </Image>
          </View>)
        }
        return temp
      }


      //点击跳转之后 动画结束后的回调
      onAnnotationEnd = (e)=>{
          console.log(e.nativeEvent.contentOffset.x)
          console.log(SceneUtils.size.width)
        var index = e.nativeEvent.contentOffset.x/ (SceneUtils.size.width-1)
        console.log(index)
        index = parseInt(index)
        console.log(index)
        if(this.state.currentIndex != index){
          this.setState({currentIndex:index})
        }
      }

      timeSet = ()=>{
        setTimeout(() => {
            this.isCanClic = true
            }, 500);
      }

      scrollToaddorReset = (index)=>{
        console.log(index)
        var scrollWidth = SceneUtils.size.width
        console.log(index * scrollWidth)
        this.scrollView.scrollTo({x:index * scrollWidth});
      }

      //滑动结束后的回调
    onScrollEndDrag = (e)=>{
        var scrollWidth = SceneUtils.size.width-1
        var index = parseInt(e.nativeEvent.contentOffset.x / scrollWidth);
        var event = e.nativeEvent
        var contentOffset = event.contentOffset
        var len = this.eventList.length
        var velocity = e.nativeEvent.velocity.x;
          if(index < len-1){
              if(velocity > 0 || (velocity == 0 && e.nativeEvent.contentOffset.x % scrollWidth > scrollWidth / 2)){
                  index++;
              }
          }
        this.scrollView.scrollTo({x:index * scrollWidth});
      }

      lenList = ()=>{
        var t = []
        var len = this.eventList.length
        for(var i=0;i<len;i++){
          var stylen = i === this.state.currentIndex? styles.circleSe:styles.circlept
          t.push(
              <View
                key = {i}
                style = {[stylen]}
              ></View>
          )
        }
        return t
      }

    render() {
        return (
            <View style = {styles.contentView}>
                <View>
                    <ScrollView 
                        style = {styles.scrollviewStyles}
                        ref={ ref => this.scrollView = ref}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled = {true}
                        onScrollEndDrag = {this.onScrollEndDrag}
                        onMomentumScrollEnd={this.onAnnotationEnd}
                        onMomentumScrollBegin = {
                        ()=>{
                            //this.isCanclic =false
                        }
                        }
                    >
                        {this.renderItem()}
                    </ScrollView> 

                    <View style = {styles.leftbtnView}>
                        <TouchableOpacity
                            onPress = {()=>{
                                if(!this.isCanClic){
                                    return
                                }
                                this.isCanClic = false
                                this.timeSet()
                                if(this.state.currentIndex>0){
                                    this.state.currentIndex -=1;
                                    this.scrollToaddorReset(this.state.currentIndex)
                                }
                            }}
                        >
                            <Image style = {styles.leftImage}
                                source = {require('./img/5.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.rightbtnView}>
                        <TouchableOpacity
                            onPress = {()=>{
                                if(!this.isCanClic){
                                    return
                                }
                                this.isCanClic = false
                                this.timeSet()
                                if(this.state.currentIndex < this.eventList.length - 1){
                                    this.state.currentIndex +=1;
                                    this.scrollToaddorReset(this.state.currentIndex)
                                }
                            }}
                        >
                            <Image style = {styles.rightImage}
                                source = {require('./img/5.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style = {styles.cLineView}>
                    {this.lenList()}
                </View> */}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    contentView:{
        marginTop:SceneUtils.size.width * 0.04,
        //alignItems:'center',
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.8,
        backgroundColor:'rgb(51,51,51)'
    },
    scrollviewStyles:{
        width:SceneUtils.size.width,
    },
    leftbtnView:{
        position:'absolute',
        height:SceneUtils.size.height*0.55,
        width:SceneUtils.size.width*0.14,
        justifyContent:'center',
        alignItems:'center',
        left:0,
    },
    rightbtnView:{
        position:'absolute',
        height:SceneUtils.size.height*0.55,
        width:SceneUtils.size.width*0.14,
        justifyContent:'center',
        alignItems:'center',
        right:0,
    },
    leftImage:{
        width:SceneUtils.size.width*0.08,
        transform: [{rotate:'180deg'}]
    },
    rightImage:{
        width:SceneUtils.size.width*0.08,
    },

    bookOneViewf:{
        //marginLeft:SceneUtils.size.width*0.10,
        //width:SceneUtils.size.width*0.8,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.6,
        justifyContent: 'center',
        alignItems:'center',
      },
      bookOneView:{
        //width:SceneUtils.size.width*0.8,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.55,
        justifyContent: 'center',
        alignItems:'center',
      },
      bookOneViewEnd:{
        //width:SceneUtils.size.width*0.8,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.55,
        justifyContent: 'center',
        alignItems:'center',
        //marginRight:SceneUtils.size.width*0.1,
      },
      ImageVIew:{
        width:SceneUtils.size.width*0.72,
        height:SceneUtils.size.height*0.55,
        backgroundColor:'rgb(230,230,230)',
        resizeMode:'stretch'
      },
      cLineView:{
          justifyContent:'center',
          width:SceneUtils.size.width,
          flexDirection:'row',
          marginTop:10,
          height:16,
      },
      circlept:{
          width:11,
          height:11,
          backgroundColor:'white',
          borderRadius:6,
          marginLeft:6,
          marginRight:6,
          borderColor:'rgb(193,196,214)',
          borderWidth:1
      },
      circleSe:{
        width:11,
        height:11,
        backgroundColor:'rgb(134,184,34)',
        borderRadius:6,
        marginLeft:6,
        marginRight:6,
        borderColor:'rgb(193,196,214)',
        borderWidth:1
    },
});