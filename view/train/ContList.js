'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';

//手账 动态  暂时废弃
export default class ContList extends Component {
    constructor(props) {
        super(props);
        this.cid = this.props.id
        this.mode = [
            {content:'通过【老克勒棋牌】获得数学成长+2',time:'15:45'},
            {content:'通过【老克勒棋牌】获得数学成长+2',time:'3小时前'},
            {content:'通过【老克勒棋牌】获得数学成长+2',time:'8小时前'},
        ]
        this.listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.listData.cloneWithRows(this.mode),
        }
    }
    componentDidMount(){

    }

    showOneLine  = (data)=>{
        return (
            <View style={styles.childView}>
                <Text style = {styles.texts}>{data.content}</Text>
                <Text style = {styles.texts}>{data.time}</Text>
            </View>
        )
    }
    
    render() {
        return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.showOneLine}
                    enableEmptySections={true}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    childView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginHorizontal:10,
    },
    texts:{
        color:'rgb(150,150,150)',
        fontSize:14,

    },

});