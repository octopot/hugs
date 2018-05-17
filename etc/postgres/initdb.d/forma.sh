#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER "forma" WITH PASSWORD 'forma';
    CREATE DATABASE "forma";
    GRANT ALL PRIVILEGES ON DATABASE "forma" TO "forma";
    \c "forma";
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
