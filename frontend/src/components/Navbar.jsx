import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>🛒 ShopKart</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          {loggedIn ? (
            <>
              <Link to="/cart" style={styles.link}>Cart</Link>
              <Link to="/orders" style={styles.link}>My Orders</Link>
              <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.btnLink}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#1A5276',
    padding: '0 24px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  btn: {
    background: '#E74C3C',
    color: '#fff',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  btnLink: {
    background: '#27AE60',
    color: '#fff',
    textDecoration: 'none',
    padding: '6px 16px',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
};