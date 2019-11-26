/**
 * React Native SelectWaterfallflow
 * Create Data 2018 5 15
 * @ by XJS
 */

import React, { Component } from 'react';
//import tinycolor from 'tinycolor2';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
  ListView,
} from 'react-native';
import Head from './Head'

import One from '../dltouch/template/One'
import One2 from '../dltouch/template/One2'

const NowWidth = Dimensions.get('window').width*0.46


//瀑布流布局  现在没有使用了
export default class SelectWaterfallflow extends Component {
  constructor(props) {
    super(props);
    this.touchback = this.props.back
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.mode = [{a:1}]
    this.listModall = []
    this.listModeSerch = []
    for(var i = 0; i < 30; i++){
        var mode = {
            width:300,
            height:300,
            comptem:(<One scale = {NowWidth/300}></One>),
        }
        if(i%2 === 0){
            mode.height = 430
            mode.comptem = (<One2 scale = {NowWidth/300}></One2>)
        }
        this.listModall.push(mode)
    }
    this.lirthisArr()

    this.state = {
        isModalVisible:false,
        dataSource: this.listData.cloneWithRows(this.mode),
    }

  }

  componentDidMount() {

  }

  lirthisArr = ()=>{
      
    this.listModeSerch = []
    var len = this.listModall.length
    var arr1 = []
    var arr2 = []
    var l1 = 0;
    var l2 = 0;
    for(var i = 0;i<len;i++){
        if(l1<=l2){
            arr1.push(this.listModall[i])
            l1+= this.listModall[i].height
        }else{
            arr2.push(this.listModall[i])
            l2+= this.listModall[i].height
        }
    }
    this.listModeSerch.push(arr1)
    this.listModeSerch.push(arr2)
  }

  close = ()=>{
    this.setState({
        isModalVisible:false
    })
  }

  show = ()=>{
      this.setState({
        isModalVisible:true
      })
  }

  onRequestClose(){
    Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
  }

  _TouchBack = ()=>{
      this.close()
  }
  _touchOne =(id)=>{
      var iid = id
      var back = ()=>{
        if(this.touchback){
            this.touchback(iid)
        }
      }
      return back
  }

  showListArry = (arry,o) =>{
      var len = arry.length
      var temp = []
      for(var i= 0;i<len;i++){
        var heightd = arry[i].height *NowWidth/300
        temp.push(
            <View 
            key = {i+o}
            style = {[styles.itemOne,{height:heightd}]}>
             {arry[i].comptem}
            </View>
        )
      }
      return temp
  }

  showItemOnew = (d)=>{
      var tp=[]
      tp.push(
            <View 
            key = {1}
            style = {[styles.itemView,{}]}>
                {this.showListArry(this.listModeSerch[0],0)}
            </View>
        )

        tp.push(
            <View 
            key = {2}
            style = {[styles.itemView,{}]}>
                {this.showListArry(this.listModeSerch[1],10086)}
            </View>
        )
        return tp
        
  }
  
  showOneLine =(rowData)=>{
        return (
            <View style = {styles.itemLine}>
                {this.showItemOnew(rowData)}
            </View>
        )
  }

  render() {
    return(
        <Modal
        onRequestClose={() => {this.onRequestClose()}}
        visible={this.state.isModalVisible}
        transparent = {true}
        >   
            <View style = {styles.mainView}>

                <View style = {styles.headView}> 
                    <TouchableWithoutFeedback
                        onPress ={this._TouchBack}
                    >
                        <Image style = {styles.ImgView}
                        source={require('./icon/down.png')} 
                        >
                        </Image>
                    </TouchableWithoutFeedback>
                </View>
                <View style = {styles.line}></View>
                <ListView
                    style = {{backgroundColor:'#ffffff'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneLine}
                />
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        position: 'absolute',
        height:Dimensions.get('window').height*0.7,
        bottom:Dimensions.get('window').height*0.1,
    },
    itemLine :{
        flexDirection:'row',
    },
    line:{
        width :Dimensions.get('window').width,
        borderBottomWidth:1,
        borderColor:'#D4D4D4',
    },
    headView:{
        width:Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    ImgView:{
        width:Dimensions.get('window').height*0.048-4,
        height:Dimensions.get('window').height*0.048-4,
        resizeMode:'contain',
    },
    itemView:{
        width:NowWidth,
        //borderWidth:1,
        marginLeft:Dimensions.get('window').width*0.08/4,
        marginRight:Dimensions.get('window').width*0.08/4,
        marginTop:Dimensions.get('window').height*0.02,
        //justifyContent:'center',
        alignItems:'center',
    },

    itemOne:{
        height:0,
        width:NowWidth-4,
        borderWidth:1,
        //borderTopWidth:1,
        //borderBottomWidth:1,
        marginBottom:5,
        //justifyContent: 'center',  
        alignItems:'center', 
    }

 
});
