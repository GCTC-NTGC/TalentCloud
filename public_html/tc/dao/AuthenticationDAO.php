<?php

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

/** Model Classes */
require_once __DIR__ . '/../dao/BaseDAO.php';
require_once __DIR__ . '/../model/User.php';

/**
 * Summary: Data Access Object for Authenticating users
 * 
 * @extends BaseDAO
 */
class AuthenticationDAO extends BaseDAO {

    /**
     * 
     * @param type $email_address
     * @param type $password
     * @return type
     */
    public static function authenticateUser($email_address, $password) {

            $md5_password = md5($password);
            
            $link = BaseDAO::getConnection();
            $sqlStr = "SELECT u.user_id, u.email, u.firstname, u.lastname, u.is_confirmed, ur.user_role 
                FROM user u, user_role ur
                WHERE u.email = :email_address 
                AND u.password = :password 
                AND u.is_confirmed = true 
                AND ur.user_role_id = u.user_role_id 
                LIMIT 1";

            $sql = $link->prepare($sqlStr);
            $sql->bindParam(':email_address', $email_address, PDO::PARAM_STR);
            $sql->bindParam(':password', $md5_password, PDO::PARAM_STR);

            try {
                $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
                $sql->setFetchMode(PDO::FETCH_CLASS, 'User', array('user_id', 'email', 'firstname', 'lastname', 'is_confirmed', 'user_role'));
                $row = $sql->fetch();
            } catch (PDOException $e) {
                    //var_dump(PDO::errorInfo());
                    return 'authenticateUser failed: ' . $e->getMessage();
            }
            BaseDAO::closeConnection($link);
            return $row;
    }
        
        public static function storeAuthToken($token, User $authUser) {
            
            $user_id = intval($authUser->getUser_id());
            $access_token = $token['access_token'];
            $expires_in = intval($token['expires_in']);
            $token_type = $token['token-type'];
            $scope = $token['scope'];
            
            $link = BaseDAO::getConnection();
            $sqlStr = "INSERT INTO user_token 
                (
                user_id,
                access_token,
                expires_in,
                token_type,
                scope
                )
                VALUES 
                (
                :user_id,
                :access_token,
                :expires_in,
                :token_type,
                :scope
                )";

            $sql = $link->prepare($sqlStr);
            $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $sql->bindParam(':access_token', $access_token, PDO::PARAM_STR);
            $sql->bindParam(':expires_in', $expires_in, PDO::PARAM_INT);
            $sql->bindParam(':token_type', $token_type, PDO::PARAM_STR);
            $sql->bindParam(':scope', $scope, PDO::PARAM_STR);
            //var_dump($sql);

            $count = 0;
            try {
                $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
                $count = $sql->rowCount();
                if ($count > 0) {
                    $id = $link->lastInsertId();
                }
            } catch (PDOException $e) {
                    //var_dump(PDO::errorInfo());
                    return 'authenticateUser failed: ' . $e->getMessage();
            }
            BaseDAO::closeConnection($link);
            //var_dump($id);
            return $id;
        }
        
        
        public static function getAuthTokenByUserId(User $authUser) {
            
            $user_id = intval($authUser->getUser_id());
            
            $link = BaseDAO::getConnection();
            $sqlStr = "SELECT ut.access_token
            FROM tc.user_token ut
            WHERE ut.user_id =:access_token";

            $sql = $link->prepare($sqlStr);
            $sql->bindParam(':access_token', $access_token, PDO::PARAM_STR);

            $count = 0;
            try {
                $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
                $count = $sql->rowCount();
                if ($count > 0) {
                    $id = $link->lastInsertId();
                }
            } catch (PDOException $e) {
                    //var_dump(PDO::errorInfo());
                    return 'authenticateUser failed: ' . $e->getMessage();
            }
            BaseDAO::closeConnection($link);
            //var_dump($id);
            return $id;
        }

}

?>