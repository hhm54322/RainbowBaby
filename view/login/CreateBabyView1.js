'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import RadioModal from 'react-native-radio-master';
import ModalDropdown from 'react-native-modal-dropdown';
import DateUtil from '../../utils/DateUtil';
import NetUtil from '../../utils/NetUtil'
import DataUtil from '../../utils/DataUtil';


//创建宝宝界面 废弃
export default class CreateBabyView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sex:0,
            nikeName:'',
            relationshipType:'0',
            relationshipName:'爸爸',
            relationshipOtherType:-1,
            relationshipOtherName:'        ',
            birthYear:'',
            birthMonth:'',
            birthDay:'',
        };
    }

    _radioOnSelect(id,item){
        if(id !== this.state.relationshipType){
            this.setState({
                relationshipType : id,
                relationshipName:item,
                relationshipOtherType:-1,
                relationshipOtherName:'        ',
            })
        }
    }
    _dropdownOnSelect(idx, value) {
        if(idx !== this.state.relationshipOtherType){
            console.log(idx);
            console.log(value);
            this.setState({
                relationshipOtherType : idx,
                relationshipOtherName:value,
            })
        }
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
                <ImageBackground style={styles.modalDropdownImage}
                    source={require('./ICON_09.png')}>
                    <Text style={styles.modalDropdownText}>{this.state.birthYear}</Text>
                </ImageBackground>
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
                <ImageBackground style={styles.modalDropdownImage}
                    source={require('./ICON_09.png')}>
                    <Text style={styles.modalDropdownText}>{this.state.birthMonth}</Text>
                </ImageBackground>
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
                <ImageBackground style={styles.modalDropdownImage}
                    source={require('./ICON_09.png')}>
                    <Text style={styles.modalDropdownText}>{this.state.birthDay}</Text>
                </ImageBackground>
            </ModalDropdown>
        )
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source = {require('../../images/ICON_07.png')} style = {styles.logoIcon}/>
                </View>
                <View style={styles.otherView}>
                    <View style={styles.sexView}>
                        <Text style={styles.sexTitleText}>宝宝性别 : </Text>
                        <ImageBackground 
                            source = {require('./ICON_03.png')} 
                            style = {styles.sexImage}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.sexBtn}
                                onPress={() => {
                                    if(this.state.sex !== 0){
                                        this.setState({sex:0})
                                    }
                                }
                            }>
                                <Text style={styles.sexBtnText}>男孩</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                        <ImageBackground 
                            source = {require('./ICON_03.png')} 
                            style = {styles.sexImage}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.sexBtn}
                                onPress={() => {
                                    if(this.state.sex !== 1){
                                        this.setState({sex:1})
                                    }
                                }
                            }>
                                <Text style={styles.sexBtnText}>女孩</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>    宝宝小名：</Text>
                        <TextInput
                        underlineColorAndroid='transparent'
                            style={styles.textInputStyle}
                            placeholder="请输入您的昵称           "
                            onChangeText={(text) => {
                                this.setState({
                                    nikeName: text
                                });
                            }}
                            value={this.state.nikeName}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>    宝宝生日：</Text>
                        {this.yearModalDropdown()}
                        <Text style={styles.dateText}>年</Text>
                        {this.monthModalDropdown()}
                        <Text style={styles.dateText}>月</Text>
                        {this.dayModalDropdown()}
                        <Text style={styles.dateText}>日</Text>

                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>您是宝宝的：</Text>
                        <RadioModal
                            selectedValue={this.state.relationshipType}
                            onValueChange={(id,item) => this._radioOnSelect(id,item)}
                            style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                                alignItems:'flex-start',
                                backgroundColor:'#ffffff',
                                alignItems:'center',
                            }}>
                            <Text value='0'>爸爸</Text>
                            <Text value='1'>妈妈</Text>
                            {/* <Text value='2'>其他</Text> */}
                        </RadioModal>
                        {/* <ModalDropdown
                            options={['舅舅', '叔叔', '阿姨', '哥哥', '姐姐', '弟弟', '妹妹', '爷爷', '奶奶', '外公', '外婆']}
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                            disabled={this.state.relationshipType === '2' ? false : true}
                            textStyle={styles.dropdown_2_text}
                            dropdownStyle={styles.dropdown_2_dropdown}
                            onSelect={(idx, value) => this._dropdownOnSelect(idx, value)}>
                            <ImageBackground style={styles.modalDropdownImage}
                                source={require('./ICON_09.png')}>
                                <Text style={styles.modalDropdownText}>{this.state.relationshipOtherName}</Text>
                            </ImageBackground>
                        </ModalDropdown> */}
                    </View>
                    <View style={styles.jumpView}>
                        <Text style={styles.jumpTitleText}>如果您是家庭成员或宝宝未出生可</Text>
                        <Text style={styles.jumpText}
                        onPress={
                            () => navigate('Main')
                        }>跳过>></Text>
                    </View>
                    <View style={styles.btnView}>
                        <ImageBackground source = {
                            require('./ICON_01.png')} style = {styles.btnImage}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.btn}
                                onPress={() => {
                                    var p ={
                                        access_token:DataUtil.getinstance().getUserData().access_token
                                    }
                                    var time = new Date(this.state.birthYear+'-'
                                    +this.state.birthMonth+'-'+this.state.birthDay).getTime()
                                    var params1 = {
                                        gender:this.state.sex,
                                        nickname:this.state.nikeName,
                                        birthdate: time,
                                        childRole:this.state.relationshipName
                                    }
                                    console.log(params1)
                                    // NetUtil.post(
                                    //     '/maria/account/family/main/children',
                                    //     p,
                                    //     params1,
                                    //     ['application/json','application/json'],
                                    //     (responseJson)=>{
                                    //         console.log(responseJson)
                                    //     }
                                    // )

                                    NetUtil.post('/maria/account/family/main/children',p,params1,['application/json',
                                    'application/json'],function (responseJson) {
                                        //下面的就是请求来的数据
                                        console.log(responseJson);
                                        navigate('Train')
                                    })
                                    
                                }
                            }>
                                <Text style={styles.btnText}>完成</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    },
    logoView:{
        flex:1,
    },
    logoIcon:{
        width:SceneUtils.size.width * 0.75,
        height:SceneUtils.size.width * 0.75*0.8,
        resizeMode:'contain',
        alignSelf:'center',
    },
    otherView:{
        flex:3,
    },
    sexView:{
        flexDirection: 'row',
        marginHorizontal:30,
        marginTop:30,
        borderBottomWidth:1,
        borderColor: '#d6d7da',
        paddingBottom:10,
    },
    sexTitleText: {
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
        marginLeft:20,
    },
    sexImage:{
        width:SceneUtils.size.width * 0.23,
        height:SceneUtils.size.width * 0.23 * 1.4,
        marginHorizontal:10,
    },
    sexBtn: {
        width:SceneUtils.size.width * 0.23,
        height:SceneUtils.size.width * 0.23 * 1.4,
        justifyContent:'center',
        alignItems:'center',
    },
    sexBtnText:{
        fontSize:14,
        color:'#fff',
    },
    view: {
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor: '#d6d7da',
        marginHorizontal:30,
    },
    text: {
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
        marginLeft:20,
    },
    textInputStyle: {
        lineHeight: 36,
        fontSize: 14,
        marginLeft:10,
    },
    jumpView:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight:30,
        paddingTop:3,
    },
    jumpTitleText:{
        fontSize: 14,
    },
    jumpText: {
        fontSize: 14,
        color:'#00C5CD',
    },
    btnView:{
        alignSelf:'center',
        marginTop:40,
    },
    btnImage:{
        width:SceneUtils.size.width - 60,
        height:50,
    },
    btn: {
        width:SceneUtils.size.width - 60,
        height:50,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:20,
        color:'#fff',
    },
    dropdown_2_text: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: 44,
        height: 150
    },
    modalDropdownImage:{
        marginTop:5,
        width:44,
        height:18,
    },
    modalDropdownText:{
        lineHeight: 16,
        fontSize: 12,
        marginRight:6,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dateText: {
        lineHeight: 36,
        fontSize: 14,
        color:'#9E9E9E',
    },
});