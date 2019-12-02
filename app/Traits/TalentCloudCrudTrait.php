<?php

namespace App\Traits;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

trait TalentCloudCrudTrait
{
    use CrudTrait;

    /**
     * Override for existing isColumnNullable static function on the CrudTrait. Current
     * implementation doesn't allow for other custom column types outside of what's defined in
     * Backpack.
     *
     * @param string $column_name Name of the column to check.
     *
     * @return boolean
     */
    public static function isColumnNullable(string $column_name) : bool
    {
        // Create an instance of the model to be able to get the table name.
        $instance = new static();
        $conn = DB::connection($instance->getConnectionName());
        $table = Config::get('database.connections.'.Config::get('database.default').'.prefix').$instance->getTable();
        // MongoDB columns are alway nullable.
        if ($conn->getConfig()['driver'] === 'mongodb') {
            return true;
        }
        // Register the enum, json, jsonb, and citext column types, because Doctrine doesn't support it.
        $conn->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
        $conn->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('json', 'json_array');
        $conn->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('jsonb', 'json_array');
        $conn->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('citext', 'string');
        return !$conn->getDoctrineColumn($table, $column_name)->getNotnull();
    }
}
