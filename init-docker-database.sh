docker container stop hris-api
docker exec hris-db psql -h localhost -U postgres -c "DROP DATABASE IF EXISTS hris;"
docker exec hris-db psql -h localhost -U postgres -c "CREATE DATABASE hris;"
docker exec hris-db psql -h localhost -U postgres hris < /tmp/db/backup.sql
docker exec hris-api npm run migration:run
docker container start hris-api
