/**
 * Sample React Native Game
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
  findNodeHandle,
  Dimensions,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  WebView,
  Linking

} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import OtherGame from './OtherGame'
import NetService from '../../utils/NetService'

import DataUtil from '../../utils/DataUtil'

import ImageFi from './ImageFi'
import Util from '../../utils/Util'

//游戏详情页面
import * as Progress from 'react-native-progress'

//import DownLoadManager from '../downLoad/DownLoadManager'

//html头部和尾部   用于显示游戏的详情
var html = 
`<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
        * {
        margin: 0;
        padding: 0;
        font-size: 16px;
        background: rgba(51,51,51,1);
        color:rgb(255,255,255);
        }
        body,html{width: 100%;font-size: .3rem;overflow-x: hidden;align:center}
        div:first-child{width: 94%}
        p{margin-bottom: 30px}
        img{display: block;width: 100%;}
        .title{font-weight: bold;font-size: 30px;align:center}
        .time{font-size: 20px;margin-top:20px;color:rgb(180,180,180);}
  </style>
</head>
<body>
<div>`

var htitle = `<h class = "title">`

var htitleEnd = `</h><br/>`

var htime = `<p class = "time">`

var htimeEnd = `</p><br/>`

var htmlEnd = `	
<br/><br/>
</div>
<script type="text/javascript">
/*屏幕与字体适配*/
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio;
    var metaEl = document.querySelector('meta[name="viewport"]');
    var dpr = window.devicePixelRatio || 1;
    var scale = 1 / dpr;	
    function getSize() {// 获取屏幕的宽度
        //font-size 20px
        var screenWidth = docEl.clientWidth; 
        docEl.style.fontSize =  screenWidth / (375/ 100)  + 'px';
    }
    getSize();// 页面加载完执行一次
    window.onresize = function() {
        getSize();
    };

    window.onload = function(){window.location.hash = 1;document.title =  document.body.scrollHeight;}


</script>
</body>

