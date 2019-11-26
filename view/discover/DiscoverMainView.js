
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ListView,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow'
import SceneUtils from '../../utils/SceneUtils'
import DataUtil from '../../utils/DataUtil'
import {PullList} from 'react-native-pull';
import Util from '../../utils/Util'

import NetService from '../../utils/NetService'


const displayNone  = 'none'
const displayFlex  = 'flex'


//发现主界面
export default class DiscoverMainView extends Component {
    constructor(props) {
        super(props);
        this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //listview渲染data
        this.mode =[]   //listview渲染数据源
        this.jxmode = []        //精选模块数据
        this.admode = []        //广告
        this.bgindex = 0        //开始的下标

        this.indexNow = 0       //当前个数下标
        this.firstSend = 10     //第一次请求的个数
        this.addSend = 5        //每次上拉跟新的数据个数

        this.adindex = 0        //当前个数以及下标old，
        this.isrefrenshow = true    //是否刷新
        this.bottomView         
        this.bottomView2        //底部渲染显示圈和文字
        this.isNotHaveMore = false         //是否跟新了数据
        for(var i =0;i<3;i++){
            this.jxmode.push(
                {
                    text:'这个是精选'+(i+1),
                    cover:'http://ddd.png'
                }
            )
        }
        this.state = {
            dataSource: this.listData.cloneWithRows(this.mode),
            adMode:[],
            ff:false,
            isShow:false,
            mod :{
                title:'熊博士的妹',
                introduction:'开启孩子创造力，快来创造小镇吧开启孩子创造力，快来创造小镇吧开启孩子创造力，快来创造小镇吧开启孩子创造力，快来创造小镇吧开启孩子创造力，快来创造小镇吧',
                mark:8.3,
                background:'http://2.png',
                logo:'http://2.png',
            }
        }
    }
    componentWillMount(){

    }
    //得到广告内容放到admod
    showAd = (responseJson)=>{
        console.log(responseJson)
        // var len = responseJson.length
        // for(var i = 0;i<len;i++){
        //     this.admode.push(responseJson[i])
        // }
        this.admode = this.admode.concat(responseJson)
    }
    //精选的内容放到jxmode
    jxbanc = (responseJson)=>{
        console.log(responseJson)
        this.jxmode = responseJson

    }

