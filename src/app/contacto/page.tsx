'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      alert('Mensaje recibido. Un asesor comercial te contactará a la brevedad.');
    }, 1000);
  };

  return (
    <>
      <Header />

      <main className="container" style={{ padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '3rem', textAlign: 'center' }}>
          Contacto y Sucursales
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {/* Formulario de Contacto */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={20} style={{ color: 'var(--primary)' }} /> Envíanos tu requerimiento
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              ¿Necesitas una cotización por volumen o tienes alguna duda técnica? Completa el formulario y responderemos en menos de 2 horas.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Pedro Silva"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Correo de Contacto</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="pedro@constructora.cl"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+56912345678"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje / Lista de Materiales</label>
                <textarea 
                  className="form-input" 
                  rows={4} 
                  required 
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe el detalle de tu solicitud o los insumos que requieres..."
                />
              </div>

              <button type="submit" className="checkout-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Send size={16} /> Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Red de Sucursales */}
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} style={{ color: 'var(--primary)' }} /> Nuestras Casas Matrices
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Sucursal Santiago */}
              <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Santiago (Casa Central)</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <MapPin size={14} /> Av. Presidente Eduardo Frei Montalva 6120, Quilicura
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <Phone size={14} /> +56 2 2960 0001
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} /> Lunes a Viernes: 08:30 a 18:00 hrs
                </p>
              </div>

              {/* Sucursal Valparaíso */}
              <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Valparaíso</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <MapPin size={14} /> Av. España 1680, Valparaíso
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <Phone size={14} /> +56 32 2960 0002
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} /> Lunes a Viernes: 08:30 a 18:00 hrs
                </p>
              </div>

              {/* Sucursal Concepción */}
              <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Concepción</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <MapPin size={14} /> Av. Juan Bosco 1205, Concepción
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <Phone size={14} /> +56 41 2960 0003
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} /> Lunes a Viernes: 08:30 a 18:00 hrs
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
