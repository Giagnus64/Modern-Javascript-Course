import {http} from "./http";
import {ui} from "./UI";

//Get posts on domload
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('.posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('.posts').addEventListener('click', enableEdit);

//Listen for cancel state
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//Get Posts
function getPosts(){
	http.get('http://localhost:3000/posts')
	.then(data => ui.showPosts(data))
	.catch(err => console.log(err));
}

//Add Post
function submitPost(){
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const id = document.querySelector('#id').value;

	const data = { 
		title,
		body
		}

	//Validate input
	if(title === '' || body === ''){
		ui.showAlert('Please fill in all fields.', 'alert alert-danger');
	} else{
		//check for id
		if(id === ''){
			//Create Post
			http.post('http://localhost:3000/posts', data)
			.then(data => {
				ui.showAlert('Post Added', 'alert alert-success');
				ui.clearFields();
				getPosts();
			})
			.catch(err => console.log(err));
		} else{
			//Update Post
			http.put(`http://localhost:3000/posts/${id}`, data)
				.then(data => {
					ui.showAlert('Post Updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch(err => console.log(err));

		}
		

		
	}
}

// Delete Post
function deletePost(e) {
 e.preventDefault();
 if(e.target.parentElement.classList.contains('delete')) {
     const id = e.target.parentElement.dataset.id;
     if(confirm('Are you sure?')) {
         http.remove(`http://localhost:3000/posts/${id}`)
             .then(data => {
                 getPosts();
                 ui.showAlert('Post removed', 'alert alert-success');
             })
             .catch(err => console.log(err));
        }
    }
    getPosts();
}

//Enable Edit State
function enableEdit(e){
	e.preventDefault();
	if(e.target.parentElement.classList.contains('edit')){
		const id = e.target.parentElement.dataset.id;
		const body = e.target.parentElement.previousElementSibling.textContent;
		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

		const data = {
			id,
			title,
			body
		}

		ui.fillForm(data);
	}

}

//Cancel Edit State
function cancelEdit(e){
	e.preventDefault();
	if(e.target.classList.contains('post-cancel')){
		ui.changeFormState('add');
	}
}