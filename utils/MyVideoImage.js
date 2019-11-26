'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  NativeModules,
} from 'react-native';

import PropTypes from 'prop-types';
import SceneUtils from '../utils/SceneUtils';



//视频图   具体实现不知道问你上司
export default class MyVideoImage extends Component {
    static propTypes = {
        source:PropTypes.string,
        resizeMode:PropTypes.string,
        style:PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        title:PropTypes.string,
        totalTime:PropTypes.number,
        index:PropTypes.number,
    }
    static defaultProps = {
        source: '',
        resizeMode: 'contain',
        title:'',
        totalTime:0,
        index:0
    };
    constructor(props) {
        super(props);
        this.state = {
            width:0,
            height:0,
            layout:null,
        };
    }
    formatTime(time) {
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    setCenterBtn(){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{alignSelf: 'center'}}
                onPress={() => {
                    // this.props.onPress(this.props.index,this.state.layout);
                }
            }>
                <Image source = {require('./img/play.png')} style = 
                {{width:this.state.height/3,height:this.state.height/3}}/>
            </TouchableOpacity>
        )
    }
    setTitle(){
        return(
            <View style={{height:50}}>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        )
    }
    setDownView(){
        return(
            <View style={[styles.downView,{justifyContent:'space-between'}]}>
                <View/>
                <Text style={styles.downTotalTimeText}>{this.formatTime(this.props.totalTime)}</Text>
            </View>
        )
    }

    setBgOnPress = ()=>{
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={styles.bgView}
                onPress={() => {
                    this.props.onPress(this.props.index,this.state.layout);
                }
            }>
            </TouchableOpacity>
        );
    }
    layout(e){
        let width = e.layout.width;
        if (!width || width === this.state.width)
            return;
        this.setState({
            width: width,
            height: e.layout.height,
            layout:e.layout,
        })
    }
    render() {
        return (
            <View ref='view' style={this.props.style} onLayout={({nativeEvent:e})=>this.layout(e)}>
                <ImageBackground style={{width:this.state.width,height:this.state.height}} source={require('./img/videoBg.png')}>
                    <ImageBackground
                    source = {{uri: this.props.source}} 
                    style = {{position: 'absolute',width:this.state.width,height:this.state.height}}
                    resizeMode = {this.props.resizeMode}>
                        <View style={{
                            position: 'absolute',
                            justifyContent: 'space-between',
                            width:this.state.width,
                            height:this.state.height,
                            backgroundColor:'rgba(0,0,0,0.6)'}}>
                            {this.setTitle()}
                            {this.setCenterBtn()}
                            {this.setDownView()}
                        </View>
                    </ImageBackground>
                </ImageBackground>
                {this.setBgOnPress()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    fullStyle:{
        position: 'absolute',
        width:SceneUtils.size.height,
        height:SceneUtils.size.width,
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
        // marginBottom:10,
    },
    downTotalTimeText:{
        fontSize:12,
        color:'white',
        alignSelf:'center',
        marginRight:10,
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
});
