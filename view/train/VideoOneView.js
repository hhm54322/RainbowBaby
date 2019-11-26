'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import DataUtil from '../../utils/DataUtil'
import SceneUtils from '../../utils/SceneUtils';
import MyVideo from '../../utils/MyVideo';
import MyVideoImage from '../../utils/MyVideoImage';

//视频图片列表  纯显示
export default class VideoOneView extends Component {
    constructor(props) {
        super(props);

        this.data = this.props.data

    //     // "video": {
    //     "id": "20180509102607531597",
    //     "link": "http://p04h58q2i.bkt.clouddn.com/FoBtN8htHaw4odoIMrD3kSMwLjAx.mp3",
    //     "title": "一首唱给00后的歌，正青春的世界竟如此精彩，一起唱出幸福的节奏",
    //     "images": "http://oozojm6hp.bkt.clouddn.com/FpXZlv_Znu-ccjjq6irdaY61NknJ?imageView2/1/w/400/h/200/interlace/1/q/200/format/jpg",
    //     "duration": 300,
    //     "commentCount": 0,
    //     "type": "news_video",
    //     "createTime": 1525829200
    // }

        // this.data = {
        //     commentCount:0,
        //     content:null,
        //     createTime:"2018-08-16 07:13:15",
        //     id: "20180816071315591924",
        //     link: "http://op1ozwnbj.bkt.clouddn.com/ef0e13f1e33492fb230e14e049387d2e1534374856065.mp4?from=app",
        //     title: "有三只熊",
        //     images: "http://oozojm6hp.bkt.clouddn.com/FnAdRH0ESxtbRKm7hsb_43G46lhY?imageView2/1/w/400/h/200/interlace/1/q/200/format/jpg",
        //     duration:400,
        // }

    }
    componentDidMount(){

    }
    
    _onPress = (index,layout)=>{
        if(this.props.onPress){
            this.props.onPress(index,this.data)
        }
    }
    showVideoImage(){
        return(
                    <MyVideoImage
                        //source='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525176480&di=f8aa81f6753e4773adb35030cb7eaf3b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201503%2F01%2F20150301143029_tnaTJ.jpeg'
                        source = {this.data.images}
                        style={styles.centerView}
                        // resizeMode='contain'
                        resizeMode='cover'
                        title={this.data.title}
                        totalTime={this.data.duration}
                        index={this.props.index}
                        onPress={(index,layout) => this._onPress(index,layout)}
                    />
            );
        }

    render() {
        var data = this.data
        return (
            <View style={styles.mainView}>
                <View style = {styles.centerView}>
                    {this.showVideoImage()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        width:SceneUtils.size.width,
        height:SceneUtils.size.height*0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'rgb(240,240,240)'
    },
    centerView:{
        width:SceneUtils.size.width*0.94,
        height:SceneUtils.size.height*0.26,
        borderRadius:12,
        backgroundColor:'rgb(150,150,150)',
    },
});



