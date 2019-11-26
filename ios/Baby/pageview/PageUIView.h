//
//  PageUIView.m
//  Baby
//
//  Created by HMW on 2018/12/11.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface PageUIView : UIView

@property(nonatomic, strong)IBOutlet  UIImageView *backView;
@property(nonatomic, strong)IBOutlet  UIButton *leftBtn;
@property(nonatomic, strong)IBOutlet  UIButton *rightBtn;
@property(nonatomic, strong)IBOutlet  UIButton *btfBtn;
@property(nonatomic, strong)IBOutlet  UIView *midView;

-(void)pageViewIni:(NSString *)imagestrd bgString:(NSString*)bgString;
-(void)setPage:(UIPageViewController*)_UIPageViewController bgname:(NSString *)bgname;
@end
