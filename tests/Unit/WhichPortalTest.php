<?php

namespace Tests\Unit;

use Tests\TestCase;
use Facades\App\Services\WhichPortal;

class WhichPortalTest extends TestCase
{
    public function testApplicantUrls(): void
    {
        $baseUrl = config('app.url');
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/fr/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/jobs"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/jobs/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/jobs"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/jobs/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/managers"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/managers/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/managers"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/managers/"));
        $this->assertFalse(WhichPortal::urlIsManagerPortal("$baseUrl/en/managers/12"));
    }

    public function testManagerUrls(): void
    {
        $baseUrl = config('app.url');
        $managerPrefix = config('app.manager_prefix');
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/$managerPrefix"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/$managerPrefix/"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/en/$managerPrefix"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/fr/$managerPrefix"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/en_CA/$managerPrefix"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/es/$managerPrefix"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/en/$managerPrefix/"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/en/$managerPrefix/jobs"));
        $this->assertTrue(WhichPortal::urlIsManagerPortal("$baseUrl/en/$managerPrefix/jobs/"));
    }
}
