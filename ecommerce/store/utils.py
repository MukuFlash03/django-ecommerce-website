import json
from .models import *

def cookieCart(request):
	try:
		cart = json.loads(request.COOKIES['cart'])
	except:
		cart = {}

	print('Cart:', cart)
	items = []
	order = {'get_cart_price_total': 0, 'get_cart_items_total': 0, 'shipping': False}
	cartItems = order['get_cart_items_total']

	for item in cart:
		try:
			cartItems += cart[item]['quantity']

			product = Product.objects.get(id=item)
			total = (product.price * cart[item]['quantity'])

			order['get_cart_price_total'] += total
			order['get_cart_items_total'] += cart[item]['quantity']

			item = {
				'product': {
					'id': product.id,
					'name': product.name,
					'price': product.price,
					'imageURL': product.imageURL,
				},
				'quantity': cart[item]['quantity'],
				'get_total': total,
			}
			items.append(item)

			if not product.digital:
				order['shipping'] = True
		except:
			pass
	
	return {'cartItems': cartItems, 'order': order, 'items': items}
