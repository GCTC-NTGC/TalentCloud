<?php

class User implements JsonSerializable{

    protected $user_id;
    protected $email;
    protected $name;
    protected $is_confirmed;
    protected $user_role;
    protected $open_id;

    /**
     * Defines the User Object
     * @param type $user_id
     * @param type $email
     * @param type $firstname
     * @param type $lastname
     * @param type $is_confirmed
     * @param type $user_role
     * @param type $open_id
     */
    function __construct($user_id = null, $email = null, $name = null, $is_confirmed = 0, $user_role = null, $open_id = null) {
        $this->user_id = $user_id;
        $this->email = $email;
        $this->name = $name;
        $this->is_confirmed = $is_confirmed;
        $this->user_role = $user_role;
        $this->open_id = $open_id;
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

    public function getUser_id() {
        return $this->user_id;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
    }
    
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getIs_confirmed() {
        return $this->is_confirmed;
    }

    public function setIs_confirmed($is_confirmed) {
        $this->is_confirmed = $is_confirmed;
    }

    public function getUser_role() {
        return $this->user_role;
    }

    public function setUser_role($user_role) {
        $this->user_role = $user_role;
    }
    
    public function getOpen_id() {
        return $this->open_id;
    }

    public function setOpen_id($open_id) {
        $this->open_id = $open_id;
    }

}

?>