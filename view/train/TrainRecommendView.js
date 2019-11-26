'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

import GameViewOne from './GameViewOne'
import Articl from './Articl'
import VideoOneView from './VideoOneView'
import Behavior from './Behavior'
import MyVideo from '../../utils/MyVideo';
import SceneUtils from '../../utils/SceneUtils';

import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'
//宝宝训练推荐
export default class TrainRecommendView extends Component {
    constructor(props) {
        super(props)
        this.index = -1
        this.baby = this.props.navigation.state.params.baby     //宝宝的data
        this.mode = [
            {index:1}
        ]
        //listviewdata
        this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.listData.cloneWithRows(this.mode),
            index:-1,
            data:{}
        }
    }
    componentDidMount(){
        //发送推荐训练里面的所有训练
        this.pushmessage()
    }

    //消息返回  重新渲染listview
    messageBack = (j) =>{
        console.log(j)
        this.mode = j
        this.mode.push({index:1})
        this.setState({
            dataSource: this.listData.cloneWithRows(this.mode),
        })
    }
    //发送推荐训练里面的所有训练
    pushmessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,childId:this.baby.id};

        var farry = []
        var dataArry = []
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.messageBack
        }
        farry.push(NetService.sendtrainings)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)

    }

    //重写head函数
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
    //   title: `Chat with ${navigation.state.params.user}`,
        title:'训练推荐',
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    //如果是视频  则播放视频
    videoImageTouchBack = (i,data)=>{
        this.setState({
            data:data,
            index:i,
            dataSource: this.listData.cloneWithRows(this.mode),
        })
    }
    

    //设置vieo
    setVideoView = (data)=>{
            if(this.state.index === -1){
                return null
            }
            var uri = data.link
            var title = data.title
            return(
                    <MyVideo
                        source= {uri}
                        style={[styles.centerView,{
                            transform: [
                                { translateX: SceneUtils.size.width*0.03 },
                                { translateY: SceneUtils.size.height*0.3 * (this.state.index) + SceneUtils.size.width * 0.02 }
                            ],
                            position: 'absolute',
                        }]}
                        // resizeMode='contain'
                        resizeMode='cover'
                        title={title}
                        totalTime={data.duration}
                        onFullScreen={(b) => this._onFullScreen(b)}
                    />
                )
        return null
    }

    sendTrunBack = (j)=>{
        console.log(j)
    }

    //点击完成后  向服务器发送消息
    touchBack = (data,id)=>{
        
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,trainId:id,trainType:data.trainType};
        var mod = {
            type:'post',
            url:'/maria/account/family/main/children/'+this.baby.id+''+'/trainings',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.sendTrunBack
        }
        
        var farry = []
        var dataArry = []
        farry.push(NetService.sendtrainingsPost)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)
    }

    //根据数据类型  显示不同的类型显示
    showOneLine = (data) =>{
        console.log('data enter')
        this.index++;
        var indexd = 'index'
        console.log(data)
        if(indexd in data){
            return this.setVideoView(this.state.data)
        }
        //显示游戏类型
        if(data.trainType === 'game'){
            return (<GameViewOne
                data = {data}
                touchBack = {this.touchBack}
            ></GameViewOne>)
            //显示文章类型
        }else if(data.trainType === 'article'){
            return (<Articl
                data = {data}
                touchBack = {this.touchBack}
            ></Articl>)
        }else if(data.trainType === 'video'){
            console.log('vido')
            //显示视频类型
            return (
                <VideoOneView
                    data = {data}
                    index = {this.index}
                    onPress = {this.videoImageTouchBack}
                    touchBack = {this.touchBack}
                ></VideoOneView>
            )
        }else if(data.trainType === 'behavior'){
            //显示行为类型
            return (<Behavior
                touchBack = {this.touchBack}
                data = {data}
            ></Behavior>)
        }
    }
    render() {
        this.index = -1;
        return (
            <View style = {styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneLine}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(51,51,51)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textView: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color:'red'
    },
    centerView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.28,
        borderRadius:12,
        backgroundColor:'rgb(150,150,150)',
    },
});