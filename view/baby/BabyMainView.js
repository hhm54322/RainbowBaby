'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import BabyProp from './BabyProp';
import BabyEvent from './BabyEvent';
import BabyFamily from './BabyFamily';
import {ImagePicker} from '../../utils/ImagePicker'
import DataUtil from '../../utils/DataUtil'
import FloatText from '../../utils/FloatText'
import Util from '../../utils/Util'
import NetWork from '../../utils/NetWork'

import DateUtil from '../../utils/DateUtil'



// ImagePicker.ShowSelectPhoto((source)=>{
                                        //     console.log(source)
                                        //     var token = DataUtil.getinstance().getUserData().access_token
                                        //     let paramsd = {'access_token':token};
                                        //     var formData = new FormData()
                                        //     let file = {uri: source.uri, type: 'application/octet-stream', name: '6F07180A-D553-4BA0-93DD-80093FF3402D.jpg'};
                                        //     formData.append('file',file)
                                        //     console.log(formData)
                                        //     let params = {cellPhoneNumber:this.state.username,countryCode:'86'};
                                        //     NetUtil.postf('/maria/services/image_uploading',paramsd,formData,
                                        //     ['multipart/form-data','application/json'],(responseJson) =>{
                                        //         console.log(responseJson);
                                        //     })
                                        // })

