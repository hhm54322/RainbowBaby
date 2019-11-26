'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import ContList from './ContList'
import SceneUtils from '../../utils/SceneUtils';
import TrainDetail from './TrainDetail';
import DataUtil from '../../utils/DataUtil'
import DateUtil from '../../utils/DateUtil'
import RadarChart from '../../utils/RadarChart'


import NetService from '../../utils/NetService'


//成长训练主界面
export default class TrainMainView extends Component {
    constructor(props) {
        super(props);
        this.baby = this.props.navigation.state.params.user     //宝宝的对象
        console.log(this.baby)
        this.user = this.baby.nickname              //宝宝名字
        this.max =  JSON.parse(DataUtil.getinstance().getabilityMaxNumber())
            //能力最大值
        var nowtime = new Date()
        nowtime = nowtime.getTime()         //现在的时间
        var oldtime = DateUtil.parserDateString(this.baby.birthdate)        
        oldtime = oldtime.getTime()             //宝宝的生日时间对象
        this.month = parseInt ((nowtime - oldtime)/(1000*60*60*24*30))
        this.year = parseInt(this.month/12)
        this.year = this.year>5?5:this.year         //计算出宝宝的年岁
        this.valueArryother = []                    //其他的能力值
        this.allbility = []                         //所有的能力值
        this.valueArry = []                         //所有的能力值数值
        this.otherdata =[]                             //其他数据
        this.obj = null                             //obg
        this.state = {
            boold:false,
            day:99,
            datas:[
                {content:'通过【老克勒棋牌】获得数学成长+2',time:'15:45'},          //暂时废弃
                {content:'通过【老克勒棋牌】获得数学成长+2',time:'3小时前'},
                {content:'通过【老克勒棋牌】获得数学成长+2',time:'8小时前'},
            ]
        };
    }

    //获取到同年龄 其他宝宝的中和数值
    getothermessage = (j)=>{
        console.log(j)
        this.otherdata = j
        this.setMaxVaule()
    }

