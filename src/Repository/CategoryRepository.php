<?php

namespace App\Repository;

use App\Database\Database;
use App\Model\Category;

class CategoryRepository
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function findAll(): array
    {
        $results = $this->db->fetchAll("SELECT * FROM categories ORDER BY id");

        return array_map(fn($data) => new Category($data), $results);
    }

    public function findById(int $id): ?Category
    {
        $result = $this->db->fetch("SELECT * FROM categories WHERE id  = ?", [$id]);

        return $result ? new Category($result) : null;
    }

    public function findByName(string $name): ?Category
    {
        $result = $this->db->fetch("SELECT * FROM categories WHERE name = ?", [$name]);

        return $result ? new Category($result) : null;
    }
}