//tab宝宝主页面
export default class BabyMainView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            titleTabSelected:0,
            isRef:true
        };
    }



    componentDidMount(){
        //监听数据变化后刷新
        this.subscription = DeviceEventEmitter.addListener('baby', ()=>{
            this.setState({
                isRef:!this.state.isRef
            })
        });
    }
        
    componentWillUnmount(){
        
        this.subscription.remove();
        
    }

    //更改编辑的状态
    _onTitleTabSelected(value){
        if(this.state.titleTabSelected !== value){
            this.setState({
                titleTabSelected:value,
            })
        }
    }

    //根据是否完成基础成长判断跳转
    _onBabyDownBtnClick(value,subValue){
        //value: 0.跳转宝宝训练主界面   1.跳转基础成长界面
        const { navigate } = this.props.navigation;
        if(value === 0){
            navigate('TrainMain',{ user: subValue })
        }else if(value === 1){
            navigate('Growth',{babyData:subValue})
        }
    }

    //显示创建宝宝按钮
    showAddapp = ()=>{
        if(this.state.titleTabSelected != 0)
        {
            return null
        }
        const { navigate } = this.props.navigation;
        return (
        <View style = {styles.createbbView}>
            <TouchableOpacity onPress ={() => navigate("CreateBaby",{info:true})}>
                <Image
                    source = {require('./img/1.png')} 
                    style = {styles.addBabyiamge}
                >
                </Image>
            </TouchableOpacity>
        </View>
        )
    }

    // showDDDDDss= ()=>{
    //     if(DataUtil.getinstance().getISsh()){
    //         return (
    //             <View style = {{position:'absolute',bottom:-70}}>
    //                 <Image source = {require('./img/dddd.png')}
    //                     style = {{width:SceneUtils.size.width,height:70}}>
    //                 </Image>
    //             </View>
    //         )
    //     }else{
    //         return(<View></View>)
    //     }
    // }
    render() {
        
        const { navigate } = this.props.navigation;
        var subView;
        if(this.state.titleTabSelected === 0){
            //宝宝编辑内部框
            subView = <BabyProp 
                onBabyEditClick={(subValue) => navigate('BabyEdit',{babyData:subValue})}
                onBabyDownBtnClick={(value,subValue) => this._onBabyDownBtnClick(value,subValue)}
                onBabyAddBtnClick={() => navigate("CreateBaby",{info:true})}
                ></BabyProp>;
        }else if(this.state.titleTabSelected === 1){
            subView = <BabyEvent name='这是宝宝事件界面'></BabyEvent>;
        }else{
            subView = <BabyFamily name='这是家庭成员界面'
                onApplicationRecord={() => navigate('ApplicationList')}
                onJoinFamily={() => navigate('JoinFamily')}
                onShare={()=> console.log('onShare')}
                onRemoveMember={()=> console.log('onRemoveMember')}
                onChange={(onChange)=> navigate('ChangeView',{info:onChange}) }
                ></BabyFamily>;
        }

        var acc = DataUtil.getinstance().getAccont()
        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground source = {require('../../images/logo.png')} style = {styles.logoIcon} resizeMode='contain'>
                        <View style={styles.setUpView}>

                            <TouchableOpacity activeOpacity={1}
                                onPress={() => {
                                    navigate('Person',{index:1})
                                    //显示个人中心的头像
                                }}>


                                <View style = {{borderRadius:15,width:45,height:45,alignItems:'center',justifyContent:'center',marginLeft:12}}>
                                    <Image
                                    style = {{width:45,height:45,borderRadius:25}}
                                    source = {acc.headshot == null || acc.headshot == '' ? require('../../utils/img/userHead.png') : {uri: acc.headshot}} 
                                    >

                                    </Image>
                                </View>
                            </TouchableOpacity> 
                            

                            <View style = {{flexDirection:'row',marginRight:12}}>
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => {
                                        //跳转到反馈界面
                                        navigate('NoticeMain',{index:1})
                                        //反馈
                                    }}>
                                    <View style = {{borderColor:'rgb(134,184,34)',borderWidth:1,width:33,height:20,borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                                        <Text style = {{color:'rgb(180,180,180)',alignSelf:'center',
                                        fontSize:Util.setSpText(10)
                                    }}>{'反馈'}</Text>
                                    </View>
                                </TouchableOpacity> 
                                
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => {
                                        navigate('NoticeMain',{index:0})
                                        
                                    }}>
                                    <Image
                                        style={styles.noticeIcon}
                                        source={require('./img/info.png')} />
                                </TouchableOpacity> 
                            </View>
                            
                        </View>
                        
                    </ImageBackground>
                </View>
                <View style={styles.otherView}>
                    <View style={styles.titleTabView}>
                        <View style={this.state.titleTabSelected === 0 ? styles.selectTitleTabView : styles.unSelectTitleTabView}>
                            <Text style={this.state.titleTabSelected === 0 ? styles.selectTitleTabText : styles.unSelectTitleTabText}
                            onPress={()=>{
                                this._onTitleTabSelected(0);
                            }}>宝宝信息</Text>
                        </View>
                        <View style={this.state.titleTabSelected === 2 ? styles.selectTitleTabView : styles.unSelectTitleTabView}>
                            <Text style={this.state.titleTabSelected === 2 ? styles.selectTitleTabText : styles.unSelectTitleTabText}
                            onPress={()=>{
                                this._onTitleTabSelected(2);
                            }}>家庭成员</Text>
                        </View>
                        <View style={this.state.titleTabSelected === 1 ? styles.selectTitleTabView : styles.unSelectTitleTabView}>
                            <Text style={this.state.titleTabSelected === 1 ? styles.selectTitleTabText : styles.unSelectTitleTabText}
                            onPress={()=>{
                                this._onTitleTabSelected(1);
                            }}>宝宝事件</Text>
                        </View>
                    </View>
                    {subView}
                    
                </View>
                {this.showAddapp()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)'
    },
    logoIcon:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.width*0.43,
        alignSelf:'center',
        marginTop:DataUtil.getinstance().getVueStrByp()==='IOS'?20:0,
    },
    createbbView:{
        position: 'absolute',
        right:10,
        bottom:13,
    },
    addBabyiamge:{
        // right:50,
        // bottom:400,
        // left:100,
        width:70,
        height:36,
    },
    setUpView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:DataUtil.getinstance().getVueStrByp()==='IOS'?0:10,
        alignItems:'center',
        borderBottomWidth:1,
        paddingBottom:1,
        borderColor:'rgb(100,100,100)'
    },
    noticeIcon:{
        width:33,
        height:20,
        marginLeft:10,
        resizeMode:'contain',
    },
    setUpIcon:{
        width:25,
        height:25,
        marginRight:10,
    },
    otherView:{
        justifyContent:'space-between',
    },
    titleTabView:{
        flexDirection: 'row',
        height:SceneUtils.size.width*0.12,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        backgroundColor:'rgb(51,51,51)',
    },
    selectTitleTabView:{
        justifyContent:'center',
        borderBottomWidth:4,
        borderColor:'rgb(127,186,0)',
        width:SceneUtils.size.width / 3,
    },
    unSelectTitleTabView:{
        justifyContent:'center',
        width:SceneUtils.size.width / 3,
    },
    selectTitleTabText:{
        alignSelf:'center',
        fontSize: 15,
        color:'rgb(127,186,0)',
        fontWeight:'700'
    },
    unSelectTitleTabText:{
        alignSelf:'center',
        fontSize: 15,
        color:'rgb(216,216,216)',
        fontWeight:'700'
    },
    titleTextRight:{
        fontSize: 16,
        color:'#00C5CD',
        fontWeight: '900',
        marginLeft:10,
    },
    noticeView:{
        alignSelf:'center',
        marginVertical:3,
    },
    noticeText:{
        fontSize:14,
        color:'#ff0000',
        backgroundColor:'#ffff00',
    },
});