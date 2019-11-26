'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil';


//每一个家庭菜单弹窗
//分别对应的菜单功能有

//申请记录

//添加成员

//移除成员

//修改关系

//退出家庭

//根据点击不同的按钮执行不同的回调函数

export default class FamilyModal extends Component {
    constructor(props) {
        super(props);
    }
    setAndroidBtn = (show,name,back)=>{
        if(!show){
            return
        }
        return(
            <TouchableWithoutFeedback
                    style={[styles.btnView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}
                    onPress={()=>{back(this.props.type)}}
                    >
                    <View style = {styles.selectOneView}>
                        <Text style = {[styles.btnTextAnd]}>{name}</Text>
                    </View>
                        
            </TouchableWithoutFeedback>
        )
        

    }
    setOthersBtn(){
        if(this.props.type == 0){
            return(
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btnView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}
                        onPress={() => {
                            //this.props.onAddMemberModal();
                            //this.props.onApplicationRecord(this.props.type)
                            this.props.onJoinFamily();
                            
                        }}
                    >
                        <Text style = {[styles.btnText,{fontSize:16}]}>加入其他家庭</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btnView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}
                        onPress={() => {
                            //this.props.onAddMemberModal();
                            this.props.onApplicationRecord(this.props.type)
                        }}
                    >
                        <Text style = {[styles.btnText,{fontSize:16}]}>申请记录</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btnView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}
                        onPress={() => {
                            this.props.onAddMemberModal();
                        }}
                    >
                        <Text style = {[styles.btnText,{fontSize:16}]}>添加成员</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnView}
                        onPress={() => {
                            this.props.onRemoveMemberModal();
                        }}
                    >
                        <Text style = {[styles.btnText,{fontSize:16}]}>移除成员</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btnView,{marginBottom:3,borderBottomLeftRadius:5,borderBottomRightRadius:5}]}
                        onPress={() => {
                            this.props.onQuitFamily();
                        }}
                    >
                        <Text style = {[styles.btnText,{fontSize:16}]}>退出家庭</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View>
                    <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.btnView,{marginBottom:3,borderRadius:5}]}
                    onPress={() => {
                        this.props.onApplicationRecord(this.props.type)
                    }}
                    >
                    <Text style = {[styles.btnText,{fontSize:16}]}>修改关系</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.btnView,{marginBottom:3,borderRadius:5}]}
                    onPress={() => {
                        this.props.onQuitFamily()
                    }}
                >
                    <Text style = {[styles.btnText,{fontSize:16}]}>退出家庭</Text>
                </TouchableOpacity>
                </View>
                
            )
        }
    }
    render() {

        if(DataUtil.getinstance().getVueStrByp() === 'Android'){
            return(
                <Modal
                transparent={true}              // 透明
                visible={this.props.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {
                    this.props.onFamilyModalClose()
                }}  // android必须实现
                >
                <TouchableWithoutFeedback 
                    onPress = {()=>{
                        this.props.onFamilyModalClose()
                    }}
                >
                    <View style={styles.modalStyleAnd}>
                        <View style = {styles.cneterView}>
                            <Text style = {styles.textSelectfont}>{'请选择'}</Text>
                            {this.setAndroidBtn(this.props.type === 0,'加入其它家庭',this.props.onJoinFamily)}
                            {this.setAndroidBtn(this.props.type === 0,'申请记录',this.props.onApplicationRecord)}
                            {this.setAndroidBtn(this.props.type === 0,'添加成员',this.props.onAddMemberModal)}
                            {this.setAndroidBtn(this.props.type === 0,'移除成员',this.props.onRemoveMemberModal)}
                            {this.setAndroidBtn(this.props.type != 0,'修改关系',this.props.onApplicationRecord)}
                            {this.setAndroidBtn(true,'退出家庭',this.props.onQuitFamily)}

                            <View style = {styles.selectOneViewqx}>
                                <Text style = {styles.qxText}>{'取消'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                
            </Modal>
            )
        }









        return (
            <Modal
                animationType='slide'            // 从底部滑入
                transparent={true}              // 透明
                visible={this.props.isModal}    // 根据isModal决定是否显示
                onRequestClose={() => {
                    this.props.onFamilyModalClose()
                }}  // android必须实现
            >
                <View style={styles.modalStyle}>
                    <View style={styles.bgView}>
                        {this.setOthersBtn()}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.btnView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}
                            onPress={() => {
                                this.props.onFamilyModalClose()
                            }}
                        >
                            <Text style = {[styles.btnText,{fontSize:16}]}>返回</Text>
                        </TouchableOpacity>

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
        backgroundColor: 'rgba(0,0,0,0.0)',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    modalStyleAnd: {
        width: SceneUtils.size.width,
        height: SceneUtils.size.height,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems:'center',
    },
    bgView:{
        width: SceneUtils.size.width,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    btnView:{
        backgroundColor:'white',
        width:SceneUtils.size.width * 0.96,
        height:SceneUtils.size.width * 0.96 * 0.111,
        borderColor:'#EEEEEE',
        borderBottomWidth:1,
        justifyContent:'center',
        marginTop:2,
        marginBottom:2,
    },
    btnText:{
        color:'black',
        alignSelf:'center',
    },



    cneterView:{
        width:SceneUtils.size.width*0.8,
        padding:5,
        justifyContent: 'center',
        backgroundColor:'white'
    },
    textSelectfont:{
        marginTop:10,
        fontSize:20,
        marginLeft:10,
        color:'black'
    },
    selectOneView:{
        width:SceneUtils.size.width*0.8,
        justifyContent: 'center',
        padding:5,
    },
    btnTextAnd:{
        color:'black',
        marginLeft:10,
        fontSize:16,
        marginTop:10,
    },
    selectOneViewqx:{
        width:SceneUtils.size.width*0.8,
        alignItems: 'flex-end',
        padding:5,
    },
    qxText:{
        marginTop:20,
        color:'rgb(0,245,255)',
        fontSize:13,
        marginRight:20,
        marginBottom:15,
    },
});