/*
MIT License

Copyright (c) 2016 Per Låås

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Example using Sweden Lantmäteriet Topografisk Webbkarta
http://www.lantmateriet.se/globalassets/kartor-och-geografisk-information/geodatatjanster/tekn_beskrivningar/tb_twkvisningvccby_v1.0.pdf
*/
var html = '';
var	callcount = 0;
		
var crs = new L.Proj.CRS('EPSG:3006',
	'+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	{
		resolutions: [
			4096, 2048, 1024, 512, 256, 128,64, 32, 16, 8
		],
		origin: [-1200000.000000, 8500000.000000 ],
		bounds:  L.bounds( [-1200000.000000, 8500000.000000], [4305696.000000, 2994304.000000])
	}),
	map = new L.Map('map', {
		crs: crs,
		continuousWorld: true,
		worldCopyJump: false,
		attributionControl: false
	});
	
var credits = L.control.attribution().addTo(map);
credits.addAttribution("© <a href='http://proj4js.org/'>proj4js</a> © <a href='https://github.com/kartena/Proj4Leaflet'>proj4leaflet</a> |");

new L.TileLayer('https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/' + lmKey + '/1.0.0/topowebb/default/3006/{z}/{y}/{x}.png', {
	maxZoom: 9,
	minZoom: 0,
	continuousWorld: true,
	attribution: '&copy; <a href="http://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning, CCBY',
}).addTo(map);
//Set view over Stockholm Södermalm
map.setView([60.2, 14.7], 6);

var overlayMaps = {};

var maplayers;

	for(var i=layerlist.length-1; i>=0; i--) {
		if(layerlist[i].maplayer && layerlist[i].type == 'WMS') {
			var newLayer = L.tileLayer.wms(layerlist[i].server, {
				layers: layerlist[i].lyr,
				format: 'image/png',
				maxZoom: 14,
				minZoom: 0,
				continuousWorld: true,
				transparent: true,
				attribution: layerlist[i].attribution,
			});
			overlayMaps[layerlist[i].name] = newLayer;
		}
	}

L.control.layers(null, overlayMaps).addTo(map);
		
