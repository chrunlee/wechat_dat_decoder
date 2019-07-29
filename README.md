# wechat_dat_decoder
nodejs版本的解码微信wechat中的dat 图片文件

# 安装
```
git clone git@github.com:chrunlee/wechat_dat_decoder.git
```

或命令行模式

```
npm install wechat_dat_decoder -g

wechatdat -d /home/wechat/ //命令行输入解码目标地址即可
```

# 使用

- 修改`app.js`文件中的两个目录地址
- `scanDir` 扫描地址

修改后，执行:
```
node app
```

然后查看对应目录下文件即可。

# 注意
解密方式很简单，但是目前的这种方式会存在小部分文件计算不对，由于每个人对应的解码都不同，但是同一帐号是相同的，所以可以找到可以正常解码的解码值，然后将该值固定写死，这样成功率会更大。

# License
MIT