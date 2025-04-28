<?php

namespace App\Console\Commands\Generator;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('make:activity')]
class ActivityMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:activity {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new activity log';

    protected $type = 'Activity';

    
    protected function getStub()
    {
        return base_path('stubs/activity.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return "{$rootNamespace}\\Models";
    }

    protected function getNameInput()
    {
        $name   = trim($this->argument('name'));
        if (Str::endsWith($name, '.php')) {
            $name = Str::substr($name, 0, -4);
        }

        $names  = preg_split('~[\\\\/]~', $name);

        $class = last($names);
        $class = "Has{$class}Activity";

        $names[array_key_last($names)] = 'Traits';
        $names[] = $class;

        return implode('\\', $names);
    }
}
