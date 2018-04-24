//init storage class
const storage = new Storage();

const weatherLocation = storage.getLocationData();

//init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state);

//init UI object
const ui = new UI();

//Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

//Change location event
document.querySelector('#w-change-btn').addEventListener('click', (e) => {
	const city = document.querySelector("#city").value;
	const state = document.querySelector("#state").value;

	weather.changeLocation(city, state);

	//Set Location in local storage
	storage.setLocationData(city, state);

	getWeather();

	//Close Modal
	$('#locModal').modal('hide');

	});

function getWeather(){
	weather.getWeather()
		.then(results => {
			ui.paint(results);
		})
		.catch(err => console.log(err));
}
	