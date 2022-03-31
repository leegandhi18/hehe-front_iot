@echo off
ECHO Start Edge Programs

cd mqttbroker
docker-compose up

cd ../SmartConnector
dotnet run