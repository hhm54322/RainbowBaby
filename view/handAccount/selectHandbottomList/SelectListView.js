/**
 * React Native SelectListView
 * Create Data 2018 5 8
 * @ by XJS
 */

import React, { Component } from 'react';
//import tinycolor from 'tinycolor2';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../../utils/SceneUtils'


//底部tabbtn选择界面
export default class SelectListView extends Component {
  constructor(props) {
    super(props);
    this.scrollView     //滚动列表
    this._index         
    this.selectBackFunc = this.props.selectBack     //点击选择后的回调
    this.ccmap = new Map()
    this.state = {
        index:-1,           //选择的下标
    }

    this.initThis();
  }

  componentDidMount() {

  }

initThis = ()=>{
    this.ccmap.set(0,'背景')
    //this.ccmap.set(1,'封面')
    this.ccmap.set(2,'相册')
    this.ccmap.set(3,'图标')
    this.ccmap.set(4,'文本')
    this.ccmap.set(5,'日期')
    //this.ccmap.set(6,'画笔')
}

//根据类型显示不同的图片
showImg = (id,ads)=>{
    var imagesd = styles.image
    if(ads){
        imagesd = styles.image1
    }
    if(id === 0){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/0.png')} 
            ></Image>
        )
    }else if(id === 1){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/1.png')} 
            ></Image>
        )
    }else if(id === 2){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/2.png')} 
            ></Image>
        )
    }else if(id === 3){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/3.png')} 
            ></Image>
        )
    }else if(id === 4){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/4.png')} 
            ></Image>
        )
    }else if(id === 5){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/5.png')} 
            ></Image>
        )
    }else if(id === 6){
        return (
            <Image 
            style = {imagesd}
            source={require('./img/6.png')}  
            ></Image>
        )
    }
}

//点击后的回调
_ontouchEnded = (i)=>{
    var index = i
    
    var back = ()=>{
        this.setState({
            index:index
        })
        if(this.selectBackFunc){
            this.selectBackFunc(index)
        }
        
    }
    return back;
}

//刷新每一个item
renderItem = ()=>{
  var itemAry = [];
  this.ccmap.forEach((element, index, array) => {
    var ads = false
    if(this.state.index === index){
        ads = true
    }
    itemAry.push(
        <TouchableWithoutFeedback
        key = {index}
        onPress = {this._ontouchEnded(index)}
        >
            <View 
                style={[styles.itemView,{}]}
            >
                {this.showImg(index,ads)}
                <Text style = {ads?styles.text1:styles.text}>{element}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
  })
   return itemAry;
}

  render() {
    return(
      <View style = {[styles.mainView,this.props.style]}>
        {/* <ScrollView style={[styles.scrollviewStyles]}
                    ref={ ref => this.scrollView = ref}
                    horizontal={true}
                    showsHorizontalScrollIndicator  = {false}
                  >
                 
        </ScrollView> */}

         {this.renderItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        borderColor:'rgb(100,100,100)',
        borderTopWidth:1,
        backgroundColor:'white',
        height:97/1330*SceneUtils.size.height,
        flexDirection:'row',
        backgroundColor:'rgb(51,51,51)'
    },
    scrollviewStyles:{
        width :Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.12,
    },
    itemView:{
        justifyContent: 'center',  
        alignItems:'center', 
        width :Dimensions.get('window').width/5,
    },
    itemImg:{
        marginTop:6,
        width:Dimensions.get('window').height*0.045,
        height:Dimensions.get('window').height*0.065,
        resizeMode:'contain',
    },

    image:{
        width:25,
        height:25,
    },
    image1:{
        width:25,
        height:25,
        tintColor:'rgb(127,186,0)',
    },
    text:{
        fontSize:11,
        marginTop:2,
        color:'rgb(238,238,238)'
    },
    text1:{
        fontSize:11,
        marginTop:2,
        color:'rgb(127,186,0)'
    },
   
});
