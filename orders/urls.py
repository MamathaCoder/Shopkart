from django.urls import path
from .views import (
    PlaceOrderView,
    MyOrdersView,
    OrderDetailView,
    UpdateOrderStatusView
)

urlpatterns = [
    path('orders/place/', PlaceOrderView.as_view()),
    path('orders/', MyOrdersView.as_view()),
    path('orders/<int:pk>/', OrderDetailView.as_view()),
    path('orders/<int:pk>/status/', UpdateOrderStatusView.as_view()),
]