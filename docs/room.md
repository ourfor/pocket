## 考勤记录 查询教室的实时占用情况

- 根据时间段查询可用教室, 给定时间段`[startTime,endTime]`

通过给定的时间区间, 在已有的考勤计划中`AttendRec`表中, 查询该时间段被占用的教室, 结果的补集即为当前可用教室

数据库查询sql语句为:
```tsql
declare @start smalldatetime = '2020-02-24 14:30:00'
declare @end smalldatetime = '2020-02-24 15:30:00'
select distinct RoomID from AttendRec
where @start between BeginTime and EndTime or @end between BeginTime and EndTime;
go
```
可以得到在 `2020-02-24 14:30:00` - `2020-02-24 15:30:00` 这个时间段被暂用的教室, 查询没有被占用的教室, 只需要将上的教室作为子查询放在查询教室里面即可, 最后再检查下前端代理服务器的在线状态, 即为可用教室

```tsql
select * from Room where RoomID not in UsedRooms;
go
```
`UsedRooms`就是上面👆的查询。