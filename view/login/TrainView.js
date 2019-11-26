'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import SceneUtils from '../../utils/SceneUtils'
import DataUtil from '../../utils/DataUtil'
import RadarChart from '../../utils/RadarChart'
import DateUtil from '../../utils/DateUtil'


//训练页面  显示宝宝当前的能力值 
export default class TrainView extends Component{
    constructor(props) {
        super(props);
        this.code = DataUtil.getinstance().getMainFamliy().main.invitationCode          //邀请码
        var mainf = DataUtil.getinstance().getMainFamliy()                      //主家庭
        this.max =  JSON.parse(DataUtil.getinstance().getabilityMaxNumber())        //能力值最大值
        var childsl = mainf.main.children.length                    //孩子个数
        this.baby = mainf.main.children[childsl-1]                     //当前baby 对象
        this.bilityallArry = []                                 //能力数组
        this.valueArry = []                                 //能力值数组
        this.obj = null
        this.state = {

        }
        this.setMaxVaule()
    }
    
    //时间换成天数
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

    //获得雷达图需要的显示对象
    setMaxVaule = ()=>{
        var l = this.baby.ability.length
        var nickname  = this.baby.nickname
        var year = parseInt(this.getage(this.baby.birthdate)/365) 
        console.log('year =====  ' +year)
        year = year>5?5:year;
        for(var i=0;i<l;i++){
            this.valueArry.push(this.baby.ability[i].abilityValue)
            this.bilityallArry.push({
                text:this.baby.ability[i].abilityName,
                max:this.max[year],
            })
        }

        this.obj = {max:this.bilityallArry,objNum:[{name:nickname,value:this.valueArry}]}
    }

    //重写head函数
    static navigationOptions = ({navigation}) => (
        {
        headerStyle:{
            borderWidth:0,
            backgroundColor:'rgb(51,51,51)',
            borderBottomWidth:0,
        },
        headerTitleStyle:{
            color:'white',
        },
      
    });

    render() {

        //雷达图对象
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
                    <Image source = {require('./img/wzibg.png')} style = {styles.logoIcon}/>
                </View>
                <Text style={styles.titleText}>这是宝宝的基础训练分，随着宝宝成长基础类型会增加</Text>
                <View style={styles.otherView}>
                    <View style = {styles.aViewL}>
                        <RadarChart obj = {option}></RadarChart>
                    </View>
                </View>
                <View style = {styles.downView}>
                    <Text style = {[styles.codefont,{fontWeight:'700'}]}>{this.code}</Text>
                    <Text style = {[styles.codefont,{marginTop:6}]}>{'这是您的邀请码'}</Text>
                    <Text style = {[styles.codefont]}>{'您可以邀请亲友一起陪伴宝宝成长'}</Text>
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
                        <Text style={styles.btnText}>{'开始宝宝训练'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    ctouchback = ()=>{
        const { navigate } = this.props.navigation;
        if(this.props.navigation.state.params.info){
            var d = this.props.navigation;
            d.pop(2)
        }else{
            navigate('Main')
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },
    logoView:{
        //flex:1,
    },
    logoIcon:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.29,
        resizeMode:'contain',
    },
    imageBgS:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height * 0.40,
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
    titleText: {
        fontSize: 12,
        alignSelf:'center',
        color:'rgb(150,150,150)',
    },
    loginView:{
        alignSelf:'center',
    },
    downView:{
        justifyContent:'flex-end',
        alignItems:'center',
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.1,
    },
    codefont:{
        fontSize:13,
        color:'white'
    },

    btnView:{
        alignSelf:'center',
        height:SceneUtils.size.height*0.115,
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
        borderRadius:5,
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'900',
    },
    


});