echo "Create SSL certificate for talent.local.ca"
SET CURRENTDIR="%cd%"
docker run --rm -v %CURRENTDIR%/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate
