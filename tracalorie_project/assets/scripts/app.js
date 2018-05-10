// Storage Controller
const StorageCtrl = (function(){
	//Public Methods
	return {
		storeItem: function(item){
			let foods;
			//check to see if items in local storage
			if(localStorage.getItem('foods') ===  null){
				foods = [];
				//Push new item
				foods.push(item);
				//Set local storage
				localStorage.setItem('foods', JSON.stringify(foods));
			} else{
				foods = JSON.parse(localStorage.getItem('foods'));
				//push new item
				foods.push(item);

				localStorage.setItem('foods', JSON.stringify(foods));
			}

		},
		getItemsFromStorage: function(){
			let foods;
			if(localStorage.getItem('foods') ===  null){
				foods = [];
			} else{
				foods = JSON.parse(localStorage.getItem('foods'));
			}
			return foods;
		},
		updateItemStorage: function(updatedItem){
			let foods = JSON.parse(localStorage.getItem('foods'));

			foods.forEach(function(item, index){
				if(updatedItem.id === item.id){
					foods.splice(index, 1, updatedItem);
				}
			});
			//Reset localStorage
			localStorage.setItem('foods', JSON.stringify(foods));

		},

		deleteItemFromStorage: function(id){
			let foods = JSON.parse(localStorage.getItem('foods'));
			console.log(id);
			foods.forEach(function(item, index){
				if(id === item.id){
					foods.splice(index, 1);
				}
			});
			//Reset localStorage
			localStorage.setItem('foods', JSON.stringify(foods));
			
		},
		clearStorage: function(){
			localStorage.removeItem('foods');
		}
	}
})();


