@echo off
ECHO Start Edge Programs

cd mqttbroker
docker-compose up -d

cd ../SmartConnector
dotnet run