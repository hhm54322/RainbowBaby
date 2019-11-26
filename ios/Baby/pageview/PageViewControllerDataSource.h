//
//  PageViewControllerDataSource.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//
//
//
//```````````dataSource and delegate
//

#import <UIKit/UIKit.h>
#import "model/ModDateAndImage.h"
#import "./model/BridgeStruct.h"

@interface PageViewControllerDataSource : NSObject

@property  int currentIndex;
@property  NSArray* vcArry;
@property  CGRect r;


@property struct BrigeMod _Brigemod;


-(UIViewController*)showCenter;

-(UIViewController*)getUIViewController:(ModStruct*)mod;

-(void)initNSObject:(UIPageViewController*)_UIPageViewController;

-(void)latterController;

-(void)previousController;
@end
