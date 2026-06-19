import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/products';
import { addToCart } from '../services/cart';
import { isLoggedIn } from '../services/auth';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await getProduct(id);
      setProduct(res.data);
    } catch (err) {
      alert('Product not found.');
      navigate('/');
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      alert(`✅ ${product.name} added to cart!`);
    } catch (err) {
      alert('Failed to add to cart.');
    }
    setAdding(false);
  };

  if (loading) return <div style={styles.loading}>Loading product...</div>;
  if (!product) return null;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* BACK BUTTON */}
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Products
        </button>

        <div style={styles.layout}>

          {/* IMAGE */}
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

          {/* DETAILS */}
          <div style={styles.details}>
            <span style={styles.category}>{product.category_name}</span>
            <h1 style={styles.name}>{product.name}</h1>
            <p style={styles.price}>₹{Number(product.price).toLocaleString()}</p>

            <div style={styles.divider} />

            <p style={styles.descTitle}>Description</p>
            <p style={styles.desc}>{product.description}</p>

            <div style={styles.divider} />

            {/* STOCK */}
            <div style={styles.stockRow}>
              <span style={styles.stockLabel}>Availability:</span>
              {product.quantity > 0 ? (
                <span style={styles.inStock}>✅ In Stock ({product.quantity} available)</span>
              ) : (
                <span style={styles.outStock}>❌ Out of Stock</span>
              )}
            </div>

            {/* QUANTITY */}
            {product.quantity > 0 && (
              <div style={styles.qtyRow}>
                <span style={styles.stockLabel}>Quantity:</span>
                <div style={styles.qtyBox}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={styles.qtyBtn}>−</button>
                  <span style={styles.qty}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))}
                    style={styles.qtyBtn}>+</button>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div style={styles.btnGroup}>
              <button
                onClick={handleAddToCart}
                style={styles.cartBtn}
                disabled={adding || product.quantity === 0}>
                {adding ? 'Adding...' : '🛒 Add to Cart'}
              </button>
              <button
                onClick={() => navigate('/cart')}
                style={styles.viewCartBtn}>
                View Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#F4F6F7', minHeight: '100vh', padding: '32px 24px' },
  container: { maxWidth: '1000px', margin: '0 auto' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.1rem', color: '#7F8C8D' },
  backBtn: {
    background: 'none', border: 'none',
    color: '#1A5276', cursor: 'pointer',
    fontSize: '0.95rem', marginBottom: '24px',
    padding: '0', fontWeight: 'bold',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  imageBox: {
    background: '#EBF5FB',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  noImage: { fontSize: '6rem' },
  details: { display: 'flex', flexDirection: 'column' },
  category: {
    fontSize: '0.8rem', color: '#1A5276',
    fontWeight: 'bold', textTransform: 'uppercase',
    letterSpacing: '0.05em', marginBottom: '8px',
  },
  name: { fontSize: '1.8rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '12px' },
  price: { fontSize: '2rem', fontWeight: 'bold', color: '#27AE60', marginBottom: '16px' },
  divider: { borderTop: '1px solid #EBF5FB', margin: '16px 0' },
  descTitle: { fontSize: '0.9rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '8px' },
  desc: { fontSize: '0.95rem', color: '#7F8C8D', lineHeight: '1.6', marginBottom: '16px' },
  stockRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  stockLabel: { fontSize: '0.9rem', fontWeight: 'bold', color: '#2C3E50' },
  inStock: { fontSize: '0.9rem', color: '#27AE60' },
  outStock: { fontSize: '0.9rem', color: '#E74C3C' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' },
  qtyBox: { display: 'flex', alignItems: 'center', gap: '12px' },
  qtyBtn: {
    width: '32px', height: '32px',
    background: '#EBF5FB', border: '1px solid #D5D8DC',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '1.1rem', fontWeight: 'bold',
  },
  qty: { fontSize: '1.1rem', fontWeight: 'bold', minWidth: '32px', textAlign: 'center' },
  btnGroup: { display: 'flex', gap: '12px' },
  cartBtn: {
    flex: 1, padding: '14px',
    background: '#27AE60', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '1rem', fontWeight: 'bold',
    cursor: 'pointer',
  },
  viewCartBtn: {
    flex: 1, padding: '14px',
    background: '#1A5276', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '1rem', fontWeight: 'bold',
    cursor: 'pointer',
  },
};