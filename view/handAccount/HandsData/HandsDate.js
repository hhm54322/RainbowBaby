/**
 * React Native App
 * Create Data 2018 4 11
 * @ by XJS
 */

import React, { Component } from 'react';
import {StorageHelper} from '../../../utils/modStruct'
import DateView from '../../../utils/DateView'


import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

import SceneUtils from '../../../utils/SceneUtils'


const displayFlex  = 'flex'
const displayNone  = 'none'

//废弃
export default class HandsDate extends Component {
  constructor(props) {
    super(props);
    this.calendar;
    this.dateview;
    this.state = {
        startime:new Date(2018, 2, 10).getTime(),  
        nowDate:new Date(2018, 3, 20).getTime(),  
        year:1,
        moth:1,
        day:1,
        imgurl:'data:image/png;base64,SDKJASD',
      };
      this.setTimeDate(this.state.nowDate)

  }

  componentDidMount(){
    
      this.showImg()
  }

  showImg = ()=>{
    StorageHelper.get('imgbase64',(mod)=>{
        if(mod == null)
        return
        this.setState({
            imgurl:mod
        })
        //const { navigate } = this.props.navigation;
        //navigate('HandsCcountEdite',{ info: mod })
    })
  }
  setTimeDate = (timed) =>{
    if(timed){
      var frtime = timed
      var timed = new Date(frtime)
      //console.log(' timed  ==  '+timed)
      this.state.year = timed.getFullYear()
      this.state.day = timed.getDate()
      this.state.moth = timed.getMonth()+1
    }
  }

  dateback = (year,mm,dd)=>{
    this.setState({
        nowDate:new Date(year, mm-1, dd).getTime(),  
        year:year,
        moth:mm,
        day:dd
    })
  }
  callbackthis = ()=>{
    this.showImg()
  }
  _toHandsEditer =()=>{
    StorageHelper.get('handsmod',(mod)=>{
        const { navigate } = this.props.navigation;
        navigate('HandsCcountEdite',{ info: {mod:mod, back:this.callbackthis,date:this.state.nowDate}})
    })
  }
  refrenshowTime =()=>{
    var timed = new Date(this.state.nowDate)
    this.setState({
        year : timed.getFullYear(),
        day : timed.getDate(),
        moth : timed.getMonth()+1,
    })
  }

  _dataBack = ()=>{
    console.log('dsadasds')
    this.dateview.open(this.state.nowDate)
  }

  showTopView = ()=>{
    return (
    <View style = {styles.topView}>
        <Text 
          onPress = {()=>{
              this.state.nowDate-=86400000;
              if(this.state.nowDate < this.state.startime)
              {
                this.state.nowDate =  this.state.startime
                return;
              }
              this.refrenshowTime();
          }}
          style = {styles.textStyle}>{'上一页'}
        </Text>
        <TouchableWithoutFeedback 
            onPress = {this._dataBack}
        >
          <Image  
            style = {styles.imageDate}
            source={require('./img/datem.png')}
            >
          </Image>

        </TouchableWithoutFeedback>
        
        <Text 
          onPress = {()=>{
              this.state.nowDate+=86400000;
              //console.log(this.state.nowDate)
              if(this.state.nowDate > new Date())
              { 
                this.state.nowDate =  new Date().getTime()
                return;
              }
              this.refrenshowTime();
          }}
          style = {styles.textStyle}>{'下一页'}
        </Text>
  </View>)
  }

  _toHandsEditer =()=>{
    StorageHelper.get('handsmod',(mod)=>{
        const { navigate } = this.props.navigation;
        navigate('HandsCcountEdite',{ info: {mod:mod, back:this.callbackthis,date:this.state.nowDate}})
    })
  }

  showCenter = ()=>{
    return (<View>
        <ImageBackground 
                resizeMode ='stretch'
                source={require('./img/mainbg.png')}
                style={styles.zbViewStyle}
            >
                {/* <View style = {styles.topTextView}>
                    {/*    头部 }
                    <Text style={styles.mounthTextStyle}>
                        {this.state.moth}月
                    </Text>
                    <Text style = {styles.dataTextStyle}>
                        {this.state.day}号
                    </Text>
                </View>
                <Text style={styles.dongtaiTextStyle}>今日动态</Text>
                <View style={styles.linView}>
                </View> */}
                  {/* 中部 */}
                <Image
                style={{
                    marginTop:3,
                    width:Dimensions.get('window').width*0.935,
                    height:Dimensions.get('window').height*0.69,
                    resizeMode:'stretch',
                    transform: [{translateX:Dimensions.get('window').width*0.065-1}]
                 }}
                    source={{uri: this.state.imgurl}}
                >

                </Image>
            </ImageBackground>
    </View>)
  }

  render() {
    return(
        <View style = {styles.mainView}>
            <View style = {styles.line}></View>
            {this.showTopView()}
            <View style = {styles.line}></View>
            {this.showCenter()}

            <TouchableWithoutFeedback
                onPress = {this._toHandsEditer}
            >
              <View style = {styles.buttonView}>
                  <Text style = {styles.textSZView}>{'美化手账'}</Text>
              </View>
            </TouchableWithoutFeedback>

          <DateView
            ref={(calendar) => {this.dateview = calendar;}}
            callback = {this.dateback}
            startime = {this.state.startime}
            nowtime = {this.state.nowDate}
          ></DateView>
        
        </View>
              
    );
  }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:'white'
    },
    line:{
      width:SceneUtils.size.width,
      borderBottomWidth:1,
      borderColor:'rgb(230,230,230)'
    },
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.055,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    textStyle:{
        fontSize:16,
        fontWeight:'400',
        marginLeft:9,
        marginRight:9,
    },
    imageDate:{
      width:SceneUtils.size.height*0.03,
      height:SceneUtils.size.height*0.035,
      resizeMode:'center'
    },
    zbViewStyle:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height*0.73,
  },
    buttonView:{
      width:Dimensions.get('window').width*0.9,
      height:Dimensions.get('window').height*0.06,
      backgroundColor:'rgb(127,186,0)',
      justifyContent: 'center',
      alignItems:'center',
      marginTop:Dimensions.get('window').height*0.03,
      marginLeft:Dimensions.get('window').width*0.05,
    },
    textSZView:{
        fontSize:16,
        fontWeight:'900',
        color:'white',
        fontFamily:'Georgia'
    },

});
