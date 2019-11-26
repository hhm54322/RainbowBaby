/**
 * Sample React Native DiscoverInfo
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
  Image,
  ImageBackground,
  ListView,
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'


//显示游戏里面的图片
export default class GameImageMain extends Component {
  constructor(props) {
    super(props);
    this.listtu = this.props.data.snapshot.phone
  }
  componentWillMount(){

  }
  componentDidMount(){
  }



  render() {
    console.log('ddddddddd')
    console.log(this.listtu)
    return (
      <View style ={styles.main}>
          {/* <Image
              style = {styles.bgImga}
              source={{uri:this.listtu[0].url}}
              >
          </Image> */}
          <ImageBackground
              style = {styles.bgImga}
              source={require('./img/2.png')}
          >
            <Image
                style = {styles.bgImga}
                source={{uri:this.listtu[0].url_1}}
                >
            </Image>
          </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    main:{
        height:SceneUtils.size.width*422/750,
        width:SceneUtils.size.width,
        alignItems:'center',
        justifyContent:'center',
    },
    bgImga:{
      //resizeMode:'stretch',
      height:SceneUtils.size.width*0.94*422/750,
      width:SceneUtils.size.width*0.94,
      borderRadius:13,
    },

});
