'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Image,
    StatusBar,
    Alert,
} from 'react-native';
import MyVideo from '../../utils/MyVideo';
import SceneUtils from '../../utils/SceneUtils';
import MyVideoImage from '../../utils/MyVideoImage';
import TextView from './TextView'
import ForumView from './ForumView'
import DataUtil from '../../utils/DataUtil'

import {PullView} from 'react-native-pull';

import Mp3View from './Mp3View'

import Util from '../../utils/Util'

import *as wechat from 'react-native-wechat'

import NetService from '../../utils/NetService'
import FloatText from '../../utils/FloatText'

const displayFlex  = 'flex'
const displayNone  = 'none'

var data=[{
    name:'推荐'
},{
    name:'新闻'
},{
    name:'音频'
},{
    name:'论坛'
}]


//精选入口页面

export default class UsefulMainView extends Component {
    constructor(props) {
        super(props);
        this.isShowButton = false       //是否显示重新加载
        this.isThis = true          //是否是自己
        this.mode = []          //给listView渲染用
        this.firstSend = 10;  //初始化列表多少
        this.addSend = 10;      //下拉的时候每次刷新多少
        this.maxSmod = 50;       //最多存在多少个对象在list
        this.alldata = [];          //alldata  临时所有对象
        this.isScrollTo = false;   //跳转位置
        this.positionY = 0;             //设置y的高度
        this.scrollViewHeight = 0;   //gaodu 
        this.scrollView = null;         //scrollView对象
        this.myVideo = null;        //vieo对象
        this.index = -1,        //第几个下标
        this.index2 = -1,
        this.layout2 = null         //点击的对象
        this.state = {
            datas:data,     //数据类型  
            titleSelect:0,          //文字
            isFullScreen:false,     //是否填充屏幕
            videoListMod:[],            //vido list
            layout:null,                //显示页面
            index2:-1
        };
    }

    componentWillMount(){

    }

    //发送消息返回
    messageBack = (responseJson,is)=>{
        console.log(responseJson)
        this.getallmessagetodata(responseJson)
    }


