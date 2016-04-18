/*
Example using Sweden Lantmäteriet Topografisk Webbkarta
http://www.lantmateriet.se/globalassets/kartor-och-geografisk-information/geodatatjanster/tekn_beskrivningar/tb_twkvisningvccby_v1.0.pdf
*/
var	lmKey = 'YOUR KEY';


  var layerlist = [
  {
		server: "http://map4.raa.se/geoserver/wms",
    attribution: '&copy; <a href="http://raa.se/hitta-information/fornsok-fmis/">RAÄ</a>',
		lyr: 'socken',
		styles: 'socken',
		name: "RAÄ Socken",
		popupName: 'RAÄ Fornsök',
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: false
	}, {
		server: "http://map4.raa.se/geoserver/wms",
    attribution: '&copy; <a href="http://raa.se/hitta-information/fornsok-fmis/">RAÄ</a>',
		lyr: 'FMI_WMS,FMI_WMS',
		styles: 'fmi_geometry,fmi_symbol',
		name: "RAÄ Fornminne (bara max inzoom)",
		popupName: 'RAÄ Fornsök',
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: false
	}, {
		server: "http://map4.raa.se/geoserver/wms",
    attribution: '&copy; <a href="http://raa.se/hitta-information/fornsok-fmis/">RAÄ</a>',
		lyr: 'FMI_WMS',
		styles: 'fmi_label',
		name: "RAÄ Fornminnetext (bara max inzoom)",
		popupName: 'RAÄ Fornsök',
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: false
	}, {
		server: "http://map4.raa.se/geoserver/wms",
    attribution: '&copy; <a href="http://raa.se/hitta-information/fornsok-fmis/">RAÄ</a>',
		lyr: 'FMI_WMS,socken',
		popupName: 'RAÄ Fornsök',
		type: 'WMS',
		useAsHtml: false,
		maplayer: false,
		identify: true
	}, {
		server: 'http://geodata.raa.se/inspire/services/building_wms',
    attribution: '&copy; <a href="http://raa.se/hitta-information/fornsok-fmis/">RAÄ</a>',
		lyr: 'BU.Building',
		name: "RAÄ Kulturhistoriska byggnader",
		popupName: 'RAÄ Kulturhistoriska byggnad',
		type: 'WMS',
		useAsHtml: true,
		maplayer: true,
		identify: false
	}, {
		server: "http://epub.sjv.se:80/inspire/inspire/wms",
		attribution: '&copy; <a href="http://www.jordbruksverket.se/etjanster/etjanster/stod/kartorochgis/inspiretjanster/visningstjanster.4.23f3563314184096e0d14fd.html">Jordbruksverket</a>',
		lyr: 'HB.Angs-och_betesmarksinventeringen',
		//lyr: 'HB.Angs-och_betesmarksinventeringen,HB.Angs-och_betesmarksinventeringen_naturtyper',
		name: "Ängs- och betesmarksinventeringen", 
		popupName: "Ängs- och bete",
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: true
	}, {
		server: 'http://geo-inspire.trafikverket.se/MapService/wms.axd/TN_RoadTransportNetwork',
    attribution: '&copy; <a href="http://trafikverket.se/">Trafikverket</a>',
		lyr: 'OwnerAuthority',
		name: "NVDB vägägare",
		popupName: 'NVDB vägägare',
		type: 'WMS',
		useAsHtml: true,
		maplayer: true,
		identify: false
	}, {
		server: 'http://geodpags.skogsstyrelsen.se/arcgis/services/Geodataportal/GeodataportalVisaNaturvardsavtal/MapServer/WmsServer',
    attribution: '&copy; <a href="http://skogsstyrelsen.se/">Skogsstyrelsen</a>',
		lyr: 'Naturvardsavtal_Skogsstyrelsen',
		name: "Naturvardsavtal Skogsstyrelsen",
		popupName: 'Naturvardsavtal Skogsstyrelsen',
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: true
	}, {
		server: 'http://nvpub.vic-metria.nu/arcgis/services/Andra_skydd/MapServer/WmsServer',
    attribution: '&copy; <a href="http://mdp.vic-metria.nu/miljodataportalen/">Naturvårdsverket</a>',
		lyr: 'Riksintresse_Naturvard',
		name: "Riksintresse Naturvård",
		popupName: 'Riksintresse Naturvård',
		type: 'WMS',
		useAsHtml: false,
		maplayer: true,
		identify: true
	}, {
		server: 'http://gis-services.metria.se/arcgis/rest/services/nv/InspireNV_N2K/MapServer/exts/InspireView/SWE/service',
    attribution: '&copy; <a href="http://www.naturvardsverket.se/Var-natur/Skyddad-natur/Natura-2000/">Naturvårdsverket</a>',
		lyr: 'PS.N2K.Habitatdirektivet',
		name: "Natura 2000 skyddade områden",
		popupName: 'Natura 2000 skyddade områden',
		type: 'WMS',
		useAsHtml: true,
		maplayer: true,
		identify: true
	}, {
		server: 'http://ext-geoservices.lansstyrelsen.se/ArcGIS/services/riksintressen/MapServer/WMSServer',
    attribution: '&copy; <a href="http://projektwebbar.lansstyrelsen.se/gis/Sv/Pages/wms-tjanster-fran-lansstyrelserna.aspx">Länsstyrelsen</a>',
		//lyr: '1,2,3,4',
		lyr: '1,2,3,4,5,6,7,8,9,10',
		name: "Länsstyrelsen Riksintressen",
		popupName: 'Länsstyrelsen Riksintressen',
		type: 'WMS',
		useAsHtml: true,
		maplayer: true,
		identify: false
	}];
	
