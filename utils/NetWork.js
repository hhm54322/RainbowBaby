

import NetCode from './NetCode'

import {Error} from './Error'
class NetConfig{
    static rootUrl = 'http://47.99.57.113:10001'
}

//网络fetch封装  get post delet 等的具体实现
class NetWork{

     static rootUrl = 'http://47.99.57.113:10001'


    //正式47.99.36.251:10001
    //static rootUrl = 'http://47.99.36.251:10001'

    async do(dofunck,data){
        while(true){
            var rStruct = await dofunck()
            console.log(rStruct)
            var code = rStruct.code
            var res = rStruct.resback
            if(code === NetCode.ok){
                
            }else if(code === NetCode.NetError){
                
            }else if(code === NetCode.htError){
                //链接错误
                
                if(res.status === NetCode.refrenshowToken){
                    var errback = JSON.parse(res._bodyText)
                    if( 'error' in errback){
                        if(errback.error === 'invalid_token'){
                            return NetCode.refrenshowToken
                        }
                    }
                }else{
                    Error.errorfloat(res)
                }
                
            }   
            
            return code
        }
        
    }

    static async get(url,data){
        var code = NetCode.NetError
        var resback = {}
        let netWork = new NetWork()
        code = await netWork.do(async ()=>{
            url = NetWork.rootUrl + url
            url = NetWork.getUrlByparams(url,data.params)
            console.log(url)
            try {
                let res = await fetch(url,{
                    method: 'GET',
                    headers:{
                        'Content-Type' : data.headers[0],
                        'Accept' : data.headers[1],
                    },
                    //body:JSON.stringify(data.params1),
                })
                console.log(res)
                resback = res
                if(res.ok === true){
                    let responseJson = {}
                    if(res._bodyText !== ''){
                        responseJson = await res.json();
                    }
                    if(data.callback){
                        data.callback(responseJson)
                    }
                    code = NetCode.ok
                }else{
                    //异常处理
                    console.log(res.status)
                    code = NetCode.htError
                }
            }catch (error) {
                console.log(error)
                code = NetCode.NetError
            }
            return {code:code,resback:resback}
        }
        ,data)

        return code
    }



    static async post(url,data){
        var code = NetCode.NetError
        var resback = {}
        let netWork = new NetWork()
        console.log(data)
        code = await netWork.do(async ()=>{
            url = NetWork.rootUrl + url
            url = NetWork.getUrlByparams(url,data.params)
            console.log(url)
            try {
                let res = await fetch(url,{
                    method: 'POST',
                    headers:{
                        'Content-Type' : data.headers[0],
                        'Accept' : data.headers[1],
                    },
                    body:JSON.stringify(data.params1),
                })
                console.log(res)
                resback = res
                if(res.ok === true){
                    let responseJson = {}
                    if(res._bodyText !== ''){
                        responseJson = await res.json();
                    }
                    if(data.callback){
                        console.log(responseJson)
                        data.callback(responseJson)
                    }
                    code = NetCode.ok
                }else{
                    //异常处理
                    console.log(res.status)
                    code = NetCode.htError
                }
            }catch (error) {
                console.log(error)
                code = NetCode.NetError
            }
            return {code:code,resback:resback}
        }
        ,data)

        return code
    }



    static async patch(url,data){
        var code = NetCode.NetError
        var resback = {}
        let netWork = new NetWork()
        code = await netWork.do(async ()=>{
            url = NetWork.rootUrl + url
            url = NetWork.getUrlByparams(url,data.params)
            try {
                let res = await fetch(url,{
                    method: 'PATCH',
                    headers:{
                        'Content-Type' : data.headers[0],
                        'Accept' : data.headers[1],
                    },
                    body:JSON.stringify(data.params1),
                })
                console.log(res)
                resback = res
                if(res.ok === true){
                    let responseJson = {}
                    if(res._bodyText !== ''){
                        responseJson = await res.json();
                    }
                    if(data.callback){
                        data.callback(responseJson)
                    }
                    code = NetCode.ok
                }else{
                    //异常处理
                    console.log(res.status)
                    code = NetCode.htError
                }
            }catch (error) {
                console.log(error)
                code = NetCode.NetError
            }
            return {code:code,resback:resback}
        }
        ,data)

        return code
    }


    static async put(url,data){
        var code = NetCode.NetError
        var resback = {}
        let netWork = new NetWork()
        code = await netWork.do(async ()=>{
            url = NetWork.rootUrl + url
            url = NetWork.getUrlByparams(url,data.params)
            try {
                let res = await fetch(url,{
                    method: 'PUT',
                    headers:{
                        'Content-Type' : data.headers[0],
                        'Accept' : data.headers[1],
                    },
                    body:JSON.stringify(data.params1),
                })
                console.log(res)
                resback = res
                if(res.ok === true){
                    let responseJson = {}
                    if(res._bodyText !== ''){
                        responseJson = await res.json();
                    }
                    if(data.callback){
                        data.callback(responseJson)
                    }
                    code = NetCode.ok
                }else{
                    //异常处理
                    console.log(res.status)
                    code = NetCode.htError
                }
            }catch (error) {
                console.log(error)
                code = NetCode.NetError
            }
            return {code:code,resback:resback}
        }
        ,data)

        return code
    }


    static async delete(url,data){
        var code = NetCode.NetError
        var resback = {}
        let netWork = new NetWork()
        code = await netWork.do(async ()=>{
            url = NetWork.rootUrl + url
            url = NetWork.getUrlByparams(url,data.params)
            try {
                let res = await fetch(url,{
                    method: 'DELETE',
                    headers:{
                        'Content-Type' : data.headers[0],
                        'Accept' : data.headers[1],
                    },
                    body:JSON.stringify(data.params1),
                })
                console.log(res)
                resback = res
                if(res.ok === true){
                    let responseJson = {}
                    if(res._bodyText !== ''){
                        responseJson = await res.json();
                    }
                    if(data.callback){
                        data.callback(responseJson)
                    }
                    code = NetCode.ok
                }else{
                    //异常处理
                    console.log(res.status)
                    code = NetCode.htError
                }
            }catch (error) {
                console.log(error)
                code = NetCode.NetError
            }
            return {code:code,resback:resback}
        }
        ,data)

        return code
    }


    static getUrlByparams = (url,params)=>{
        if (params && JSON.stringify(params)!== '{}') {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            console.log(paramsArray)
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else{
                url += '&' + paramsArray.join('&')
            }
        }
        return url
    }

}

export default NetWork