'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import SceneUtils from '../../utils/SceneUtils';
import DataUtil from '../../utils/DataUtil'

import NetService from '../../utils/NetService'
import FloatText from '../../utils/FloatText'

//建议界面
export default class SuggestView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggests:'',
        };
    }

    //显示文字
    _onPress(){
        if(this.state.suggests !== ''){
            console.log('提交建议');
            
            this.setState({
                suggests: ''
            });
        }
    }

    //发送提交建议消息
    pushmessge = ()=>{
        var token = DataUtil.getinstance().getUserData().access_token
        let params = {'access_token':token};
        var mod = {
            params:params,
            params1:{content:this.state.suggests},
            headers:['application/json','application/json'],
            callback:(responseJson)=>{
                console.log(responseJson);
                this.setState({
                    suggests: ''
                });
                FloatText.show('提交成功')
            }
        }
        NetService.do(NetService.sendsuggestion,mod)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputView}>
                    <TextInput
                    underlineColorAndroid='transparent'
                        style={styles.textInputStyle}
                        placeholder="最多可输入3000字"
                        maxLength={3000}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                suggests: text
                            });
                        }}
                        value={this.state.suggests}
                    />
                </View>

                <View style={styles.btnView}>
                    
                    <TouchableOpacity
                        //activeOpacity={1}
                        //style={styles.btn}
                        onPress={() => {
                            this.pushmessge()
                        }
                    }>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{'提交建议'}</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        alignItems: 'center',
    },
    textInputView:{
        marginTop:14,
        width:SceneUtils.size.width * 0.98,
        height:SceneUtils.size.height * 0.65,
        backgroundColor:'white',
        borderRadius:6,
    },
    textInputStyle: {
        // lineHeight: 36,
        fontSize: 14,
    },

    btnView:{
        alignSelf:'center',
        backgroundColor:'rgb(51,51,51)',
        height:SceneUtils.size.height*0.115,
        width:SceneUtils.size.width,
        position: 'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'rgb(100,100,100)'
    },
    btnImage:{
        width:SceneUtils.size.width,
        height:40,
    },
    btn: {
        height:SceneUtils.size.height*0.063,
        width:SceneUtils.size.width*0.92,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(128,183,34)',
    },
    btnText:{
        fontSize:16,
        color:'white',
        fontWeight:'900',
    },

});