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

//改变和宝宝的关系
export default class ChangeView extends Component{
    constructor(props) {
        super(props);
        this.dataall = this.props.navigation.state.params.info      //alldata
        this.memberList = this.dataall.memberList       //所有的关系列表
        var len = this.memberList.length            //关系长度
        this.childRolesNmae = ''                    //选择的包包角色名字
        

        //拿到宝宝的当前关系
        for(var i = 0;i<len;i++){
            var childRoles = this.memberList[i].childRoles          
            if(childRoles.length>0){
                this.childRolesNmae = childRoles[0].childRole
                break;
            }
        }
        this.id = this.dataall.id   
        this.hasFather = false   //有无父
        this.hasMather = false   //有无母
        this.fid = 0
        this.state = {
            datas : this.dataall.children,  //所有的child
            selectData:[],      //选中的data
            roleList:[],        //可选关系
            is:false,
            val:'',             //选择的关系
        };
    }

    //重写head导航条
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

    componentDidMount(){
        DataUtil.getroleList((j)=>{
            this.setState({
                roleList:j
            })
        })
    }

    //？？？？？
    _dropdownOnSelect(idx, value,num) {
        datas[num].relationshipOtherType = idx;
        datas[num].relationshipOtherName = value;
        this.setState({
            datas : datas
        })
    }

    //显示选择器的点和圈
    showCirl = (isHave,text,isselect,i)=>{
        return (
                <View style = {styles.cirposition}>
                    <Text style = {[styles.textStyleall1,{marginLeft:4}]}>
                        {text}
                    </Text>
                </View>
        )
    }

    //其他关系类型
    otherArry = ()=>{
        return this.state.roleList
    }

    //设置选择的关系
    setSelect(i,type,val){
        this.setState({
            val:val
        })
    }

    //选择回调
    onSelectback = (i)=>{
        var ii = i
        return (idx, value) => {
            this.setSelect(ii,2,value)
        }
    }

