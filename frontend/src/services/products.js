import axios from 'axios';
import { authHeaders } from './auth';

const API = 'http://127.0.0.1:8000/api';

export const getProducts = (params) => 
  axios.get(`${API}/products/`, { params });

export const getProduct = (id) => 
  axios.get(`${API}/products/${id}/`);

export const getCategories = () => 
  axios.get(`${API}/categories/`);

export const createProduct = (data) => 
  axios.post(`${API}/products/`, data, authHeaders());

export const updateProduct = (id, data) => 
  axios.put(`${API}/products/${id}/`, data, authHeaders());

export const deleteProduct = (id) => 
  axios.delete(`${API}/products/${id}/`, authHeaders());