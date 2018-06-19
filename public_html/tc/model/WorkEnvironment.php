<?php

class WorkEnvironment implements JsonSerializable {
    
    private $basic_work_environment;
    private $workplace_photo_captions;

    /**
     * 
     * @param BasicWorkEnvironment $basic_work_environment
     * @param WorkplacePhotoCaption[] $workplace_photo_captions
     */
    public function __construct($basic_work_environment = null, $workplace_photo_captions = []) {
        $this->basic_work_environment = $basic_work_environment;
        $this->workplace_photo_captions = $workplace_photo_captions;
    }
    
    public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if (substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }
    
    /**
     * 
     * @return BasicWorkEnvironment
     */
    public function getBasic_work_environment() {
        return $this->basic_work_environment;
    }

    /**
     * 
     * @return WorkplacePhotoCaption[]
     */
    public function getWorkplace_photo_captions() {
        return $this->workplace_photo_captions;
    }

    /**
     * 
     * @param BasicWorkEnvironment $basic_work_environment
     * @return $this
     */
    public function setBasic_work_environment($basic_work_environment) {
        $this->basic_work_environment = $basic_work_environment;
        return $this;
    }

    /**
     * 
     * @param WorkplacePhotoCaption $workplace_photo_captions
     * @return $this
     */
    public function setWorkplace_photo_captions($workplace_photo_captions) {
        $this->workplace_photo_captions = $workplace_photo_captions;
        return $this;
    }



}
    