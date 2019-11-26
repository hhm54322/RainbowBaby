import {
    Alert,
} from 'react-native';


import LoadingManager from './LoadingManager'
import NetCode from './NetCode'
import DataUtil from './DataUtil'
import {StorageHelper} from './modStruct'



//网络服务    
//新加接口需要 写到里面

  /**
     * data:{
     * url          //如果是动态url需要自己写入
     * params          //拼接到url 后面的？的参数传入
     * params1          //body参数
     * headers          //请求头
     * callback    //用es6表达式        //成功后的回调  可以不要
     * errorBack        //请求失败后的回调   也可以不要
     * }
     */


let NetService = {

    //拿取配置和更新信息
    async sendConfigurations(data){
        return await XH.get('/maria/system/configurations',data)
    },

    //发送验证码
    async sendsms_code_generating(data){
        return await XH.post('/maria/account/services/sms_code_generating',data)
    },

    //注册
    async sendregistration(data){
        return await XH.post('/maria/account/services/registration',data)
    },

    //登录
    async sendtoken(data){
        return await XH.post('/maria/oauth/token',data)
    },

    //家庭消息
    async sendfamily(data){
        return await XH.get('/maria/account/family',data)
    },

    //获取用户信息
    async sendinfo(data){
        return await XH.get('/maria/account/info',data)
    },

    //check微信
    async sendcheck_wechat(data){
        return await XH.get('/maria/account/services/check_wechat',data)
    },

    //创建宝宝
    async sendchildrenCreate(data){
        return await XH.post('/maria/account/family/main/children',data)
    },




    //czjl
    async sendrecharge(data){
        return await XH.get('/maria/recharge',data)
    },

    //yanzhengshangmian
    async sendfeedback(data){
        return await XH.post('/maria/recharge/feedback',data)
    },

    //通知
    async sendannouncement(data){
        return await XH.get('/maria/announcement',data)
    },

    //消息
    async sendnotices(data){
        return await XH.get('/maria/notices',data)
    },

    //提交建议
    async sendsuggestion(data){
        return await XH.post('/maria/suggestion',data)
    },

    //提交信息
    async sendinfoput(data){
        return await XH.put('/maria/account/info',data)
    },

    //查看孩子信息
    async sendchild(data){
        return await XH.get('/maria/child',data)
    },

    //训练信息
    async sendtrainings(data){
        return await XH.get('/maria/trainings',data)
    },

    //训练提交
    async sendtrainingsPost(data){
        return await XH.post(data.url,data)
    },

    //mp3
    async sendboardcast(data){
        return await XH.get('/maria/boardcast',data)
    },

    //广告
    async sendadvertisement(data){
        return await XH.get('/maria/advertisement',data)
    },

    //文章详情
    async sendarticlesOrtext(data){
        return await XH.get(data.url,data)
    },

    //文章列表
    async sendarticles(data){
        return await XH.get('/maria/articles',data)
    },

    //视频列表
    async sendvideos(data){
        return await XH.get('/maria/videos',data)
    },

    //题列表
    async sendsurvey(data){
        return await XH.get('/maria/survey',data)
    },

    //答题提交
    async sendsurveyPost(data){
        return await XH.post(data.url,data)
    },

    //其他游戏推荐
    async sendotherGame(data){
        return await XH.get(data.url,data)
    },

    //游戏列表
    async sendGameListbyType(data){
        return await XH.get(data.url,data)
    },

    //游戏
    async sendGames(data){
        return await XH.get('/maria/categories/games',data)
    },

    //游戏标签
    async sendPblist(data){
        return await XH.get(data.url,data)
    },

    //gameinfo
    async sendGameInfo(data){
        return await XH.get(data.url,data)
    },

    //发现详情
    async senddicaverInfo(data){
        return await XH.get(data.url,data)
    },

    async sendtopics(data){
        return await XH.get('/maria/topics',data)
    },


    //主家庭申请列表
    async sendapplications(data){
        return await XH.get('/maria/account/family/main/applications',data)
    },

    //主家庭审核
    async sendapplicationsSH(data){
        return await XH.patch(data.url,data)
    },

    //编辑宝宝
    async sendBabyEditer(data){
        return await XH.put(data.url,data)
    },

    //添加家庭成员
    async sendmembers(data){
        return await XH.post('/maria/account/family/main/members',data)
    },

    //退出家庭
    async sendquit(data){
        return await XH.post(data.url,data)
    },

    //主动删除宝宝
    async senddeleteApplications(data){
        return await XH.post('/maria/account/family/main/applications',data)
    },

    //被动删除宝宝
    async sendqdeleteApplications(data){
        return await XH.patch(data.url,data)
    },

    //修改关系
    async sendChage(data){
        return await XH.post(data.url,data)
    },

    //其他家庭查询
    async sendfamilyOther(data){
        return await XH.get('/maria/family',data)
    },

    //加入家庭
    async sendjoinfamily(data){
        return await XH.post(data.url,data)
    },

    //主家庭删除成员
    async sendFmotherDelete(data){
        return await XH.delete(data.url,data)
    },

    //手账详情
    async sendPageInfo(data){
        return await XH.get(data.url,data)
    },




    


    
    


    
    

    




    

    





    

    

    

    
    



    

    

    

    

    


    

    

    

    

    

    

    

    logInMessgeBack(responseJson){
        DataUtil.getinstance().setUserData(responseJson)
        var mode  = {
            access_token:responseJson.access_token,
            refresh_token:responseJson.refresh_token
        }
        StorageHelper.save('pStruct',mode)

    },


    async doRefrenShowToken(func){
        var mod = DataUtil.getinstance().getUserData()
        let params = {'client_id':'app','client_secret':'xQpBi3he8fGXfnEecKKlzUa7ibvhBNKP',
        'grant_type': 'refresh_token','refresh_token':mod.refresh_token};
        var mod1 = {
            params:params,
            params1:{},
            headers:['application/json','application/json'],
            callback:NetService.logInMessgeBack,
            errorBack:()=>{

            }
        }
        await NetService.sendtoken(mod1) 
        if(func){
            func()
        }
    },
    

    // do 操作  异步实现  异步请求
    async do(func,data){
        var code = await func(data)
        if(code != NetCode.ok && data.errorBack){
            data.errorBack()
            return
        }
        if(code === NetCode.NetError){
            NetService.errordo(func,data)
            return
        }
        if(code === NetCode.refrenshowToken){
            NetService.doRefrenShowToken(()=>{
                data.params.access_token = DataUtil.getinstance().getUserData().access_token
                NetService.do(func,data)
            })
            return
        }
    },

    //doarry 异步调用 同步阻塞  再需要长时间通许的情况下  显示loading界面
    //同时可以以临时数组的方式  将一连串的请求都请求结束之后 再关闭loading界面
    //3条消息 a b c 的发送流程是 根据数组顺序发送，
    // a -> a callback ->b -> bcllback ->c -> c callback      避免了地狱回调？？？貌似不行，，有些场景还是需要callback嵌套
    //没有用promise的原因   界面只需要调用方法和知道结果就行   
    //参数  arry  发送消息函数的数组 ，dataarry 对象数组   back 所有消息发送完成之后的回调可以不写（和每一条消息自己的回调不冲突）
    // 可以不写
    async doArry(arry,dataArry,back){
        LoadingManager.show()
        var l = arry.length
        var dl = dataArry.length
        if(l != dl){
           return
        }
        for(var i = 0;i<l;i++){
            var code = await arry[i](dataArry[i])
            if(code != NetCode.ok && dataArry[i].errorBack){
                dataArry[i].errorBack()
                LoadingManager.hid()
                return
            }
            if(code === NetCode.NetError){
                NetService.errorArry(arry,dataArry,back)
                return
            }
            if(code === NetCode.refrenshowToken){
                NetService.doRefrenShowToken(()=>{
                    for(var i = 0;i<l;i++){
                       var data =  dataArry[i]
                       data.params.access_token = DataUtil.getinstance().getUserData().access_token
                    }
                    NetService.doArry(arry,dataArry,back)
                })
                return
            }
        }
        LoadingManager.hid()
        if(back){
            back()
        }
    },

    errorArry(arry,dataArry,back){
        Alert.alert('网络异常', '您的网络异常', [
            {text: '重新加载', onPress: () => { 
                
                NetService.doArry(arry,dataArry,back)
            }},
          ],{
            cancelable: false,
            onDismiss: () => {
              }
          })
    },
    errordo(func,data){
        Alert.alert('网络异常', '您的网络异常', [
            {text: '重新加载', onPress: () => { 
                NetService.do(func,data)
            }},
          ],{
            cancelable: false,
            onDismiss: () => {
              }
          })
    }

}

export default NetService;