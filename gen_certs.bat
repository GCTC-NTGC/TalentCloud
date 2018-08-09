echo "Create SSL certificate for tc.gccollab.ca"
docker run --rm -v $pwd/etc/ssl:/certificates -e "SERVER=tc.gccollab.ca" jacoelho/generate-certificate