//
//  ModStruct.m
//  Baby
//
//  Created by HMW on 2018/12/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ModStruct.h"
@interface ModStruct ()

@end

@implementation ModStruct
-(id)init
{
  if(self=[super init])
  {
    self.imageUri = @"";
    self.cid = -1;
    self.title = @"";
    self.date = @"";
    self.index = 0;
  }
  return self;
}


@end
