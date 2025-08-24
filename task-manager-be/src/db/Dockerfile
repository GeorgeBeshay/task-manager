FROM mysql:8.0

# Hardcoded environment variables
ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=tasks_db
ENV MYSQL_USER=nestuser
ENV MYSQL_PASSWORD=nestpass

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
