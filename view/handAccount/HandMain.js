import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  Platform,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
  Image,
  DeviceEventEmitter

} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

import FloatText from '../../utils/FloatText'

import {BoxShadow} from 'react-native-shadow'

import {StorageHelper} from '../../utils/modStruct'

import PMap from './PMap'
import BottomList from './BottomList'

import NetWork from '../../utils/NetWork'
import {NativeModules} from 'react-native';

import NetService from '../../utils/NetService'


//手账初始主页面
export default class HandsView extends Component {
  constructor(props) {
    super(props);
    this.imageMap = PMap        //获取皮肤图片
    this.selectCid              //选择的childid
    this.selectData             //选择的孩子data
    this.lenid                  //零时id
    this.state = {
      refrenshow:false,         //是否渲染
      _scal:1,                  //缩放比例
      curenIndex:0,             //选择下标
      landID:'',                //选择后的id
      startime:new Date(2018, 2, 10).getTime(),  
      nowDate:new Date(2018, 3, 20).getTime(),
    };
  }

  componentDidMount() {
  }

  //选择皮肤时缩小
  onTouchPF = (data)=>{
    var inde = this.state.curenIndex
    this.selectCid = data.id
    this.setState({
        _scal:0.74,
    })
    //显示皮肤选择列表
    BottomList.showBottomList(this.select,this.isTrue,this.state.curenIndex)
  }

  //选择的回调   冲1开始
  select = (i)=>{
      i=i+1
    this.setState({
        landID:String(i)
    })
  }

  //是否发送消息保存选择的皮肤
  isTrue = (i)=>{
    if(i<0){
        this.setState({
            _scal:1,
            landID:''
        })
          return
      }
    i = i+1
    this.lenid = i;
    this.setState({
        _scal:1,
        landID:''
    })
    if(i<0){

    }else{
        //faxiaoxi
        this.sendChangepf(i)
    }
  }

  //消息返回后调用ios翻页界面
  messageBackToPage = (j)=>{
    var token = "access_token="+DataUtil.getinstance().getUserData().access_token
    var url = NetWork.rootUrl + '/maria/child/';
    var strarry = JSON.stringify(j)
    //调用到ios界面上去
    NativeModules.RNPageViewBridge.SendRNPageView(url,String(this.selectData.id),strarry,token,this.selectData.notebookBackground,this.selectData.notebookCover,(id)=>{
        if(id === '1'){
            this.sendMessageToGetFirstArry();
        }
    })  
  }

  messageBack = (j)=>{
    var acb = DataUtil.getinstance().getMainFamliy()
    var l = acb.main.children.length
    for(var i = 0;i<l;i++){
        if(acb.main.children[i].id === this.selectCid){
            acb.main.children[i].notebookCover = String(this.lenid)
        }
    }
    DataUtil.getinstance().setMainFamliy(acb)
    this.setState({
        refrenshow:!this.state.refrenshow
    })
    FloatText.show('保存成功')
  }

  sendChangepf = (i)=>{
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token};
    var p = {
        notebookCover:String(i)
    }
    var mod = {
        url:'/maria/account/family/main/children/'+this.selectCid,
        params:params,
        params1:p,
        headers:['application/json','application/json'],
        callback:this.messageBack
    }
    var farry = []
    var dataArry = []
    farry.push(NetService.sendBabyEditer)
    dataArry.push(mod)

