//
//  ModDateAndImage.m
//  Baby
//
//  Created by HMW on 2018/12/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ModStruct.h"
#import "BridgeStruct.h"


@interface ModDateAndImage : NSObject

-(void)initmod:(NSArray<ModStruct*>*)leftarry rightarry:(NSArray<ModStruct*>*)rightarry centerdata:(ModStruct*)data;

@property struct BrigeMod _Brigemod;

//查看左边
-(ModStruct*)peekLeft;

//查看右边
-(ModStruct*)peekRight;

//pop左边
-(ModStruct*)popLeft;

//pop右边
-(ModStruct*)popRight;

//左边push
-(void)pushLeft:(ModStruct*)modstruct;

//右边push
-(void)pushRight:(ModStruct*)modstruct;

//左边插入
-(void)insertLeft:(NSArray<ModStruct*>*)arry;

//右边插入
-(void)insertRight:(NSArray<ModStruct*>*)arry;

//返回当前的现实结构
-(ModStruct *)getCourenStruct;

//左移
-(void)leftShift;

//右移
-(void)rightShift;

@end
