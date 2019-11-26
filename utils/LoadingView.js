'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Animated,
    Easing,
} from 'react-native';
import SceneUtils from './SceneUtils';
import Loading from 'react-native-spinkit';


////显示通讯中的loading图标   的具体实现   
export default class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveValue: new Animated.Value(0),
        };
        this.currentValue = 0;
    }
    componentDidMount(){
        this.repeat();
    }
    repeat(){
        if(this.currentValue == 0){
            this.currentValue = 5;
        }else{
            this.currentValue = 0;
        }
        Animated.timing(
            this.state.moveValue,
            {
                toValue:this.currentValue,            
                easing: Easing.linear,
                duration:500,
            }
        ).start(()=>{this.repeat()});
    }
    onClose(){

    }
    render() {
        return (
            <Modal
                animationType='none'            
                transparent={true}              
                visible={this.props.isShow}    
                onRequestClose={() => {
                    this.onClose()
                }}
            >
                <View style={styles.modalStyle}>
                    <Animated.Image                        
                        source={require('./img/loading.png')}
                        style={
                            [styles.loadingImg,
                            {
                                transform:
                                [{
                                    translateY:this.state.moveValue
                                }]
                            }
                        ]
                    } 
                    />
                    <Loading color='white' type='Wave'/>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.size.width,
        height: SceneUtils.size.height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems:'center',
    },
    loadingImg:{
        width: SceneUtils.size.width * 0.12,
        height: SceneUtils.size.width * 0.12,
    },
});