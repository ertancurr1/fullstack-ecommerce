<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use RuntimeException;
use Throwable;

class GraphQL
{
    public static function handle(): string
    {
        try {
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');

            if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                http_response_code(200);
                return json_encode(['status' => 'ok']);
            }

            $rawInput = file_get_contents('php://input');
            
            if (empty($rawInput)) {
                throw new RuntimeException('Empty request body');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? '';
            $variables = $input['variables'] ?? null;

            $schema = \App\GraphQL\Schema::build();
            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variables);
            $output = $result->toArray();

        } catch (Throwable $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                    ],
                ],
            ];
        }

        return json_encode($output);
    }
}