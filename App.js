'use strict';
import React, { 
  Component,
} from 'react';
import {
  StackNavigator,
} from "react-navigation"
import GuideView from './view/guide/GuideView';
import LoginMainView from './view/login/LoginMainView';
import LoginView from './view/login/LoginView';
import MainView from './view/main/MainView';
import NikeNameView from './view/login/NikeNameView';
import JoinFamilyView from './view/login/JoinFamilyView';
import CreateBabyView from './view/login/CreateBabyView';
import TrainView from './view/login/TrainView';
import BabyEditView from './view/baby/BabyEditView';
import GrowthView from './view/growth/GrowthView'
import GrowthCompleteView from './view/growth/GrowthCompleteView'
import AutomaticLogin from './view/login/AutomaticLogin'

const SimpleApp = StackNavigator({
  AutomaticLogin:{
    screen:AutomaticLogin,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  LoginMain:{
    screen:LoginMainView,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  Login:{
    screen:LoginView,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },

  Guide:{
    screen:GuideView,
    navigationOptions: ({navigation}) => ({ 
      header: null, 
    })
  },

  Main:{
    screen:MainView,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  NikeName:{
    screen:NikeNameView,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  JoinFamily:{
    screen:JoinFamilyView,
    navigationOptions:({navigation}) =>({
      header:null,
    })
  },
  CreateBaby:{
    screen:CreateBabyView,
    navigationOptions:({navigation}) =>({
      header:null,
    })
  },
  Train:{
    screen:TrainView,
    navigationOptions:({navigation}) =>({
      header:null,
    })
  },
  BabyEdit:{
    screen:BabyEditView,
    navigationOptions:({navigation}) =>({
      // header:null,
    })
  }
})

export default class App extends Component {
  render(){
    return(
      <SimpleApp />
    );
  }
}


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import RootScreen from "./src/screen/RootScreen";

// export default class App extends Component{
//   render() {
//     return (
//       <RootScreen/>
//     );
//   }
// }

