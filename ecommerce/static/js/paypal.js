paypal.Buttons({
	style: {
		color: 'gold',
		shape: 'rect',
	},

	createOrder: function (data, actions) {
		return actions.order.create({
			purchase_units: [{
				amount: {
					value: parseFloat(TOTAL).toFixed(2)
				}
			}]
		});
	},

	onApprove: function (data, actions) {
		return actions.order.capture().then(function (details) {
			submitFormData()
			alert('Transaction completed by ' + details.payer.name.given_name + '!');
		});
	}
}).render('#paypal-button-container');

