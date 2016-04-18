<?php

//Set url
//$url = "http://map4.raa.se/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=FMI_WMS&QUERY_LAYERS=FMI_WMS&BBOX=480287.9999999998,6670359.99999895,490728.00000000047,6673095.999998952&FEATURE_COUNT=10&HEIGHT=342&WIDTH=1305&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3006&X=887&Y=205")";
$link = $_GET['link'];
$VERSION = $_GET['VERSION'];
$REQUEST = $_GET['REQUEST'];
$LAYERS = $_GET['LAYERS'];
$QUERY_LAYERS = $_GET['QUERY_LAYERS'];
$BBOX = $_GET['BBOX'];
$FEATURE_COUNT = $_GET['FEATURE_COUNT'];
$HEIGHT = $_GET['HEIGHT'];
$WIDTH = $_GET['WIDTH'];
$INFO_FORMAT = $_GET['INFO_FORMAT'];
$SRS = $_GET['SRS'];
$X = $_GET['X'];
$Y = $_GET['Y'];

$url=$link.'&VERSION='.$VERSION.'&REQUEST='.$REQUEST.'&LAYERS='.$LAYERS.'&QUERY_LAYERS='.$QUERY_LAYERS.'&BBOX='.$BBOX.'&FEATURE_COUNT='.$FEATURE_COUNT.'&HEIGHT='.$HEIGHT.'&WIDTH='.$WIDTH.'&INFO_FORMAT='.$INFO_FORMAT.'&SRS='.$SRS.'&X='.$X.'&Y='.$Y;

//echo $url;

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);
?>