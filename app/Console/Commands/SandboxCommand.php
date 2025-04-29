<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SandboxCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sandbox';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $granted    = ['a', 'b', 'c'];
        $requested  = ['a', 'b', 'c', 'd', 'e', 'f'];
        $difference = array_diff($requested, $granted);

        $this->info(json_encode([ count($requested), count($difference) ]));
    }
}
