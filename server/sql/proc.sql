use dbPocketTest;
go

create proc sp_find_not_over_record
as
    select * from AttendRec
    where IsOver=0;
    go

