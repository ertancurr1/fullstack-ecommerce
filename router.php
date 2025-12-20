<?php
// Router script for PHP built-in server
// This routes all requests to public/index.php

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files directly from public directory
$file_path = __DIR__ . '/public' . $uri;
if ($uri !== '/' && is_file($file_path)) {
    // Return false to let the server handle static files
    return false;
}

// All other requests go to index.php
// Change the SCRIPT_NAME to simulate being accessed directly
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/public/index.php';

// Include the index.php file
chdir(__DIR__ . '/public');
require __DIR__ . '/public/index.php';
