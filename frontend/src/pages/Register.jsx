import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      alert('✅ Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        const firstError = Object.values(errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Create Account</h2>
        <p style={styles.sub}>Join ShopKart today</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>I am a</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={styles.input}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            style={styles.btn}
            disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F4F6F7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1A5276',
    marginBottom: '8px',
    textAlign: 'center',
  },
  sub: {
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: '28px',
  },
  error: {
    background: '#FADBD8',
    color: '#E74C3C',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '0.9rem',
  },
  group: { marginBottom: '20px' },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #D5D8DC',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: '#1A5276',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#7F8C8D',
    fontSize: '0.9rem',
  },
  link: { color: '#1A5276', fontWeight: 'bold' },
};