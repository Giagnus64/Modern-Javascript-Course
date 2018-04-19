/*

EasyHTTP Library
For making HTTP requests

Done with direction from Brad Traversy's Modern Javascript class on Udemy

*/

class EasyHTTP{

//GET Request
  get(url){
  	return new Promise((resolve, reject) => {
		fetch(url)
	 		.then(res => res.json())
	 		.then(data => resolve(data))
	 		.catch(err => reject(err));
	 	});
  }

  //POST request
	post(url, data){
  	return new Promise((resolve, reject) => {
		fetch(url, {
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(data)
		})
	 		.then(res => res.json())
	 		.then(data => resolve(data))
	 		.catch(err => reject(err));
	 	});
  }  

  //PUT request
	put(url, data){
  	return new Promise((resolve, reject) => {
		fetch(url, {
			method:'PUT',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify(data)
		})
	 		.then(res => res.json())
	 		.then(data => resolve(data))
	 		.catch(err => reject(err));
	 	});
  }

  //DELETE request
	remove(url){
  	return new Promise((resolve, reject) => {
		fetch(url, {
			method:'DELETE',
			headers:{
				'Content-type':'application/json'
			}
		})
	 		.then(res => res.json())
	 		.then(data => resolve('Resource deleted.'))
	 		.catch(err => reject(err));
	 	});
  }
}