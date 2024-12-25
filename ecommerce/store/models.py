from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
	user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
	name = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200)

	def __str__(self):
		return self.name
	
	def __repr__(self):
		return f"Customer(name={self.name}, email={self.email})"
	
class Product(models.Model):
	name = models.CharField(max_length=200)
	price = models.FloatField()
	digital = models.BooleanField(default=False,null=True, blank=True)
	# image = models.ImageField(null=True, blank=True)

	def __str__(self):
		return self.name
	
	def __repr__(self):
		return f"Product(name={self.name}, price={self.price}, digital={self.digital})"

class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
	date_ordered = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField(default=False)
	transaction_id = models.CharField(max_length=100, null=True)

	def __str__(self):
		return str(self.id)
	
	def __repr__(self):
		return f"Order(customer={self.customer}, date_ordered={self.date_ordered}, complete={self.complete}, transaction_id={self.transaction_id})"

class OrderItem(models.Model):
	product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
	quantity = models.IntegerField(default=0, null=True, blank=True)
	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.product.name
	
	def __repr__(self):
		return f"OrderItem(product={self.product}, order={self.order}, quantity={self.quantity}, date_added={self.date_added})"
 
class ShippingModel(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
	address = models.CharField(max_length=200, null=False)
	city = models.CharField(max_length=200, null=False)
	state = models.CharField(max_length=200, null=False)
	zipcode = models.CharField(max_length=200, null=False)
	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.address

	def __repr__(self):
		return f"ShippingModel(customer={self.customer}, order={self.order}, address={self.address}, city={self.city}, state={self.state}, zipcode={self.zipcode}, date_added={self.date_added})"
