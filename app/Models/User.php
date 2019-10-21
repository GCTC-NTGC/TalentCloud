<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Notifications\Notifiable;
use App\Events\UserCreated;
use App\Events\UserUpdated;
use App\Notifications\ResetPasswordNotification;
use App\CRUD\TalentCloudCrudTrait as CrudTrait;

/**
 * Class User
 *
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $password
 * @property boolean $is_confirmed
 * @property boolean $is_priority
 * @property int $user_role_id
 * @property string $gov_email
 * @property boolean $not_in_gov
 * @property string $google2fa_secret
 * @property array $recovery_codes
 * @property \Jenssegers\Date\Date $recovery_codes_generation_date
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Manager $manager
 * @property \App\Models\ProfilePic $profile_pic
 * @property \App\Models\UserRole $user_role
 */
class User extends BaseModel implements
    // Laravel contracts for native login.
    AuthenticatableContract,
    CanResetPasswordContract,
    // Contract for use with Gates and Policies.
    AuthorizableContract
// Custom contract for use with openid login.
// \App\Services\Auth\Contracts\OidcAuthenticatable.
{

    // Traits for Laravel basic authentication.
    use Authenticatable;
    use CanResetPassword;
    // Trait for working with Gates and Policies.
    use Authorizable;
    // Trait for notifications.
    use Notifiable;
    // Trait for Backpack.
    use CrudTrait;

    protected $casts = [
        'is_confirmed' => 'boolean',
        'is_priority' => 'boolean',
        'user_role_id' => 'int',
        'email' => 'string',
        'gov_email' => 'string',
        'not_in_gov' => 'boolean',
    ];

    /**
     * @var string[] $dates
     */
    protected $dates = [
        'recovery_codes_generation_date',
    ];

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_priority',
        'gov_email',
        'not_in_gov',
        'google2fa_secret'
    ];

    protected $with = ['user_role'];

    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
        'recovery_codes',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => UserCreated::class,
        'updated' => UserUpdated::class,
    ];

    public function applicant() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\Applicant::class);
    }

    public function manager() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\Manager::class);
    }

    public function profile_pic() //phpcs:ignore
    {
        return $this->hasOne(\App\Models\ProfilePic::class);
    }

    public function user_role() //phpcs:ignore
    {
        return $this->belongsTo(\App\Models\UserRole::class);
    }

    public function setIsPriorityAttribute($value)
    {
        if ($value === null) {
            $value = false;
        }
        $this->attributes['is_priority'] = $value;
    }

    /**
     * Ecrypt the user's google_2fa secret.
     *
     * @param  string  $value
     * @return string
     */
    public function setGoogle2faSecretAttribute($value)
    {
        $this->attributes['google2fa_secret'] = encrypt($value);
    }

    /**
     * Decrypt the user's google_2fa secret.
     *
     * @param  string  $value
     * @return string
     */
    public function getGoogle2faSecretAttribute($value)
    {
        if (!empty($value)) {
            return decrypt($value);
        }
        return null;
    }

    /**
     * Ecrypt and serialize the user's recovery codes.
     *
     * @param  string[]  $value
     * @return void
     */
    public function setRecoveryCodesAttribute($value)
    {
        $this->attributes['recovery_codes'] = encrypt($value);
    }

    /**
     * Decrypt and deserialize the user's recovery codes.
     *
     * @param  string  $value
     * @return string[]
     */
    public function getRecoveryCodesAttribute($value)
    {
        if (!empty($value)) {
            return decrypt($value);
        }
        return null;
    }

    // Role related functions

    /**
     * Returns true if this user has the Applicant role.
     *
     * @return boolean
     */
    public function isApplicant(): bool
    {
        // Currently, every user can create an Applicant profile and apply to jobs.
        return true;
    }

    /**
     * Returns true if this user has the upgradedManager role.
     *
     * @return boolean
     */
    public function isUpgradedManager(): bool
    {
        return $this->isAdmin() || $this->user_role->name === 'upgradedManager';
    }

    /**
     * Returns true this user has the demoManager role.
     *
     * @return boolean
     */
    public function isDemoManager(): bool
    {
        // Currently, every non-upgradedManager user can be considered a demoManager.
        return !$this->isUpgradedManager();
    }

    /**
     * Returns true if this user has the demoManager or upgradedManager role.
     *
     * @return boolean
     */
    public function isManager(): bool
    {
        // Currently, every user can use the Manager portal as a demoManager.
        return $this->isDemoManager() || $this->isUpgradedManager();
    }

    /**
     * Returns true if this user has the Admin role.
     *
     * @return boolean
     */
    public function isAdmin(): bool
    {
        return $this->user_role->name === 'admin';
    }

    /**
     * Check if the user has the specified role.
     * @param string $role This may be either 'applicant', 'manager' or 'admin'.
     * @return boolean
     */
    public function hasRole($role)
    {
        switch ($role) {
            case 'applicant':
                return $this->isApplicant();
            case 'manager':
                return $this->isManager();
            case 'admin':
                return $this->isAdmin();
            default:
                return false;
        }
    }

    /**
     * Set this user to the specified role.
     *
     * @param string $role Must be either 'applicant', 'manager' or 'admin.
     * @return void
     */
    public function setRole(string $role): void
    {
        $this->user_role()->associate(UserRole::where('name', $role)->firstOrFail());
    }

    /**
     * OVERRIDE
     * Send the password reset notification.
     *
     * @param  string  $token
     *
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    /**
     * Gov identity has been confirmed either if:
     *  - they have confirmed to NOT be in government,
     *  - OR they've added a gov email.
     *
     * @param [type] $user
     * @return boolean
     */
    public function isGovIdentityConfirmed()
    {
        return $this->not_in_gov || !empty($this->gov_email);
    }
}
