<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class User
 *
 * @property int $id
 * @property string $email
 * @property string $name
 * @property bool $is_confirmed
 * @property int $user_role_id
 * @property string $open_id_sub
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Applicant $applicant
 * @property \App\Models\Manager $manager
 * @property \App\Models\ProfilePic $profile_pic
 * @property \App\Models\UserRole $user_role
 */

use App\Services\Auth\Contracts\OidcAuthenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Foundation\Auth\Access\Authorizable as AuthorizableTrait;

<<<<<<< HEAD
class User extends Eloquent implements OidcAuthenticatable, AuthorizableContract
{
=======
class User extends BaseModel implements OidcAuthenticatable, AuthorizableContract {
>>>>>>> dev
    use AuthorizableTrait;

    protected $casts = [
        'is_confirmed' => 'bool',
        'user_role_id' => 'int'
    ];
    protected $fillable = [];
    protected $with = ['user_role'];

    public function applicant()
    {
        return $this->hasOne(\App\Models\Applicant::class);
    }

    public function manager()
    {
        return $this->hasOne(\App\Models\Manager::class);
    }

    public function profile_pic()
    {
        return $this->hasOne(\App\Models\ProfilePic::class);
    }

    public function user_role()
    {
        return $this->belongsTo(\App\Models\UserRole::class);
    }

    ///////////////////////////////////////////
    //Authenticatable Interface Implementation
    ///////////////////////////////////////////

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthIdentifierName()
    {
        return "id";
    }

    public function getAuthPassword()
    {
        return null;
    }

    public function getRememberToken()
    {
        //TODO
        return null;
    }

    public function getRememberTokenName()
    {
        //TODO
        return null;
    }

    public function setRememberToken($value)
    {
        //TODO
        return null;
    }

    ///////////////////////////////////////////
    //OidcAuthenticatable Interface Implementation
    ///////////////////////////////////////////

    public function getRole(): array
    {
        return $this->role;
    }

    public function getSub($iss): string
    {
        //TODO: implement alterative issuers
        return $this->open_id_sub;
    }

    /**
     * Get the OidcAuthenticatable object that matches the given issuer and sub.
     *
     * @return App\Services\Auth\Contracts\OidcAuthenticatable|null
     */
    public function findByOidcSub($iss, $sub)
    {
        //TODO: allow alternative issuers
        return User::where('open_id_sub', $sub)->first();
    }

    /**
     * Get the OidcAuthenticatable object initialized with the given data.
     *
     * @return App\Services\Auth\Contracts\OidcAuthenticatable
     */
    public function createWithOidcCredentials($name, $email, $iss, $sub, $role)
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        //TODO: save iss
        $user->open_id_sub = $sub;
        $user->user_role_id = UserRole::where('name', $role)->first()->id;

        //TODO: switch to email authentication
        $user->is_confirmed = true;

        return $user;
    }
}
