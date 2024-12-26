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
		'state': TOTAL,
		'zipcode': TOTAL,
	}

	if (SHIPPING_DATA != 'False') {
		shippingInfo.address = form.address.value
		shippingInfo.city = form.city.value
		shippingInfo.state = form.state.value
		shippingInfo.zipcode = form.zipcode.value
	}

	if (user != 'AnonymousUser') {
		userFormData.name = form.address.name
		userFormData.email = form.address.email
	}
}
