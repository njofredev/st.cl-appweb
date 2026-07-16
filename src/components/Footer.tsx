import { Youtube, Zap, ShoppingCart, Phone, Mail, MapPin, Clock, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* Main Premium Footer */}
      <footer className="footer-premium">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Column 1: Brand Info */}
            <div className="footer-column brand-col">
              <Link href="/" className="logo-wrapper" style={{ textDecoration: 'none', display: 'block', width: 'fit-content' }}>
                <div className="logo-main" style={{ justifyContent: 'flex-start', color: '#ffffff' }}>
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
                Calidad certificada para proyectos residenciales y corporativos.
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
                <li><Link href="/cotizador">Cotizador en Línea</Link></li>
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
              <h3>Pagos</h3>
              <div className="payment-security-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', width: '100%' }}>
                  <img src="/webpayplus-logo.svg" alt="Webpay Plus" style={{ height: '30px', objectFit: 'contain', display: 'block', flexShrink: 0 }} />
                  <img src="/SSL.svg" alt="Seguridad SSL" style={{ height: '70px', objectFit: 'contain', display: 'block', flexShrink: 0 }} />
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
