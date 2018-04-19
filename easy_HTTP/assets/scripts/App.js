const http = new easyHTTP;

//Get Posts --- for single post add /1 to url
// http.get('https://jsonplaceholder.typicode.com/posts/', 
// 	function(err, response){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log(response);
// 		}
// 	});


//Create data

const data = {
	title: 'Custom Post',
	body: 'This is a custom post'
};

//POST request
// http.post('https://jsonplaceholder.typicode.com/posts/', data, 
// 	function(err, response){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log(response);
// 		}

// 	});

//PUT Request
// http.put('https://jsonplaceholder.typicode.com/posts/5', data,
// 	function(err, response){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log(response);
// 		}
// 	});

//DELETE request
http.delete('https://jsonplaceholder.typicode.com/posts/1',
	function(err, response){
		if(err){
			console.log(err);
		} else{
			console.log(response);
		}
	});
