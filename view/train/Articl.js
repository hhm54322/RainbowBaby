'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';

//文章板块
export default class Articl extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data.article     //文章data

        // "article": {
        //     "id": "20180509102607531597",
        //     "title": "一首唱给00后的歌，正青春的世界竟如此精彩，一起唱出幸福的节奏",
        //     "images": "http://oozojm6hp.bkt.clouddn.com/FpXZlv_Znu-ccjjq6irdaY61NknJ?imageView2/1/w/400/h/200/interlace/1/q/200/format/jpg",
        //     "commentCount": 0,
        //     "readingCount": 0,
        //     "type": "news",
        //     "createTime": 1525829200
        //         }
        // }
        this.state ={
            is:false
        }

    }
    componentDidMount(){

    }

    //显示文字的内容名字文字
    showNumberAbility = ()=>{
        var arry = this.props.data.ability
        //abilityName    //abilityValue
        var textd = ''
        var len = arry.length
        for(var i = 0;i<len;i++){
            textd+=arry[i].abilityName+'+'+arry[i].abilityValue
            if(i < len - 1 ){
                textd+=','
            }
        }
        return (<Text style = {styles.textability}>{textd}</Text>)
    }

    render() {
        var data = this.data
        if(this.state.is === true){
            this.props.data.trained = 1
        }
        var textd = this.props.data.trained === 0?'训练宝宝':'已完成'
        var bac = this.props.data.trained === 0? {backgroundColor:'rgb(143,184,34)'}:{backgroundColor:'rgb(238,176,99)'}
        return (
            <TouchableWithoutFeedback
                onPress = {()=>{

                }}
            >
                <View style={styles.mainView}>
                    <View style = {styles.centerView}>
                        <Image
                            style = {styles.imageView}
                            source={{uri:data.images}}
                        ></Image>
                        <View style = {[styles.btnView,bac]}>
                                <Text 
                                onPress = {()=>{
                                    if(this.props.data.trained === 1){
                                        return
                                    }
                                    if(this.props.touchBack){
                                        this.props.touchBack(this.props.data,this.props.data.article.id)
                                        this.setState({
                                            is:true
                                        })
                                    }
                                }}
                                style = {styles.fontxl}>{textd}</Text>
                        </View>
                        {this.showNumberAbility()}
                    </View>
                    <View style = {{width:SceneUtils.size.width*0.92,borderColor:'rgb(100,100,100)'
                ,borderBottomWidth:1}}></View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        marginTop:10,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.26+11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.26,
        borderRadius:12,
        backgroundColor:'rgb(150,150,150)',
    },
    imageView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.26,
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
    },
    textability:{
        textAlign:'center',
        position: 'absolute',
        right:0,
        bottom:10,
        width:110,
    },
    btnView:{
        position: 'absolute',
        right:20,
        bottom:30,
        width:70,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    fontxl:{
        color:'white',
        fontWeight:'700',
        fontSize:12,
    },
});