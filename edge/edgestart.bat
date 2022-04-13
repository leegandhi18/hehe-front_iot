@echo off
ECHO Start Edge Programs

cd mqttbroker
docker-compose up -d

cd ../vision
start cmd /k call Vision.bat

cd ../SmartConnector
dotnet run

pause
cd mqttbroker
docker-compose down
exit