    //显示下拉框  
    showDownDrop = (optionsd,i,va,is)=>{
        if(!is){
            return 
        }
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
                    <Image style = {styles.downImage}
                        source = {require('./img/downd.png')}
                    > 
                    </Image>
                    <Text style = {{color:'white',fontSize:20,fontWeight:'700',width:60}}>{va}</Text>
                    
                    
                </View>
            </ModalDropdown>
        )
    }
    renderRowthis = (rowData, rowID, highlighted)=>{
        return (
            <View style = {styles.borderOnw}>
                <Text style = {styles.modeTextS}>{rowData}</Text>
            </View>
        )
    }

    //显示关系横条
    showBottomText = (i,data,dataselect,is)=>{
        var wenzi = is?' ':this.childRolesNmae
        var bi = is?0.55:0.7
        console.log(data)
        return (
            <View style = {styles.mainDView}>
                <Text style = {[styles.textStyleall1,styles.textLeftMargin]}>{'关系'}</Text>
                <View style = {{width:SceneUtils.size.width*bi}}></View>
                {this.showCirl(false,wenzi,2,i)}
                {this.showDownDrop(this.otherArry(),i,this.state.val,is)}
            </View>
        )
    }

    //已经废弃  暂时不用
    renshowMain = (i,data)=>{
        return (
            <View key = {i}
                style = {{marginTop:15}}
            >
                {this.renshowMainOne(i,data,false)}
                <View style = {{height:6}}></View>
                
            </View>
        )
    }

    //显示修改关系的总的外层view
    renshowMain2 = (i,data)=>{
        return (
            <View key = {i}
                style = {{marginTop:15}}
            >
                {this.renshowMainOne(i,data,true)}
                <View style = {{height:6}}></View>
            </View>
        )
    }


    showOneSet = (i,data)=>{
        //textFontSize
        var xx = data.gender === 0 ? '男' : '女'
        var req = null
            if(data.headshot === ''   ||  data.headshot === null){
                req = data.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }

        var datad = data.birthdate.substring(0,11)
        return (
            <View 
            key = {i}
            style  = {styles.mainOne}>
                <View style = {styles.mainOneView}>
                    <Image
                        source = {req === null? {uri:(data.headshot)} :req}
                        style = {styles.hosimage}
                    ></Image>
                    <View style = {styles.mainOneTextView}>
                        <Text style = {[styles.textFontSize,{color:'rgb(150,150,150)'}]}>{'昵称:    '}
                            <Text style = {[styles.textFontSize,{color:'rgb(220,220,220)'}]}>{data.nickname}</Text>
                        </Text>
                        <Text style = {[styles.textFontSize,{color:'rgb(150,150,150)'}]}>{'性别:    '}
                            <Text style = {[styles.textFontSize,{color:'rgb(220,220,220)'}]}>{xx}</Text>
                        </Text>
                        <Text style = {[styles.textFontSize,{color:'rgb(150,150,150)'}]}>{'生日:    '}
                            <Text style = {[styles.textFontSize,{color:'rgb(220,220,220)'}]}>{datad}</Text>
                        </Text>
                        <Text style = {[styles.textFontSize,{color:'rgb(150,150,150)'}]}>{'关系:    '}
                            <Text style = {[styles.textFontSize,{color:'rgb(220,220,220)'}]}>{this.childRolesNmae}</Text>
                        </Text>
                    </View>
                    <View style = {styles.mainrightView}>
                        {this.showDownDrop(this.otherArry(),i,this.state.val,true)}
                    </View>
                </View>
            </View>
        )
    }

    //具体实现每一个关系修改
    renshowMainOne = (i,data,is)=>{
        var adv = is?'重新确认关系':'当前关系'
        var xx = data.gender === 0 ? '男' : '女'
        xx = '宝宝性别 :' +  xx
        var req = null
            if(data.headshot === ''   ||  data.headshot === null){
                req = data.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }
        return (
            <View
                    style={styles.childView}
                >
                    <View style = {styles.centerMainView}>
                        <View style = {styles.mainHeadView}>
                            <Text style = {{color:'rgb(150,150,150)'}}>{adv}</Text>
                        </View>
                        <View style = {styles.mainTopView}>
                            <Image
                                source = {req === null? {uri:(data.headshot)} :req}
                                style = {styles.hosimage}
                            ></Image>
                            <View style = {styles.textView}>
                                <Text style = {styles.textStyleall}>{'宝宝小名 :'+data.nickname}</Text>
                                <Text style = {styles.textStyleall}>
                                {xx}
                                </Text>
                                <Text style = {styles.textStyleall}>{'宝宝生日 :'+data.birthdate}</Text>
                            </View>
                        </View>
                        
                        {this.showBottomText(i,this.state.datas,this.state.datas,is)}
                        <View style = {[{marginTop:5},styles.line1]}></View>
                    </View>
                </View>
        )
    }
    
    renderScrollViewChild(){
        var allChild = [];
        var datasd = this.state.datas
        var l = datasd.length
        for(var i = 0;i < l;i++){
            allChild.push(
                this.showOneSet(i,datasd[i])
            );
        }
        return allChild;
    }

    renderScrollViewChild2(){
        var allChild = [];
        var datasd = this.state.datas
        var l = datasd.length
        for(var i = 0;i < l;i++){
            allChild.push(
                this.renshowMain2(i,datasd[i])
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

    //根据情况发送不同的消息    修改关系为爸妈  则是 主家庭发送    其他关系为其他家庭发送
    pushtoFalmly = (strall,dd)=>{
        var token = DataUtil.getinstance().getUserData().access_token
        var url = ''
        var pa = {}
        let params = {'access_token':token}
        let params1 = {}
        if(dd === 2){
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
        console.log(params1)
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
        farry.push(NetService.sendChage)
        dataArry.push(mod)
        NetService.doArry(farry,dataArry)

    }
    enterback=(j)=>{
    }

    //修改关系放入数据
    pushmessageEnterF = ()=>{
        var l  = this.state.datas.length
        var cclist = []
        for(var i = 0;i<l;i++){
            var strct = {
                childId:this.state.datas[i].id,
                childRole:this.state.val,//this.getRo(ad)
            }
            cclist.push(strct)
        }
        var strall = {
            childRoles:cclist
        }
        this.pushtoFalmly(strall,2)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style = {{height:SceneUtils.size.height*0.7}}>
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                            // onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
                    >
                        {this.renderScrollViewChild()}
                    </ScrollView>
                </View>
                <View style = {styles.textpositiond}>
                    <Text style = {{color:'red'}}>{'修改与宝宝的关系,需要得到爸爸妈妈的同意'}</Text>
                </View>

                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        onPress={() => {
                            this.pushmessageEnterF()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'确认修改'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },

    mainOne:{
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'center',
    },
    mainOneView:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
        paddingTop:18,
        paddingBottom:18,
    },
    mainOneTextView:{
        width:SceneUtils.size.width*0.4,
        height:SceneUtils.size.width*0.28,
        marginLeft:5,
        borderRightWidth:1,
        borderColor:'rgb(100,100,100)'

    },
    textFontSize:{
        fontSize:15,
        marginBottom:SceneUtils.size.width*0.28*0.08,
        fontWeight:'500'
    },
    mainrightView:{
        width:SceneUtils.size.width*0.3,
        height:SceneUtils.size.width*0.28,
        alignItems:'center',
        justifyContent:'center'
    },

    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
        alignItems:'center',
        justifyContent:'center',
    },
    titleIamgeStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
    },

    childView:{
        marginBottom:4,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.25,
        alignItems:'center',
    },
    centerMainView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.248,
    },
    mainHeadView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.048,
        alignItems:'center',
        justifyContent:'center'
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
    },
    hosimage:{
        marginLeft:11,
        width:SceneUtils.size.width*0.28,
        height:SceneUtils.size.width*0.28,
        borderRadius:SceneUtils.size.width*0.28/2,
    },
    textView:{
        marginLeft:7,
        height:SceneUtils.size.width*0.16-1,
        justifyContent:'space-between'
    },
    textStyleall:{
        fontSize:15,
        color:'rgb(180,180,180)',
    },
    textStyleall1:{
        fontSize:15,
        color:'rgb(230,230,230)',
    },
    textLeftMargin:{
        marginLeft:11,
    },
    cirposition:{
        marginLeft:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    cirlViewBg:{
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:'rgb(230,230,230)',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'rgb(200,200,200)',
    },
    cirlDD:{
        width:3,
        height:3,
        borderRadius:2,
        backgroundColor:'rgb(20,20,20)',
    },

    textpositiond:{
        position:'absolute',
        alignSelf:'center',
        bottom:SceneUtils.size.height*0.12,
    },

    btnView:{
        position:'absolute',
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
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
        fontSize:18,
        color:'white',
        fontWeight:'900'
    },
    downImage:{
        marginRight:3,
        width:15,
        height:13,
    },
    modeDownStyle:{
        flexDirection: 'row',
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