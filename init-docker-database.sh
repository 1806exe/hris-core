docker container stop hris-api
docker exec hris-db psql -h localhost -U postgres -c "DROP DATABASE IF EXISTS hris;"
docker exec hris-db psql -h localhost -U postgres -c "CREATE DATABASE hris;"
docker exec hris-db psql -h localhost -U postgres -d hris -f /tmp/db/backup.sql
echo 'Starting Migration'
npm run migration:run
echo 'Done Migration'
echo 'Starting the API Container'
docker container start hris-api
