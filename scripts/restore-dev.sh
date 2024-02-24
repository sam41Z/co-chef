#!/bin/bash
docker cp dump.sql cochef_db_1:/
docker exec -i cochef_db_1 psql -d cochef_dev -U postgres -f dump.sql
