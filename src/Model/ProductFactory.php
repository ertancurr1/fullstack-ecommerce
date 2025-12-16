<?php

namespace App\Model;

class ProductFactory
{
    private static array $categoryMap = [
        'clothes' => ClothesProduct::class,
        'tech' => TechProduct::class,
    ];

    public static function create(array $data, string $categoryName): AbstractProduct
    {
        $class = self::$categoryMap[$categoryName] ?? ClothesProduct::class;

        return new $class($data);
    }
}