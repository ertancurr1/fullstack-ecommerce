<?php

namespace App\Model;

class ClothesProduct extends AbstractProduct
{
    public function getCategoryName(): string
    {
        return 'clothes';
    }
}