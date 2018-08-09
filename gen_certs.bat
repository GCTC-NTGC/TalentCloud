echo "Create SSL certificate for tc.gccollab.ca"
SET CURRENTDIR="%cd%"
docker run --rm -v %CURRENTDIR%/etc/ssl:/certificates -e "SERVER=tc.gccollab.ca" jacoelho/generate-certificate
