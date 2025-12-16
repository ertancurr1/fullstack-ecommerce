<?php

namespace App\Model;

class AttributeFactory
{
    private static array $typeMap = [
        'text' => TextAttribute::class,
        'swatch' => SwatchAttribute::class,
    ];

    public static function create(array $data): AbstractAttributeSet
    {
        $type = $data['type'] ?? 'text';
        $class = self::$typeMap[$type] ?? TextAttribute::class;

        return new $class($data);
    }
}