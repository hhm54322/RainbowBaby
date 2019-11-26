//
//  PageUIView.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PageUIView.h"


//界面具体的显示纯显示内容
@interface PageUIView ()
@property  CGRect r;
@property  (copy)NSString* imagestr;
@property  (copy)NSString* bgstr;

@property float_t widthd2;
@property float_t heightd2;
@property float_t topd2;
@end

@implementation PageUIView


//初始化内容
-(void)pageViewIni:(NSString *)imagestrd bgString:(NSString*)bgString{
  self.imagestr = imagestrd;
  self.bgstr = bgString;
  self.r = [ UIScreen mainScreen ].bounds;
  [self setupNavigationBar];
  self.backgroundColor = [UIColor colorWithRed:(51/255.0) green:(51/255.0) blue:(51/255.0) alpha:1];
  [self setallBg];
}


//设置头部条
-(void)setupNavigationBar{
  NSLog(@"setupNavigationBar");
  UIView *upview = [[UIView alloc]initWithFrame:CGRectMake(0, 0, self.r.size.width, 64)];
  [self addSubview:upview];
  upview.backgroundColor = [UIColor colorWithRed:(51/255.0) green:(51/255.0) blue:(51/255.0) alpha:1];
  
  
  
//  UIImage *imageBack = [UIImage all]
  //UIImage *imagetop = [UIImage imageNamed:@"DLMini.bundle/bb"];
  
  self.backView= [[UIImageView alloc]init];
  [self.backView setUserInteractionEnabled:YES];
  self.backView.frame =CGRectMake(7, 25, 64, 24);
  UIImage *imageBack = [UIImage imageNamed:@"pback.png"];
  [self.backView setImage:imageBack];
  [upview addSubview:self.backView];
  self.backView.transform = CGAffineTransformMakeTranslation(-20, 0);
  self.backView.contentMode = UIViewContentModeScaleAspectFit;
  
  
  float_t height =self.r.size.height - 118;
  
  self.midView = [[UIView alloc] init];
  self.midView.frame =CGRectMake(0, 64, self.r.size.width, height);
  self.midView.backgroundColor = [UIColor blackColor];
  [self addSubview:self.midView];
  
  
  
  
  self.btfBtn = [[UIButton alloc]init];
  self.btfBtn.frame = CGRectMake((self.r.size.width - 70)/2 , self.r.size.height - 41, 70, 30);
  self.btfBtn.backgroundColor = [UIColor colorWithRed:(134/255.0) green:(184/255.0) blue:(34/255.0) alpha:1];
  
  self.btfBtn.layer.cornerRadius = 4;
  [self.btfBtn setTitle:@"美化" forState:UIControlStateNormal];
  [self.btfBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [self addSubview:self.btfBtn];
  
  
  self.leftBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  self.leftBtn.frame = CGRectMake(10, self.r.size.height - 48, 50, 44);
  self.leftBtn.titleLabel.font = [UIFont systemFontOfSize:16];
  [self.leftBtn setTitle:@"上一页" forState:UIControlStateNormal];
  [self.leftBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [self addSubview:self.leftBtn];
  
  self.rightBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  self.rightBtn.frame = CGRectMake(self.r.size.width - 60, self.r.size.height - 48, 50, 44);
  self.rightBtn.titleLabel.font = [UIFont systemFontOfSize:16];
  [self.rightBtn setTitle:@"下一页" forState:UIControlStateNormal];
  [self.rightBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [self addSubview:self.rightBtn];
  
}

//设置bg书本样式。 根据宽高动态计算得到
-(void)setallBg{
  float_t height =self.r.size.height - 118;
  float_t width =self.r.size.width;
  float_t theight = width *1095/748.0;
  float_t twidth = width;
  float_t top = 0;
  
  if(theight <=height){
    top = (height-theight)/2;
  }else{
    theight = height;
    twidth = theight * 748/1095.0;
  }
  
  //748 1095
  
  //22
  //NSString *str2 = [string substringFromIndex:3];//截取掉下标3之后的字符串
  //NSUInteger len = self.imagestr.length;
  //NSString *str2 = [self.imagestr substringFromIndex:(len - 2 )];
  NSString* cover = [NSString stringWithFormat:@"%@%@%@", @"Cover",self.imagestr, @"-2.png" ];
  UIImageView *imageViewBg = [[UIImageView alloc]init];
  UIImage*imagebg = [UIImage imageNamed:cover];
  [imageViewBg setImage:imagebg];
  imageViewBg.frame = CGRectMake(0, top, twidth, theight);
  [self.midView addSubview:imageViewBg];
  
  NSString* bgbg1 = [NSString stringWithFormat:@"BG%@-1.png", self.bgstr];
  float_t topbg1 = 0.022*theight;
  float_t height1d = theight *(1054/1093.0);
  float_t width1d = twidth*(740/750.0);
  UIImageView *imageViewBg1 = [[UIImageView alloc]init];
  UIImage*imagebg1 = [UIImage imageNamed:bgbg1];
  [imageViewBg1 setImage:imagebg1];
  imageViewBg1.frame = CGRectMake(0, topbg1, width1d, height1d);
  [imageViewBg addSubview:imageViewBg1];
  
  
  //706/740 width    1029/1054     5/1054*1054*height
  
  float_t widthd2 = width1d *(705/740.0);
  float_t heightd2 = height1d *(1030/1054.0);
  float_t topd2 = height1d * (6/1054.0) + topbg1 +64 +top;
  
  self.widthd2 = widthd2;
  self.heightd2 = heightd2;
  self.topd2 = topd2;
  

  
}


//设置翻页内容
-(void)setPage:(UIPageViewController*)_UIPageViewController bgname:(NSString *)bgname{
  
  float_t topall = self.topd2;
  _UIPageViewController.view.frame = CGRectMake(0, topall, self.widthd2, self.heightd2);
  [self addSubview:_UIPageViewController.view];
  
  UIImageView *imageViewBg2 = [[UIImageView alloc]init];
  UIImage*imagebg2 = [UIImage imageNamed:@"pageTopShade.png"];
  [imageViewBg2 setImage:imagebg2];
  imageViewBg2.frame = CGRectMake(0, self.topd2, self.widthd2, self.heightd2);
  [self addSubview:imageViewBg2];
  [self bringSubviewToFront:imageViewBg2];
  
}

@end