    //发送消息拿视频数据
    getVdioMessage =()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,'offset':this.firstSend};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.messageBack
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendvideos)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)
    }

    //根据消息拼接对象  后面根据此对象显示内容
    getallmessagetodata = (responseJson)=>{
        this.isShowButton = false
        this.mode = []
        this.mode = responseJson
        this.mode = this.mode.concat(this.alldata)
        if(this.mode.length > this.maxSmod){
          this.mode = this.mode.slice(0,this.maxSmod)
        }
        if(this.mode.length > 0){
          var time = new Date()
          var savestr = {
            time:time.getTime(),
            data:this.mode
          }
          DataUtil.getinstance().setDataByType(1,savestr)
          this.alldata = this.mode
        }else{
          this.isShowButton = true
        }
        this.setState({
            videoListMod:this.mode,
            index:-1,
        })
    }

    //本地数据缓存存在一定时间才会重新发起请求
    //时间超过3*60*60*1000  或者没有数据 就重新发送请求
    savegetBack = (data)=>{
        if(data != null){
          this.alldata = data.data
          var timenow = new Date()
          console.log(timenow.getTime())
          console.log((timenow.getTime() - data.time))
          //3*60*60*1000
          if(timenow.getTime() - data.time > 3*60*60*1000){
            this.getVdioMessage()
            return
          }else{
            this.getallmessagetodata([])
          }
        }else{
          this.getVdioMessage()
        }
      }
    
      componentDidMount(){
          //获取本地数据
        DataUtil.getinstance().getDateByTypeHlep(1,this.savegetBack)
      }
    

      //是否填充屏幕
    _onFullScreen(b){
        this.props.onFullScreen(b)
        this.setState({
            isFullScreen:b,
        })
        this.isScrollTo = true;
        this.scrollView.setStopScrollTo(b);
    }

    //当播放结束   是否继续播放
    _onVideoEnd(){
        if(this.index < this.state.videoListMod.length){
            if(DataUtil.getinstance().getNetWorkState() === 'wifi' || DataUtil.getinstance().getg4g() === 0){
                this._onPress(this.index+1,null);
            }
        }
    }

    //播放的视频滑动到最上方
    componentDidUpdate(){
        if(this.isScrollTo){
            this.isScrollTo = false;
            if(this.state.isFullScreen){
                this.scrollView.scrollTo({y:0});
            }else{
                this.scrollView.scrollTo({y:this.positionY});
            }
        }
    }

    //点击后的回调
    _onPress(index,layout){
        if(!DataUtil.getinstance().getCan4gVido() && DataUtil.getinstance().getNetWorkState()!='wifi'){
            this.index2 = index
            this.layout2 = layout
            this.setState({
                index2:this.index2
            })
            return
        }     
        this.setVideoToShow(index,layout)
    }

    //设置视频播放显示在哪位置
    setVideoToShow = (index,layout)=>{
        if(this.scrollView){
            var scrollHeight = 250;
            var scrollTo = index * scrollHeight;
            if(this.scrollViewHeight > 0 && scrollTo > this.scrollViewHeight){
                scrollTo = this.scrollViewHeight;
            }
            setTimeout(() => {
                this.scrollView.scrollTo({y:scrollTo});
            }, 10);
        }
        this.index = index;
        if(this.state.layout == null){
            DataUtil.getinstance().setCan4gVido(true)
            this.setState({
                layout:layout,
            })
        }else{
            DataUtil.getinstance().setCan4gVido(true)
            if(this.myVideo){
                var vlist = this.state.videoListMod;
                var uri = vlist[this.index].link;
                var title = vlist[this.index].title;
                var totalTime=vlist[this.index].duration;
                this.myVideo.setVideoData(false,totalTime,title,uri,this.index);
            }
        }
    }

    //加载失败后 显示重新加载的按钮
    showButtonReset = ()=>{
        if(this.isShowButton && this.state.videoListMod.length <= 0 && this.isThis){
            return (
                    <View 
                    key = {18888}
                        style = {styles.viewButton}>
                            <Text   onPress = {()=>{this.getVdioMessage()}}>{'数据加载失败，点击重新加载'}</Text>
                    </View>
            )
        }
    }

    //下面显示的没有更多了

    showNoMore = ()=>{
        return (
          <View style ={{height:30,width:SceneUtils.size.width,alignItems:'center',borderTopWidth:1,borderColor:'rgb(100,100,100)'}}>
              <Text style = {{color:'white'}}>{'没有更多了'}</Text>
          </View>
        )
      }

      //设置视频  根绝选择的位置  动态移动过去
    setVideo(){
        if(this.index == -1){
            return 
        }
        var vlist = this.state.videoListMod
        var uri = this.index == 0 
        ? 'http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade1/b/1.mp4'
        : 'http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade2/b/1.mp4'

        var uri = vlist[this.index].link
        console.log(uri)
        var title = vlist[this.index].title
        if(this.state.layout !== null){
            return(
                <MyVideo
                    ref= {ref=>{this.myVideo = ref}}
                    source= {uri}
                    sWidth={this.state.layout.width}
                    sHeight={this.state.layout.height}
                    index={this.index}
                     resizeMode='contain'
                    //resizeMode='cover'
                    title={title}
                    totalTime={vlist[this.index].duration}
                    onFullScreen={(b) => this._onFullScreen(b)}
                    onEnd={()=> this._onVideoEnd()}
                />
            )
        }
    }
    _onTitlePress(index){
        if(index === 3){
            FloatText.show('敬请期待')
            return
        }
        if(index !== this.state.titleSelect){
            this.setState({
                titleSelect:index,
            })
        }
    }
    //设置头部的tabbtn
    setTitleBar(){
        if(this.state.isFullScreen){
            return;
        }
        var allChild = [];
        //this.state.titleSelect === i ? {} : {backgroundColor:'white'} 
        for(var i = 0;i < this.state.datas.length;i++){
            var dis = this.state.titleSelect === i? displayFlex:displayNone
            allChild.push(
                <TouchableOpacity key={i} activeOpacity={1}
                    style={[styles.titleBarBtn]}
                    onPress={this._onTitlePress.bind(this, i)}
                    >
                    <View style = {[styles.lineBar,{display:dis}]}></View>
                    <Text style={[styles.titleBarText,this.state.titleSelect === i ? styles.titleBarTextnotSe : styles.titleBarTextIsSe ]}>{this.state.datas[i].name}</Text>
                </TouchableOpacity> 
            );
        }
        return(
            <View style = {{position: 'absolute'}}>
                <View style={styles.titleBarView}>
                    {allChild}
                </View>
                <View style = {{
                    height:0,
                    width:SceneUtils.size.width,
                    borderBottomWidth:1,
                    borderColor:'rgb(210,210,210)'
                }}></View>
            </View>
        )
    }


    //微信分享
    wxShar = ()=>{
        var hsr = "http://chbblshare.rbrbrbrb.com/maria/share/index.html"
        console.log(hsr)
        wechat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                wechat.shareToSession({
                    title:'一款专门为宝宝定制成长软件',
                    description: '快一起来陪伴宝宝的成长。',
                    thumbImage: 'https://mmbiz.qlogo.cn/mmbiz_png/vdJW2MIibvJ6aL3f0zRfVXo8K7hPp7ia6yFpR4An8gG2ichf8fXDibXstoQMDRenmkdE16gm7hRXnksltkIw6BOo6g/0?wx_fmt=png',
                    webpageUrl: hsr,
                })
                    .catch((error) => {
                        Alert.alert(error.message);
                    });
            } else {
                Alert.alert('请安装微信');
            }
        });  
    }

    //显示视频下面的分享横条
    setChildDownView(number){
        if(this.state.isFullScreen){
            return;
        }
        return(
            <View style={styles.childDownView}>
                {/* <Image source = {require('./img/shuohua.png')} style={styles.childDownImage}/>
                <Text style={styles.childDownText}>{number}</Text> */}
                <TouchableOpacity
                            onPress = {this.wxShar}
                        >
                    <Image source = {require('./img/fenxiang.png')} style={styles.childDownImage2}/>
                </TouchableOpacity>
            </View>
        )
    }

    //显示弹窗  是否在4g下面播放
    show4gWindow = (i)=>{
        if(this.index2 === i){
            if(!DataUtil.getinstance().getCan4gVido() && DataUtil.getinstance().getNetWorkState()!='wifi'){
                console.log('show4gWindowshow')
                return(
                    <View style = {[styles.fullScreen,{position: 'absolute',backgroundColor:'rgb(51,51,51)',
                        alignItems:'center',justifyContent:'center',borderColor:'rgb(100,100,100)',borderWidth:1,
                    }]}>
                        <Text style ={{color:'white',fontSize:14}}>{'您现在播放需要消耗流量'}</Text>
                        <TouchableOpacity
                            onPress = {()=>{
                                this.setVideoToShow(this.index2,this.layout2)
                            }}
                        >
                            <View style = {{alignItems:'center',justifyContent:'center',marginTop:30,
                                    padding:10,borderColor:'rgb(100,100,100)',borderWidth:1
                            }}>
                                <Text style ={{color:'white',fontSize:12}}>{'继续播放'}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                )
            }
        }
    }

    //刷新ScrollView  显示每一个item
    renderScrollViewChild(){
        var allChild = [];
        var vlist = this.state.videoListMod
        var len = vlist.length
        for(var i = 0;i < len;i++){
            allChild.push(
                <View key={i} style={styles.childView}>
                    <MyVideoImage
                        //source='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525176480&di=f8aa81f6753e4773adb35030cb7eaf3b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201503%2F01%2F20150301143029_tnaTJ.jpeg'
                        source = {vlist[i].images}
                        style={styles.fullScreen}
                        // resizeMode='contain'
                        resizeMode='cover'
                        title={vlist[i].title}
                        totalTime={vlist[i].duration}
                        index={i}
                        onPress={(index,layout) => this._onPress(index,layout)}
                    >
                    </MyVideoImage>
                    {this.show4gWindow(i)}
                    {this.setChildDownView(vlist[i].commentCount)}
                </View>
            );
        }
        return allChild;
    }

    //判断他是否超出界面
    checkVideoIsOutWindow(scrollY){
        if(this.index < 0 || this.myVideo == null) return;
        
        var videoY = this.index * 250;
        if(videoY < scrollY - 200 || videoY > scrollY + this.scrollView.height){
            this.myVideo.pauseVideo();
        }
    }

    //滑动回调
    _onMomentumScrollEnd(event){
        if(this.state.isFullScreen){
            this.scrollView.scrollTo({y:0});
            return;
        }
        this.checkVideoIsOutWindow(event.nativeEvent.contentOffset.y);

        var endposition=event.nativeEvent.contentOffset.y;//取得拖拉后的位置
        this.positionY = endposition;
        var _scrollViewHeight = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
        if(_scrollViewHeight != this.scrollViewHeight){
            this.scrollViewHeight = _scrollViewHeight;
        }
        if(endposition > _scrollViewHeight){
            this.positionY = _scrollViewHeight;
            this.scrollView.scrollTo({y:this.positionY});
        }
    }
    //
    touchBack = (titleselect)=>{
        var i = titleselect
        var back = (sid)=>{
            const { navigate } = this.props.navigation;
            navigate('TextInfo',{ info:{id:sid,type:i}})
        }
        return back
    }

    //显示具体的那个板块内容   实现形式都是一样 区别在内容
    //注视看此模块就可以同步到其他界面去
    showBqMode = ()=>{
        this.isThis = false
        if(this.state.titleSelect === 0){
            this.isThis = true
            return this.showVido()
        }else if(this.state.titleSelect === 2){
            return (<Mp3View></Mp3View>)
        }else if(this.state.titleSelect === 1){
            return (<TextView
                navigation = {this.props.navigation}
                touchBack = {this.touchBack(1)}
            ></TextView>)
        }else if(this.state.titleSelect === 3){
            return (<ForumView
                touchBack = {this.touchBack(3)}
            ></ForumView>)
        }
    }

    //下啦刷新后 增加的数据
    onPullRelease=(resolve)=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,'offset':this.addSend};

        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson) =>{
                //下面的就是请求来的数据
                console.log(responseJson);
                this.getallmessagetodata(responseJson)
                resolve()
            }
        }
        NetService.do(NetService.sendvideos,mod)
    }

    //显示主要的列表
    showVido = ()=>{
        return (
        <View style={this.state.isFullScreen ? styles.otherView1 : styles.otherView}>
            <PullView
                ref= {ref=>{this.scrollView = ref}}
                bounces = {false}
                showsVerticalScrollIndicator = {false}
                // scrollEnabled = {!this.state.isFullScreen}
                onPullRelease = {this.onPullRelease}
                onMomentumScrollEnd={(event)=> {
                    this._onMomentumScrollEnd(event);
                }}
                onScrollEndDrag={(event)=> {
                    this._onMomentumScrollEnd(event);
                }}
                >
                {this.renderScrollViewChild()}
                {this.setVideo()}
                {this.showNoMore()}
            </PullView>
        </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={this.state.isFullScreen}/>
                {this.showBqMode()}
                {this.setTitleBar()}
                {this.showButtonReset()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(51,51,51)',
    },
    titleBarView:{
        flexDirection:'row',
        width:SceneUtils.size.width,
        justifyContent:'space-around',
        transform: [
            { translateX: 0 },
            { translateY: 0 }
        ],
        
    },
    otherView:{
        flex:1,
        marginTop:SceneUtils.size.height*0.048-1 + (DataUtil.getinstance().getVueStrByp()==='IOS'?23:0),
    },
    otherView1:{
        flex:1,
        marginTop:0,
    },
    fullScreen: {
        width:SceneUtils.size.width,
        height:200,
        alignItems:'center',
        justifyContent:'center'
    },
    titleBarBtn:{
        marginTop:DataUtil.getinstance().getVueStrByp()==='IOS'?0:0,
        width: SceneUtils.size.width/4,
        height: SceneUtils.size.height*0.048-1+23,
        justifyContent: 'center',
        backgroundColor:'rgb(51,51,51)'
    }, 
    lineBar:{
        position:'absolute',
        bottom:0,
        width: SceneUtils.size.width/4,
        height: 3,
        backgroundColor:'rgb(124,183,0)'
    },
    titleBarText:{
        textAlign: 'center',
    },
    titleBarTextIsSe:{
        color:'rgb(134,184,34)',
        fontSize:Util.setSpText(16),
    },
    titleBarTextnotSe:{
        color:'white',
        fontWeight:'700',
        fontSize:Util.setSpText(20),
    },

    childView:{
        width:SceneUtils.size.width,
        height:250,
    },
    childDownView:{
        width:SceneUtils.size.width,
        height:50,
        flexDirection:'row',
        alignItems:'center',
    },
    childDownImage:{
        marginLeft:SceneUtils.size.width * 0.625,
        width:18,
        height:16,
    },
    childDownText:{
        marginLeft:10,
        color:'white',
        fontWeight:'700'
    },
    childDownImage2:{
        marginLeft:50 + SceneUtils.size.width * 0.625,
        width:22,
        height:19,
    },
    viewButton:{
        position: 'absolute',
        width:200,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(134,184,34)',
        top:SceneUtils.size.height*0.5,
        left:SceneUtils.size.width*0.5-100
        
    },

    

});