'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, DollarSign, TrendingUp, AlertCircle, Save, CheckCircle, RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  category?: { name: string } | null;
  slug: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  
  // Edited values state
  const [editedPrices, setEditedPrices] = useState<{ [id: string]: number }>({});
  const [editedStocks, setEditedStocks] = useState<{ [id: string]: number }>({});
  
  // Filters
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePriceChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setEditedPrices(prev => ({ ...prev, [id]: num }));
  };

  const handleStockChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setEditedStocks(prev => ({ ...prev, [id]: num }));
  };

  const handleSave = async (id: string) => {
    const currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;

    const newPrice = editedPrices[id] !== undefined ? editedPrices[id] : currentProduct.price;
    const newStock = editedStocks[id] !== undefined ? editedStocks[id] : currentProduct.stock;

    setSavingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice, stock: newStock })
      });

      if (res.ok) {
        setSuccessId(id);
        // Refresh product list locally
        setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice, stock: newStock } : p));
        setTimeout(() => setSuccessId(null), 3000);
      } else {
        alert('Error al guardar cambios.');
      }
    } catch (e) {
      alert('Error de red.');
    } finally {
      setSavingId(null);
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const averagePrice = totalProducts > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / totalProducts) : 0;

  // Filtered list
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category?.name && p.category.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Header />
      
      <main className="container" style={{ padding: '3.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 850, color: 'var(--secondary)', margin: 0 }}>Panel de Administración</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Gestión de inventarios, precios y stock del catálogo Soteel</p>
          </div>
          <button 
            onClick={fetchProducts} 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Actualizar Lista
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="stat-card" style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(227, 82, 5, 0.08)', color: 'var(--primary)', borderRadius: '50%' }}><Package size={24} /></div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Productos en Catálogo</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--secondary)', margin: '0.2rem 0 0' }}>{totalProducts}</h3>
            </div>
          </div>

          <div className="stat-card" style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', borderRadius: '50%' }}><AlertCircle size={24} /></div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Productos sin Stock</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--secondary)', margin: '0.2rem 0 0' }}>{outOfStock}</h3>
            </div>
          </div>

          <div className="stat-card" style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--success)', borderRadius: '50%' }}><DollarSign size={24} /></div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Valorización de Inventario</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--secondary)', margin: '0.2rem 0 0' }}>${totalValuation.toLocaleString('es-CL')}</h3>
            </div>
          </div>

          <div className="stat-card" style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(99, 102, 241, 0.08)', color: '#6366f1', borderRadius: '50%' }}><TrendingUp size={24} /></div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Precio Promedio</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--secondary)', margin: '0.2rem 0 0' }}>${averagePrice.toLocaleString('es-CL')}</h3>
            </div>
          </div>
        </div>

        {/* Filter and Table Card */}
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Buscar producto por nombre o categoría..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              style={{ width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.85rem' }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div className="loading-spinner" style={{ border: '3px solid rgba(255, 115, 0, 0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', width: '35px', height: '35px', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Cargando catálogo...</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--secondary)', fontWeight: 800 }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Imagen</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Nombre</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Categoría</th>
                    <th style={{ padding: '1rem 0.5rem', width: '150px' }}>Precio ($)</th>
                    <th style={{ padding: '1rem 0.5rem', width: '120px' }}>Stock</th>
                    <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '140px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => {
                    const hasPriceChange = editedPrices[p.id] !== undefined && editedPrices[p.id] !== p.price;
                    const hasStockChange = editedStocks[p.id] !== undefined && editedStocks[p.id] !== p.stock;
                    const isChanged = hasPriceChange || hasStockChange;

                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', verticalAlign: 'middle', transition: 'background-color 0.2s' }} className="admin-tr-hover">
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=64&q=80'} 
                            alt={p.name} 
                            style={{ width: '45px', height: '45px', objectFit: 'contain', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.1rem', backgroundColor: 'white' }}
                          />
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--secondary)', maxWidth: '300px' }}>
                          {p.name}
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                          {p.category?.name || 'General'}
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <input 
                            type="number" 
                            className="admin-input-edit"
                            value={editedPrices[p.id] !== undefined ? editedPrices[p.id] : p.price} 
                            onChange={e => handlePriceChange(p.id, e.target.value)}
                            style={{ width: '110px', padding: '0.4rem 0.6rem', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}
                          />
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <input 
                            type="number" 
                            className="admin-input-edit"
                            value={editedStocks[p.id] !== undefined ? editedStocks[p.id] : p.stock} 
                            onChange={e => handleStockChange(p.id, e.target.value)}
                            style={{ width: '80px', padding: '0.4rem 0.6rem', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}
                          />
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Link href={`/productos/${p.slug}`} target="_blank" className="btn-secondary" style={{ padding: '0.4rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Ver Producto">
                              <Eye size={14} />
                            </Link>
                            
                            <button
                              disabled={!isChanged || savingId === p.id}
                              onClick={() => handleSave(p.id)}
                              className="btn-primary"
                              style={{ 
                                padding: '0.4rem 0.75rem', 
                                borderRadius: '4px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.3rem', 
                                fontSize: '0.75rem',
                                opacity: isChanged ? 1 : 0.4,
                                cursor: isChanged ? 'pointer' : 'default',
                                backgroundColor: successId === p.id ? 'var(--success)' : (isChanged ? 'var(--primary)' : 'var(--border)'),
                                border: 'none',
                                color: 'white'
                              }}
                            >
                              {successId === p.id ? (
                                <><CheckCircle size={12} /> Listo</>
                              ) : savingId === p.id ? (
                                '...'
                              ) : (
                                <><Save size={12} /> Guardar</>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
