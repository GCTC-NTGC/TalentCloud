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


/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/ProfilePic.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class ProfilePicDAO extends BaseDAO {
    
    /**
     * 
     * @param type $user_id
     * @return type ProfilePic
     */
    public static function getProfilePic($user_id) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            SELECT 
                profile_pic.user_id,
                profile_pic.image,
                profile_pic.last_updated,
                profile_pic.type,
                profile_pic.size
            FROM profile_pic
            WHERE profile_pic.user_id = :user_id
            ORDER BY profile_pic.last_updated DESC LIMIT 1
            ;";
        $sql = $link->prepare($sql_str);
        $user_id_int = intval($user_id);
        $sql->bindParam(':user_id', $user_id_int, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'ProfilePic',array('user_id','image','last_updated', 'type', 'size'));
            $profile_pic = $sql->fetch();
        } catch (PDOException $e) {
            return 'getProfilePic failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $profile_pic;
    }
    
    public static function putProfilePic($profile_pic) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            INSERT INTO profile_pic
            (
                user_id,
                image,
                last_updated,
                type,
                size
            )
            VALUES
            (
                :user_id,
                :image,
                now(),
                :type,
                :size
            )
            ON DUPLICATE KEY UPDATE
                image=:image,
                last_updated=now(),
                type=:type,
                size=:size
            ;";
        $sql = $link->prepare($sql_str);
        
        $user_id = intval($profile_pic->getUser_id());
        $image = $profile_pic->getImage();
        $type = $profile_pic->getType();
        $size = intval($profile_pic->getSize());
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->bindParam(':image', $image, PDO::PARAM_LOB);
        $sql->bindParam(':type', $type, PDO::PARAM_STR);
        $sql->bindParam(':size', $size, PDO::PARAM_INT);
        
        $rowsmodified = 0;
        
        try {
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'putProfilePic failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
}