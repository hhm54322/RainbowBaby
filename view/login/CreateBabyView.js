'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import RadioModal from 'react-native-radio-master';
import ModalDropdown from 'react-native-modal-dropdown';
import DateUtil from '../../utils/DateUtil';
import DataUtil from '../../utils/DataUtil';

import NetService from '../../utils/NetService'

//创建宝宝界面
export default class CreateBabyView extends Component{
    constructor(props) {
        super(props);
        this.reName = ['爸爸','妈妈']       //选择关系对象
        this.haveMf = ''            //是否又爸妈

        this.to31arry = [1,3,5,7,8,10,12]       //day数组
        this.to30arry = [4,6,9,11]                      //30天月份
        this.dayarryNumber = [31,28,31,30,31,30,31,31,30,31,30,31]      //31天月份
        this.ismotherOrfather() 

        this.state = {
            sex:0,      //性别
            nikeName:'',            //昵称
            relationshipType:this.haveMf === '爸爸'?0:1,        //关系类型
            relationshipName:this.haveMf === '爸爸'?'爸爸':'爸爸',          //关系名字
            relationshipOtherType:-1,                   //其他类型
            relationshipOtherName:'        ',           //手机号码
            birthYear:2017,                             //初始化日期
            birthMonth:1,
            birthDay:1,
        };
    }

