class Book {
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
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

	showAlert(message, className){
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

	deleteBook(target){
		if(target.className === 'delete'){
		target.parentElement.parentElement.remove();
		}
	}

	clearFields(){
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

//Local Storage Class
class Store {
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			 books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}
	static displayBooks(){
		const books = Store.getBooks();

		books.forEach(function(book){
			const ui = new UI();

			//Add book to UI
			ui.addBookToList(book);
		});

	}

	static addBook(book){
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn){
	 const books = Store.getBooks();

	 books.forEach(function(book, index){
	 	if(book.isbn === isbn) {
	 		books.splice(index, 1);
	 	}
	 });

	localStorage.setItem('books', JSON.stringify(books));

	 }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

		//Add to ls
		Store.addBook(book);

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

		//Remove from LS
		Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

		//Show Message
		ui.showAlert('Book Removed!', 'success');

	});