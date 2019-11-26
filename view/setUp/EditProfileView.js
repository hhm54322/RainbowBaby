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
import ModalDropdown from 'react-native-modal-dropdown';
import SceneUtils from '../../utils/SceneUtils';
import DateUtil from '../../utils/DateUtil';
import DataUtil from '../../utils/DataUtil';


import NetService from '../../utils/NetService'
import ImagePickView from '../../utils/ImagePickView'
import FloatText from '../../utils/FloatText'


//用户信息设置   基本纯显示界面  就是设置input啥的
export default class EditProfileView extends Component {
    constructor(props) {
        super(props);
        this.imagepick
        this.setStated();
    }


    //重写head
    static navigationOptions = ({navigation}) => (
        {
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:1,
            borderColor:'rgb(150,150,150)'
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });
    setStated = ()=>{
        var d = this.account = DataUtil.getinstance().getAccont()
        var dated = d.birthdate === null ? new Date():DateUtil.parserDateString(d.birthdate)
        if(d){
            this.state = {
                nikeName:d.nickname,            //昵称
                phoneNum:d.cellphone,           //手机
                birthYear:dated.getFullYear(),      //年
                birthMonth:dated.getMonth()+1,      //月
                birthDay:dated.getDate(),           //日
                sex:d.gender === 0?'男':'女',       //性别
                country:d.nationality,              //国家
                brief:d.introduction,               //村
                emailPhoneNum:d.receiverCellPhone,      //emil
                emailName:d.receiverName,           
                emailAdd:d.receiverAddress,
                headshot:d.headshot                 //头像链接
            }
        }else{
            this.state = {
                nikeName:'',
                phoneNum:'',
                birthYear:'',
                birthMonth:'',
                birthDay:'',
                sex:'',
                country:'',
                brief:'',
                emailPhoneNum:'',
                emailName:'',
                emailAdd:'',
        }
        
    };

            
    }

    
    _dropdownYearOnSelect(idx, value) {
        if(value !== this.state.birthYear){
            this.setState({
                birthYear : value,
            })
        }
    }
    _dropdownMonthOnSelect(idx, value) {
        if(value !== this.state.birthMonth){
            this.setState({
                birthMonth : value,
            })
        }
    }
    _dropdownDayOnSelect(idx, value) {
        if(value !== this.state.birthDay){
            this.setState({
                birthDay : value,
            })
        }
    }
    _dropdownSexOnSelect(idx, value) {
        if(value !== this.state.sex){
            this.setState({
                sex : value,
            })
        }
    }
    _dropdownCountryOnSelect(idx, value) {
        if(value !== this.state.country){
            this.setState({
                country : value,
            })
        }
    }
    yearModalDropdown(){
        var date = (new Date()).valueOf();
        var year = DateUtil.formatDate(date,'yyyy');
        var years = new Array();
        for(var i = 0;i<10;i++){
            years.push(year - i);
        }
        return(
            <ModalDropdown
                options={years}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown}
                onSelect={(idx, value) => this._dropdownYearOnSelect(idx, value)}>

                <View style = {[{flexDirection: 'row',alignItems:'center',width:38,},]}
                >
                    <Text style={styles.modalDropdownText}>{this.state.birthYear}</Text>
                    <Image 
                        style = {{
                            height:7,
                            transform: [{rotateX:'180deg'}]
                        }}
                        source={require('./img/down.png')}>
                    </Image>
                </View>
            </ModalDropdown>
        )
    }
    monthModalDropdown(){
        var months = new Array();
        for(var i = 0;i<12;i++){
            months.push(i+1);
        }
        return(
            <ModalDropdown
                options={months}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown}
                onSelect={(idx, value) => this._dropdownMonthOnSelect(idx, value)}>


                <View style = {[{flexDirection: 'row',alignItems:'center',width:38,},]}
                >
                    <Text style={styles.modalDropdownText}>{this.state.birthMonth}</Text>
                    <Image 
                        style = {{
                            height:7,
                            transform: [{rotateX:'180deg'}]
                        }}
                        source={require('./img/down.png')}>
                    </Image>
                </View>
            </ModalDropdown>
        )
    }
    dayModalDropdown(){
        var days = new Array();
        for(var i = 0;i<31;i++){
            days.push(i+1);
        }
        return(
            <ModalDropdown
                options={days}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown}
                onSelect={(idx, value) => this._dropdownDayOnSelect(idx, value)}>
                

                <View style = {[{flexDirection: 'row',alignItems:'center',width:38,},]}
                >
                    <Text style={styles.modalDropdownText}>{this.state.birthDay}</Text>
                    <Image 
                        style = {{
                            height:7,
                            transform: [{rotateX:'180deg'}]
                        }}
                        source={require('./img/down.png')}>
                    </Image>
                </View>
                
                
                {/* <ImageBackground style={styles.modalDropdownImage}
                    source={require('./ICON_09.png')}>
                    
                </ImageBackground> */}
            </ModalDropdown>
        )
    }
    sexModalDropdown(){
        return(
            <ModalDropdown
                options={['男', '女']}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown_sex}
                onSelect={(idx, value) => this._dropdownSexOnSelect(idx, value)}>

                <View style = {[{flexDirection: 'row',alignItems:'center',width:38,},]}
                >
                    <Text style={styles.modalDropdownText}>{this.state.sex}</Text>
                    <Image 
                        style = {{
                            height:7,
                            transform: [{rotateX:'180deg'}]
                        }}
                        source={require('./img/down.png')}>
                    </Image>
                </View>
            </ModalDropdown>
        )
    }
    countryModalDropdown(){
        return(
            <ModalDropdown
                options={['中国', '菲律宾','马来西亚','美国','日本','新加坡','瑞士']}
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown_country}
                onSelect={(idx, value) => this._dropdownCountryOnSelect(idx, value)}>

                <View style = {[{flexDirection: 'row',alignItems:'center',width:70,},]}
                >
                    <Text style={styles.modalDropdownText}>{this.state.country}</Text>
                    <Image 
                        style = {{
                            height:7,
                            transform: [{rotateX:'180deg'}]
                        }}
                        source={require('./img/down.png')}>
                    </Image>
                </View>
            </ModalDropdown>
        )
    }


    pushMessage = ()=>{

        // nikeName:'超级无敌小膀胱',
        // phoneNum:'13601731716',
        // birthYear:'1986',
        // birthMonth:'9',
        // birthDay:'10',
        // sex:'男',
        // country:'中国',
        // brief:'',
        // emailPhoneNum:'',
        // emailName:'',
        // emailAdd:'',
        var pushData = {
            nickname:this.state.nikeName,
            birthdate:this.state.birthYear  + '-' + this.state.birthMonth +'-' + this.state.birthDay +' 03:03:03',
            gender:this.state.sex === '男'? 0:1,
            nationality:this.state.country,
            introduction:this.state.brief,
            receiverCellPhone:this.state.emailPhoneNum,
            receiverName:this.state.emailName,
            receiverAddress:this.state.emailAdd,
            headshot:this.imagepick.getImageName(),
        }
        console.log(pushData)

        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            params:params,
            params1:pushData,
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                var id = DataUtil.getinstance().getAccont().id
                console.log(responseJson);
                pushData.headshot = responseJson.headshot
                pushData.id = id
                console.log(pushData)
                this.setState(pushData)
                DataUtil.getinstance().setAccont(pushData)
                var mainFamliy = DataUtil.getinstance().getMainFamliy()
                console.log(mainFamliy)
                var mmlist = mainFamliy.main.memberList
                var omlist = mainFamliy.others.memberList
                this.setHeadertoAll(mmlist,pushData,id)
                this.setHeadertoAll(omlist,pushData,id)
                DeviceEventEmitter.emit('baby')
                FloatText.show('保存成功')
                this.props.navigation.goBack();
            }
        }
        NetService.do(NetService.sendinfoput,mod)

    }

    setHeadertoAll = (mmlist,pushData,id)=>{
        if(mmlist){
            var l = mmlist.length
            for(var i = 0;i<l;i++){
                if(mmlist[i].user.id === id){
                    mmlist[i].user = pushData
                }
            }
        }

    }

    render() {
        const { navigate } = this.props.navigation;


        return (
            <View style={styles.container}>
                <View style = {styles.topHeadView}>
                    <ImagePickView 
                        ref = {ref => this.imagepick = ref}
                        borderRadius = {SceneUtils.size.height*0.119/2}
                        style={{height:SceneUtils.size.height*0.119,width:SceneUtils.size.height*0.119,
                        }}
                        source = {this.state.headshot == null || this.state.headshot == '' ? require('../../utils/img/userHead.png') : {uri: this.state.headshot}} 
                        url = {this.state.headshot}
                    />
                </View>
                <View style={styles.otherView}>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>昵称</Text>
                        </View>
                        <View style={styles.rowRightView}>
                            <TextInput
                            underlineColorAndroid='transparent'
                                style={styles.textInputStyle}
                                placeholder="请输入昵称"
                                onChangeText={(text) => {
                                    this.setState({
                                        nikeName: text
                                    });
                                }}
                                value={this.state.nikeName}
                            />
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>手机号</Text>
                        </View>
                        <View style={styles.rowRightView}>
                            <Text style={styles.rowRightText}>{this.state.phoneNum}</Text>
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>生日</Text>
                        </View>
                        <View style={styles.rowRightView}>
                            {this.dayModalDropdown()}
                            {this.monthModalDropdown()}
                            {this.yearModalDropdown()}
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>性别</Text>
                        </View>
                        <View style={styles.rowRightView}>
                            {this.sexModalDropdown()}
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>国家/地区</Text>
                        </View>
                        <View style={styles.rowRightView}>
                            {this.countryModalDropdown()}
                        </View>
                    </View>
                    
                    {/* <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>收件人手机号</Text>
                        </View>
                        <View style={styles.rowRightView}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    keyboardType='numeric'
                                    maxLength={11}
                                    onChangeText={(text) => {
                                        this.setState({
                                            emailPhoneNum: text
                                        });
                                    }}
                                    value={this.state.emailPhoneNum}
                                />
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>收件人姓名</Text>
                        </View>
                        <View style={styles.rowRightView}>
                                <TextInput
                                underlineColorAndroid='transparent'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => {
                                        this.setState({
                                            emailName: text
                                        });
                                    }}
                                    value={this.state.emailName}
                                />
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>收件人地址</Text>
                        </View>
                        <View style={styles.rowRightView}>
                                <TextInput
                                underlineColorAndroid='transparent'
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => {
                                        this.setState({
                                            emailAdd: text
                                        });
                                    }}
                                    value={this.state.emailAdd}
                                />
                        </View>
                    </View> */}


                    {/* <View style={[styles.rowView]}>
                        <View style={styles.rowLeftView}>
                            <Text style={styles.rowLeftText}>简介</Text>
                        </View>
                        
                    </View>

                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.textInputStyleincondition}
                        onChangeText={(text) => {
                            this.setState({
                                brief: text
                                });
                            }}
                            value={this.state.brief}
                        /> */}
                </View>
            
            <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.pushMessage()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>保存</Text>
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
        backgroundColor:'rgb(51,51,51)',
        //justifyContent:'space-between',
    },
    otherView:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    },
    topHeadView:{
        flexDirection:'row',
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.119,
        borderTopWidth:0.5,
        borderColor:'rgb(230,230,230)',       
        justifyContent:'center',
        alignItems:'center',
    },
    phoneIcon:{
        width:SceneUtils.size.width * 0.3,
        height:SceneUtils.size.width * 0.3,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginBottom:10,
    },
    setPhoneIcon:{
        width:SceneUtils.size.width * 0.1,
        height:SceneUtils.size.width * 0.1,
        resizeMode:'contain',
    },
    btnView:{
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(100,100,100)',
        backgroundColor:'rgb(50,50,50)',
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
        borderRadius:6,
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'900',
    },

    rowView:{
        height:SceneUtils.size.height*0.088,
        flexDirection:'row',
        width:SceneUtils.size.width,
        borderTopWidth:1,
        borderColor:'rgb(150,150,150)',
        padding:4,
    },
    rowLeftView:{
        marginLeft:8,
        width:SceneUtils.size.width*0.2,
        justifyContent:'center'
    },
    rowRightView:{
        width:SceneUtils.size.width*0.7,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:4,
        height:SceneUtils.size.height*0.073,
    },
    rowLeftText:{
        color: 'rgb(150,150,150)',
    },
    rowRightText:{
        color: '#d6d7da',
    },
    inputBg:{
        width:SceneUtils.size.width * 0.6,
        height:20,
        justifyContent:'center',
    },
    textInputStyle:{
        marginLeft:5,
        width:SceneUtils.size.width * 0.68,
        height:SceneUtils.size.height*0.05,
        borderRadius:2,
        fontSize:9
    },
    textInputStyleincondition:{
        width:SceneUtils.size.width * 0.9,
        height:SceneUtils.size.height*0.13,
        backgroundColor:'white',
        textAlign:'left',
    },
    dropdown_2_text: {
        fontSize: 8,
    },
    dropdown_2_dropdown: {
        width: 40,
        height: 75,
    },
    dropdown_2_dropdown_sex:{
        width:40,
        height:75,
    },
    modalDropdownImage:{
        width:40,
        height:75,
    },
    modalDropdownText:{
        lineHeight: 15,
        fontSize: 10,
        marginRight:3,
    },
    dropdown_2_dropdown_country: {
        width: 40,
        height:100,
    },
    modalDropdownImageCountry:{
        width:40,
        height:15,
    },
});