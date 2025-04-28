<?php

namespace App\Console\Commands\Generator;

use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('make:parser')]
class ParserMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:parser {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new parser';

    protected $type = 'Parser';

    
    protected function getStub()
    {
        return base_path('stubs/parser.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return "{$rootNamespace}\\Parsers";
    }
}
