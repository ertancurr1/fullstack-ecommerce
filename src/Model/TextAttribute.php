<?php

namespace App\Model;

class TextAttribute extends AbstractAttributeSet
{
    public function getType(): string
    {
        return 'text';
    }
}