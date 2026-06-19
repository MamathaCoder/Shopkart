import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log('Error fetching categories');
    }
  };

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      console.log('Error fetching products');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts({ search, category: selectedCategory });
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    fetchProducts({ search, category: slug });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    fetchProducts();
  };

  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🛒 Welcome to ShopKart</h1>
        <p style={styles.heroSub}>Find the best products at the best prices</p>

        {/* SEARCH */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
          <button type="button" onClick={handleReset} style={styles.resetBtn}>Reset</button>
        </form>
      </div>

      {/* CATEGORIES */}
      <div style={styles.categories}>
        <button
          onClick={() => handleCategoryClick('')}
          style={selectedCategory === '' ? styles.catBtnActive : styles.catBtn}>
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            style={selectedCategory === cat.slug ? styles.catBtnActive : styles.catBtn}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={styles.container}>
        {loading ? (
          <div style={styles.loading}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={styles.empty}>No products found.</div>
        ) : (
          <div style={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: { background: '#F4F6F7', minHeight: '100vh' },
  hero: {
    background: 'linear-gradient(135deg, #1A5276, #117A65)',
    padding: '60px 24px',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' },
  heroSub: { fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 },
  searchForm: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
  searchInput: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    width: '320px',
    outline: 'none',
  },
  searchBtn: {
    padding: '12px 24px',
    background: '#27AE60',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  resetBtn: {
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  categories: {
    display: 'flex',
    gap: '10px',
    padding: '20px 24px',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  catBtn: {
    padding: '8px 20px',
    background: '#fff',
    border: '1px solid #D5D8DC',
    borderRadius: '99px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#2C3E50',
  },
  catBtnActive: {
    padding: '8px 20px',
    background: '#1A5276',
    border: '1px solid #1A5276',
    borderRadius: '99px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#fff',
    fontWeight: 'bold',
  },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px 40px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.1rem', color: '#7F8C8D' },
  empty: { textAlign: 'center', padding: '60px', fontSize: '1.1rem', color: '#7F8C8D' },
};