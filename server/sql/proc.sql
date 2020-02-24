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

-- 查看选修该课程的学生姓名和学号
create proc sp_find_student_with_lesson
    @lessonId varchar(20),
    @term char(6)
as
select StuID id, StuName name from Student
where StuID in (
    select StuID
    from SelectLesson
    where LessonID=@lessonId and Term=@term
);
go


-- 查看今天的考勤的开始时间
create proc sp_find_today_record_begin
    @lessonId varchar(20),
    @term char(6)
as
    declare @today smalldatetime
    set @today = convert(smalldatetime,convert(varchar(10),getdate(),120),120)
    select distinct BeginTime from AttendRec
    where LessonID=@lessonId and Term=@term and BeginTime > @today;
go

-- 查询今天内的所有考勤计划
create proc sp_find_today_plan
    as
    declare @today smalldatetime = convert(smalldatetime,convert(varchar(10),getdate(),120),120)
    declare @tomorrow smalldatetime = dateadd(day,1,@today)
    select rec.LessonID lessonId,LessonName name,rec.Term term,roomId,rec.beginTime,rec.endTime
    from (
         select distinct BeginTime, EndTime, RoomID, LessonID, Term from AttendRec
         where BeginTime >= @today and EndTime <= @tomorrow
        ) rec left join Lesson lesson
        on rec.LessonID = lesson.LessonID and rec.Term = lesson.Term;
go

-- 查询可用教室
create proc sp_find_usable_room
    @start smalldatetime,
    @end smalldatetime
    as
    select * from Room
    where RoomID not in (
        select distinct RoomID from AttendRec
        where @start between BeginTime and EndTime
           or @end between BeginTime and EndTime
    )
go

-- 更新代理服务器在线状态
create proc sp_check_online
    @id smallint,
    @online bit,
    @exception bit
    as
    update AgentServer
    set Online=@online, Exception=@exception
    where SvrID=@id;
go


exec sp_find_student_with_lesson '10000004','2020.1';
go