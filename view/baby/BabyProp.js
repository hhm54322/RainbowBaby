'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'
import DateUtil from '../../utils/DateUtil'
import RadarChart from '../../utils/RadarChart'

import NetService from '../../utils/NetService'

import {BoxShadow} from 'react-native-shadow'

var datas = [
    {
        id:0,       //id号码
        headshot:'',        //头像链接
        nickname:'',        //昵称
        gender:0,           //性别
        birthdate:0,        //出生日期
        createTime:0,       //创建时间
        abilityArt:100,
        abilityDictation:100,
        abilityMath:100,
        abilityCreativity:100,
        abilityOperation:100,           //5种能力属性值   现在已经废弃 在配置接口里面可以看到
        notebookBackground:'',          //手账的背景
        surveyDone:false,               //是否完成基础训练         
        removed:0,//宝宝状态（0：未删除、1：待删除、2：已删除）
        removeApplicationId:0,                 //删除的ApplicationId
        removeUserId:0,                        //删除userid
        removePermission:0,
        state:0,//0正常,1编辑状态
        delBaby:false,                  //是否是删除的状态
    }
]

//宝宝编辑框的状态页面显示 雷达图等
export default class BabyProp extends Component {
    constructor(props) {
        super(props);
        this.scrollView;
        //配置里面拿去5种能力最大值
        this.max =  JSON.parse(DataUtil.getinstance().getabilityMaxNumber())
        //家庭列表
        this.famliyList = DataUtil.getinstance().getMainFamliy();
        //从家庭列表里面拿取
        if(this.famliyList && this.famliyList.main.children.length>0){
            datas = this.famliyList.main.children;
            for(var i = 0;i<datas.length;i++){
                datas[i].state = 0;
                datas[i].delBaby = false;
            }
        }
        this.state = {
            currentPage:0,
            datas:datas,
        };
    }
    componentDidMount(){

        //添加监听  当数据改变的时候刷新界面
        this.subscription = DeviceEventEmitter.addListener('baby', ()=>{
            datas = []
            this.famliyList = DataUtil.getinstance().getMainFamliy();
            if(this.famliyList && this.famliyList.main.children.length>0){
                datas = this.famliyList.main.children;
                for(var i = 0;i<datas.length;i++){
                    datas[i].state = 0;
                    datas[i].delBaby = false;
                }
            }
            this.setState({
                isRef:!this.state.isRef,
                datas:datas,
            })
        });
        
    }
        
        
        
    componentWillUnmount(){
        //监听的移除
        this.subscription.remove();
        
    }

    //计算并返回宝宝天数
    gettrainTime(time){
        var now = new Date().getTime();
        var td = DateUtil.parserDateString(time).getTime();
        var ct = now - td;
        ct = ct/1000/60/60/24;
        return parseInt(ct)+'天';
    }


    //计算返回宝宝的生日
    getBirthDay(time){
        var now = DateUtil.parserDateString(time)
        var bt = now.getFullYear() + '-' + (now.getMonth()+1) + '-' +now.getDate()
        return bt
    }

    //计算返回宝宝的age
    getage(time){
        var now = new Date().getTime()
        var td = DateUtil.parserDateString(time).getTime()
        var ct = new Date(now - td)
        var dayd = (now - td)/(1000*60*60*24)
        return parseInt(dayd) 
        // if(ct.getFullYear() - 1970>0){
        //     return ct.getFullYear()-1970+'岁'
        // }else{
        //     return (ct.getMonth()+1)+'个月'
        // }
    }
    // 分页指示器
    renderPagingIndicator() {
        var itemAry = [,], autoColor;
        for (var i = 0; i<this.state.datas.length ; i++) {
            // 跟随当前页改变对应 点 的颜色
            autoColor = (this.state.currentPage === i) ? {backgroundColor:'rgb(134,184,34)'} : {backgroundColor:'white'}
            // 将子视图放进 itemAry
            itemAry.push(
                // 实例化视图
                <View key={i} style={[{height:11,width:11,borderColor:'rgb(193,196,214)',
                borderWidth:1,borderRadius:5.5,marginLeft:6,marginRight:6,
            }, autoColor]}></View>
            )
        }
        // 返回数组
        return itemAry;
    };


