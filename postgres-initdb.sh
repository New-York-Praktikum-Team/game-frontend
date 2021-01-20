#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE ROLE nyma WITH LOGIN PASSWORD 'nyma';
    CREATE DATABASE "nyma-api" OWNER = nyma;
    GRANT ALL PRIVILEGES ON DATABASE "nyma-api" TO nyma;
EOSQL
