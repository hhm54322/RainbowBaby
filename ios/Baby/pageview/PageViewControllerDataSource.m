//
//  PageViewControllerDataSource.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PageViewControllerDataSource.h"
#import "PageOne.h"

//pageview的控制器
@interface PageViewControllerDataSource ()
<UIPageViewControllerDataSource,UIPageViewControllerDelegate>{

}

@property ModDateAndImage * _modDateImageStructs;

@property BOOL _isCanPage;

@property UIPageViewController * _UIPageViewController;

@property BOOL _isleft;

@end



@implementation PageViewControllerDataSource


//初始化数据
-(void)initNSObject:(UIPageViewController*)_UIPageViewController{
  self._UIPageViewController = _UIPageViewController;
  self.r = [ UIScreen mainScreen ].bounds;
  self._isleft = false;
  self._isCanPage = true;
  
  NSArray *arryd = [[NSArray alloc]init];
  for(int i = 0;i<3;i++){
    ModStruct *mod = [[ModStruct alloc]init];
    mod.index = i+1;
    arryd = [arryd arrayByAddingObject:mod];
  }
  
  NSArray *arryd2 = [[NSArray alloc]init];
  for(int i = 0;i<3;i++){
    ModStruct *mod = [[ModStruct alloc]init];
    mod.index = i+100;
    arryd2 = [arryd2 arrayByAddingObject:mod];
  }
  
  ModStruct *c = [[ModStruct alloc]init];
  c.index = 50;
  
  self._modDateImageStructs = [[ModDateAndImage alloc]init];
  self._modDateImageStructs._Brigemod = self._Brigemod;
  [self._modDateImageStructs initmod:arryd rightarry:arryd2 centerdata:c];
  
  
}

//显示当前显示的页面
- (UIViewController *)showCenter{
  ModStruct *mod = [self._modDateImageStructs getCourenStruct];
  UIViewController* cv = [self getUIViewController:mod];
  return cv;
}

//下一个页面
-(void)latterController{
  ModStruct *mod = [self._modDateImageStructs peekRight];
  if(mod == nil){
    return;
  }
  UIViewController* cv = [self getUIViewController:mod];
  NSArray *vcArry = [NSArray arrayWithObjects:cv,nil];
  [self._UIPageViewController setViewControllers:vcArry direction:(UIPageViewControllerNavigationDirectionForward) animated:YES completion:nil];
  
  [self._modDateImageStructs leftShift];
  self._isCanPage = true;
}

//前一个页面
-(void)previousController{
  ModStruct *mod = [self._modDateImageStructs peekLeft];
  if(mod == nil){
    return;
  }
  UIViewController* cv = [self getUIViewController:mod];
  NSArray *vcArry = [NSArray arrayWithObjects:cv,nil];
  [self._UIPageViewController setViewControllers:vcArry direction:(UIPageViewControllerNavigationDirectionReverse) animated:YES completion:nil];
  [self._modDateImageStructs rightShift];
  self._isCanPage = true;
  
}

//根据mod类型显示界面
-(UIViewController*)getUIViewController:(ModStruct*)mod{
  if(mod == nil){
    return nil;
  }
  UIViewController*cv = [[UIViewController alloc]init];
  PageOne *one = [[PageOne alloc]init];
  
    NSString* bgbg1 = [NSString stringWithFormat:@"BG%@-2.png", self._Brigemod.bgId];
  
  [one pageOneViewInit:self._UIPageViewController.view.frame imageUrl:@"" bgstr: bgbg1];
  cv.view = one;
  UITextView *text = [[UITextView alloc]init];
  NSString* string = [NSString stringWithFormat:@"%@%d",@"mod index === " ,mod.index];
  text.text  = string;
  text.frame = CGRectMake(50,100,200,50);
  [cv.view addSubview:text];
  return cv;
}

//delege函数 具体的参数看ios文档。  后一页回调
- (UIViewController *)pageViewController:(UIPageViewController *)pageViewController viewControllerAfterViewController:(UIViewController *)viewController{
    NSLog(@"后一个视图控制器");
    if(!self._isCanPage){
      return nil;
    }
    self._isleft = false;
    UIViewController *pagecv = [self getUIViewController:[self._modDateImageStructs peekRight]];
    return pagecv;
}


//delege函数 具体的参数看ios文档      前一页回调
- (UIViewController *)pageViewController:(UIPageViewController *)pageViewController viewControllerBeforeViewController:(UIViewController *)viewController {
  NSLog(@"前一个视图控制器");
  if(!self._isCanPage){
    return nil;
  }
  self._isleft = true;
  UIViewController *pagecv = [self getUIViewController:[self._modDateImageStructs peekLeft]];
  return pagecv;
}

//delege函数 具体的参数看ios文档。 翻页开始时候回调
- (void)pageViewController:(UIPageViewController *)pageViewController willTransitionToViewControllers:(NSArray<UIViewController *> *)pendingViewControllers{
  self._isCanPage = NO;
}


//delege函数 具体的参数看ios文档。   完成翻页是回调
- (void)pageViewController:(UIPageViewController *)pageViewController didFinishAnimating:(BOOL)finished previousViewControllers:(NSArray<UIViewController *> *)previousViewControllers transitionCompleted:(BOOL)completed{
  NSLog(@"pageViewController end enter %d",completed?1:0);
  if(completed){
    if(self._isleft){
      [self._modDateImageStructs rightShift];
    }else{
      [self._modDateImageStructs leftShift];
    }
  }
  self._isCanPage = true;
  //[self setTime];
}


@end
