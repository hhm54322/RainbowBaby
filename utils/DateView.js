/**
 * React Native App
 * Create Data 2018 4 23
 * @ by XJS
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';

/**
 * 时间选择弹窗
 * Create Data 2018 4 23
 * @ by XJS
 */

export default class DateView extends Component {
  constructor(props) {
    super(props);
    this.week = ['日','一','二','三','四','五','六']  //周数组
    this.callbackDate = this.props.callback     //传入点击之后的回调
    this.startime           //起始时间
    this.state = {
      day:1,              //天
      moth:1,           //月
      year:2018,        //年
      indexDays:-100,         //选中天
      isModalVisible:false, //是否显示
    }

    if(this.props.startime)
    {
      this.startime = this.props.startime
    }
   
    this.setTimeDate(this.props.nowtime)
  }

  _leftbtn = ()=>{
      this.state.indexDays = -100
      this.state.day = -100
      var moth = this.state.moth
      var year = this.state.year
      if(moth == 1){
        moth = 12
        year-=1
      }else{
        moth-=1
      }
      this.setState({
        moth:moth,
        year:year,
      })
      
  }
  _rightbtn =()=> {
    this.state.indexDays = -100
    this.state.day = -100
    var moth = this.state.moth
    var year = this.state.year
    if(moth == 12){
      moth = 1
      year+=1
    }else{
      moth+=1
    }
    this.setState({
      moth:moth,
      year:year,
    })
  }

  //初始化时间
  setTimeDate = (timed) =>{
    if(timed){
      var frtime = timed
      var timed = new Date(frtime)
      this.state.year = timed.getFullYear()
      this.state.day = timed.getDate()
      this.state.moth = timed.getMonth()+1
      var add = this._retenMaxnumber();
      var indexd = this.state.day +add-1 ;
      this.state.indexDays = indexd
    }
  }

  //打开时根据传入时间显示
  open = (time)=>{

    this.setTimeDate(time);
    this.setState({
      isModalVisible:true
    })
  }

  //关闭
  _close = ()=>{
    
    this.setState({
      isModalVisible:false
    })
  }

  //显示每一周
  _showWeek = ()=>{
      var item = []
      for(var i=0;i<7;i++)
      {
          item.push(
            <View 
            key ={i}
            style={styles.dayView0}>
                <Text style = {{color:'#ffffff'}}>{this.week[i]}</Text>
            </View>
          )
      }
      return item
  }


  //点击day之后的回调函数
  _ondayTouchend(index,dayt){
      var ac = index
      var dayi = dayt
      var adc = touchback =()=>{
        if(ac === ''){
          return
        }
        this._close()
        if(this.callbackDate){
            this.callbackDate(this.state.year,this.state.moth,dayi)
        }
        this.setState({
          indexDays:ac,
          day:dayi,
        })
      }
      return adc
  }

  //得到day天数
  _retenMaxnumber  =()=>{
    return  new Date(this.state.year, this.state.moth-1, 1).getDay()
  }

  //当天是否可以点击
  _isClick = (str)=>{
    if(str === ''){
      return 0;
    }
    var endtimestruct = new Date()
    var endtime = endtimestruct.getTime();
    var nowstrd = new Date(this.state.year,this.state.moth-1,str)
    var nowTime = nowstrd.getTime();
    if(nowTime<=endtime  && nowTime>=this.startime)
    {
      return 1
    }
    return 2
  }

  //显示每月天数列表
  _showdDateList = ()=>{
    var item = []
    var add = this._retenMaxnumber()
    monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if(this.state.year % 400 === 0 || (this.state.year % 4 === 0 && this.state.year % 100 !== 0)) {
      monthArr[1] = 29
    }
    var maxSize = monthArr[this.state.moth-1] + add
    for(var i = 0;i < maxSize; i++)
    {
      var str = i<add? '':i-add+1
      var styled = styles.dayView1
      var isd = this._isClick(str);
      if(this.state.indexDays === (i)){
        styled = styles.dayView2
      }
      var color=''
      var colorblack ='#000000'
      var colorblackwidth ='#A9A9A9'
      var inde = i
      if(isd == 1)
      {
        color = colorblack
      }else{
        inde = ''
        color = colorblackwidth
      }

      item.push(
        <TouchableWithoutFeedback
        onPress = {this._ondayTouchend(inde,str)}
        key = {i}>
        <View 
        style = {styled}>
            <Text style= {{color:color}}>
              {str}
            </Text>
        </View>
        </TouchableWithoutFeedback>
      )
    }
    return item
  }
  //点击取消之后的回调
  _lostback = ()=>{
    this._close()
  }

