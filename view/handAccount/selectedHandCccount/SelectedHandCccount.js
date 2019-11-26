/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  TouchableOpacity ,
  NativeScrollEvent,
  PixelRatio,
  
} from 'react-native';

//废弃
export default class SelectedHandCccount extends Component {
  constructor(props) {
    super(props);
    this.maxindex = 3,
    this.itemView;
    this.scrollView;
    this.stareTouch
    this.state ={
      currentIndex : 0
    }
    
    imgDate:[];
  }

    // dragEnd(){
    //   //console.log('dragEnd')
    // }
    componentDidMount() {
      //console.log('componentDidMount')
      this.srcolltoPoint();
    }
    // dragStart = ()=>{
    //   //console.log('dragStart')
    // //var ScrollView = this.refs.scrollView;
    // //this.stareTouch = 0
    // }
    postIndex (index){

    }
    onTouchEnded = ()=>{
      var index = this.state.currentIndex;
      this.postIndex(index);
    }

    srcolltoPoint(){
      setTimeout(()=>{
        number = this.state.currentIndex
        fx = (number) *Dimensions.get('window').width*0.7
        this.scrollView.scrollTo({ x: fx, y: 0, animated: true },1);
      })
    }
    onAnnotationEnd = (e)=>{
      //console.log(this.scrollView);
      var index = e.nativeEvent.contentOffset.x/(Dimensions.get('window').width*0.699)
      index = parseInt(index)
      //console.log(index);
      //e.nativescrollEvent.
      if(this.currentIndex != index)
      {
        this.setState({currentIndex:index})
      }
    }

    leftRightPointButton = (leftOrright)=>{
      var bt = leftOrright
      buttonBack = () =>{
        var index = this.state.currentIndex
        if(bt == 2){
          index++;
        }else{
          index--;
        }
        if(index>-1 && index<this.maxindex){
          this.setState({currentIndex:index})
          this.srcolltoPoint()
        }
      }
      return buttonBack;
    }
    onPressback = (index) => {
       var bindex = index
       onShowBack = () =>{
          this.setState({currentIndex:bindex})
          this.srcolltoPoint()
      }
      return onShowBack;
    }
    onPressbackButtonBottom = () => {
      var index = this.state.currentIndex;
      this.postIndex(index);
    }
    renderItem() {
    var itemAry = [];
    var colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
    for (var i = 0; i<this.maxindex; i++) {
        itemAry.push(
            <View key={i} style={styles.containview}>
                <Image style={[styles.itemImg,styles.centerViewstyle]} source={require('../../../resource/img/selectBook/book1.png')} >
                    <Image
                      style={[styles.faceImg]}
                      source={require('../../../resource/img/selectBook/face.png')}>
                    </Image>
                    <Text>
                      Name
                    </Text>
                    <Text 
                    >手账天数：{}天</Text>

                </Image>
            </View>
        );
    }
    return itemAry;
}

 showPoint(){
  var itemAry = [];
  for (var i = 0; i<this.maxindex; i++) {
    strdisplay = (i == this.state.currentIndex)? 'flex' :'none';
    itemAry.push(
      < TouchableOpacity 
        key={i} 
        onPress = {this.onPressback(i)}
        activeOpacity ={0.0}
      >  
      <View  
        style={[styles.textStyleBig,styles.centerViewstyle]}>
          <View 
            style={[styles.textStylelid,{ display:strdisplay}]}
          ></View>
      </View>
      </TouchableOpacity >
    );
  }

   return itemAry;
 }
  render() {
    return(
        <View style={styles.maincontain}>
          <View style={styles.centerViewstyle}
          >
          
          <Image 
          style={styles.titleimg} source={require('../../../resource/img/selectBook/titleLog.png')} >
           </Image>
         
          </View> 


          <View style={styles.mindowcontain}>
              <View style={[styles.centerViewstyle,styles.leftAndright]}>
                < TouchableOpacity 
                  onPress = {this.leftRightPointButton(1)}
                  activeOpacity ={0.0}
                >  
                  <Image style={styles.leftAndrightImgstyle} source={require('../../../resource/img/selectBook/left.png')} >
                  </Image>
                </TouchableOpacity >
              </View>
              <View style={styles.scrollMainViewStyles}>
                  <ScrollView style={styles.scrollviewStyles}
                    ref={ ref => this.scrollView = ref}
                    horizontal={true}
                    scrollEventThrottle = {200}
                    keyboardDismissMode ={'on-drag'}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    //onScrollBeginDrag={this.dragStart}
                    //onScrollEndDrag={this.dragEnd}
                    onMomentumScrollEnd={this.onAnnotationEnd}
                    //onTouchStart={this.onTouchStarted}
                    //onTouchMove={this.onTouchMoved}
                    onTouchEnd={this.onTouchEnded}
                    // topScroll={this.onAnnotationEnd}
                  >
                  {this.renderItem()}
                </ScrollView> 
              </View> 
              <View style={[styles.centerViewstyle,styles.leftAndright]}
              >
                < TouchableOpacity 
                  onPress = {this.leftRightPointButton(2)}
                  activeOpacity ={0.0}
                > 
                <Image 
                style={[styles.leftAndrightImgstyle,styles.t4]} source={require('../../../resource/img/selectBook/left.png')} >
                </Image>

                </TouchableOpacity >
              </View>
          </View> 

          <View ref={(ref) => this.itemView = ref}   style={[styles.downSelect ,styles.centerViewstyle]} >
              {this.showPoint()}
          </View>

          <View style = {[styles.centerViewstyle,styles.botttomview]}>
              <Button 
                  style = {styles.buttonBottom}
                  onPress = {this.onPressbackButtonBottom}
                  title='阅览手账'
                  >
              </Button>
          </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
      mindowcontain:{
        flexDirection: 'row'
      },
      maincontain:{
        flex:1,
      },
      containview:{
        //width:Dimensions.get('window').width,
        justifyContent: 'center',  
        alignItems:'center',  
      },
      itemImg:{
        width:Dimensions.get('window').width*0.7,
        height:250
      },
      scrollMainViewStyles:{
        justifyContent: 'center',  
        alignItems:'center',  
      },
      scrollviewStyles:{
        height:Dimensions.get('window').height*0.50,
        width:Dimensions.get('window').width*0.7,
      },
      titleimg:{
        width:Dimensions.get('window').width*0.7,
        height:Dimensions.get('window').height*0.20,
        resizeMode:'contain'
      },
      leftAndright:{
        width:Dimensions.get('window').width*0.15,
        height:Dimensions.get('window').height*0.50,
        justifyContent: 'center',  
        alignItems:'center',
      },
      downSelect:{
        flexDirection: 'row',
        paddingTop:0,
      },
      centerViewstyle:{
        justifyContent: 'center',  
        alignItems:'center',
      },
      leftAndrightImgstyle:{
          height:100,
          width:Dimensions.get('window').width*0.08,
          resizeMode:'contain'
      },
    t4: {
      transform: [{rotate:'180deg'}]
    },
    textStyleBig:{
      margin:5,
      width:25,
      height:25,
      borderRadius: 25,
      borderWidth:0.8,
      borderColor:'black',
    },
    textStylelid:{
      
      width:15,
      height:15,
      borderRadius: 25,
      backgroundColor:'black',
    },
    botttomview:{
      paddingTop:10,
    },

    buttonBottom:{
      borderRadius: 40,
      justifyContent: 'center',  
    },
    faceImg:{
      resizeMode:'contain',
      width:50 * PixelRatio.get(),
      height:50 * PixelRatio.get(),
      borderRadius: 25* PixelRatio.get()
    }
});
