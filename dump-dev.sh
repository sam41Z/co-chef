#!/bin/bash
docker exec -i breadtracker_db_1 pg_dump --username postgres breadtracker_dev > dump.sql
