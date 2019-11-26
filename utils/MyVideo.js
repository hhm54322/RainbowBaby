'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import Video from 'react-native-video';
import Slider from './Slider';
import SceneUtils from '../utils/SceneUtils';
import DataUtil from './DataUtil'
import RNLandsOrPor from 'react-native-landsorpor';


//视频相关  具体实现不知道问你上司
export default class MyVideo extends Component {
    static propTypes = {
        source:PropTypes.string,
        resizeMode:PropTypes.string,
        repeat:PropTypes.bool,
        style:PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        title:PropTypes.string,
        totalTime:PropTypes.number,
    }
    static defaultProps = {
        source: '',
        resizeMode: 'contain',
        repeat:false,
        title:'',
        totalTime:0,
    };
    constructor(props) {
        super(props);
        this.slider = null
        this.state = {
            width:0,
            height:0,
            volume:1,
            paused:false,
            isShowBtn:false,
            isFullScreen:false,
            sliderValue:0,
            bufferValue:0,
            totalTime:this.props.totalTime,
            title:this.props.title,
            source:this.props.source,
            index:this.props.index,
        };
    }
    formatTime(time) {
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    _onLoad(event){
        console.log('_onLoad');
        this.setShowBtnTimeout();
        // this.refs.myVideo.seek(500);
    }
    _onLoadStart(event){
        console.log('_onLoadStart');
    }
    _onProgress = (event)=>{
        var currentTime = parseInt(event.currentTime)
        var buffer = parseInt(event.playableDuration)
        
        if(currentTime <= this.state.totalTime){
            this.setState({
                sliderValue:currentTime,
                bufferValue:buffer,
            })
        }else{
            this.timer && clearTimeout(this.timer);
            this.setState({
                paused:true,
            })
        }
    }
    _onEnd(event){
        this.props.onEnd(false);
    }
    _onError(event){
        console.log('_onError');
    }
    _onBuffer(event){
        console.log('_onBuffer');
    }
    _onAudioBecomingNoisy(){
        console.log('_onAudioBecomingNoisy');
    }
    _onAudioFocusChanged(){
        console.log('_onAudioFocusChanged');
    }
    pauseVideo(){
        if(!this.state.paused){
            this.setState({
                paused:true
            })
            console.log('超出屏幕了,暂停');
        }
    }
    setShowBtnTimeout(){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.setState({
                    isShowBtn: false,
                })
            },
            5000
        );
    }
    setCenterBtn(){
        if(this.state.paused){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                        this.timer && clearTimeout(this.timer);
                        this.setState({
                            paused:false,
                            isShowBtn:false,
                        })
                    }
                }>
                    <Image source = {require('./img/play.png')} style = 
                    {{width:this.state.height/3,height:this.state.height/3}}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                        this.setShowBtnTimeout();
                        this.setState({
                            paused:true,
                        })
                    }
                }>
                    <Image source = {require('./img/pause.png')} style = 
                    {{width:this.state.height/3,height:this.state.height/3}}/>
                </TouchableOpacity>
            )
        }
    }
    setTitle(){
        if(this.state.isFullScreen){
            return(
                <View style={styles.titleView}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{alignSelf: 'center'}}
                            onPress={() => {
                                this.props.onFullScreen(false)
                                RNLandsOrPor.RNLandsSet(false,()=>{
                                    console.log('RNLandsOrPor callback enter')
                                })
                                DataUtil.getinstance().setNotFullView()
                                this.setState({
                                    isFullScreen:false,
                                })
                            }
                        }>
                            <Image source = {require('./img/arrow36.png')} style={styles.unFullScreenImage}/>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>{this.state.title}</Text>
                    </View>
                    {/* <Image source = {require('./ICON_05.png')} style={styles.fullScreenSetImage}/> */}
                </View>
            )
        }else{
            return(
                <View style={{height:50}}>
                    <Text style={styles.titleText}>{this.state.title}</Text>
                </View>
            )
        }
    }
    setDownView = ()=>{
        return(
            <View style={[styles.downView,{justifyContent:'space-around'}]}>
                {this.setSoundBtn()}
                <Text style={styles.downCurrentTimeText}>{this.formatTime(this.state.sliderValue)}</Text>
                <Slider
                    ref = {ref =>this.slider = ref}
                    value={this.state.sliderValue}
                    buffer={this.state.bufferValue}
                    style={{ width: this.state.isFullScreen ?this.state.width * 0.65:this.state.width * 0.47}}

                    // value={this.sliderValue}
                    // style={{width:150}}
                    // buffer={this.bufferValue}
                    
                    // trackStyle
                    thumbStyle={styles.sliderBall}
                    minimumValue={0}
                    maximumValue={this.state.totalTime}
                    step={1}
                    minimumTrackTintColor='#00C5CD'
                    maximumTrackTintColor='black'
                    bufferTrackTintColor='gray'
                    onValueChange={(value) => {
                        this.timer && clearTimeout(this.timer);
                    }}
                    onSlidingComplete={(value) => {
                        this.refs.myVideo.seek(value);
                        this.setState({
                            sliderValue:value
                        })
                    }}
                />
                <Text style={styles.downCurrentTimeText}>{this.formatTime(this.state.totalTime)}</Text>
                {this.setFullScreenBtn()}
            </View>
        )
    }
    setBgOnPress = ()=>{
        if(this.state.isShowBtn){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        if(this.state.isShowBtn){
                            this.setState({
                                isShowBtn:false,
                            })
                        }else{
                            this.setShowBtnTimeout()
                            this.setState({
                                isShowBtn:true,
                            })
                        }
                    }
                }>
                    <Image source = {require('./img/playBg.png')} style = 
                        {{position: 'absolute',width:this.state.width,height:this.state.height}}/>
                    {this.setTitle()}
                    {this.setCenterBtn()}
                    {this.setDownView()}
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        if(this.state.isShowBtn){
                            this.setState({
                                isShowBtn:false,
                            })
                        }else{
                            this.setShowBtnTimeout()
                            this.setState({
                                isShowBtn:true,
                            })
                        }
                    }
                }>
                </TouchableOpacity>
            );
        }
    }
    setSoundBtn(){
        if(this.state.volume == 0){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center',marginLeft:10}}
                    onPress={() => {
                        this.setState({
                            volume:1,
                        })
                    }
                }>
                    <Image source = {require('./img/mute.jpg')} style = 
                    {{width:this.state.height * 0.1,height:this.state.height * 0.1*0.71}}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center',marginLeft:10}}
                    onPress={() => {
                        this.setState({
                            volume:0,
                        })
                    }
                }>
                    <Image source = {require('./img/soundHigh.jpg')} style = 
                    {{width:this.state.height * 0.1,height:this.state.height * 0.1*0.71}}/>
                </TouchableOpacity>
            )
        }
    }
    setFullScreenBtn(){
        if(this.state.isFullScreen){
            return null;
        }
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{alignSelf: 'center',marginRight:10}}
                onPress={() => {
                    this.props.onFullScreen(true)
                    DataUtil.getinstance().setFullView()
                    RNLandsOrPor.RNLandsSet(true,()=>{
                        console.log('RNLandsOrPor callback enter')
                    })
                    this.setState({
                        isFullScreen:true,
                    })
                }
            }>
                <Image source = {require('./img/maximization.png')} style = 
                {{width:this.state.height * 0.1,height:this.state.height * 0.1}}/>
            </TouchableOpacity>
        )
    }
    layout(e){
        let width = e.layout.width;
        if (!width || width === this.state.width)
            return;
        this.setState({
            width: width,
            height: e.layout.height
        }) 
    }
    _onRequestClose(){
        console.log('_onRequestClose');
    }
    render() {
        return (
            <View ref='view' style={this.state.isFullScreen ? styles.fullStyle : 
                {width:this.props.sWidth,height:this.props.sHeight,
                transform: [
                    { translateX: 0 },
                    { translateY: this.state.index * 250 }
                ],
                position: 'absolute',
                }} onLayout={({nativeEvent:e})=>this.layout(e)}>
                <Video
                    ref='myVideo'
                    //source={{ uri: 'http://p04h58q2i.bkt.clouddn.com/Fi3kA8eHVbtiKTGxBgWM_9Qy25rr.mp3'}}
                    source={{ uri: this.state.source}}
                    // source={require('../../lkl.mp4')}
                    style={styles.fullScreen}
                    // rate={this.state.rate}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    paused={this.state.paused}
                    volume={this.state.volume}                   // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    resizeMode={this.props.resizeMode}       // 视频的自适应伸缩铺放行为，
                    onLoad={(e) => this._onLoad(e)}                       // 当视频加载完毕时的回调函数
                    onLoadStart={(e) => this._onLoadStart(e)}            // 当视频开始加载时的回调函数
                    onProgress={(e) => this._onProgress(e)}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={(e) => this._onEnd(e)}             // 当视频播放完毕后的回调函数
                    onError={(e) => this._onError(e)}    // 当视频不能加载，或出错后的回调函数
                    onBuffer={(e) => this._onBuffer(e)}
                    onAudioBecomingNoisy={this._onAudioBecomingNoisy}
                    onAudioFocusChanged={this._onAudioFocusChanged}
                    repeat={this.state.repeat}                            // 是否重复播放
                />
                {this.setBgOnPress()}
            </View>
        );
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }

    setVideoData(_paused,_totalTime,_title,_source,_index){
        this.setState({
            paused:_paused,
            sliderValue:0,
            bufferValue:0,
            totalTime:_totalTime,
            title:_title,
            source:_source,
            index:_index
        })
    }
    
}
const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor:'black'
    },
    fullStyle:{
        position: 'absolute',
        width:SceneUtils.size.height,
        height:SceneUtils.size.width,
    },
    uiView:{
        position: 'absolute',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width:SceneUtils.size.width,
        // height:SceneUtils.size.height,
        // backgroundColor: 'rgba(0,0,0,0.6)',
    },
    bgView:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent:'space-between',
        backgroundColor:'rgba(255,255,255,0.0)',
    },
    titleView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    titleText:{
        marginTop:10,
        marginLeft:5,
        color:'white',
    },
    downView:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
    },
    downTotalTimeView:{
        flexDirection:'row',
    },
    downCurrentTimeText:{
        width:40,
        fontSize:12,
        color:'white',
        marginLeft:5,
    },
    sliderBall:{
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 10 / 2,
    },
    unFullScreenImage:{
        width:30,
        height:30,
        resizeMode:'contain',
        marginLeft:10,
    },
    fullScreenSetImage:{
        width:40,
        height:20,
        resizeMode:'contain',
        marginRight:10,
    }
});
