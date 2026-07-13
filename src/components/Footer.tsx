import { Youtube, Zap, ShoppingCart, Phone, Mail, MapPin, Clock, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* YouTube Section */}
      <section className="instagram-section">
        <div className="instagram-container">
          <div className="instagram-header">
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="instagram-title">
              <Youtube size={20} style={{ color: '#ff0000' }} /> Síguenos en RRSS
            </a>
          </div>
          <div className="instagram-grid">
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="instagram-post">
              <Zap size={28} style={{ color: 'var(--primary)' }} />
              <div className="instagram-post-overlay">
                <span>Materiales Eléctricos</span>
              </div>
            </a>
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="instagram-post">
              <ShoppingCart size={28} style={{ color: 'var(--primary)' }} />
              <div className="instagram-post-overlay">
                <span>Envíos Rápidos</span>
              </div>
            </a>
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="instagram-post">
              <Zap size={28} style={{ color: 'var(--primary)' }} />
              <div className="instagram-post-overlay">
                <span>Instalaciones de Control</span>
              </div>
            </a>
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="instagram-post">
              <Zap size={28} style={{ color: 'var(--primary)' }} />
              <div className="instagram-post-overlay">
                <span>Asistencia Técnica</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Premium Footer */}
      <footer className="footer-premium">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Column 1: Brand Info */}
            <div className="footer-column brand-col">
              <Link href="/" className="logo-wrapper" style={{ textDecoration: 'none', display: 'block', width: 'fit-content' }}>
                <div className="logo-main" style={{ justifyContent: 'flex-start' }}>
                  <span>S</span>
                  <span className="logo-o-bolt"><Zap className="logo-zap-icon" /></span>
                  <span>T</span>
                  <span>E</span>
                  <span>E</span>
                  <span>L</span>
                </div>
                <div className="logo-sub">
                  SOLUCIONES EN ELECTRICIDAD
                </div>
              </Link>
              <p className="brand-text">
                Líderes en insumos eléctricos de alta gama, torres pop-up motorizadas, transferencias automáticas y soluciones solares. Calidad certificada para proyectos residenciales y corporativos.
              </p>
              <div className="footer-social-row">
                <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-column">
              <h3>Navegación</h3>
              <ul className="footer-links">
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/productos">Catálogo de Productos</Link></li>
                <li><Link href="/nosotros">Quiénes Somos</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="footer-column">
              <h3>Contacto</h3>
              <ul className="footer-contact-list">
                <li>
                  <MapPin size={16} className="contact-icon" />
                  <span>Santiago, Chile</span>
                </li>
                <li>
                  <Phone size={16} className="contact-icon" />
                  <a href="tel:+56912345678">+56 9 1234 5678</a>
                </li>
                <li>
                  <Mail size={16} className="contact-icon" />
                  <a href="mailto:contacto@soteel.cl">contacto@soteel.cl</a>
                </li>
                <li>
                  <Clock size={16} className="contact-icon" />
                  <span>Lun - Vie: 9:00 - 18:00 hrs</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Secure Payment */}
            <div className="footer-column">
              <h3>Pagos y Garantías</h3>
              <div className="payment-security-box">
                <div className="security-badge">
                  <ShieldCheck size={20} className="badge-icon-primary" />
                  <div>
                    <h4>Transbank Webpay Plus</h4>
                    <p>Pago seguro cifrado SSL de 256 bits</p>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="payment-chip">Webpay</span>
                  <span className="payment-chip">Visa</span>
                  <span className="payment-chip">Mastercard</span>
                  <span className="payment-chip">Débito</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="footer-bottom-bar">
            <div className="bottom-inner">
              <p className="copyright-text">
                © {new Date().getFullYear()} <strong>SOTEEL SpA</strong>. Todos los derechos reservados.
              </p>
              <p className="footer-meta-text">
                Precios expresados en Pesos Chilenos (CLP) con IVA incluido. Despachos rápidos a todo el territorio nacional.
              </p>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
