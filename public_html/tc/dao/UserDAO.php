<?php

	
date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once '../dao/BaseDAO.php';
require_once '../model/User.php';

class UserDAO extends BaseDAO{
    
    /**
     * 
     * @param type $email_address
     * @param type $password
     * @return type
     */
    public static function getUserByCredentials($email_address, $password){
        
        /*
         * SELECT u.firstname, u.lastname, ur.user_role  FROM tc.user u, tc.user_role ur
        WHERE u.email = 'test@test.com'
        AND u.password = MD5('password')
        AND u.is_confirmed = true
        AND ur.user_role_id = u.user_role_id
        LIMIT 1;
         */
        $link = BaseDAO::getConnection();
        $decodeEmail = urldecode($email_address);
        $enc_password = md5(urldecode($password));
        //var_dump(urldecode($email_address));
        //var_dump($enc_password);
        $sqlStr = "
            SELECT u.user_id as user_id, u.email as email, u.firstname as firstname, u.lastname as lastname, u.is_confirmed as is_confirmed, ur.user_role as user_role 
            FROM user u, user_role ur
            WHERE u.email = :email_address
            AND u.password = :password
            AND ur.user_role_id = u.user_role_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':email_address', $decodeEmail, PDO::PARAM_STR);
        $sql->bindParam(':password', $enc_password, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'User', array('user_id', 'email', 'firstname', 'lastname', 'is_confirmed', 'user_role'));
            $row = $sql->fetch();
            //var_dump($row);
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $row;
    }
    
    
    public static function registerUser(User $user){
        
            $email = $user->getEmail();
            $password = $user->getPassword();
            $md5_password = md5($password);
            $is_confirmed = $user->getIs_confirmed();
            $user_role = $user->getUser_role();
            
            $link = BaseDAO::getConnection();
            $sqlStr = "INSERT INTO user 
                (
                email,
                password,
                is_confirmed,
                user_role_id
                )
                VALUES 
                (
                :email,
                :password,
                :is_confirmed,
                (SELECT ur.user_role_id FROM user_role ur WHERE ur.user_role = :user_role)
                )";

            $sql = $link->prepare($sqlStr);
            $sql->bindParam(':email', $email, PDO::PARAM_STR);
            $sql->bindParam(':password', $md5_password, PDO::PARAM_STR);
            $sql->bindParam(':is_confirmed', $is_confirmed, PDO::PARAM_INT);
            $sql->bindParam(':user_role', $user_role, PDO::PARAM_STR);
            //var_dump($sql);

            $count = 0;
            try {
                $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
                $count = $sql->rowCount();
                if($count > 0){
                    $user_id = $link->lastInsertId();
                }
                $user->setUser_id($user_id);
            } catch (PDOException $e) {
                    //var_dump(PDO::errorInfo());
                    return 'authenticateUser failed: ' . $e->getMessage();
            }
            BaseDAO::closeConnection($link);
            //var_dump($id);
            return $user;
        
    }
    
    public static function validateEmail($emailAddress){

        /*
         * SELECT user_id FROM tc.user WHERE email = '';
         */
        $link = BaseDAO::getConnection();
        $decodeEmail = urldecode($email_address);
        //var_dump(urldecode($email_address));
        //var_dump($enc_password);
        $sqlStr = "SELECT user_id FROM user WHERE email = :email_address";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':email_address', $decodeEmail, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $row = $sql->fetch();
            //var_dump($row);
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $row;
    }
    
    
    /**
     * 
     * @param type $email_address
     * @param type $password
     * @return type
     */
    public static function getUserById(User $user){
        
        /*
         * SELECT u.firstname, u.lastname, ur.user_role  FROM tc.user u, tc.user_role ur
        WHERE u.email = 'test@test.com'
        AND u.password = MD5('password')
        AND u.is_confirmed = true
        AND ur.user_role_id = u.user_role_id
        LIMIT 1;
         */
        $link = BaseDAO::getConnection();
        $user_id = $user->getUser_id();
        //var_dump(urldecode($email_address));
        //var_dump($enc_password);
        $sqlStr = "
            SELECT u.user_id as user_id, u.email as email, u.firstname as firstname, u.lastname as lastname, u.is_confirmed as is_confirmed, ur.user_role as user_role 
            FROM user u, user_role ur
            WHERE u.user_id = :user_id
            AND ur.user_role_id = u.user_role_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'User', array('user_id', 'email', 'firstname', 'lastname', 'is_confirmed', 'user_role'));
            $row = $sql->fetch();
            //var_dump($row);
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $row;
    }
    
}