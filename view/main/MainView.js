'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppState,
    Image,
    Clipboard,
    Alert
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
// import BabyMainView from '../baby/BabyMainView';
import BabyMainView from '../baby/MainView';
import DiscoverMainView from '../discover/DiscoverMainView';
import GameMainView from '../game/GameMainView';
import HandAccountMianView from '../handAccount/HandAccountMainView';
import UsefulMainView from '../useful/UsefulMainView';
import BabyEditView from '../baby/BabyEditView';
import SetUpView from '../setUp/SetUpView';
import SetUpVideoView from '../setUp/SetUpVideoView';
import EditProfileView from '../setUp/EditProfileView';
import GrowthView from '../growth/GrowthView';
import GrowthCompleteView from '../growth/GrowthCompleteView';
import TrainMainView from '../train/TrainMainView';
import TrainRecommendView from '../train/TrainRecommendView';
import NoticeView from '../notice/NoticeView';
import SuggestView from '../notice/SuggestView';
import ChargeRecordView from '../notice/ChargeRecordView';
import NotifyView from '../notice/NotifyView';
import HandsView from '../handAccount/HandsView';
import ApplicationListView from '../baby/ApplicationListView';
import JoinFamilyView from '../baby/JoinFamilyView';
import JoinFamilyTwoView from '../baby/JoinFamilyTwoView';
import HandsDate from '../handAccount/HandsData/HandsDate'
import HandsCcountEdite2 from '../handAccount/HandsCcount/HandsCcountEdite2'
import GameTypeList from '../game/GameTypeList'
import Game from '../game/Game'
import MoreDIscover from '../discover/MoreDIscover'
import DiscoverInfo from '../discover/DiscoverInfo'
import TextInfo from '../useful/TextInfo'
import SetQOrWexin from '../setUp/SetQOrWexin'
import NoticeMain  from '../notice/NoticeMain'

import CreateBabyView from '../login/CreateBabyView';
import TrainView from '../login/TrainView'
import ChangeView from '../baby/ChangeView'

import Person from '../baby/Person'
//import DownLoadView from '../downLoad/DownLoadView'

import StoGetOtherFam from '../../utils/StoGetOtherFam'
import DataUtil from '../../utils/DataUtil';
import SceneUtils from '../../utils/SceneUtils';

import HandMain from '../handAccount/HandMain'

import SelectBg from '../handAccount/selectHandbottomList/SelectBg'

import SelectImage from '../handAccount/selectHandbottomList/SelectImage'

import TextInputView from '../../utils/TextInputView'

