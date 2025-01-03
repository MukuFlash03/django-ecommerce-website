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

csrftoken = form.getElementsByTagName('input')[0].value
console.log("New CSRF token: ", form.getElementsByTagName('input')[0].value);


form.addEventListener('submit', function (e) {
	e.preventDefault()
	console.log('Form submitted')
	document.getElementById('form-button').classList.add('hidden')
	document.getElementById('payment-info').classList.remove('hidden')
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

			cart = {}
			document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

			window.location.href = '/'
		})
}
