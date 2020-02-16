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
('100000012', N'Jack',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',12)

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
(1,N'Bob','daf98543-c487-af6c-eb23-0cae002c92fd',1)

select *
from Teacher;
go

insert into Room
values
(1,N'210',50,N'里学院'),
(2,N'310',60,N'智尚楼'),
(3,N'112',40,N'扎楼')

insert into AgentServer




-- delete Student
-- where StuID is not null;
-- go