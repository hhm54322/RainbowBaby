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


const displayFlex  = 'flex'
const displayNone  = 'none'

//废弃
export default class HandsDate1 extends Component {
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

  _dataBack = ()=>{
    this.dateview.open(this.state.nowDate)
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

  render() {
    return(
        <View style = {styles.mainView}>
            <ImageBackground 
                resizeMode ='stretch'
                source={require('./bg.png')}
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

              <View style = {[{
                //backgroundColor:'red',
                width:Dimensions.get('window').width,
                height:Dimensions.get('window').height*0.60,
              }]}>
              
                  {/* 中部 */}
                <Image
                style={{
                    marginLeft:16,
                    marginTop:13,
                    width:Dimensions.get('window').width-16,
                    height:Dimensions.get('window').height*0.67,
                    resizeMode:'stretch'
                 }}
                    source={{uri: this.state.imgurl}}
                >

                </Image>
              </View>
            </ImageBackground>
  
          <View style={styles.bottomView}>
          {/* 底部 */}
              <TouchableWithoutFeedback
              onPress = {()=>{
                  this.state.nowDate-=86400000;
                  if(this.state.nowDate < this.state.startime)
                  {
                    this.state.nowDate =  this.state.startime
                    return;
                  }
                  this.refrenshowTime();
              }}
              >
              <Image 
              style = {styles.btnImg}
              source={require('./keft.png')}
              >
              </Image>
              </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress = {this._dataBack}
                >
                    <Image
                    style = {styles.btnCenterbtn}
                    
                    source={require('./datebtn.png')}
                    >
                    </Image>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
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
              >
              <Image
              style = {styles.btnImg}
              source={require('./right.png')}
              >
              </Image>
              </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            onPress = {this._toHandsEditer}
            >
          <View style={[styles.viewCenter,styles.bottomBtnView]}>
            <Text
            style={ 
                {
                    fontSize:20,
                    color:'#ffffff',
                    fontWeight:'900',
                }
            }
            >美化手账</Text>
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

    bottomBtnView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.065,
        backgroundColor:'rgba(20,185,200,1.0)',
        marginTop:Dimensions.get('window').height*0.015,
    },

    btnCenterbtn:{
        width:Dimensions.get('window').width*0.24,
        height:Dimensions.get('window').height*0.11,
        resizeMode:'contain',
        //marginRight:Dimensions.get('window').width*0.10,
    },

    btnImg:{
        width:Dimensions.get('window').width*0.25,
        height:Dimensions.get('window').height*0.12,
        resizeMode:'contain',
    },
    bottomView:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems:'flex-end',
    },
    mounthTextStyle:{
        fontSize:30,
        color:'black',
        paddingLeft:20,
        transform: [{translateY:1}]
    },
    linView:{
        borderTopWidth:1,
        width:Dimensions.get('window').width,
        marginLeft:15,
        borderColor:'#A9A9A9'
    },
    dongtaiTextStyle:{
        marginTop:10,
        color:'black',
        paddingLeft:25,
    },
    dataTextStyle:{
        fontSize:18,
        color:'#111111',
    },
    topTextView:{
        marginTop:10,
        flexDirection: 'row',
        alignItems:'flex-end',
    },
    bgViewStyle:{
        width:Dimensions.get('window').width,
        marginLeft:20,
        borderRadius:5,
        backgroundColor:'black',
    },
    zbViewStyle:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.71,
    },
    mainView:{
        flex:1,
    },
    viewCenter:{
        justifyContent: 'center',  
        alignItems:'center',  
    },

});
