<?php
$filename = 'favorites.txt';
$output = new stdClass();
$output->favorites = explode("\n", file_get_contents($filename));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $favorites = explode("\n", file_get_contents($filename));
    $id = $_POST['id'];

    if (($key = array_search($id, $favorites)) !== false) {
        unset($favorites[$key]);
    } else {
        $favorites[] = $id;
    }

    file_put_contents($filename, implode("\n", $favorites));
}

echo json_encode($output);
?>
