'use strict';
import React from 'react';
import RootSibling from 'react-native-root-siblings';
import LoadingView from './LoadingView'
let rootSibling = null;


//显示通讯中的loading图标
function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}



export default class LoadingManager {
    static hid(){
        if (rootSibling) {
            rootSibling.destroy();
            rootSibling = null;
        }
    }
    static show() {
        if(!rootSibling){
            rootSibling = new RootSibling(
                <LoadingView
                isShow = {true}
                />);
        }
        return rootSibling;
    }
}