L.control.scale({position: 'topleft', imperial: false}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

	
		map.addEventListener('click', Identify);

		//var wms_server = "http://nvpub.vic-metria.nu/arcgis/services/Andra_skydd/MapServer/WmsServer";
		function Identify (e) {
			//var proj4 = require('proj4');
			var crsstr = '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
			var min = map.getBounds().getSouthWest().wrap();
			var max = map.getBounds().getNorthEast().wrap();
			var minlat = min.lat;
			var minpoint = proj4(crsstr,[min.lng,min.lat]);
			var maxpoint = proj4(crsstr,[max.lng,max.lat]);
			//midpointX = Math.round((minpoint[0]+maxpoint[0])/2);
			//midpointY = Math.round((minpoint[1]+maxpoint[1])/2);
			
			
			
			var BBOX = minpoint[0]+','+minpoint[1]+','+maxpoint[0]+','+maxpoint[1];
			//var BBOX = map.getBounds().toBBoxString();
			//var BBOX = L.bounds(maxpoint,minpoint).toBBoxString();
			var WIDTH = map.getSize().x;
			var HEIGHT = map.getSize().y;
			var X = map.layerPointToContainerPoint(e.layerPoint).x;
			var Y = map.layerPointToContainerPoint(e.layerPoint).y;
			
			searchLayersList(e,BBOX,WIDTH,HEIGHT,X,Y);
			//searchSingle(e,BBOX,WIDTH,HEIGHT,X,Y);
			
		}
		
		
//https://etjanster.lantmateriet.se/historiskakartor/s/searchresult.html?archive=GEOIN&firstMatchToReturnLMS=1&firstMatchToReturnREG=1&firstMatchToReturnRAK=1&yMin=6657636&xMin=446992&yMax=6658636&xMax=447992
function getLMHistoricalMapsHtml(e) {
	var crsstr = '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
	var lpoint = proj4(crsstr,[e.latlng.lng,e.latlng.lat]);
	var lpointX = Math.round(lpoint[0]);
	var lpointY = Math.round(lpoint[1]);
	
	
	var histBaseUrl = 'https://etjanster.lantmateriet.se/historiskakartor/s/searchresult.html?archive=GEOIN&firstMatchToReturnLMS=1&firstMatchToReturnREG=1&firstMatchToReturnRAK=1';
	var boxsize = 500;
	var xMin = lpointX - boxsize;
	var yMin = lpointY - boxsize;
	var xMax = lpointX + boxsize;
	var yMax = lpointY + boxsize;
	//var histUrl = histBaseUrl + '&yMin=6657636&xMin=446992&yMax=6658636&xMax=447992';
	var histUrl = histBaseUrl + '&yMin=' + yMin + '&xMin=' + xMin + '&yMax=' + yMax + '&xMax=' + xMax;
	var ldescHist = 'Historiska kartor';
	var histHtml = '<a href="'+ histUrl +'" target="_blank">'+ ldescHist +'</a><br>';
	return histHtml;
}		
		
function searchLayersList(e,BBOX,WIDTH,HEIGHT,X,Y) {
	var identifyListCount = 0;
	html = '';
	for(var i=layerlist.length-1; i>=0; i--) {
		if(layerlist[i].identify && layerlist[i].type == 'WMS') {
			identifyListCount = identifyListCount + 1;
		}
	}
	for(var i=layerlist.length-1; i>=0; i--) {
		if(layerlist[i].identify && layerlist[i].type == 'WMS') {
			var URL = layerlist[i].server + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS='+ layerlist[i].lyr +'&QUERY_LAYERS='+ layerlist[i].lyr +'&BBOX='+BBOX+'&FEATURE_COUNT=10&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3006&X='+X+'&Y='+Y;

			URL = '../service/featureInfo.php?link=' + encodeURI(URL);
			searchCall(identifyListCount,layerlist[i].useAsHtml,layerlist[i].popupName,e,URL);
		}
	}
			
}

function searchSingle(e,BBOX,WIDTH,HEIGHT,X,Y) {
			var wms_server = "http://map4.raa.se/geoserver/wms?";
			var lyr = 'FMI_WMS';
			var URL = wms_server + 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS='+ lyr +'&QUERY_LAYERS='+ lyr +'&BBOX='+BBOX+'&FEATURE_COUNT=10&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3006&X='+X+'&Y='+Y;

			wms_server = "http://epub.sjv.se:80/inspire/inspire/wms?";
			lyr = 'HB.Angs-och_betesmarksinventeringen,HB.Angs-och_betesmarksinventeringen_naturtyper';
			var URL2 = wms_server + 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS='+ lyr +'&QUERY_LAYERS='+ lyr +'&BBOX='+BBOX+'&FEATURE_COUNT=10&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3006&X='+X+'&Y='+Y;

			
			
			wms_server = 'http://ext-geoservices.lansstyrelsen.se/ArcGIS/services/riksintressen/MapServer/WMSServer?';
			lyr = '1,2,3,4';
			var URL3 = wms_server + 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS='+ lyr +'&QUERY_LAYERS='+ lyr +'&BBOX='+BBOX+'&FEATURE_COUNT=10&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3006&X='+X+'&Y='+Y;

			URL = '../service/featureInfo.php?link=' + encodeURI(URL);
			
			loadDoc('RAÄ Fornsök',e,URL);
			
}

function searchCall(identifyListCount,useAsHtml,desc,e,url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
		callcount = callcount + 1;
		if (xhttp.status == 200) {
			var data = xhttp.responseText;
			if (useAsHtml) {
				//Use full html
				if (data.indexOf('<body></body>') == -1) {
						var str = '<a href="'+ url +'" target="_blank">'+ desc +'</a><br>';
						html = html + str;
						showPopup(identifyListCount,e,html);						
				} else {
					showPopup(identifyListCount,e,html);						
				}
			} else {
				//Find if any http links (Use only links inside tag by using '>'. Ignore links in html tag parameters)
				if (data.indexOf('>http') > -1) {
					var httpparts = data.split('>http');
					//Add all links in response html
					for(var i=1; i<httpparts.length; i++) {
						//var startstr = data.substring(data.indexOf('>http')+1,data.length);
						var startstr = 'http' + httpparts[i];
						var parts = startstr.split('<');
						var urlstr = parts[0];
						var ldesc = desc;
						if (urlstr.indexOf('=') > -1) {
							var idparts = urlstr.split('=');
							ldesc = ldesc + ' ' + idparts[1];
						}
						var str = '<a href="'+ urlstr +'" target="_blank">'+ ldesc +'</a><br>';
						html = html + str;
						showPopup(identifyListCount,e,html);						
					}
				} else {
					showPopup(identifyListCount,e,html);						
				}
			}
		} else {
			showPopup(identifyListCount,e,html);						
		}
	}
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
		
function showPopup(identifyListCount,e,html) {
	//If all requests got an answer
	if(callcount >= identifyListCount) {
		//If any requests got an answer with information
		if(html.length > 0) {
			//html = html + '<br>3: ' + callcount +',' + identifyListCount;

			var strHist = getLMHistoricalMapsHtml(e);
			html = html + strHist;

			callcount = 0;
			html = '<html>'+ html +'</html>';
			showPopupLeaflet(e,html);						
			html = '';
		} else {
			callcount = 0;

			var strHist = getLMHistoricalMapsHtml(e);
			html = html + strHist;

			html = '<html>' + html + '</html>';
			showPopupLeaflet(e,html);						
			
		}
	} else {
		html = '<html>Väntar på svar</html>';
		showPopupLeaflet(e,html);						
	}
}
		
function showPopupLeaflet(e,html) {
					var popup = new L.popup({
						maxWith: 300
					});
					popup.setContent(html);
					popup.setLatLng(e.latlng);
					map.openPopup(popup);
						
}
		
function loadDocJQ(url) {
			$.ajax({
				url:URL,
				datatype: "html",
				type: "GET",
				success: function(data) {
					var popup = new L.popup({
						maxWith: 300
					});
					popup.setContent(data);
					popup.setLatLng(e.latlng);
					map.openPopup(popup);
				}
			});
}
		
function identifyOld(e) {
			var data = '<html><a href="'+ URL +'" target="_blank">RAÄ Fornminne</a><br><a href="'+ URL2 +'" target="_blank">Ängs- och betesmarksinventeringen</a><br><a href="'+ URL3 +'" target="_blank">Länsstyrelsen Riksintressen</a></html>';
					var popup = new L.popup({
						maxWith: 300
					});
					popup.setContent(data);
					popup.setLatLng(e.latlng);
					map.openPopup(popup);
}

		