/**
 * Sample React Native MoreDIscover
 * 
 * @xjs
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ListView,
    TouchableWithoutFeedback,
    
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'

//更多精选列表
export default class MoreDIscover extends Component {
  constructor(props) {
    super(props);
    this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.mode =[]   //listvie数据源
    this.shuju = []
    for(var i =0;i<24;i++){
       this.shuju.push(
            {
                text:'这个是精选'+(i+1),
                cover:'http://ddd.png'
            })
    }
    this.lirthisArr()       
    this.state = {
        dataSource: this.listData.cloneWithRows(this.mode),
    }
  }

  static navigationOptions = ({navigation}) => ({
    // 展示数据 "`" 不是单引号 
//   title: `Chat with ${navigation.state.params.user}`,
    //title:'加入急',
    headerStyle:{
        borderWidth:0,
        backgroundColor:'rgb(51,51,51)',
        borderBottomWidth:0,
    },
    headerTitleStyle:{
        color:'white',
    },
  
});
  componentWillMount(){

  }
  componentDidMount(){
    var token = DataUtil.getinstance().getUserData().access_token
    let params = {'beginId':0,'offset':50,'selection':false,'access_token':token,
    'adaptation':DataUtil.getinstance().getVueStrByp()};
    var mod = {
        params:params,
        params1:{},
        headers:['application/json','application/json'],
        callback:(responseJson) =>{
            console.log(responseJson);
            this.shuju =responseJson
            this.lirthisArr()
            this.setState({
                dataSource: this.listData.cloneWithRows(this.mode),
            })
      }
    }
    NetService.do(NetService.sendtopics,mod)
  }

  //把数据分发到数组
  lirthisArr = ()=>{
    this.mode = []
    var alllenth = this.shuju.length
    var len = this.shuju.length/2;
    var all = 0
    for(var i=0; all<alllenth&&i<len;i++){
        var arr = []
       for(var j = 0;j<2;j++){
           if(all >= alllenth){
              all++;
          }else{
              arr.push(this.shuju[all])
              all++
          }
       }
       if(arr.length>=1){
          this.mode.push(arr)
       }
    }

}   

//点击回调跳转到详情页面
_touchOne =(data)=>{
    var ldata = data
    console.log(ldata)
    var back = ()=>{
        const { navigate } = this.props.navigation;
        navigate('DiscoverInfo',{ info:{data:ldata}})
    }
    return back
}


//每一个item的具体实现
showItemOnew = (rowData)=>{
    var l = rowData.length
    var lin = []
    for(var i=0;i<l;i++){
        lin.push(
            <TouchableWithoutFeedback
                key = {i}
                onPress = {this._touchOne(rowData[i])}
            >
                <View 
                style = {styles.itemView}
                >
                    <Image
                        style = {styles.imgbgView}
                        source={{uri:rowData[i].cover}}>
                    </Image>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return lin
}


    //渲染每一行
    showOneLine =(rowData)=>{
        return (
            <View style = {styles.itemLine}>
                {this.showItemOnew(rowData)}
            </View>
        )
    }

  render() {
    return (
        <View style = {styles.main}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneLine}
                    enableEmptySections={true}
                ></ListView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'rgb(51,51,51)',
  },
  itemLine :{
    marginTop:8,
    flexDirection:'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },

  itemView:{
      justifyContent: 'center',
      alignItems: 'center',
      height:SceneUtils.size.width*0.44*422/750,
      width:SceneUtils.size.width*0.44,
      marginBottom:5,
      marginLeft:SceneUtils.size.width*0.03,
      marginRight:SceneUtils.size.width*0.03,
      borderRadius:6,
      backgroundColor:'rgb(220,220,220)',
    },
    imgbgView:{
        borderRadius:6,
        height:SceneUtils.size.width*0.44*422/750,
        width:SceneUtils.size.width*0.44,
        resizeMode :'stretch',
    },

});
