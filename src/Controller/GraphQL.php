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

            // Handle GET requests (for testing/introspection)
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                if (isset($_GET['query'])) {
                    $query = $_GET['query'];
                    $variables = isset($_GET['variables']) ? json_decode($_GET['variables'], true) : null;
                } else {
                    return json_encode([
                        'status' => 'ready',
                        'message' => 'GraphQL endpoint is ready. Send POST requests with a query in the body.'
                    ]);
                }
            } else {
                // Handle POST requests
                $rawInput = file_get_contents('php://input');

                if (empty($rawInput)) {
                    throw new RuntimeException('Empty request body');
                }

                $input = json_decode($rawInput, true);
                $query = $input['query'] ?? '';
                $variables = $input['variables'] ?? null;
            }

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