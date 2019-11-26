'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import ModalDropdown from 'react-native-modal-dropdown';
import DateUtil from '../../utils/DateUtil'
import FloatText from '../../utils/FloatText'
import DataUtil from '../../utils/DataUtil'

import ImagePickView from '../../utils/ImagePickView'


import NetService from '../../utils/NetService'


//宝宝编辑界面
export default class BabyEditView extends Component {
    constructor(props) {
        super(props);
        this.babydata = this.props.navigation.state.params.babyData  
        var dated = DateUtil.parserDateString(this.babydata.birthdate)
        console.log(this.babydata.gender)
        this.imagepick
        this.state = {
            nickname:this.babydata.nickname, //名字
            focus:false,
            sex:this.babydata.gender === 0?'男':'女', //性别
            birthYear:dated.getFullYear(),  //年
            birthMonth:dated.getMonth()+1,  //月
            birthDay:dated.getDate(),       //日
        };
    }

    componentDidMount(){
        
    }
    //重写路由函数
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
    //   title: `Chat with ${navigation.state.params.user}`,
        //title:navigation.state.params.user.nickname,
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    //发送保存消息
    messageBack = (j) =>{
        console.log(j)
        var timestr = this.state.birthYear +'-'+this.state.birthMonth+'-'+this.state.birthDay +' 2:2:2'
        var acb = DataUtil.getinstance().getMainFamliy()
        var l = acb.main.children.length
        for(var i = 0;i<l;i++){
            if(acb.main.children[i].id === this.babydata.id){
                acb.main.children[i].nickname = this.state.nickname
                acb.main.children[i].gender = this.state.sex === '男'?0:1,
                acb.main.children[i].birthdate = timestr
                acb.main.children[i].headshot = j.headshot
            }
        }
        DataUtil.getinstance().setMainFamliy(acb)
        DeviceEventEmitter.emit('baby')
        FloatText.show('保存成功')
        this.props.navigation.goBack();
    }

    //发送宝宝编辑后的消息
    pushmessage = ()=>{
        var timestr = this.state.birthYear +'-'+this.state.birthMonth+'-'+this.state.birthDay +' 2:2:2'
        var time = timestr
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var p = {
            nickname:this.state.nickname,
            gender:this.state.sex === '男'?0:1,
            birthdate:time,
            headshot:this.imagepick.getImageName(),

        }
        console.log(p)
        var mod = {
            url:'/maria/account/family/main/children/'+this.babydata.id,
            params:params,
            params1:p,
            headers:['application/json','application/json'],
            callback:this.messageBack
        }
        var farry = []
        var dataArry = []
        farry.push(NetService.sendBabyEditer)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }


    //获取输入内容
    _onEndEditing(text) {
        if(this.state.focus){
            this.setState({
                focus:false
            })
        }
    }
    _dropdownOnSelect(idx, value) {
        if(value !== this.state.sex){
            this.setState({
                sex : value,
            })
        }
    }

    //年数组
    yearArry = ()=>{
        var date = (new Date()).valueOf();
        var year = DateUtil.formatDate(date,'yyyy');
        var years = new Array();
        for(var i = 0;i<10;i++){
            years.push(year - i);
        }
        return years
    }
    //年点击回调
    yearBack = (idx, value)=>{
        if(value !== this.state.birthYear){
            this.setState({
                birthYear : value,
            })
        }
    }

    //返回一个月份数组
    mothArry = ()=>{
        var months = new Array();
        for(var i = 0;i<12;i++){
            months.push(i+1);
        }
        return months
    }
    //点击月份数组的回调
    motnBack = (idx, value)=>{
        if(value !== this.state.birthMonth){
            this.setState({
                birthMonth : value,
            })
        }
    }
    //返回一个天数数组
    dayArry = ()=>{
        var days = new Array();
        for(var i = 0;i<31;i++){
            days.push(i+1);
        }
        return days
    }
    //天数数组的回调
    dayBack = (idx, value)=>{
        if(value !== this.state.birthDay){
            this.setState({
                birthDay : value,
            })
        }
    }


