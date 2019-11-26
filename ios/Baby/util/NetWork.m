//
//  PageUIView.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NetWork.h"
@interface NetWork ()
@end

@implementation NetWork
+(void)sendGetMessage:(void (^)(NSDictionary *dictionary))callback nsArray:(NSArray *)arry pString:(NSString *)pstring childId:(NSString *)childid token:(NSString *)token{
  //需要修改
  NSString *urlString = @"http://47.99.57.113:10001/maria/system/configurations";
  NSURL *url          = [NSURL URLWithString:urlString];
  
  // 3 定义NSURLRquest
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];//注意这个是mutable，说明这个是可变的
  request.URL          = url;
  request.HTTPMethod   = @"get";//默认是 get
  //NSString *bodyString = @"¼r¹}9:";
  //NSData   *bodyData   = [bodyString dataUsingEncoding:NSUTF8StringEncoding];
  //request.HTTPBody     = bodyData;
  
  [NSURLConnection sendAsynchronousRequest:request queue:[[NSOperationQueue alloc] init] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
      if(!connectionError){
        NSLog(@"加载成功");
//        NSString *str1 = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        
        NSDictionary * retDict= nil;
        retDict = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:NULL];
        if(callback){
          callback(retDict);
        }
      }
  }];
  
}
@end
