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
    TouchableWithoutFeedback,
} from 'react-native';

const displayFlex  = 'flex'
const displayNone  = 'none'
import RadioModal from 'react-native-radio-master';
import ModalDropdown from 'react-native-modal-dropdown';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil';
import NetService from '../../utils/NetService'


//加入家庭
export default class JoinFamilyTwoView extends React.Component{
    constructor(props) {
        super(props);
        this.id
        this.destroy
        if(this.props.navigation.state.params){
            this.id = this.props.navigation.state.params.info
        }else{
            this.id = this.props.id
            this.destroy = this.props.destroy
        }
        this.hasFather = false
        this.hasMather = false
        this.fid = 0
        this.mapse = new Map()
        this.state = {
            datas : [],
            selectData:[],
            roleList:[],
            is:false,
        };
    }

    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
    //   title: `Chat with ${navigation.state.params.user}`,
        //title:'加入急',
        header:null,
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
        // headerLeft:{
        //     onPress:
        // },
      
    });

    //重新刷新数据
    refrenshwoMod = (j)=>{
        console.log(j)
        this.hasFather = j.hasFather
        this.hasMather = j.hasMather
        this.fid = j.id
        var l = j.children.length
        for(var i = 0;i<l;i++){
            
        }
        this.mapse.set(1,{type:-1,val:''})
        this.setState({
            datas:j.children
        })

    }


    //根据邀请码 发送数据消息

    pushMessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,'invitationCode':this.id};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.refrenshwoMod
        }


        var farry = []
        var dataArry = []
        farry.push(NetService.sendfamilyOther)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)

    }

    componentDidMount(){
        DataUtil.getroleList((j)=>{
            this.setState({
                roleList:j
            })
        })
        this.pushMessage()
        var adv ={
            type:0,
            select1:'账户',
        }
    }

    //点击圆点后的回调
    touchSelectBack = (i,isselect)=>{
        this.mapse.set(1,{type:isselect,val:''})
        this.setState({
            is : !this.state.is
        })
    }

    //显示圆圈
    showCirl = (isHave,text,isselect,i)=>{
        if(isHave){
            return
        }
        var struct = this.mapse.get(1)
        var dis = isselect === struct.type ? displayFlex:displayNone
        var backgroundc = isselect === struct.type ?{backgroundColor:'rgb(134,184,34)'}:{backgroundColor:'rgb(230,230,230)'}
        return (
            <TouchableWithoutFeedback 
                onPress = {this.touchSelectBack.bind(this,i,isselect)}
            >
                <View style = {styles.cirposition}>
                    <View style = {[styles.cirlViewBg,backgroundc]}>
                        {/* //<View style = {[styles.cirlDD,{display:dis}]}></View> */}
                    </View>
                    <Text style = {[styles.textStyleall1,{marginLeft:4}]}>
                        {text}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    //返回其他关系列表
    otherArry = ()=>{
        return this.state.roleList
    }

    //下啦框选择后具体实现，type  是类型 表示是否属于爸妈   val 是值 表示关系
    setSelect(i,type,val){
        if(this.mapse.get(1)){
            this.mapse.set(1,{type:2,val:val})
        }
        this.setState({
            is:!this.state.is
        })
    }

    //下啦框选择后的回调
    onSelectback = (i)=>{
        var ii = i
        return (idx, value) => {
            this.setSelect(ii,2,value)
        }
    }

    //显示下拉框
    showDownDrop = (optionsd,i,va)=>{
        return (
            <ModalDropdown 
                style = {styles.modeDownStyle}
                textStyle = {styles.modeTextS}
                dropdownStyle = {styles.dorpStyle}
                options={optionsd}
                onSelect={this.onSelectback(i)}
                defaultValue = {''}
                renderRow = {this.renderRowthis}
                //adjustFrame = {this.adjustFrame}
            >
                <View style = {styles.modeDownStyle}
                >
                    <Text style = {{color:'white'}}>{va}</Text>
                    <Image style = {styles.downImage}
                        source = {require('./img/bjdown.png')}
                    > 
                    </Image>
                </View>
            </ModalDropdown>
        )
    }

    //下啦框每一个的渲染样式
    renderRowthis = (rowData, rowID, highlighted)=>{
        return (
            <View style = {styles.borderOnw}>
                <Text style = {styles.modeTextS}>{rowData}</Text>
            </View>
        )
    }

    //显示最下面横条  包括圈和文字
    showBottomText = (i,data,dataselect)=>{
        return (
            <View style = {styles.mainDView}>
                <Text style = {[styles.textStyleall1,styles.textLeftMargin]}>{'关系'}</Text>
                {/* <View style = {{width:SceneUtils.size.width*0.2}}></View> */}
                {this.showCirl(this.hasMather,'妈妈',0,i)}
                {this.showCirl(this.hasFather,'爸爸',1,i)}
                {this.showCirl(false,'其他',2,i)}
                {this.showDownDrop(this.otherArry(),i,this.mapse.get(1).val)}
            </View>
        )
    }
    

    //具体实现每一个itme
    renderScrollViewChild(){
        var allChild = [];
        var datasd = this.state.datas
        var l = datasd.length
        for(var i = 0;i < l;i++){
            var req = null
            if(datasd[i].headshot === ''   ||  datasd[i].headshot === null){
                req = datasd[i].gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }
            var xx = datasd[i].gender === 0 ? '男' : '女'
            xx = '宝宝性别 :' +  xx
            allChild.push(
                <View key = {i}
                    style={styles.childView}
                >
                    <View style = {styles.centerMainView}>
                        <View style = {styles.mainTopView}>
                            <Image
                                source = {req === null? {uri:(datasd[i].headshot)} :req}
                                style = {styles.hosimage}
                            ></Image>
                            <View style = {styles.textView}>
                                <Text style = {styles.textStyleall}>{'宝宝小名 :'+datasd[i].nickname}</Text>
                                <Text style = {styles.textStyleall}>
                                {xx}
                                </Text>
                                <Text style = {styles.textStyleall}>{'宝宝生日 :'+datasd[i].birthdate}</Text>
                            </View>
                        </View>
                        {this.showBottomText(i,this.state.datas,this.state.datas)}
                    </View>
                </View>

                // <View key={i} style={styles.childView}>
                //     <Image source = {require('./ICON_11.png')} style = {styles.babyImage}/>
                //     <View style={styles.babyTxtView}>
                //         <Text style={styles.babyNameTxt}>宝宝小名：宝宝</Text>
                //         <Text style={styles.babyNameTxt}>宝宝性别：男</Text>
                //         <Text style={styles.babyNameTxt}>出身生日：2017.1.1</Text>
                //         <View style={styles.radioModalView}>
                //             <Text style={styles.relationshipTxt}>关系:</Text>
                //             <RadioModal
                //                 selectedValue={this.state.datas[i].relationshipType}
                //                 num = {i}
                //                 onValueChange={(id,item,i) => this._radioOnSelect(id,item,i)}
                //                 style={{ flexDirection:'row',
                //                     flexWrap:'wrap',
                //                     alignItems:'flex-start',
                //                     backgroundColor:'#ffffff'
                //                     }} 
                //                 >
                //                 <Text value='0'>爸爸</Text>
                //                 <Text value='1'>妈妈</Text>
                //                 <Text value='2'>其他</Text>
                //             </RadioModal>
                //             <ModalDropdown
                //                 num = {i}
                //                 options={['舅舅', '叔叔', '阿姨', '哥哥', '姐姐', '弟弟', '妹妹', '爷爷', '奶奶', '外公', '外婆']}
                //                 disabled={this.state.datas[i].relationshipType === '2' ? false : true}
                //                 textStyle={styles.dropdown_2_text}
                //                 dropdownStyle={styles.dropdown_2_dropdown}
                //                 onSelect={(idx, value,i) => this._dropdownOnSelect(idx, value,i)}>
                //                 <ImageBackground style={styles.modalDropdownImage}
                //                     source={require('./ICON_17.png')}>
                //                     <Text style={styles.modalDropdownText}>{this.state.datas[i].relationshipOtherName}</Text>
                //                 </ImageBackground>
                //             </ModalDropdown>
                //         </View>
                //     </View>
                // </View>
            );
        }
        return allChild;
    }

    //返回关系
    getRo = (dd)=>{
        if(dd.type === 0){
            return '妈妈'
        }else if(dd.type === 1){
            return '爸爸'
        }else if(dd.type === 2){
            return dd.val
        }
    }


    //根据选择的消息发送不同的消息  爸妈的话  就是主家庭   其他关系就是其他家庭  具体看接口文档
    pushtoFalmly = (strall,dd)=>{
        var token = DataUtil.getinstance().getUserData().access_token
        var url = ''
        var pa = {}
        let params = {'access_token':token}
        let params1 = {}
        if(dd.type === 2){
            url = '/maria/account/family/others/' +this.fid+'/applications'
            params1 = {
                applicationType:2,
                childRoles:strall.childRoles,
            }
        }else{
            url = '/maria/account/family/main/applications'
            params1 = {
                applicationType:0,
                familyId:this.fid,
                childRoles:strall.childRoles,
            }
        }
        var mod = {
            type:'post',
            url:url,
            params:params,
            params1:params1,
            headers:['application/json','application/json'],
            callback:this.enterback
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendjoinfamily)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }
    
    enterback=(j)=>{
        console.log(j)
    }

    //点击确认加入后的回调
    pushmessageEnterF = ()=>{
        var ad = this.mapse.get(1)
        var l  = this.state.datas.length
        var cclist = []
        for(var i = 0;i<l;i++){
            var strct = {
                childId:this.state.datas[i].id,
                childRole:this.getRo(ad)
            }
            cclist.push(strct)
        }
        var strall = {
            childRoles:cclist
        }
        this.pushtoFalmly(strall,ad)

    }

    //显示头部
    showHeade = ()=>{
        return(
            <View style = {{height:50,width:SceneUtils.size.width,alignItems:'center',
            borderBottomWidth:1,borderColor:'rgb(100,100,100)',flexDirection:'row',
            }}>
                <TouchableWithoutFeedback
                    onPress = {()=>{
                        if(this.props.navigation){
                            this.props.navigation.goBack();
                        }else{
                            this.destroy()
                        }
                        
                    }}
                >
                    <Image 
                    style = {[styles.setupimg,{marginLeft:10}]}
                    source = {require('../../utils/img/close.png')}
                    ></Image>
                </TouchableWithoutFeedback>
                <Text style = {{color:'white',fontSize:16,fontWeight:'300',marginLeft:20}}>{'加入家庭'}</Text>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.showHeade()}
                <View style = {styles.topView}>
                    <Image
                        source = {require('../../images/logo.png')}
                        style = {styles.titleIamgeStyle}
                    ></Image>
                </View>

                <View style = {{height:SceneUtils.size.height*0.44}}>
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                            // onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
                    >
                        {this.renderScrollViewChild()}
                    </ScrollView>
                </View>
                

                {/* <View style={styles.otherView}>
                    <View style={styles.logoView}>
                        <Image source = {require('../../images/ICON_07.png')} style = {styles.logoIcon}/>
                    </View>
                    <Text style={styles.codeText}>您输入的家庭邀请码：{this.props.navigation.state.params.info}</Text>
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
                </View> */}
                <View style = {styles.textpositiond}>
                    <Text style = {{fontSize:10}}>{'您输入的邀请码是：'+this.id}</Text>
                </View>

                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.pushmessageEnterF()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'确认加入'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                
                {/* <View style={styles.joinView}>
                    <ImageBackground source = {
                        require('./ICON_06.png')} style = {styles.btnImage}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.btn}
                            onPress={() => {
                                navigate('BabyMain')
                            }
                        }>
                            <Text style={styles.btnText}>确认加入</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View> */}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },

    setupimg:{
        width:25,
        height:25,
        resizeMode :'stretch',
    },
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    titleIamgeStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
    },

    childView:{
        marginBottom:10,
        marginLeft:SceneUtils.size.width*0.03,
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.253,
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    centerMainView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.208,
    },

    mainTopView:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.159,
        alignItems:'center'
    },
    line1:{
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(240,240,240)'
    },
    mainDView:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.049 - 2,
        alignItems:'center',
        marginTop:5
    },
    hosimage:{
        marginLeft:12,
        width:SceneUtils.size.width*0.16,
        height:SceneUtils.size.width*0.16,
        backgroundColor:'rgb(230,230,230)',
        borderRadius:SceneUtils.size.width*0.16/2,
    },
    textView:{
        marginLeft:7,
        height:SceneUtils.size.width*0.16-1,
        justifyContent:'space-between'
    },
    textStyleall:{
        fontSize:15,
        color:'rgb(150,150,150)',
        marginLeft:3,
    },
    textStyleall1:{
        fontSize:15,
        color:'rgb(230,230,230)',
    },
    textLeftMargin:{
        marginLeft:SceneUtils.size.width*0.2
    },
    cirposition:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    cirlViewBg:{
        width:17,
        height:17,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:25,
        
    },
    cirlDD:{
        width:4,
        height:4,
        borderRadius:2,
        backgroundColor:'rgb(20,20,20)',
    },

    textpositiond:{
        position:'absolute',
        alignSelf:'center',
        bottom:SceneUtils.size.height*0.115,
    },

    btnView:{
        position:'absolute',
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        //position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(134,184,34)',
        borderRadius:5,
    },
    btnText:{
        fontSize:20,
        color:'white',
        fontWeight:'900'
    },
    downImage:{
        marginLeft:6,
        width:9,
        height:5,
    },
    modeDownStyle:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.74/3.1,
        height:SceneUtils.size.height*0.07,
        justifyContent:'center',
        alignItems:'center',
    },
    dorpStyle:{
        backgroundColor:'rgb(240,240,240)',
        borderWidth:0,
    },
    modeTextS:{
        color:'rgb(98,98,98)',
        fontSize:12,
    },
    borderOnw:{
        width:SceneUtils.size.width*0.74/3.1,
        height:SceneUtils.size.height*0.05,
        backgroundColor:'rgb(240,240,240)',
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
    },

    //111111111111


    otherView:{
        justifyContent:'center',
        alignItems:'center',
    },
    logoIcon:{
        width:SceneUtils.size.width * 0.75,
        height:SceneUtils.size.width * 0.75*0.6,
        resizeMode:'contain',
        alignSelf:'center',
    },
    codeText:{
        fontSize:18,
        fontWeight:'900',
    },
    scrollView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.45,
        marginTop:20,
    },
    contentContainer:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.45 * 2.2,
    },
    joinView:{
        alignSelf:'center',
    },
    btnImage:{
        width:SceneUtils.size.width,
        height:40,
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