    //显示男女下啦框
    showNanNv = ()=>{
        var c = <ModalDropdown 
        style = {styles.nannvStyle}
        textStyle = {styles.modeTextS}
        dropdownStyle = {styles.dorpStyle}
        options={['男','女']}
        onSelect={(idx, value) => {
            this.setState({
                sex : value,
            })
        }}
        defaultValue = {'男'}
        renderRow = {this.renderRowthis2}
        //adjustFrame = {this.adjustFrame}
    >
        <View style = {styles.nannvStyle}
        >
            <Text>{this.state.sex}</Text>
            <Image style = {styles.downImage}
                source = {require('./img/bjdown.png')}
            > 
            </Image>
        </View>
    </ModalDropdown>
    return c
    }

    //显示 年 或 月 或 日的下拉框  看传入参数
    showDownDrop = (optionsd,back,va)=>{
        return (
            <ModalDropdown 
                style = {styles.modeDownStyle}
                textStyle = {styles.modeTextS}
                dropdownStyle = {styles.dorpStyle}
                options={optionsd}
                onSelect={(idx, value) => back(idx, value)}
                defaultValue = {optionsd[0].toString()}
                renderRow = {this.renderRowthis}
                //adjustFrame = {this.adjustFrame}
            >
                <View style = {styles.modeDownStyle}
                >
                    <Text>{va}</Text>
                    <Image style = {styles.downImage}
                        source = {require('./img/bjdown.png')}
                    > 
                    </Image>
                </View>
            </ModalDropdown>
        )
    }

    //下拉框样式
    renderRowthis2 = (rowData, rowID, highlighted)=>{
        return (
            <View style = {styles.borderOnw2}>
                <Text style = {styles.modeTextS}>{rowData}</Text>
            </View>
        )
    }

    //下拉框样式
    renderRowthis = (rowData, rowID, highlighted)=>{
        return (
            <View style = {styles.borderOnw}>
                <Text style = {styles.modeTextS}>{rowData}</Text>
            </View>
        )
    }


