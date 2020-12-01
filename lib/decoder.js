//修改图片
let fs = require('fs');
let path = require('path');
let async = require('async');
let dirfile = require('dirfile');

//值是多少自己算。
let base = 0xFF;
let next = 0xD8;
let gifA = 0x47;
let gifB = 0x49;
let pngA = 0x89;
let pngB = 0x50;
let bmpA = 0x42;
let bmpB = 0x4d;
let count = 0;
function decoder (scanDir){
    var fileList = dirfile(scanDir,false,true,function(filePath,stat){
        return path.extname(filePath) == '.dat';
    },function(filePath,stat){
        return {
            filePath : filePath
        }
    })
    async.mapLimit(fileList,50,function(item,cb){
        convert(item,cb);
    },function(){
        console.log('解码完毕,共计'+count+'个文件');
        process.exit(0);
    })  
}

//convert
function convert(item,cb){
    let absPath =item.filePath;
    let extname = '.jpg';
    fs.readFile(absPath,(err,content)=>{
        if(err){
            console.log('解码失败:'+absPath);
            cb(null);
        }else{
            let firstV = content[0],
                nextV = content[1],
                jT = firstV ^ base,
                jB = nextV ^ next,
                gT = firstV ^ gifA,
                gB = nextV ^ gifB,
                pT = firstV ^ pngA,
                pB = nextV ^ pngB;
                bT = firstV ^ bmpA;
                bB = nextV ^ bmpB;
            var v = firstV ^ base;
            if(jT == jB){
                v = jT;
                extname = '.jpg';
            }else if(gT == gB){
                v = gT;
                extname = '.gif';
            }else if(pT == pB){
                v = pT;
                extname = '.png';
            }else if(bT == bB){
                v = bT;
                extname = '.bmp';
            }
            let imgPath = path.join(path.dirname(absPath),path.basename(absPath)+extname);
            let bb = content.map(br=>{
                return br ^ v
            })
            count++;
            fs.writeFileSync(imgPath,bb)
            cb(null);
        }
        
    })
}

module.exports= decoder;