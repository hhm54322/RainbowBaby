'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils'

import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'


//显示家庭成员于宝宝的关系
export default class ApplicationListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // datas:datas,
            datas:[
                // {
                // "id":1000,
                // "applicationType":0,
                // "childRoles":[
                //     {
                //         "childId": 1,
                //         "childRole":"爸爸",
                //         "nickname":"宝宝小名1",
                //         "headshot":"/headshot/100000/backgroud.jpg"
                //     },
                //     {
                //         "childId": 2,
                //         "childRole":"爸爸",
                //         "nickname":"宝宝小名2",
                //         "headshot":"/headshot/100000/backgroud.jpg"
                //     }
                // ],
                // "user":{
                //     "id":1,
                //     "nickname":"用户名一",
                //     "headshot":"/headshot/100000/backgroud.jpg"
                //     }
                // }
            ]
        };
    }

    //重写head函数
    static navigationOptions = ({navigation}) => ({
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:1,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });


    //刷新数据
    refrenshwoMod = (j)=>{
        console.log(j)
        this.setState({
            datas:j
        })
    }

    //发送消息 具体看util下面的网络服务类
    sendmessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.refrenshwoMod
        }
        var farry = []
        var dataArry = []
        farry.push(NetService.sendapplications)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)
    }

    //延迟发送消息
    componentDidMount(){
        setTimeout(()=>{
            this.sendmessage()
        },500)
    }

    _onRefuse(id){
        console.log(id);
        
    }
    _onAgree(id){
        console.log(id);
        
    }
    setBabyApplication(data){





        // var allChild = [];
        // for(var i = 0;i < data.babys.length;i++){
        //     allChild.push(
        //         <View key={i} style={styles.babyApplicationView}>
        //             <View style={styles.babyApplicationLeftView}>
        //                 <Image style={styles.babyApplicationLeftImage} source={require('./ICON_11.png')} />
        //                 <Text style={styles.babyApplicationText}>{data.userName}</Text>
        //             </View>
        //             <View style={styles.babyApplicationCenterView}>
        //                 <Text style={styles.babyApplicationCenterText}>{data.babys[i].relationshipName}</Text>
        //                 <Image style={styles.babyApplicationCenterImage} source={require('./ICON_16.png')} />
        //             </View>
        //             <View style={styles.babyApplicationRightView}>
        //                 <Image style={styles.babyApplicationLeftImage} source={require('./ICON_11.png')} />
        //                 <Text style={styles.babyApplicationText}>{data.babys[i].babyName}</Text>
        //             </View>
        //         </View>
        //     );
        // }
        // return allChild;
    }

    showLine = (rol)=>{
        return (
            <View style = {styles.roleView}>
                <Text 
                style = {styles.rolefont}>{rol}</Text>
                <Image
                    style = {styles.imgageright}
                    source = {require('./img/rightpd.png')}
                ></Image>
            </View>
        )
    }

    //显示头像和关系
    showHeadAndname = (data,name,url,is)=>{
        var req = null
        if(is){
            if(url === ''   ||  url === null){
                req = require('../../utils/img/userHead.png')
            }
        }else{
            if(url === ''   ||  url === null){
                req = data.gender === 0?require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }
        }
        var txt = is?data.childRole:'关系'
        return (
            <View style = {styles.imgageHeadView}>
                <Image
                    style = {styles.iamgehead}
                    source = {req === null? {uri:(url)} :req}
                ></Image>
                <Text 
                numberOfLines = {1}
                style = {styles.textFontName}>{name}</Text>

                <Text 
                numberOfLines = {1}
                style = {styles.textFontName}>{txt}</Text>
            </View>
        )
    }

    //显示其中一行
    rolerOne = (i,data,user)=>{
        console.log(data)
        return (
            <View key = {i}
                style = {styles.rolOneStyle}
            >   
                {this.showHeadAndname(data,data.nickname,data.headshot,false)}
                {this.showHeadAndname(data,user.nickname,user.headshot,true)}
                
            </View>
        )
    }

    //显示head那一块
    showHead = (data)=>{
        var childRoles = data.childRoles
        var len = childRoles.length
        var temp = []
        for(var i = 0;i<len;i++){
            temp.push(
                this.rolerOne(i,childRoles[i],data.user)
            )
        }
        return temp
    }

    backthisMessage = (j)=>{
        console.log(j)
        var acb = DataUtil.getinstance().getMainFamliy()
        var memberList = acb.main.memberList
        memberList.push(j)
        acb.main.memberList = memberList
        DataUtil.getinstance().setMainFamliy(acb)
        var acbd = DataUtil.getinstance().getMainFamliy()
        console.log(acbd)
        DeviceEventEmitter.emit('baby'); 
        //this.sendmessage()
    }
    backthisMessagerefrenshow = ()=>{
        this.sendmessage()
    }

    sendmessaged = (id,is)=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var params1 = {audit:is}
        var mod = {
            type:'patch',
            url:'/maria/account/family/main/applications/' +id ,
            params:params,
            params1:params1,
            headers:['application/json','application/json'],
            callback:this.backthisMessage
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendapplicationsSH)
        dataArry.push(mod)

        NetService.doArry(farry,dataArry)
    }

    touchBack = (id,isty)=>{
        var iid = id
        var iisty = isty
        return ()=>{
            var acd = isty?1:0
            this.sendmessaged(id,acd)
        }
    }

    showtbn = (i,leftorright,id)=>{
        var text = leftorright?'拒绝':'同意'
        var style = leftorright?{
            borderColor:'rgb(140,140,140)'
        }:{
            borderColor:'rgb(134,183,34)'
        }
        return (
            <TouchableWithoutFeedback
                onPress = {this.touchBack(id,!leftorright)}
            >
            <View style = {[styles.btnOneStyle,style]}>
                <Text
                    style = {{
                        color:'white',
                        fontWeight:'700',
                        fontSize:14,
                    }}
                >{text}</Text>
            </View>
            </TouchableWithoutFeedback>
        )
    }

    showMainOne = (i,data)=>{
        return (
            <View 
                key = {i}
                style = {styles.mainOneView}>
                <View style = {styles.mainOneCenter}>
                    <View >
                        {this.showHead(data)}
                    </View>
                    <View style = {styles.bottomView}>
                        {this.showtbn(i,true,data.id)}
                        {this.showtbn(i,false,data.id)}
                    </View>
                </View>
            </View>
        )
    }

    renderScrollViewChild(){
        var temp = []
        var datas = this.state.datas
        var l = datas.length;
        for(var i = 0;i<l;i++){
            temp.push(
                this.showMainOne(i,datas[i])
            )
        }
        return temp
        // var allChild = [];
        // var applicationList = this.props.navigation.state.params.info.applicationList;
        // for(var i = 0;i < applicationList.length;i++){
        //     allChild.push(
        //         <View key={i} style={styles.childView}>
        //             <View style={{width:SceneUtils.size.width * 0.98,
        //                 height:SceneUtils.size.width * 0.98 * 0.26 * applicationList[i].babys.length,justifyContent:'space-around'}}>
        //                 {this.setBabyApplication(applicationList[i])}
        //             </View>
        //             <View style={styles.childDownView}>
        //                 <ImageBackground source = {
        //                     require('./ICON_02.png')} style = {styles.childDownBtnImage}>
        //                     <TouchableOpacity
        //                         activeOpacity={1}
        //                         onPress={this._onRefuse.bind(this,applicationList[i].userId)}
        //                     >
        //                         <Text style={styles.childDownBtnText}>拒绝</Text>
        //                     </TouchableOpacity>
        //                 </ImageBackground>
        //                 <ImageBackground source = {
        //                     require('./ICON_01.png')} style = {styles.childDownBtnImage}>
        //                     <TouchableOpacity
        //                         activeOpacity={1}
        //                         onPress={this._onAgree.bind(this,applicationList[i].userId)}
        //                     >
        //                         <Text style={styles.childDownBtnText}>同意</Text>
        //                     </TouchableOpacity>
        //                 </ImageBackground>
        //             </View>
        //         </View>
        //     );
        // }
        // return allChild;
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
        alignItems: 'center',
        backgroundColor: 'rgb(51,51,51)',
       
    },
    mainOneView:{
        marginTop:10,
        alignItems:'center',
        width:SceneUtils.size.width*0.94,
        marginLeft:SceneUtils.size.width*0.03,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        paddingBottom:25,

    },

    mainOneCenter:{
        width:SceneUtils.size.width*0.94,
    },

    rolOneStyle:{
        flexDirection:'row',
        //alignItems:'center',
        justifyContent:'center',


    },

    imgageHeadView:{
        //width:SceneUtils.size.width*0.24,
        //height:SceneUtils.size.height*0.11,
        marginTop:12,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:8,
        marginLeft:10,
        marginRight:10,
    },
    roleView:{
        //width:SceneUtils.size.width*0.24,
        //height:SceneUtils.size.height*0.11,
        alignItems:'center',
        marginLeft:40,
        marginRight:40,
    },
    iamgehead:{
        marginTop:2,
        width:SceneUtils.size.height*0.1,
        height:SceneUtils.size.height*0.1,
        borderRadius:SceneUtils.size.height*0.05,
        marginLeft:10,
        marginRight:10,
        
    },
    textFontName:{
        marginTop:6,
        fontSize:14,
        color:'white',
        height:18,
        width:80,
        textAlign:'center',
    },

    imgageright:{
        marginTop:4,
        width:SceneUtils.size.width*0.15,
        height:SceneUtils.size.height*0.05,
    },
    rolefont:{
        marginTop:16,
        fontSize:18,
        color:'rgb(30,30,30)',
    },
    bottomView:{
        width:SceneUtils.size.width*0.94,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnOneStyle:{
        width:SceneUtils.size.width*0.2,
        height:SceneUtils.size.height*0.045,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginLeft:30,
        marginRight:30,
    },













    childView:{
        marginBottom:10,
        borderWidth:1,
        borderColor: '#d6d7da',
    },
    childTopView:{
        

    },
    childDownView:{
        flexDirection:'row',
    },
    childDownBtnImage:{
        width:SceneUtils.size.width * 0.98 * 0.5,
        height:30,
        justifyContent:'center',
    },
    childDownBtnText: {
        fontSize:18,
        color:'white',
        alignSelf:'center',
        fontWeight: '900',
    },
    babyApplicationView:{
        // width:SceneUtils.size.width * 0.98,
        // height:SceneUtils.size.width * 0.98 * 0.26,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    babyApplicationLeftView:{
        marginLeft:50,
    },
    babyApplicationCenterView:{

    },
    babyApplicationRightView:{
        marginRight:50,
    },
    babyApplicationLeftImage:{
        width:SceneUtils.size.width * 0.98 * 0.26 * 0.6,
        height:SceneUtils.size.width * 0.98 * 0.26 * 0.6,
    },
    babyApplicationText:{
        marginTop:5,
        fontSize:18,
        fontWeight: '900',
        alignSelf:'center',
    },
    babyApplicationCenterImage:{
        width:SceneUtils.size.width * 0.98 * 0.26 * 0.7,
        height:SceneUtils.size.width * 0.98 * 0.26 * 0.45,
        resizeMode:'contain',
    },
    babyApplicationCenterText:{
        fontSize:20,
        fontWeight:'900',
        color:'#00C5CD',
        alignSelf:'center',
        marginTop:-10,
    },
});