    render() {
        const { navigate } = this.props.navigation;
        var child = this.babydata
        var req = null
        var url = child.headshot 
        if(child.headshot === ''   ||  child.headshot === null){
            req = child.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
        }
        console.log(req)
        console.log(child.headshot)
        return (
            <View style={styles.container}>
                <View style={styles.otherView}>
                    <ImagePickView 
                        ref = {ref => this.imagepick = ref}
                        borderRadius = {SceneUtils.size.width * 0.32/2}
                        style={styles.setPhoneIcon}
                        source = {req === null? {uri:(url)} :req}
                        url = {child.headshot}
                    >
                        {/* <Image
                            style={styles.setPhoneIcon}
                            source = {req === null? {uri:(url)} :req} /> */}
                    </ImagePickView> 

                    <View style = {styles.wihtBg}>
                        <View style = {styles.lineView}>
                            <Text style = {styles.textStyleLeft}>{'宝宝昵称'}</Text>
                            <View style = {styles.rightView}>
                                <TextInput style = {styles.inputName}
                                underlineColorAndroid='transparent'
                                    placeholder="请输入宝宝的小名"
                                    maxLength={10}
                                    onChangeText={(text) => {
                                        this.setState({
                                            nickname: text
                                        });
                                    }}
                                    value={this.state.nickname}
                                ></TextInput>
                            </View>
                        </View>
                        <View style = {styles.lineView}>
                            <Text style = {styles.textStyleLeft}>{'宝宝性别'}</Text>
                            <View style = {styles.rightView}>
                                {this.showNanNv()}
                            </View>
                        </View>
                        <View style = {styles.lineView}>
                            <Text style = {styles.textStyleLeft}>{'宝宝生日'}</Text>
                            <View style = {styles.rightView}>
                                {this.showDownDrop(this.yearArry(),this.yearBack,this.state.birthYear)}
                                {this.showDownDrop(this.mothArry(),this.motnBack,this.state.birthMonth)}
                                {this.showDownDrop(this.dayArry(),this.dayBack,this.state.birthDay)}
                            </View>
                        </View>
                    </View>
                    
                    {/* <View style={styles.textView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.nikeText}>宝宝小名：</Text>
                            <TextInput
                                style={styles.nikeTextInput}
                                placeholder="请输入昵称"
                                autoFocus={this.state.focus}
                                editable={this.state.focus}
                                onEndEditing = {(event)=>this._onEndEditing(event.nativeEvent.text)}
                                onChangeText={(text) => {
                                    this.setState({
                                        nickname: text
                                    });
                                }}
                                value={this.state.nickname}
                            />
                        </View>
                        <Text style={styles.changeText}
                            onPress={() => {
                                console.log('修改');
                                if(!this.state.focus){
                                    this.setState({
                                        focus:true
                                    })
                                }
                            }}>修改</Text>
                    </View>
                    <View style={styles.textView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.nikeText}>宝宝性别：</Text>
                            <Text style={styles.nikeText}>{this.state.sex}</Text>
                        </View>
                        <ModalDropdown
                            options={['男', '女']}
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                            dropdownStyle={styles.dropdown_2_dropdown}
                            onSelect={(idx, value) => this._dropdownOnSelect(idx, value)}>
                            <Image style={styles.modalDropdownImage}
                                source={require('./ICON_12.png')}>
                            </Image>
                        </ModalDropdown>
                    </View>*/}
                </View> 
                

                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.pushmessage()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'保存'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        backgroundColor: 'rgb(51,51,51)',
    },
    otherView:{
        marginVertical:10,
    },
    setPhoneIcon:{
        marginTop:6,
        width:SceneUtils.size.width * 0.32,
        height:SceneUtils.size.width * 0.32,
        alignSelf:'center',
        marginBottom:10,
        borderRadius:SceneUtils.size.width * 0.32/2,
    },
    wihtBg:{
        marginTop:4,
        alignSelf:'center',
        width:SceneUtils.size.width * 0.9,
        height:SceneUtils.size.height * 0.32,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
    },
    lineView:{
        flexDirection: 'row',
        width:SceneUtils.size.width * 0.85,
        height:SceneUtils.size.height * 0.09,
        alignItems:'center',
    },
    rightView:{
        flexDirection: 'row',
        marginLeft:10,
        width:SceneUtils.size.width * 0.65,
        height:SceneUtils.size.height * 0.068,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(230,230,230)'
    },
    inputName:{
        width:SceneUtils.size.width * 0.65,
        height:SceneUtils.size.height * 0.068,
    },
    modeDownStyle:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.65/3.1,
        height:SceneUtils.size.height*0.068,
        justifyContent:'center',
        alignItems:'center',
    },
    nannvStyle:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.63,
        height:SceneUtils.size.height*0.068,
        justifyContent:'space-between',
        alignItems:'center',
    },
    modeTextS:{
        color:'rgb(98,98,98)',
        fontSize:12,
    },
    dorpStyle:{
        backgroundColor:'rgb(240,240,240)',
        borderWidth:0,
    },
    borderOnw:{
        width:SceneUtils.size.width*0.65/3.1,
        height:SceneUtils.size.height*0.05,
        backgroundColor:'rgb(240,240,240)',
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
    },

    borderOnw2:{
        width:SceneUtils.size.width*0.65,
        height:SceneUtils.size.height*0.05,
        backgroundColor:'rgb(240,240,240)',
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
    },

    btnView:{
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    btnImage:{
        width:SceneUtils.size.width,
        height:40,
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(128,183,34)',
        borderRadius:4,
    },
    btnText:{
        fontSize:22,
        color:'white',
        fontWeight:'900',
    },
    textStyleLeft:{
        color:'rgb(150,150,150)',
        fontSize:16,
        fontWeight:'700'
    },


});