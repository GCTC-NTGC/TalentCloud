# TalentCloud
# Dockerfile

FROM alpine:3.7

VOLUME ./data/db/dumps:/docker-entrypoint-initdb.d

# RUN apk add --no-cache mysql-client && \
#   mysql -u root -e "CREATE DATABASE talentcloud" && \
#   mysql -u root -p talentcloud < /tmp/db.sql

ENTRYPOINT ["mysql"]
