'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import NetService from '../../utils/NetService'
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';

//消息   纯显示
export default class NotifyView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas:[],
        };
    }

    componentDidMount(){
        this.showMessage();
    }

    showMessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.setState({
                    datas: responseJson
                })
            }
        }
        NetService.do(NetService.sendnotices,mod)
    }

    _onPress(index){
        console.log(index);
    }
    renderScrollViewChild(){
        var allChild = [];
        var l = this.state.datas.length
        for(var i = 0;i < l;i++){
            var time = this.state.datas[i].createTime.substring(0,11)
            allChild.push(
                <View key={i} style={styles.childView}>
                    <View style={styles.titleView}>
                        <Text style = {styles.titleText}>
                        {this.state.datas[i].title}</Text>
                        
                    </View>
                    <View style={styles.contentView}>
                        <Text style = {styles.contentText} >
                        {this.state.datas[i].content}</Text>
                    </View>
                    {/* <View style={styles.contentView}>
                        <Text style = {styles.titleText}>
                        需要得到您的同意才可删除</Text>
                    </View> */}
                    <View style={styles.contentView}>
                        <Text style ={styles.timeText}>{time}</Text>
                    </View>
                </View>
            );
        }
        return allChild;
    }


    showendNoStr = ()=>{
        var len = this.state.datas.length
        console.log(len)
        if(len <=0){
            return(
                <Text style= {{fontWeight:'900',fontSize:25,color:'white'}}>{'暂无最新消息'}</Text>
            )
        }else{
            return(
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    >
                    {this.renderScrollViewChild()}
                </ScrollView>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showendNoStr()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer:{
    },
    childView:{
        marginBottom:10,
        width:SceneUtils.size.width*0.94,
        marginLeft:SceneUtils.size.width*0.02,
        paddingBottom:25,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    titleView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height:SceneUtils.size.height*0.05
    },
    contentView:{
    },
    titleText:{
        fontSize:16,
        color:'white',
        fontWeight:'900',
        marginBottom:4,
    },
    contentText:{
        fontSize:12,
        color:'white',
        marginBottom:4,
    },
    timeText:{
        color:'rgb(120,120,120)',
        fontSize:10,
        marginTop:10,
    },
});