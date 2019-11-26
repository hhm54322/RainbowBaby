'use strict';
import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import NetUtil from '../../utils/NetUtil';
import DataUtil from '../../utils/DataUtil';

import {StorageHelper} from '../../utils/modStruct'

let imageArr = [require('./guide_1.png'),require('./guide_2.png'),require('./guide_3.png')];

//已经废弃
export default class GuideView extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:0,
        };
    }
    // 分页指示器
    renderPagingIndicator() {
        var itemAry = [,], autoColor;
        for (var i = 0; i<3; i++) {
            // 跟随当前页改变对应 点 的颜色
            autoColor = (this.state.currentPage === i) ? {color:'orange'} : {color:'white'}
            // 将子视图放进 itemAry
            itemAry.push(
                // 实例化视图
                <Text key={i} style={[{fontSize:30}, autoColor]}>&bull;</Text>
            )
        }
        // 返回数组
        return itemAry;
    };
    // 监听滚动
    onAnimationEnd(e){
        // 求出水平方向上的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        // 计算当前页码
        var currentPages = offSetX / SceneUtils.size.width;
        // 重新绘制UI
        this.setState({
            currentPage:currentPages
        })
    }

    enterApp = ()=>{
        const { navigate } = this.props.navigation;
        //navigate('CreateBaby')
        navigate('LoginMain')
        //navigate('Main')
        return
        StorageHelper.get('pStruct',(mod)=>{
            if(mod !== null){
                console.log(mod)
                let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP',
                'grant_type': 'refresh_token','refresh_token':mod.refresh_token};
                NetUtil.post('/maria/oauth/token',params,{},['application/json','application/json'], (responseJson) =>{
                    //下面的就是请求来的数据
                    console.log(responseJson);
                    DataUtil.getinstance().setUserData(responseJson)
                    var mode  = {
                        phoneNum:this.state.username,
                        access_token:responseJson.access_token,
                        refresh_token:responseJson.refresh_token
                    }
                    StorageHelper.save('pStruct',mode)
                    const { navigate } = this.props.navigation;
                    navigate('CreateBaby')
                })
            }else{
                const { navigate } = this.props.navigation;
                navigate('LoginMain')
                //navigate('Main')
            }
        })
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style = {styles.container}>
                <ScrollView
                    contentContainerStyle = {styles.contentContainer}
                    bounces = {false}
                    pagingEnabled = {true}
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
                    >
                    {/* <Image source = {imageArr[0]} style = {styles.backgroundImage}/>
                    <Image source = {imageArr[1]} style = {styles.backgroundImage}/> */}
                    {/* <ImageBackground source = {imageArr[2]} style = {[styles.backgroundImage,styles.btnOut]}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress= {this.enterApp}
                             
                        >
                            <Text style={styles.btnText}>启动应用</Text>
                        </TouchableOpacity>
                    </ImageBackground> */}
                </ScrollView>
                <View style={styles.pagingIndicatorStyle}>
                    {this.renderPagingIndicator()}
                </View>
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    pagingIndicatorStyle: {
        // 背景色(使背景色为全透明)
        backgroundColor:'rgba(255,255,255,0.0)',
        // 尺寸
        width:SceneUtils.size.width,
        // 主轴方向与对齐方式
        flexDirection:'row',
        justifyContent:'center',
        // 绝对定位,使页码指示器盖在scrollView上面
        position:'absolute',
        bottom:0
    },
    contentContainer:{
        width:SceneUtils.size.width * 3,
        height:SceneUtils.size.height,
    },
    backgroundImage:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height,
    },
    btn: {
        width:150,
        height:50,
        backgroundColor:'#90ee90',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:550,
    },
    btnOut:{
        alignItems:'center',
    },
    btnText:{
        fontSize:18,
        color:'#fff'
    },
});
