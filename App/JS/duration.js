

var start= 1;
var end = 12;
var station = []; 
var outbound = [];
var count2 = 0;
var ind = [];
var bezirk = [];
var entire = [];
var count = 0; 
var flag = 0;
var help = [];

//google.load("visualization", "1", {packages: ["corechart"]});
 


function getDuration(start, end)
{

outbound.length = 0;
ind.length= 0; 
	//TODO: Performance, load JSON only one time!
	$.ajax({
    dataType: "json",
    url: "Data/Chart/RideTime.JSON",
    mimeType: "application/json",
    async:false,
    success: function(data){

    			$.each(data, function(key, val) {
                //alert("TEST");
				for( var k = 0 ; k <120; k++){
    				if(val.DURATIONINMINUTES == k){
    					if(start == 1 && end == 12){
    						console.log(k);
       							ind.push(k);
    							outbound.push(val[Object.keys(val)[1]]);			
    							console.log(outbound);}
    		    		else{

    				for ( var i = start; i <= end; i++){
							if( flag == 0){
    							flag = 1;
    							ind.push(k);
    							count = (val[Object.keys(val)[i+1]]);
    						}
    						else{
    							count += val[Object.keys(val)[i+1]] ;
    							
    							
    							
    						}
    					if(i == end)					
    						{   outbound.push(count);   
    							count = 0; 
    								
    								flag = 0;}
    					}
    				}
}    					
    					}		
				
			});
		}
	});



}

    google.setOnLoadCallback(drawHisto);

    function drawHisto() {
	  	  
	var dataArray = [['duration','count']];
 
	for (var n =0; n < ind.length; n++){
		dataArray.push ([ind[n], outbound[n]] ); 
	
	}


	var data = new google.visualization.arrayToDataTable(dataArray);
	  data.sort('duration');
      var options = {
        legend: {position: 'none'},
        chart:{ title:'Histogram showing the amount of bike rides of a specific time duration'},
        hAxis: {title: 'minutes driven', minValue: 0, maxValue: 120}, 
      vAxis: {title: 'amount'
            }
,
      
        height: 400
          //  bar: { groupWidth: '75%' }
      };

      var chart = new google.charts.Bar(document.getElementById('column_div'));
        chart.draw(data, options);
    }
	
	function duration(start, end){
			station.length = 0;
			outbound.length = 0;
			ind.length = 0;
			bezirk.length = 0;
			entire.length = 0;

		
		this.start = start;

	getDuration( start, end);
		
	drawHisto();


}
