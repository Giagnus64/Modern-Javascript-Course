//init github class
const github = new GitHub;
//init Ui class
const ui = new UI;



// Search input
const searchUser = document.querySelector('#search-user');

//Search input listener
searchUser.addEventListener('keyup', (e) =>{
	//Get input text
	const userText = e.target.value;

	if(userText!= ''){
		//Make http call
		github.getUser(userText)
		  .then(data => {
		  	if(data.profile.message === 'Not Found'){
		  		//Show Alert
		  		ui.showAlert('User Not Found', 'alert alert-danger');
		  		ui.clearProfile();
		  	} else{
		  		//Show Profile
		  		ui.showProfile(data.profile);
		  		ui.showRepos(data.repos);

		  	}
		  })
	} else {
		//Clear Profile
		ui.clearProfile();

	}
});

