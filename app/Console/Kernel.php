<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
            ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')
        // ->hourly();
        // start the queue daemon, if its not running
        if (!$this->osProcessIsRunning('queue:work')) {
            $schedule->command('queue:work')->everyMinute();
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /**
     * checks, if a process with $needle in the name is running
     *
     * @param string $needle
     * @return boolean
     */
    protected function osProcessIsRunning(string $needle): bool
    {
        // get process status. the "-ww"-option is important to get the full output!
        exec('ps aux -ww', $process_status);


        // search $needle in process status
        $result = array_filter(
            $process_status,
            function ($var) use ($needle) {
                return strpos($var, $needle);
            }
        );

        // if the result is not empty, the needle exists in running processes
        if (!empty($result)) {
            return true;
        }

        return false;
    }
}
