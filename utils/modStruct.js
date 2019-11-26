
import {
    AsyncStorage,
  } from 'react-native';


  //数据持久化

  //获取数据
  export class StorageHelper {
    static get(key,callback) {
        return AsyncStorage.getItem(key).then((value) => {
                    if(value){
                        var jsonValue = JSON.parse(value);
                        callback(jsonValue);
                    }else{
                        callback(null);
                    }
            });
        }

        //存入数据
    static save(key, value) {
        //console.log('JSON.stringify(value)  = = = =    '+JSON.stringify(value))
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    //删除数据
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

  }
