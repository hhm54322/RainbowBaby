'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import NoticeView from './NoticeView' //weixin 0
import SuggestView from './SuggestView' // fankui&jianyi 1
import ChargeRecordView from './ChargeRecordView' //czjilv 2
import NotifyView from './NotifyView' //tz 3

import DataUtil from '../../utils/DataUtil'


//通知主要页面
export default class NoticeMain extends Component {
    constructor(props) {
        super(props);
        this.tepm = ['通知','反馈建议','充值记录','消息']       //4种类型的文字
        if(DataUtil.getinstance().getISsh()){
            
        }
        this.tepm = ['通知','反馈建议','消息']      //根据需求变成3中 暂时
        this.mapd = new Map()
        this.mapd.set(0,<NoticeView></NoticeView>) 
        this.mapd.set(1,<SuggestView></SuggestView>) 
        this.mapd.set(2,<NotifyView></NotifyView>)         //注册好3个界面

        if(!DataUtil.getinstance().getISsh()){
            //this.mapd.set(2,<ChargeRecordView></ChargeRecordView>) 
        }
        this.indexf = this.props.navigation.state.params.index      //打开的时候显示哪一个模块
        this.state = {
            index:this.indexf,
        }
    }

    //显示线
    showLine = (i)=>{
        if(i<=2){
            return (
                <View style = {styles.feView}>
                </View>
            )
        }
    }

    //显示是否点击的样式
    showTabHowStyle = (i)=>{
        if(i === this.state.index){
            return styles.tabTouchedView
        }
        return styles.tabVie
    }

    //显示是否点击的文字样式
    showTextbHowStyle = (i)=>{
        if(i === this.state.index){
            return styles.textTouchedtab
        }
        return styles.texttab
    }

    //点击其中一个btn的回调
    touchOne = (i)=>{
        var ii = i
        return ()=>{
            this.setState({
                index:ii,
            })
        }
    }

    //显示title
    showTitle = ()=>{
        var t = [];
        var l = this.tepm.length
        for (var i = 0;i<l ;i++){
            t.push(
                <TouchableWithoutFeedback
                key = {i}
                onPress  = {this.touchOne(i)}
                >
                <View 
                style = {styles.oneView}>
                    <View style ={this.showTabHowStyle(i)}>
                        <Text style = {[styles.textView,this.showTextbHowStyle(i)]}>{this.tepm[i]}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            )
        }
        return t
    }
    render() {
        console.log(this.mapd)
        return (
            <View style={styles.container}>
                <View style = {styles.headView}>
                    {this.showTitle()}
                </View>
                <View style = {styles.downView}>
                    {this.mapd.get(this.state.index)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgb(51,51,51)',
    },
    downView:{
        flex: 1,
    },
    headView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:SceneUtils.size.height*0.1,
        width:SceneUtils.size.width,
        backgroundColor:'rgb(51,51,51)',
    },
    oneView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:SceneUtils.size.width*0.25,
        height:SceneUtils.size.height*0.1,
    },
    feView:{
        marginTop:7,
        height:SceneUtils.size.height*0.025,
        width:3,
        marginLeft:3,
    },
    tabVie:{
        marginTop:8,
        alignItems:'center',
        justifyContent:'center',
        width:SceneUtils.size.width*0.22,
        height:SceneUtils.size.height*0.06,
        borderBottomWidth:3,
        borderColor:'rgb(30,30,30)'
    },
    tabTouchedView:{
        marginTop:8,
        alignItems:'center',
        justifyContent:'center',
        width:SceneUtils.size.width*0.22,
        height:SceneUtils.size.height*0.06,
        borderBottomWidth:3,
        borderColor:'rgb(134,184,34)'
    },
    textView:{
      fontSize:17,  
    },
    texttab:{
        color:'rgb(150,150,150)'
    },
    textTouchedtab:{
        color:'rgb(134,184,34)'
    },
    
});