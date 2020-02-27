# 场景1:

老师每堂课前必须为本堂课创建新考勤初始记录，其步骤如下：
1. 如果有课表数据支持，则只需用WEB客户端选择本堂课要进行的课表项，系统便可加载该堂课应到学生名单。若没有课程表数据，则可以由老师通过WEB客户端临时开始一堂课，并指定任课老师、教室、时段、上下课的标准时间及上课的学生名单等必要的信息。
2. 为每个学生分配座位号，并添加考勤初始记录，其中至少以下字段根据课表或第1步准备的信息被赋值：学生ID、座位号、课程ID、教室ID、上课时间、下课时间；

### 测试步骤如下:
教师通过账号和密码以 *教师身份* 登录Web管理界面, 通过选择 `上课教室` 和 `课程`, 初始化考勤记录, 系统会将本节课需要考勤的学生信息加入考勤记录📝。

1. 选择上课教室后, 只有绑定了该教室的前端代理服务器可以为学生签到
2. 系统只会为考勤记录中需要的学生签到, 不需要本节课的学生会放回在签到失败的列表中
3. 系统和前端代理服务器以相同的时间间隔扫描未完结(执行中的)的考勤记录📝

---

- 某时间段可用教室
通过给定时间段, 系统查询`未完结`,`考勤时间段与给定时间段有重合部分`的考勤记录, 得到相应的教室ID(为不可用教室)

- 