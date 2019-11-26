'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';

import DataUtil from '../../utils/DataUtil'
import DateUtil from '../../utils/DateUtil'
import {StorageHelper} from '../../utils/modStruct'

import NetService from '../../utils/NetService'


//宝宝成长模块 基础成长  答题模块
export default class GrowthView extends Component{
    constructor(props) {
        super(props);
        this.babydata = this.props.navigation.state.params.babyData     //宝宝的属性
        var nowtime = new Date()        //当前时间
        nowtime = nowtime.getTime()
        var oldtime = DateUtil.parserDateString(this.babydata.birthdate)
        oldtime = oldtime.getTime()     //宝宝的省体
        this.month = parseInt ((nowtime - oldtime)/(1000*60*60*24*30))      //获得具体的月份
        this.cid = this.babydata.id
        
        this.code = 12321321321
        this.firstKey = 0       //回去第一道题id
        this.asciiA = 65        //asciiA码A
        this.maxSize = 0;       //题数量最大值
        this.anss = {
            abilityMap:{}       //能力值
        }
        this.state = {
            alldata:{},
            index:0,
            data:null,
            isSelect:false,
            selectArry:[],
            selectOne:-1,
        }
    }

    componentDidMount(){
        //发送消息
        this.showMessage();
    }

    //重写head 函数
    static navigationOptions = ({navigation}) => (
        {
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
            borderColor:'rgb(150,150,150)'
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    //根据本地数据和 服务器数据做对比 然后进行设置题
    asback = (jstr)=>{
        if(jstr){
            console.log(jstr)
            this.anss = jstr.anss
            console.log('this.anss')
            console.log(this.anss)
            var datad = this.state.alldata[jstr.key]
            this.setState({
                data:datad,
                index:jstr.index + 1,
            })
        }else{
            console.log('is not have bbc')
            var ccd = this.state.alldata[this.firstKey]
            this.setState({
                data:ccd,
            })
        }
    }

    //消息返回回调
    qlistBack = (j)=>{
        console.log(j)
        //age
        this.state.alldata = j
        Object.keys(j).forEach(key =>{
            var idd = j[key].sequence
            this.maxSize = this.maxSize>=idd?this.maxSize:idd
              if(j[key].age === null){

              }else{
                this.firstKey = key
              }
        });
        var cc = j[this.firstKey]
        StorageHelper.get(this.cid.toString(),this.asback)


        // {
        //     ass:this.anss,
        //     key:key,
        // }
        

        // console.log('fffffff')
        // console.log('dddddd')
        // var idd = this.firstKey
        // console.log(idd)
        // var A = String.fromCharCode(this.asciiA);
        // console.log(A)
        // console.log('dddddd')
        // var cc = j[idd]
        // console.log(cc)
    }

    //发送消息
    showMessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token,age:this.month};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.qlistBack
        }
    
