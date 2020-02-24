## 考勤记录 查询教室的实时占用情况

- 根据时间段查询可用教室, 给定时间段`[startTime,endTime]`

通过给定的时间区间, 在已有的考勤计划中`AttendRec`表中, 查询该时间段被占用的教室, 结果的补集即为当前可用教室

数据库查询sql语句为:
```tsql
@startTime smalldatetime
@endTime smalldatetime
select RoomID from AttendRed
where BeginTime between @startTime and @endTime or EndTime between @startTime and @endTime
```