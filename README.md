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

在线[文档](https://pages.ourfor.top/pocket/)

暴露的API绝大部分以REST风格为标准, 复杂的请求采用Graphql,返回的文本消息通常以下列形式出现:
```json
{
    "code": 200,
    "msg": "查询成功",
    "data": ["数据"]
}
```
其中`code`类型为`number`(整数), 类似Http状态码, `msg`类型为`string`(字符串), 用于提示操作信息, data类型为`any?`(任意类型,但不为null).

> 测试时需要使用的测试数据: server/sql/test.sql, 测试的Host: http://114.116.214.68:8080

Host: `http://114.116.214.68:8080`

- 查询所有学生信息:
请求

```http
GET /student/all
```

响应
```http
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
由于我的数据库语言设置的是英文, 这里显示的中文是`??`。

> 登录后台管理系统

```http
POST /auth
Content-Type: application/x-www-form-urlencoded

username=devel&password=devel&md5=
```

- `username`: 登录用户名, 这里使用的是`devel`
- `password`: 登录密码, 对应用户`devel`的密码

响应

```http
Content-Type: application/json

{
  "code": 200,
  "msg": "OK",
  "data": "data-auth"
}
```

- `data`中会存放token, 这里仅做示例

>  第一种方式：某手机第一次用来考勤时，应将手机的蓝牙名称修改为自己的学生ID，当前端服务器向云端服务器上报手机蓝牙MAC信息时，也会将蓝牙的名称一同上报，如果系统中没有找到此蓝牙MAC的登记信息，则自动按蓝牙的名称（即学生ID），实现签到，并将此MAC与该学生绑定

- ~~一个学生签到~~(已经废弃,不建议使用)
```http
POST /student/sign-in
Content-Type: application/x-www-form-urlencoded

MAC=1C-52-16-B5-5C-1C&studId=100000001
```

- `MAC`: 为蓝牙地址,格式为`xx-xx-xx-xx-xx-xx`
- `studId`: 为学号, 在用户第一次签到时, 必须正确, 如果MAC地址已绑定, 这学号可以是错误的

响应

```http
HTTP/1.1 200 
Content-Type: application/json

{
  "code": 200,
  "msg": "张三 sign up successfully",
  "data": {
    "stuName": "张三",
    "classId": 101,
    "siteNo": 1
  }
}
```


- 同时为多个学生签到

```http
POST localhost:8443/student/sign-in-all
Content-Type: application/json

{
	"data": {
		"AppID": 1,
		"devices": [{
			"BName": "201730126030",
			"Bdistance": "1.4",
			"BMac": "A0-C5-89-E3-75-FF"
		}],
		"type": "test",
		"time": 1582423118178
	},
	"md5": "3f1f7428fa84ee7a287d6ae12667a36a"
}
```

- `Content-Type`: `application/json`

需要对`data`部分进行签名,签名的顺序按照:`AppID,time,devices[{BName,Bdistance,BMac}],type}` 

响应包括成功签到的学生列表和签到失败的学生列表
```http
HTTP/1.1 200 

{
  "code": 200,
  "msg": "sign in success",
  "data": {
    "md5": "bbc4abe5e7acab963d0fe59014d5bb64",
    "data": {
      "succList": [],
      "failList": [
        {
          "BName": "201730126030",
          "Bdistance": "1.41",
          "BMac": "E3:15:EA:C3:C4:C2"
        }
      ]
    }
  }
}
```
需要对`data`内部`data`数据验签, 需要保持这些字段的顺序, 将空格回车这些符号去掉。

- 获取教室列表
```http
GET localhost:8443/rooms
```

响应
```http
HTTP/1.1 200 

{
  "code": 200,
  "msg": "all rooms",
  "data": [
    {
      "roomID": 3,
      "roomName": "112",
      "siteCount": 40,
      "building": "扎楼"
    },
    {
      "roomID": 8,
      "roomName": "132",
      "siteCount": 50,
      "building": "体育馆"
    }
  ]
}
```

- 注册代理服务器
```http
POST localhost:8443/agent
Content-Type: application/x-www-form-urlencoded

code=723f8889fdb9a658&version=1&room=2
```
- `code`: 表示`SvrCode`
- `version`: 为版本号
- `room`: 表示`RoomID`, 代理服务器要注册的教室

>如果服务器没有注册, 则会注册并返回注册信息, 如果已经注册, 会返回之前设置的信息, 要修改信息建议通过Web前端修改
响应
```http
HTTP/1.1 200 

{
  "code": 200,
  "msg": "device 723f8889fdb9a658 register successful",
  "data": {
    "SvrKey": "45EA4201-6798-4BA1-B505-FD44584288ED",
    "SvrId": 3,
    "SvrCode": "723f8889fdb9a658",
    "Version": "1",
    "RoomID": 2,
    "Exception": false,
    "Online": true
  }
}
```


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

## 部署

### Web客户端部署
由`GitHub Action`构建, 并通过`GitHub Pages`自动部署, 同时添加公共CDN

### 服务端部署
1. `heroku buildpacks:clear` if necessary
2. `heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack`
3. `heroku buildpacks:add heroku/gradle` or whatever buildpack you need for your application
4. `heroku config:set PROJECT_PATH=server` pointing to what you want to be a project root.
5. `git push heroku master` Deploy your project to Heroku.

## Copyright

- Author: ourfor
- Date: Feb 13, 2020

## Reference
- [Bluetooth Web API](https://webbluetoothcg.github.io/web-bluetooth/)