  //点击确认可以点解day之后的回调
  _sureback =()=>{
    this._close()
    if(this.callbackDate){
      this.callbackDate(this.state.year,this.state.moth+1,this.state.day)
    }
  }

  render() {
    // return (
    //   <HandsCcountEdite></HandsCcountEdite>
    // )
    return(
        <Modal
        animationType={'slide'}
        onRequestClose ={this._close}
        visible={this.state.isModalVisible}
        >
          <TouchableWithoutFeedback
          onPress = {()=>{this._lostback()}}
          >
            <View style = {[styles.mainView,styles.viewCenter]}>
            <TouchableWithoutFeedback
              onPress = {()=>{}}
            >
                <View style = {styles.dateView}>
                    <View style = {styles.headView}>  
                        <TouchableWithoutFeedback
                          onPress = {this._leftbtn}
                        >
                            <Image 
                            style={styles.imgView}
                            source={require('./left1.png')}
                            ></Image>
                        </TouchableWithoutFeedback>
                        <Text style = {styles.dayView}>
                             {this.state.year}年
                        </Text>
                        <Text  style = {styles.dayView}>
                            { this.state.moth }月
                        </Text>
                        <TouchableWithoutFeedback
                          onPress = {this._rightbtn}
                        >
                            <Image
                              style={[styles.imgView ,styles.right]}
                              source={require('./left1.png')}>
                            </Image>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style= {styles.wensDayView}>
                        {this._showWeek()}
                    </View>
                    
                    <View style = {{backgroundColor:'#ffffff'}}>
                        <View style = {styles.datelistView}>
                            {this._showdDateList()}
                        </View>
                    </View>
                    
                    <View style = {styles.bottomView}>

                        {/* <TouchableWithoutFeedback
                        onPress ={this._lostback}
                        >
                        <View style = {styles.btnView}>
                              <Text style = {styles.btnTextView}>取消</Text>
                        </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                        onPress ={this._sureback}
                        >
                        <View style = {styles.btnView}>
                              <Text  style = {styles.btnTextView}>确定</Text>
                        </View>
                        </TouchableWithoutFeedback> */}

                    </View>

                </View>
                </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>

        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  viewCenter:{
    justifyContent: 'center',  
    alignItems:'center',  
  },
  dateView:{
    alignItems:'center',  
    width:Dimensions.get('window').width*0.88,
    //height:Dimensions.get('window').height*0.8,
    //backgroundColor:'#a7C7a7'
  },
  headView:{
    width:Dimensions.get('window').width*0.88,
    height:Dimensions.get('window').height*0.16,
    justifyContent: 'center',  
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#20B2AA'  
    //
  },
  dayView:{
    fontSize:30,
    margin:20,
    color:'#ffffff'
  },
  imgView:{
    height:Dimensions.get('window').height*0.07,
    width:Dimensions.get('window').width*0.15,
    resizeMode:'contain',
  },
  right:{
    transform: [{rotate:'180deg'}]
  },

  wensDayView:{
    height:Dimensions.get('window').height*0.07,
    width:Dimensions.get('window').width*0.88,
    justifyContent: 'center',  
    flexDirection:'row',
    backgroundColor:'#008B8B'  
  },

  dayView0:{
    height:Dimensions.get('window').width*0.88/7-1,
    width:Dimensions.get('window').width*0.88/7-1,
    justifyContent: 'center',  
    alignItems:'center',  
  },

  datelistView:{
    flexDirection:'row',
    flexWrap:'wrap'
  },

  dayView1:{
    height:Dimensions.get('window').width*0.88/7,
    width:Dimensions.get('window').width*0.88/7,
    justifyContent: 'center',  
    alignItems:'center',
  },

  dayView2:{
    height:Dimensions.get('window').width*0.88/7,
    width:Dimensions.get('window').width*0.88/7,
    justifyContent: 'center',  
    alignItems:'center',  
    borderRadius:Dimensions.get('window').width*0.88/7/2,
    backgroundColor:'#B4EEB4'  
  },
  
  bottomView:{
    width:Dimensions.get('window').width*0.88,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#ffffff'  
  },
  btnView:{
      width:Dimensions.get('window').width*0.20,
      height:30,
      //backgroundColor:'#B4EEB4',
      marginLeft:50,
      marginTop:5,
      marginRight:50,
      marginBottom:5,
      borderRadius:12,
      justifyContent: 'center',  
      alignItems:'center',  
  },
  btnTextView:{
    color:'#20B2AA',
    fontWeight :'900',

  },
});
