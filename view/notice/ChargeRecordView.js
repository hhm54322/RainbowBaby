'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'


const displayFlex  = 'flex'
const displayNone  = 'none'

//充值记录  拿到消息纯显示界面
export default class ChargeRecordView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas:[
                
            ],
        };
    }

    componentDidMount(){
        this.showMessage();
    }

    //发送消息接口
    showMessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};

        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.setState({
                    datas: responseJson
                })
            }
        }
        NetService.do(NetService.sendrecharge,mod)


    }

    _onPress(index){
        console.log(index);
    }

    //发送处理异常充值的消息

    messagePutfk = (id)=>{
        console.log(id)
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                var d = this.state.datas
                var l = d.length
                for(var i = 0;i<l;i++){
                    if(d[i].id === id){
                        d[i].feedback = !d[i].feedback
                    }
                }
                this.setState({
                    datas:d
                })
            }
        }
        NetService.do(NetService.sendfeedback,mod)
    }

    touchfkBack = (data,s)=>{
        var state =  s
        var idd = data.id
        return ()=>{
            if (s!==0){
                return
            }
            this.messagePutfk(idd)
        }
    }

    showCZYC = (data)=>{
        //var datad = data.birthdate.substring(0,11)
        var s = data.createTime.substring(0,11)
        var d= 'dada'
        var color = data.feedback != 0?'rgb(200,85,85)':'rgb(134,184,34)'
        return(

            <TouchableOpacity
                    onPress = {this.touchfkBack(data,data.feedback)}
                    >
            <View style = {{width:SceneUtils.size.width*0.28,
                marginLeft:SceneUtils.size.width*0.7,
                alignItems:'flex-end',
                justifyContent:'flex-end',
                
            }}>
            
                <View style = {{
                    borderWidth:1,
                    borderColor:color,
                    alignItems:'center',
                justifyContent:'flex-end',
                padding:3,
                borderRadius:4,
                }}> 
                    <Text style ={{color:'white',fontSize:15}}>{'充值异常'}</Text>
                </View>
                <Text style = {{color:'white',fontSize:10}}>{s}</Text>
            </View>
            </TouchableOpacity>
        )
    }


    renfrenshowOne = (i,data)=>{
        
        return (
            <View 
            key = {i}
            style = {styles.oneMian}>
                <View>
                    {this.showCZYC(data)}
                </View>
                <View style = {styles.moneyView}>
                    <View style = {styles.moneyViewCenter}>
                        <Text style = {styles.rmbText}>{'¥'}</Text>
                        <Text style = {styles.rmbNumberText}>{data.price}</Text>
                    </View>
                </View>
                <View style = {styles.didanView}>
                    <Text style = {styles.dingdantextleft}>{'订单号:'}</Text>
                    <Text style = {styles.dingdantextright}>{data.orderNumber}</Text>
                </View>
                <View style = {styles.didanView}>
                    <Text style = {styles.dingdantextleft}>{'订单名称:'}</Text>
                    <Text style = {styles.dingdantextright}>{data.name}</Text>
                </View>
            </View>
        )
    }



    renderScrollViewChild(){
        var allChild = [];
        var l = this.state.datas.length
        for(var i = 0;i < l;i++){
            //var dis = !this.state.datas[i].feedback? displayFlex:displayNone
            allChild.push(
                this.renfrenshowOne(i,this.state.datas[i])
                // <View key={i} style={styles.childView}>
                //     <View style={styles.titleView}>
                //         <Text style = {styles.leftText}>订单号：{this.state.datas[i].orderNumber}</Text>
                //          <TouchableOpacity
                //             onPress = {this.touchfkBack(this.state.datas[i].id,this.state.datas[i].feedback)}
                //          >
                //          <View style = {{
                //              width:60,
                //              height:20,
                //              backgroundColor:this.state.datas[i].feedback === 0?'rgb(123,184,34)':'rgb(150,150,150)',
                //              //display:dis,
                //              justifyContent:'center',
                //              alignItems:'center',
                //              marginRight:4,
                //          }}> 
                //             <Text style = {{
                //                 color:'white',
                //                 fontSize:10,
                //                 fontWeight:'900'
                //             }}>{'充值异常'}</Text>
                //          </View>
                //          </TouchableOpacity>
                //     </View>
                //     <View style={styles.contentView}>
                //         <Text style = {styles.leftText}>
                //         订单名称：{this.state.datas[i].name}</Text>
                //     </View>
                //     <View style={styles.contentView}>
                //         <Text style = {styles.leftText}>
                //         订单价格：{this.state.datas[i].price}</Text>
                //     </View>
                //     <View style={styles.contentView}>
                //         <Text style = {styles.leftText}>
                //         订单时间：{this.state.datas[i].createTime}</Text>
                //     </View>
                // </View>
            );
        }
        return allChild;
    }
    render() {
        
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    >
                    {this.renderScrollViewChild()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    oneMian:{
        width:SceneUtils.size.width,
        paddingBottom:25,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        marginBottom:15,
    },
    contentContainer:{
        width:SceneUtils.size.width * 0.98,
        height:SceneUtils.size.height * 0.13 * 6 + 7 * 10,
    },
    moneyView:{
        marginTop:10,
        marginBottom:5,
        alignItems:'center',
        justifyContent:'center',
        padding:3,
    },
    moneyViewCenter:{
        flexDirection:'row',
        alignItems:'flex-end',
        padding:3,
    },
    rmbText:{
        fontSize:19,
        fontWeight:'700',
        color:'white',
        marginTop:-3,
    },
    rmbNumberText:{
        fontSize:26,
        fontWeight:'700',
        color:'white',
        marginLeft:6,
    },
    didanView:{
        flexDirection:'row',
        marginLeft:20,
    },
    childView:{
        marginTop:10,
        width:SceneUtils.size.width * 0.98,
        height:SceneUtils.size.height * 0.19,
    },
    dingdantextleft:{
        color:'white',
        fontSize:12,
        fontWeight:'700',
        width:80,
    },
    dingdantextright:{
        color:'rgb(150,150,150)',
        fontSize:12,
        fontWeight:'200',
    },
    titleView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor: '#d6d7da',
        alignItems: 'center',
    },
    contentView:{
        flex:1,
        justifyContent: 'center',
        marginTop:7,
    },
    btnImage:{
        width:42,
        height:16,
    },
    btn: {
        width:42,
        height:16,
        borderRadius:1,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:13,
        color:'#fff',
    },
    leftText:{
        fontSize:13,
        marginLeft:4,
    },
});