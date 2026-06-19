import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orders';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      navigate('/login');
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F39C12',
      processing: '#2980B9',
      shipped: '#8E44AD',
      delivered: '#27AE60',
      cancelled: '#E74C3C',
    };
    return colors[status] || '#7F8C8D';
  };

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>📦 My Orders</h2>

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '3rem' }}>📦</p>
            <p>You have no orders yet!</p>
            <button onClick={() => navigate('/')} style={styles.shopBtn}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.ordersList}>
            {orders.map(order => (
              <div key={order.id} style={styles.orderCard}>

                {/* ORDER HEADER */}
                <div style={styles.orderHeader}>
                  <div>
                    <span style={styles.orderId}>Order #{order.id}</span>
                    <span style={styles.orderDate}>
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatusColor(order.status),
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* ORDER ITEMS */}
                <div style={styles.itemsList}>
                  {order.items.map(item => (
                    <div key={item.id} style={styles.item}>
                      <span style={styles.itemEmoji}>📦</span>
                      <div style={styles.itemInfo}>
                        <span style={styles.itemName}>{item.product.name}</span>
                        <span style={styles.itemQty}>x{item.quantity}</span>
                      </div>
                      <span style={styles.itemPrice}>
                        ₹{Number(item.subtotal).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ORDER FOOTER */}
                <div style={styles.orderFooter}>
                  <div style={styles.address}>
                    <span style={styles.addressLabel}>📍 </span>
                    {order.shipping_address}
                  </div>
                  <div style={styles.total}>
                    Total: <strong>₹{Number(order.total_amount).toLocaleString()}</strong>
                  </div>
                </div>

                {/* STATUS TIMELINE */}
                <div style={styles.timeline}>
                  {['pending', 'processing', 'shipped', 'delivered'].map((step, index) => {
                    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
                    const currentIndex = statuses.indexOf(order.status);
                    const isActive = index <= currentIndex;
                    return (
                      <div key={step} style={styles.timelineStep}>
                        <div style={{
                          ...styles.timelineDot,
                          background: isActive ? '#27AE60' : '#D5D8DC',
                        }} />
                        <span style={{
                          ...styles.timelineLabel,
                          color: isActive ? '#27AE60' : '#BDC3C7',
                          fontWeight: isActive ? 'bold' : 'normal',
                        }}>
                          {step.charAt(0).toUpperCase() + step.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#F4F6F7', minHeight: '100vh', padding: '32px 24px' },
  container: { maxWidth: '900px', margin: '0 auto' },
  title: { fontSize: '1.8rem', fontWeight: 'bold', color: '#1A5276', marginBottom: '24px' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.1rem', color: '#7F8C8D' },
  empty: { textAlign: 'center', padding: '60px', color: '#7F8C8D' },
  shopBtn: {
    marginTop: '16px', padding: '12px 28px',
    background: '#1A5276', color: '#fff',
    border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '1rem',
  },
  ordersList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  orderCard: {
    background: '#fff', borderRadius: '12px',
    padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  orderHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  orderId: { fontSize: '1.1rem', fontWeight: 'bold', color: '#2C3E50', marginRight: '12px' },
  orderDate: { fontSize: '0.85rem', color: '#7F8C8D' },
  statusBadge: {
    padding: '4px 14px', borderRadius: '99px',
    color: '#fff', fontSize: '0.75rem', fontWeight: 'bold',
  },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' },
  item: {
    display: 'flex', alignItems: 'center',
    gap: '12px', padding: '10px',
    background: '#F8F9FA', borderRadius: '8px',
  },
  itemEmoji: { fontSize: '1.5rem' },
  itemInfo: { flex: 1, display: 'flex', gap: '8px', alignItems: 'center' },
  itemName: { fontSize: '0.95rem', fontWeight: '500', color: '#2C3E50' },
  itemQty: { fontSize: '0.85rem', color: '#7F8C8D' },
  itemPrice: { fontSize: '0.95rem', fontWeight: 'bold', color: '#27AE60' },
  orderFooter: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '12px 0',
    borderTop: '1px solid #EBF5FB',
    marginBottom: '16px',
  },
  address: { fontSize: '0.85rem', color: '#7F8C8D', maxWidth: '60%' },
  addressLabel: { color: '#E74C3C' },
  total: { fontSize: '1rem', color: '#2C3E50' },
  timeline: {
    display: 'flex', justifyContent: 'space-between',
    padding: '12px 0 0',
  },
  timelineStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  timelineDot: { width: '16px', height: '16px', borderRadius: '50%' },
  timelineLabel: { fontSize: '0.75rem' },
};