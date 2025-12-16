<?php

namespace App\Model;

abstract class AbstractProduct
{
    protected string $id;
    protected string $name;
    protected bool $inStock;
    protected string $description;
    protected string $brand;
    protected array $gallery = [];
    protected array $attributes = [];
    protected array $prices = [];

    public function __construct(array $data)
    {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->inStock = (bool) $data['in_stock'];
        $this->description = $data['description'] ?? '';
        $this->brand = $data['brand'] ?? '';
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function isInStock(): bool
    {
        return $this->inStock;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getBrand(): string
    {
        return $this->brand;
    }
    
    public function getGallery(): array
    {
        return $this->gallery;
    }

    public function setGallery(array $gallery): void
    {
        $this->gallery = $gallery;
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function setAttributes(array $attributes): void
    {
        $this->attributes = $attributes;
    }

    public function getPrices(): array
    {
        return $this->prices;
    }

    public function setPrices(array $prices): void
    {
        $this->prices = $prices;
    }

    abstract public function getCategoryName(): string;

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'in_stock' => $this->inStock,
            'description' => $this->description,
            'brand' => $this->brand,
            'gallery' => $this->gallery,
            'category' => $this->getCategoryName(),
            'attributes' => array_map(fn($attr) => $attr->toArray(), $this->attributes),
            'prices' => array_map(fn($price) => $price->toArray(), $this->prices),
        ];
    }
}