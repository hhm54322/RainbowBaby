'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil';
import RadarChart from '../../utils/RadarChart'
import DateUtil from '../../utils/DateUtil'



//宝宝基础成长完成后的页面  纯显示界面
export default class GrowthCompleteView extends Component{
    constructor(props) {
        super(props);
        this.code = this.props.navigation.state.params.code
        //最大能力值
        this.max =  JSON.parse(DataUtil.getinstance().getabilityMaxNumber())
        this.bilityallArryInfo = this.props.navigation.state.params.info
        //当前能力值
        this.obj = null
        this.bilityallArry = []     //能力值数组
        this.valueArry = []         //能力值数值数组
        this.state = {

        }
        this.setMaxVaule()
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

    //拿到当前的年龄
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
    
    //根据拿到的最大值 根据年龄来判定
    setMaxVaule = ()=>{
        var l = this.bilityallArryInfo.length
        var nickname  = this.props.navigation.state.params.nickname
        var date = this.props.navigation.state.params.date
        var year = parseInt(this.getage(date)/365) 
        year = year>5?5:year;
        for(var i=0;i<l;i++){
            this.valueArry.push(this.bilityallArryInfo[i].abilityValue)
            this.bilityallArry.push({
                text:this.bilityallArryInfo[i].abilityName,
                max:this.max[year],
            })
        }
        this.obj = {max:this.bilityallArry,objNum:[{name:nickname,value:this.valueArry}]}
    }

    render() {

        //雷达图数据类型
        var option = {
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
                data: this.obj.objNum
            }]
        };
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image
                        source = {require('../../images/logo.png')}
                        style = {styles.titleIamgeStyle}
                    ></Image>
                </View>
                <View style = {[styles.line]}></View>
                <View style={styles.otherView}>
                    <View style = {styles.aViewL}>
                        <RadarChart obj = {option}></RadarChart>
                    </View>
                </View>
                <View style = {styles.downView}>
                    <Text style = {[styles.codefont]}>{'非常感谢您为您的宝宝完成了基础'}</Text>
                </View>


                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.ctouchback()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'完成'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
            }

    //点击返回跳转
    ctouchback = ()=>{
        var d = this.props.navigation;
        d.pop(2)
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },
    titleIamgeStyle:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.255,
        marginTop:SceneUtils.size.height*0.1,
    },
    logoView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.36,
    },

    imageBgS:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.45,
    },
    otherView:{
        //flex:3,
        marginTop:10,
        width:SceneUtils.size.width,
        height:SceneUtils.size.width*0.8,
        alignItems:'center',
        justifyContent:'center'
    },
    aViewL:{
        width:SceneUtils.size.width*0.7,
        height:SceneUtils.size.width*0.7,
    },
    line:{
        marginTop:4,
        borderTopWidth:1,
        width:SceneUtils.size.width,
        borderColor:'rgb(150,150,150)',
    },
    titleText: {
        fontSize: 13,
        alignSelf:'center',
        color:'rgb(90,90,90)',
    },
    loginView:{
        alignSelf:'center',
    },
    downView:{
        justifyContent:'flex-end',
        alignItems:'center',
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.05,
    },
    codefont:{
        fontSize:13,
        color:'white'
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
        backgroundColor:'rgb(128,183,34)',
        borderRadius:6,
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'900',
    },
    


});