    //发送和自己宝宝同年龄的能力值消息
    putmessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {age:this.month,access_token:token};
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.getothermessage(responseJson)
            }
        }
        NetService.do(NetService.sendchild,mod)
    }

    componentDidMount(){
        this.putmessage()
    }
    

    //得到其他  自己  所有的能力值的数据对象
    //用来给雷达图做显示用
    setMaxVaule = ()=>{
        var l = this.baby.ability.length
        for(var i=0;i<l;i++){
            this.valueArryother.push(this.otherdata[i].abilityValue)
            this.valueArry.push(this.baby.ability[i].abilityValue)
            this.allbility.push({
                text:this.baby.ability[i].abilityName,
                max:this.max[this.year],
            })
        }

        this.obj = {max:this.allbility,objNum:[{name:'其他',value:this.valueArryother},{name:this.user,value:this.valueArry}]}

        this.setState({
            boold:!this.state.boold
        })

        if(this.tradte){
            // valueArryother = {this.valueArryother}
            // allbility = {this.allbility}
            // valueArry = {this.valueArry}
            this.tradte.refshow(this.valueArryother,this.allbility,this.valueArry,this.year)
        }

        

    }
    
    //重写head函数
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号 
    //   title: `Chat with ${navigation.state.params.user}`,
        title:navigation.state.params.user.nickname,
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    //跳转到训练宝宝界面
    _onTrainDetailBtnClick(index,value,name){
        const { navigate } = this.props.navigation;
        if(value === 0){
            navigate('TrainRecommend',{ baby: this.baby,user:this.baby.nickname })
        }else if(value === 1){

        }
    }

    //显示宝宝头像等相关内容
    setHandData(){
        if(true){
            var allChild = [];
            var length = this.state.datas.length;
            for(var i = 0;i < length;i++){
                allChild.push(
                    <View key={i} style={styles.childView}>
                        <Text>{this.state.datas[i].content}</Text>
                        <Text>{this.state.datas[i].time}</Text>
                    </View>
                );
            }
            return allChild;
        }else{
            return null;
        }
    }


    //显示雷达图等
    showTopViewd = ()=>{
        if(this.obj === null){
            return
        }

        //显示雷达图所需要的参数
        var option = {
            title: {
                text: ''
            },
            //backgroundColor: "rgba(51,51,51,0)",
            color: ["#fd6e6e", "#58c7f1"],
            //color: ["#58c7f1"],
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
                        fontSize: 18
                    }
                },
                indicator: this.obj.max,
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
                symbol: 'none', // 去掉图表中各个图区域的边框线拐点
                //symbolSize:2,
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
                data: this.obj.objNum
            }]
        };

        const { navigate } = this.props.navigation;
        //显示宝宝的头像
        var req = null
            if(this.baby.headshot === ''   ||  this.baby.headshot === null){
                req = this.baby.gender === 0 ? require('../../utils/img/nnn.png'):require('../../utils/img/nvnv.png')
            }
        return (<View style={[styles.topView]}>
            <View style={styles.echartView}>
                {/* <Echarts option={option} height={SceneUtils.size.width * 0.7} width={SceneUtils.size.width*0.9}/> */}
                <RadarChart obj = {option}></RadarChart>
            </View>
            {/* <View style = {styles.topTextView}>
                <View style ={[styles.bgViw,{backgroundColor:'rgb(95,198,235)'}]}>
                    <Text 
                    numberOfLines = {1}
                    style = {styles.ntTextStyle}> {this.user}</Text>
                </View>
                <View style ={[styles.bgViw,{backgroundColor:'rgb(236,69,76)'}]}>
                <Text style = {styles.ntTextStyle}> {'同龄宝宝'}</Text>
                </View>
            </View> */}
            <Image source = {req === null? {uri:(this.baby.headshot)} :req} style = {styles.headIcon}></Image>
        </View>)
        
    }

    //显示分割线
    showLined = ()=>{
        return (<View style = {{width:SceneUtils.size.width*0.92,
            borderTopWidth:1,borderColor:'rgb(100,100,100)',
            marginLeft:SceneUtils.size.width*0.04,
        }}></View>)
    }

    //显示宝宝的数据详情
    showDownView = ()=>{
        return (<View style={styles.downView}>
            <View style={styles.downTopView}>
                <View style={styles.downTopTitleView}>
                    <Text style={styles.downTopTitleText}>宝宝详情</Text>
                </View>
                <TrainDetail 
                    ref = {ref=>this.tradte=ref}
                    valueArryother = {this.valueArryother}
                    allbility = {this.allbility}
                    valueArry = {this.valueArry}
                    onBtnClick={(index, value, name) =>this._onTrainDetailBtnClick(index, value, name)}/>
            </View>

            <View style = {{width:SceneUtils.size.width*0.92,
                //borderTopWidth:1,borderColor:'rgb(100,100,100)',
                marginLeft:SceneUtils.size.width*0.04,marginTop:5,
            }}></View>

            {/* <View style={styles.downCenterView}>
                <View style={[styles.downTopTitleView]}>
                    <Text style={styles.downTopTitleText}>手帐动态</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            //跳转手帐界面
                        }
                    }>
                        <Text style={styles.downCenterTitleText}>更多</Text>
                    </TouchableOpacity>
                </View>
                {/* {this.setHandData()} }
                <ContList id = {this.user}></ContList>
            </View> */}
        </View>)
    }

    render() {
        

        return (
            <View style={styles.container}>

                <View style = {styles.scrollViewStyle}>
                    <ScrollView 
                        showsVerticalScrollIndicator = {false}>
                        {this.showTopViewd()}
                        {this.showLined()}
                        {this.showDownView()}
                    </ScrollView>
                </View>
                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            //this.pushmessge()
                            this._onTrainDetailBtnClick(0,0,0)
                        }
                    }>
                    <View style={styles.btnCenterView}>
                        <Text style={styles.textBtnSty}>{'开始训练'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgb(51,51,51)',
    },
    scrollViewStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.8,
    },
    topView:{
    },
    topTextView:{
        justifyContent:'center',
        position:'absolute',
        bottom:10,
        right:10,
    },
    bgViw:{
        width:50,
        height:20,
        marginTop:6,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
    },
    ntTextStyle:{
        color:'white',
        fontSize:10,
        width:50,
        textAlign: 'center',
    },

    downView:{
        marginTop:3,
    },
    downTopView:{
    },
    downTopTitleView:{
        flexDirection:'row',
        marginLeft:5,
        marginTop:5,
        paddingTop:4,
        paddingBottom:4,
        alignItems:'center'
    },
    downTopTitleText:{
        fontSize:14,
        marginLeft:10,
        color:'rgb(230,230,230)'
    },
    downCenterView:{
        flex:1,
    },
    downCenterTitleView:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor: '#d6d7da',
        marginHorizontal:5,
        marginTop:5,
    },
    downCenterTitleText:{
        fontSize:16,
        marginLeft:SceneUtils.size.width*0.65,
        color:'rgb(134,183,34)'
    },
    textBtnSty:{
        color:'white',
        fontWeight:'700',
        fontSize:23
    },
    downDownView:{
        
    },
    headIcon:{
        width:SceneUtils.size.width * 0.15,
        height:SceneUtils.size.width * 0.15,
        position:'absolute',
        top:10,
        left:10,
        borderRadius:SceneUtils.size.width * 0.15/2,
    },
    echartView:{
        marginTop:6,
        alignSelf:'center',
        marginBottom:SceneUtils.size.height*0.05,
        height:SceneUtils.size.width * 0.7,
        width:SceneUtils.size.width*0.9
    },
    btnImage:{
        width:SceneUtils.size.width,
        height:35,
    },
    icon:{
        width:40,
        height:4,
        marginTop:5,
        marginHorizontal:5,
    },
    childView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginHorizontal:10,
    },

    btnView:{
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.height*0.1,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    btnCenterView:{
        height:SceneUtils.size.height*0.067,
        width:SceneUtils.size.width*0.9,
        backgroundColor:'rgb(134,184,34)',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(30,30,30)',
    },
    btnText:{
        fontSize:14,
        color:'white',
    },
});