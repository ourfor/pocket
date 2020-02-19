use dbPocketTest;

insert into Student
values
('100000001', N'张三',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',1),
('100000002', N'李四',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',2),
('100000003', N'王五',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',3),
('100000004', N'小明',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',4),
('100000005', N'小红',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',5),
('100000006', N'小花',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',6),
('100000007', N'张4',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',7),
('100000008', N'Pick',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',8),
('100000009', N'Bob',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',9),
('100000010', N'Micro',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',10),
('100000011', N'Blues',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',11),
('100000012', N'Jack',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',12),
('100000013', N'李明',102,0,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',13)

-- test MAC: 50-8F-4C-E2-A8-01 A0-C5-89-E3-75-FF
-- md5(default) = c21f969b5f03d33d43e04f8f136e7682 c21f969b-5f03-d33d-43e0-4f8f136e7682
select *
from Student

insert into UserInfo
values
(1,'devel','daf98543-c487-af6c-eb23-0cae002c92fd');
go

select *
from UserInfo;
go

insert into  Teacher
values
(1,N'Bob','daf98543-c487-af6c-eb23-0cae002c92fd',1),
(2,N'李老师','b3412d5e-aecb-5340-71d1-b33a299549f7',0) -- 登录名:2 密码: 88888888 MD5(888888882)

insert into Lesson
values
('10000001','2020.1',N'高等数学',1,3,1,'2020-02-18','2020-06-10'), -- 高等数学
('10000002','2020.2',N'大学物理',1,3,1,'2020-02-18','2020-06-10'),
('10000003','2020.2',N'线性代数',1,3,1,'2020-02-22','2020-05-22'),
('10000004','2020.1',N'大学语文',1,3,2,'2020-03-05','2020-06-01'),
('10000005','2020.1',N'近代史',1,3,2,'2020-03-05','2020-06-01'),
('10000006','2020.1',N'思想道德修养',1,3,2,'2020-03-05','2020-06-01')

insert into SelectLesson
values
-- ('10000001','202002','100000013'), -- 李明同学选修高等数学
('10000004','2020.1','100000001'),
('10000004','2020.1','100000002'),
('10000004','2020.1','100000003'),
('10000004','2020.1','100000004'),
('10000004','2020.1','100000005'),
('10000004','2020.1','100000006'),
('10000004','2020.1','100000007'),
('10000004','2020.1','100000008'),
('10000004','2020.1','100000009'),
('10000004','2020.1','100000010')


select *
from Teacher;
go

insert into Room
values
       (1,N'210',50,N'里学院'),
       (2,N'310',60,N'智尚楼'),
       (3,N'112',40,N'扎楼');


create proc sp_find_lessons
    @teachId smallint
    as
    select lessonID from Lesson where TeachID=@teachId


-- delete Student
-- where StuID is not null;
-- go