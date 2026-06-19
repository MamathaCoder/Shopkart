from django.urls import path
from .views import CartView, CartItemView, ClearCartView

urlpatterns = [
    path('cart/', CartView.as_view()),
    path('cart/item/<int:pk>/', CartItemView.as_view()),
    path('cart/clear/', ClearCartView.as_view()),
]