//Item Controller
const ItemCtrl = (function(){
	//Item Constructor
	const Item = function (id, name, calories){
		this.id = id;
		this.name = name;
		this.calories = calories;
	}

	//Data Structure / State
	const data = {
		// items:[
		// // 	{id:0, name: 'Steak Dinner', calories: 1200},
		// // 	{id:1, name: 'Cookie', calories: 400},
		// // 	{id:2, name: 'Eggs', calories: 300}
	 //    ],
	 	items: StorageCtrl.getItemsFromStorage(),
		currentItem: null,
		totalCalories: 0
	}
	//Public Methods
	return {
		getItems: function(){
			return data.items;
		}, 

		addItem: function(name, calories){
			let ID;
			//Create ID
			if(data.items.length > 0){
				ID = data.items[data.items.length - 1].id + 1;
			} else{
				ID = 0
			}

			//Calories to number
			calories = parseInt(calories);

			//Create new Item
			newItem = new Item(ID, name, calories);


			//Push new Item to data structure
			data.items.push(newItem);

			return newItem;
		},
		getItemById: function(id){
			let found = null;
			//Loop through items to find matching id
			data.items.forEach(function(item){
				if(item.id === id){
					found = item;
				}
			});
			return found;
		},
		updateItem: function(name, calories){
			//Calories to number
			calories = parseInt(calories);

			let found = null;

			data.items.forEach(function(item){
				if(item.id === data.currentItem.id){
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function(id){
			//Get ids
			ids = data.items.map(function(item){
				return item.id;
			});

			//Get index
			const index = ids.indexOf(id);

			//Remove item
			data.items.splice(index, 1);
		},
		clearAllItems: function(){
			data.items = [];
		},
		getTotalCalories: function(){
			let total = 0;
			//loop trought items to add cals
			data.items.forEach(function(item){
				total += item.calories;
			});
			//Set total calories
			data.totalCalories = total;

			return data.totalCalories;
		},
		setCurrentItem: function(item){
			data.currentItem = item;
		},
		getCurrentItem: function(){
			return data.currentItem;
		},

		logData: function(){
			return data;
		}
	}
})();

//UI Controller
const UICtrl = (function(){
	const UISelectors = {
		itemList: '#item-list',
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		clearAllBtn: '.clear-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories'
	}


	//Public Methods
	return {
		populateItemList: function(items){
			let html = '';
			//Iterate through items list and generate html for each
			items.forEach(function(item){
				html += `<li id="item-${item.id}" class="collection-item"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href='#' class="edit-item secondary-content"><i class="fa fa-pencil"></i></a></li>`;
			});

			//Insert List Items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},

		getItemInput: function(){
			return {
				name:document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function(item){
			//Show the list
			document.querySelector(UISelectors.itemList).style.display ='block';
			// Create li element
			const li = document.createElement('li');
			//Add class
			li.className = 'collection-item';
			li.id = `item-${item.id}`;
			//Add HTML
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href='#' class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`;
			//Insert Item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
		},
		updateListItem: function(item){
			// Get List Items
			let listItems = document.querySelectorAll(UISelectors.listItems);

			//Turn nodelist into array
			listItems = Array.from(listItems);
			listItems.forEach(function(listItem){
				const itemID = listItem.getAttribute('id');

				if(itemID === `item-${item.id}`){
					document.querySelector(`#${itemID}`).innerHTML =`<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href='#' class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`;
				}
			});
		},
		deleteListItem: function(id){
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID).remove();
		},

		clearInput: function(){
			document.querySelector(UISelectors.itemNameInput).value ='';
			document.querySelector(UISelectors.itemCaloriesInput).value ='';
		},
		addItemToForm: function(){
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value =ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		removeItems: function(){
			let listItems = document.querySelectorAll(UISelectors.listItems);

			//Turn node list into array
			listItems = Array.from(listItems);

			listItems.forEach(function(item){
				item.remove();
			});
		},
		hideList: function(){
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showTotalCalories: function(totalCalories){
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		clearEditState: function(){
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},
		showEditState: function(){
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
		},

		getSelectors: function(){
			return UISelectors;
		}
	}
	
})();

//App Controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl){
	//Load event listeners
	const loadEventListeners = function(){
		//Gets UI Selectors from UI Obj/Func/Module
		const UISelectors = UICtrl.getSelectors();

		//Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

		//Disable Enter Key Submit
		document.addEventListener('keypress', function(e){
			if(e.keyCode === 13 || e.which === 13){
				e.preventDefault();
				return false;
			}
		})

		//Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
		
		//Update Item Event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		//Delete Item Event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		//Clear all Items Item Event
		document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItemsClick);
		
		//Back button Event
		document.querySelector(UISelectors.backBtn).addEventListener('click', function(e){
			e.preventDefault();
			UICtrl.clearEditState();
		});


	}

	//Add item submit
	const itemAddSubmit = function(e){
		e.preventDefault();
		//Get form input from UI Controller
		const input = UICtrl.getItemInput();

		//Check for name and calories input
		if(input.name !== '' && input.calories !== ''){
			
			//Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			
			//Add item to UI list
			UICtrl.addListItem(newItem);

			//Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//Add total calories to the UI
			UICtrl.showTotalCalories(totalCalories); 

			//Store in localStorage
			StorageCtrl.storeItem(newItem);

			//Clear input fields
			UICtrl.clearInput();
		}

	}
	//Click Edit Item
	const itemEditClick = function(e){
		e.preventDefault();
		if(e.target.classList.contains('fa-pencil')){
			//Get list item id
			const listId = e.target.parentElement.parentElement.id;
			
			//Break into an array
			const listIdArray = listId.split('-');
			const id = parseInt(listIdArray[1]);

			//Get item
			const itemToEdit = ItemCtrl.getItemById(id);

			// Set current Item
			ItemCtrl.setCurrentItem(itemToEdit);

			//Add item to form
			UICtrl.addItemToForm();
		}
	}

	//Update and Submit Edited ITem
	const itemUpdateSubmit = function(e){
		e.preventDefault();
		//get item unput
		const input = UICtrl.getItemInput();

		//Update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		// Update UI
		UICtrl.updateListItem(updatedItem);

		//Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories); 

		//UpdateLocalStorage
		StorageCtrl.updateItemStorage(updatedItem);
		
		UICtrl.clearEditState();
	}

	//Delete button
	const itemDeleteSubmit = function(e){
		e.preventDefault();

		//Get id of current item
		const currentItem = ItemCtrl.getCurrentItem();

		//Delete from data
		ItemCtrl.deleteItem(currentItem.id);

		//Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		//Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories); 

		//Delete from local Storage
		StorageCtrl.deleteItemFromStorage(currentItem.id);
		
		UICtrl.clearEditState();

	}

	//Clear all button
	const clearAllItemsClick = function(e){
		e.preventDefault();
		//delete all items from data structure
		ItemCtrl.clearAllItems();

		//Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories); 

		//remove from UI
		UICtrl.removeItems();

		//Clear Items from storage
		StorageCtrl.clearStorage();

		//Hide Ul
		UICtrl.hideList();
	}

	//Public methods
	return{
		init:function(){
			//Clear edit state
			UICtrl.clearEditState();

			//fetch items from item controller
			const items = ItemCtrl.getItems();

			//Check if any items
			if(items.length === 0){
				UICtrl.hideList();
			} else{
				//populate list with items
				UICtrl.populateItemList(items);
			}

			//Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//Add total calories to the UI
			UICtrl.showTotalCalories(totalCalories); 

			//Load Event Listeners
			loadEventListeners();
		}
	}
	
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
AppCtrl.init();
