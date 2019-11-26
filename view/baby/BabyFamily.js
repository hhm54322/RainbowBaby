'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import FamilyModal from './FamilyModal';
import AddMemberModal from './AddMemberModal';
import RemoveMemberModal from './RemoveMemberModal';
import DataUtil from '../../utils/DataUtil'
import Util from '../../utils/Util';

import NetService from '../../utils/NetService'

import *as wechat from 'react-native-wechat'


//宝宝家庭
export default class BabyFamily extends Component {
    constructor(props) {
        super(props);
        this.scrollView;
        this.famliyList = DataUtil.getinstance().getMainFamliy();
        this.state = {
            isShowFamilyModal:false, //是否显示famli
            isShowAddMemberModal:false, //是否显示添加弹窗
            isShowRemoveMemberModal:false, //是否显示删除
            arrowUpIndex:-1,        
            currentSetUp:-1,
            isRef:true,
        };
    }

    componentDidMount(){

        //监听其他界面有数据刷新后的回调  通知界面刷新
        this.subscription = DeviceEventEmitter.addListener('baby', ()=>{
            this.famliyList = DataUtil.getinstance().getMainFamliy();
            this.setState({
                isRef:!this.state.isRef
            })
        });
    }
        
        
        
    componentWillUnmount(){
    
        this.subscription.remove();
    }

    _onApplicationRecord(index){
        this.setState({
            isShowFamilyModal:false,
        })
        if(index == 0){
            //申请记录
            this.props.onApplicationRecord();
        }else{
            var familyData = this.getFamilyData(index);
            //修改关系
            this.props.onChange(familyData);
        }
    }

    //点击家庭后 跳转到最上面
    _onApplicationDownList(index){
        if(this.state.arrowUpIndex != index){
            var scrollWidth = SceneUtils.size.width * 0.27 + 30;
            console.log(index)
            setTimeout(() => {
                this.scrollView.scrollTo({y:index * scrollWidth,});
                }, 10);
            
            this.setState({
                arrowUpIndex:index,
            })
        }
    }

    //更新是否显示列表
    _onApplicationUpList(index){
        if(this.state.arrowUpIndex != -1){
            this.setState({
                arrowUpIndex:-1,
            })
        }
    }

    //是那个家庭设置
    _onSetUpFamily(index){
        if(!this.state.isShowFamilyModal){
            this.setState({
                currentSetUp:index,
                isShowFamilyModal:true,
            })
        }
    }

    //加入其他家庭
    _onAddMemberModal(){
        this.setState({
            isShowAddMemberModal:true,
            isShowFamilyModal:false,
        })
    }

    //移除成员  
    _onRemoveMemberModal(){
        this.setState({
            isShowFamilyModal:false,
            isShowRemoveMemberModal:true,
        })
    }

    //退出家庭
    _onQuitFamily(){
        this.sendQuitFamilyMsg();
    }

    //邀请其他人员加入回调
    _onAddMember(id){
        this.sendAddMemberMsg(id);
    }

    //关闭家庭选择菜单
    closeFamilyModal(){
        this.setState({
            isShowFamilyModal:false,
            currentSetUp:-1,
        })
    }

    //关闭加入家庭弹窗
    closeAddMemberModal(){
        this.setState({
            isShowAddMemberModal:false,
            currentSetUp:-1,
        })
    }

    //关闭删除弹窗
    closeRemoveMemberModal(){
        this.setState({
            isShowRemoveMemberModal:false,
            currentSetUp:-1,
        })
    }

