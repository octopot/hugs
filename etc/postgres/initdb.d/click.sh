#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER "click" WITH PASSWORD 'click';
    CREATE DATABASE "click";
    GRANT ALL PRIVILEGES ON DATABASE "click" TO "click";
    \c "click";
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
