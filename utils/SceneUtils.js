import React from 'react';
import Dimensions from 'Dimensions';
import {
    PixelRatio,
  } from 'react-native';


  //返回屏幕的尺寸大小
const SceneUtils = {
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    pixelratio:PixelRatio.get()
};


export default SceneUtils;