    NetService.doArry(farry,dataArry)
    
  }


  sendMessageToGetFirstArry = ()=>{

    //
    //
    StorageHelper.get('handsmod',(mod)=>{
        const { navigate } = this.props.navigation;
        navigate('HandsCcountEdite',{ info: {mod:mod, image:this.selectData.notebookBackground, back:this.callbackthis,date:this.state.nowDate,childId:this.selectCid}})
    })

  }

  headView = ()=>{
    return (<View style = {styles.headView}>
            <Text style = {styles.headText}>{'宝宝手账'}</Text>
    </View>)
  }

  getTime = (timeNow,left,right)=>{
        //getTime()
        var temp = new Array();
        var time = timeNow.getTime()
        var day = 1000*60*60*24;
        console.log(typeof(time))
        //JSON.stringify(a)

        for(var i = left;i>0;i--){
            temp.push(time - day*i)
        }
        temp.push(time)
        for(var i = 0;i<right;i++){
            temp.push(time + day*i)
        }
        var strarry = JSON.stringify(temp)
        strarry = strarry.substr(0, strarry.length - 1);
        strarry = strarry.substr(1, strarry.length);
        return strarry
  }

  //发送消息拿到每一叶的数据
  sendmessageCountInfo = (data,strd)=>{
    var id = String(data.id) 

    ///maria/child/${childId}/notebook/pages/${date}?access_token=${access_token}

    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token};
    var mod = {
        url:'/maria/child/'+id+'/notebook/pages/'+strd,
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:this.messageBackToPage
    }
    var farry = []
    var dataArry = []
    farry.push(NetService.sendPageInfo)
    dataArry.push(mod)

    NetService.doArry(farry,dataArry)
  }

  //点击每一本书然后准备跳转到ios界面  
  toucheOneBack = (data)=>{

    ///maria/child/${childId}/notebook/pages?access_token=${access_token}
    var strd = this.getTime(new Date(),6,0)
    console.log(strd)
    var id = String(data.id) 
    this.selectCid = data.id
    this.selectData = data
    //发送消息
    this.sendmessageCountInfo(data,strd)
    // var date = DateUtil.formatDate(1545042446295)
    // var token = "access_token="+DataUtil.getinstance().getUserData().access_token
    // console.log(date)     
  }

  callbackthis = ()=>{

  }
  
  //显示每一个宝宝封面
  showItmeOne = (i,data)=>{
      var notebookBackground = data.notebookCover
      //
      var imagebgView = {
          width:SceneUtils.size.width*606/750*this.state._scal,
          height:SceneUtils.size.height*958/1330*this.state._scal,
          alignItems:'center',
      }

      if(notebookBackground === ''){
        notebookBackground = "1"
      }
      if(this.state.landID != ''){
        notebookBackground = this.state.landID;
      }
      var widthd = SceneUtils.size.width*606/750*this.state._scal
      var heightd = SceneUtils.size.height*958/1330*this.state._scal
      var shadowOpt = {
        width:widthd,
        height:heightd,
        color:"#000000",
        border:7,
        radius:4,
        opacity:0.4,
        x:2,
        y:2,
        //style:{marginVertical :3}
    }
        var imageview = {
            position:'absolute',
            right:30/608*widthd,
            top:40/958*heightd,
            width:62/608*widthd,
            height:44/960*heightd,
        }

        var imageheadView = {
            marginTop:91/608*widthd,
            width:270/608*widthd,
            height:270/608*widthd,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:270/608*widthd/2,
            backgroundColor:'rgb(200,200,200)',
        }
        var imagehead = {
            width:265/608*widthd,
            height:265/608*widthd,
            borderRadius:265/608*widthd/2,
        }
        var text = data.nickname + '的手账'
        if(data.headshot === ''   ||  data.headshot === null){
            req = data.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
        }
        
        return (<View key = {i} style = {styles.itmeOneView}>
            <View>
                <BoxShadow key = {i} setting = {shadowOpt}>
                <TouchableWithoutFeedback
                    onPress = {this.toucheOneBack.bind(this,data)}
                >
                    <ImageBackground
                        source = {this.imageMap.get(notebookBackground)}
                        style = {imagebgView}
                    >
                    <TouchableWithoutFeedback
                        onPress =  {this.onTouchPF.bind(this,data)}
                    >
                        <Image style ={imageview} source = {require('./img/1.png')}></Image>
                    </TouchableWithoutFeedback>
                        <View style = {imageheadView}>
                            <Image style ={imagehead} 
                                source = {data.headshot == null || data.headshot == '' ? req : {uri: data.headshot}}
                                
                            ></Image>
                        </View>
                        <Text style = {{marginTop:50/608*widthd,fontSize:18*this.state._scal,color:'white',
                        fontWeight:'900'}}>{text}</Text>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                </BoxShadow>
            </View>
        </View>)
  }


  showItems= ()=>{
      var childs = DataUtil.getinstance().getMainFamliy().main.children
      var len = childs.length
      var temp = [];
      for(var i = 0;i<len;i++){
          var data = childs[i]
        temp.push(this.showItmeOne(i,data))
      }
      return temp;
  }

  //滑动中回调
  onAnnotationEnd = (e)=>{
    var index = e.nativeEvent.contentOffset.x/ (SceneUtils.size.width-1)
    index = parseInt(index)
    if(this.state.curenIndex != index){
        this.setState({curenIndex:index})
    }
}

//滑动结束回调
  onAnnotationEnd2 = (e)=>{
    if(this.state._scal != 0){
        return
    }
    var index = e.nativeEvent.contentOffset.x/ (SceneUtils.size.width-1)
    index = parseInt(index)
    if(this.state.curenIndex != index){
        this.setState({curenIndex:index})
    }
}

  showMidView = ()=>{
    return (<View style = {styles.midView}>
        <View style = {styles.scrollViewVIew}>
            <View style = {styles.scrollViewVIew}>
                <ScrollView 
                pagingEnabled = {true}
                style = {styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.onAnnotationEnd}
                onScrollEndDrag={this.onAnnotationEnd2}
                >
                    {this.showItems()}
                </ScrollView>
            </View>
        </View>
</View>)
  }

  //显示每一个圈
  showItmeOned =()=>{
      var childs = DataUtil.getinstance().getMainFamliy().main.children
      var len = childs.length
      var temp = [];
      for(var i = 0;i<len;i++){
          var styleindex = {}
          if(i === this.state.curenIndex){
            styleindex = {
                backgroundColor:'rgb(134,184,34)',
                width:8,
                height:8,
                borderRadius:4,
            }
          }
        temp.push(<View key = {i} style = {{backgroundColor:'white',width:10,height:10,borderRadius:5,borderWidth:1,
        borderColor:'rgb(230,230,230)',margin:5,}}>
                <View style = {styleindex}></View>
        </View>)
      }

      return temp;
  }

  //显示圈
  showlineDownCircl = ()=>{

    return (<View style ={styles.circleView}>
        {this.showItmeOned()}
    </View>)
  }

  render() {
    return (
      <View style = {styles.mainview}>
        {this.headView()}
        {this.showMidView()}
        {this.showlineDownCircl()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:"rgb(51,51,51)",
        alignItems:'center',
    },
    headView:{
        borderWidth:1,
        borderBottomColor:'rgb(100,100,100)',
        justifyContent: 'center',  
        alignItems:'center',
        height:SceneUtils.size.height*0.1,
        width:SceneUtils.size.width,
    },
    headText:{
        marginTop:7,
        fontSize:19,
        fontWeight:'900',
        color:'white'
    },
    midView:{
        height:SceneUtils.size.height*0.76,
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    scrollViewVIew:{
        marginTop:SceneUtils.size.height*0.04,
        height:SceneUtils.size.height*0.73,
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'center',
    },
    scrollView:{
        height:SceneUtils.size.height*0.73,
        width:SceneUtils.size.width,
    },
    itmeOneView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.73,
        alignItems:'center',
    },
    circleView:{
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:20,
    },
    
});
