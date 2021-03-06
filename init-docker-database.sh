docker container stop hris-api
docker exec hris-db psql -h localhost -U postgres -c "DROP DATABASE IF EXISTS hris;"
docker exec hris-db psql -h localhost -U postgres -c "CREATE DATABASE hris;"
docker exec hris-db psql -h localhost -U postgres -c "CREATE ROLE symfony;"
docker exec hris-db psql -h localhost -U postgres -c "GRANT ALL ON DATABASE hris TO symfony;"
docker exec hris-db psql -h localhost -U postgres -c "GRANT ALL ON DATABASE hris TO postgres;"
docker exec hris-db psql -h localhost -U postgres -c "CREATE DATABASE hr_e2e_test;"
docker exec hris-db psql -h localhost -U postgres -d hris -f /tmp/db/backup.sql
echo 'Starting Migration'
npm run migration:docker
echo 'Done Migration'
echo 'Starting the API Container'
docker container start hris-api
