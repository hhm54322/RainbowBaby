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


//显示图片
export default class GameImage extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount(){

  }
  componentDidMount(){
      
  }



  render() {
    return (
      <View style ={styles.main}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    main:{
        width:SceneUtils.size.width*422/750,
        height:SceneUtils.size.width,
    },

});
