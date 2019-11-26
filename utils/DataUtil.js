'use strict';
import { Platform, StyleSheet ,NetInfo} from 'react-native';
import NetUtil from './NetUtil'
import {StorageHelper} from './modStruct'
import SceneUtils from './SceneUtils'



//获取所有的缓存数据
class DataUtil{
    static instence = null;
    constructor() {

        //手机
        this.phoneNumber  = null
        //用户信息
        this.userData = null
        //家庭信息相关
        this.mainFamliy = null

        //零时背景颜色
        this.bgColorArry = ['rgb(78,90,127)','rgb(83,90,105)','rgb(123,90,104)','rgb(77,75,78)','rgb(165,183,184)','rgb(182,152,85)']

        //用户信息
        this.accontData = null

        this.qqlist = null
        //
        this.abilityMaxnumber = null 
        this.isSSHH = false
        //网络状态
        this.network_state = 'none'
        //是否用4g
        this.canUs4gViod = false
        //接管最外层view  主要用于适配
        this.mainDownView = null

        this.g4gMode = 1
        this.ismodeSLL = true
    }

    setsimodssl(c){
        this.ismodeSLL = c
    }
    getsimodssl(){
        return this.ismodeSLL
    }

    setg4g(c){
        this.g4gMode = c
    }
    getg4g(){
        return this.g4gMode
    }

    //填满 屏幕拉伸 最外层view设定
    setFullView(){
        this.mainDownView.setNativeProps({   
            height:0,
            width:0,
      });
    }

    //不填满屏幕  最外层view设定
    setNotFullView(){
        if(DataUtil.getinstance().getVueStrByp()==='IOS'){
            if(SceneUtils.size.height > 800){
                this.mainDownView.setNativeProps({   
                    height:20,
                    width:SceneUtils.size.width,
                });
            }
        }
        
    }

    //拿到最外层view的虚拟dom对象
    setDownView(ref){
        this.mainDownView = ref
    }

    //获取是否4g
    getCan4gVido=()=>{
        return this.canUs4gViod
    }

    //设置
    setCan4gVido=(b)=>{
        this.canUs4gViod = b
    }

    //或取网络信息
    getNetInfo = ()=>{

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setnetworkState(connectionInfo)
          });

          NetInfo.addEventListener(
            'connectionChange',
            this.dispatchConnected
          );

        // NetInfo.isConnected.fetch().then().done(() => {
        //     NetInfo.isConnected.addEventListener('change', this.dispatchConnected);
        //   });
    }
    dispatchConnected = (connectionInfo)=>{
        this.setnetworkState(connectionInfo)

    }
    setnetworkState = (state)=>{
        if(state.type === 'wifi'){
            this.network_state = 'wifi'
        }else if(state.type === 'cellular'){
            this.network_state = state.effectiveType
        }else{
            this.network_state = 'none'
        }

    }

    //获取网络状态
    getNetWorkState = ()=>{
        return this.network_state
    }


    //******************* */
    setPhoneNumber(number){
        this.phoneNumber = number
    }
    getPhoneNumber(number){
        return this.phoneNumber
    }
    setISsh(isfff){
        this.isSSHH = isfff
    }
    getISsh(){
        return this.isSSHH
    }
    //上面的将废弃

    //获取bgcolor
    getbgColor(){
        return this.bgColorArry
    }

    //设置用户信息
    setAccont(responseJson){
        this.accontData = responseJson
    }

    //拿到用户信息
    getAccont(){
        return this.accontData
    }
    static getinstance(){
        if(this.instence === null){
            this.instence = new DataUtil()
        }
        return this.instence
    }

    //拿到手机类型
    getVueStrByp(){
        if(Platform.OS === 'ios'){
            return 'IOS'
        }else{
            return 'Android'
        }
    }

    //设置mainfamliy
    setMainFamliy(responseJson){
        this.mainFamliy = responseJson

        // responseJson.id //家庭ID
        // responseJson.invitationCode //分享码
        // responseJson.children //  []对象   所有主家庭宝宝
                //id                    //宝宝ID
                //headshot              //宝宝头像
                //nickname              //宝宝昵称
                //gender                //性别
                //birthdate             //宝宝出生日期
                //createTime            //宝宝创建时间
                //abilityArt            //能力值：艺术
                //abilityDictation      //能力值：听写
                //abilityMath           //能力值：数学
                //abilityCreativity     //能力值：创意
                //abilityOperation      //能力值：动手
                //notebookBackground    //手账封面
                //surveyDone            //是否完成基础训练

        // responseJson.eventList  //[]对象 事件列表
                //id                //事件ID
                //title             //事件主题
                //content           //事件内容
                //background        //事件背景图
                //icon              //事件徽标
                //eventDate         //事件发生时间
        
        // responseJson.memberList      //[]对象  成员列表

                //id                //成员id
                //userId            //成员账户ID
                //childRoles        //[] 对象？  暂时有疑问
                        //childId           //宝宝ID
                        //childRole         //和宝宝的关系
        
        // responseJson.others   // []对象  其他家庭列表   数据格式同上 

    }

    //获取最大能力值数量
    getabilityMaxNumber(){
        return this.mainFamliy.abilityApex
    }

    setroleList(list){
        this.qqlist = list
    }

    getroleListm (){
        return this.qqlist
    }

    static async getroleList(back){
        if(DataUtil.getinstance().getroleListm() === null){
            var ui = DataUtil.getinstance().getUserData().access_token
            let params = {access_token:ui,key:'child_role_list'};
            await NetUtil.get('/maria/system/configurations/getByKey',params,{},['application/json',
            'application/json'],(responseJson) =>{
                DataUtil.getinstance().setroleList(responseJson)
                if(back){
                    back(responseJson)
                }
            })
        }
        back(DataUtil.getinstance().getroleListm())
    }

    //设置userdata
    setUserData(responseJson){
        this.userData = responseJson
        return 
        // responseJson.access_token;  //token
        // responseJson.token_type;    //token 类型
        // responseJson.refresh_token;   //刷新用的token
        // responseJson.expires_in;   //过期时间（单位秒）
        // responseJson.scope;    //
    }
    //获取
    getUserData(){
        return this.userData;
    }
    //获取家庭
    getMainFamliy(){
        return this.mainFamliy;
    }

    setDataByType(type,data){
        var str = String(type)
        StorageHelper.save(str,data)
    }


    getDateByTypeHlep(type,back){
        var str = String(type)
        StorageHelper.get(str,back)
        return null
    }
}
export default DataUtil;






