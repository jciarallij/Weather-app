$(document).ready(function(){

	var apiKey = "8b179fcb60543fb06287c9eaa6b5299b";
	var weatherURL =  'http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid='+apiKey;

	$.getJSON(weatherURL, function(weatherData){
		console.log(weatherData);

		var currTemp = weatherData.main.temp;
		console.log(currTemp);

		var canvas = $('#current-temp');
		var context = canvas[0].getContext('2d');
		var currPerc = 0;
		// Setup our circle and styling
		// Setup our color based on temp (colder = bluer, hotter = redder)
		// Setup an animate funciton
		// Update the appropriate variables.
		var shadeColor;
		if(currTemp < 32){
			shadeColor = '#D4F0FF';
		} else if ((currTemp >= 32) && (currTemp < 59)) {
			shadeColor = '#129793';
		} else if ((currTemp >= 59) && (currTemp < 75)) {
			shadeColor = '#7cfc00';
		} else if ((currTemp >= 75) && (currTemp < 90)) {
			shadeColor = '#FF6600';
		} else {
			shadeColor = '#E3170D';
		}




		function animate(current){

			//Draw the inner circle
			context.fillStyle = "#ccc";
			context.beginPath();
			context.arc(155,75, 65, 0, 2*Math.PI);
			context.closePath();
			context.fill();

			// Draw the outer arc/line
			context.lineWidth = 10;
			context.strokeStyle = "#ff0000";
			context.beginPath();
			context.arc(155,75,70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
			context.stroke();

			context.font = "48px Myriad Pro";
			context.fillStyle = "#0000ff";
			context.textBaseLine = "top";
			context.fillText = (currTemp, 175-70, (85-70)*6);	
			currPerc++;
			if(currPerc < currTemp){
				requestAnimationFrame(function(){
					animate(currPerc / 100);
				});
			}

		}
		animate();
	});
});

	// (currTemp/100)*Math.PI)