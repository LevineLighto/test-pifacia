<?php

namespace App\Exports\Hr;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class EmployeeExcel implements FromArray, WithEvents, WithHeadings, ShouldAutoSize
{
    public function __construct(private array $properties)
    {
        
    }

    /**
     * @inheritDoc
     */
    public function array(): array
    {
        return $this->properties;
    }

    /**
     * @inheritDoc
     */
    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Is Active',
            'Bpjs',
            'Joined At',
            'Position',
            'Division',
        ];
    }

    /**
     * @inheritDoc
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $lastCol = $event->sheet->getDelegate()->getHighestColumn();
                $lastRow = $event->sheet->getDelegate()->getHighestRow();

                $event->sheet->getDelegate()->getStyle("A1:{$lastCol}{$lastRow}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '12636B']
                        ]
                    ]
                ]);

            }
        ];
    }
}
