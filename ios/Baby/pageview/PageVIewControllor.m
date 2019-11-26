//
//  PageVIewControllor.m
//  PageDemo
//
//  Created by HMW on 2018/12/5.
//  Copyright © 2018年 RNLandsOrPor. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PageVIewControllor.h"
#import "PageViewControllerDataSource.h"
#import "PageUIView.h"

@interface PageVIewControllor (){
  
}

//UIPageViewControllerDelegate
@property (nonatomic) UIPageViewController *_pageViewController;

@property (nonatomic,retain) PageViewControllerDataSource *_PageViewControllerDataSource;
//pageview的delegate和dataSorce


@end

@implementation PageVIewControllor

//loadView
-(void) loadView{
  PageUIView *pageui = [[PageUIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.view = pageui;
  [pageui pageViewIni:self._Brigemod.notebookCover bgString:self._Brigemod.bgId];
}

//初始化所有的
-(void)initAll{
  self._PageViewControllerDataSource = [[PageViewControllerDataSource alloc]init];
  self._PageViewControllerDataSource._Brigemod = self._Brigemod;
  //[self setupNavigationBar];
  [self bindbt];
  [self initPageView];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Do any additional setup after loading the view, typically from a nib.
  

}

//按钮点击回调
-(void)backBtnClick{
    [self.view removeFromSuperview];
    [self dismissViewControllerAnimated:YES completion:nil];
    //self re
    if(self._callback){
      self._callback(@[[NSNull null]]);
    }
}

//左边点击回调
- (void)leftbtnclick{
  [self._PageViewControllerDataSource previousController];
}

//右边点击回调
- (void)rightbtnclick{
  [self._PageViewControllerDataSource latterController];

}

//点击美化
-(void)sure{
  [self.view removeFromSuperview];
  [self dismissViewControllerAnimated:YES completion:nil];
  if(self._callback){
    NSArray *response = [[NSArray alloc]init];
    response = [response arrayByAddingObject: @"1"];
    self._callback(response);
  }
}

-(void)bindbt{
  PageUIView *view = (PageUIView *)self.view;
  
  UITapGestureRecognizer *labelTapGestureRecognizerhead = [[UITapGestureRecognizer  alloc]initWithTarget:self action:@selector(backBtnClick)];
  [view.backView addGestureRecognizer:labelTapGestureRecognizerhead];
  [view.leftBtn addTarget:self action:@selector(leftbtnclick) forControlEvents:UIControlEventTouchUpInside];
  [view.rightBtn addTarget:self action:@selector(rightbtnclick) forControlEvents:UIControlEventTouchUpInside];
  [view.btfBtn addTarget:self action:@selector(sure) forControlEvents:UIControlEventTouchUpInside];
}

-(void)initPageView{

    NSDictionary * options = [NSDictionary dictionaryWithObject:[NSNumber numberWithInteger:UIPageViewControllerSpineLocationMin] forKey:UIPageViewControllerOptionSpineLocationKey];
    
    self._pageViewController = [[UIPageViewController alloc]initWithTransitionStyle:(UIPageViewControllerTransitionStylePageCurl) navigationOrientation:(UIPageViewControllerNavigationOrientationHorizontal) options:options];
    
    [self addChildViewController:self._pageViewController];
    [self._pageViewController didMoveToParentViewController:self];
    [self._pageViewController setDataSource:self._PageViewControllerDataSource];
    [self._pageViewController setDelegate:self._PageViewControllerDataSource];
    self._pageViewController.view.center = CGPointMake(self.view.center.x, self.view.center.y + 64);
    self._pageViewController.view.frame = CGRectMake(0, 64, self.view.frame.size.width, self.view.frame.size.height - 128);
//    self._pageViewController.view.bounds = CGRectMake(0, 0, self.view.frame.size.height - 64, self.view.frame.size.width);
    //self._pageViewController.view.transform = CGAffineTransformMakeRotation(M_PI_2);
    //[self.view addSubview:self._pageViewController.view];
    PageUIView *view = (PageUIView *)self.view;
    [view setPage:self._pageViewController bgname:@"BG1-" ];
    [self._PageViewControllerDataSource initNSObject:self._pageViewController];
  
  
    UIViewController * initialViewController =[self._PageViewControllerDataSource showCenter];
    NSArray *vcArry = [NSArray arrayWithObjects:initialViewController,nil];
    [self._pageViewController setViewControllers:vcArry direction:(UIPageViewControllerNavigationDirectionReverse) animated:NO completion:nil];
  
}

@end
