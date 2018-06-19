<?php
    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));
    //var_dump($requestURI);

    if (!isset($_SERVER['PHP_AUTH_USER']) && !isset($_SERVER['PHP_AUTH_PW'])) {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Text to send if user hits Cancel button';
        exit;
    } else {
        if ($_SERVER['PHP_AUTH_USER'] == 'test' && $_SERVER['PHP_AUTH_PW'] == 'test') {
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json");
            header("Accept: application/json");

            $context = '/';

            $requestParams = substr($requestURI, strlen($context) + 1);
            
            switch ($requestMethod) {
                case 'GET':
                    
                    if (strlen($requestParams) > 1) {
                        $result = array('user' => 'test', 'pass' => 'test');
                        $json = json_encode($result);
                        echo($json);
                    } else {
                        $result1 = array('user' => 'test', 'pass' => 'test');
                        $result2 = array('user' => 'test1', 'pass' => 'test1');
                        $result3 = array('user' => 'test2', 'pass' => 'test2');
                        $result = array();
                        array_push($result, $result1);
                        array_push($result, $result2);
                        array_push($result, $result3);
                        
                        $json = json_encode($result);
                        echo($json);
                    }
                    
                    break;
                case 'POST':
                    //Here Handle POST Request 
                    break;
                case 'DELETE':
                    //Here Handle DELETE Request 
                    break;
                case 'PUT':
                    //Here Handle PUT Request 
                    break;
                case 'OPTIONS':
                    //Here Handle OPTIONS/Pre-flight requests
                    header("Access-Control-Allow-Headers: accept, content-type");
                    header("Access-Control-Allow-Methods: GET,POST,DELETE,PUT");
                    echo("");
                    break;
            }
        } else {
            header('WWW-Authenticate: Basic realm="My Realm"');
            header('HTTP/1.0 401 Unauthorized');
            echo 'Authorization declined';
            exit;
        }
    }
?>