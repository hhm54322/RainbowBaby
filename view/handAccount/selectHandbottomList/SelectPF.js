/**
 * React Native SelectPF
 * Create Data 2018 5 10
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
// import {Images} from '../index'

import SceneUtils from '../../../utils/SceneUtils'

//废弃
export default class SelectPF extends Component {
  constructor(props) {
    super(props);
    this.touchback = this.props.back
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.shuju = []
    this.mode = []
    this.imgaesArr = Images.fm
    var len = this.imgaesArr.length
    for(var i = 0; i < len; i++){
        this.shuju.push({type:1,url:this.imgaesArr[i],name:i,id:i,se: i===2,d:i<=3})
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
      this.mode = []
      var alllenth = this.shuju.length
      var len = this.shuju.length/2;
      var all = 0
      for(var i=0; all<alllenth&&i<len;i++){
          var arr = []
         for(var j = 0;j<2;j++){
             if(all >= alllenth){
                all++;
            }else{
                arr.push(this.shuju[all])
                all++
            }
         }
         if(arr.length>=1){
            this.mode.push(arr)
         }
      }
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
            console.log(iid);
        }
      }
      return back
  }

  showImgIsSelect = (se)=>{
    if(se === true){
        return (
            <View style ={styles.bgViewgreen}></View>
        )
    }
  }

  showImgNotDown = (se,d)=>{
      if(se)
      return 
    if(d === false){
        return (
            <Image 
                style = {styles.imgView}
                source={require('./img/xztb.png')} 
            ></Image>
        )
    }
  }

  showHuise = (se,d)=>{
    if(!se && d){
      return (
          <View style = {styles.bgViewhuise}>

          </View>
      )
    }
}

  showItemOnew = (rowData)=>{
        var l = rowData.length
        var lin = []
        for(var i=0;i<l;i++){
            lin.push(
                <TouchableWithoutFeedback
                    key = {i}
                    onPress = {this._touchOne(rowData[i].id)}
                >
                    <View 
                    style = {styles.itemView}
                    >

                     <Image style = {styles.imgItem}
                        source={rowData[i].url} 
                        >
                    </Image>
                        {this.showImgIsSelect(rowData[i].se)}
                        {this.showImgNotDown(rowData[i].se,rowData[i].d)}
                        {this.showHuise(rowData[i].se,rowData[i].d)}
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return lin
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
        >
            <Head 
            touchBack = {this._TouchBack}
            headstr = '皮肤'></Head>

            <ListView 
                style = {{backgroundColor:'rgb(230,230,230)',}}
                dataSource={this.state.dataSource}
                renderRow={this.showOneLine}
            />
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    mainView : {
        
        paddingBottom:1,
    },
    itemLine :{
        flexDirection:'row',
    },
    itemView:{
        width:Dimensions.get('window').width*0.4,
        height:Dimensions.get('window').height*0.2,
        borderWidth:1,
        marginLeft:Dimensions.get('window').width*0.2/3,
        marginTop:Dimensions.get('window').height*0.06,
        justifyContent: 'center',  
        alignItems:'center', 
        backgroundColor:'rgb(210,210,210)',
    },
    imgView:{
        position: 'absolute',
        width:20,
        height:20,
        resizeMode:'contain',
        right:0,
        bottom:0,
    },
    imgItem:{
        width:Dimensions.get('window').width*0.35,
        height:Dimensions.get('window').height*0.18,
        resizeMode:'contain',
    },
    bgViewhuise:{
        position: 'absolute',
        width:20,
        height:20,
        right:0,
        bottom:0,
        backgroundColor:'rgb(230,230,230)',
        borderRadius:13,
    },
    bgViewgreen:{
        position: 'absolute',
        width:20,
        height:20,
        right:0,
        bottom:0,
        backgroundColor:'rgb(50,205,50)',
        borderRadius:13,
    },
    
 
});
