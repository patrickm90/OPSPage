function showRideInformationForStation(STATIONID, selectedStation)
{
	//TODO: Performance, load JSON only one time!
	$.ajax({
    dataType: "json",
    url: "Data/Map/stations.JSON",
    mimeType: "application/json",
    success: function(data){
			$.each(data, function(key, val) {
				if(val.STATIONID == STATIONID)
				{
					$("#someContent").html("<br>StationId: <b>" + val.STATIONID + "</b><br>Station: <b>" + val.STATION + "</b><br>" + "RIDESENTIRE: <b> " + val.RIDESENTIRE + "</b></br>");
					
						for(var i = 0; i < val.RIDES.length; i++)
						{
							$("#someContent").append("<br>RIDE TO: <b>" + val.RIDES[i].STATIONID + "</b> Count: <b>" + val.RIDES[i].ENTIRE + "</b>");
						}
						loadBarChart(val.RIDESOUTBOUND, val.RIDESINCOMING);
				}
			});
		}
	});

	showSelectedStations(selectedStation);
	
	

}
function showSelectedStations(selectedStation)
{
	$("#selectedStations").html("<b>SELECTED STATIONS</b><br>")
	for(var i = 0; i < selectedStations.length; i++)
	{
		$("#selectedStations").append(selectedStations[i] + ",");
	}
}
function buildDataObject(value, text)
{
	var data = 
	{
		value : value,
		text : text

	};
}
function loadBarChart(RIDESOUTBOUND, RIDESINCOMING)
{

	var dataSet = [];
	dataSet.push(buildDataObject(RIDESOUTBOUND, "Text1"));
	dataSet.push(buildDataObject(RIDESOUTBOUND, "Text2"));

	/*
	var data = JSON.stringify(dataSet);

	var x = d3.scale.linear()
	.domain([0,100])
	.range([0, 100]);

	d3.select(".chart")
	.selectAll("div")
	.data(dataSet)
	.enter().append("div")
	.style("width", function(d) { alert x(d[0].value); return x(d[0].value) + "px";})
	.text(function(d) {return d.text;});
	*/
}