'use strict';
import React from 'react';
import RootSibling from 'react-native-root-siblings';
import FloatTextContainer from './FloatTextContainer';
import JoinFamilyTwoView2 from '../view/baby/JoinFamilyTwoView2'

let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

export default class StoGetOtherFam {
    static show(id) {
        if(!rootSibling){
            rootSibling = new RootSibling(
                <JoinFamilyTwoView2
                    id={id}
                    destroy={() => destroy()}
                />);
        }
        return rootSibling;
    }
}