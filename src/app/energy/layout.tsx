'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function EnergyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const inlineStyles = `
    /* Reset & Base Brand Variables */
    :root {
      --energy-primary: #E35205; /* Soteel Brand Orange */
      --energy-primary-hover: #c44300;
      --energy-secondary: #0f172a; /* Navy Slate */
      --energy-bg-light: #ffffff; /* White background for Light Mode */
      --energy-border: rgba(15, 23, 42, 0.08); /* Dark subtle border for Light Mode */
      --energy-grid-color: rgba(15, 23, 42, 0.03); /* blueprint grid lines in Light Mode */
    }

    .energy-root {
      font-family: 'Outfit', sans-serif;
      color: #334155;
      background-color: var(--energy-bg-light);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      scroll-behavior: smooth;
    }

    /* Top Utility Bar (Light Corporate Style) */
    .energy-top-bar {
      background-color: #0f172a;
      color: #cbd5e1;
      font-size: 0.75rem;
      padding: 0.6rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .energy-top-bar-left, .energy-top-bar-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .top-bar-info-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.2s ease;
      color: #94a3b8;
    }

    .top-bar-info-item:hover {
      color: #ffffff;
    }

    /* Horizontal Sticky Header */
    .energy-header {
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--energy-border);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0.9rem 2rem;
      transition: all 0.3s ease;
    }

    .energy-header-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Logo Soteel Energy */
    .energy-logo-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.15rem;
      text-decoration: none;
    }

    .energy-logo-main {
      font-size: 1.6rem;
      font-weight: 900;
      color: var(--energy-secondary);
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      line-height: 1;
    }

    .energy-logo-o-bolt {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 0.85em;
      height: 0.85em;
      background-color: var(--energy-primary);
      border-radius: 50%;
      margin: 0 0.05em;
      vertical-align: middle;
    }

    .energy-logo-zap-icon {
      width: 55% !important;
      height: 55% !important;
      color: #ffffff !important;
      fill: #ffffff !important;
    }

    .energy-logo-sub {
      background-color: #f97316;
      color: #ffffff;
      font-size: 0.52rem;
      font-weight: 800;
      padding: 0.18rem 0.45rem;
      letter-spacing: 0.12em;
      border-radius: 3px;
      white-space: nowrap;
    }

    /* Horizontal Nav Menu (Desktop) */
    .energy-nav-horizontal {
      display: flex;
      align-items: center;
      gap: 2.25rem;
    }

    .energy-nav-item {
      color: #64748b;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: all 0.25s ease;
      position: relative;
    }

    .energy-nav-item span.nav-num {
      font-family: monospace;
      font-size: 0.7rem;
      color: #94a3b8;
      margin-right: 0.4rem;
    }

    .energy-nav-item::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -6px;
      left: 0;
      background-color: var(--energy-primary);
      transition: width 0.25s ease;
    }

    .energy-nav-item:hover {
      color: var(--energy-secondary);
    }

    .energy-nav-item:hover::after {
      width: 100%;
    }

    .energy-btn-quote-header {
      background-color: var(--energy-primary);
      color: white;
      text-decoration: none;
      padding: 0.65rem 1.35rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      box-shadow: 0 4px 12px rgba(227, 82, 5, 0.12);
    }

    .energy-btn-quote-header:hover {
      background-color: var(--energy-primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(227, 82, 5, 0.22);
    }

    .energy-btn-quote-header:active {
      transform: translateY(0);
    }

    /* Mobile Menu Toggle Button */
    .energy-mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      color: var(--energy-secondary);
      cursor: pointer;
    }

    @media (max-width: 992px) {
      .energy-nav-horizontal, .energy-btn-quote-header {
        display: none;
      }
      .energy-mobile-toggle {
        display: block;
      }
    }

    /* Mobile Drawer */
    .energy-mobile-drawer {
      position: fixed;
      top: 4.8rem;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      z-index: 999;
      display: flex;
      flex-direction: column;
      padding: 2.5rem;
      gap: 1.5rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      animation: slideDown 0.3s ease forwards;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .energy-mobile-item {
      color: #64748b;
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 700;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f1f5f9;
    }

    .energy-mobile-item:hover {
      color: var(--energy-secondary);
      border-bottom-color: var(--energy-primary);
    }

    /* Main Area Blueprint */
    .energy-main-wrapper {
      flex: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--energy-bg-light);
      background-image: 
        linear-gradient(to right, var(--energy-grid-color) 1px, transparent 1px),
        linear-gradient(to bottom, var(--energy-grid-color) 1px, transparent 1px);
      background-size: 40px 40px;
      box-sizing: border-box;
    }

    /* Scrolling Footer Soteel Energy (aligned inside scrolling section) */
    .energy-footer-scrolling {
      border-top: 1px solid var(--energy-border);
      padding: 4rem 3rem;
      background-color: #0f172a; /* keep dark contrast footer for premium look */
      color: #94a3b8;
    }

    .footer-scrolling-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .footer-scrolling-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .footer-scrolling-col h4 {
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 1.25rem 0;
    }

    .footer-scrolling-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-scrolling-links a {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-scrolling-links a:hover {
      color: var(--energy-primary);
      padding-left: 4px;
    }

    .footer-scrolling-bottom {
      max-width: 1200px;
      margin: 3rem auto 0 auto;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.75rem;
      color: #475569;
    }
  `;

  return (
    <div className="energy-root">
      {/* Native Flat CSS Injected */}
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

      {/* Utility top bar */}
      <div className="energy-top-bar">
        <div className="energy-top-bar-left">
          <span className="top-bar-info-item">
            <MapPin size={12} style={{ color: 'var(--energy-primary)' }} /> Dominica 552, Recoleta, Santiago
          </span>
          <span className="top-bar-info-item">
            <Mail size={12} style={{ color: 'var(--energy-primary)' }} /> contacto@soteel.cl
          </span>
        </div>
        <div className="energy-top-bar-right">
          <a href="tel:+56921984990" className="top-bar-info-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Phone size={12} style={{ color: 'var(--energy-primary)' }} /> (+56) 9 2198 4990
          </a>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
          <Link href="/" className="top-bar-info-item" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            Ir a E-Commerce ➔
          </Link>
        </div>
      </div>

      {/* Sticky Horizontal Header */}
      <header className="energy-header">
        <div className="energy-header-container">
          <Link href="/energy" className="energy-logo-wrapper">
            <div className="energy-logo-main">
              <span>S</span>
              <span className="energy-logo-o-bolt"><Zap className="energy-logo-zap-icon" /></span>
              <span>T</span>
              <span>E</span>
              <span>E</span>
              <span>L</span>
            </div>
            <div className="energy-logo-sub">
              ENERGY & INGENIERÍA
            </div>
          </Link>

          {/* Desktop Nav Horizontal */}
          <nav className="energy-nav-horizontal">
            <a href="#inicio" className="energy-nav-item">
              <span className="nav-num">01.</span>Inicio
            </a>
            <a href="#servicios" className="energy-nav-item">
              <span className="nav-num">02.</span>Servicios
            </a>
            <a href="#sec" className="energy-nav-item">
              <span className="nav-num">03.</span>Certificaciones SEC
            </a>
            <a href="#proyectos" className="energy-nav-item">
              <span className="nav-num">04.</span>Proyectos
            </a>
            <a href="#nosotros" className="energy-nav-item">
              <span className="nav-num">05.</span>Nosotros
            </a>
          </nav>

          <a href="#contacto" className="energy-btn-quote-header">
            Cotizar Proyecto ➔
          </a>

          {/* Mobile menu toggle */}
          <button 
            className="energy-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="energy-mobile-drawer" onClick={() => setIsMobileMenuOpen(false)}>
          <a href="#inicio" className="energy-mobile-item">01. Inicio</a>
          <a href="#servicios" className="energy-mobile-item">02. Servicios</a>
          <a href="#sec" className="energy-mobile-item">03. Certificaciones SEC</a>
          <a href="#proyectos" className="energy-mobile-item">04. Proyectos</a>
          <a href="#nosotros" className="energy-mobile-item">05. Nosotros</a>
          <a href="#contacto" className="energy-btn-quote-header" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>Cotizar Proyecto ➔</a>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      <div className="energy-main-wrapper">
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer */}
        <footer className="energy-footer-scrolling">
          <div className="footer-scrolling-container">
            <div className="footer-scrolling-col">
              <h4 style={{ color: '#ffffff' }}>Soteel Energy</h4>
              <p style={{ lineHeight: '1.6', margin: 0 }}>
                División de ingeniería de SOTEEL SpA. Especialistas en montajes de fuerza y alumbrado, soluciones Netbilling, electromovilidad y acreditaciones SEC.
              </p>
            </div>

            <div className="footer-scrolling-col">
              <h4>Servicios Industriales</h4>
              <ul className="footer-scrolling-links">
                <li><a href="#servicios">Ingeniería & Consultoría</a></li>
                <li><a href="#servicios">Construcción & Montaje</a></li>
                <li><a href="#servicios">Normalización e ITO</a></li>
                <li><a href="#servicios">Plantas Solares Netbilling</a></li>
                <li><a href="#servicios">Cargadores de Vehículos Eléctricos</a></li>
              </ul>
            </div>

            <div className="footer-scrolling-col">
              <h4>Contacto</h4>
              <p style={{ margin: '0 0 0.5rem 0' }}>Dominica 552, Recoleta, Santiago.</p>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#ffffff' }}>contacto@soteel.cl</p>
              <p style={{ margin: 0 }}>+56 9 2198 4990</p>
            </div>
          </div>

          <div className="footer-scrolling-bottom">
            <p>© 2026 Soteel SpA. Todos los derechos reservados.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/" style={{ color: '#475569', textDecoration: 'none' }}>Ir a E-Commerce</Link>
              <Link href="/cotizador" style={{ color: '#475569', textDecoration: 'none' }}>Cotizador de Materiales</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
