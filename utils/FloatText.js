'use strict';
import React from 'react';
import RootSibling from 'react-native-root-siblings';
import FloatTextContainer from './FloatTextContainer';


//浮动文字 直接掉用show方法然后传入字符串即可
let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

export default class FloatText {
    static show(msg) {
        if(!rootSibling){
            rootSibling = new RootSibling(
                <FloatTextContainer
                    msg={msg}
                    destroy={() => destroy()}
                />);
        }
        return rootSibling;
    }
}