        var farry = []
        var dataArry = []
        farry.push(NetService.sendsurvey)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }

    //返回判定是否是单选
    getOnelyOneOrMore = ()=>{
        //单选为true
        if(this.state.data.questionType === 'single'){
            return true
        }
        return false
    }

    //返回判断是否找到提
    findItem = (arry,val)=>{
        var l = arry.length
        for(var i = 0;i<l;i++){
            if(arry[i] === val){
                return true
            }
        }
        return false
    }

    //选择按钮点击回调  分辨单选和 复选 放入不同的数组或对象
    selectQback = (i)=>{
        var ii = i
        return ()=>{
            if(this.getOnelyOneOrMore()){
                this.setState({
                    selectOne:ii,
                    isSelect:true
                })
            }else{
                var arry = this.state.selectArry
                if(this.findItem(arry,i)){
                    var index = arry.indexOf(i);
                    if (index > -1) {
                        arry.splice(index, 1);
                    }
                }else{
                    arry.push(i)
                }
                var abc = arry.length === 0 ? false:true
                this.setState({
                    selectArry:arry,
                    isSelect:abc
                })
            }
        }

    }

    //返回下一题按钮是否可以点击
    isGreenOrGrag = (i)=>{
        if(this.getOnelyOneOrMore()){
            return i === this.state.selectOne
        }else{
            return this.findItem(this.state.selectArry,i)
        }
    }

    //显示答案列表
    showAnserlist = ()=>{
        var te = []
        var al = this.state.data.optionList
        var l  = al.length
        for(var i = 0;i<l;i++){
            var st = this.isGreenOrGrag(al[i].id)?styles.cirlGreen:styles.cirlGragref
            te.push(
                <TouchableWithoutFeedback
                    key = {i}
                    onPress = {this.selectQback(al[i].id)}
                >
                <View style = {styles.reviewStyle}>
                    <Text
                        style = {styles.anStyle}
                    >
                        {String.fromCharCode(this.asciiA+i)+': '+al[i].content}
                    </Text>
                    <View style = {[styles.cirlView,st]}></View>
                </View>
                </TouchableWithoutFeedback>
            )
        }
        return te
    }
    //显示题目 
    showQesqi = ()=>{
        if(this.state.data === null){
            return
        }
        var textxz = this.getOnelyOneOrMore()?'(单选)':'(复选)'
        return (
            <View style = {{justifyContent:'center',marginTop:5*SceneUtils.pixelratio}}>
                <View style = {{justifyContent:'center',marginLeft:10*SceneUtils.pixelratio}}>
                    <Text style = {styles.titleStyle}>
                        {'问题'+(this.state.index+1)+' :  '+this.state.data.question+'  '+textxz}
                    </Text>
                </View>
                {this.showAnserlist()}
            </View>
        )
    }

    
    showproSe = ()=>{
        var adsf = 0;
        console.log(this.state.data)
        if(this.state.data){
            adsf=this.state.data.sequence
        }
        var adf = adsf/this.maxSize
        return (
            <View style = {{
                position: 'absolute',
                bottom:SceneUtils.size.height*0.112,
                alignItems:'center',justifyContent:'center',width:SceneUtils.size.width}}>
                <View style ={{width:SceneUtils.size.width,height:4,backgroundColor:'rgb(80,80,80)'}}>
                    <View style ={{width:SceneUtils.size.width*adf,height:4,backgroundColor:'rgb(128,183,34)'}}></View>
                </View>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        var bacolor = this.state.isSelect?'rgb(128,183,34)':'rgb(40,40,40)'
        //backgroundColor:'rgb(128,183,34)',
        return (
            <View style={styles.container}>
                {this.showQesqi()}
                {this.showproSe()}
                <View style={styles.btnView}>
                    
                    <TouchableWithoutFeedback
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.ctouchback()
                        }
                    }>
                    <View style={[styles.btn,{backgroundColor:bacolor}]}>
                        <Text style={styles.btnText}>{'下一题'}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    //下一题按钮回调
    ctouchback = ()=>{
        var id = this.state.data.id

        console.log(this.state.alldata)
        if(this.state.selectOne === -1 && this.state.selectArry.length<=0){
            return
        }

        var dan = null
        var more = null
        //根据单选和复选   作出不同的逻辑判定
        if(this.getOnelyOneOrMore()){
            var ln = this.state.data.optionList.length
            for(var i = 0 ; i<ln ; i++){
                if(this.state.selectOne === this.state.data.optionList[i].id){
                    dan = this.state.data.optionList[i].nextSurveyId
                }
            }
            this.anss.abilityMap[id] = [this.state.selectOne]
            //把答案放入数组
        }else{
            more = this.state.data.nextId
            this.anss.abilityMap[id] = this.state.selectArry
            //答案放入对象
        }
        //是否还有下一题
        var nextid = dan | more
        if(dan !== null || more !== null){
            if(nextid in this.state.alldata){
                var key = nextid
                var datad = this.state.alldata[key]
                StorageHelper.save(this.cid.toString(),{
                    anss:this.anss,
                    key:key,
                    index:this.state.index
                })
                this.setState({
                    data:datad,
                    selectArry:[],
                    selectOne:-1,
                    index:this.state.index+1,
                    isSelect:false
                })
            }
        }else{
            this.pushMessageAddAbility()
        }
    }

    //跳转到 基础成长完成界面
    abilibtback = (j)=>{
        StorageHelper.delete(this.cid.toString())
        var acb = DataUtil.getinstance().getMainFamliy()
        var l = acb.main.children.length
        var name = 1
        var code = acb.main.invitationCode
        var date = 0
        for(var i = 0;i<l;i++){
            if(acb.main.children[i].id === this.cid){
                name = acb.main.children[i].nickname
                date = acb.main.children[i].birthdate
                acb.main.children[i].ability = j
                acb.main.children[i].surveyDone = true
            }
        }
        DataUtil.getinstance().setMainFamliy(acb)
        const { navigate } = this.props.navigation;
        navigate('GrowthComplete',{info:j,nickname:name,code:code,date:date})
        DeviceEventEmitter.emit('baby');
    }

    //发送消息 答题完成
    pushMessageAddAbility = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var an = this.anss
        var mod = {
            url:'/maria/account/family/main/children/'+ this.cid +'/services/baseAbilities',
            params:params,
            params1:an,
            headers:['application/json','application/json'],
            callback:this.abilibtback
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendsurveyPost)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },

    titleStyle:{
        fontSize:16,
        fontWeight:'600',
        color:'white'
    },
    anStyle:{
        fontSize:15,
        width:SceneUtils.size.width*0.6,
        color:'white'
    },

    reviewStyle:{
        marginLeft:10*SceneUtils.pixelratio,
        marginTop:20,
        flexDirection:'row',
        width:SceneUtils.size.width,
    },
    cirlGreen:{
        backgroundColor:'rgb(134,184,34)'
    },
    cirlGragref:{
        backgroundColor:'rgb(230,230,230)'
    },
    cirlView:{
        marginLeft:80,
        width:24,
        height:24,
        borderRadius:12,
        borderWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    btnView:{
        alignSelf:'center',
        height:SceneUtils.size.height*0.1,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'900',
    },
    


});