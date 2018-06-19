<?php

require_once __DIR__."/User.php";

class UserPermission {
    protected $user_id;
    protected $user_role;
    
    public function __construct($role, $userId = null) {
        $this->user_role = $role;
        $this->user_id = $userId;
    }
    
    /**
     * Returns true if user matches all non-null fields in this UserPermission.
     * @param User $user
     */
    public function userHasPermission(User $user) {
        if ($this->user_id !== null &&
                $this->user_id != $user->getUser_id()) {
            return false;
        }
        if ($this->user_role !== null &&
                $this->user_role != $user->getUser_role()) {
            return false;
        }
        return true;
    }    
}