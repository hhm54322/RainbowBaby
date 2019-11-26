/**
 * Sample React Native TextInfo
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ListView,
  WebView,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
//import GameComment from '../game/GameComment'
import GameComment from './CommentView'
import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'


//文字显示全部放入  webView里面
//html 头和尾巴  到时候全部拼接进去就行了
var html = 
`<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
        * {
        margin: 0;
        padding: 0;
        font-size: 20px;
        }
        body,html{width: 100%;height: 100%;font-size: .3rem;overflow-x: hidden;align:center}
        div:first-child{width: 94%;margin-left:3%}
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
<div style="margin-left:2%;margin-right:2%;border-top:1px solid #000;height:70px;line-height:70px;text-align:center;">没有更多了</div>
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
</script>
</body>

</html>`

//文字详情页面  用webview渲染一个字符串html
export default class TextInfo extends Component {
  constructor(props) {
    super(props);
    this.comment
    this.id = this.props.navigation.state.params.info.id
    this.type = this.props.navigation.state.params.info.type

    this.state = {
        _text:'',
        data:{
            title:'',
            content:'',
            postImg:'http://d.png',
        }
    }
  }
  componentWillMount(){

  }
  //发送text详情请求
  componentDidMount(){
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'access_token':token};
    var url = '/maria/articles/'+this.id
    
    if(this.type === 3){
        url = '/maria/bbs/forums/1/posts/'+this.id
    }
    var mod = {
        url:url,
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:(responseJson) =>{
          //下面的就是请求来的数据
          console.log(responseJson);
          this.setState({
              data:responseJson
          })
      }
    }
    NetService.do(NetService.sendarticlesOrtext,mod)

    //this.showTextCommit();
  }

  //评论  已经废弃  不需要了
  showTextCommit = ()=>{
    var token = DataUtil.getinstance().getUserData().access_token
    var url = ''
    if(this.type === 1){
        url = '/maria/articles/'+this.id+'/comments'
    }else if(this.type === 3){
        url = '/maria/bbs/forums/1/posts/'+this.id+'/comments'
    }
    let params2 = {'access_token':token,'beginId':0,'offset':20};
    var mod = {
        type:'get',
        url:url,
        params:params2,
        params1:{},
        headers:['application/json','application/json'],
        callback:{}
    }
    return
    this.comment.showMessage(mod)
  }

    _onTouchBack = ()=>{
        this.props.navigation.goBack();
    }

    //显示头部
    showHead = ()=>{    
        return (<View>
            <View style = {[styles.headView,this.props.style]}
            >
                <TouchableWithoutFeedback
                    onPress = {this._onTouchBack}
                >
                <Image
                    style = {styles.ImgView}
                    source={require('../handAccount/selectHandbottomList/icon/backhead.png')} 
                ></Image>
                </TouchableWithoutFeedback>
                <View style = {styles.tileTextView}>
                    <Text 
                    numberOfLines = {1}
                    style = {{fontSize:19,marginTop:3,width:SceneUtils.size.width*0.4}}
                    >
                        {'  '}
                    </Text>
                </View>
                <View></View>
                {/* <View style = {styles.fbtnView}>
                    <Image source = {require('./img/fenxiang.png')} style={styles.fxImg}/>
                </View> */}
            </View>
            <View style = {styles.line}></View>
        </View>)
    }


    //显示WebView
    showOneLine = (data)=>{
        if(this.state.data.title === ''){
            return
        }
        var time =''
        if(this.state.data.createTime){
            time = '彩虹宝宝  ' + this.state.data.createTime.substring(0,10)
        }
        var htmls = html+ htitle+this.state.data.title+htitleEnd+ htime + time+htimeEnd + this.state.data.content+htmlEnd
        return (
            // <Text>{this.state.data.text+this.state.data.content}</Text>
            <View style = {styles.webstyle}>
            <WebView
                showsVerticalScrollIndicator = {false}
                showsHorizontalScrollIndicator = {false}
                style = {styles.webstyle}
                onError = {()=>{
                    console.log('onError')
                }}
                onLoadEnd = {()=>{
                    console.log('onLoadEnd')
                }}
                onLoadStart = {
                    ()=>{
                        console.log('onLoadStart')
                    }
                }
                source={{html: htmls, baseUrl: ''}}
                javaScriptEnabled={false}
                domStorageEnabled={false}
                scalesPageToFit={false}
                mixedContentMode = {'never'}
            >
            </WebView>
            </View>
        )
    }


    //设置文字
    _onChange = (event)=>{
        this.setState({
          _text: event.nativeEvent.text
      });
      }


      //评论不要了  废弃
    sendCommiteback = (responseJson)=>{
        this.showTextCommit()
        this.setState({
            _text:'',
        })
    }
       
    sendCommite = ()=>{
        // var token = DataUtil.getinstance().getUserData().access_token
        // if(this.type === 1){
        //     url = '/maria/articles/'+this.id+'/comments'
        // }else if(this.type === 3){
        //     url = '/maria/bbs/forums/1/posts/'+this.id+'/comments'
        // }
        // let params2 = {'access_token':token,'beginId':0,'offset':20};
        // var mod = {
        //     type:'post',
        //     url:url,
        //     params:params2,
        //     params1:{
        //         content:this.state._text,
        //     },
        //     headers:['application/json','application/json'],
        //     callback:this.sendCommiteback
        // }
    }

    inputeEnding = ()=>{
       this.sendCommite()
    }

  render() {

      if(this.state.data.postImg === null){
        this.state.data.postImg = 'http://d.png'
      }
    return (
        <View style = {styles.main}>    
            {this.showHead()}
            {/* <View style = {styles.midView}>
                <Image
                    style = {styles.midImage}
                    source={{uri:this.state.data.postImg}}>
                </Image>
            </View> */}
            <View style = {styles.textInfoView}>
                {this.showOneLine({})}
            </View>

            {/* <GameComment 
            width = {SceneUtils.size.width}
            height = {SceneUtils.size.height*0.27}
            ref = {ref=>{this.comment = ref}}
            ishow = {true}>
            </GameComment> */}

            {/* <View style = {styles.line}></View> */}
            {/* <View style = {styles.bottomView}>
                {/* <TextInput
                underlineColorAndroid='transparent'
                    style = {styles.textinputView}
                    value={this.state._text}
                    onChange={this._onChange}
                    returnKeyType = 'done'
                    blurOnSubmit = {true}
                    onSubmitEditing = {this.inputeEnding}
                ></TextInput>
                <Text style = {styles.tview}>
                    {'写评论...'}
                </Text>
                <View style = {styles.siLine}></View> }
                
                <View style = {styles.fbtnView}>
                    <Image source = {require('./img/fenxiang.png')} style={styles.fxImg}/>
                </View>
            </View> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
  },
  tileTextView:{
    height:SceneUtils.size.height*0.06,
    width:SceneUtils.size.width*0.7,
    justifyContent: 'center',  
    alignItems:'center',
  },
  headView : {
    flexDirection:'row',
    backgroundColor:'white',
    height:Dimensions.get('window').height*0.065,
    width:Dimensions.get('window').width,
    justifyContent: 'space-between',  
    alignItems:'center', 
},
ImgView:{
    width:Dimensions.get('window').height*0.03,
    height:Dimensions.get('window').height*0.03,
    resizeMode:'contain',
    marginLeft:10,
    marginTop:3,
},
line:{
    width :Dimensions.get('window').width,
    borderBottomWidth:1,
    borderColor:'rgb(240,240,240)',
},
    midView:{
        height:SceneUtils.size.height*0.25,
        width:SceneUtils.size.width-10,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    midImage:{
        height:SceneUtils.size.height*0.25-1,
        width:SceneUtils.size.width-10-1,
    },
    textInfoView:{
        //height:SceneUtils.size.height*0.55,
        width:SceneUtils.size.width,
    },
    bottomView:{
        position: 'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent: 'center',  
        alignItems:'center', 
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.08,
        backgroundColor:'white',
    },
    tview:{
        position: 'absolute',
        fontSize:12,
        marginLeft:15,
        color:'rgb(145,145,145)',
    },
    textinputView:{
        marginLeft:8,
        backgroundColor:'rgb(238,238,238)',
        width:SceneUtils.size.width*0.81,
        height:SceneUtils.size.height*0.07,
    },
    fbtnView:{
        width:SceneUtils.size.width*0.15,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    fxImg:{
        width:20.5,
        height:23.5,
        tintColor:'rgb(131,185,48)',
        resizeMode:'cover'
    },
    webstyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.935,
        borderRightWidth:0,
    },
    siLine:{
        marginLeft:8,
        height:SceneUtils.size.height*0.09,
        borderRightWidth:1,
        borderColor:'rgb(240,240,240)',
    },
});
