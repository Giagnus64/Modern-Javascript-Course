//Book Constructor
function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI constructor
function UI(){}

// Add Book To List
UI.prototype.addBookToList = function(book){
	const list = document.querySelector('#book-list');
	// Create tr element
	const row = document.createElement('tr');
	// Insert Cols
	row.innerHTML =`
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href='#' class='delete'>X</a></td>`;

	list.appendChild(row);


}

//Show Alert
UI.prototype.showAlert = function(message, className){
	//Create Div
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	container.insertBefore(div,form);

	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);

}

//Delete Book
UI.prototype.deleteBook = function(target){
	if(target.className === 'delete'){
		target.parentElement.parentElement.remove();
	}
}

//Clear Fields
UI.prototype.clearFields= function(){
	document.querySelector('#title').value = '';
	document.querySelector('#author').value = '';
	document.querySelector('#isbn').value = '';
}

//Event Listeners
document.querySelector('#book-form').addEventListener('submit', 
	function(e){
		e.preventDefault();
		const title = document.querySelector('#title').value,
			  author = document.querySelector('#author').value,
			  isbn = document.querySelector('#isbn').value;
		// Instantiate Book 
		const book = new Book(title,author,isbn);

		// Instantiate a UI Object
		const ui = new UI();

		//Validate
		if(title === '' || author === '' || isbn === ''){
			ui.showAlert('Please fill in all fields', 'error');

		} else{

		// Add Book to List
		ui.addBookToList(book);

		//Show Alert
		ui.showAlert('Book added!', 'success')

		//Clear Fields
		ui.clearFields();
		}

});

//Delete Listener
document.querySelector('#book-list').addEventListener('click', 
	function(e){
		e.preventDefault();

		const ui = new UI();
		ui.deleteBook(e.target);

		//Show Message
		ui.showAlert('Book Removed!', 'success');

	});