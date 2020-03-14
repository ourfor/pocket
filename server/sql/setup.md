安装SQL Server并设置密码
```bash
docker run -e "ACCEPT_EULA=Y" -e 'SA_PASSWORD=sql2020DB$$' \
   -p 1433:1433 --name sqlX \
   -d mcr.microsoft.com/mssql/rhel/server:2019-CU1-rhel-8
```

使用*SQL Server Management Studio*还原备份的`dbPocket.bak`文件

更改`dbo`, 假定还原为数据库`dbPocket`
```tsql
use dbPocket exec sp_changedbowner 'sa';
go
```

还原 `mdf` 和 `ldf` 文件, [文档](https://docs.microsoft.com/en-us/sql/relational-databases/databases/attach-a-database?view=sql-server-ver15)

```tsql
create database pocket   
    on 
        (filename = 'C:\example\pocket_data.mdf'),   
        (filename = 'C:\example\pocket_log.ldf')   
    for attach;  
```