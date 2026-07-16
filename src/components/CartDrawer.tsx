'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, Zap, X } from 'lucide-react';

export default function CartDrawer() {
  const { cart, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart');
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Handle ESC key to close drawer (Emil Kowalski accessibility & UX pattern)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Por favor complete todos los datos.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({ productId: i.id, quantity: i.quantity })),
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Error al iniciar pago.');
      }

      // Redirigir a Webpay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.url;

      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = data.token;

      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      alert(`Error en el pago: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Mi Carro de Compras ({cartCount})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '4rem 0', color: 'var(--text-muted)' }}>
            <ShoppingCart size={40} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p style={{ fontWeight: 700 }}>El carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {checkoutStep === 'cart' ? (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    {item.imageUrl ? (
                      <img className="cart-item-img" src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="cart-item-img" style={{ background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={14} style={{ color: 'var(--primary)' }} />
                      </div>
                    )}
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-price">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                      <div className="cart-item-qty">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus size={10} />
                        </button>
                        <span style={{ fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus size={10} />
                        </button>
                        <button className="remove-item-btn" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }} onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={12} /> Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <form onSubmit={handleCheckout}>
                  <div className="form-group">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      className="form-input"
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="juan@soteel.cl"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teléfono de Contacto</label>
                    <input
                      className="form-input"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+56912345678"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" className="checkout-btn" style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--secondary)' }} onClick={() => setCheckoutStep('cart')}>Volver</button>
                    <button type="submit" className="checkout-btn" disabled={loading}>
                      {loading ? 'Redirigiendo...' : 'Pagar con Webpay'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {checkoutStep === 'cart' && (
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total:</span>
                  <span>${cartTotal.toLocaleString('es-CL')}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => setCheckoutStep('form')}
                >
                  Continuar a Checkout
                </button>
                <button
                  type="button"
                  className="continue-shopping-btn"
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    marginTop: '0.75rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
