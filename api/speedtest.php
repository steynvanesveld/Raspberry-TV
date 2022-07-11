<?php
$filename = 'speedtest.txt';
$output = new stdClass();
$speedtestinfo = explode("\n", file_get_contents($filename));

$speedtest = array();

foreach ($speedtestinfo as $line) {
    $expl = explode(":", trim($line));

    if (count($expl) > 2){
        $speedtest[trim($expl[0])] = trim($expl[1] . $expl[2]);
    } else if (count($expl) > 1){
        $speedtest[trim($expl[0])] = trim($expl[1]);
    }
}

$output->speedtest = $speedtest;

echo json_encode($output);
?>
