<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JobPosting
 *
 * @author GBowden
 */
class JobPoster implements JsonSerializable {
    
    private $id;
    private $title;
    private $description;
    private $applicants_to_date;
    private $term_qty;
    private $term_units;
    private $job_min_level;
    private $job_max_level;
    private $job_start_date;
    private $job_end_date;
    private $close_date;
    private $department;
    private $location_province;
    private $location_city;
    private $remuneration_type;
    private $remuneration_range_low;
    private $remuneration_range_high;
    
    public function __construct($id, $title, $description, $applicants_to_date, $term_qty, $term_units, $job_min_level, $job_max_level, $job_start_date, $job_end_date, $close_date, $department, $location_province, $location_city,$remuneration_type,$remuneration_range_low,$remuneration_range_high) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->applicants_to_date = $applicants_to_date;
        $this->term_qty = $term_qty;
        $this->term_units = $term_units;
        $this->job_min_level = $job_min_level;
        $this->job_max_level = $job_max_level;
        $this->job_start_date = $job_start_date;
        $this->job_end_date = $job_end_date;
        $this->close_date = $close_date;
        $this->department = $department;
        $this->location_province = $location_province;
        $this->location_city = $location_city;
        $this->remuneration_type = $remuneration_type;
        $this->remuneration_range_low = $remuneration_range_low;
        $this->remuneration_range_high = $remuneration_range_high;
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

    public function getTitle() {
        return $this->title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getApplicants_to_date() {
        return $this->applicants_to_date;
    }

    public function getTerm_units() {
        return $this->term_units;
    }

    public function getTerm_qty() {
        return $this->term_qty;
    }

    public function getJob_min_level() {
        return $this->job_min_level;
    }

    public function getJob_max_level() {
        return $this->job_max_level;
    }

    public function getJob_start_date() {
        return $this->job_start_date;
    }

    public function getJob_end_date() {
        return $this->job_end_date;
    }

    public function getClose_date() {
        return $this->close_date;
    }

    public function getDepartment() {
        return $this->department;
    }

    public function getLocation_province() {
        return $this->location_province;
    }

    public function getLocation_city() {
        return $this->location_city;
    }
    
    public function getRemuneration_type() {
        return $this->remuneration_type;
    }

    public function getRemuneration_range_low() {
        return $this->remuneration_range_low;
    }

    public function getRemuneration_range_high() {
        return $this->remuneration_range_high;
    }
    
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    public function setApplicants_to_date($applicants_to_date) {
        $this->applicants_to_date = $applicants_to_date;
        return $this;
    }

    public function setTerm_units($term_units) {
        $this->term_units = $term_units;
        return $this;
    }

    public function setTerm_qty($term_qty) {
        $this->term_qty = $term_qty;
        return $this;
    }

    public function setJob_min_level($job_min_level) {
        $this->job_min_level = $job_min_level;
        return $this;
    }

    public function setJob_max_level($job_max_level) {
        $this->job_max_level = $job_max_level;
        return $this;
    }

    public function setJob_start_date($job_start_date) {
        $this->job_start_date = $job_start_date;
        return $this;
    }

    public function setJob_end_date($job_end_date) {
        $this->job_end_date = $job_end_date;
        return $this;
    }

    public function setClose_date($close_date) {
        $this->close_date = $close_date;
        return $this;
    }

    public function setDepartment($department) {
        $this->department = $department;
        return $this;
    }

    public function setLocation_province($location_province) {
        $this->location_province = $location_province;
        return $this;
    }

    public function setLocation_city($location_city) {
        $this->location_city = $location_city;
        return $this;
    }
    
    public function setRemuneration_type($remuneration_type) {
        $this->remuneration_type = $remuneration_type;
    }

    public function setRemuneration_range_low($remuneration_range_low) {
        $this->remuneration_range_low = $remuneration_range_low;
    }

    public function setRemuneration_range_high($remuneration_range_high) {
        $this->remuneration_range_high = $remuneration_range_high;
    }


    
}

?>
