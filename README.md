# simple-open-data-map
Simple web map for open data
## Purpose
A simple and useful web map for open data using open standards as OGC. Useful as it is or as a starting point. 
Currently tested on open data from government agencies in Sweden using OCG WMTS and WMS. Spatial reference system SWEREF99 TM, epgs 3006.
## Design
- Only client side logic. Exemption: server side (php) API to proxy calls to services that does not support CORS.
- Use standard protocols when possible, i.e. OGC WMS getMap and getFeatureInfo, OGC WMTS.
- Use simple parsing of callback results (XML or JSON). For example find xml-tag with link (find '>http:') and use it as a link in popup.

## Usage
- Use conf.js for configuration of OGC services.
- Use featureInfo.php for request to server in same domain to handle OGC services not supporting CORS.
- Include prerequisites. Example found in karta.html

## Prerequisites
- Leaflet
- proj4js
- proj4leaflet
- [mapbox.js/plugins/leaflet-locatecontrol] (https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-locatecontrol/v0.43.0/L.Control.Locate.min.js)
- If you want to use the open data WMTS service from Lantmäteriet get a user account and key. See [Topografisk webbkarta Visning, CC BY] (http://www.lantmateriet.se/sv/Kartor-och-geografisk-information/Geodatatjanster/Visningstjanster/#faq:topografisk-webbkarta-visning-cc-by) 
