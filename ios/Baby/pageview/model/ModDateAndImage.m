//
//  PageUIView.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ModDateAndImage.h"
#import "InsertStack.h"
#import "../../util/NetWork.h"
@interface ModDateAndImage ()

@property ModStruct * _courentStruct;

@property InsertStack* _leftStack;

@property InsertStack* _rightStack;

@end

@implementation ModDateAndImage

-(void)initmod:(NSArray<ModStruct*>*)leftarry rightarry:(NSArray<ModStruct*>*)rightarry
 centerdata:(ModStruct*)data{
  
//  NSLog(@" childId  ===   %@", self._Brigemod.bgId);
//  NSLog(@" childId  ===   %@", self._Brigemod.childId);
//  NSLog(@" dataString  ===   %@", self._Brigemod.dataString);
//  NSLog(@" prefixUrlString  ===   %@", self._Brigemod.prefixUrlString);
//  NSLog(@" token  ===   %@", self._Brigemod.token);
  self._leftStack = [[InsertStack alloc]init];
  [self._leftStack initWith];
  
  self._rightStack = [[InsertStack alloc]init];
  [self._rightStack initWith];
  
  [self insertLeft:leftarry];
  [self insertRight:rightarry];
  
  self._courentStruct = data;
  
//  NetWork * net = [[NetWork alloc]init];
//  [net sendGetMessage:^(NSDictionary *dic){
//
//  }];
  
//  NSDate *date=[NSDate date];
//  NSLog(@"date  ======  %@", date);
  
  //测试
  NSDate* date = [NSDate dateWithTimeIntervalSinceNow:0];//获取当前时间0秒后的时间
  NSTimeInterval timed=[date timeIntervalSince1970]*1000;// *1000 是精确到毫秒，不乘就是精确到秒
  NSString *timeString = [NSString stringWithFormat:@"%.0f", timed];
  NSLog(@"timeString  ====   %@", timeString);
  
  
  NSDate *detailDate=[NSDate dateWithTimeIntervalSince1970:timed/1000];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init]; //实例化一个NSDateFormatter对象
  //设定时间格式,这里可以设置成自己需要的格式
  [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss SS"];
  NSString *currentDateStr = [dateFormatter stringFromDate: detailDate];
  
  NSLog(@"currentDateStr  ====   %@", currentDateStr);
  
}


-(void)sendLeftMessag{
//  [NetWork sendGetMessage:^(NSDictionary *dictionary) {
//    //dictionary;
//  } nsArray:nil pString:self.prefixUrlString childId:self.childId token:self.token];
  
}

-(void)sendRightMessag{
//  [NetWork sendGetMessage:^(NSDictionary *dictionary) {
//    //dictionary;
//  } nsArray:nil pString:self.prefixUrlString childId:self.childId token:self.token];
  
}



-(ModStruct *)peekLeft{
  return [self._leftStack peek];
}

-(ModStruct*)peekRight{
  return [self._rightStack peek];
}

-(ModStruct*)popLeft{
  return [self._leftStack pop];
}

-(ModStruct*)popRight{
  return [self._rightStack pop];
}

-(void)pushLeft:(ModStruct*)modstruct{
  [self._leftStack push:modstruct];
}

-(void)pushRight:(ModStruct*)modstruct{
  [self._rightStack push:modstruct];
}

-(void)insertLeft:(NSArray *)arry{
  [self._leftStack insert:arry isReverse:false];
}

-(void)insertRight:(NSArray *)arry{
  [self._rightStack insert:arry isReverse:true];
}


-(void)leftShift{
  ModStruct *mode = [self._rightStack pop];
  if( self._courentStruct == nil && mode == nil){
    return;
  }
  if(self._courentStruct != nil){
    [self._leftStack push:self._courentStruct];
  }
  self._courentStruct = mode;
}

-(void)rightShift{
  ModStruct *mode = [self._leftStack pop];
  if( self._courentStruct == nil && mode == nil){
    return;
  }
  if(self._courentStruct != nil){
    [self._rightStack push:self._courentStruct];
  }
  self._courentStruct = mode;
}

-(ModStruct *)getCourenStruct{
  return self._courentStruct;
}



@end
