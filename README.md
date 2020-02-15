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

暴露的API绝大部分以REST风格为标准, 复杂的请求采用Graphql,返回的文本消息通常以下列形式出现:
```json
{
    "code": 200,
    "msg": "查询成功",
    "data": ["数据"]
}
```
其中`code`类型为`number`(整数), 类似Http状态码, `msg`类型为`string`(字符串), 用于提示操作信息, data类型为`any?`(任意类型,但不为null).

Host: `http://localhost:8443`

- 查询所有学生信息:
请求
```http
GET /student/all
```

响应
```http
GET http://localhost:8443/student/all

HTTP/1.1 200 
Content-Type: application/json

{
  "code": 200,
  "msg": "all student",
  "data": [
    {
      "stuID": "100000001",
      "stuName": "??",
      "classID": 101,
      "sex": true,
      "passwdHash": "C21F969B-5F03-D33D-43E0-4F8F136E7682",
      "siteNo": 1,
      "mac": "unknown     "
    },
    {
      "stuID": "100000002",
      "stuName": "??",
      "classID": 101,
      "sex": true,
      "passwdHash": "C21F969B-5F03-D33D-43E0-4F8F136E7682",
      "siteNo": 2,
      "mac": "unknown     "
    }
  ]
}
```
由于我的数据库语言设置的是英文,


## 持续集成
![](https://github.com/ourfor/pocket/workflows/Java%20CI/badge.svg)
![](https://github.com/ourfor/pocket/workflows/Yarn%20CI/badge.svg)
![](https://github.com/ourfor/pocket/workflows/GitHub%20Pages/badge.svg)
![](https://github.com/ourfor/pocket/workflows/Release/badge.svg)

> 使用Github提供的Action来自动化编译构建, 配置文件位于`.github/workflows`

下载[构建产物](https://github.com/ourfor/pocket/releases)


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