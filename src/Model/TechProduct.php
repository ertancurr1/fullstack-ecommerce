<?php

namespace App\Model;

class TechProduct extends AbstractProduct
{
    public function getCategoryName(): string
    {
        return 'tech';
    }
}