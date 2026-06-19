import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../services/cart';
import { placeOrder } from '../services/orders';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      navigate('/login');
    }
    setLoading(false);
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity);
      fetchCart();
    } catch (err) {
      alert('Failed to update quantity.');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCart();
    } catch (err) {
      alert('Failed to remove item.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('Please enter your shipping address.');
      return;
    }
    setOrdering(true);
    try {
      await placeOrder(address);
      alert('🎉 Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert('Failed to place order. Please try again.');
    }
    setOrdering(false);
  };

  if (loading) return <div style={styles.loading}>Loading cart...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🛒 My Cart</h2>

        {!cart || cart.items.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '3rem' }}>🛒</p>
            <p>Your cart is empty!</p>
            <button onClick={() => navigate('/')} style={styles.shopBtn}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={styles.layout}>

            {/* CART ITEMS */}
            <div style={styles.itemsBox}>
              {cart.items.map(item => (
                <div key={item.id} style={styles.item}>
                  <div style={styles.itemImage}>📦</div>
                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemName}>{item.product.name}</h3>
                    <p style={styles.itemCategory}>{item.product.category_name}</p>
                    <p style={styles.itemPrice}>
                      ₹{Number(item.product.price).toLocaleString()} each
                    </p>
                  </div>
                  <div style={styles.itemActions}>
                    <div style={styles.qtyBox}>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        style={styles.qtyBtn}>−</button>
                      <span style={styles.qty}>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        style={styles.qtyBtn}>+</button>
                    </div>
                    <p style={styles.subtotal}>
                      ₹{Number(item.subtotal).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={styles.removeBtn}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={styles.summary}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryRow}>
                <span>Items ({cart.items.length})</span>
                <span>₹{Number(cart.total).toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <span style={{ color: '#27AE60' }}>FREE</span>
              </div>
              <div style={styles.divider} />
              <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '1.1rem' }}>
                <span>Total</span>
                <span>₹{Number(cart.total).toLocaleString()}</span>
              </div>

              <div style={styles.addressBox}>
                <label style={styles.addressLabel}>Shipping Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address..."
                  style={styles.textarea}
                  rows={3}
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                style={styles.orderBtn}
                disabled={ordering}>
                {ordering ? 'Placing Order...' : '🚀 Place Order'}
              </button>

              <button
                onClick={() => navigate('/')}
                style={styles.continueBtn}>
                Continue Shopping
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#F4F6F7', minHeight: '100vh', padding: '32px 24px' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: 'bold', color: '#1A5276', marginBottom: '24px' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.1rem', color: '#7F8C8D' },
  empty: { textAlign: 'center', padding: '60px', color: '#7F8C8D' },
  shopBtn: {
    marginTop: '16px', padding: '12px 28px',
    background: '#1A5276', color: '#fff',
    border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '1rem',
  },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' },
  itemsBox: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: {
    background: '#fff', borderRadius: '12px',
    padding: '20px', display: 'flex',
    gap: '16px', alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  itemImage: { fontSize: '2.5rem', minWidth: '60px', textAlign: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: '1rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '4px' },
  itemCategory: { fontSize: '0.8rem', color: '#1A5276', marginBottom: '4px' },
  itemPrice: { fontSize: '0.9rem', color: '#7F8C8D' },
  itemActions: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  qtyBox: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: {
    width: '28px', height: '28px',
    background: '#EBF5FB', border: '1px solid #D5D8DC',
    borderRadius: '6px', cursor: 'pointer',
    fontSize: '1rem', fontWeight: 'bold',
  },
  qty: { fontSize: '1rem', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' },
  subtotal: { fontSize: '1rem', fontWeight: 'bold', color: '#27AE60' },
  removeBtn: {
    background: 'none', border: 'none',
    color: '#E74C3C', cursor: 'pointer',
    fontSize: '0.85rem',
  },
  summary: {
    background: '#fff', borderRadius: '12px',
    padding: '24px', height: 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  summaryTitle: { fontSize: '1.2rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '16px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' },
  divider: { borderTop: '1px solid #D5D8DC', margin: '12px 0' },
  addressBox: { marginTop: '20px', marginBottom: '16px' },
  addressLabel: { display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '8px' },
  textarea: {
    width: '100%', padding: '10px',
    border: '1px solid #D5D8DC', borderRadius: '8px',
    fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box', resize: 'vertical',
  },
  orderBtn: {
    width: '100%', padding: '14px',
    background: '#27AE60', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '1rem', fontWeight: 'bold',
    cursor: 'pointer', marginBottom: '10px',
  },
  continueBtn: {
    width: '100%', padding: '12px',
    background: '#EBF5FB', color: '#1A5276',
    border: '1px solid #D5D8DC', borderRadius: '8px',
    fontSize: '0.95rem', cursor: 'pointer',
  },
};