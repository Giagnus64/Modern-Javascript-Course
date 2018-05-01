const data = [
	{
		name:'John Doe',
		age:'32',
		gender:'male',
		lookingfor:'female',
		location:'Boston, MA',
		image:'https://randomuser.me/api/portraits/men/82.jpg'
	},
	{
		name:'Jane Doe',
		age:'30',
		gender:'female',
		lookingfor:'female',
		location:'Miami, FL',
		image:'https://randomuser.me/api/portraits/women/82.jpg'
	},
	{
		name:'Will Bee',
		age:'21',
		gender:'male',
		lookingfor:'male',
		location:'Las Vegas, NV',
		image:'https://randomuser.me/api/portraits/men/22.jpg'
	}
];

const profiles = profileIterator(data);

//Call first profile
nextProfile();

//Next event
document.querySelector("#next").addEventListener('click', nextProfile);

//Next profile display
function nextProfile(){
	const currentProfile = profiles.next().value;

	if(currentProfile !== undefined){

		document.querySelector("#profile-display").innerHTML = 
		`
	    <ul class="list-group>
		<li class="list-group-item">Name: ${currentProfile.name}</li>
		<li class="list-group-item">Age: ${currentProfile.age}</li>
		<li class="list-group-item">Gender: ${currentProfile.gender}</li>
		<li class="list-group-item">Looking For: ${currentProfile.lookingfor}</li>
		<li class="list-group-item">Location: ${currentProfile.location}</li>
		</ul>`;

		document.getElementById('image-display').innerHTML = `<img src="${currentProfile.image}">`;
	} else{
		window.location.reload();
	}
}

//Profile Iterator
function profileIterator(profiles){
	let nextIndex = 0;

	return{
		next:function(){
			return nextIndex < profiles.length ?
			{value: profiles[nextIndex++], done:false} :
			{done:true}

		}
	};
}