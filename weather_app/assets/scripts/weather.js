class Weather{
	constructor(city, state){
		this.apiKey = '14971d203259f858';
		this.city = city;
		this.state = state;
	}

	//Fetch Weather from API
	async getWeather(){
		const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);
			// {
			// 	headers:{
			// 		'Access-Control-Allow-Origin':'*'
			// 	}
			// }
			//);

		const responseData = await response.json();

		return responseData.current_observation;
	}

	//Change Location
	changeLocation(city, state){
		this.city = city;
		this.state = state;
	}
}