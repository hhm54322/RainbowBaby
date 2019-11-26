/**
 * Sample React Native ArryTop
 * arry
 * @xjs
 */

/**
 * 手账里面排序的相关，控制手账层级关系
 * arry
 * @xjs
 * 所有的传入参数key 为下标  用于定位到某一个元素
 */
export class ArryTop {

  constructor() {
    this.arry = [500] //内部数组
    this.mindex = -1;  //长度  长度控制和获取
    this.serch = null;  //抛出比较函数（）={return true or false}
    this.index = -1;  //当前元素下标
  }

  //设置比较回调
  setSerchBack(fun){
    this.serch = fun    
  }

  //末尾添加元素
  pushBack (t){
    if(this.mindex>=499)
        return
        this.mindex ++;
        this.arry[this.mindex] = t
  }

  //获取某一个元素
  get(i){
    return this.arry[i]
  }

  //获得长度
  getLenth(){
    return this.mindex+1
  }

  //元素到底操作
  todisByFun (key){
      if(this.mindex>=1){
        for(var i = 0;i<=this.mindex;i++){
            if(this.serch &&  this.serch(this.arry[i],key)){
                  // var tem = this.arry[0] 
                  // this.arry[0] = this.arry[i]
                  // this.arry[i] = tem
                  var tem = this.arry.splice(i,1)
                  this.arry.unshift(tem[0])
                  return
            }
        }
    }
  }

  //保存用户设置的层级变化
  backtemporary (){
    if(this.index !==-1){
      // var tem = this.arry[this.mindex] 
      // this.arry[this.mindex] = this.arry[this.index]
      // this.arry[this.index] = tem   
      var tem = this.arry.splice(this.mindex,1)
      for(var i = this.mindex;i>this.index;i--){
        this.arry[i] = this.arry[i-1]
      }
      this.arry[this.index] = tem[0]
    }
  }


  //清楚选中下标
  clearIndex () {
    this.index = -1
  }


  //到顶操作 临时到顶部，下标存到index如果取消将还原
  toToptemporary (key) {
    if(this.mindex>=1){
      for(var i = 0;i<=this.mindex;i++){
          if(this.serch &&  this.serch(this.arry[i],key)){
                var tem = this.arry.splice(i,1)  
                this.arry[this.mindex] = tem[0]
                this.index = i
                return
          }
      }
    }
  }

  //将元素到顶操作
  toTopByFun (key){
    if(this.mindex>=1){
        for(var i = 0;i<=this.mindex;i++){
            if(this.serch &&  this.serch(this.arry[i],key)){
                  // var tem = this.arry[this.mindex] 
                  // this.arry[this.mindex] = this.arry[i]
                  // this.arry[i] = tem

                  var tem = this.arry.splice(i,1)
                  this.arry[this.mindex] = tem[0]
                  return
            }
        }
    }
  }

  //往上走一层
  addIndexOder (key){
    if(this.mindex>=1){
        for(var i = 0;i<=this.mindex;i++){
            if(this.serch &&  this.serch(this.arry[i],key)){
                  if( i<this.mindex ){
                    var tem = this.arry[i] 
                    this.arry[i] = this.arry[i+1]
                    this.arry[i+1] = tem
                  }
                  return
            }
        }
    }
  }

  //往下一层
  disIndexOder (key){
    if(this.mindex>=1){
        for(var i = 0;i<=this.mindex;i++){
            if(this.serch &&  this.serch(this.arry[i],key)){
                  if( i>0 ){
                    var tem = this.arry[i] 
                    this.arry[i] = this.arry[i-1]
                    this.arry[i-1] = tem
                  }
                  return
            }
        }
    }
  }

  //删除某一个元素
  deleteByFun(key){
    var index = -1;
    for(var i = 0;i<=this.mindex;i++){
      if(this.serch &&  this.serch(this.arry[i],key)  ){
            index = i;
            break
      }
    }
    if(index!==-1){
      this.arry.splice(index,1)
      this.mindex--
    }
  }

}

