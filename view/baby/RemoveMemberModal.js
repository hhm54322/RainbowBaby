'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'


import NetService from '../../utils/NetService'

var datas = [
    {
    }
]

//删除家庭成员
export default class RemoveMemberModal extends Component {
    constructor(props) {
        super(props);
        this.famliyList = DataUtil.getinstance().getMainFamliy();
        this.removeID;
        if(this.famliyList && this.famliyList.main.memberList.length>0){
            datas = this.famliyList.main.memberList;
        }
        this.state = {
            datas:datas,
        };
    }

    //显示列表item  出了爸妈的关系不能删除 其他的成员关系都可以删除显示在里面
    renderScrollViewChild(){
        var allChild = [];
        var length = this.state.datas.length;
        var array = [];
        for(var i = 0;i<length;i++){
            var member = this.state.datas[i];
            if(member.childRoles != null && member.childRoles.length > 0){
                if(member.childRoles.childRole == '爸爸' || member.childRoles.childRole == '妈妈'){
                    continue;
                }
            }
            if(member.user.id == DataUtil.getinstance().getAccont().id){
                continue;
            }
            array.push(member);
        }
        length = array.length;
        for(var i = 0;i < length;i++){
            var member = array[i];
            allChild.push(
                <View key={i} >
                    <View style={styles.childView}>
                    <View style={styles.childLeftView}>
                        <Image source = {member.user.headshot == null || member.user.headshot == '' ? require('./img/iconbg.png') : {uri: member.user.headshot}} style = {styles.headImage}></Image>
                        <View style={{justifyContent:'center'}}>
                            <Text style={styles.childCenterText}>{member.user.nickname} :  {member.childRoles == null || member.childRoles.length == 0 ? '无' : member.childRoles[0].childRole}</Text>
                            <Text style={styles.childCenterText}>ID :  {member.user.id}</Text>
                        </View>
                    </View>
                    <View style={styles.childRightView}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.sendRemoveMemberMsg.bind(this, member.user.id)}
                        >
                            <Image source = {require('./img/del.png')} style = {styles.delImg}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{borderBottomWidth:1,
                borderColor:'rgb(150,150,150)',
                width:SceneUtils.size.width*0.92,marginLeft:SceneUtils.size.width*0.04
            }}></View>

                </View>
                
            );
        }
        return allChild;
    }
    render() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.isModal}
                onRequestClose={() => {
                    this.props.onRemoveMemberModalClose()
                }}  // android必须实现
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalBg}>
                        <View style={styles.modalTopView}>
                            <Text style={[styles.textStyle,{fontWeight:'900'}]}>移除成员</Text>
                        </View>
                        <ScrollView
                            style={styles.modalCenterView}
                            showsVerticalScrollIndicator = {false}
                            >
                            {this.renderScrollViewChild()}
                        </ScrollView>
                        <View style={styles.modalDownView}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.btnView}
                                onPress={() => {
                                    this.props.onRemoveMemberModalClose()
                                }}
                            >
                                <Text style = {{color:'white',fontSize:19,fontWeight:'900'}}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }



    //主家庭删除成员
    sendRemoveMemberMsg(id) {
        this.removeID = id;
        var token = DataUtil.getinstance().getUserData().access_token;
        let params = {'access_token':token};
        var mod = {
            url:'/maria/account/family/main/members/'+this.removeID,
            params:params,
            params1:'',
            headers:['application/json','application/json'],
            callback:this.removeMemberMsgBack
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendFmotherDelete)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }




    //主家庭删除成员返回
    removeMemberMsgBack = (responseJson)=>{
        console.log(responseJson);
        for(var i = 0;i<datas.length;i++){
            if(datas[i].user.id == this.removeID){
                datas.splice(i,1);
                break;
            }
        }
        console.log(this.famliyList.main);
        this.setState({
            datas:datas,
        })
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.size.width,
        height: SceneUtils.size.height,
        backgroundColor: 'rgba(51,51,51,1)',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    modalBg:{
        width: SceneUtils.size.width,
        height: SceneUtils.size.height * 0.965,
        backgroundColor: 'rgba(51,51,51,1)',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        justifyContent:'space-between',
    },
    modalTopView:{
        width: SceneUtils.size.width,
        height:SceneUtils.size.height * 0.055,
        borderBottomWidth:1,
        borderColor:'rgb(150,150,150)',
        justifyContent:'center',
        alignItems: 'center',
    },
    textStyle:{
        color:'white',
        fontSize:18,
    },
    modalCenterView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.79,
    },
    modalDownView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.12,
        justifyContent:'center',
        alignItems:'center',
    },
    btnView:{
        //backgroundColor:'white',
        width:SceneUtils.size.width * 0.92,
        height:SceneUtils.size.width * 0.92 * 0.127,
        backgroundColor:'#7FBA00',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    childView:{
        width: SceneUtils.size.width,
        height: SceneUtils.size.height * 0.1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    childLeftView:{
        marginLeft:10,
        flexDirection:'row',
    },
    headImage:{
        width:SceneUtils.size.width * 0.1,
        height:SceneUtils.size.width * 0.1,
        alignSelf:'center',
    },
    childCenterText:{
        marginLeft:10,
        fontSize:14,
        color:'white'
    },
    childRightView:{
        marginRight:10,
        justifyContent:'center',
    },
    delImg:{
        width:SceneUtils.size.width * 0.06,
        height:SceneUtils.size.width * 0.06,
    }
});