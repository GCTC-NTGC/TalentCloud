<?php

exec('java -jar /ebs2/vhosts/f.gccollab.ca/tc.gccollab.ca/wiremock/wiremock-standalone-2.6.0.jar --port 8082 --https-port 8083 --verbose --preserve-host-header > output.txt', $result);
print_r($result);

?>