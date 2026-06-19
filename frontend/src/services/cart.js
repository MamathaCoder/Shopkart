import axios from 'axios';
import { authHeaders } from './auth';

const API = 'http://127.0.0.1:8000/api';

export const getCart = () =>
  axios.get(`${API}/cart/`, authHeaders());

export const addToCart = (product_id, quantity = 1) =>
  axios.post(`${API}/cart/`, { product_id, quantity }, authHeaders());

export const updateCartItem = (id, quantity) =>
  axios.put(`${API}/cart/item/${id}/`, { quantity }, authHeaders());

export const removeCartItem = (id) =>
  axios.delete(`${API}/cart/item/${id}/`, authHeaders());

export const clearCart = () =>
  axios.delete(`${API}/cart/clear/`, authHeaders());