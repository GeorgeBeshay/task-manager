@echo off
REM -----------------------------
REM Start MySQL Docker Container
REM -----------------------------

REM Set container name and host port
SET CONTAINER_NAME=mysql-tasks-container
SET HOST_PORT=3307

REM Check if container exists
docker ps -a --format "{{.Names}}" | findstr /R /C:"^%CONTAINER_NAME%$" >nul
IF %ERRORLEVEL% EQU 0 (
    echo MySQL container already exists. Starting it...
    docker start %CONTAINER_NAME%
) ELSE (
    echo Creating and starting MySQL container...
    docker run --name %CONTAINER_NAME% ^
        -e MYSQL_ROOT_PASSWORD=rootpass ^
        -e MYSQL_DATABASE=tasks_db ^
        -e MYSQL_USER=nestuser ^
        -e MYSQL_PASSWORD=nestpass ^
        -v "%cd%\init.sql:/docker-entrypoint-initdb.d/init.sql" ^
        -p %HOST_PORT%:3306 -d mysql:8
)

echo.
echo MySQL is running on host port %HOST_PORT%
echo.
pause