    //显示申请记录 或者修改关系
    setApplicationRecordBtn(index){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.childLeftBtn]}
                onPress={this._onApplicationRecord.bind(this, index)}
            >
                <Text style={[styles.btnText,{fontSize:16}]}>{index == 0 && this.famliyList.main != null ? '申请记录' : '修改关系'}</Text>
            </TouchableOpacity>
        )
    }

    //显示更多按钮
    setSetUpButton(index){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.childRightBtn]}
                onPress={this._onSetUpFamily.bind(this, index)}
            >
                <Image source = {require('./img/more.png')} style = {styles.childRightImage}/>
            </TouchableOpacity>
        )
    }

    //显示亲友团
    showQinyoutuan = (index)=>{
        var memberList = this.getFamilyData(index).memberList;
        console.log(memberList)
        var len = memberList.length
        var sr = len +'位亲友团'
        len = len>3?3:len
        var temp = []
        temp.push(
            <Text key  = {3000} style ={{color:'white',marginRight:3}}>{sr}</Text>
        )
        for(var i = 0;i<len;i++){
            var member = memberList[i]
            temp.push(<Image 
                key  = {i}
                source = {member.user.headshot == null || member.user.headshot == '' ? require('../../utils/img/userHead.png') : {uri: member.user.headshot}} 
                style = {{width:SceneUtils.size.width * 0.07,height:SceneUtils.size.width * 0.07,borderRadius:SceneUtils.size.width * 0.07/2}}/>)
        }
        return temp
    }

    //显示下啦部分
    setChildDownView(index){
        if(this.state.arrowUpIndex != index){
            return(
                <ImageBackground source = {
                    require('./img/arrowDown.png')} style = {styles.childDownView} >
                    {this.showQinyoutuan(index)}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.childDownBtn]}
                        onPress={this._onApplicationDownList.bind(this, index)}
                    />
                </ImageBackground>
            )
        }else{
            return(
                <View >
                    {/* <View style={styles.childDownView}>
                        <Text style={[styles.btnText,{fontSize:16,marginRight:8}]}>家庭成员列表</Text>
                        <View style={styles.childDownBtn}></View>
                    </View> */}
                    <ImageBackground source = {
                        require('./img/arrowUp.png')} style = {styles.childDownImg} >
                        <Text style={[styles.btnText,{fontSize:13,marginRight:9}]}>家庭成员列表</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.childDownBtn}
                            onPress={this._onApplicationUpList.bind(this, index)}
                        />
                    </ImageBackground>
                    <ScrollView
                        style={styles.childDownScrollViewStyle}
                        showsVerticalScrollIndicator = {false}
                    >   
                        {this.showMotherOrFather(index)}
                        {this.renderChildDownScrollViewChild(index)}
                    </ScrollView>
                </View>
            )
        }
    }

    //显示父亲或者母亲
    showMotherOrFather = (index)=>{
        if(DataUtil.getinstance().getISsh()){
              return
        }
        return [this.showHavaMotherOrFather(index),
            this.showOther()]
    }
    

    //显示展开后的下拉列表内容
    renderChildDownScrollViewChild(index){
        var memberList = this.getFamilyData(index).memberList;
        var datad = DataUtil.getinstance().getAccont()
        var allChild = [];
        for(var i = 0;i<memberList.length;i++){
            var member = memberList[i];
            var named = member.childRoles == null || member.childRoles.length == 0 ? member.user.nickname : member.childRoles[0].childRole
            if(datad.id === member.user.id){
                named = '您'
            }
            allChild.push(
                <View key={i} style={styles.childDownScrollChildView}>
                    <View style={styles.childDownScrollChildRowView}>
                        <Image source = {member.user.headshot == null || member.user.headshot == '' ? require('../../utils/img/userHead.png') : {uri: member.user.headshot}} style = {styles.childDownScrollChildRowImg}/>
                        <Text style={[styles.btnText,{fontSize:14,marginLeft:15}]}>{named}</Text>
                    </View>
                </View>
            );
        }
        return allChild;
    }



    //宝宝头像列表
    renderChildScrollViewChild(index){
        var children = this.getFamilyData(index).children;
        var allChild = [];
        for(var i = 0;i < children.length;i++){
            var child = children[i];
            var req = null
            if(child.headshot === ''   ||  child.headshot === null){
                req = child.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }
            allChild.push(
                <View key={i} style={index === 0?styles.scrollChildView:styles.scrollChildView2}>
                    <Image source = {child.headshot == null || child.headshot == '' ? req : {uri: child.headshot}} style = {index === 0?styles.scrollChildImage:styles.scrollChildImage2}/>
                </View>
            );
        }
        return allChild;
    }

    //srollView具体下面每一个item的实现
    renderScrollViewChild(){
        var allChild = [];
        var length =  this.famliyList.main == null ? this.famliyList.others.length : 1 + this.famliyList.others.length;
        for(var i = 0;i < length;i++){
            allChild.push(
                <View key={i} style = {{marginBottom:8,borderBottomWidth:1,borderColor:'rgb(80,80,80)'
                ,paddingBottom:28,
                }}>
                    {/* <View style={styles.childTopView}>
                        {this.setApplicationRecordBtn(i)}
                        {this.setSetUpButton(i)}
                    </View> */}
                    
                    <ScrollView
                        style={{alignSelf:'center',marginTop:8}}
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator = {false}
                    >
                        {this.renderChildScrollViewChild(i)}
                    </ScrollView>
                    <View style ={{justifyContent:'center'}}>
                        <View style = {{flexDirection:'row',justifyContent:'center',
                            
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this._onSetUpFamily.bind(this, i)}
                        >
                        <Image
                            style = {{width:23,height:SceneUtils.size.width * 0.08,}}
                            source = {require('./img/left2.png')}
                        ></Image>
                        </TouchableOpacity>
                        {this.setChildDownView(i)}
                        </View>
                    </View>
                    
                    
                </View>
            );
        }
        return allChild;
    }

    //调用加入家庭界面
    onJoinFamily = ()=>{
        this.setState({
            isShowFamilyModal:false,
        })
        this.props.onJoinFamily();
    }

    //微信分享
    wxShar = ()=>{
        if(DataUtil.getinstance().getISsh()){
            return       
        }
        var hsr = 'http://chbblshare.rbrbrbrb.com/maria/share/share/index.html?invitationCode=' + DataUtil.getinstance().getMainFamliy().main.invitationCode
        console.log(hsr)
        var cs = this.famliyList.main.children
        var name= ''
        if(cs.length>0){
            name = cs[0].nickname
        }
        var title = '快来关注在 ' + name + ' 成长历程'
        var des = '家庭码：' + DataUtil.getinstance().getMainFamliy().main.invitationCode + ',关注后可以一起陪伴宝宝成长。'
        wechat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                wechat.shareToSession({
                    title:title,
                    description: des,
                    thumbImage: 'https://mmbiz.qlogo.cn/mmbiz_png/vdJW2MIibvJ6aL3f0zRfVXo8K7hPp7ia6yFpR4An8gG2ichf8fXDibXstoQMDRenmkdE16gm7hRXnksltkIw6BOo6g/0?wx_fmt=png',
                    type: 'news',
                    webpageUrl: hsr,
                })
                    .catch((error) => {
                        Alert.alert(error.message);
                    });
            } else {
                Alert.alert('请安装微信');
            }
        });        

    }

    //显示分享的图标
    showFFimage = ()=>{
        if(DataUtil.getinstance().getISsh()){
                                    
        }else{
            return(
                <Image 
                    style = {{width:20,height:15}}
                    source = {require('./img/ffff.png')}
                ></Image>
            )
        }
    }

    //显示家庭邀请码横条
    setTopView(){
        var str = '家庭邀请码:   '
        return(
            <View style = {styles.topFamliy}> 
                <TouchableWithoutFeedback
                            onPress = {this.wxShar}
                        >
                <View style = {styles.topViewCenter}>
                    <View style = {styles.yaoqingmaView}>
                        <Text style = {styles.ftext}>{str}</Text>
                        <Text style = {styles.textCode}>{DataUtil.getinstance().getMainFamliy().main.invitationCode}</Text>
                    </View>
                    <View>
                        {this.showFFimage()}
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </View>
        )
        // return(
        //     <View style={styles.topView}>
        //         <View>
        //             <TouchableOpacity
        //                 activeOpacity={1}
        //                 style={[styles.topLeftBtn,{backgroundColor:'#EEEEEE'}]}
        //                 onPress={() => {
        //                     this.props.onJoinFamily();
        //                 }
        //             }>
        //                 <Text style={[styles.btnText,{fontSize:12}]}>加入家庭</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity
        //                 activeOpacity={1}
        //                 style={[styles.topLeftBtn,{backgroundColor:'#EEEEEE',marginTop:2}]}
        //                 onPress={() => {
        //                     this.props.onShare();
        //                 }
        //             }>
        //                 <Text style={[styles.btnText,{fontSize:12}]}>分享</Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={styles.topRightView}>
        //             <Text>{'家庭邀请码:'+ DataUtil.getinstance().getMainFamliy().main.invitationCode}</Text>
        //         </View>
        //     </View>
        // )
    }

    //判断是自己的主家庭还是附属家庭
    getFamilyData(index){
        if(this.famliyList.main != null){
            return index == 0 ? this.famliyList.main : this.famliyList.others[index - 1];
        }else{
            return this.famliyList.others[index];
        }
    }

    //显示是爸爸还是妈妈的邀请条
    showHavaMotherOrFather = (index)=>{
        if(index>0){
            return null
        }
        var memberList = this.getFamilyData(index).memberList;
        console.log(memberList)
        var len = memberList.length
        var adds = 0
        var mm = null
        var bb = null
        for(var i = 0 ;i<len;i++){
            var cr = memberList[i].childRoles
            var lenc = memberList[i].childRoles.length
            for(var j = 0; j<lenc;j++){
                if(cr[j].childRole === '爸爸'){
                    adds++
                    bb = 1
                }else if(cr[j].childRole === '妈妈'){
                    adds++
                    mm = 1
                }
                
            }
            
        }
        var qq = ''
        if(adds === 2){
            return null
        }else{
            qq = mm === null?'妈妈':'爸爸'
        }
        if(adds >=100){
            qq = '您'
        }
        return (
            <TouchableOpacity
                        key = {index}
                        onPress={() => {
                            this.wxShar()
                        }
                    }>
        <View  style={styles.childDownScrollChildView}>
            <View style={styles.childDownScrollChildRowView}>
                <ImageBackground source = {require('./img/iconbg.png')} style = {styles.childDownScrollChildRowImg}>
                    <View style = {{position:'absolute',right:0,bottom:0}}>
                        <Image source = {require('./img/add.png') }
                            style = {{width:10,height:10}}
                        >
                        </Image>
                    </View>
                </ImageBackground>
                <Text style={[styles.btnText,{fontSize:14,marginLeft:15,color:'#AEEEEE',textDecorationLine:'underline'}]}>{'邀请' +qq}</Text>
                
            </View>
        </View>
        </TouchableOpacity>)
    }

    //显示其他家庭
    showOther = ()=>{
        return (
            <TouchableOpacity
                        key = {10086}
                        onPress={() => {
                            this.wxShar()
                        }
                    }>
        <View  style={styles.childDownScrollChildView}>
            <View style={styles.childDownScrollChildRowView}>
            <ImageBackground source = {require('./img/iconbg.png')} style = {styles.childDownScrollChildRowImg}>
                    <View style = {{position:'absolute',right:0,bottom:0}}>
                        <Image source = {require('./img/add.png') }
                            style = {{width:10,height:10}}
                        >
                        </Image>
                    </View>
            </ImageBackground>
                <Text style={[styles.btnText,{fontSize:14,marginLeft:15,color:'#AEEEEE',textDecorationLine:'underline'}]}>{'邀请其他成员'}</Text>
                
            </View>
        </View>
        </TouchableOpacity>)
    }
    render() {
        return (
            <View style={styles.container}>
                {this.setTopView()}
                <ScrollView
                    ref={ ref => this.scrollView = ref}
                    style={{height:SceneUtils.size.height * 0.52}}
                    scrollEnabled={this.state.arrowUpIndex == -1}
                    showsVerticalScrollIndicator = {false}
                >   
                    {this.renderScrollViewChild()}
                </ScrollView>
                <FamilyModal isModal={this.state.isShowFamilyModal}
                    type={this.state.currentSetUp}
                    onFamilyModalClose={() => this.closeFamilyModal()}
                    onAddMemberModal={() => this._onAddMemberModal()}
                    onRemoveMemberModal={() => this._onRemoveMemberModal()}
                    onQuitFamily={() => this._onQuitFamily()}
                    onApplicationRecord = {(i)=>{this._onApplicationRecord(i)}}
                    onJoinFamily = {() => this.onJoinFamily()}
                    
                />
                <AddMemberModal isModal={this.state.isShowAddMemberModal}
                    onRequestClose={()=>this.closeAddMemberModal()}
                    onAddMember={(id)=>this._onAddMember(id)}
                />
                <RemoveMemberModal isModal={this.state.isShowRemoveMemberModal}
                    onRemoveMemberModalClose={() => this.closeRemoveMemberModal()}
                />

            </View>
        );
    }

    //------------------------------消息------------------------------
    //主家庭添加成员
    sendAddMemberMsg(id) {
        var isPhoneNum = Util.phoneNumCheck(id);
        var token = DataUtil.getinstance().getUserData().access_token;
        let params = {'access_token':token};
        let params1 = isPhoneNum ? {'cellphone':'86'+id} : {'userId':id};
        var mod = {
            type:'post',
            url:'/maria/account/family/main/members',
            params:params,
            params1:params1,
            headers:['application/json','application/json'],
            callback:this.addMemberMsgBack
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendmembers)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }
    //主家庭添加成员返回
    addMemberMsgBack = (responseJson)=>{
        console.log(responseJson);
        this.famliyList.main.memberList.push(responseJson);
        this.setState({
            isShowAddMemberModal:false,
            currentSetUp:-1,
        })
    }
    //退出家庭
    sendQuitFamilyMsg() {
        var token = DataUtil.getinstance().getUserData().access_token;
        let params = {'access_token':token};
        let url = '';
        if(this.state.currentSetUp == 0 && this.famliyList.main != null){
            url = '/maria/account/family/main/services/quit?';
        }else{
            var familyId = this.famliyList.main == null ? this.famliyList.others[this.state.currentSetUp].id : this.famliyList.others[this.state.currentSetUp - 1].id;
            url = '/maria/account/family/others/'+familyId+'/services/quit?';
        }
        var mod = {
            url:url,
            params:params,
            params1:'',
            headers:['application/json','application/json'],
            callback:this.quitFamilyMsgBack
        }
        var farry = []
        var dataArry = []
        farry.push(NetService.sendquit)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }
    //主家庭添加成员返回
    quitFamilyMsgBack = (responseJson)=>{
        console.log(responseJson);
        if(this.state.currentSetUp == 0 && this.famliyList.main != null){
            this.famliyList.main = null;
        }else{
            if(this.famliyList.main == null){
                this.famliyList.others.splice(this.state.currentSetUp,1);
            }else{
                this.famliyList.others.splice(this.state.currentSetUp - 1,1);
            }
        }
        this.setState({
            isShowFamilyModal:false,
            currentSetUp:-1,
        })
    }
     //------------------------------------------------------------
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(51,51,51)',
    },
    topFamliy:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.05,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
    },
    topViewCenter:{
        width:SceneUtils.size.width*0.8,
        height:SceneUtils.size.height*0.042,
        backgroundColor:'rgb(169,169,169)',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:6,
    },
    yaoqingmaView:{
        width:SceneUtils.size.width*0.6,
        height:SceneUtils.size.height*0.042,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    topView:{
        flexDirection:'row',
        height:SceneUtils.size.width * 0.166 * 0.472 * 2 + 6,
        marginTop:6,
        borderColor:'#EEEEEE',
        borderBottomWidth:1,
    },
    ftext:{
        fontSize:13,
        color:'rgb(100,100,100)'
    },
    textCode:{
        fontSize:13,
        color:'rgb(60,60,60)'
    },
    topLeftBtn:{
        width:SceneUtils.size.width * 0.166,
        height:SceneUtils.size.width * 0.166 * 0.472,
        justifyContent:'center',
        alignItems:'center',
    },
    topRightView:{
        width:SceneUtils.size.width * 0.81 - 2,
        height:SceneUtils.size.width * 0.166 * 0.472 * 2 + 2,
        backgroundColor:'#EEEEEE',
        marginLeft:2,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        alignSelf:'center',
        color:'rgb(120,120,120)',
        marginTop:3,
    },
    childView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.width * 0.347,
        
    },

    fenxiangView:{
        flexDirection:'row',
        alignItems:'center'
    },
    childTopView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    childLeftBtn:{
        width:80,
        height:30,
        justifyContent: 'center',
        alignItems:'center',
    },
    childRightBtn:{
        width:40,
        height:20,
        justifyContent: 'center',
        alignItems:'center',
    },
    childRightImage:{
        width:18,
        height:4,
    },
    scrollChildView:{
        width:SceneUtils.size.width * 0.25,
        height:SceneUtils.size.width * 0.25,
        alignItems:'center',
    },
    scrollChildImage:{
        width:SceneUtils.size.width * 0.25,
        height:SceneUtils.size.width * 0.25,
        borderRadius:SceneUtils.size.width * 0.25/2
    },
    scrollChildView2:{
        width:SceneUtils.size.width * 0.16-3,
        height:SceneUtils.size.width * 0.16-3,
        alignItems:'center',
    },
    scrollChildImage2:{
        width:SceneUtils.size.width * 0.16-3,
        height:SceneUtils.size.width * 0.16-3,
        borderRadius:SceneUtils.size.width * 0.16/2
    },
    childDownView:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        width:SceneUtils.size.width-40,
        height:SceneUtils.size.width * 0.08,
        paddingRight:3,
    },
    childDownBtn:{
        width:SceneUtils.size.width * 0.085,
        height:SceneUtils.size.width * 0.085,
    },
    childDownScrollViewStyle:{
        height:SceneUtils.size.height * 0.32,
        width:SceneUtils.size.width -40,
        marginTop:SceneUtils.size.width * 0.18,
    },
    childDownImg:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:SceneUtils.size.width -40,
        height:SceneUtils.size.width * 0.088,
        position:'absolute',
        marginTop:SceneUtils.size.width * 0.08-2,
        alignItems:'flex-end'
    },
    childDownScrollChildView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.width * 0.17,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'rgb(100,100,100)',
        borderBottomWidth:1,
    },
    childDownScrollChildRowView:{
        flexDirection:'row',
        width:SceneUtils.size.width * 0.9,
        height:SceneUtils.size.width * 0.17 * 0.6,
    },
    childDownScrollChildRowImg:{
        width:SceneUtils.size.width * 0.17 * 0.6,
        height:SceneUtils.size.width * 0.17 * 0.6,
        borderRadius:SceneUtils.size.width * 0.17 * 0.6 *0.5,
    },
});