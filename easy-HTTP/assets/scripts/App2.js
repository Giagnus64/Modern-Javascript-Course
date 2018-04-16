const http = new EasyHTTP;

// //Get Users
// http.get('https://jsonplaceholder.typicode.com/users/')
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err));

//Create data
const data = {
	name:'John Doe',
	username: 'johndoe',
	email:'you@u.com'
}


//POST User
// http.post('https://jsonplaceholder.typicode.com/users/', data)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err));


// //PUT User
// http.put('https://jsonplaceholder.typicode.com/users/1', data)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err));

//DELETE User
http.remove('https://jsonplaceholder.typicode.com/users/1')
	.then(data => console.log(data))
	.catch(err => console.log(err));

