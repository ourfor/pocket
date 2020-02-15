use DBPocket;

insert into Student
values
('100000001', N'张三',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',1),
('100000002', N'李四',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',2),
('100000003', N'王五',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',3),
('100000004', N'张1',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',4),
('100000005', N'张2',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',5),
('100000006', N'张3',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',6),
('100000007', N'张4',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',7),
('100000008', N'okkk',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',8),
('100000009', N'dddg',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',9),
('100000010', N'ggi1',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',10),
('100000011', N'gieg',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',11),
('100000012', N'aage',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',12)

-- test MAC: 50-8F-4C-E2-A8-01 A0-C5-89-E3-75-FF
-- md5(default) = c21f969b5f03d33d43e04f8f136e7682 c21f969b-5f03-d33d-43e0-4f8f136e7682
select *
from Student

delete Student
where StuID is not null;
go