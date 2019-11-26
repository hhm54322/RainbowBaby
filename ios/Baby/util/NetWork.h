//
//  NetWork.m
//  Baby
//
//  Created by HMW on 2018/12/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//
//  网络类。以后这边s需要的所有的通讯都放这个下面
#import <Foundation/Foundation.h>
typedef void (^SusscBack)(NSDictionary *dictionary);
@interface NetWork:NSObject
+(void)sendGetMessage:(void (^)(NSDictionary *dictionary))callback nsArray:(NSArray *)arry pString:(NSString *)pstring childId:(NSString *)childid token:(NSString *)token;
@end
