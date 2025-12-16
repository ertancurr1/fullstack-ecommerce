<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->post('/graphql', [App\Controller\GraphQL::class, 'handle']);
});

// Extract the path after index.php
$uri = $_SERVER['REQUEST_URI'];
$scriptName = $_SERVER['SCRIPT_NAME'];
$basePath = dirname($scriptName);

// Remove base path and query string
$path = parse_url($uri, PHP_URL_PATH);
$path = str_replace($basePath, '', $path);
$path = str_replace('/index.php', '', $path);
$path = $path ?: '/';

$routeInfo = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], $path);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}