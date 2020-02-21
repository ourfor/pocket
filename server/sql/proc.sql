use dbPocketTest;
go

create proc sp_find_not_over_record
as
    select * from AttendRec
    where IsOver=0;
go

-- 查看学生选修课程
create proc sp_find_select_lesson
    @StudID varchar(15)
as
    select * from (
        select LessonID, Term from SelectLesson where StuID=@StudID
    ) a left join Lesson b on a.LessonID=b.LessonID and a.Term = b.Term;
go

-- exec sp_find_select_lesson '100000009';
-- go
create proc sp_find_record_student
    @StudID varchar(15),
    @IsOver bit
as
    select * from AttendRec
    where StuID=@StudID and IsOver=@IsOver;
go

exec sp_find_record_student '202030184001', 0;
go
