'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Linking,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'

//通知  纯显示界面  拿到消息显示
export default class NoticeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    componentDidMount(){
        this.showMessage();
    }

    //发送消息显示
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
                    data: responseJson
                })
            }
        }
        NetService.do(NetService.sendannouncement,mod)
    }

    _onPress(index){
        console.log(index);
        var urld = this.state.data[index].referenceUrl
        Linking.canOpenURL(urld).then(supported => { 
            if (!supported) { 
            } else { 
               return Linking.openURL(urld); 
            } 
        }).catch(err => console.error('An error occurred',urld)); 
    }
    renderScrollViewChild(){
        var allChild = [];
        var dt = this.state.data
        var len = dt.length
        for(var i = 0;i < len;i++){
            console.log(dt[i].referenceImg)
            allChild.push(
                <TouchableOpacity
                    key={i} 
                    activeOpacity={1}
                    onPress={this._onPress.bind(this, i)}>
                    <View style = {styles.imageView}>
                        <Image source = {{uri:dt[i].referenceImg}} 
                        style = {styles.image}/>
                    </View>
                    
                </TouchableOpacity>
            );
        }
        return allChild;
    }
    showendNoStr = ()=>{
        var dt = this.state.data
        var len = dt.length
        if(len <=0){
            return(
                <Text style= {{fontWeight:'900',fontSize:25,color:'white'}}>{'暂无最新通知'}</Text>
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
    imageView:{ 
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height * 0.3 + 20,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        borderRadius:10,
    },
    image:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height * 0.3,
        backgroundColor:'rgb(230,230,230)',
        borderRadius:10,
    },
});