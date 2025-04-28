<?php

namespace App\Console\Commands\Generator;

use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('make:constant')]
class ConstantMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:constant {name} {--code}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new constant';

    protected $type = 'Constant';

    
    protected function getStub()
    {
        if ($this->option('code')) {
            return base_path('stubs/constant.code.stub');
        }

        return base_path('stubs/constant.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return "{$rootNamespace}\\Constants";
    }
}
