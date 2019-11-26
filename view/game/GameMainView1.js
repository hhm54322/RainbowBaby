'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';


import DataUtil from '../../utils/DataUtil'
import NetUtil from '../../utils/NetUtil'
export default class GameMainView extends Component {

    constructor(props) {
        super(props);
        this.netutil
        this.allflLst = [];
        this.allGameList = [];
        this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.mode = []
        this.state = {
            bqlist:[],
            dataSource: this.listData.cloneWithRows(this.mode),
        }
    }

    componentWillMount(){

    }
    componentDidMount(){
        this.sendpblistMessage()
        this.sendPblistGame()
        this.sendGameList()
        this.netutil.sendMessage()
    }
    getpblistGameBack = (responseJson)=>{
        console.log(responseJson)
        this.allflLst = responseJson
    }
    getallGameBack = (responseJson)=>{
        console.log(responseJson)
        this.allGameList = responseJson
        this.getmodeSHuju()
    }
    sendGameList = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'os':DataUtil.getinstance().getVueStrByp(),
        'beginId':0,'offset':20,
        'access_token':token};
        var mod = {
            type:'get',
            url:'/maria/games',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.getallGameBack
        }
        this.netutil.pushMessage(mod)
        
    }
    sendPblistGame = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            type:'get',
            url:'/maria/categories',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.getpblistGameBack
        }
        this.netutil.pushMessage(mod)
    }
    sendpblistMessage =()=>{
        var url ='/maria/tags'
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        ///maria/topics
        NetUtil.get(url,params,{},['application/json',
        'application/json'], (responseJson) =>{
            this.setState({
                bqlist:responseJson,
            })
        })
    }
    getmodeSHuju = ()=>{
        this.mode = []
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
                this.mode.push(mod)
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
    showbqListView =()=>{
        var temp = []
        var len = this.state.bqlist.length
        for(var i=0;i<len;i++){
            temp.push(
                <View 
                key = {i}
                style = {styles.bqOneView}>
                    <Text style = {{fontSize:SceneUtils.size.height*0.06*0.27,color:'rgb(19,185,199)'}} >
                    {this.state.bqlist[i].title}</Text>
                </View>
            )
        }
        return temp
    }

    showitemOne = (list)=>{
        //logo
        var temp = []
        var len = list.length
        for(var i=0;i<len;i++){
            temp.push(
                <View 
                key = {i}
                style = {styles.itemOneView}>
                
                    <Image style = {styles.imgView}
                        source={{uri:list[i].logo}}
                    >
                    </Image>
                    <View style = {styles.fontView}>
                        <Text 
                        numberofLines = {1}
                        style = {{color:'rgb(255, 255, 255)',
                        height:SceneUtils.size.width*0.04,
                        width:SceneUtils.size.width*0.16,
                        fontSize:SceneUtils.size.width*0.028,}}>{list[i].title}</Text>
                    </View>
                </View>
            )
        }
        return temp
    }

    moreBack =(data)=> {
        console.log(data)
        const { navigate } = this.props.navigation;
        navigate('GameTypeList',{ info:{data:data}})
    }

    showOneList = (data)=>{
        return (
            <View style = {styles.listMainOneView}>
                <View style = {styles.listTopView}>
                    <Text>{data.title.title}</Text>
                    
                    <Text 
                    onPress = {this.moreBack.bind(this, data.title)}
                    style = {{color:'rgb(19,185,199)',fontWeight:'900'}}>更多</Text>
                </View>
                <View style = {styles.line}>

                </View>
                <View style = {styles.listBottomView}>
                    {this.showitemOne(data.games)}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.topView}>
                    
                </View>
                <View style = {styles.bqView}>
                    {this.showbqListView()}
                </View>
                <View style = {styles.line}></View>

                <View style = {styles.listView}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.showOneList}
                        enableEmptySections={true}
                    ></ListView>
                </View>
                <NetUtil
                    ref= {ref=>{this.netutil = ref}}
                ></NetUtil>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    topView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.3,
        backgroundColor:'red'
    },
    bqView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.06,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    bqOneView:{
        borderWidth:1,
        borderColor:'rgb(19,185,199)',     //#13B9C7
        justifyContent: 'center',
        alignItems: 'center',
        margin:2,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:2,
        paddingRight:2,
        borderRadius: SceneUtils.size.height*0.06*0.2,
    },
    line:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(220,220,220)',
    },
    listView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.64,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listMainOneView:{
        width:SceneUtils.size.width,
    },
    listTopView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:SceneUtils.size.width,
        //height:SceneUtils.size.width*0.1,
    },
    listBottomView:{
        flexDirection:'row',
        //justifyContent:'space-between',
        width:SceneUtils.size.width,
        height:SceneUtils.size.width*0.25,
    },
    itemOneView:{
        width:SceneUtils.size.width*0.2-5,
        height:SceneUtils.size.width*0.25,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    imgView:{
        width:SceneUtils.size.width*0.2-5*0.8,
        height:SceneUtils.size.width*0.18*0.8,
        //backgroundColor:'blue'
        resizeMode:'center',
    },
    fontView:{
        justifyContent: 'center',  
        alignItems:'center', 
        height:SceneUtils.size.width*0.05,
        width:SceneUtils.size.width*0.16,
        borderRadius:SceneUtils.size.width*0.05*0.2,
        backgroundColor:'rgb(19,185,199)',
    }

});