</html>`

//window.onload = function(){window.location.hash = 1;document.title =  document.body.scrollHeight;}

//游戏详情页面
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.gamecomment        //游戏评论  已经不需要了
    this.id = this.props.navigation.state.params.info.id        //游戏的id
    this.scrollView = null      //滚动列表
    this.state = {
        downinfo:null,          //安卓用 ios不用
        precent:0,              //百分比  安卓用  ios不用
        WebViewHeight:0,        //webview的高度
        data:{
            title:' ',      //名字
            pf:4,             //评分
            mark:8.9,               //阅读个数或者标记个数
            tags:[' ',' ',' '],     //标签
            introduction:' ',
            logo:'',            //图标
            snapshot:{
                phone:[]            //5图
            },
        },
    }
  }

  //重写head显示函数
  static navigationOptions = ({navigation}) => (
    {
    title:'游戏',
    headerStyle:{
        borderWidth:0,
        backgroundColor:'rgb(51,51,51)',
        borderBottomWidth:0,
    },
    headerTitleStyle:{
        color:'white',
    },
  
});

    componentWillUnmount(){
        //DownLoadManager.getinstance().removeMod(this.state.data.id.toString())
    }

  componentWillMount(){

  }
  componentDidMount(){
        
      this.sendGameMessage()
    //   if(this.gamecomment){
    //     var token = DataUtil.getinstance().getUserData().access_token
    //     var url = '/maria/games/' + this.id + '/comments'
    //     let params2 = {'access_token':token,'beginId':0,'offset':20};
    //     var mod = {
    //         type:'get',
    //         url:url,
    //         params:params2,
    //         params1:{},
    //         headers:['application/json','application/json'],
    //         callback:{}
    //     }
    //     this.gamecomment.showMessage(mod)
    //   }
  }

  //发送游戏消息
  sendGameMessage = ()=>{
    var url ='/maria/games/' + this.id 
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {
    'access_token':token};

    var mod = {
        url:url,
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:(responseJson) =>{
            console.log(responseJson)
            this.setState({
                WebViewHeight:0,
                data:responseJson
            })
    
            setTimeout(() => {
                if(this.scrollView){
                    this.scrollView.scrollTo({y:0,});
                }
            }, 10);
      }
    }
    NetService.do(NetService.sendGameInfo,mod)




  }

  //显示标签列表
  showpblist = ()=>{
    var temp = [];
    var len = this.state.data.tags.length
    len = len>2?2:len;
    for(var i = 0 ;i<len; i++){
      temp.push(
        <View
          key = {i}
          style = {styles.bbgstyle}
        >
          <Text style = {styles.pbtextStyle}> {this.state.data.tags[i].title}  </Text>
        </View>
      )
    }
    return temp
  }


  //显示game相关
  showXqView = ()=>{
    return (
        <View style = {{alignItems:'center',justifyContent:'center'}}>
            <View style = {styles.xqView}>

            <View style  = {styles.topLeftView}>
                <ImageBackground 
                    style = {styles.headImg}
                    source = {require('./img/256.png')}
                    >
                    <Image
                        style = {styles.headImg}
                        source={{uri:this.state.data.logo}}>
                    </Image>
                </ImageBackground>
                
            </View>
            <View style = {styles.topRightView}> 
                <Text style = {styles.titleStyle}
                    numberOfLines = {1}>{this.state.data.title}</Text>
                
                <View style = {{flex:1,marginTop:5,alignItems:'flex-end',
                    flexDirection:'row',}}>
                    <View style = {{flexDirection:'row',marginLeft:5,marginTop:5,marginBottom:5,width:SceneUtils.size.width*0.44}}> 
                        {this.showpblist()} 
                    </View>
                    <View style ={styles.rightView}>
                        <ImageBackground
                        style = {styles.imageView}
                        source={require('../discover/img/pfbg.png')}
                        resizeMode='contain'
                        >
                            <Text style = {{color:'rgb(255,255,255)',fontWeight:'900'}}>
                                {  this.state.data.mark.toFixed(1) }
                            </Text>
                        </ImageBackground>
                    </View>
                    {/* <View style = {{backgroundColor:'rgb(134,184,34)',marginLeft:SceneUtils.size.width*0.25,
                        width:68,height:30,borderRadius:9,alignItems:'center',justifyContent:'center'}}>
                        <Text style = {{color:'white',fontSize:15,fontWeight:'700',
                                }}>{'获得'}</Text>
                    </View> */}
                </View>
            </View>

            
            {/* <View style = {styles.wenAndpView}>
                <View style ={styles.leftView}>
                    <Text style = {styles.titleStyle}
                    
                    >{this.state.data.title}</Text>
                    <Text 
                    numberOfLines = {3}
                    style = {styles.textView}>{this.state.data.introduction}</Text>
                </View>
                <View style ={styles.rightView}>
                    <ImageBackground
                    style = {styles.imageView}
                    source={require('../discover/img/pfbg.png')}
                    resizeMode='contain'
                    >
                        <Text style = {{color:'rgb(255,255,255)',fontWeight:'900'}}>
                            {this.state.data.mark}
                        </Text>
                    </ImageBackground>
                </View>
            </View> */}
            </View>
            <View style = {{borderBottomWidth:1,width:SceneUtils.size.width*0.94,
                borderColor:'rgb(100,100,100)',marginTop:27}}></View>
        </View>
    )
  }

  //显示5图根据宽高来显示横  竖  显示
  showFimage = ()=>{
        var parry = this.state.data.snapshot.phone
        var temp = []
        var len = parry.length 
        len = len>3?3:len
        var indexd = 0
        indexd = len >3? 1:0;
        for(var i = 0;i<len;i++){
            var uri = parry[i+indexd].url_1
            temp.push(<ImageFi key = {i} imguri = {uri}></ImageFi>)
        }
        return temp
  }

  //显示滚动列表
  showFiImageScrollView  =()=>{
      return(<ScrollView
        style = {{marginTop:27}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {this.showFimage()}
      </ScrollView>)
  }

  //显示星星  废弃了
  showStar = (s)=>{
    var temp = []
    for(var i=0;i<5;i++){
      var image
      if(i<s){
          image = require('./images/star1.png')
      }else{
          image = require('./images/star0.png')
      }
      temp.push(
          <Image 
          key ={i}
          style = {styles.imgStr}
              source={image}
          ></Image>
      )
    }
    return temp
}   


//显示顶部的图   一般是第一张5图
showTopBg = ()=>{
    var url = 'http://ddddsadas'
    if(this.state.data.snapshot.phone.length<=0){

    }else{
        url = this.state.data.snapshot.phone[0].url_1? this.state.data.snapshot.phone[0].url_1: ''
    }
    return (
    <View style = {styles.topView}>
        <ImageBackground style = {styles.topViewImage}
            source={require('../discover/img/1.png')}
        >
            <Image style = {[styles.topViewImage,{resizeMode:'cover' }]}
                source={{uri:url}}
                >
            </Image>
        </ImageBackground>
    </View>)
}

//其他游戏点击后回调
touchotherGameBack = (id)=>{
    this.id = id
    this.sendGameMessage()
}


//显示其他游戏列表
showotherGame  =()=>{
    return (
        <View style = {styles.listView}>
                <OtherGame
                ontouchbanc = {this.touchotherGameBack}
                id = {this.id}
                ></OtherGame>
            </View>
    )
}

showxqViewMain = ()=>{
    return (<View style ={styles.midleView}>
        {this.showXqView()}
    </View>)
}

//中间的描述文字  全部用webView来装
showintroduction = ()=>{
    //this.state.data.
    var htmls = html+ this.state.data.introduction + htmlEnd
    return (<View style = {styles.bottomIndeView}> 
        <WebView 
        //injectedJavaScript={BaseScript}
        scrollEnabled = {false}
        style  ={{width:SceneUtils.size.width,height:this.state.WebViewHeight}}
        source={{html: htmls, baseUrl: ''}}
        javaScriptEnabled={true}
        onNavigationStateChange={(title)=>{
            if(title.title != undefined) {
              this.setState({
                WebViewHeight:(parseInt(title.title)-20)
              })
            }
          }}
        >
        
        </WebView>
    </View>)


    
}


//获取下载的信息安卓有  ios没有
getDownLoadInfo = (info)=>{
    console.log(info)
    var len = parseInt(info.length)
    var fli = parseInt(info.finished)
    var prencent  = fli/len
    this.setState({
        precent:prencent,
        downinfo:info
    })

    if(prencent === 1 || info.isStop === true){
    }
}


//显示进度条或者按钮相关内容
showPrograss = ()=>{
    var text = ""
    if(this.state.downinfo != null){
        if(this.state.precent >=1){
            text = "下载完成"
        }else{
            var ff = this.state.downinfo.finished/this.state.downinfo.length*100
            ff = ff.toFixed(0)
            if(this.state.downinfo.isStop){
                text = '继续下载 '+ff+'%'
            }else{
                text = '下载中.. '+ff+'%'
            }
        }

        if(DataUtil.getinstance().getVueStrByp() === "IOS"){
            text = '前往app store'
        }

        return(
            <View>
                <Progress.Bar
                        progress={this.state.precent}
                        color = {'rgb(134,184,34)'}
                        height = {SceneUtils.size.height*0.067}
                        width = {SceneUtils.size.width*0.9}
                        borderRadius = {5}
                >  
                </Progress.Bar>
                <View style = {styles.btnCenterView2}>
                    <Text style = {styles.textBtnSty}>{text}</Text>
                </View>
            </View>
     )
    }
    return null

}


//显示按钮   根据不同的平台
showBtn = ()=>{
    if(this.state.downinfo == null){

        var strd = (String)(this.state.data.packageSize)

        var index=strd.lastIndexOf("\.");
        
        var obj=strd.substring(0,index)+'M'

        var text = '立即下载  '+obj

        if(DataUtil.getinstance().getVueStrByp() === "IOS"){
            text = '前往app store'
        }

        return (
                <View style = {styles.btnCenterView}>
                    <Text style = {styles.textBtnSty}>{text}</Text>
                </View>
        )
    }
    return null
}

  render() {
    
    return (<View style = {styles.main}>
                <View style = {styles.scrollViewStyle}>
                    <ScrollView 
                        ref = {ref =>this.scrollView =ref}
                        showsVerticalScrollIndicator = {false}>
                        {this.showTopBg()}
                        {this.showxqViewMain()}
                        {this.showFiImageScrollView()}
                        <View style = {{borderBottomWidth:1,width:SceneUtils.size.width*0.94,marginLeft:SceneUtils.size.width*0.03,
                        borderColor:'rgb(100,100,100)',marginTop:27}}></View>
                        {this.showintroduction()}
                        <View style = {{borderBottomWidth:1,width:SceneUtils.size.width*0.94,marginLeft:SceneUtils.size.width*0.03,
                        borderColor:'rgb(100,100,100)'}}></View>
                        {this.showotherGame()}
                    </ScrollView>
                </View>

            
                
                
                <TouchableWithoutFeedback
                    onPress = {
                            ()=>{
                                var baiduURL = this.state.data.downloadUrl
                                Linking.canOpenURL(baiduURL).then(supported => { 
                                    if (!supported) { 
                                    } else { 
                                       return Linking.openURL(baiduURL); 
                                    } 
                                }).catch(err => console.error('An error occurred',baiduURL)); 
                                //Linking
                            }
                        }
                    
                    >
                
                    <View style = {styles.btnView}>
                        {this.showBtn()}
                        {this.showPrograss()}
                    </View>
                </TouchableWithoutFeedback>
            
            
            <View style = {{
                position: 'absolute',
                top:10,
                left:10,}}>

                <TouchableWithoutFeedback
                onPress = {()=>{
                    this.props.navigation.goBack();
                }}
            >
                <Image 
                    style = {styles.closeImage}
                    source = {require('../../utils/img/close.png')} 
                ></Image>
                </TouchableWithoutFeedback>
                
            </View>
            
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'rgb(51,51,51)'
    },
    scrollViewStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.88,
    },
    topView:{
        height:SceneUtils.size.width*422/750,
        width:SceneUtils.size.width,
    },
    topViewImage:{
        height:SceneUtils.size.width*422/750,
        width:SceneUtils.size.width,
    },
    midleView:{
        width:SceneUtils.size.width,
    },
    bottomIndeView:{
        width:SceneUtils.size.width*0.94,
        marginLeft:SceneUtils.size.width*0.03,
        paddingTop:14,
    },
    bottomText:{
        color:'white',
        fontSize:15,
        fontWeight:'700'
    },
    pLView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.165,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wenAndpView:{
        flexDirection:'row',
    },
    line:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(240,240,240)',
    },
    leftView:{
        marginTop:10,
        width:SceneUtils.size.width*0.8,
        height:SceneUtils.size.height*0.095,
        marginLeft:4,
    },
    titleStyle:{
        marginLeft:5,
        fontSize:Util.setSpText(27),
        color:'white',
        fontWeight:'700',
        width:SceneUtils.size.width*0.5
    },
    rightView:{
        justifyContent: 'center',  
        alignItems:'center', 
    },
    imageView:{
        width:SceneUtils.size.width*0.14,
        height:SceneUtils.size.width*0.14,
        justifyContent: 'center',  
        alignItems:'center',
        marginLeft:2,
    },
    pbtextStyle:{
        fontSize:Util.setSpText(15),
        color:'white',
        fontWeight:'900',
      },

    bbgstyle:{
        marginRight:9,
        borderRadius:6,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width:SceneUtils.size.width*0.2,
        height:SceneUtils.size.height*0.035,
        borderColor:'rgb(134,184,34)',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(128,184,34)'
      },
    textView:{
        width:SceneUtils.size.width*0.7,
        height:SceneUtils.size.height*0.11*0.5,
        marginLeft:5,
        marginTop:2,
        fontSize:10,
        color:'rgb(150,150,150)'
    },

    midleTopView:{
        width:SceneUtils.size.width-10,
        height:SceneUtils.size.height*0.19*0.2,
        flexDirection:'row',
        alignItems:'flex-end',
    },
    lankuai:{
        width:3,
        height:SceneUtils.size.height*0.19*0.2*0.8,
        backgroundColor:'rgb(19,185,199)',
    },
    pllistView:{
        width:SceneUtils.size.width-10,
        height:SceneUtils.size.height*0.19*0.8,
    },
    penImage:{
        width:SceneUtils.size.height*0.19*0.5*0.2,
        height:SceneUtils.size.height*0.19*0.5*0.2,
        marginLeft:SceneUtils.size.width*0.55,
    },
    line2:{
        width:SceneUtils.size.width-10,
        borderBottomWidth:1,
        borderColor:'rgb(220,220,220)',
        height:2,
    },
    pllistOneView:{
        width:SceneUtils.size.height*0.19*0.5*0.2,
        height:SceneUtils.size.height*0.19*0.78
    },
    listoneTopView:{
        height:SceneUtils.size.height*0.19*0.78*0.3,
        width:SceneUtils.size.width-10,
        flexDirection:'row',
        alignItems:'flex-end',
    },
    jbView:{
        marginLeft:SceneUtils.size.width*0.6,
        transform:[{translateY:-SceneUtils.size.height*0.19*0.78*0.12}],
    },
    imgStr:{
        width:SceneUtils.size.height*0.19*0.78*0.14,
        height:SceneUtils.size.height*0.19*0.78*0.14,
    },
    headImg:{
        height:112,
        width:112,
        borderRadius:17,
    },
    textView2:{
        width:SceneUtils.size.width*0.89-5,
        marginLeft:SceneUtils.size.width*0.1,
        marginTop:5,
        marginBottom:9,
        borderBottomWidth:1,
        borderColor:'rgb(220,220,220)'
    },
    qimgView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.05,
    },
    btnView:{
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.height*0.1,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(100,100,100)'
    },

    progress:{
        justifyContent:'center',
        alignItems:'center',
        // height:SceneUtils.size.height*0.067,
        // width:SceneUtils.size.width*0.9,
        // backgroundColor:'rgb(134,184,34)',
        // borderRadius:5,
        // borderWidth:1,
        // borderColor:'rgb(134,184,34)',
    },
    btnCenterView:{
        height:SceneUtils.size.height*0.067,
        width:SceneUtils.size.width*0.9,
        backgroundColor:'rgb(134,184,34)',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    btnCenterView2:{
        position: 'absolute',
        height:SceneUtils.size.height*0.067,
        width:SceneUtils.size.width*0.9,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    textBtnSty:{
        color:'white',
        fontWeight:'700',
        fontSize:23
    },
    xqView:{
        flexDirection:'row',
        marginTop:27,
    },
    topLeftView:{
        marginLeft:36,
    },
    topRightView:{
        width:SceneUtils.size.width*0.7,
        marginLeft:10,
    },
    closeImage:{
        alignSelf:'center',
        width:30,
        height:30,
      },
});