    //发送队列消息
    sendMessageAll = ()=>{
        var farry = []
        var dataArry = []

        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'beginId':this.indexNow,'offset':this.firstSend,'target':'discover' ,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
        var mod1 = {
            type:'get',
            url:'/maria/advertisement',
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:this.showAd
        }
        this.indexNow+=this.firstSend

        let params2 = {'beginId':0,'offset':3,'selection':true,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
            var mod2 = {
                type:'get',
                url:'/maria/topics',
                params:params2,
                params1:{},
                headers:['application/json','application/json'],
                callback:this.jxbanc
            }

            farry.push(NetService.sendadvertisement)
            dataArry.push(mod1)

            farry.push(NetService.sendtopics)
            dataArry.push(mod2)
        
            NetService.doArry(farry,dataArry,this.allmessageOver)

    }


    componentDidMount(){
        //发送消息
        this.sendMessageAll()
    }

    //当所有消息都接受完成之后渲染
    allmessageOver = ()=>{
        var ac = this.getallmessagetodata(this.admode)
        return null
    }

    //根据消息数据组转显示的mode数据类型
    getallmessagetodata = (admode)=>{
        var maxlen = admode.length
        var isqq1 = maxlen === 0? true:false
        var len = this.mode.length
        var adc = len===0?true:false
        console.log('maxlen  ====  '+maxlen)
        var max = this.adindex + maxlen
        console.log('max  === '  +max)
        for(var i = 0;this.adindex<max ;this.adindex++,i++){
            if(max>this.adindex){
                this.mode.push(admode[i])
            }else{
                break;
            }
        }
        if(adc){
            this.mode.splice(1,0,{jxd:this.jxmode})
        }
        var mode1 = []
        mode1 = mode1.concat(this.mode)
        mode1.push({
            qq:{q:1}
        })
        if(isqq1){
            mode1.push({
                qq:{q:2}
            })
        }
        console.log(mode1)
        this.setState({
            dataSource: this.listData.cloneWithRows(mode1),
            isShow:false,
        })
        this.isrefrenshow = false

        return isqq1
    }

    //显示标签
    showpblist = (data)=>{
        var temp = [];
        var len = data.tags.length
        len = len>2?2:len;
        for(var i = 0 ;i<len; i++){
          temp.push(
            <View
              key = {i}
              style = {styles.bbgstyle}
            >
              <Text style = {styles.pbtextStyle}> {data.tags[i].title}  </Text>
            </View>
          )
        }
        return temp
      }

    //显示game内容板块
    showGame = (mode,boold)=>{
        if(!boold){return}
        return ( 
        <View style = {styles.topheadView}>
            <View style = {styles.headImageView}>
                <Image style = {styles.headImage}
                    source={{uri:mode.gameVo.logo}}
                ></Image>
            </View>
            <View style = {styles.midView}>
                <Text 
                numberOfLines = {1}
                style = {styles.textNameView}> {mode.gameVo.title} </Text>
                
                <View style = {{flexDirection:'row',marginLeft:10,
                //marginTop:SceneUtils.size.height*0.14/4.2
                // height:30
                }}>
                    {this.showpblist(mode.gameVo)}
                </View>
                
                {/* <Text style = {styles.textInStyle}
                numberOfLines = {5}
                >{mode.gameVo.introduction} </Text> */}
            </View>
        </View>
        )        
    }

    //游戏点击后的回调跳转到游戏详情
    toucheGameBack = (mode)=>{
        const { navigate } = this.props.navigation;
        navigate('Game',{ info:{id:mode.gameVo.id}})
    }


    //显示投
    showViewtop = (mode,boold)=>{
        var shadowOpt = {
            height:SceneUtils.size.width*1.082,
            width:SceneUtils.size.width*0.905,
            color:"#000000",
            border:14,
            radius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6,
            opacity:0.5,
            x:0,
            y:0,
            //style:{marginVertical :3}
        }
        //var color = DataUtil.getinstance().getbgColor()[this.bgindex]
        //this.bgindex++
        //this.bgindex = this.bgindex>5?0:this.bgindex
        //backgroundColor:color,
        return (
            <TouchableWithoutFeedback
                onPress = {this.toucheGameBack.bind(this,mode)}
            >
            
            <View style = {styles.topview}>
                <BoxShadow setting={shadowOpt}>
                {/* <ImageBackground 
                resizeMode = {'stretch'}
                style = {styles.imgshadlw}
                    source={require('./img/3.png')}
                > */}
                    <View style = {{borderRadius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6}}>
                        <Image style = {[styles.imgaBg]}
                            source={{uri:mode.referenceImg}}
                        >
                        </Image>
                    </View>
                </BoxShadow>
                {/* </ImageBackground> */}
                {this.showZoderz(boold)}
                {this.showGame(mode,boold)}
            </View>
            </TouchableWithoutFeedback>
        )
    }

    
    showZoderz = (boold)=>{
        if(boold){
            return (
                <Image 
                style = {[styles.imgaBg,{position:'absolute'}]}
                source={require('./img/mask.png')}>
                </Image>
            )
        }else{
            return null
        }

    }

    showAdOneModeView = (mode)=>{
        if(mode.gameVo != null){
            return this.showViewtop(mode,true)
        }else{
            return this.showViewtop(mode,false)
        }
    }

    toucheJxBack = (data)=>{
        const { navigate } = this.props.navigation;
        navigate('DiscoverInfo',{ info:{data:data}})
    }

    showOne = (datad)=>{
        var temp = []
        var len = datad.length
        len  = len>3?3:len
        for(var i=0;i<len;i++){
            var data = datad[i]
            if(data.cover  === null){
                data.cover = 'http://d.png'
            }
            temp.push (
                <TouchableWithoutFeedback
                    onPress = {this.toucheJxBack.bind(this,data)}
                key = {i}>
                    <View 
                    key = {i}
                    style = {styles.listOne}>
                    <ImageBackground
                        style = {styles.listOneMain}
                        source={require('./img/2.png')}>
                        <View style = {styles.headImg}>
                            <Image
                                style = {styles.headImg}
                                source={{uri:data.cover}}>
                            </Image>
                        </View>
                    </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return temp
    }

    showqq = ()=>{
        return(<View ref = {ref=>this.bottomView = ref}
         style={styles.hidView}>
                <ActivityIndicator size="small" color="white" />
                <Text style = {{fontSize:12,color:'white'}}>{'加载中...'}</Text>
            </View>)
    }

    showqq2 = ()=>{
        return(<View ref = {ref=>this.bottomView2 = ref}
            style={styles.hidView}>
                   <Text style = {{fontSize:15,color:'white'}}>{'没有更多了'}</Text>
               </View>)
    }

    showxj2 = (data)=>{
        var shadowOpt = {
            height:SceneUtils.size.width*1.082,
            width:SceneUtils.size.width*0.905,
            color:"#000000",
            border:14,
            radius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6,
            opacity:0.5,
            x:0,
            y:0,
            //style:{marginVertical :3}
        }

        return (<View style = {styles.topview}>
            <BoxShadow setting={shadowOpt}>

                <View style = {styles.topview2Vie}>
                    {/* <ImageBackground 
                resizeMode = {'stretch'}
                style = {styles.imgshadlw}
                    source={require('./img/3.png')}
                > */}
                    <View style = {styles.jxTextTopView}>
                        {this.showLineText()}
                    </View>
                    {this.showOne(data)}
                {/* </ImageBackground> */}
                </View>
                
            </BoxShadow>
        </View>)
    }

    //根据数据类型渲染数据
    showOneList = (data)=>{
        if('jxd' in data){
            return this.showxj2(data.jxd)
        }else if('qq' in data){
            if(data.qq.q === 1){
                return this.showqq()
            }else{
                return this.showqq2()
            }
        }else{
            return this.showAdOneModeView(data)
        }
    }

    //精选相关，文字和文字下面的线
    showLineText =()=>{
        return (
        <View style = {styles.midoeView}>
            <Text style = {styles.jingxuan}>精选专题</Text>
            <Text 
            onPress = {
                ()=>{
                    const { navigate } = this.props.navigation;
                    navigate('MoreDIscover',{ info:{yupe:3}})
                }
            }
            style = {styles.moretext}>更多专题</Text>
        </View>
        )
    }

    //发送上啦刷新后的数据
    sendAddmessage = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'beginId':this.indexNow,'offset':this.addSend,'target':'discover' ,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
        this.indexNow+=this.addSend
        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson) =>{
                console.log(responseJson)
                this.isNotHaveMore = this.getallmessagetodata(responseJson);
                setTimeout(() => {
                    this.bottomView && this.bottomView.setNativeProps({style: styles.hidView});
                    if(this.isNotHaveMore){
                        this.bottomView2 && this.bottomView2.setNativeProps({style: styles.bottomViewStyle});
                    }
                }, 1);
          }
        }
        NetService.do(NetService.sendadvertisement,mod)
    }

