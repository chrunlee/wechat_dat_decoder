/***
 * 微信解密dat 文件转化为图片
 * @author chrunlee
 ***/
let fs = require('fs');
let path = require('path');
let async = require('async');

//值是多少自己算。
let base = 0xFF;
//扫描文件夹地址，此处需要修改
let scanDir = 'd:/ttt/load/';
//解密后图片的存放文件夹地址，此处需要修改
let imgDir = 'd:/ttt/load1/';
//解密的并发量限制
let limit = 50;

if(!scanDir){
    console.log('请修改scanDir - imgDir 地址后执行。');
    process.exit(0);
}

//读取文件
let files = fs.readdirSync(scanDir);
var arr = [];
files.forEach(function(item){
    if(path.extname(item) == '.dat'){
        arr.push(item);
    }
})
async.mapLimit(arr,limit,function(item,cb){
    convert(item,cb);
},function(){
    console.log('解码完毕')
    process.exit(0);
})
//单个文件解密
function convert(item,cb){
    let absPath =path.join(scanDir,item);
    let imgPath = path.join(imgDir,item+'.jpg');
    fs.readFile(absPath,(err,content)=>{
        if(err){
            console.log(err);
            cb(err);
        }
        let first = content[0];
        const v = first ^ base;
        let bb = content.map(br=>{
            return br ^ v
        })
        fs.writeFileSync(imgPath,bb)
        cb(null);
    })
}