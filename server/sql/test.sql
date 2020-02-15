use dbPocketTest;

insert into Student
values
('100000001', '张三',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',1),
('100000002', '李四',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',2),
('100000003', '王五',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',3),
('100000004', '小明',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',4),
('100000005', '小红',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',5),
('100000006', '小花',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',6),
('100000007', '张4',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',7),
('100000008', 'Pick',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',8),
('100000009', 'Bob',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',9),
('100000010', 'Micro',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',10),
('100000011', 'Blues',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',11),
('100000012', 'Jack',101,1,'c21f969b-5f03-d33d-43e0-4f8f136e7682','unknown',12)

-- test MAC: 50-8F-4C-E2-A8-01 A0-C5-89-E3-75-FF
-- md5(default) = c21f969b5f03d33d43e04f8f136e7682 c21f969b-5f03-d33d-43e0-4f8f136e7682
select *
from Student

-- delete Student
-- where StuID is not null;
-- go