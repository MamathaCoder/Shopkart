import axios from 'axios';
import { authHeaders } from './auth';

const API = 'http://127.0.0.1:8000/api';

export const placeOrder = (shipping_address) =>
  axios.post(`${API}/orders/place/`, { shipping_address }, authHeaders());

export const getMyOrders = () =>
  axios.get(`${API}/orders/`, authHeaders());

export const getOrderDetail = (id) =>
  axios.get(`${API}/orders/${id}/`, authHeaders());

export const updateOrderStatus = (id, status) =>
  axios.put(`${API}/orders/${id}/status/`, { status }, authHeaders());