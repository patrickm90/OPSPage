//var selectedStations = [];
//selectedStations.push(1054);
//selectedStations.push(1111);
//selectedStations.push(1024);
//selectedStations.push(1087);
//selectedStations.push(1065);



var start= 1;
var end = 12;
var station = []; 
var outbound = [];
var count2 = 0;
var inbound = [];
var bezirk = [];
var entire = [];
var count = 0; 

function getStation(STATIONID, start, end)
{
	//TODO: Performance, load JSON only one time!
	$.ajax({
    dataType: "json",
    url: "Data/Map/stations.JSON",
    mimeType: "application/json",
    async:false,
    success: function(data){

    			$.each(data, function(key, val) {
				if(val.STATIONID == STATIONID)
				{
					station.push(val.STATION);
					//outbound.push(val.RIDESOUTBOUND);
					//inbound.push(val.RIDESINCOMING);
					bezirk.push(val.BEZIRK);
					entire.push(val.RIDESENTIRE);
					
					switch (start) {
						case 1:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							console.log(val.INBOUNDJANUARY);
							count += val.RIDES[i]['JANUARY'];
							
							
							}
							count2 += val.INBOUNDJANUARY;
							if(end == 1){
								outbound.push(count);
								inbound.push(count2);
								count = 0;
								count2 = 0;
								break;
							}
						case 2:	
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['FEBRUARY'];
							
							}
							count2 += val.INBOUNDFEBRUARY;
							if(end == 2){
								outbound.push(count);
								inbound.push(count2);
								count = 0;
								count2 = 0
								break;
							}
						case 3:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['MARCH'];
							
							
							}
							count2 += val.INBOUNDMARCH;
							
							if(end == 3){
								outbound.push(count);
								inbound.push(count2);
								count = 0;
								count2 = 0
								break;
							}
						case 4:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['APRIL'];
							
						
							}
							count2 += val.INBOUNDAPRIL;
							if(end == 4){
								outbound.push(count);
								inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 5:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['MAY'];
						
						
							}
								count2 += val.INBOUNDMAY;
							if(end == 5){
								outbound.push(count);
								inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 6:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['JUNE'];
					
							}
									count2 += val.INBOUNDJUNE;
							
							if(end == 6){
								outbound.push(count);
								inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 7:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['JULY'];
						
							}
								count2 += val.INBOUNDJULY;
							if(end == 7){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 8:	
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['AUGUST'];
						
							}
								count2 += val.INBOUNDAUGUST;
							
							if(end == 8){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 9:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['SEPTEMBER'];
							
							}
							count2 += val.INBOUNDSEPTEMBER;
							
							if(end == 9){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 10:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['OCTOBER'];
							
							}
							count2 += val.INBOUNDOCTOBER;
							
							if(end == 10){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 11:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['NOVEMBER'];
						
							}
								count2 += val.INBOUNDNOVEMBER;
							
							if(end == 11){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
						case 12:
							for( var i = 0; i < val.RIDES.length; i++)
							{
							count += val.RIDES[i]['DECEMBER'];
					
							}
									count2 += val.INBOUNDDECEMBER;
							
							console.log(outbound)
							if(end == 12){
								outbound.push(count);
									inbound.push(count2);
								count2 = 0;
								count = 0
								break;
							}
}

					
					/*for( var i = 0; i < val.RIDES.length; i++)
					{
							count += val.RIDES[i]['MARCH'];
							
					}
					outbound.push(count);
				*/
					
				
					
				}
			});
		}
	});


function getInbound(){
   	$.ajax({
    		dataType: "json",
    		url: "Data/Chart/RidesInbound.JSON",
    		mimeType: "application/json", 
    		async:false,
    		sucess: function(inbound_data){
			$.each(inbounddata, function(key, val) {

console.log("HELO");
				if(val.STATIONID == STATIONID)
				{

					for(var i = start; start < end; start ++){
						count += val[i];
					}
					inbound.push(count);
					count = 0; 

				
				}
			});
		}
	});
}
}

    google.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {
	  	  
	var dataArray = [['ID','Outbound','Inbound', 'Bezirk', 'Gesamt']];
 
	for (var n =0; n < selectedStations.length; n++){
		dataArray.push ([station[n], outbound[n], inbound[n], bezirk[n] + '. Bezirk', entire[n]]) 
	
	}

	var data = new google.visualization.arrayToDataTable(dataArray);
	  
      var options = {
        title: 'Correlation between inbound, outbound and usage of some districts in Vienna',
        hAxis: {title: 'Outbound'},
        vAxis: {title: 'Inbound'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
	
	function bubbleChart(start, end){
			
			station.length = 0;
			outbound.length = 0;
			inbound.length = 0;
			bezirk.length = 0;
			entire.length = 0;
		
		this.start = start;

		
	for(var i = 0; i < selectedStations.length; i++){

		getStation(selectedStations[i], start, end);
	}
	
	if(selectedStations.length != 0)
	{
		drawSeriesChart();
	}
	
}
/*
function drawChart(){

	 var data = new google.visualization.DataTable();
      data.addColumn('number', 'outbound');
      data.addColumn('number', 'inbound');
/*
var rows = '[';


for(var j = 0; j < outbound.length; j++){
	console.log(rows);
	if(j == outbound.length-1){
		rows += '[' + outbound[j] + ',' + inbound[j] + ']';
	}
	else{
rows += '[' + outbound[j] + ',' + inbound[j] + '],';}
}

rows += ']';

console.log(outbound[0]);

var fulldata = [[0,0],[0,0],[0,0], [0,0]];

for( var k =0; k < 2; k++){ 
	console.log(outbound);
for(var i = 0; i < this.outbound.length; i++){
	var u = outbound[i];
	if(k == 0){
		console.log(outbound[i]);
	fulldata[i][k] = parseInt(u);}
	if(k == 1){
		fulldata[i][k] = inbound[i];
	}
}}



console.log(fulldata);
      data.addRows(fulldata);

console.log(data); 
	//var data = google.visualization.arrayToDataTable(outbound, inbound);

	var options = {
		hAxis: {
			title: 'outbound?'
		},
		vAxis: {
			title: 'inbound?'
		},
		bubble: {
			textStyle: {
				fontSize: 6
			}
		}
	}

	var chart = new google.visualization.BubbleChart(document.getElementById('bubble'));
	chart.draw(data, options);
}

*/



/*
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
*/
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
