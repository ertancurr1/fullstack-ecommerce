<?php

namespace App\Repository;

use App\Database\Database;
use App\Model\AbstractProduct;
use App\Model\ProductFactory;
use App\Model\AttributeFactory;
use App\Model\Price;

class ProductRepository
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findAll(): array
    {
        $sql = "
            SELECT p.*, c.name as category_name
            FROM products p
            INNER JOIN categories c ON p.category_id = c.id
            ORDER BY p.name
        ";

        $results = $this->db->fetchAll($sql);

        return array_map(fn($data) => $this->buildProduct($data), $results);
    }

    public function findByCategory(string $categoryName): array
    {
        if ($categoryName === 'all') {
            $sql = "
                SELECT p.*, c.name as category_name
                FROM products p
                INNER JOIN categories c ON p.category_id = c.id
                ORDER BY p.name
            ";
            
            $results = $this->db->fetchAll($sql);
        } else {
            $sql = "
                SELECT p.*, c.name as category_name
                FROM products p
                INNER JOIN categories c ON p.category_id = c.id
                WHERE c.name = ?
                ORDER BY p.name
            ";

            $results = $this->db->fetchAll($sql, [$categoryName]);
        }
    
        return array_map(fn($data) => $this->buildProduct($data), $results);
    }

    public function findById(string $id): ?AbstractProduct
    {
        $sql = "
            SELECT p.*, c.name as category_name
            FROM products p
            INNER JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        ";

        $result = $this->db->fetch($sql, [$id]);

        return $result ? $this->buildProduct($result) : null;
    }

    private function buildProduct(array $data): AbstractProduct
    {
        $product = ProductFactory::create($data, $data['category_name']);
        
        $product->setGallery($this->getGallery($data['id']));
        $product->setAttributes($this->getAttributes($data['id']));
        $product->setPrices($this->getPrices($data['id']));

        return $product;
    }

    private function getGallery(string $productId): array
    {
        $sql = "
            SELECT image_url
            FROM product_gallery
            WHERE product_id = ?
            ORDER BY position
        ";

        $results = $this->db->fetchAll($sql, [$productId]);

        return array_column($results, 'image_url');
    }

    private function getAttributes(string $productId): array
    {
        $sql = "
            SELECT a.id, a.name, a.type
            FROM attribute_sets a
            INNER JOIN product_attributes pa ON a.id = pa.attribute_set_id
            WHERE pa.product_id = ?
        ";
        
        $attributeSets = $this->db->fetchAll($sql, [$productId]);
        
        $attributes = [];
        foreach ($attributeSets as $attrSet) {
            $attribute = AttributeFactory::create($attrSet);
            $attribute->setItems($this->getAttributeItems($attrSet['id']));
            $attributes[] = $attribute;
        }
        
        return $attributes;
    }

    private function getAttributeItems(string $attributeSetId): array
    {
        $sql = "
            SELECT id, display_value, value
            FROM attribute_items
            WHERE attribute_set_id = ?
        ";
        
        return $this->db->fetchAll($sql, [$attributeSetId]);
    }

    private function getPrices(string $productId): array
    {
        $sql = "
            SELECT amount, currency_label, currency_symbol
            FROM prices
            WHERE product_id = ?
        ";
        
        $results = $this->db->fetchAll($sql, [$productId]);
        
        return array_map(fn($data) => new Price($data), $results);
    }
}