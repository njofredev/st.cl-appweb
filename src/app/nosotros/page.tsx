'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Shield, Zap, UserCheck, Star } from 'lucide-react';

export default function Nosotros() {
  return (
    <>
      <Header />

      <main className="container" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Sobre Nosotros
        </h1>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2.5rem', textAlign: 'center' }}>
          <strong>SOTEEL SPA</strong> (Soluciones Técnicas en Electricidad) es una empresa chilena especializada en el abastecimiento y la distribución de conductores, protecciones, iluminación e insumos eléctricos industriales y domiciliarios de alta gama.
        </p>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} style={{ color: 'var(--primary)' }} /> Nuestra Misión
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Proveer suministros eléctricos con un estándar superior de calidad y asesoría técnica especializada, ayudando a ingenieros, instaladores y constructoras a materializar sus proyectos con eficiencia y total seguridad.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={18} style={{ color: 'var(--primary)' }} /> Nuestra Visión
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Convertirnos en el aliado estratégico digital número uno de insumos eléctricos en Chile, destacando por un catálogo integral en línea, envíos ultrarrápidos y pasarelas de pago 100% integradas y seguras.
            </p>
          </div>
        </section>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '2rem', textAlign: 'center' }}>
          Nuestros Pilares Fundamentales
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: 'rgba(227, 82, 5, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
              <Shield size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--secondary)' }}>Garantía y Seguridad</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Todos nuestros artículos cuentan con certificación SEC y cumplen rigurosamente con la normativa eléctrica chilena vigente.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: 'rgba(227, 82, 5, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
              <UserCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--secondary)' }}>Soporte Técnico de Expertos</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Te asistimos y orientamos en la elección de cables de media tensión, protecciones modulares o dimensionamiento solar.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
