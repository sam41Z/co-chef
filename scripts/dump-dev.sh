#!/bin/bash
docker exec -i cochef_db_1 pg_dump --username postgres cochef_dev > dump.sql
