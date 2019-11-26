'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import BabyMain from './BabyMainView';
import DiscoverMain from '../discover/DiscoverMainView';
import GameMain from '../game/GameMainView';
import HandAccountMain from '../handAccount/HandAccountMainView';
import UsefulMain from '../useful/UsefulMainView';
import Tabbar from '../../utils/Tabbar';
import FloatText from '../../utils/FloatText'
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils'
import HandMain from '../handAccount/HandMain'




//main界面  包括底部的tabelbtn
export default class MainView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:2,
            isFullScreen:false,
        };
    }
    _onTabbarPress(index){
        // if(index === 3){
        //     FloatText.show('开发中。。')
        //     return
        // }
        if(this.state.selectedIndex !== index){
            this.setState({
                selectedIndex:index,
            })
        }
    }
    _onFullScreen(b){
        this.setState({
            isFullScreen:b,
        })
    }

    //底部tabBtn  根据点击显示不同的界面
    setSubView(){
        if(this.state.selectedIndex === 0){
            return(
                <DiscoverMain navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 1){
            return(
                <GameMain navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 2){
            return(
                <BabyMain navigation={this.props.navigation}/>
            )
        }else if(this.state.selectedIndex === 3){
            return(
                //<HandAccountMain navigation={this.props.navigation}/>
                <HandMain navigation={this.props.navigation}></HandMain>
            )
        }else{
            return(
                <UsefulMain navigation={this.props.navigation} onFullScreen={(b) => this._onFullScreen(b)}/>
            )
        }
    }

    showss= ()=>{
        if(DataUtil.getinstance().getISsh()){
            return (
                <View style = {{position:'absolute',bottom:0}}>
                    <Image source = {require('./img/dddd.png')}
                        style = {{width:SceneUtils.size.width,height:45}}>
                    </Image>
                </View>
            )
        }else{
            return(<View></View>)
        }
    }

    setTabbar(){
        if(DataUtil.getinstance().getISsh()){
            return (<View style={styles.tabbarView}>
                {this.showss()}
            </View>)
        }
        if(this.state.isFullScreen){
            return 
        }
        return(
            <View style={styles.tabbarView}>
                <Tabbar 
                    onTabbarPress={(index) => this._onTabbarPress(index)}
                    select={this.state.selectedIndex}
                    isShow={!this.state.isFullScreen}
                />
            </View>
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.subView}>
                    {this.setSubView()}
                </View>
                {this.setTabbar()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
    },
    subView:{
        flex:14,
    },
    tabbarView:{
        flex:1,
        backgroundColor:'rgb(51,51,51)'
    }
});