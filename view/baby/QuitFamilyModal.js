'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';

//退出家庭
export default class QuitFamilyModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                animationType='fade'            // 淡入淡出
                transparent={true}              // 透明
                visible={this.props.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {
                    this.props.onQuitFamilyModalClose()
                }}  // android必须实现
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBg}>
                        <ImageBackground source = {require('./ICON_02.png')} style = {styles.modalTitleBg}>
                            <Text style={styles.modalTitleText}>退出家庭</Text>
                        </ImageBackground>
                        <Text style={styles.modalCenterText}>是否确认退出家庭</Text>
                        <View style={styles.modalDownView}>
                            <ImageBackground source = {
                                require('./ICON_06.png')} style = {styles.modalDownBtnImage}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.props.onQuitFamilyModalClose()
                                    }}
                                >
                                    <Text style={styles.modalDownBtnText}>取消</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                            <ImageBackground source = {
                                require('./ICON_06.png')} style = {[styles.modalDownBtnImage,{marginLeft:20}]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() =>{
                                        this.props.onQuitFamilyModal()
                                    }}
                                >
                                    <Text style={styles.modalDownBtnText}>确认</Text>
                                </TouchableOpacity>
                            </ImageBackground>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems:'center',
    },
    modalBg:{
        width: SceneUtils.size.width * 0.75,
        height: SceneUtils.size.width * 0.6,
        backgroundColor: 'white',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    modalTitleBg:{
        width:SceneUtils.size.width * 0.75 * 0.5,
        height:SceneUtils.size.width * 0.75 * 0.5 * 0.2,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
    },
    modalTitleText:{
        fontSize:22,
        color:'white',
        fontWeight: '900',
    },
    modalCenterText:{
        color:'#ff0000',
    },
    modalDownView:{
        flexDirection:'row',
        marginBottom:30,
    },
    modalDownBtnImage:{
        width:SceneUtils.size.width * 0.75 * 0.3,
        height:SceneUtils.size.width * 0.75 * 0.5 * 0.2,
        justifyContent:'center',
    },
    modalDownBtnText:{
        fontSize:18,
        color:'white',
        fontWeight: '900',
        alignSelf:'center',
    },
});