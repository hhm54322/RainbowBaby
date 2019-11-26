/**
 * Sample React Native GameTypeList
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
  findNodeHandle,
  Dimensions,
  ListView,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';

import NetService from '../../utils/NetService'

import DataUtil from '../../utils/DataUtil'


//根据游戏的内容或者标签 显示更多游戏
export default class GameTypeList extends Component {
  constructor(props) {
    super(props);
    this.dataall = this.props.navigation.state.params.info
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.mode = []
    this.state = {
        dataSource: this.listData.cloneWithRows(this.mode),
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
      this.sendmoreGameMessage()
  }
  //重写head函数
  static navigationOptions = ({navigation}) => (
    {
    title:navigation.state.params.info.data.title,
    headerStyle:{
        borderWidth:0,
        backgroundColor:'rgb(51,51,51)',
        borderBottomWidth:0,
    },
    headerTitleStyle:{
        color:'white',
    },
  
});

//根据传入的标签类型  发送消息  得到游戏列表
  sendmoreGameMessage = ()=>{
    //var name = this.dataall.ispb? 'categoryId':'tagId'
    var url ='/maria/games'
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'os':DataUtil.getinstance().getVueStrByp(),
    'beginId':0,'offset':20,'tagId':this.dataall.data.id,
    'access_token':token};
    if(this.dataall.ispb){
        params.categoryId = params.tagId
        delete params.tagId
    }
    
    var mod = {
        url:url,
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:(responseJson) =>{
          //下面的就是请求来的数据
            console.log(responseJson)
            this.getmodeSHuju(responseJson)
        }
    }
    NetService.do(NetService.sendGameListbyType,mod)
  }


  //拿到返回数据   渲染listview
  getmodeSHuju = (games)=>{
    this.setState({
        dataSource: this.listData.cloneWithRows(games),
    })
    return
    // var len = 17;
    // for(var i=0;i<len;i++){
    //     this.mode.push({
    //         name:'老克勒棋牌',
    //         ben:(i+5)%5,
    //         pblist:['0-1周岁','艺术创造']
    //     })
    // }
    
  }
  //显示星星  已经废弃
  showStar = (s)=>{
      var temp = []
      for(var i=0;i<5;i++){
        var image
        if(i<s){
            image = require('./img/bgxxb.png')
        }else{
            image = require('./img/bgkxx.png')
        }
        temp.push(
            <Image 
            key ={i}
            style = {styles.imgStr}
                source={image}
            ></Image>
        )
      }
      return temp
  }

  //显示标签
  showbqListView =(arr)=>{
        var temp = []
        var len = arr.length
        len = len > 3?3:len
        for(var i=0;i<len;i++){
            temp.push(
                <View 
                key = {i}
                style = {styles.bqOneView}>
                    <Text style = {{fontSize:10,color:'white'}} >
                    {arr[i].title}</Text>
                </View>
            )
        }
        return temp
    }

    //点击游戏后跳转到游戏详情
    moreBack = (id)=>{
        const { navigate } = this.props.navigation;
        navigate('Game',{ info:{id:id}})
    } 

    //显示每一个item
  showOneList = (data)=>{
        return(
            <TouchableWithoutFeedback
                        onPress = {this.moreBack.bind(this, data.id)}
                    >
            <View>
                <View style={styles.listOneView}>
                    <View style = {styles.leftView}>
                        <Image style = {styles.imageView}
                        source={{uri:data.logo}}
                        >
                        </Image>
                    </View>
                    <View style = {styles.centerView}>

                        <Text style = {styles.titletextStyle}
                        numberOfLines = {1}
                            >{data.title}
                        </Text>
                        
                        <View style = {styles.bottomView}>
                            {this.showbqListView(data.tags)}
                        </View>
                        {/* <View style = {styles.nameAndStar}>
                             <Text style = {{width:SceneUtils.size.width*0.4}}>{data.title}</Text>
                             {this.showStar(data.mark/2)}
                        </View>

                        <View style = {styles.bottomView}>
                            {this.showbqListView(data.tags)}
                        </View> */}
                    </View>
                    
                        <View style = {styles.rightView}>
                            <Text 
                            style = {{color:'rgb(255,255,255)',fontWeight:'900'}}>详情</Text>
                        </View>
                </View>
                <View style = {styles.line}>
                </View>
            </View>
            </TouchableWithoutFeedback>
            
        )
  }

  render() {
    return (
        <View style= {styles.main}>
            <ListView
                style = {{backgroundColor:'rgb(51,51,51)'}}
                dataSource={this.state.dataSource}
                renderRow={this.showOneList}
                enableEmptySections={true}
            ></ListView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    line:{
        width:SceneUtils.size.width,
        borderBottomWidth:1,
        borderColor:'rgb(100,100,100)',
    },
    main:{
        flex:1
    },
    listOneView:{
        flexDirection:'row',
        justifyContent: 'center',  
        alignItems:'center', 
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.13,
    },
    leftView:{
        marginLeft:3,
        width:SceneUtils.size.width*0.2,
        height:SceneUtils.size.height*0.12,
        justifyContent: 'center',  
        alignItems:'center', 
    },
    centerView:{
        marginLeft:6,
        marginRight:3,
        width:SceneUtils.size.width*0.6-24,
        height:SceneUtils.size.width*0.2-10,
        justifyContent:'space-between',
    },
    titletextStyle:{
        fontSize:19,
        fontWeight:'900',
        width:SceneUtils.size.width*0.4,
        color:'white'
    },
    marltext:{
        marginLeft:5,
        fontSize:10,
        color:"rgb(150,150,150)"
    },
    rightView:{
        width:SceneUtils.size.width*0.18,
        height:SceneUtils.size.height*0.04,
        justifyContent: 'center',  
        alignItems:'center', 
        backgroundColor:"rgb(128,184,34)",
        borderRadius:6,
    },
    imageView:{
        width:SceneUtils.size.width*0.2-10,
        height:SceneUtils.size.width*0.2-10,
        borderRadius:8,
    },
    nameAndStar:{
        height:SceneUtils.size.height*0.12*0.45,
        flexDirection:'row',
        //justifyContent: 'center',  
        alignItems:'center', 
        //backgroundColor:'red'
    },
    imgStr:{
        width:SceneUtils.size.width*0.2*0.13,
        height:SceneUtils.size.width*0.2*0.13,
    },
    bottomView:{
        flexDirection:'row',
        //justifyContent: 'center',  
        alignItems:'center', 
    },
    bqOneView:{
        borderWidth:1,
        borderColor:'rgb(128,184,34)',     //#13B9C7
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:4,
        marginTop:6,
        borderRadius: SceneUtils.size.height*0.06*0.1,
        paddingLeft:4,
        paddingRight:4,
        height:SceneUtils.size.height*0.12*0.25,
        backgroundColor:'rgb(128,184,34)'
    },

});
