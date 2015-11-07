var map;
var pathesToDraw = [];
var directionsDisplay;
var directionService = new google.maps.DirectionsService();
var stations = [];
var heatMaps = [];
var selectedStations = []; 
var maxRidesToSingleStation = 0;
var bubbleChartHelperSingleStation;

var control = false;
	$(document).on('keyup keydown', function(e) {
	control = e.ctrlKey;
});

var config = {
	CityBikeImageUrl: "",
	HeatmapColor: "",
	HeatmapInitialOpacity: "",
	HeatmapSelectedColor: "",
	HeatmapSelectedOpacity: "",
	PathColorDefault: ""

};

function loadConfiguration()
{
		$.ajax({
			 type: "GET",
			 url: "Configuration/config.xml",
			 dataType: "xml",
			 success: function(xml) {
				  console.log(xml);
				  $(xml).find('Design').each(function(){
				  	 config.CityBikeImageUrl = $(this).find('CityBikeImageUrl').text();
			  		 config.HeatmapColor = $(this).find('HeatmapColor').text();
			  		 config.HeatmapInitialOpacity = $(this).find('HeatmapInitialOpacity').text();
			  		 config.HeatmapSelectedColor = $(this).find('HeatmapSelectedColor').text();
			  		 config.HeatmapSelectedOpacity = $(this).find('HeatmapSelectedOpacity').text();
			  		 config.PathColorDefault = $(this).find('PathColorDefault').text(); 
				});
		 	}
		});


}

function initialize() {
		directionsDisplay = new google.maps.DirectionsRenderer();
        //center it to vienna
		var mapOptions = {
          center: { lat: 48.208174, lng: 16.373819},
          zoom: 13
        };
		//load the map
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
		directionsDisplay.setMap(map);
		
		//use the bikeLayer	
		var bikeLayer = new google.maps.BicyclingLayer();
		//bikeLayer.setMap(map);

		//load configuration (color, etc.)
		loadConfiguration();

		//add markers to map
		addStations(map);
		
		//define the infowindow (html content!) for marker info!
		infowindow = new google.maps.InfoWindow(); 
		
			
	}
    google.maps.event.addDomListener(window, 'load', initialize);



//method to add all ctbike stations as markers to map
function addStations(){
	
	$.ajax({
    dataType: "json",
    url: "Data/Map/stations.JSON",
    mimeType: "application/json",
    success: function(data){
			$.each(data, function(key, val) {
					var station = new google.maps.Marker({
					position: new google.maps.LatLng(val.LAT, val.LNG), 
					map:map, 
					title: val.STATIONID + " " + val.STATION,
					icon: config.CityBikeImageUrl
					
				});

				
				for(var i = 0; i < val.RIDES.length; i++)
				{
					if(val.RIDES[i].ENTIRE > maxRidesToSingleStation)
					{
						maxRidesToSingleStation = val.RIDES[i].ENTIRE;
					}
				}
				
				//filter empty stations (without RIDES)
				if(val.RIDESENTIRE != 0)
				{
					stations.push(val);
				}
				else
				{
					station.setMap(null);
				}
				
				google.maps.event.addListener(station, 'click', function(){
					if(control)
						onStationClick(val, true);
					else
						onStationClick(val, false);
				});
				
			});
			for(var i = 0; i < stations.length; i++)
			{
				var val = stations[i];
				//DRAW CIRCLE
				var heatMapEntire = {
					fillColor: config.HeatmapColor,
					map:map,
					center: new google.maps.LatLng(val.LAT, val.LNG),
					fillOpacity: 0.35,
					radius: val.RIDESENTIRE / maxRidesToSingleStation * 50
				};
				
				heatMapEntire = new google.maps.Circle(heatMapEntire);

				var heatMapObject = 
				{
					StationId : stations[i].STATIONID,
					HeatMap : heatMapEntire
				}

				heatMaps.push(heatMapObject);
			}
			
		}
	});
}

var timeOutCounter = 0;
var delay = 0;