    //删除宝宝刷新
    _onDelBaby(){
        if(!this.state.datas[this.state.currentPage].delBaby){
            datas[this.state.currentPage].delBaby = true;
            this.setState({
                datas : datas
            })
        }
    }

    //设置按钮等相关
    setupBtn(index){
        if(this.state.currentPage == index){
            return(
                <View style={styles.setUpView}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            datas[this.state.currentPage].state = 1;
                            this.setState({
                                datas : datas
                            })
                        }}>
                        <Image style={styles.setUpIcon} source={require('./img/lefttop.png')} />
                    </TouchableOpacity> 
                </View>
            )
        }
    }
    //遮罩层组件
    returnMaskView(index){
        var data = this.state.datas[index];
        if(data.delBaby){
            return(
                <View style={styles.maskView}>
                    <View style={styles.mBackgroundView}>
                        <Text style={styles.mBackgroundText}>您(ID{DataUtil.getinstance().getAccont().id})</Text>
                        <Text style={styles.mBackgroundText}>发起了删除{data.nickname}宝宝</Text>
                        <Text style={styles.mBackgroundText}>是否确认删除?</Text>
                    </View>

                    <View style={styles.btnView}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.btn2,{borderColor:'rgb(150,150,150)'}]}
                                    onPress={() => {
                                        datas[this.state.currentPage].delBaby = false;
                                        datas[this.state.currentPage].state = 0;
                                        this.setState({
                                            datas : datas
                                        })
                                    }
                                }>
                                    <Text style={styles.btnText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.btn2,{borderColor:'rgb(134,184,34)'}]}
                                    onPress={() => {
                                        this.sendDelBabyMsg();
                                    }
                                }>
                                    <Text style={styles.btnText}>确认</Text>
                                </TouchableOpacity>
                            </View>
                </View>
            )
        }else if(data.state === 1){
            return(
                <View style={styles.maskView}>
                    <View style={styles.editView}>
                        <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.btn3,{backgroundColor:'#7FBA00'}]}
                                onPress={() => {
                                    this.props.onBabyEditClick(this.state.datas[this.state.currentPage]);
                                    //宝宝编辑界面
                                }
                            }>
                            <Text style={styles.btnText}>编辑资料</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.delView}>
                        <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.btn3,{backgroundColor:'#FD6E6E'}]}
                                onPress={() => {
                                    this._onDelBaby();
                                    //删除宝宝界面
                                }
                            }>
                            <Text style={styles.btnText}>删除宝宝</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else if(data.removed === 1){
            var name = ' '+data.nickname+' '
            if(data.removeUserId == DataUtil.getinstance().getAccont().id){
                return(
                    <View style={styles.maskView}>
                        <View style={styles.mBackgroundView}>
                            <Text style={styles.mBackgroundText}>您(ID{DataUtil.getinstance().getAccont().id})</Text>
                            <Text style={styles.mBackgroundText}>已确认删除{name}宝宝</Text>
                            <Text style={styles.mBackgroundText}>等待{data.removePermission == 0 ? '妈妈' : '爸爸'}确认</Text>
                        </View>
                    </View> 
                )
            }else{
                return(
                    <View style={styles.maskView}>
                        <View style={styles.mBackgroundView}>
                            <Text style={styles.mBackgroundText}>宝宝的{data.removePermission == 0 ? '爸爸' : '妈妈'}(ID{data.removeUserId})</Text>
                            <Text style={styles.mBackgroundText}>发起了
                            {<Text style = {{color:'red'}}>{'删除'}</Text>}
                            {<Text style = {{color:'rgb(95,198,235)',marginBottom:10}}>{name}</Text>}
                            宝宝
                            </Text>
                            <Text style={[styles.mBackgroundText,{marginTop:20}]}>需要得到您的同意</Text>
                            <Text style={styles.mBackgroundText}>才可以删除宝宝</Text>

                            <View style={styles.btnView}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.btn2,{borderColor:'rgb(150,150,150)'}]}
                                    onPress={() => {
                                        this.sendApplicationMsg(0);
                                        // datas[this.state.currentPage].state = 0;
                                        // this.setState({
                                        //     datas : datas
                                        // })
                                    }
                                }>
                                    <Text style={styles.btnText}>拒绝</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.btn2,{borderColor:'rgb(134,184,34)'}]}
                                    onPress={() => {
                                        this.sendApplicationMsg(1);
                                        // datas[this.state.currentPage].state = 4;
                                        // this.setState({
                                        //     datas : datas
                                        // })
                                    }
                                }>
                                    <Text style={styles.btnText}>同意</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                )
            }
        }else if(data.removed === 2){
            return(
                <View style={styles.maskView}>
                    <View style={styles.mBackgroundView}>
                        <Text style={styles.mBackgroundText}>您的宝宝 ({data.nickname})</Text>
                        <Text style={styles.mBackgroundText}>已经被确认删除，</Text>
                        <Text style={styles.mBackgroundText}>为了您的信息安全，</Text>
                        <Text style={styles.mBackgroundText}>我们将会在3天后进行彻底删除</Text>
                    </View>
                </View> 
            )
        }else{
            return null;
        }
    }
    setDownButton(){
        if(this.state.currentPage == this.state.datas.length){
            return(
                <View style={styles.btnView}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btn,{backgroundColor:'#7FBA00'}]}
                        onPress={() => {
                            if(this.state.datas.length == this.state.currentPage){
                                this.props.onBabyAddBtnClick();
                            }
                        }
                    }>
                        <Text style={styles.btnText}>添加宝宝</Text>
                    </TouchableOpacity>
                </View>
            );
        }else if(this.state.datas[this.state.currentPage].delBaby){
            return
            return(
                <View style={styles.btnView}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btn2,{backgroundColor:'#515252'}]}
                        onPress={() => {
                            datas[this.state.currentPage].delBaby = false;
                            datas[this.state.currentPage].state = 0;
                            this.setState({
                                datas : datas
                            })
                        }
                    }>
                        <Text style={styles.btnText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btn2,{backgroundColor:'#7FBA00'}]}
                        onPress={() => {
                            this.sendDelBabyMsg();
                        }
                    }>
                        <Text style={styles.btnText}>确认</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(this.state.datas[this.state.currentPage].state === 1){
            return(
                <View style={styles.btnView}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btn,{backgroundColor:'#515252'}]}
                        onPress={() => {
                            datas[this.state.currentPage].state = 0;
                            this.setState({
                                datas : datas
                            })
                        }
                    }>
                        <Text style={styles.btnText}>返回</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(this.state.datas[this.state.currentPage].removed === 0){
            return(
                <View style={styles.btnView}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.btn,{backgroundColor:'#515252'}]}
                        onPress={() => {
                            if(this.state.datas[this.state.currentPage].surveyDone){
                                this.props.onBabyDownBtnClick(0,this.state.datas[this.state.currentPage]);
                            }else{
                                this.props.onBabyDownBtnClick(1,this.state.datas[this.state.currentPage]);
                            }
                        }
                    }>
                        <Text style={styles.btnText}>{this.state.datas[this.state.currentPage].surveyDone ? '前往训练' : '完成基础成长'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(this.state.datas[this.state.currentPage].removed === 1){
            if(this.state.datas[this.state.currentPage].removeUserId != DataUtil.getinstance().getAccont().id){
                return(null
                    // <View style={styles.btnView}>
                    //     <TouchableOpacity
                    //         activeOpacity={1}
                    //         style={[styles.btn2,{backgroundColor:'#515252'}]}
                    //         onPress={() => {
                    //             this.sendApplicationMsg(0);
                    //             // datas[this.state.currentPage].state = 0;
                    //             // this.setState({
                    //             //     datas : datas
                    //             // })
                    //         }
                    //     }>
                    //         <Text style={styles.btnText}>拒绝</Text>
                    //     </TouchableOpacity>
                    //     <TouchableOpacity
                    //         activeOpacity={1}
                    //         style={[styles.btn2,{backgroundColor:'#7FBA00'}]}
                    //         onPress={() => {
                    //             this.sendApplicationMsg(1);
                    //             // datas[this.state.currentPage].state = 4;
                    //             // this.setState({
                    //             //     datas : datas
                    //             // })
                    //         }
                    //     }>
                    //         <Text style={styles.btnText}>同意</Text>
                    //     </TouchableOpacity>
                    // </View>
                )
            }
        }
    }

    //显示在未完成基础成长的情况下显示的提示文字
    setNoticeView(){
        if(this.state.currentPage < this.state.datas.length
             && this.state.datas[this.state.currentPage].removed == 0
             && this.state.datas[this.state.currentPage].state == 0 
             && !this.state.datas[this.state.currentPage].surveyDone){
            return(
                <View style={styles.noticeView}>
                    <Text style={styles.noticeText}>完成基础成长，让宝宝获得准确的训练值，还将免费体验7天会员</Text>
                </View>
            )
        }else{
            return(
                <View style={styles.noticeView}>
                </View>
            )
        }
    }


    //雷达图相关的
    mpropBabymaxArry2 = (i)=>{
        var year = parseInt(this.getage(this.state.datas[i].birthdate)/365) 
        year = year>5?5:year;
        var tempmax = []
        var tempvale = []
        var blity = this.state.datas[i].ability
        var nickname = this.state.datas[i].nickname
        var l = blity.length
        for(var i = 0;i<l ;i++){
            tempvale.push(blity[i].abilityValue)
            tempmax.push({
                text:blity[i].abilityName,
                max:this.max[year],
            })
        }
        var adc = {max:tempmax,objNum:[{name:nickname,value:tempvale}]}
        //var babymessage
        return adc
    }



    //返回雷达图的数据对象  a 最大值，b当前值
    mpropBabymaxArry = (i)=>{

        var tempmax = []
        var tempvale = []
        var blity = this.state.datas[i].ability
        var nickname = this.state.datas[i].nickname
        var l = blity.length
        for(var i = 0;i<l ;i++){
            tempvale.push(blity[i].abilityValue)
            tempmax.push({
                text:blity[i].abilityName,
                max:this.max,
            })
        }
        var adc = {a:tempmax,b:tempvale}
        //var babymessage
        return adc
    }
    
    //雷达图显示内容
    renderScrollViewChild(){
        var allChild = [];
        var length = this.state.datas.length;
        for(var i = 0;i < length;i++){
            var a = this.mpropBabymaxArry(i)
            var obj = this.mpropBabymaxArry2(i)

            var option2 = {
                title: {
                    text: ''
                },
                //backgroundColor: "rgba(51,51,51,0)",
                //color: ["#fd6e6e", "#58c7f1"],
                color: ["#58c7f1"],
                tooltip : {
                    trigger: 'axis'
                },
                //				legend: {
                //					data: ['小孩1', '小孩2']
                //				},
                radar: {
                    nameGap: 5, // 图中工艺等字距离图的距离
                    center: ['50%', '50%'], // 图的位置
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: 'rgb(230,230,230)',
                            //borderRadius: 3,
                            padding: [3, 5],
                            fontSize: 16
                        }
                    },
                    indicator: obj.max,
                    axisLine: { // 坐标轴线
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: 'rgb(100,100,100)'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(255,255,255,0)"]
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: 'rgb(100,100,100)'
                        }
                    }
                },
                series: [{
                    name: '',
                    type: 'radar',
                    symbol: 'circle', // 去掉图表中各个图区域的边框线拐点
                    symbolSize:2,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                opacity: 1,
                                shadowBlur: 30,
                                shadowColor: '#50e470',
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        }
                    },
                    data: obj.objNum
                }]
            };


            const option = {
                //点击某一个点的数据的时候，显示出悬浮窗
                tooltip : {
                    trigger: 'axis'
                },
                // 隐藏图例
                legend: {enabled: false },
                calculable : true,
                polar : [
                    {
                        nameGap : 5, // 图中艺术等字距离图的距离
                        center:['50%','50%'], // 图的位置
                        name:{
                           show: true, // 是否显示艺术等文字
                           formatter: null, // 艺术等文字的显示形式
                           textStyle: {
                                color:'#000000',
                                fontSize: 16,
                           }
                         },
                        indicator : a.a,
                        axisLine: {            // 坐标轴线
                            show: false        // 默认显示，属性show控制显示与否
                        },
                        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                            show: false,
                            textStyle: {      
                                color: '#247bd7' // 坐标轴刻度文字的样式
                            }
                        },
                        splitArea : {
                            show : true,   
                            areaStyle : {
                                color: '#EEEEEE',  // 图表背景网格的颜色
                                
                            }
                        },
                        splitLine : {
                            show : true,
                            lineStyle : {
                                width : 2,
                                color : '#ffffff' // 图表背景网格线的颜色
                            }
                        }
                    }
                ],
                series : [
                    {
                        type: 'radar',
                        symbol: "none", // 去掉图表中各个图区域的边框线拐点
                        itemStyle: {
                            normal: {
                                color : '#9E9E9E', // 图表中各个图区域的边框线拐点颜色
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data : [
                            {
                                value : a.b,
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: 'default',
                                            opacity: 0.5,
                                            color: '#0000CD', // 图表中各个图区域的颜色
                                        },
                                        lineStyle: {
                                            width : 2.5,
                                            color:'#0000CD' // 图表中各个图区域的边框线颜色
                                        },
                                    }
                                },
                            }
                        ]
                    }
                ]
            };
            const shadowOpt = {
                width:SceneUtils.size.width*0.63,
                height:SceneUtils.size.height*0.468,
                color:"#86B822",
                border:7,
                radius:4,
                opacity:0.2,
                x:0,
                y:0,
                //style:{marginVertical :3}
            }
            allChild.push(
                    <View key={i} style={i == 0 ? styles.scrollChildFirstView : styles.scrollChildView}>
                        <View style = {{justifyContent: 'center',
                        alignItems: 'center',marginTop:10,}}>
                            <BoxShadow key = {i} setting={shadowOpt}>
                            <View style = {{width:SceneUtils.size.width*0.63,height:SceneUtils.size.height*0.468,borderRadius:4,
                            //justifyContent: 'center',  
                            alignItems:'center',  
                            backgroundColor:'rgb(51,51,51)'
                            }}>
                                
                                <View style={styles.echartView}>
                                    {/* <Echarts option={option} height={SceneUtils.size.width * 0.63 * 0.8} width={SceneUtils.size.width*0.63}/> */}
                                    <RadarChart obj = {option2}></RadarChart>
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.textTxtLeft}> 小名 : </Text>
                                    <View style = {styles.rightView}>
                                        <Text style={styles.textTxt}>{this.state.datas[i].nickname}</Text>
                                    </View>
                                    
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.textTxtLeft}> 年龄 : </Text>
                                    <View style = {styles.rightView}>
                                        <Text style={styles.textTxt}>{this.getage(this.state.datas[i].birthdate)+ '天'}</Text>
                                    </View>
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.textTxtLeft}> 训练天数 : </Text>
                                    <View style = {styles.rightView}>
                                        <Text style={styles.textTxt}>{this.gettrainTime(this.state.datas[i].createTime)}</Text>
                                    </View>
                                </View>
                                {this.setupBtn(i)}
                                {this.returnMaskView(i)}
                            </View>
                            </BoxShadow>

                        </View>
                        
                    </View>
                
                
            );
        }
        // allChild.push(
        //     <View key={length} style={length == 0 ? styles.scrollChildFirstView : styles.scrollChildView}>
        //         <ImageBackground source = {require('./img/babypropbg.png')} style = {styles.backgroundImage}>
        //             <Image source = {require('./img/babyheadbg.png')} style={styles.addBabyImg}></Image>
        //         </ImageBackground>
        //     </View>
        // );
        return allChild;
    }
    //滑动结束的回调
    onScrollEndDrag(e){
        var scrollWidth = SceneUtils.size.width * 0.7;
        var index = parseInt(e.nativeEvent.contentOffset.x / scrollWidth);
        var velocity = e.nativeEvent.velocity.x;
        if(index < this.state.datas.length){
            if(velocity > 0 || (velocity == 0 && e.nativeEvent.contentOffset.x % scrollWidth > scrollWidth / 2)){
                index++;
            }
        }
        this.scrollView.scrollTo({x:index * scrollWidth});
        if(this.state.currentPage != index){
            this.setState({
                currentPage:index
            });
        }
    }
    //------------------------------消息------------------------------
    //主动删除宝宝
    sendDelBabyMsg() {
        var babyID = this.state.datas[this.state.currentPage].id;
        var token = DataUtil.getinstance().getUserData().access_token;
        let params = {'access_token':token};
        let params1 = {'applicationType':1,'childId':babyID};
        var mod = {
            params:params,
            params1:params1,
            headers:['application/json','application/json'],
            callback:this.delBabyMsgBack
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.senddeleteApplications)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)
    }
    //主动删除宝宝返回
    delBabyMsgBack = (responseJson)=>{
        var page = this.state.currentPage;
        if(responseJson.status == 0){
            datas.splice(page,1);
            if(page > 0){
                page--;
            }
        }else{
            datas[page].removed = 1;
            datas[page].removeUserId = DataUtil.getinstance().getAccont().id;
            datas[page].removePermission = DataUtil.getinstance().getAccont().gender;
            datas[page].delBaby = false;
        }
        this.setState({
            datas : datas,
            currentPage:page
        })
    }
    //被动删除宝宝（审核）
    sendApplicationMsg(value){
        var page = this.state.currentPage;
        var id = this.state.datas[page].removeApplicationId;
        var token = DataUtil.getinstance().getUserData().access_token;
        let params = {'access_token':token};
        let params1 = {'audit':value};
        var mod = {
            type:'patch',
            url:'/maria/account/family/main/applications/'+id,
            params:params,
            params1:params1,
            headers:['application/json','application/json'],
            callback:null
        }

        var farry = []
        var dataArry = []
        farry.push(NetService.sendqdeleteApplications)
        dataArry.push(mod)
    
        NetService.doArry(farry,dataArry)

        if(value == 0){
            datas[page].removed = 0;
            datas[page].removeApplicationId = 0;
            datas[page].removeUserId = 0;
            datas[page].removePermission = 0;
        }else{
            datas[page].removed = 2;
        }
        this.setState({
            datas : datas,
        })
    }
    //---------------------------------------------------------------
    onMomentumScrollEndt = (e)=>{
        var scrollWidth = SceneUtils.size.width;
        var index = parseInt(e.nativeEvent.contentOffset.x / scrollWidth);

        if(this.state.currentPage != index){
            this.setState({
                currentPage:index
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={ ref => this.scrollView = ref}
                    //onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                    horizontal = {true}
                    pagingEnabled = {true}
                    showsHorizontalScrollIndicator = {false}
                    onMomentumScrollEnd = {this.onMomentumScrollEndt}
                    >
                        {this.renderScrollViewChild()}
                </ScrollView>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.pagingIndicatorStyle}>
                        {this.renderPagingIndicator()}
                    </View>
                </View>
                {this.setDownButton()}
                {this.setNoticeView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.height*0.62,
        alignItems:'center',
        justifyContent:'center'
    },
    backgroundImage: {
        width:SceneUtils.size.width * 0.63,
        height:SceneUtils.size.width * 0.63 * 1.4,
    },
    topView:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    starView:{
        flexDirection:'column',
    },
    starImage:{
        width:40,
        height:20,
        resizeMode:'contain',
    },
    starText:{
        fontSize: 12,
        fontWeight: '900',
        marginVertical:2,
    },
    sexImage:{
        width:35,
        height:35,
        resizeMode:'contain',
        marginTop:2,
        marginRight:2,
    },
    arrowLeftImage:{
        width:SceneUtils.size.width * 0.55 * 1.4 * 0.25 * 0.4,
        height:SceneUtils.size.width * 0.55 * 1.4 * 0.25,
        resizeMode:'contain',
    },
    arrowRightImage:{
        width:SceneUtils.size.width * 0.55 * 1.4 * 0.25 * 0.4,
        height:SceneUtils.size.width * 0.55 * 1.4 * 0.25,
        resizeMode:'contain',
        transform: [{rotateZ:'180deg'}]
    },
    echartView:{
        marginTop:10,
        height:SceneUtils.size.width * 0.63 * 0.8,
        width:SceneUtils.size.width*0.63,
    },
    textView:{
        flexDirection: 'row',
        width:SceneUtils.size.width * 0.63 * 0.85,
        height:SceneUtils.size.width * 0.07,
        marginTop:10,
    },
    rightView:{
        flex:1,
        borderRadius:3,
        backgroundColor:'rgb(216,216,216)',
        justifyContent:'center'
    },
    textTxtLeft:{
        fontSize:16,
        color:'rgb(130,130,130)'
    },
    textTxt:{
        fontSize:16,
    },
    setUpView:{
        position:'absolute',
        justifyContent:'center',
        width:35,
        height:35,
        alignSelf:'flex-end',
    },
    setUpIcon:{
        width:20,
        height:18,
        tintColor:'rgb(200,200,200)',
    },
    pagingIndicatorStyle: {
        width:SceneUtils.size.width,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:6,
    },
    maskView:{
        backgroundColor:'rgba(81,82,82,0.7)',
        width:SceneUtils.size.width*0.63,
        height:SceneUtils.size.height*0.468,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
    },
    mBackgroundView:{
        backgroundColor:'rgb(30,30,30)',
        width:SceneUtils.size.width * 0.63 * 0.96,
        height:SceneUtils.size.width * 0.63 * 0.96 * 0.9,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
    },
    mBackgroundText:{
        fontSize:16,
        lineHeight:22,
        color:'white'
    },
    editView:{
        marginTop:SceneUtils.size.width * 0.63 * 0.96 * 0.7,
    },
    delView:{
        marginTop:20,
    },
    backSetUpIcon:{
        width:25,
        height:25,
        resizeMode:'contain',
    },
    btnView:{
        flexDirection:'row',
        marginTop:10,
    },
    btn: {
        width:SceneUtils.size.width * 0.4,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
    },
    btn2: {
        width:SceneUtils.size.width * 0.18,
        height:27,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginLeft:14,
        marginRight:14,
    },
    btn3: {
        width:SceneUtils.size.width * 0.63 * 0.7,
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
    },
    btnText:{
        fontSize:20,
        color:'white',
        fontWeight:'900'
    },

    scrollChildView:{
        width:SceneUtils.size.width ,//* 0.7,
        justifyContent: 'center',  
        alignItems:'center',  
    },
    scrollChildFirstView:{
        width:SceneUtils.size.width ,//* 0.7,
        justifyContent: 'center',  
        alignItems:'center',  
        //marginLeft:SceneUtils.size.width * 0.15,
    },
    noticeView:{
        width:SceneUtils.size.width,
        height:20,
        justifyContent: 'center',  
        alignItems:'center',  
        marginTop:5,
    },
    noticeText:{
        fontSize:10,
        color:'rgb(200,200,200)',
    },
    addBabyImg:{
        width:SceneUtils.size.width * 0.63 * 0.43,
        height:SceneUtils.size.width * 0.63 * 0.43 * 0.75,
        marginTop:80,
    }
});