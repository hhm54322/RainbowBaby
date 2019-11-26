//
//  InsertStack.m
//  Baby
//
//  Created by HMW on 2018/12/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//


//这个是一个  基于动态数组的  插入栈
//为了实现需求所以加入 ‘插入' 和 '拼接数组'操作，本身栈 是不具备插入操作的
//



//
// ------------------use--------------------
//
//InsertStack *ll = [[InsertStack alloc]init];
//[ll initWith ];
//
//for(int i = 0;i<10;i++){
//  [ll push:[NSNumber numberWithInt:i]];
//}
//NSArray *arryd = [[NSArray alloc]init];
//arryd = [arryd arrayByAddingObject:[NSNumber numberWithInt:100]];
//arryd = [arryd arrayByAddingObject:[NSNumber numberWithInt:200]];
//arryd = [arryd arrayByAddingObject:[NSNumber numberWithInt:300]];
////arryd[2];
//
//[ll insert:arryd isReverse:false];
//NSInteger size = [ll getSize];
//for(int i = 0;i<size;i++){
//  NSNumber *isd = [ll pop];
//  int myInt = [isd intValue];
//  NSLog(@"myInt  =====   %d",myInt);
//}
//
// ------------------use end--------------------



#import <Foundation/Foundation.h>
@interface InsertStack< __covariant ObjectType>:NSObject

@property(nonatomic,strong,nonnull)NSMutableArray<ObjectType> *_dynamicarray;

-(void)initWith;  //初始化

-(NSInteger)getSize;      //返回大小

-(BOOL)isEmpty;       //是否为空

-(void)clean;     //清空

-(void)push:(ObjectType)obj;      //pushback

-(ObjectType)peek;      //查看栈顶元素

-(ObjectType)pop;       //返回栈顶元素  pop之后

-(void)insert:(NSArray<ObjectType> *)arry isReverse:(BOOL)isReverse;
                      //根据新的数据重新跟新栈
@end
