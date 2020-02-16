-- use master;
-- go
-- drop database dbPocketTest;
-- go

create database dbPocketTest;
go

use dbPocketTest;
go


create table Room (
    RoomID smallint primary key, -- 教室号
    RoomName varchar(50) not null, -- 教室名称或者代号
    SiteCount smallint not null, -- 座位数
    Building varchar(50) not null, -- 建筑名称
);
go

create table Student (
    StuID varchar(15) primary key, -- 学号
    StuName nvarchar(30) not null, -- 姓名
    ClassID smallint not null, -- 班号
    Sex bit not null, -- 性别, 1: 男, 0: 女
    PasswdHash uniqueidentifier, -- 密码值; 密码的MD5值
    MAC char(12) not null, -- 蓝牙地址
    SiteNo tinyint not null -- 座位号: 建议值
);
go

create table Teacher (
    TeachID smallint primary key, -- 教师号
    TeachName nvarchar(30) not null, -- 教师名称
    PasswdHash uniqueidentifier, -- 密码值,密码Md5值
    Sex bit -- 性别, 1: 男, 0: 女
);
go

create table AgentServer (
    SvrID smallint primary key, -- 服务器号
    SvrCode char(16) unique, -- 服务器唯一标识符
    Version varchar(20) not null, -- 版本号
    SvrKey uniqueidentifier, -- 密钥, 用于验证传输有效性
    RoomID smallint foreign key references Room(RoomID)-- 教室号
);
go

create table UserInfo (
    UserID smallint primary key, -- 用户号
    UserName varchar(20) not null, -- 用户名
    PasswdHash uniqueidentifier not null -- 密码值
);
go

create table Lesson (
    LessonID varchar(20) not null, -- 课程号
    Term char(6) not null, -- 学期: 例如: 2020.2
    LessonName nvarchar(50) not null, -- 课程名
    WeekDay tinyint not null, -- 周几
    [Period] tinyint not null, -- 开始节次
    TeachID smallint foreign key references Teacher(TeachID), -- 教师号
    BeginTime smalldatetime not null, -- 上课时间
    EndTime smalldatetime not null, -- 下课时间
    primary key(LessonID,Term),
);
go

create table SelectLesson (
    LessonID varchar(20) not null, -- 课程号
    Term char(6) not null, -- 学期: 例如: 2020.2
    StuID varchar(15) foreign key references Student(StuID), -- 学号
    foreign key(LessonID,Term) references Lesson,
    primary key (StuID,LessonID,Term)
);
go

create table AttendRec (
    RecID bigint primary key, -- 考勤记录标识
    CreateTime smalldatetime, -- 考勤记录创建时间
    StuID varchar(15) foreign key references Student(StuID), -- 学号
    SvrID smallint foreign key references AgentServer(SvrID), -- 前端代理服务器
    SiteNo varchar(5) not null, -- 座位号: 形如2-10表示第2个袋子的10号位
    RoomID smallint foreign key references Room(RoomID), -- 教室号
    LessonID varchar(20) not null, -- 课程号
    Term char(6) not null, -- 学期: 例如: 2020.2
    foreign key(LessonID,Term) references Lesson,
    MAC char(12) not null, -- 蓝牙地址
    BeginTime smalldatetime not null, -- 上课时间
    EndTime smalldatetime not null, -- 下课时间
    AttendTag tinyint not null, -- 考勤标记, 1: 正常, 2: 迟到, 3: 旷课
    LeaveEarly bit, -- 早退
    RefreshTime smalldatetime not null, -- 刷新时间
    PhoneIn bit not null, -- 手机入袋
    IsOver bit not null, -- 考勤完结
    BTException bit, -- 蓝牙影响
);
go

select name
from sys.tables;
go


use dbPocketTest;
exec sp_addlogin 'devel','sql2020DB$$','dbPocketTest'
exec sp_adduser 'devel'
grant create table,create procedure,create view on database::dbPocketTest to devel;
grant select, delete, update, insert on database::dbPocketTest to devel;
grant select,insert,execute,alter on database::dbPocketTest to devel;


-- exec sp_droplogin 'devel';
-- go

