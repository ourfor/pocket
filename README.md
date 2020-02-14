## 关于
基于蓝牙的智能手机袋系统

## 功能

云端服务器需要具备的功能:
- 云端服务器还具有课表导入和查询
- 考勤记录查询统计
- 考勤错误的申诉 
- 考勤错误的纠错 
- 教室实时占用情况查询与统计（可了解当前哪个教室未上课）
- 学生蓝牙信息填写、座位号查询
- 老师统一查询本教室学生名单及座位号
- 用户管理及信息维护等功能。

## API



## 持续集成
![](https://github.com/ourfor/pocket/workflows/Java%20CI/badge.svg)
![](https://github.com/ourfor/pocket/workflows/Yarn%20CI/badge.svg)
![](https://github.com/ourfor/pocket/workflows/GitHub%20Pages/badge.svg)
![](https://github.com/ourfor/pocket/workflows/Release/badge.svg)

> 使用Github提供的Action来自动化编译构建, 配置文件位于`.github/workflows`

下载[构建产物](https://github.com/ourfor/template/actions)


在此之前你需要设置几个变量:
```http
DOMAIN: 前端页面的域名, 当然也可以是文档的域名, 需要你做好相应的解析
RELEASE_NAME: 命名构建产物
```

## Copyright

- Author: ourfor
- Date: Feb 13, 2020

## Reference
- [Bluetooth Web API](https://webbluetoothcg.github.io/web-bluetooth/)