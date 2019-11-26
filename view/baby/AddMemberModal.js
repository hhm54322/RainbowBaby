'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';


//邀请加入弹窗
export default class AddMemberModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum:'',   //手机号码
        };
    }
    render() {
        return (
            <Modal
                animationType='fade'            // 淡入淡出
                transparent={true}              // 透明
                visible={this.props.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {
                    this.setState({
                        phoneNum:''
                    })
                    this.props.onRequestClose()
                }}  // android必须实现
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBg}>
                        <Text style={[styles.btnText,{fontSize:19,color:'white',marginTop:10,fontWeight:'700'}]}>添加成员</Text>
                        <View style={styles.modalCenterView}>
                            <TextInput
                                style={{fontSize:14,width:SceneUtils.size.width * 0.6,}}
                                placeholder="请输入手机号或ID"
                                keyboardType='numeric'
                                maxLength={11}
                                onChangeText={(text) => {
                                    this.setState({
                                        phoneNum: text
                                    });
                                }}
                                value={this.state.phoneNum}
                            />
                        </View>
                        <View style={styles.modalDownView}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.btnView,{borderWidth:1,borderColor:'rgb(201,201,201)'}]}
                                onPress={() => {
                                    this.setState({
                                        phoneNum:''
                                    })
                                    this.props.onRequestClose()
                                }}
                            >
                                <Text style={[styles.btnText,{color:'white',fontSize:16}]}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.btnView,{borderWidth:1,borderColor:'rgb(134,184,34)'}]}
                                onPress={() =>{
                                    if(this.state.phoneNum.length > 0){
                                        this.props.onAddMember(this.state.phoneNum)
                                        this.setState({
                                            phoneNum:''
                                        })
                                    }
                                }}
                            >
                                <Text style={[styles.btnText,{color:'rgb(134,184,34)',fontSize:16}]}>确认</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.size.width,
        height: SceneUtils.size.height,
        backgroundColor: 'rgba(238,238,238,0.3)',
        justifyContent: 'center',
        alignItems:'center',
    },
    modalBg:{
        width: SceneUtils.size.width * 0.75,
        height: SceneUtils.size.width * 0.51,
        backgroundColor: 'rgb(51,51,51)',
        justifyContent:'space-around',
        alignItems: 'center',
        borderRadius:8,

    },
    btnText:{
        alignSelf:'center',
    },
    modalCenterView:{
        backgroundColor:'#EEEEEE',
        width:SceneUtils.size.width * 0.6,
        height:SceneUtils.size.width * 0.1,
        borderRadius:4,
        flexDirection:'row', 
        alignItems:'center',
    },
    modalDownView:{
        width:SceneUtils.size.width * 0.58,
        height:SceneUtils.size.width * 0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    },
    btnView:{
        width:SceneUtils.size.width * 0.22,
        height:SceneUtils.size.width * 0.08,
        justifyContent:'center',
    },
});