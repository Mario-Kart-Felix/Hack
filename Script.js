 $(document).ready(function(){
	 $('#rate').html("<h3>Insurance Premium:</h3>");
	 
	 var getRate = function(){
	     //Grab rate and store it in a variable
	     var bitcoinAmount = $('#bitcoinAmount').val();
	     //Check for valid input
	     if($.isNumeric(bitcoinAmount) === false || bitcoinAmount === ""){
	     	//If not valid input (not numerical), display validation message
	    	 $('#rate').html("<h3>Please enter a valid numerical input.</h3>");
	     }
	     else{
	     	 //Valid input, proceed to calculation
	     	 
	     	 var historic = moment().subtract(3, 'years').calendar();
			//format date to be readable by CoinDesk API
	     	 historic = moment(historic).format('YYYY-MM-DD');

	     	 var percentChanges = [];
	     	 //pull previous three years of data from today

			 callAjaxfunc(function() {
				//find average of percentChanges
	     	 	var average = 0;
	     	 	//sum
	     	 	for (var i = 0; i < percentChanges.length; i++) {
	     	 		average+=percentChanges[i];
	     	 	}
	     	 	//divide by number of percent changes
	     	 	average = average/percentChanges.length;

	     	 	//find variance
	     	 	var variance = 0;
	     	 	for (var i = 0; i < percentChanges.length; i++){
	     	 		variance += Math.pow((percentChanges[i]-average),2);
	     	 	}
	     	 	variance = variance/percentChanges.length;

	     	 	//calculate standardDeviation
	     	 	var standardDeviation = Math.sqrt(variance,2);

	     	 	//calculate insurance premium from standardDeveiation
	     	 	var standardDeviation2 = (standardDeviation*100);
	     	 	var average2 = (average*100);

	     	 	var T = ((Math.sqrt(100-standardDeviation2+average2))+(Math.sqrt(100+standardDeviation2+average2)));
	     	 	var insurancePremium1 = ((Math.pow(((standardDeviation2+average2-Math.pow((T),2))/((-2)*(T))),2)-100))*(-1);
	     	 	var insurancePremium2 = ((0.5)*standardDeviation2)+((0.5)*average2);

	     	 	//assumes competition
	     	 	var thePremium = (((insurancePremium1+insurancePremium2)/2)/100)*bitcoinAmount; 

	     	 	$('#rate').html("<h3>Insurance Premium: " + thePremium.toFixed(2) + " GHS </h3>"); //rounds to two decimal places

	     	 	//tests
	     	 	// console.log("premium: ", thePremium);
	     	 	// console.log(percentChanges);
	     	 	// console.log("average: ", average);
	     	 	// console.log("variance: ", variance);
	     	 	// console.log("standardDeviation: ", standardDeviation);
			 });


	     	 function callAjaxfunc(callback){
		     	 $.ajax({
	  				dataType: 'json',
	 				url: "http://api.coindesk.com/v1/bpi/historical/close.json?start="+historic+"&end="+moment().format('YYYY-MM-DD'),
	 				data: {name: name},
	 				async: false, //async request becuase call must be complete before calculations
	  				success: function(json){

		  				var date1 = moment().subtract(30, 'days').calendar();
			     	 		date1 = moment(date1).format('YYYY-MM-DD');
			     	 	var rate1 = json.bpi[date1]; //earlier rate
			     	 	
			     	 	// because current and historic APIs are distinct, the most stable
			     	 	// implementation starts with Bitcoin close price from day before use
			     	 	var date2 = moment().subtract(1, 'days');
			     	 		date2 = moment(date2).format('YYYY-MM-DD');
			     	 	var rate2 = json.bpi[date2]; //later rate
			     	 	
			     	 	percentChanges.push(percentChange(rate1,rate2));

			     	 	//calculate percent changes
			     	 	for (var i = 0; i < 732; i++) {
			     	 		date1 = moment(date1).subtract(1,'days').format('YYYY-MM-DD');
			     	 		rate1 = json.bpi[date1];
			     	 		
			     	 		date2 = moment(date2).subtract(1, 'days').format('YYYY-MM-DD');
			     	 		rate2 = json.bpi[date2];
			     	 		
			     	 		//append percent changes to array
			     	 		percentChanges.push(percentChange(rate1,rate2));
			     	 	}
			  			
			  			callback(); //callback to ensure success validity in asynchronous enviornment
		  			}
				});
		     }
	     }
	 };

	 var percentChange = function(x,y){
	 	return (y-x)/x;
	 }
	 $('#calculate').click(getRate);
});


