//对应的图片  背景  精选  最新  等

var BG = new Map(); 
BG.set("1",require('./imgs/bg/BG1-2.png'));
BG.set("2",require('./imgs/bg/BG2-2.png'));
BG.set("3",require('./imgs/bg/BG3-2.png'));
BG.set("4",require('./imgs/bg/BG4-2.png'));
BG.set("5",require('./imgs/bg/BG5-2.png'));
BG.set("6",require('./imgs/bg/BG6-2.png'));
BG.set("7",require('./imgs/bg/BG7-2.png'));
BG.set("8",require('./imgs/bg/BG8-2.png'));
BG.set("9",require('./imgs/bg/BG9-2.png'));



var ZX = new Map();
ZX.set("zx-(1).png",require('./imgs/zx/zx-(1).png'));
ZX.set("zx-(2).png",require('./imgs/zx/zx-(2).png'));
ZX.set("zx-(3).png",require('./imgs/zx/zx-(3).png'));
ZX.set("zx-(4).png",require('./imgs/zx/zx-(4).png'));
ZX.set("zx-(5).png",require('./imgs/zx/zx-(5).png'));
ZX.set("zx-(6).png",require('./imgs/zx/zx-(6).png'));
ZX.set("zx-(7).png",require('./imgs/zx/zx-(7).png'));
ZX.set("zx-(8).png",require('./imgs/zx/zx-(8).png'));
ZX.set("zx-(9).png",require('./imgs/zx/zx-(9).png'));
ZX.set("zx-(10).png",require('./imgs/zx/zx-(10).png'));


var CX = new Map();
CX.set("cx-(1).png",require('./imgs/cx/cx-(1).png'));
CX.set("cx-(2).png",require('./imgs/cx/cx-(2).png'));
CX.set("cx-(3).png",require('./imgs/cx/cx-(3).png'));
CX.set("cx-(4).png",require('./imgs/cx/cx-(4).png'));
CX.set("cx-(5).png",require('./imgs/cx/cx-(5).png'));
CX.set("cx-(6).png",require('./imgs/cx/cx-(6).png'));
CX.set("cx-(7).png",require('./imgs/cx/cx-(7).png'));
CX.set("cx-(8).png",require('./imgs/cx/cx-(8).png'));
CX.set("cx-(9).png",require('./imgs/cx/cx-(9).png'));
CX.set("cx-(10).png",require('./imgs/cx/cx-(10).png'));
CX.set("cx-(11).png",require('./imgs/cx/cx-(11).png'));
CX.set("cx-(12).png",require('./imgs/cx/cx-(12).png'));
CX.set("cx-(13).png",require('./imgs/cx/cx-(13).png'));
CX.set("cx-(14).png",require('./imgs/cx/cx-(14).png'));
CX.set("cx-(15).png",require('./imgs/cx/cx-(15).png'));

var JX = new Map();
JX.set("jx-(1).png",require('./imgs/jx/jx-(1).png'));
JX.set("jx-(2).png",require('./imgs/jx/jx-(2).png'));
JX.set("jx-(3).png",require('./imgs/jx/jx-(3).png'));
JX.set("jx-(4).png",require('./imgs/jx/jx-(4).png'));
JX.set("jx-(5).png",require('./imgs/jx/jx-(5).png'));
JX.set("jx-(6).png",require('./imgs/jx/jx-(6).png'));
JX.set("jx-(7).png",require('./imgs/jx/jx-(7).png'));
JX.set("jx-(8).png",require('./imgs/jx/jx-(8).png'));
JX.set("jx-(9).png",require('./imgs/jx/jx-(9).png'));
JX.set("jx-(10).png",require('./imgs/jx/jx-(10).png'));
JX.set("jx-(11).png",require('./imgs/jx/jx-(11).png'));
JX.set("jx-(12).png",require('./imgs/jx/jx-(12).png'));
JX.set("jx-(13).png",require('./imgs/jx/jx-(13).png'));
JX.set("jx-(14).png",require('./imgs/jx/jx-(14).png'));
JX.set("jx-(15).png",require('./imgs/jx/jx-(15).png'));


var ALL = new Map();
ZX.forEach((v,k)=>{
    ALL.set(k,v)
})
CX.forEach((v,k)=>{
    ALL.set(k,v)
})
JX.forEach((v,k)=>{
    ALL.set(k,v)
})


export {BG}
export {ZX}
export {CX}
export {JX}
export {ALL}






