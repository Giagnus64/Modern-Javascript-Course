class GitHub {
	constructor(){
		this.client_id = '9c9c0f193689d9eded20';
		this.client_secret = '185eb122d8e4192fada2548609082673d7eb5e57';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}

	async getUser(user){
		const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

		const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
		
		const profile = await profileResponse.json();
		
		const repos = await reposResponse.json();

		return {
			profile,
			repos
		}		
	}

	

}