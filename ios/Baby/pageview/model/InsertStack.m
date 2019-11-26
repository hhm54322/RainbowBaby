//
//  InsertStack.m
//  Baby
//

#import <Foundation/Foundation.h>
#import "InsertStack.h"
@interface InsertStack()

@end

@implementation InsertStack

-(void)initWith{
  self._dynamicarray = [[NSMutableArray alloc]init];
}

-(NSInteger)getSize{
  return self._dynamicarray.count;
}

-(BOOL)isEmpty{
  return self._dynamicarray.count == 0;
}

-(void)push:(id)obj{
  [self._dynamicarray addObject:obj];
}

-(id)peek{
  if([self isEmpty]){
    return nil;
  }
  id obj = self._dynamicarray[self._dynamicarray.count - 1];
  return obj;
}

-(id)pop{
  if([self isEmpty]){
    return nil;
  }
  id obj = self._dynamicarray[self._dynamicarray.count - 1];
  [self._dynamicarray removeObjectAtIndex:self._dynamicarray.count - 1];
  return obj;
}

-(void)clean{
  [self._dynamicarray removeAllObjects];
}

-(void)insert:(NSArray<id> *)arry isReverse:(BOOL)isReverse{
  NSInteger len = arry.count;
  InsertStack * lins = [[InsertStack alloc]init];
  [lins initWith];
  
  NSInteger oldSize = [self getSize];
  for(int i = 0;i<oldSize;i++){
    [lins push: [self pop]];
  }
  
  if(isReverse){
    for(int i = ((int)len - 1);i>=0;i--){
      [self push:arry[i]];
    }
  }else{
    for(int i = 0;i<len;i++){
      [self push:arry[i]];
    }
  }
  for(int i = 0;i<oldSize;i++){
    [self push:[lins pop]];
  }
  
}

@end
