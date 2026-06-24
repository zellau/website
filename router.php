<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path !== '/' && file_exists(__DIR__ . $path . '.php')) {
    require __DIR__ . $path . '.php';
    exit;
}

if ($path !== '/' && file_exists(__DIR__ . $path . '.html')) {
    require __DIR__ . $path . '.html';
    exit;
}

return false;