if (SHIPPING_DATA == 'False') {
	document.getElementById('shipping-info').innerHTML = ''
}

if (user != 'AnonymousUser') {
	document.getElementById('user-info').innerHTML = ''
}

if (SHIPPING_DATA == 'False' && user != 'AnonymousUser') {
	document.getElementById('form-wrapper').classList.add('hidden')
	document.getElementById('payment-info').classList.remove('hidden')
}

var form = document.getElementById('form')

form.addEventListener('submit', function (e) {
	e.preventDefault()
	console.log('Form submitted')
	document.getElementById('form-button').classList.add('hidden')
	document.getElementById('payment-info').classList.remove('hidden')
})

document.getElementById('make-payment').addEventListener('click', function (e) {
	submitFormData()
})

function submitFormData() {
	console.log('Payment button clicked')

	var userFormData = {
		'name': null,
		'email': null,
		'total': TOTAL,
	}

	var shippingInfo = {
		'address': null,
		'city': null,
		'state': null,
		'zipcode': null,
	}

	if (SHIPPING_DATA != 'False') {
		shippingInfo.address = form.address.value
		shippingInfo.city = form.city.value
		shippingInfo.state = form.state.value
		shippingInfo.zipcode = form.zipcode.value
	}

	if (user == 'AnonymousUser') {
		userFormData.name = form.name.value
		userFormData.email = form.email.value
	}

	var url = '/process_order/'

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({
			'userFormData': userFormData,
			'shippingInfo': shippingInfo,
		})
	})

		.then((response) => {
			return response.json()
		})

		.then((data) => {
			console.log('Success: ', data)
			alert('Payment successful!')
			window.location.href = '/'
		})
}
