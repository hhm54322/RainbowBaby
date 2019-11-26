/**
 * React Native SelecthandListView
 * Create Data 2018 4 8
 * @ by XJS
 */

import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
    SlidersColorPicker,
    HueGradient,
    SaturationGradient,
    LightnessGradient,
    HueSlider,
    SaturationSlider,
    LightnessSlider
  } from 'react-native-color';


  //废弃
export default class SelecthandListView extends Component {
  constructor(props) {
    super(props);
    this.scrollView;
    this.colorBack = this.props.colorBack

    this.typename = [
        {type:0,typename:'皮肤'},
        {type:1,typename:'图片'},
        {type:2,typename:'文字'},
        {type:3,typename:'日期'},
        {type:4,typename:'笔刷'},
    ]
    //this.typename = ['模板','图片','文字','日期','笔刷']
    this.state = {
        color: tinycolor('#70c1b3').toHsl(),
        type:this.props.type,
        fonts:[{name:'FENGGWY',state:1},{name:'YANGGZA',state:1},{name:'FENGGWY',state:0},{name:'YANGGZA',state:0},{name:'FENGGWY',state:1},{name:'FENGGWY',state:1},{name:'FENGGWY',state:1}],
        imgs:[{name:'add'},{name:'add'},{name:'add'},{name:'add'},{name:'add'},{name:'add'},{name:'add'},{name:'add'},{name:'add'}]
    }
    this.maxindex = this.state.fonts.length;
    this.clickBack = this.props.selectBack;
    this.selecttypeBack = this.props.selecttypeBack;
  }

  onChangeTextBack = ()=>{

  }

  onTouchStarted =()=>{

  }
  componentDidMount() {

  }

_ontouchEnded=(index )=>{
    var indexd = index
    _ontoucheBack = ()=>{
        
        if(this.clickBack){
            this.clickBack(this.state.type,indexd)
        }
    }
    return _ontoucheBack;
}

_ontouchEndedtype=(index )=>{
    var indexd = index
    _ontoucheBack = ()=>{
        this.selecttypeBack(indexd)
        this.setState({
            type:indexd
        })
    }
    return _ontoucheBack;
}


renderTyle(){
    var itemAry = [];
    var number = this.typename.length
    for (var i = 0; i<number; i++) {
        var cc= {}
        var line = {}
        if(this.state.type == this.typename[i].type){
            cc = styles.textStyle
            line = styles.underlineView
        }
      itemAry.push(
          <View 
          key = {i}
          onTouchEnd = {this._ontouchEndedtype(this.typename[i].type)}
          style={[styles.itemtype,styles.viewCenter,line]}
          
          >
          <Text style = {cc}>
              {this.typename[i].typename}
          </Text>
          </View>
      );
    }
     return itemAry;
}
rendershowOne = (i)=>{

    if(this.state.type == 1 || this.state.type == 2 ||this.state.type == 3)
    {
        if(i == 0)
        {
            return(
                <Image  style={styles.imgaddstyle}
                source={require('./add.png')}
                >
                </Image>
            )
        }
    }

    if(this.state.type == 2)
    {
        return(
            <Text  style={[{fontFamily:this.state.fonts[i-1].name}]}
            >
            样式
            </Text>
        )
    }else if(this.state.type == 3){
        return(
            <Text  style={[{fontFamily:this.state.fonts[i-1].name}]}
            >
            2018  1  8
            </Text>
        )
    }else if(this.state.type == 1){
        return(
            <Image  style={styles.imgstyle}
            source={require('../../handAccount/add.jpg')}
            >
            </Image>
        )
    }
}

renderItem = ()=>{

  var itemAry = [];
  for (var i = 0; i<this.maxindex; i++) {
    itemAry.push(
        <View 
        key = {i}
        onTouchEnd = {this._ontouchEnded(i)}
        style={[styles.itemView,styles.viewCenter]}
        >
           {this.rendershowOne(i)}
        </View>
    );
  }

   return itemAry;
}

refrenshowType =(typen,colorn)=>{
    //console.log(colorn);
    var colornew = tinycolor(colorn).toHsl()
    //console.log('refrenshowType  h ====  ' + colornew.h);
    this.setState({
        color:colornew,
        type:typen
    })
}

showColor =()=>{
    if(this.state.type == 2|| this.state.type == 3||this.state.type == 4 )
    {
        return(
            <HueSlider
            style={styles.sliderRow}
            gradientSteps={50}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          ></HueSlider>
        )
    }
}

updateHue = (h)=>{
    this.state.color = {...this.state.color,h}
    var rgb = tinycolor(this.state.color).toString('name')
    if(this.colorBack)
    {
        this.colorBack(rgb);
    }
    this.setState({
        color:this.state.color,
    })
}
  render() {
    return(
      <View style = {[styles.viewCenter,styles.mainView]}>
         <View style = {styles.colorView}>
            {this.showColor()}
         </View>
          <ScrollView style={[styles.scrollviewStyles]}
                    ref={ ref => this.scrollView = ref}
                    horizontal={true}
                    showsHorizontalScrollIndicator  = {false}
                  >
                  {this.renderItem()}
                </ScrollView>
         <View style = {styles.typeView}>
             {this.renderTyle()}
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    sliderRow: {
        alignSelf: 'stretch',
        transform: [{scaleY:0.7},{translateY:-7}]
      },
    mainView : {
        height:130,
        backgroundColor:'white'
    },
    scrollviewStyles:{
        backgroundColor:'orange',
        width :(Dimensions.get('window').width-8),
    },
    viewCenter:{
        justifyContent: 'center',  
        alignItems:'center',  
      },

    itemView:{
        margin:1,
        borderColor:'black',
        borderWidth:1,
        width :(Dimensions.get('window').width-20)/5,
        height:60,
    },
    itemtype:{
        margin:3,
        //borderColor:'black',
        //borderWidth:1,
        width :(Dimensions.get('window').width-40)/5,
        height:30,
    },
    typeView :{
        flexDirection:'row'
    },
    textStyle:{
        fontWeight:'900',
        // textDecorationColor :'rgba(255,0,0,1.0)',
        // textDecorationLine :'underline',
    },
    underlineView:{
        borderBottomWidth:1,
        borderBottomColor:'rgba(30,144,255,1.0)'
    },
    colorView:{
        width :(Dimensions.get('window').width-12),
        height:20,
        //backgroundColor:'red'
    },
    imgstyle:{
        width :(Dimensions.get('window').width-20)/5-5,
        height:60-5,
        resizeMode:'contain'
    },
    imgaddstyle:{
        width :(Dimensions.get('window').width-20)/5-25,
        height:60-25,
        resizeMode:'contain'
    }
});
