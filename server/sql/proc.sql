use dbPocketTest;
go

create proc sp_system_info
as
select @@VERSION version, @@SERVERNAME server;
go

-- 查找所有没有完结的考勤记录, 用于云服务器扫描
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


-- 查找某学生完结或者未完结的考勤记录
create proc sp_find_record_student
    @StudID varchar(15),
    @IsOver bit
as
    select * from AttendRec
    where StuID=@StudID and IsOver=@IsOver;
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
    where SvrID=@id
    select SvrID id, Online online, State state from AgentServer
    where SvrID=@id;
go

-- 修改代理服务器绑定的教室id
create proc sp_update_device_room_id
    @id smallint,
    @room smallint
as
    update AgentServer
    set roomID=@room
    where svrID=@id;

    select * from AgentServer
    where svrID=@id;
go

-- 关于我的所有考勤记录
create proc sp_find_record_by_student_id
    @id varchar(15)
as
    select * from AttendRec
    where StuID=@id
    order by RecID desc;
go


-- 查找某门课程的所有考勤计划的开始时间
create proc sp_find_begin_time_by_lesson
    @lesson varchar(20),
    @term char(6)
as
    select distinct BeginTime from AttendRec
    where LessonID=@lesson and Term=@term;
go

-- 查找某个设备某时刻正在进行的所有考勤记录
create proc sp_find_records_some_time
    @svrId smallint,
    @time smalldatetime
as
    select * from AttendRec
    where SvrID = @svrId and BeginTime < @time and EndTime > @time;
go

-- 查找某个教室某时刻正在进行的所有考勤记录
create proc sp_find_records_some_time_in_room
    @roomId smallint,
    @time smalldatetime
as
    select * from AttendRec
    where RoomID = @roomId and @time between BeginTime and EndTime;
go

-- 查找某个教室现在正在考勤的所有考勤记录
create proc sp_find_records_now_in_room
    @roomId smallint
as
    declare @now smalldatetime = getdate()
    select * from AttendRec
    where @now between BeginTime and EndTime and roomID = @roomId;
go

-- 通过蓝牙MAC地址查找某个学生
create proc sp_find_student_by_mac
    @mac char(12)
as
    select * from Student
    where MAC=@mac;
go

-- 获取班级列表
create proc sp_find_student_classes
as
    select distinct ClassID class from Student;
go

-- 为课程添加选修班级的学生
create proc sp_add_select_lesson
    @lessonId varchar(20),
    @term char(6),
    @classId smallint
as
declare cur cursor for select stuId from Student where classID=@classId
    open cur
declare @stuId varchar(15)
    fetch next from cur into @stuId
    while @@fetch_status=0
        begin
            insert into SelectLesson
            values
            (@lessonId,@term,@stuId)
            fetch next from cur into @stuId
        end
    close cur
    deallocate cur;
go

-- 删除课程
create proc sp_delete_lesson
    @lessonId varchar(20),
    @term char(6)
as
    delete SelectLesson where lessonID=@lessonId and term=@term
    delete Lesson where lessonID=@lessonId and term=@term;
go





