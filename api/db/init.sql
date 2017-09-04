CREATE USER brewbase SUPERUSER;

CREATE DATABASE brewbase_test OWNER brewbase;
GRANT ALL PRIVILEGES ON DATABASE "brewbase_test" to brewbase;

CREATE DATABASE brewbase_development OWNER brewbase;
GRANT ALL PRIVILEGES ON DATABASE "brewbase_development" to brewbase;

CREATE DATABASE brewbase_production OWNER brewbase;
GRANT ALL PRIVILEGES ON DATABASE "brewbase_production" to brewbase;
