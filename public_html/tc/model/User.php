<?php

class User implements JsonSerializable{

    protected $user_id;
    protected $email;
    protected $password;
    protected $firstname;
    protected $lastname;
    protected $is_confirmed;
    protected $user_role;

    /**
     * Defines the User Object
     * @param type $user_id
     * @param type $email
     * @param type $firstname
     * @param type $lastname
     * @param type $is_confirmed
     * @param type $user_role
     */
    function __construct($user_id = null, $email = null, $password = null, $firstname = null, $lastname = null, $is_confirmed = 0, $user_role = null) {
        $this->user_id = $user_id;
        $this->email = $email;
        $this->password = $password;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->is_confirmed = $is_confirmed;
        $this->user_role = $user_role;
    }

    public function jsonSerialize() {
        return [
            'user_id' => $this->user_id,
            'email' => $this->email,
            'password' => $this->password,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'is_confirmed' => $this->is_confirmed,
            'user_role' => $this->user_role
        ];
    }

    public function getUser_id() {
        return $this->user_id;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getFirstname() {
        return $this->firstname;
    }

    public function setFirstname($firstname) {
        $this->firstname = $firstname;
    }

    public function getLastname() {
        return $this->lastname;
    }

    public function setLastname($lastname) {
        $this->lastname = $lastname;
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
}

?>