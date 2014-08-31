$(document).ready(function() {

    var popupContent = document.createElement("div");
    popupContent.setAttribute("class", "popup-content");
    popupContent.setAttribute("id", "popup-content");
    popupContent.appendChild($("<img src='img/Sagarmatha_from_Space.jpg'/>")[0]);
    popupContent.setAttribute("style", "width:300px;height:300px;margin:-50px;");



    var map = L.map('map', {
        center: [27.9, 86.9],
        zoom: 5,
        doubleClickZoom: true
    });
    var osmTileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 6,
        minZoom: 1
    });
    osmTileLayer.addTo(map);

    var markerPoint = L.geoJson(null, {
        onEachFeature: function(feature, layer) {
            var popup = L.popup({
                autoPan: true,
                keepInView: true
            });
            popup.setContent(popupContent);
            layer.on("click", function(e) {
                var deferred = $.Deferred()
                popup.setLatLng(e.latlng);
                popup.openOn(map);
                popup.update();
                $(".leaflet-popup").find("#glass").remove();
                deferred.resolve();
                deferred.done(function() {
                    var glass = new MagnifyingGlass.MagnifyingGlass({
                        target: $(".leaflet-popup")[0]
                        , glass_diameter: 300
                        , power: 3
                    }).magnification.start();
                });
            });
        },
        pointToLayer: function(feature, latlng) {
            map.panTo(latlng);
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "markers/red.png",
                    iconSize: [20, 35],
                    iconAnchor: [10, 35]
                })
            });
        }
    }).addTo(map);
    markerPoint.addData({
        "type": "Feature",
        "properties": {
            "peak": "Everest",
            "picture": "img/img/Sagarmatha_from_Space.jpg"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [86.9, 27.9]
        }
    });
});