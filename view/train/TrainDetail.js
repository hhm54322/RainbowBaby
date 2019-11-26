'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'
import Util from '../../utils/Util'
var datas=[
    // {
    //     name:'艺术',
    //     myNum:80,
    //     otherNum:30,
    //     state:0,
    // }
]

//显示宝宝的状态横条
export default class TrainDetail extends Component {
    constructor(props) {
        super(props);
        this.valueArryother = this.props.valueArryother     //其他宝宝的能力值
        this.allbility = this.props.allbility               //所有的能力值
        this.valueArry = this.props.valueArry               //所有的能力值数值
        this.max =  JSON.parse(DataUtil.getinstance().getabilityMaxNumber())
        //最大值    
        this.year       //年
        this.mapd = new Map()
        this.mapd.set(0,{style:{backgroundColor:'rgb(134,183,34)'},text:'开始训练'})    //注册好颜色和文字对应的对象
        this.mapd.set(1,{style:{backgroundColor:'rgb(236,175,105)'},text:'完成训练'}) 
        this.mapd.set(2,{style:{backgroundColor:'rgb(230,230,230)'},text:'完成'}) 
        this.state = {
            datas:datas,
            maxNum:200,
            boold:false,
        };
    }

    //模型重新排序
    setMode = ()=>{
        var datas2 = []
        var l  = this.valueArryother.length
        for(var i = 0;i<l ;i++){
            datas2.push({
                name:this.allbility[i].text,
                myNum:this.valueArry[i],
                otherNum:this.valueArryother[i],
                state:0,
            })
        }
        datas = []
        datas.push(datas2[0])
        datas.push(datas2[5])
        datas.push(datas2[4])
        datas.push(datas2[3])
        datas.push(datas2[2])
        datas.push(datas2[1])
        console.log(datas)
    }

    //根据值重新渲染能力
    refshow = (valueArryother,allbility,valueArry,year)=>{
        this.valueArryother = valueArryother
        this.allbility = allbility
        this.valueArry = valueArry
        this.year = year
        this.max = this.max[this.year]
        this.setMode()
        this.setState({
            boold:!this.state.boold,
            datas:datas,
        })
    }
    setOtherLine(index){
        if(this.state.datas[index].otherNum > this.state.datas[index].myNum){
            return(
                <Image style={[styles.rowLeftImage2,{width:SceneUtils.size.width * 0.62 * ((this.state.datas[index].otherNum - this.state.datas[index].myNum) / this.state.maxNum)}]} 
                    source={require('./ICON_02.png')}></Image>
            )
        }else{
            return null;
        }
    }

    //训练btn点击回调
    _onBtnClick(index){
        this.props.onBtnClick(index,this.state.datas[index].state,this.state.datas[index].name)
    }

    //横条right部分
    showRight = (num)=>{
        num = num>this.max?this.max:num
        var linerightView = {
            position:'absolute',
            height:10,
            right:0,
            borderTopRightRadius:4,
            borderBottomRightRadius:4,
            backgroundColor:'rgb(230,230,230)',
            width:SceneUtils.size.width*0.4*((this.max - num)/this.max)
        }
        return (
            <View style = {linerightView}>
            </View>
        )
    }

    //左边横条部分
    showLeft = (lnum,color)=>{
        console.log(lnum)
        lnum = lnum>this.max?this.max:lnum
        var leftadd = {}
        if(lnum>=this.max){
            leftadd = {
                borderTopRightRadius:4,
                borderBottomRightRadius:4,
            }
        }
        return (
        <View style = {[styles.lineLeftView,leftadd,color,
            {width:SceneUtils.size.width*0.4*(lnum/this.max),
            }]}>
        </View>
        )
    }
    //显示当前的能力值横条  上升还是下降
    showimageNumber = (data)=>{
        var req = data.myNum>data.otherNum?require('./1.png'):require('./2.png')
        var number = Math.abs(data.myNum - data.otherNum)
        return (
            <View style= {{flexDirection:'row',}}>
                    <Text style = {styles.oneText}>{data.name}</Text>
                    <Image style = {[styles.imageT,
                        {marginLeft:SceneUtils.size.width*0.24}]} source  = {req}></Image>
                    <Text style = {styles.textNumber}>{number}</Text>
                    
            </View>
        )
    }

