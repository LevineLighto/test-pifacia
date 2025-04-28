<?php

namespace App\Console\Commands\Generator;

use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('make:logic')]
class LogicMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:logic {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new logic';

    protected $type = 'Logic';

    
    protected function getStub()
    {
        return base_path('stubs/logic.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return "{$rootNamespace}\\Logics";
    }
}
