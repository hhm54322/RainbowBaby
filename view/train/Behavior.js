'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';
export default class Behavior extends Component {
    constructor(props) {
        super(props);

        // "behavior": {
        //     "id": 11,
        //     "title":"xxxxxxxxxxxxx",
        //     "content":"xxxxxxxxxxxxx",
        //     "backgroundImg":"q/200/format/jpg",
        //     "achievementTime": 60
        // }

         this.data = this.props.data.behavior
        //     id:1000,
        //     title:"快来一起完王者荣耀呀呀呀啊呀呀呀王者荣耀",
        //     backgroundImg:''
        // }
        this.state ={
            is:false
        }
        console.log(this.data)
    }
    componentDidMount(){

    }


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
        if(data.backgroundImg === null){
            data.backgroundImg = 'http://ddadsdsaasdas'
        }

        //rgb(238,176,99)
        //backgroundColor:'rgb(143,184,34)',
        //trained
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
                        <ImageBackground
                            resizeMode = {'stretch'}
                            style = {styles.imageView}
                            source={require('./bd.png')}
                        >
                            <Text style = {styles.fontxcenter}>{this.data.title}</Text>
                            <View style = {{justifyContent:'center',alignItems:'center'
                                ,height:SceneUtils.size.height*0.26/2,width:SceneUtils.size.width*0.88,
                                marginLeft:SceneUtils.size.width*0.04
                            }}>
                                <Text style = {styles.fontxcenter2}>{this.data.content}</Text>
                            </View>
                            
                            <View style = {[styles.btnView,bac]}>
                                <Text 
                                onPress = {()=>{
                                    if(this.props.data.trained === 1){
                                        return
                                    }
                                    if(this.props.touchBack){
                                        this.props.touchBack(this.props.data,this.props.data.behavior.id)
                                        this.setState({
                                            is:true
                                        })
                                    }
                                }}
                                style = {styles.fontxl}>{textd}</Text>
                            </View>
                            {this.showNumberAbility()}

                        </ImageBackground>
                        
                    </View>
                    <View style = {{width:SceneUtils.size.width*0.92,borderColor:'rgb(100,100,100)'
                ,borderBottomWidth:1,marginTop:10}}></View>
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
    fontxcenter:{
        //color:'white',
        fontWeight:'700',
        fontSize:20,
        marginTop:5,
    },
    fontxcenter2:{
        fontWeight:'700',
        fontSize:18,
        alignSelf:'center'
    },
    fontxl:{
        color:'white',
        fontWeight:'700',
        fontSize:12,
    },
});