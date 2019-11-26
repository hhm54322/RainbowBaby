//
//  RNLandsOrPor.m
//  RNLandsOrPor
//
//  Created by HMW on 2018/12/4.
//  Copyright © 2018年 RNLandsOrPor. All rights reserved.
//

#import "RNPageViewBridge.h"
#import <UIKit/UIKit.h>
#import "PageVIewControllor.h"
#import "./model/BridgeStruct.h"

//rn 桥接ios。
@implementation RNPageViewBridge
RCT_EXPORT_MODULE(RNPageViewBridge);
RCT_EXPORT_METHOD(SendRNPageView:(NSString *)urlString childID:(NSString *)child data:(NSString *)data token:(NSString *)token bgid:(NSString *)bgid bookCover:(NSString *)bookCover callback:(RCTResponseSenderBlock)callbackd){
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@" data =====   %@", data);
    NSData *nsdata = [data dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary * retDict= nil;
    retDict = [NSJSONSerialization JSONObjectWithData:nsdata options:kNilOptions error:NULL];
    
    
    UIApplication *app = [UIApplication sharedApplication];
    UIViewController* viewconroller = app.delegate.window.rootViewController;
    
    PageVIewControllor * pc = [[PageVIewControllor alloc] init];
    
    //把传过来的数据全部装到BrigeMod里 给到所有需要的用的data里面去
    struct BrigeMod mod = {};
    mod.prefixUrlString = [urlString copy];
    mod.bgId = [bgid copy];
    mod.childId = [child copy];
    mod.dataString = [data copy];
    mod.token = [token copy];
    mod.notebookCover = [bookCover copy];
    pc._callback = callbackd;
    pc._Brigemod = mod;
    [viewconroller addChildViewController:pc];
    [viewconroller.view addSubview: pc.view];
    [pc initAll];
    //当前页面追加页面
  });
}


@end
