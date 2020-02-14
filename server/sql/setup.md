安装SQL Server并设置密码
```bash
docker run -e "ACCEPT_EULA=Y" -e 'SA_PASSWORD=sql2020DB$$' \
   -p 1433:1433 --name sqlX \
   -v ~/Food/mssql/data:/root:Z \
   -d mcr.microsoft.com/mssql/rhel/server:2019-CU1-rhel-8
```