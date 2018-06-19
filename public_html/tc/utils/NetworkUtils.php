<?php

class NetworkUtils {

    /**
     * Adapted from OpenIDConnectClient for PHP5 by Michael Jett
     * 
     * @param $url
     * @param null $post_body string If this is set the post type will be POST
     * @param array() $headers Extra headers to be send with the request. Format as 'NameHeader: ValueHeader'
     * @throws OpenIDConnectClientException
     * @return mixed
     */
    public static function fetchURL($url, $post_body = null, $headers = array()) {


        // OK cool - then let's create a new cURL resource handle
        $ch = curl_init();

        // Determine whether this is a GET or POST
        if ($post_body != null) {
            // curl_setopt($ch, CURLOPT_POST, 1);
            // Alows to keep the POST method even after redirect
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_body);

            // Default content type is form encoded
            $content_type = 'application/x-www-form-urlencoded';

            // Determine if this is a JSON payload and add the appropriate content type
            if (is_object(json_decode($post_body))) {
                $content_type = 'application/json';
            }

            // Add POST-specific headers
            $headers[] = "Content-Type: {$content_type}";
            $headers[] = 'Content-Length: ' . strlen($post_body);
        }

        // If we set some heaers include them
        if (count($headers) > 0) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        // Set URL to download
        curl_setopt($ch, CURLOPT_URL, $url);

        // Include header in result? (0 = yes, 1 = no)
        curl_setopt($ch, CURLOPT_HEADER, 0);

        // Allows to follow redirect
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        /**
         * Set cert
         * Otherwise ignore SSL peer verification
         */
        /*
        if (isset($this->certPath)) {
            curl_setopt($ch, CURLOPT_CAINFO, $this->certPath);
        }

        if ($this->verifyHost) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        } else {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        }

        if ($this->verifyPeer) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        } else {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        }
         * 
         */

        //TODO: verify hosts properly!
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // Should cURL return or print out the data? (true = return, false = print)
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Timeout in seconds
        curl_setopt($ch, CURLOPT_TIMEOUT, NETWORK_REQUEST_TIMEOUT);

        // Download the given URL, and return output
        $output = curl_exec($ch);

        // HTTP Response code from server may be required from subclass
        //$info = curl_getinfo($ch);
        //$this->responseCode = $info['http_code'];

        if ($output === false) {
            throw new Exception('Curl error: ' . curl_error($ch));
        }

        // Close the cURL resource, and free system resources
        curl_close($ch);

        return $output;
    }

}