/*
function createStationsRoutesWithTimeOut(station)
{
		setTimeout(function(){
		timeOutCounter++;
		if(timeOutCounter < stations.length)
		{
			route(new google.maps.LatLng(station.LAT, station.LNG), new google.maps.LatLng(stations[timeOutCounter].LAT, stations[timeOutCounter].LNG));
			createStationsRoutesWithTimeOut(station);
		}
		}, delay)
}
*/
//happens when a marker is clicked
function onStationClick(station, control){
	removeAllPathes();
	var htmlContent = "<b>" + station.STATIONID + "</b>";
	
	infowindow.setPosition(new google.maps.LatLng(station.LAT, station.LNG));
	infowindow.setContent(htmlContent);
	//infowindow.open(map);
	
	timeOutCounter = 0;
	
	//createStationsRoutesWithTimeOut(station);	//comment line in for real route calculation!

	if (control)
	{
		for(var i = 0; i < heatMaps.length; i++)
		{
			if(heatMaps[i].StationId == station.STATIONID)
			{

				heatMaps[i].HeatMap.setMap(null);	

				if($.inArray(station.STATIONID, selectedStations) == -1)
				{
					//station is selected!
					selectedStations.push(station.STATIONID);
					heatMaps[i].HeatMap.fillOpacity = config.HeatmapSelectedOpacity;
					heatMaps[i].HeatMap.fillColor = config.HeatmapSelectedColor;
				}
				else
				{
					//station is not selected
					selectedStations.splice($.inArray(station.STATIONID, selectedStations), 1 );
					heatMaps[i].HeatMap.fillOpacity = config.HeatmapInitialOpacity;
					heatMaps[i].HeatMap.fillColor = config.HeatmapColor;
				}

				heatMaps[i].HeatMap.setMap(map);

			}
		}
	}
	showRideInformationForStation(station.STATIONID,selectedStations); //ATTENTION: Function in external JS-File!
	
	for(var i = 0; i < stations.length; i++)
	{
		var originObject = 
		{
			A : station.LAT,
			F : station.LNG
		}
		var destObject = 
		{
			A : stations[i].LAT,
			F : stations[i].LNG
		}
		
		var coordArray = [];
		coordArray.push(originObject);
		coordArray.push(destObject);
		
		var ridesEntireToStation = 0;
		
		
		for(var j = 0; j < station.RIDES.length; j++)
		{
			if(station.RIDES[j].STATIONID == stations[i].STATIONID)
			{
				ridesEntireToStation = station.RIDES[j].ENTIRE;
			}
		}
		
		

		drawPath(overViewPathToCoordinatesArray(coordArray),ridesEntireToStation / maxRidesToSingleStation, station.STATION, stations[i].STATION,ridesEntireToStation);
		
		//overViewPathToCoordinatesArray
		//route(station.position, stations[i].position);
	}
	if(selectedStations.length > 0)
		bubbleChart(1,12);
}
//calculates the route from A to B 
/*
function route(origin, destination)
{
	var routeRequest ={
		origin: origin,
		destination: destination,
		provideRouteAlternatives: false,
		travelMode: google.maps.TravelMode.BICYCLING
	};
	
	directionService.route(routeRequest, function(result, status) {
		if(status == google.maps.DirectionsStatus.OK){
			//directionsDisplay.setDirections(result); //we draw the Polyline out of the result, so no need for this!
			delay = 0;
			var contentString = "Distance: " + result.routes[0].legs[0].distance.text + " Duration: " + result.routes[0].legs[0].duration.text;
			//console.log(contentString);
			drawPath(overViewPathToCoordinatesArray(result.routes[0].overview_path), 1);
			console.log(origin + "," + destination + "," + result.routes[0].overview_path);
		}
		else if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
		{
			delay = 100;
			timeOutCounter--;
		}
	});
}
*/
//Helper method to build a simple object array from overview_path
function overViewPathToCoordinatesArray(overviewPath)
{
	var coordinates = [];
	for(var i = 0; i < overviewPath.length; i++)
	{
		coordinates.push(new google.maps.LatLng(overviewPath[i].A, overviewPath[i].F));
	}
		
	return coordinates;
}
//method to draw a Path 
//Attention: Coordinates is an array of cords lat/long!
function drawPath(coordinates, weight, startStation, endStation, rides)
{
	var color = config.PathColorDefault;
	//removeAllPathes();
	var path = new google.maps.Polyline({
		path : coordinates,
		geodesic: true,
		strokeColor: color,
		strokeOpacity: 100.0,
		strokeWeight: weight * 30
	});
	//define clickEvent
	google.maps.event.addListener(path, 'click', function(){
	
		//alert("Startstation: " + startStation + "  Endstation: " + endStation + " " + rides + " Rides" );
	});
	
	
	pathesToDraw.push(path);
	path.setMap(map);
}
//Method to removeAllPathes
function removeAllPathes()
{
	for(var i = 0; i < pathesToDraw.length; i++)
		pathesToDraw[i].setMap(null);
}