    //设置孩子属性值 横条 显示
    setChildren(){
        var allChild = [];
        var length = this.state.datas.length;
        for(var i = 0;i < length;i++){
             allChild.push(
                <View 
                key = {i}
                style = {styles.view}>
                    {this.showimageNumber(this.state.datas[i])}
                    <View style = {styles.alllineView}>
                        <View style = {styles.lineOneView}>
                            {this.showLeft(this.state.datas[i].otherNum,{backgroundColor:'rgb(236,69,76)'})}
                            {this.showLeft(this.state.datas[i].myNum,{backgroundColor:'rgb(95,198,235)'})}
                            {/* {this.showRight(this.state.datas[i].myNum)} */}
                        </View>
                    </View>
                </View>
            
            );
        }
        return allChild;
    }

    //显示是否高于或低于同龄宝宝
    showBBmiaosu = ()=>{
        return(
            <View style = {styles.showGDView}>
                <Image style = {styles.imageT} source  = {require('./1.png')}></Image>
                <Text style = {[styles.textT,{color:'rgb(95,198,235)',}]}>{'高于同龄宝宝'}</Text>
                <Image style = {styles.imageT} source  = {require('./2.png')}></Image>
                <Text style = {[styles.textT,{color:'red'}]}>{'低于同龄宝宝'}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.setChildren()}
                {this.showBBmiaosu()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgb(51,51,51)',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    view:{
        //flex:1,
        width:SceneUtils.size.width/2,
        marginTop:6,
    },
    imageT:{
        width:12,
        height:12,
        marginRight:3
    },
    textT:{
        fontSize:Util.setSpText(12),
        margin:1
    },
    textNumber:{
        width:24,
        fontSize:12,
        color:'white',
        textAlign:'right',
    },
    showGDView:{
        paddingTop:5,
        paddingBottom:5,
        marginTop:6,
        marginLeft:16,
        flexDirection:'row',
    },
    alllineView:{
        marginLeft:16,
        marginTop:4,
        marginBottom:2,
        flexDirection:'row',
        width:SceneUtils.size.width*0.45,
    },
    oneText:{
        marginLeft:16,
        fontSize:12,
        color:'rgb(100,100,100)'
    },
    lineOneView:{
        width:SceneUtils.size.width*0.4,
        height:10,
        borderRadius:4,
        backgroundColor:'rgb(100,100,100)',
        
        
    },
    lineLeftView:{
        position:'absolute',
        height:10,
        left:0,
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
        //backgroundColor:'rgb(236,69,76)',
        
        
        

//         "borderBottomEndRadius",
//   "borderBottomLeftRadius",
//   "borderBottomRightRadius",
//   "borderBottomStartRadius",
// "borderTopEndRadius",
// "borderTopLeftRadius",
// "borderTopRightRadius",
// "borderTopStartRadius",
    },
    lineOneButton:{
        marginLeft:6,
        width:46,
        height:26,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'rgb(134,184,34)',
    },
    rowViewTop:{
        flex:1,
        flexDirection:'row',
    },
    rowViewDown:{
        flex:2,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowLeftView:{
        flexDirection:'row',
        marginLeft:20,
    },
    rowRightView:{
        marginRight:5,
    },
    rowLeftText:{
        fontSize:16,
        fontWeight: '400',
    },
    rowLeftImage1:{
        height:20,
        marginLeft:5,
    },
    rowLeftImage2:{
        height:20,
    },
    btnImage:{
        width:SceneUtils.size.width * 0.18,
        height:20,
    },
    btn: {
        width:SceneUtils.size.width * 0.18,
        height:20,
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:10,
        color:'white',
        fontWeight: '900',
    },
});