    //重写head函数
    static navigationOptions = ({navigation}) => (
        {
        title:'创建宝宝',
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    //废弃
    _radioOnSelect(id,item){
        if(id !== this.state.relationshipType){
            this.setState({
                relationshipType : id,
                relationshipName:item,
                relationshipOtherType:-1,
                relationshipOtherName:'        ',
            })
        }
    }

    //废弃
    _dropdownOnSelect(idx, value) {
        if(idx !== this.state.relationshipOtherType){
            console.log(idx);
            console.log(value);
            this.setState({
                relationshipOtherType : idx,
                relationshipOtherName:value,
            })
        }
    }

    //废弃
    _dropdownYearOnSelect(idx, value) {
        if(value !== this.state.birthYear){
            this.setState({
                birthYear : value,
            })
        }
    }
    //废弃
    _dropdownMonthOnSelect(idx, value) {
        if(value !== this.state.birthMonth){
            this.setState({
                birthMonth : value,
            })
        }
    }
    //废弃
    _dropdownDayOnSelect(idx, value) {
        if(value !== this.state.birthDay){
            this.setState({
                birthDay : value,
            })
        }
    }

    //显示头部上面的文字图片
    showTop = ()=>{
        return(
            <View style = {styles.topView}>
                <Image style = {styles.topViewimage}
                        source = {require('./img/wzibg.png')}
                    > 
                </Image>
            </View>
        )
    }
    //显示文字
    showScen = ()=>{
        return(
            <View style = {styles.scenView}>
                <Text style = {styles.textScStyle}>{'请填写一下信息，注意不要填错噢'}</Text>
            </View>
        )
    }

    //选择宝宝的性别
    showSelectBaby = ()=>{
        return (
            <View style = {styles.babyView}>
                <View style = {styles.sexView1}>
                    <Text style = {styles.babysex}>{'宝宝性别:'} </Text>
                </View>
                {this.showBabySelectImage(0)}
                {this.showBabySelectImage(1)}
            </View>
        )
    }

    //选择性别的回调
    selectBabyTouch = (s)=>{
        var ss = s
        return ()=>{
            this.setState({
                sex:ss
            })
        }
    }

    //宝宝选择的性别图
    showBabySelectImage = (sex)=>{
        var styleselect = {
            position: 'absolute',
            //top:7*SceneUtils.pixelratio,
            left:-14,
            width:24,
            height:24,
            borderRadius:12,
            backgroundColor:'rgb(178,178,178)',
        }
        if(sex === this.state.sex){
            styleselect.backgroundColor = 'rgb(129,184,34)'
        }
        var imre = sex === 0?require('./img/nansheng.png'):require('./img/nvsheng.png')
        
        return ( 
        <TouchableWithoutFeedback
            onPress = {this.selectBabyTouch(sex)}
        >
            <View style = {styles.sexView}>
                <ImageBackground
                style ={styles.imageView}
                source = {imre}
                >
                    <View style = {styleselect}></View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
        )
    }

    //显示宝宝的名字等
    showName = ()=>{
        return (
            <View style = {styles.lineInpute}>
                <View style = {styles.nameView}> 
                    <Text style = {styles.namefont}>{'宝宝小名：'}</Text>
                </View>
                <TextInput style = {styles.inputName}
                            underlineColorAndroid='transparent'
                            placeholder="请输入宝宝的小名"
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    nikeName: text
                                });
                            }}
                            value={this.state.nikeName}
                ></TextInput>
            </View>
        )
    }


    //显示下啦框
    showDownDrop = (optionsd,back,va)=>{
        return (
            <ModalDropdown 
                style = {styles.modeDownStyle}
                textStyle = {styles.modeTextS}
                dropdownStyle = {styles.dorpStyle}
                options={optionsd}
                onSelect={(idx, value) => back(idx, value)}
                defaultValue = {optionsd[0].toString()}
                renderRow = {this.renderRowthis}
                //adjustFrame = {this.adjustFrame}
            >
                <View style = {styles.modeDownStyle}
                >
                    <Text>{va}</Text>
                    <Image style = {styles.downImage}
                        source = {require('./img/down.png')}
                    > 
                    </Image>
                </View>
            </ModalDropdown>
        )
    }

    //下拉框的样式
    renderRowthis = (rowData, rowID, highlighted)=>{
        return (
            <View style = {styles.borderOnw}>
                <Text style = {styles.modeTextS}>{rowData}</Text>
            </View>
        )
    }

    //显示所有的下拉框
    showYearMothDay = ()=>{
        return (
            <View style = {styles.lineInpute}>
                <View style = {styles.nameView}> 
                    <Text style = {styles.namefont}>{'宝宝生日：'}</Text>
                </View>
                <View style = {styles.inputName}>
                    {this.showDownDrop(this.yearArry(),this.yearBack,this.state.birthYear)}
                    {this.showDownDrop(this.mothArry(),this.motnBack,this.state.birthMonth)}
                    {this.showDownDrop(this.dayArry(),this.dayBack,this.state.birthDay)}
                </View>
                

            </View>
        )
    }
    //返回年数组
    yearArry = ()=>{
        var datenow = new Date()
        var nowMonth = datenow.getMonth()+1
        var nowDay = datenow.getDate()
        var nowy = datenow.getFullYear()
        if(this.state.birthMonth>nowMonth){
            nowy--
        }else if(this.state.birthMonth === nowMonth && this.state.birthDay > nowDay){
            nowy--
        }
        var years = new Array();
        for(var i = 0;i<10;i++){
            years.push(nowy - i);
        }
        return years
    }

    //点击年回调
    yearBack = (idx, value)=>{
        if(value !== this.state.birthYear){
            this.setState({
                birthYear : value,
            })
        }
    }

    //返回月份数组
    mothArry = ()=>{
        var datenow = new Date()
        var nowMonth = datenow.getMonth()+1
        var nowDay = datenow.getDate()
        var nowy = datenow.getFullYear()
        if(this.state.birthYear === nowy){
            if(this.state.birthDay>nowDay){
                nowMonth--;
            }
        }else if(this.state.birthYear < nowy){
            nowMonth = 12
        }

        var months = new Array();
        for(var i = 0;i<nowMonth;i++){
            months.push(i+1);
        }
        return months
    }

    //月份数组回调
    motnBack = (idx, value)=>{
        if(value !== this.state.birthMonth){
            this.setState({
                birthMonth : value,
            })
        }
    }

    //查看是否已经设置关系
    ismotherOrfather = ()=>{
        var familyall = DataUtil.getinstance().getMainFamliy()
        if(!familyall){
            return
        }
        var memberLists = familyall.main.memberList
        var length = memberLists.length;
        for(var i = 0;i<length;i++){
            var memberList = memberLists[i];
            if(memberList.user.id === DataUtil.getinstance().getAccont().id){
               var len =  memberList.childRoles.length
               for(var ii = 0;ii<len;ii++){
                    this.haveMf = memberList.childRoles[ii].childRole
                    return
                }
            }
            
        }
    }

    //返回天数组
    dayArry = ()=>{
        var datenow = new Date()
        var nowMonth = datenow.getMonth()+1
        var nowDay = datenow.getDate()
        var nowy = datenow.getFullYear()
        if(this.state.birthYear%400===0 && this.state.birthYear%4 === 0 && this.state.birthYear%100!=0){
            this.dayarryNumber[1] = 29
        }else{
            this.dayarryNumber[1] = 28
        }
        if(this.state.birthYear<nowy){
            nowDay = this.dayarryNumber[this.state.birthMonth-1]
        }else if(this.state.birthMonth != nowMonth){
            nowDay = this.dayarryNumber[this.state.birthMonth-1]
        }
        var days = new Array();
        for(var i = 0;i<nowDay;i++){
            days.push(i+1);
        }
        return days
    }

    //点击天的回调
    dayBack = (idx, value)=>{
        if(value !== this.state.birthDay){
            this.setState({
                birthDay : value,
            })
        }
    }



    selectFMTouch = (s)=>{
        var ss = s
        return ()=>{
            this.setState({
                relationshipType:ss,
                relationshipName:this.reName[ss]
            })
        }
    }
    
    showMorF = (fmtype)=>{
        console.log(this.haveMf)
        if(this.haveMf != this.reName[fmtype]  && this.haveMf != ''){
            return
        }
        var styleselect = {
            width:19,
            height:19,
            borderRadius:10,
            backgroundColor:'rgb(178,178,178)',
            borderWidth:1,
            borderColor:'rgb(180,180,180)'
        }
        if(fmtype === this.state.relationshipType){
            styleselect.backgroundColor = 'rgb(129,184,34)'
        }
        return (
        <TouchableWithoutFeedback
            onPress = {this.selectFMTouch(fmtype)}
        >
            <View style = {styles.fmView}>
                <View style = {styleselect}></View>
                <Text style = {styles.FMText}>{this.reName[fmtype]}</Text>
            </View>
        </TouchableWithoutFeedback>
        )
    }

    // up(){
    //     for(var i = 0;i<l;i++  )//遍历全部  顺序遍历 如果是其他方向  可以考虑是顺序还是逆序{}
    //     {
    //         if(i - 4<=0){
    //             continue    //顶部的不考虑
    //         }else{
    //             toTop(i)
    //         }
    //     }
    // }

    // toTop(i){
    //     if(i<0){
    //         return
    //     }
    //     var dasd = all[i]  //当前需要判断的对象
    //     var dasd1 = all[i - 4]   //当前对象的上一个对象
    //     //2个对象都拿到了对吧
    //     if(true){}//  panduan 是否可以上移其中包含是否可以合并
    //     toTop(i - 4)
    // }


    selectMotherAndFather = ()=>{
        return (
            <View style = {styles.lineInpute}>
                <View style = {styles.nameView2}> 
                    <Text style = {styles.namefont}>{'宝宝关系:'}</Text>
                </View>
                {this.showMorF(0)}
                {this.showMorF(1)}
            </View>
        )
    }

    //跳转到训练界面
    listBack = ()=>{
        const { navigate } = this.props.navigation;
        //this.babydata = this.props.navigation.state.params.babyData
        navigate('Train',{info:this.props.navigation.state.params.info})
       
    }

    //跳转到baby界面
    famliyListBack = (responseJson)=>{
        console.log(responseJson)
        DataUtil.getinstance().setMainFamliy(responseJson)

        DeviceEventEmitter.emit('baby');
    }

    //发送添加宝宝消息
    sendmessageAll = ()=>{
        var farry = []
        var dataArry = []
        var p ={
            access_token:DataUtil.getinstance().getUserData().access_token
        }
        var time = new Date(this.state.birthYear+'-'
        +this.state.birthMonth+'-'+this.state.birthDay).getTime()

        time = this.state.birthYear+'-'+this.state.birthMonth+'-'+this.state.birthDay + ' 00:10:10'
        var params1 = {
            gender:this.state.sex,
            nickname:this.state.nikeName,
            birthdate: time,
            childRole:this.state.relationshipName
        }
        var mod = {
            //type:'post',
           // url:'/maria/account/family/main/children',
            params:p,
            params1:params1,
            headers:['application/json','application/json'],
            callback:(j)=>{}
        }
        farry.push(NetService.sendchildrenCreate)
        dataArry.push(mod)

        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod2 = {
            //type:'get',
            //url:'/maria/account/family',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.famliyListBack
        }

        farry.push(NetService.sendfamily)
        dataArry.push(mod2)

        NetService.doArry(farry,dataArry,this.listBack)
    }
    
    //点击创建宝宝的回调
    onTouchCreate = ()=>{
        this.sendmessageAll()
    }


    //显示创建宝宝按钮
    showCreateBtn = ()=>{
        return (
            <View style = {styles.btnView}>
                <TouchableWithoutFeedback onPress = {this.onTouchCreate}>
                    <View style = {styles.btnStyle}>
                        <Text style = {styles.createtext}>{'创建宝宝'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.showTop()}
                {this.showScen()}
                {this.showSelectBaby()}
                {this.showName()}
                {this.showYearMothDay()}
                {this.selectMotherAndFather()}
                {this.showCreateBtn()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
        //justifyContent:'center',
        alignItems:'center',
    },
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.266,
        justifyContent:'center',
        alignItems:'center',
    },
    topViewimage:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.236,
        justifyContent:'center',
        alignItems:'center',
        resizeMode :'stretch',
    },
    scenView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.065,
        justifyContent:'center',
        alignItems:'center',
    },
    textScStyle:{
        fontSize:13,
        color:'rgb(100,100,100)',
        fontWeight:'400'
    },
    babyView:{
        marginTop:7,
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.177,
        //justifyContent:'center',
        //alignItems:'center',
        flexDirection: 'row',
    },
    sexView:{
        height:SceneUtils.size.height*0.165,
        width:SceneUtils.size.width*0.31,
        alignItems:'center',
    },
    sexView1:{
        height:SceneUtils.size.height*0.165,
        width:SceneUtils.size.width*0.26,
    },
    babysex:{
        marginTop:6,
        fontSize:13,
        color:'rgb(220,220,220)',
    },
    imageView:{
        marginTop:6,
        height:SceneUtils.size.height*0.160,
        width:SceneUtils.size.width*0.23,
    },
    lineInpute:{
        flexDirection: 'row',
        marginTop:14,
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.07,
        //justifyContent:'center',
        alignItems:'center',
    },
    nameView:{
        width:SceneUtils.size.width*0.2,
        height:SceneUtils.size.height*0.07,
        justifyContent:'center',
        alignItems:'center',
    },

    nameView2:{
        width:SceneUtils.size.width*0.23,
        height:SceneUtils.size.height*0.07,
        justifyContent:'center',
    },

    namefont:{
        fontSize:14,
        color:'rgb(220,220,220)',
    },
    inputName:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.74,
        height:SceneUtils.size.height*0.07,
        borderRadius:4,
        backgroundColor:'white',
        
    },
    modeDownStyle:{
        flexDirection: 'row',
        width:SceneUtils.size.width*0.74/3.1,
        height:SceneUtils.size.height*0.07,
        justifyContent:'center',
        alignItems:'center',
    },
    modeTextS:{
        color:'rgb(98,98,98)',
        fontSize:12,
    },
    dorpStyle:{
        borderWidth:0,
    },
    borderOnw:{
        width:SceneUtils.size.width*0.74/3.1,
        height:SceneUtils.size.height*0.05,
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
    },
    downImage:{
        marginLeft:6,
        width:10,
        height:6,
    },
    fmView:{
        width:SceneUtils.size.width*0.23,
        height:SceneUtils.size.height*0.07,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },

    FMText:{
        marginLeft:6,
        color:'white',
        fontSize:14,
    },
    btnView:{
        position: 'absolute',
        bottom:0,
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.117,
        justifyContent:'center',
        alignItems:'center',
    },
    btnStyle:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.07,
        backgroundColor:'rgb(128,184,34)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    createtext:{
        color:'white',
        fontSize:18,
        fontWeight:'700'
    }
});