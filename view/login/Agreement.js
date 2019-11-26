'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
  
} from 'react-native';

import RootSibling from 'react-native-root-siblings';
import SceneUtils from '../../utils/SceneUtils';


let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

//协议 纯显示界面
export default class Agreement extends Component {

    //调用此方法显示
    static showAgreement(){
        if(!rootSibling){
            rootSibling = new RootSibling(
                <Agreement/>);
        }
        return rootSibling;
    }

    constructor(props) {
      super(props);
      this.canclose = true
    }
    componentDidMount(){
    }

    //关闭
    onClose = ()=>{
        destroy()
    }

    render (){
        
        return (
            <Modal
            animationType='none'
            visible={true}
            transparent = {true}
            onRequestClose  = {
                ()=>{
                    Platform.OS ==='android'?PropTypes.func.isRequired:PropTypes.func
                }
            }
        > 
            <View 
                onTouchEnd  ={()=>{
                    console.log('onTouchEnd')
                    if(this.canclose){
                        this.onClose()
                    }
                    this.canclose = true
                }}
                onTouchMove  = {()=>{
                    this.canclose = false
                    console.log('onTouchMove')
                }}
                style={{flex:1,
                    alignItems:'center',justifyContent:'center',
                backgroundColor:'rgba(51,51,51,0.7)',}}>
                <View 
                    style  ={{padding:15,width:SceneUtils.size.width*0.85,
                        alignItems:'center',justifyContent:'center',
                        backgroundColor:'rgba(51,51,51,1)',
                        borderLeftWidth:4,
                        borderTopWidth:4,
                        borderRightWidth:4,
                        borderColor:'rgb(70,70,70)'
                    }}
                >
                    <Text style = {{fontSize:23,color:'rgb(240,240,240)'}}>{'用户协议'}</Text>
                </View>
                <View style = {{width:SceneUtils.size.width*0.85,
                    height:SceneUtils.size.height*0.4,
                    borderWidth:4,
                    borderColor:'rgb(70,70,70)',
                    backgroundColor:'rgba(51,51,51,1)'
                }}>
                    <ScrollView
                        horizontal = {false}
                        showsVerticalScrollIndicator = {false}
                    >
                        <View style = {{
                            width:SceneUtils.size.width*0.85-10,
                            marginTop:12,
                            marginBottom:12,
                            //alignItems:'center',justifyContent:'center',
                        }}>
                            <Text style = {[styles.centerText,{fontSize:20}]}>
                                {'彩虹宝宝隐私权条款'}
                            </Text>
                            <Text style  ={[{marginTop:20,},styles.leftMargin]}>
                                {'    《彩虹宝宝》是一款集智能育儿、寓教于乐、游戏社区、精美手账于一体的一站式家庭育儿平台，在您使用《彩虹宝宝》平台（以下简称“我们”）提供的服务时，我们将按法律法规要求，采取相应安全保护措施，尽可能保护您的个人信息安全可控。鉴此，我们制定了《彩虹宝宝》用户隐私权政策》，向您详细阐述我们如何收集、存储、使用、共享和保护您的个人信息。我们建议您仔细阅读并理解本隐私权政策全部内容，在确认充分了解并同意后使用《彩虹宝宝》。如果您或您的监护人不同意本隐私权政策的任何内容，您应该立即停止使用。当您开始使用《彩虹宝宝》平台，即表示您或您的监护人已经同意我们按照本政策来收集、保存、使用、共享您的个人信息。'}
                            </Text>

                            <Text style  ={[{marginTop:20,},styles.leftMargin]}>
                                {'本隐私权政策主要包括以下内容：\n  1 我们收集的信息；\n  2信息的存储；\n  3 信息安全；\n  4 我们将如何使用信息；\n  5 个人信息的共享、转让、公开披露； \n  6 您的权利；\n  7 未成年人保护；\n  8 变更和修订说明。'}
                            </Text>

                            <Text style  ={[{marginTop:20,},styles.leftMargin]}>
                                {'1 我们收集的信息 \n\n在您使用《彩虹宝宝》服务的过程中，我们会按如下方式收集、储存您主动提供或因为使用服务而产生的信息，用以向您提供服务、优化我们的服务以及保障您的帐号安全：\n\n1.1 当您注册《彩虹宝宝》时，我们会收集您的昵称、头像、手机号码，收集这些信息是为了帮助您完成《彩虹宝宝》注册，保护您的《彩虹宝宝》帐号安全。手机号码属于敏感信息，收集此类信息是为了满足相关法律法规的网络实名制要求。若您不提供这类信息，您可能无法正常使用我们的服务。您还可以根据自身需求选择填写性别、地区等信息。\n\n1.2 为保障您正常使用我们的服务，我们会收集您的设备型号、操作系统、唯一设备标识符、登录IP地址、《彩虹宝宝》版本号、接入网络的方式和类型、设备加速器（如重力感应设备）、操作日志等信息，这类信息是为提供服务必须收集的基础信息。\n\n1.3 当您创建宝宝时，我们会收集宝宝的小名、生日、性别、头像、以及亲关系，并可能访问和检测您的本地相册。检测由机器进行，结果仅用于为您推荐合适的宝宝照片。\n\n除上述信息外，我们还可能为了提供服务或改进服务质量而向您收集其他信息，包括您与我们的客户服务团队联系时提供的个人信息，以及您与《彩虹宝宝》合作伙伴互动时提供的相关信息。\n\n为了给您提供更好的服务，《彩虹宝宝》的关联方、合作伙伴会依据法律的规定，在征得您同意的前提下，向《彩虹宝宝》分享您的个人信息。'}
                            </Text>


                            <Text style  ={[{marginTop:20,},styles.leftMargin]}>
                                {'2 信息的存储\n\n2.1 信息存储的地点\n\n   《彩虹宝宝》收集的您的信息将保存在《彩虹宝宝》服务器上，这些信息可能传送至您所在国家、地区或《彩虹宝宝》收集信息所在地并在该地被访问、存储和展示。\n\n2.2 信息存储的期限\n\n   当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并提供信息批量导出工具，在合理期限内删除您的个人信息或进行匿名化处理。'}
                            </Text>

                            <Text style  ={[{marginTop:20,},styles.leftMargin]}>
                                {'3 信息安全\n\n   我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。\n\n   我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。例如，我们会使用加密技术来存储用户个人信息，数据传输过程中使用加密传输协议。\n\n   我们建立专门的管理制度、流程和组织以保障信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务。\n\n   但请您理解，由于技术的限制以及可能存在的各种恶意手段，即使竭尽所有安全措施，也无法保障信息百分之百的安全，您同意并理解，您接入我们的服务所用的系统和通讯网络时，可能因我们可控范围外的因素而出现问题。如您已经删除某项信息，但该类信息可能通过某种手段恢复。若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以推送通知、公告等形式告知您。\n\n4 我们将如何使用信息\n\n   4.1 我们可能将通过某些功能所收集的信息用于我们的其他服务。例如，我们可能将在您使用我们一项功能时我们收集的信息，在另一服务中用于向您提供特定内容，包括但不限于育儿内容推荐、展示广告等。\n\n   4.2 为了确保服务的安全，帮助我们更好地了解程序的运行情况，我们会对我们的服务使用情况进行统计，并可能会与公众或第三方分享这些统计信息，但这些统计信息不包含您的任何身份识别信息。\n\n   4.3 我们会向您发送信息和通知，包括但不限于为保证服务完成所必须的验证码、使用产品或服务时所必要的推送通知、运营和市场活动等，如您不希望继续接收上述信息，可以根据信息中提供的退订方式予以退订。\n\n   4.4 凡是超出与“我们收集的信息”条款声称的目的具有直接或合理关联的范围使用您的个人信息，我们会再次向您告知并征得您的明示同意。\n\n5 个人信息的共享、转让、公开披露\n\n   我们将遵守相关法律法规，对您的个人信息予以保密。除以下情况外，我们不会向其他人共享您的个人信息：\n\n5.1 事先获得您的同意或授权。\n\n5.2 只有共享您的个人信息，才能提供您所需要的服务。\n\n5.3 您在通过《彩虹宝宝》使用第三方服务时，我们会按照“我们收集的信息”条款列明的共享内容与提供服务的第三方共享您的个人信息。\n\n5.4 为维护用户合法权益，在协助与您有关的交易纠纷或争议时，我们可能向您的交易相对方或存在利害关系的第三方提供解决交易纠纷或争议所必需的信息。\n\n5.5 在法律要求或允许的范围内，为了保护社会公共利益、财产或安全而提供必要的信息。\n\n   对我们与之共享个人信息的公司、组织和个人，我们会与之签署严格的保密协议，要求他们按照我们的说明、本隐私政策及其他任何相关的保密和安全措施来处理个人信息。\n\n   如发生收购、兼并、重组等变更，我们会要求变更后的主体依然遵守本隐私政策约定，履行原有责任及义务。如变更后的主体需要变更个人信息使用目的，我们会要求其事先获得您的明示同意。\n\n6 您的权利\n\n   在您使用《彩虹宝宝》期间，为了您可以更加便捷地访问、更正、删除您的个人信息，我们在产品设计中为您提供了相应的操作设置，您可以参考下面的指引进行操作。此外，我们还设置了投诉举报渠道，您的意见将会得到及时的处理。\n\n7 未成年人保护\n\n   我们非常重视对未成年人个人信息的保护。根据相关法律法规规定，若您是18周岁以下的未成年人，您的监护人需要仔细阅读本隐私权政策并同意您依照本政策使用《彩虹宝宝》平台。\n\n8 隐私政策的适用范围\n\n   除某些特定服务外，我们所有的服务均适用本《隐私政策》。这些特定服务将适用特定的隐私政策。针对某些特定服务的特定隐私政策，将更具体地说明我们在该等服务中如何使用您的信息。该特定服务的隐私政策构成本《隐私政策》的一部分。如相关特定服务的隐私政策与本《隐私政策》有不一致之处，适用该特定服务的隐私政策。\n\n9 隐私政策的使用例外\n\n   我们的服务可能包括或链接至第三方提供的社交媒体或其他服务（包括网站）。例如：\n\n  1）您利用 “分享”键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息，并可能在您的电脑装置cookies，从而正常运行上述功能；\n\n  2）我们通过广告或我们服务的其他方式向您提供链接，使您可以接入第三方的服务或网站。\n\n  该等第三方社交媒体或其他服务可能由相关的第三方或我们运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何个人信息），须受该第三方的服务条款及隐私政策（而非《用户服务协议》或本《隐私政策》）约束，您需要仔细阅读其条款。本《隐私政策》仅适用于我们所收集的信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。\n\n10 变更和修订说明\n\n10.1 若《彩虹宝宝》平台发生以下变化，我们将及时对本隐私权政策进行修订：\n\n  1）《彩虹宝宝》平台业务功能发生变更；\n\n  2）用户个人信息的使用规则发生变更；\n\n  3）我们的联络方式及投诉渠道发生变更；\n\n  4）发生其他可能影响用户个人信息安全或影响用户隐私权利的变更等。\n\n 10.2 隐私权政策修订后，我们会在版本更新时以推送或弹窗形式向您展示。\n\n 10.3 未经您的明确同意，我们不会削减您按照本隐私权政策所享受的权利。'}
                            </Text>

                            
                        </View>
                        </ScrollView>
                    </View>
                </View>
        </Modal>
        )
    }
}


var styles = StyleSheet.create({
    centerText:{
        alignSelf:'center',
        color:'rgb(230,230,230)'
    },
    leftMargin:{
        marginLeft:7,
        color:'rgb(230,230,230)'
    },
});