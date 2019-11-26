//
//  PageUIView.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PageOne.h"
@interface PageOne ()
@property  CGRect r;
@property  (copy)NSString* bgstring;
@property  (copy)NSString* imguri;
@end

@implementation PageOne

//每一页显示的内容
-(void)pageOneViewInit:(CGRect)cgreact imageUrl:(NSString *)imageUrl bgstr:(NSString *)bgstr{
  self.r = cgreact;
  self.bgstring = bgstr;
  self.imguri = imageUrl;
  UIImageView *bgview = [[UIImageView alloc]init];
  UIImage*imagebg = [UIImage imageNamed:bgstr];
  [bgview setImage:imagebg];
  bgview.frame = CGRectMake(0,0,self.r.size.width,self.r.size.height);
  [self addSubview:bgview];
}


@end
