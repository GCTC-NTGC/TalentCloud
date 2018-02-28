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
require_once '../model/JobPosterApplication.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobApplicationDAO extends BaseDAO {
    
    public static function getApplicationQuestionAnswersByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                qa.application_question_answer_id as qa_id,
                qa.job_poster_application_id as application_id,
                qa.question as question,
                qa.answer as answer
            FROM application_question_answer as qa
            WHERE
                qa.job_poster_application_id = :job_poster_application_id
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ApplicationQuestionAnswer', array('application_question_answer_id', 'job_poster_application_id','question','answer'));
            
            $questionAnswers = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getApplicationQuestionAnswersByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $questionAnswers;
    }
    
}