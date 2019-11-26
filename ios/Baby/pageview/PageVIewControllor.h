//
//  PageVIewControllor.m
//  PageDemo
//
//  Created by HMW on 2018/12/5.
//  Copyright © 2018年 RNLandsOrPor. All rights reserved.
//


#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import "./model/BridgeStruct.h"


//控制类。控制翻页界面的控制器
@interface PageVIewControllor : UIViewController

@property struct BrigeMod _Brigemod;


-(void)initAll;
@property(nullable, atomic,copy)  RCTResponseSenderBlock _callback;
@end
