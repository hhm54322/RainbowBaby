'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import RadioModal from 'react-native-radio-master';
import ModalDropdown from 'react-native-modal-dropdown';
import SceneUtils from '../../utils/SceneUtils';

var datas=[
    {
        relationshipType:'1',
        relationshipName:'其他',
        relationshipOtherType:-1,
        relationshipOtherName:'        ',
    },
    {
        relationshipType:'2',
        relationshipName:'其他',
        relationshipOtherType:-1,
        relationshipOtherName:'        ',
    },
    {
        relationshipType:'2',
        relationshipName:'其他',
        relationshipOtherType:-1,
        relationshipOtherName:'        ',
    },
    {
        relationshipType:'2',
        relationshipName:'其他',
        relationshipOtherType:-1,
        relationshipOtherName:'        ',
    },
    {
        relationshipType:'2',
        relationshipName:'其他',
        relationshipOtherType:-1,
        relationshipOtherName:'        ',
    },
]


//加入家庭
export default class JoinFamilyView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            datas : datas,
        };
    }
    _radioOnSelect(id,item,num){
        datas[num].relationshipType = id;
        datas[num].relationshipName = item;
        if(id !== '2'){
            datas[num].relationshipOtherType = -1;
            datas[num].relationshipOtherName = '        ';
        }
        this.setState({
            datas : datas
        })
    }
    _dropdownOnSelect(idx, value,num) {
        datas[num].relationshipOtherType = idx;
        datas[num].relationshipOtherName = value;
        this.setState({
            datas : datas
        })
    }
    renderScrollViewChild(){
        var allChild = [];
        for(var i = 0;i < 5;i++){
            allChild.push(
                <View key={i} style={styles.childView}>
                    <Image source = {require('./ICON_08.png')} style = {styles.babyImage}/>
                    <View style={styles.babyTxtView}>
                        <Text style={styles.babyNameTxt}>宝宝小名：宝宝</Text>
                        <Text style={styles.babyNameTxt}>宝宝性别：男</Text>
                        <Text style={styles.babyNameTxt}>出身生日：2017.1.1</Text>
                        <View style={styles.radioModalView}>
                            <Text style={styles.relationshipTxt}>关系:</Text>
                            <RadioModal
                                selectedValue={this.state.datas[i].relationshipType}
                                num = {i}
                                onValueChange={(id,item,i) => this._radioOnSelect(id,item,i)}
                                style={{ flexDirection:'row',
                                    flexWrap:'wrap',
                                    alignItems:'flex-start',
                                    backgroundColor:'#ffffff'
                                    }} 
                                >
                                <Text value='0'>爸爸</Text>
                                <Text value='1'>妈妈</Text>
                                <Text value='2'>其他</Text>
                            </RadioModal>
                            <ModalDropdown
                                num = {i}
                                options={['舅舅', '叔叔', '阿姨', '哥哥', '姐姐', '弟弟', '妹妹', '爷爷', '奶奶', '外公', '外婆']}
                                disabled={this.state.datas[i].relationshipType === '2' ? false : true}
                                textStyle={styles.dropdown_2_text}
                                dropdownStyle={styles.dropdown_2_dropdown}
                                onSelect={(idx, value,i) => this._dropdownOnSelect(idx, value,i)}>
                                <ImageBackground style={styles.modalDropdownImage}
                                    source={require('./ICON_09.png')}>
                                    <Text style={styles.modalDropdownText}>{this.state.datas[i].relationshipOtherName}</Text>
                                </ImageBackground>
                            </ModalDropdown>
                        </View>
                    </View>
                </View>
            );
        }
        return allChild;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source = {require('../../images/ICON_07.png')} style = {styles.logoIcon}/>
                </View>
                <View style={styles.scrollView}>
                    <ScrollView
                        contentContainerStyle = {styles.contentContainer}
                        bounces = {false}
                        showsVerticalScrollIndicator = {false}
                        // onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
                        >
                        {this.renderScrollViewChild()}
                    </ScrollView>
                </View>
                <View style={styles.joinView}>
                    <ImageBackground source = {
                        require('./ICON_01.png')} style = {styles.btnImage}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.btn}
                            onPress={() => {
                                navigate('Main')
                            }
                        }>
                            <Text style={styles.btnText}>确认加入</Text>
                        </TouchableOpacity>
                    </ImageBackground>
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
    scrollView:{
        flex:2,
        marginTop:30,
    },
    contentContainer:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.45 * 2.2,
    },
    joinView:{
        flex:1,
        alignSelf:'center',
        marginTop:30,
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
    childView:{
        flexDirection: 'row',
        backgroundColor:'white',
        marginVertical:15,
    },
    babyImage:{
        width:SceneUtils.size.width * 0.27,
        height:SceneUtils.size.width * 0.27,
        marginLeft:30,
        marginRight:15,
    },
    babyTxtView:{
        flexDirection: 'column',
    },
    babyNameTxt:{
        // lineHeight: 36,
        fontSize: 14,
        fontWeight: '900',
        marginBottom:10,
    },
    radioModalView:{
        flexDirection: 'row',
    },
    relationshipTxt:{
        lineHeight: 24,
        fontSize: 14,
        color:'#9E9E9E',
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
        lineHeight: 14,
        fontSize: 12,
        marginLeft:5,
        textAlignVertical: 'center',
    },

});