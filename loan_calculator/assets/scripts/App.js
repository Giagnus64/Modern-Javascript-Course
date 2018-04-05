const loanForm = document.querySelector('#loan-form');


//Listen for Submit
loanForm.addEventListener('submit', function(e){
	e.preventDefault();
	//Hide Results
	document.querySelector('#results').style.display = 'none';

	//Show Loader
	document.querySelector('#loading').style.display = 'block';

	setTimeout(calculateResults, 2000);
});

//Func Definition
function calculateResults(e){


	//UI vars
	const amount = document.querySelector('#amount');
	const interest = document.querySelector('#interest');
	const years = document.querySelector('#years');
	const monthlyPayment = document.querySelector('#monthly-payment');
	const totalPayment = document.querySelector('#total-payment');
	const totalInterest = document.querySelector('#total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value)/ 100/ 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	//Compute Monthly Payments
	const x = Math.pow( 1+ calculatedInterest, calculatedPayments);
	const monthly = (principal*x*calculatedInterest)/(x-1);
	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

		//Hide/Show elements
		document.querySelector('#loading').style.display = 'none';
		document.querySelector('#results').style.display = 'block';	
	} else{
		showError('Please enter valid numbers.');
		//Hide Elements
		document.querySelector('#loading').style.display = 'none';
		document.querySelector('#results').style.display = 'none';

	}

}

//Func Definition
function showError(error){
	//UI Vars
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//Create Div
	const errorDiv = document.createElement('div');

	//Add Class
	errorDiv.className='alert alert-danger';

	//Create text node and append
	errorDiv.appendChild(document.createTextNode(error));

	//Insert Error
	card.insertBefore(errorDiv, heading);

	//Clear error
	setTimeout(clearError, 3000);

}

//Func Definition
function clearError(){
	document.querySelector('.alert').remove();
}