'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ImageBackground,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'


//个人信息界面
export default class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRef:true
        }
    }

    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
        header:null,
        // title: '个人中心',
        // //title:navigation.state.params.user.nickname,
        // headerStyle:{
        //     backgroundColor:'rgb(51,51,51)',
        //     borderBottomWidth:1,
        //     borderColor:'rgb(100,100,100)'
        // },
        // headerTitleStyle:{
        //     color:'white',
        // },
      
    });
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('baby', ()=>{
            this.famliyList = DataUtil.getinstance().getMainFamliy();
            this.setState({
                isRef:!this.state.isRef
            })
        });
    }
        
        
        
    componentWillUnmount(){
        

        this.subscription.remove();
    }


    //显示head 以及head旁边相关的按钮
    showTopView = ()=>{
        var acc = DataUtil.getinstance().getAccont()
        console.log(acc)
        return (
            <View style = {{alignItems:'center',borderBottomWidth:1,borderColor:'rgb(100,100,100)',}}>
                <Image
                    style = {{width:150,height:150,borderRadius:75,margin:30}}
                    source = {acc.headshot == null || acc.headshot == '' ? require('../../utils/img/userHead.png') : {uri: acc.headshot}} 
                    >
                </Image>
                <Text style = {{color:'rgb(200,200,200)',fontSize:18,fontWeight:'900',marginBottom:10}}>{acc.nickname}</Text>
                <Text style = {{color:'rgb(180,180,180)',fontSize:18,fontWeight:'900'}}>{ 'ID:'+ acc.id}</Text>

                <TouchableWithoutFeedback
                    onPress = {()=>{
                        const { navigate } = this.props.navigation;
                        navigate('EditProfile')
                    }}
                >
                    <View style = {{backgroundColor:'rgb(134,184,34)',width:120,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:20,marginBottom:20}}>
                        <Text style = {{color:'white',fontWeight:'900',fontSize:21}}>{'编辑资料'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    //显示app info
    showWenzi = ()=>{
        return (
            <View style= {{alignItems:'center',}}>
                <Text style = {{fontSize:18,fontWeight:'700',color:'rgb(180,180,180)',marginTop:20,marginBottom:10}}>{'关于我们'}</Text>
                <Text style = {{fontSize:16,fontWeight:'300',color:'rgb(120,120,120)',width:SceneUtils.size.width*0.94}}>
                {'彩虹宝宝是一款锻炼学龄前宝宝能力，增进亲子间情感的家庭生活类软件，通过完成每日发布的亲子任务，分别从认知，语言，生活，学习，思维和创造六大方面，记录下宝宝各个阶段的能力发展直观反映出宝宝的六项数值，帮助父母准确了解宝宝的成长方向。'}
                </Text>
            </View>
        )

    }

    //显示文字下面的logo图片
    showDiImaga = ()=>{
        return(
            <View style = {{ position:'absolute',
             bottom:0,alignItems:'center',justifyContent:'center'}}>
                <Image style = {styles.topViewimage}
                    source = {require('../login/img/wzibg.png')}
                > 
                </Image>
            </View>
            
        )
    }
    showDownLoad  =()=>{

    }

    //head  右边的设置等按钮
    showaddbtn = ()=>{
        return(
            <TouchableWithoutFeedback 
            onPress = {()=>{
                const { navigate } = this.props.navigation;
                        navigate('SetUp')
            }}
            >
            <View style = {{ position:'absolute',
            width:50,height:50,justifyContent:'center',alignItems:'center',top:18,
            right:0}}>
                <Image style = {styles.setupimg}
                    source = {require('./img/setup.png')}
                > 
                </Image>
            </View>
            </TouchableWithoutFeedback>
        )
    }



    //head
    showHeade = ()=>{
        return(
            <View style = {{height:50,width:SceneUtils.size.width,alignItems:'center',
            borderBottomWidth:1,borderColor:'rgb(100,100,100)',flexDirection:'row',
            marginTop:18,
            }}>
                <TouchableWithoutFeedback
                    onPress = {()=>{
                        this.props.navigation.goBack();
                    }}
                >
                    <Image 
                    style = {[styles.imgLeft,{marginLeft:12}]}
                    source = {require('./img/pback.png')}
                    ></Image>
                </TouchableWithoutFeedback>
                <Text style = {{color:'white',fontSize:17,fontWeight:'900',marginLeft:SceneUtils.size.width*0.34,
            
            }}>{'个人中心'}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style = {styles.mainstyle}>
                {this.showHeade()}
                {this.showTopView()}
                {this.showWenzi()}
                {this.showDiImaga()}
                {this.showaddbtn()}
                {this.showDownLoad()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainstyle: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },
    topViewimage:{
        width:SceneUtils.size.width*0.8,
        marginLeft:SceneUtils.size.width*0.1,
        height:SceneUtils.size.height*0.17,
        resizeMode :'stretch',
    },
    setupimg:{
        width:25,
        height:25,
        resizeMode :'stretch',
    },
    imgLeft:{
        width:10,
        height:20,
        resizeMode :'stretch',
    },
    downImage:{
        width:25,
        height:25,
        resizeMode :'stretch',
    },
});