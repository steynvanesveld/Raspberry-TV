<?php
$system = new stdClass();

$cpuinfo = explode("\n", file_get_contents("/proc/cpuinfo"));
$raminfo = explode("\n", file_get_contents("/proc/meminfo"));
$tempinfo = file_get_contents("/sys/class/thermal/thermal_zone0/temp");

$cpu = array();
$ram = array();

foreach ($cpuinfo as $line) {
    $expl = explode(":", trim($line));

    if (count($expl) == 2){
        $cpu[trim($expl[0])] = $expl[1];
    }
}

foreach ($raminfo as $line) {
    $expl = explode(":", trim($line));

    if (count($expl) == 2){
        $ram[$expl[0]] = intval(substr($expl[1],0, -3)); // remove 'kb'
    }
}

$ram['MemUsage'] = ($ram["MemTotal"] - $ram["MemFree"] - $ram["Buffers"] - $ram["Cached"]) / $ram["MemTotal"];

$system->model = $cpu["Model"];
$system->ram_usage = sprintf("%.0f", 100.0 * $ram['MemUsage']) . '%';
$system->load = implode(", ", sys_getloadavg());
$system->temp = ceil($tempinfo / 1000) . '&deg;C';

echo json_encode($system);
?>
