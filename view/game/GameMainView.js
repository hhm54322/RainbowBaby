'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';


import DataUtil from '../../utils/DataUtil'

import {PullList} from 'react-native-pull';
import GameAd from './GameAd'

import NetService from '../../utils/NetService'


const displayNone  = 'none'
const displayFlex  = 'flex' 


//游戏主界面
export default class GameMainView extends Component {

    constructor(props) {
        super(props);
        this.allflLst = [];     //已经废弃
        this.allGameList = [];  //game列表
        this.adgame             //广告 相关的模块
        this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.mode = []          //listview源数据
        this.state = {
            bqlist:[],
            dataSource: this.listData.cloneWithRows(this.mode),
        }
    }

    componentWillMount(){

    }
    componentDidMount(){

        //发送消息获取游戏和  标签列表
        var farry = []
        var dataArry = []
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'adaptation':DataUtil.getinstance().getVueStrByp(),
        'access_token':token};
        var mod = {
            type:'get',
            url:'/maria/categories/games',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.getallGameBack
        }
        farry.push(NetService.sendGames)
        dataArry.push(mod)


        var url ='/maria/tags'
        var token = DataUtil.getinstance().getUserData().access_token
        let params2 = {'access_token':token};


        var mod2 = {
            url:url,
            params:params2,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                if(responseJson === null)
                {
                    return
                }
                this.state.bqlist = responseJson
                this.getmodeSHuju()
            }
        }
        farry.push(NetService.sendPblist)
        dataArry.push(mod2)

        NetService.doArry(farry,dataArry)
    }

    //消息回调
    getallGameBack = (responseJson)=>{
        if(responseJson === null)
            {
                return
            }
        console.log(responseJson)
        this.allGameList = responseJson
        this.getmodeSHuju()
    }



    //根据服务器返回的消息  编辑js对象
    getmodeSHuju = ()=>{

        this.mode = []
        this.mode.push({a:{}})
        this.mode.push({b:{}})
        this.mode = this.mode.concat(this.allGameList)
        this.mode.push({
            no:1
        })
        this.setState({
            dataSource: this.listData.cloneWithRows(this.mode),
        })
        return
        var gamelen = this.allGameList.length
        var pllen = this.allflLst.length
            for(var i=0;i<pllen;i++){
                var mod = {
                    title:this.allflLst[i],
                    games:[]
                }
                for(var j=0;j<gamelen;j++){
                    var c = this.allGameList[j].tags
                    var glen = this.allGameList[j].tags.length
                    for(var z = 0;z<glen;z++){
                        if(c[z].id === this.allflLst[i].id){
                            mod.games.push(this.allGameList[j])
                            break
                        }
                    }
                }
                if(mod.games.length>0){
                    this.mode.push(mod)
                    this.mode.push(mod)
                }
            }
            console.log(' this.setState(    enter')
            this.setState({
                dataSource: this.listData.cloneWithRows(this.mode),
            })

            // for(var i=0;i<5;i++){
            //     this.mode.push({
            //         name: i+'岁精品',
            //         list:[{name:'老克勒棋牌',id:i},{name:'老克勒棋牌',id:i},
            //         {name:'老克勒棋牌',id:i},{name:'老克勒棋牌',id:i},{name:'老克勒棋牌',id:i}
            //     ]
            //     })
            // }

        
    }

    //根据标签跳转到游戏列表
    pbback =(datad)=>{
        var data = datad
        return ()=>{
            const { navigate } = this.props.navigation;
            navigate('GameTypeList',{ info:{data:data,ispb:false}})
        }
    }

    //显示标签
    showbqListView =()=>{
        var temp = []
        var len = this.state.bqlist.length
        for(var i=0;i<len;i++){
            temp.push(
                <TouchableWithoutFeedback 
                key = {i}
                onPress = {this.pbback(this.state.bqlist[i])}
                >
                <View style = {styles.vvvstyel}>
                    <Text 
                        onPress = {this.pbback(this.state.bqlist[i])}
                        style = {styles.bgtextstyle}>{this.state.bqlist[i].title}
                    </Text>
                </View>
                </TouchableWithoutFeedback>
            
            )
        }
        return temp
    }
    //this.moreBack.bind(this, data.title)
    //点击游戏跳转到游戏详情
    touchOneGame = (data)=>{
        const { navigate } = this.props.navigation;
        navigate('Game',{ info:{id:data.id}})
    }

    //显示每一个item
    showitemOne = (list)=>{
        //logo
        var temp = []
        var len = list.length
        for(var i=0;i<len;i++){
            temp.push(
                <TouchableWithoutFeedback
                key = {i}
                onPress = {this.touchOneGame.bind(this,list[i])}
                >
                <View 
                
                style = {styles.itemOneView}>
                
                    <Image style = {styles.imgView}
                        source={{uri:list[i].logo}}
                    >
                    </Image>
                    <View style = {styles.fontView}>
                        <Text 
                            style = {{color:'white',
                            height:SceneUtils.size.width*0.04,
                            width:SceneUtils.size.width*0.27*0.75,
                            marginTop:16,
                            fontWeight:'700',
                            fontSize:12,}}
                            numberOfLines = {1}>
                                {list[i].title}
                        </Text>
                    </View>
                    <View style = {{height:SceneUtils.size.height*0.047}}></View>
                </View>
                </TouchableWithoutFeedback>
            )
        }
        return temp
    }


    //点击更多跳转到  列表界面
    moreBack =(data)=> {
        console.log(data)
        const { navigate } = this.props.navigation;
        navigate('GameTypeList',{ info:{data:data,ispb:true}})
    }

    //显示每一个类型下面的游戏类标类型
    showGamelist = (data)=>{
        if(data.games == null || data.games.length === 0){
            return null
        }
        return (
            <View style = {styles.listMainOneView}>
                <View style = {styles.line}></View>
                <View style = {styles.listTopView}>
                    <Text style = {{
                        fontSize:23,
                        color:'white',
                        marginLeft:9,
                    }}>{data.title}</Text>
                    <Text 
                    onPress = {this.moreBack.bind(this, data)}
                    style = {{color:'rgb(132,184,34)',fontSize:16,
                    marginRight:9,
                    fontWeight:'900'}}>
                    更多</Text>
                </View>
                <View style = {styles.listBottomView}>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator = {false}
                        >
                            {this.showitemOne(data.games)}
                    </ScrollView> 
                </View>
            </View>
        )
    }

    //显示标签列表的滚动
    showpblistView = ()=>{
        return (
            <View style = {styles.bqView}>
                    <ScrollView
                        style={{alignSelf:'center'}}
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator = {false}
                    >
                        {this.showbqListView()}
                    </ScrollView>
                </View>
        )
    }

    //显示底部没有更多了
    showNoMore = ()=>{
        return (
          <View style ={{height:30,width:SceneUtils.size.width,alignItems:'center',
          marginTop:5}}>
              <Text style= {{color:'white'}}>{'没有更多了'}</Text>
          </View>
        )
      }

      //根据对象内容显示不同的模块
    showOneList = (data)=>{
        console.log(data)
        if('a' in data){
            return <GameAd 
            navigation = {this.props.navigation}
            ref = {ref=>this.adgame = ref}></GameAd>
        }else if('b' in data){
            return this.showpblistView()
        }else if('no' in data){
            return this.showNoMore()
        }else {
            return this.showGamelist(data)
        }
    }

    //刷新回调
    onPullRelease=(resolve)=>{
        setTimeout(() => {
            this.isNotHaveMore = false
                resolve();
            }, 2000);
      }

    render() {
        return (
            <View style={styles.container}>

            <PullList 
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    onPullRelease={this.onPullRelease} 
                    //topIndicatorRender={this.topIndicatorRender} 
                    topIndicatorHeight={60}
                    dataSource = {this.state.dataSource}
                    renderRow = {this.showOneList}
                    enableEmptySections={true}
                    //onEndReached = {this.listEndback}
                    //onEndReachedThreshold = {1}
                 />



                {/* <View style = {styles.topView}>
                    
                </View>
                
                <View style = {styles.line}></View>

                <View style = {styles.listView}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.showOneList}
                        enableEmptySections={true}
                    ></ListView>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(51,51,51)',
    },
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.32,
        backgroundColor: 'rgb(51,51,51)',
    },
    bqView:{
        height:SceneUtils.size.height*0.086,
    },
    bgImagebpView:{
        width:SceneUtils.size.width *0.15,
        height:SceneUtils.size.height*0.03,
        marginLeft:6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgtextstyle:{
        color:'rgb(134,184,34)',
        fontWeight:'900',
        fontSize:13,
    },
    vvvstyel:{
        width:SceneUtils.size.width *0.19,
        alignSelf:'center',
        height:SceneUtils.size.width *0.16*0.5,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:SceneUtils.size.width*0.03,
        borderRadius:3,
        borderWidth:1,
        borderColor:'rgb(134,184,34)'
        
    },

    line:{
        width:SceneUtils.size.width*0.94,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
    },
    listView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.53,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listMainOneView:{
        width:SceneUtils.size.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listTopView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end', 
        width:SceneUtils.size.width,
        paddingTop:4,
        paddingBottom:4,
        marginTop:6,
    },
    listBottomView:{
        flexDirection:'row',
        //justifyContent:'space-between',
        alignItems:'center', 
        width:SceneUtils.size.width,
    },
    itemOneView:{
        justifyContent: 'center',  
        //alignItems:'center', 
        marginTop:4,
        marginLeft:SceneUtils.size.width*0.03,
    },
    imgView:{
        width:SceneUtils.size.width*0.27*0.75,
        height:SceneUtils.size.width*0.27*0.75,
        resizeMode:'stretch',
        borderRadius:8,
    },
    fontView:{
        marginTop:4,
        justifyContent: 'center',  
        //alignItems:'center', 
        height:SceneUtils.size.width*0.05,
        width:SceneUtils.size.width*0.24,
    }

});