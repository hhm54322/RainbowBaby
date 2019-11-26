'use strict';
import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Modal,
    Animated,
    Easing,
} from 'react-native';
import SceneUtils from './SceneUtils';

//浮动文字的具体实现可以不管
export default class FloatTextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moveValue: new Animated.Value(0),
            alphaValue: new Animated.Value(0),
        };
    }
    componentDidMount() {
        this.state.alphaValue.setValue(0);
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.moveValue,
                    {
                        toValue:-20,            
                        easing: Easing.inOut(Easing.ease),
                        duration:200,
                    }
                ),
                Animated.timing(
                    this.state.alphaValue,
                    {
                        toValue:1,            
                        easing: Easing.inOut(Easing.ease),
                        duration:200,
                    }
                )
            ]),
            Animated.delay(1000),
            Animated.parallel([
                Animated.timing(
                    this.state.moveValue,
                    {
                        toValue:-40,            
                        easing: Easing.inOut(Easing.ease),
                        duration:200,
                    }
                ),
                Animated.timing(
                    this.state.alphaValue,
                    {
                        toValue:0,            
                        easing: Easing.inOut(Easing.ease),
                        duration:200,
                    }
                )
            ]),
        ]).start(()=>{this.onClose()});
    }
    
    onClose(){
        this.props.destroy();
    }

    render() {
        return (
            <Modal
                animationType={'none'}
                transparent
                visible
                onRequestClose={() => {
                    this.onClose()
                }}
            >
                <View style={[styles.modalStyle]}>
                    <Animated.View style={[styles.modalBg,{opacity:this.state.alphaValue,transform:[{translateY:this.state.moveValue}]}]}>
                        <Text style={styles.floatText}>{this.props.msg}</Text>
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}
var styles = StyleSheet.create({
    modalStyle: {
        width: SceneUtils.size.width,
        height: SceneUtils.size.height,
        backgroundColor: 'rgba(0,0,0,0.0)',
        justifyContent: 'center',
        alignItems:'center',
    },
    modalBg:{
        marginBottom:100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems:'center',
    },
    floatText:{
        margin:5,
        fontSize:16,
        color:'white',
    },
});