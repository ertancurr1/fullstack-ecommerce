<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema as GraphQLSchema;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;

class Schema
{
    private static ?GraphQLSchema $schema = null;

    public static function build(): GraphQLSchema
    {
        if (self::$schema !== null) {
            return self::$schema;
        }

        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
            ],
        ]);

        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::nonNull(Type::string()),
                'symbol' => Type::nonNull(Type::string()),
            ],
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => Type::nonNull($currencyType),
            ],
        ]);

        $attributeItemType = new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'displayValue' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
            ],
        ]);

        $attributeSetType = new ObjectType([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'type' => Type::nonNull(Type::string()),
                'items' => Type::listOf($attributeItemType),
            ],
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::boolean()),
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(),
                'category' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf($attributeSetType),
                'prices' => Type::listOf($priceType),
                'brand' => Type::string(),
            ],
        ]);

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => function() {
                        $repo = new CategoryRepository();
                        $categories = $repo->findAll();
                        return array_map(fn($cat) => $cat->toArray(), $categories);
                    },
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => Type::string(),
                    ],
                    'resolve' => function($root, $args) {
                        $repo = new ProductRepository();
                        $category = $args['category'] ?? 'all';
                        $products = $repo->findByCategory($category);
                        return array_map(fn($p) => $p->toArray(), $products);
                    },
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) {
                        $repo = new ProductRepository();
                        $product = $repo->findById($args['id']);
                        return $product ? $product->toArray() : null;
                    },
                ],
            ],
        ]);

        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'products' => Type::nonNull(Type::listOf(Type::string())),
                    ],
                    'resolve' => function($root, $args) {
                        return 'Order created successfully';
                    },
                ],
            ],
        ]);

        self::$schema = new GraphQLSchema([
            'query' => $queryType,
            'mutation' => $mutationType,
        ]);

        return self::$schema;
    }
}