//路由设置
const AppTabNavigator = TabNavigator({
    DiscoverMain: {
        screen: DiscoverMainView,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../../utils/img/A1.png')}
                    style={[{height: 27, width: 33}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    GameMain: {
        screen: GameMainView,
        navigationOptions: {
            tabBarLabel: '游戏',
            tabBarIcon: ({tintColor}) => (
                <Image
                source={require('../../utils/img/A2.png')}
                style={[{height: 27, width: 33}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    BabyMain: {
        screen: BabyMainView,
        navigationOptions: {
            tabBarLabel: '宝宝',
            tabBarIcon: ({tintColor}) => (
                <Image
                source={require('../../utils/img/A3.png')}
                style={[{height: 27, width: 33}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    HandAccountMian: {
        screen: HandAccountMianView,
        navigationOptions: {
            tabBarLabel: '手帐',
            tabBarIcon: ({tintColor}) => (
                <Image
                source={require('../../utils/img/A4.png')}
                style={[{height: 27, width: 33}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    UsefulMain: {
        screen: UsefulMainView,
        navigationOptions: {
            tabBarLabel: '精选',
            tabBarVisible:true,
            tabBarIcon: ({tintColor}) => (
                <Image
                source={require('../../utils/img/A5.png')}
                style={[{height: 27, width: 33}, {tintColor: tintColor}]}
                />
            ),
        },
    }
},{
     initialRouteName: 'BabyMain',
     swipeEnabled: false,
     animationEnabled: false,
     lazy: false,
     tabBarPosition:'bottom',
     backBehavior: "none",
     tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#ff0000',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 12,
            marginTop: -5,
            marginBottom: 3,
        },
        iconStyle: {//图标的样式
            marginBottom: 3,
        }
    },
 });
 const AppTabNoticeNavigator = TabNavigator({
    Notice: {
        screen: NoticeView,
        navigationOptions: {
            tabBarLabel: '公告',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./ICON_08.png')}
                    style={[{height: 28, width: 28}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Suggest: {
        screen: SuggestView,
        navigationOptions: {
            tabBarLabel: '反馈&建议',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./ICON_08.png')}
                    style={[{height: 28, width: 28}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    ChargeRecord: {
        screen: ChargeRecordView,
        navigationOptions: {
            tabBarLabel: '充值记录',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./ICON_08.png')}
                    style={[{height: 28, width: 28}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Notify: {
        screen: NotifyView,
        navigationOptions: {
            tabBarLabel: '通知',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./ICON_08.png')}
                    style={[{height: 28, width: 28}, {tintColor: tintColor}]}
                />
            ),
        },
    },
},{
     initialRouteName: 'Notice',
     swipeEnabled: true,
     animationEnabled: false,
     lazy: false,
     tabBarPosition:'top',
     backBehavior: "none",
     tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#ff0000',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 12,
            marginTop: -5,
            marginBottom: 3,
        },
        iconStyle: {//图标的样式
            marginBottom: 3,
        }
    },
 });
 
 const AppStackNavigator = StackNavigator({
    BabyMain:{
        screen:BabyMainView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    //******************************    add by xu   ****************************** */


    ChangeView:{
        screen:ChangeView,
        navigationOptions: ({navigation}) => ({ 
            title:'重新确认关系'
        })
    },

    Person:{
        screen:Person,
        navigationOptions: ({navigation}) => ({ 
            
        })
    },

    // DownLoadView:{
    //     screen:DownLoadView,
    //     navigationOptions: ({navigation}) => ({ 
            
    //     })
    // },
    


    HandsDate:{
        screen:HandsDate,
        navigationOptions: ({navigation}) => ({ 
            title:'手账'
        })
    },

    HandsCcountEdite:{
        screen:HandsCcountEdite2,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },

    GameTypeList:{
        screen:GameTypeList,
    },

    CreateBaby:{
        screen:CreateBabyView,
      },
      Train:{
        screen:TrainView,
        navigationOptions:({navigation}) =>({
          header:null,
        })
      },
      
    Game:{
        screen:Game,
        navigationOptions: ({navigation}) => ({ 
            header:null
        })
    },
    DiscoverInfo:{
        screen:DiscoverInfo,
        navigationOptions: ({navigation}) => ({ 
            header:null
        })
    },
    MoreDIscover:{
        screen:MoreDIscover,
        navigationOptions: ({navigation}) => ({ 
            title:'专题总览',
            headerBackTitle :'  '
        })
    },

    TextInfo:{
        screen:TextInfo,
        navigationOptions: ({navigation}) => ({ 
            header:null,
        })
    },
    
    

    //******************************    add by xu end   ****************************** */

    // UsefulMain:{
    //     screen:UsefulMainView,
    //     navigationOptions: ({navigation}) => ({ 
    //         header: null,
    //     })
    // },

    //  BabyMain:{
    //     screen:AppTabNavigator,
    //     navigationOptions: ({navigation}) => ({ 
    //         header: null, 
    //     })
    //  },
     BabyEdit:{
        screen:BabyEditView,
     },
     SetUp:{
        screen:SetUpView,
        navigationOptions: {
            title:'设置'
        }, 
     },
     SetUpVideo:{
        screen:SetUpVideoView,
        navigationOptions: {
            title:'自动播放视频'
        }, 
     },

     SetQOrWexin:{
        screen:SetQOrWexin,
        navigationOptions: {
            title:'绑定'
        }, 
     },
     
     NoticeMain:{
        screen:NoticeMain,
        navigationOptions: {
            title:'消息',
            headerTitleStyle:{
                color:'white',
                fontSize:15,
            },
            headerStyle:{
                backgroundColor:'rgb(51,51,51)',
            }
        }, 
        
     },

     EditProfile:{
         screen:EditProfileView,
         navigationOptions:{
             //headerBackImage:{},
             title:'编辑资料'
         }
     },
     Growth:{
        screen:GrowthView,
        navigationOptions:{
            title:'基础成长'
        }
    },
    GrowthComplete:{
        screen:GrowthCompleteView,
        navigationOptions:{
            header:null,
        }
    },
    TrainMain:{
        screen:TrainMainView,
    },
    TrainRecommend:{
        screen:TrainRecommendView,
    },
    NoticeMain1:{
        screen:AppTabNoticeNavigator,
        navigationOptions:{
            title:'消息'
        }
    },
    Hands:{
        screen:HandsView,
        
    },

    SelectBg:{
        screen:SelectBg,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },

    SelectImage:{
        screen:SelectImage,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },

    TextInputView:{
        screen:TextInputView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },



    ApplicationList:{
        screen:ApplicationListView,
        navigationOptions:{
            title:'申请列表'
        }
    },
    JoinFamily:{
        screen:JoinFamilyView,
        navigationOptions:{
            title:'加入家庭'
        }
    },
    JoinFamilyTwo:{
        screen:JoinFamilyTwoView,
        navigationOptions:{
            title:'加入家庭'
        }
    },
},{
    initialRouteName: 'BabyMain', // 默认显示界面
    navigationOptions: {
        headerStyle:{
            backgroundColor:'white'
        }
    },
})

export default class MainView extends Component{
    constructor(props) {
        super(props);
        this.mainRef
        this.incodeStr = '';
    }
    
    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount(){
        
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (appState)=>{
        console.log(appState)
        if('active'  === appState){
            this.showIsenter()
        }
    }

    cliccancel = ()=>{
        this.incodeStr = ''
        Clipboard.setString('')
    }
    onclicksure=()=>{
        Clipboard.setString('')
        StoGetOtherFam.show(this.incodeStr)
    }
    showIsenter = async ()=>{
        if(true){
            //
            try {
                var content = await Clipboard.getString();
                var struct = JSON.parse(content); 
                var incode = struct.invitationCode
                this.incodeStr = incode
                Alert.alert('邀请码', '您复制了邀请码 '+incode + ' 需要立即前往吗', [
                    {text: '取消', onPress: () => {  this.cliccancel() }, style: 'cancel'},
                    //{text: '·知道了', onPress: () => console.log('OK Pressed')},
                    {text: '前往', onPress: () => { this.onclicksure()  }},
                  ],{
                    onDismiss: () => {
                        this.cliccancel()
                      }
                  })
            } catch (e) {
            }
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        var reduceHeight = 0
        if(DataUtil.getinstance().getVueStrByp()==='IOS'){
            if(SceneUtils.size.height > 800){
                reduceHeight = 20
            }
        }
        return(
            <View style = {{backgroundColor:'rgb(51,51,51)',flex:1
            }}>
                <View 
                style = {{flex:1}}>
                        <AppStackNavigator
                        ef = {ref => this.mainRef = ref}/>
                </View>
                <View 
                ref = {ref=>{DataUtil.getinstance().setDownView(ref)}}
                style = {{width:SceneUtils.size.width,
                    height:reduceHeight,
                }}>

                </View>
            </View>
            
            
        )
    }
};

