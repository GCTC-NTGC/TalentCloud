<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobPosterNonLocalized implements JsonSerializable {

    private $id;
    private $manager_user_id;
    private $title_en;
    private $title_fr;
    private $department_id;
    private $province_id;
    private $branch_en;
    private $branch_fr;
    private $division_en;
    private $division_fr;
    private $city_en;
    private $city_fr;
    private $term_qty;
    private $term_units_id;
    private $open_date;
    private $close_date;
    private $start_date;
    private $remuneration_range_low;
    private $remuneration_range_high;
    private $job_min_level_id;
    private $job_max_level_id;
    private $impact_en;
    private $impact_fr;
    private $key_tasks_en;
    private $key_tasks_fr;
    private $core_competencies_en;
    private $core_competencies_fr;
    private $developing_competencies_en;
    private $developing_competencies_fr;
    private $questions_en;
    private $questions_fr;
    private $classification;
    private $clearance_id;
    private $language_id;

    public function __construct(
            $id=null,
            $manager_user_id=null,
            $title_en=null,
            $title_fr=null,
            $department_id=null,
            $province_id=null,
            $branch_en=null,
            $branch_fr=null,
            $division_en=null,
            $division_fr=null,
            $city_en=null,
            $city_fr=null,
            $term_qty=null,
            $term_units_id=null,
            $open_date=null,
            $close_date=null,
            $start_date=null,
            $remuneration_range_low=null,
            $remuneration_range_high=null,
            $job_min_level_id=null,
            $job_max_level_id=null,
            $impact_en=null,
            $impact_fr=null,
            $key_tasks_en=null,
            $key_tasks_fr=null,
            $core_competencies_en=null,
            $core_competencies_fr=null,
            $developing_competencies_en=null,
            $developing_competencies_fr=null,
            $questions_en=[],
            $questions_fr=[],
            $classification=null,
            $clearance_id=null,
            $language_id=null
        ) {
        $this->id = $id;
        $this->manager_user_id = $manager_user_id;
        $this->title_en = $title_en;
        $this->title_fr = $title_fr;
        $this->department_id = $department_id;
        $this->province_id = $province_id;
        $this->branch_en = $branch_en;
        $this->branch_fr = $branch_fr;
        $this->division_en = $division_en;
        $this->division_fr = $division_fr;
        $this->city_en = $city_en;
        $this->city_fr = $city_fr;
        $this->term_qty = $term_qty;
        $this->term_units_id = $term_units_id;
        $this->open_date = $open_date;
        $this->close_date = $close_date;
        $this->start_date = $start_date;
        $this->remuneration_range_low = $remuneration_range_low;
        $this->remuneration_range_high = $remuneration_range_high;
        $this->job_min_level_id = $job_min_level_id;
        $this->job_max_level_id = $job_max_level_id;
        $this->impact_en = $impact_en;
        $this->impact_fr = $impact_fr;
        $this->key_tasks_en = $key_tasks_en;
        $this->key_tasks_fr = $key_tasks_fr;
        $this->core_competencies_en = $core_competencies_en;
        $this->core_competencies_fr = $core_competencies_fr;
        $this->developing_competencies_en = $developing_competencies_en;
        $this->developing_competencies_fr = $developing_competencies_fr;
        $this->questions_en = $questions_en;
        $this->questions_fr = $questions_fr;
        $this->classification = $classification;
        $this->clearance_id = $clearance_id;
        $this->language_id = $language_id;
    }


    public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if(substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }

    public function getId() {
        return $this->id;
    }

    public function getManager_user_id() {
        return $this->manager_user_id;
    }

    public function getTitle_en() {
        return $this->title_en;
    }

    public function getTitle_fr() {
        return $this->title_fr;
    }

    public function getDepartment_id() {
        return $this->department_id;
    }

    public function getProvince_id() {
        return $this->province_id;
    }

    public function getBranch_en() {
        return $this->branch_en;
    }

    public function getBranch_fr() {
        return $this->branch_fr;
    }

    public function getDivision_en() {
        return $this->division_en;
    }

    public function getDivision_fr() {
        return $this->division_fr;
    }

    public function getCity_en() {
        return $this->city_en;
    }

    public function getCity_fr() {
        return $this->city_fr;
    }

    public function getTerm_qty() {
        return $this->term_qty;
    }

    public function getTerm_units_id() {
        return $this->term_units_id;
    }

    public function getOpen_date() {
        return $this->open_date;
    }

    public function getClose_date() {
        return $this->close_date;
    }

    public function getStart_date() {
        return $this->start_date;
    }

    public function getRemuneration_range_low() {
        return $this->remuneration_range_low;
    }

    public function getRemuneration_range_high() {
        return $this->remuneration_range_high;
    }

    public function getJob_min_level_id() {
        return $this->job_min_level_id;
    }

    public function getJob_max_level_id() {
        return $this->job_max_level_id;
    }

    public function getImpact_en() {
        return $this->impact_en;
    }

    public function getImpact_fr() {
        return $this->impact_fr;
    }

    public function getKey_tasks_en() {
        return $this->key_tasks_en;
    }

    public function getKey_tasks_fr() {
        return $this->key_tasks_fr;
    }

    public function getCore_competencies_en() {
        return $this->core_competencies_en;
    }

    public function getCore_competencies_fr() {
        return $this->core_competencies_fr;
    }

    public function getDeveloping_competencies_en() {
        return $this->developing_competencies_en;
    }

    public function getDeveloping_competencies_fr() {
        return $this->developing_competencies_fr;
    }

    public function getQuestions_en() {
        return $this->questions_en;
    }

    public function getQuestions_fr() {
        return $this->questions_fr;
    }

    public function getClassification() {
        return $this->classification;
    }

    public function getClearance_id() {
        return $this->clearance_id;
    }

    public function getLanguage_id() {
        return $this->language_id;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setManager_user_id($manager_user_id) {
        $this->manager_user_id = $manager_user_id;
        return $this;
    }

    public function setTitle_en($title_en) {
        $this->title_en = $title_en;
        return $this;
    }

    public function setTitle_fr($title_fr) {
        $this->title_fr = $title_fr;
        return $this;
    }

    public function setDepartment_id($department_id) {
        $this->department_id = $department_id;
        return $this;
    }

    public function setProvince_id($province_id) {
        $this->province_id = $province_id;
        return $this;
    }

    public function setBranch_en($branch_en) {
        $this->branch_en = $branch_en;
        return $this;
    }

    public function setBranch_fr($branch_fr) {
        $this->branch_fr = $branch_fr;
        return $this;
    }

    public function setDivision_en($division_en) {
        $this->division_en = $division_en;
        return $this;
    }

    public function setDivision_fr($division_fr) {
        $this->division_fr = $division_fr;
        return $this;
    }

    public function setCity_en($city_en) {
        $this->city_en = $city_en;
        return $this;
    }

    public function setCity_fr($city_fr) {
        $this->city_fr = $city_fr;
        return $this;
    }

    public function setTerm_qty($term_qty) {
        $this->term_qty = $term_qty;
        return $this;
    }

    public function setTerm_units_id($term_units_id) {
        $this->term_units_id = $term_units_id;
        return $this;
    }

    public function setOpen_date($open_date) {
        $this->open_date = $open_date;
        return $this;
    }

    public function setClose_date($close_date) {
        $this->close_date = $close_date;
        return $this;
    }

    public function setStart_date($start_date) {
        $this->start_date = $start_date;
        return $this;
    }

    public function setRemuneration_range_low($remuneration_range_low) {
        $this->remuneration_range_low = $remuneration_range_low;
        return $this;
    }

    public function setRemuneration_range_high($remuneration_range_high) {
        $this->remuneration_range_high = $remuneration_range_high;
        return $this;
    }

    public function setJob_min_level_id($job_min_level_id) {
        $this->job_min_level_id = $job_min_level_id;
        return $this;
    }

    public function setJob_max_level_id($job_max_level_id) {
        $this->job_max_level_id = $job_max_level_id;
        return $this;
    }

    public function setImpact_en($impact_en) {
        $this->impact_en = $impact_en;
        return $this;
    }

    public function setImpact_fr($impact_fr) {
        $this->impact_fr = $impact_fr;
        return $this;
    }

    public function setKey_tasks_en($key_tasks_en) {
        $this->key_tasks_en = $key_tasks_en;
        return $this;
    }

    public function setKey_tasks_fr($key_tasks_fr) {
        $this->key_tasks_fr = $key_tasks_fr;
        return $this;
    }

    public function setCore_competencies_en($core_competencies_en) {
        $this->core_competencies_en = $core_competencies_en;
        return $this;
    }

    public function setCore_competencies_fr($core_competencies_fr) {
        $this->core_competencies_fr = $core_competencies_fr;
        return $this;
    }

    public function setDeveloping_competencies_en($developing_competencies_en) {
        $this->developing_competencies_en = $developing_competencies_en;
        return $this;
    }

    public function setDeveloping_competencies_fr($developing_competencies_fr) {
        $this->developing_competencies_fr = $developing_competencies_fr;
        return $this;
    }

    public function setQuestions_en($questions_en) {
        $this->questions_en = $questions_en;
        return $this;
    }

    public function setQuestions_fr($questions_fr) {
        $this->questions_fr = $questions_fr;
        return $this;
    }

    public function setClassification($classification) {
        $this->classification = $classification;
        return $this;
    }

    public function setClearance_id($clearance_id) {
        $this->clearance_id = $clearance_id;
        return $this;
    }

    public function setLanguage_id($language_id) {
        $this->language_id = $language_id;
        return $this;
    }

}