    //重新刷新  所有数据初始化  并且重新发送消息
    sendMessageBegin = (resolve)=>{
        this.mode =[]
        this.admode = []
        this.bgindex = 0

        this.indexNow = 0
        this.firstSend = 10
        this.addSend = 5
        this.adindex = 0

        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'beginId':this.indexNow,'offset':this.firstSend,'target':'discover' ,'access_token':token,'adaptation':DataUtil.getinstance().getVueStrByp()};
        this.indexNow+=this.addSend

        var mod = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:(responseJson) =>{
                console.log(responseJson)
                this.isNotHaveMore = this.getallmessagetodata(responseJson);
                resolve()
          }
        }
        NetService.do(NetService.sendadvertisement,mod)
    }

    //发送消息回调
    onPullRelease=(resolve)=>{
        this.sendMessageBegin(resolve)
      }
      //滑动到底部的回调
      listEndback = ()=>{
          if(this.isNotHaveMore){
              return
            }
            if(this.isrefrenshow){
                return
            }
          if(this.isrefrenshow || !this.bottomView){
              return
          }
          this.isrefrenshow = true
          setTimeout(() => {
            this.sendAddmessage()
            
        }, 1000);
        
        //显示底部的样式
        if(this.bottomView){
            setTimeout(() => {
                this.bottomView && this.bottomView.setNativeProps({style: styles.bottomViewStyle});
            }, 1);
        }
      }

      //下啦刷新具体实现样式
      topIndicatorRender = (pulling, pullok, pullrelease) =>{
        setTimeout(() => {
          if (pulling) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
          } else if (pullok) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
          } else if (pullrelease) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
          }
      }, 1);
      return (
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
              <ActivityIndicator size="small" color="white" />
              <Text ref={(c) => {this.txtPulling = c;}} style={styles.hide}>{'下拉加载...'}</Text>
              <Text ref={(c) => {this.txtPullok = c;}} style={styles.hide}>{'松开进行加载...'}</Text>
              <Text ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>{'加载中...'}</Text>
          </View>
      );
      }

    render() {
        return (
            <View style={styles.container}>
                {/* <PullView
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    onPullRelease={this.onPullRelease}
                    onMomentumScrollEnd = {this.onTouchenDown}
                    onPushing = {this.onPushingd}
                >
                    {this.showViewtop()}
                    {this.showLineText()}
                    <View style = {styles.listView}>
                        {this.showOneList()}
                    </View>
                </PullView> */}

                <PullList 
                    showsVerticalScrollIndicator = {false}
                    showsHorizontalScrollIndicator = {false}
                    onPullRelease={this.onPullRelease} 
                    topIndicatorRender={this.topIndicatorRender} 
                    topIndicatorHeight={60}
                    dataSource = {this.state.dataSource}
                    renderRow = {this.showOneList}
                    enableEmptySections={true}
                    onEndReached = {this.listEndback}
                    onEndReachedThreshold = {1}
                 />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgb(71,71,71)'
    },

    topview:{
        height:SceneUtils.size.width*1.155,
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'rgb(150,150,150)',
        marginTop:14,
        marginBottom:14,
    },
    topview2Vie:{
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.width*1.082,
        borderRadius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6,
    },


    
    imgaBg:{
        height:SceneUtils.size.width*1.082,
        width:SceneUtils.size.width*0.905,
        borderRadius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6,
        resizeMode :'cover',
    },
    imgaBg2:{
        height:SceneUtils.size.width*1.082,
        width:SceneUtils.size.width*0.905,
        borderRadius:DataUtil.getinstance().getVueStrByp() === 'IOS'?10:6,
        resizeMode :'stretch',
    },
    imgshadlw:{
        position:'absolute',
        height:SceneUtils.size.width*1.155,
        width:SceneUtils.size.width*0.977,
        alignItems:'center',
        justifyContent:'center',
    },
    jxTextTopView:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.905,
        borderBottomWidth:1,
        borderColor:'rgb(150,150,150)',
        marginBottom:15,
        paddingBottom:3,

    },
    topheadView:{
        position: 'absolute',
        flexDirection:'row',
        width:SceneUtils.size.width*0.90,
        //marginTop:SceneUtils.size.height*0.1,
        height:SceneUtils.size.height*0.14,
        bottom:30,
    },
    headImageView:{
        width:93,
        height:93,
        marginLeft:SceneUtils.size.width*0.07,
        borderRadius:20
    },
    headImage:{
        width:93,
        height:93,
        borderRadius:25
    },
    midView:{
        width:SceneUtils.size.width*0.6,
        height:93,
        justifyContent:'space-between',
        marginLeft:11,
    },
    textNameView:{
        width:SceneUtils.size.width*0.5,
        // height:SceneUtils.size.height*0.04,
        marginLeft:4,
        // marginTop:7,
        color:'rgb(255,255,255)',
        fontSize:Util.setSpText(27),
        fontWeight:'900',
        fontFamily:'MicrosoftYaHei'
    },
    textInStyle:{
        marginLeft:7,
        marginTop:SceneUtils.size.height*0.040,
        color:'rgb(240,240,240)',
        fontSize:9,
        width:SceneUtils.size.width*0.6,
        height:SceneUtils.size.height*0.04,
    },
    viewStarandpf:{
        flexDirection:'row',
        width:60,
        height:20,
        borderRadius:5,
        backgroundColor:'rgb(19,185,199)',
        marginRight:8,
        alignItems:'center',
        justifyContent:'center',
    },
    imgStr:{
        width:18,
        height:18,
        marginRight:3,
    },

    textpf:{
        fontSize:13,
        color:'rgb(255,255,255)',
    },
    textView:{
        width:SceneUtils.size.width-8,
        height:SceneUtils.size.height*0.03,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginLeft:8,
    },
    textinfo:{
        width:SceneUtils.size.width-8,
        height:SceneUtils.size.height*0.02,
        fontSize:12,
        color:'rgb(255,255,255)',
    },
    midoeView:{
        flexDirection:'row',
        width:SceneUtils.size.width*0.9,
        justifyContent:'space-between',
    },
    jingxuan:{
        fontSize:17,
        marginLeft:10,
        fontWeight:'700',
        color:'white'
    },
    moretext:{
        color:'rgb(134,184,34)',
        fontSize:17,
        fontWeight:'700',
        marginRight:13,
    },
    listView:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(245,245,245)',
    },
    listOne:{
        alignItems:'center',
        justifyContent:'center',

    },
    listOneMain:{
        marginTop:4,
        width:(SceneUtils.size.width*0.905 - 10)/3*750/422,
        height:(SceneUtils.size.width*0.905 - 10)/3,
        marginBottom:4,
        borderRadius:10,
    },
    headImg:{
        width:(SceneUtils.size.width*0.905 - 10)/3*750/422,
        height:(SceneUtils.size.width*0.905 - 10)/3,
        borderRadius:10,
    },
    bottomViewStyle:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 60,
        display:displayFlex,
    },
    hidView:{
        display:displayNone,
    },
    bbgstyle:{
        marginRight:9,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:3,
        paddingRight:3,
        paddingTop:3,
        paddingBottom:3,
        backgroundColor:'rgb(134,184,34)'
      },
      pbtextStyle:{
        fontSize:Util.setSpText(16),
        color:'white',
        fontWeight:'900',
      },
      hide: {
        position: 'absolute',
        left: 10000,
        color:'white'
      },
      show: {
        position: 'relative',
        left: 0,
        color:'white',
      },
      

});