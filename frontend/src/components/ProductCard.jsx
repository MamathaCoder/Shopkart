import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/cart';
import { isLoggedIn } from '../services/auth';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(product.id, 1);
      alert(`✅ ${product.name} added to cart!`);
    } catch (err) {
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageBox}>
        {product.image ? (
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            style={styles.image}
          />
        ) : (
          <div style={styles.noImage}>📦</div>
        )}
      </div>
      <div style={styles.body}>
        <div style={styles.category}>{product.category_name}</div>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.desc}>
          {product.description.length > 80
            ? product.description.substring(0, 80) + '...'
            : product.description}
        </p>
        <div style={styles.footer}>
          <span style={styles.price}>₹{Number(product.price).toLocaleString()}</span>
          <div style={styles.btnGroup}>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              style={styles.viewBtn}>
              View
            </button>
            <button
              onClick={handleAddToCart}
              style={styles.cartBtn}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  imageBox: {
    height: '180px',
    background: '#EBF5FB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImage: {
    fontSize: '4rem',
  },
  body: {
    padding: '16px',
  },
  category: {
    fontSize: '0.75rem',
    color: '#1A5276',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '0.85rem',
    color: '#7F8C8D',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#27AE60',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
  },
  viewBtn: {
    background: '#1A5276',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  cartBtn: {
    background: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
};