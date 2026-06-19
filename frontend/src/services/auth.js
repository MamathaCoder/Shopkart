import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

export const register = (data) => axios.post(`${API}/auth/register/`, data);
export const login = (data) => axios.post(`${API}/auth/login/`, data);

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const logout = () => localStorage.removeItem('token');
export const isLoggedIn = () => !!localStorage.getItem('token');

export const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});