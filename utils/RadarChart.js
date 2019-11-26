/**
 * React Native App
 * Create Data 2018 4 23
 * @ by XJS
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  WebView,
  ActivityIndicator,
} from 'react-native';


const source = (Platform.OS == 'ios') ? require('../html/index.html') : { uri: 'file:///android_asset/html/index.html' }


//雷达图  
//外层是用webView实现  内容是一个本地html文件   
export default class RadarChart extends Component {

  
  constructor(props) {
    super(props);
    this.webview = null
    this.state = {
      animating : true,
    }

  }

  postMessagetoHtml = ()=>{
    var obj=this.props.obj //{"max":[{"text":"艺术","max":100},{"text":"听写","max":100},{"text":"创意","max":100},{"text":"创意","max":100},{"text":"动手","max":100},{"text":"数学","max":100}],"objNum":[{"name":"小孩1","value":[20,50,10,20,40,30]},{"name":"小孩2","value":[50,10,10,20,40,30]}]}
    var objstr=JSON.stringify(obj);
    this.webview.postMessage(objstr);
  }


  render() {
    // return (
    //   <HandsCcountEdite></HandsCcountEdite>
    // )
    return(
       <View style = {{flex:1}}>
           <WebView
                scrollEnabled = {false}
                style = {{backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}}
                ref={(webview) => this.webview = webview}
                source={source}
                onLoadEnd = {()=>{
                    this.postMessagetoHtml()
                    this.setState({
                      animating:false
                    })
                }}
           >
           <ActivityIndicator animating = {this.state.animating} size="small" color="white" />
           </WebView>
       </View>
    );
  }
}

const styles = StyleSheet.create({

});
