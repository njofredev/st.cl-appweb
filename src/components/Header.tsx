'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingCart, Zap, Youtube, Info, MapPin, BookOpen, User, MessageSquare, Phone, ChevronDown, Menu, X, FileText, Store } from 'lucide-react';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  initialSearchQuery?: string;
}

export default function Header({ onSearchChange, initialSearchQuery = '' }: HeaderProps) {
  const { cartCount, setIsCartOpen } = useCart();
  const [query, setQuery] = useState(initialSearchQuery);
  const router = useRouter();
  const pathname = usePathname();
  const [isConductorActive, setIsConductorActive] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsConductorActive(pathname === '/productos' && params.get('category') === 'conductores');
    }
  }, [pathname]);

  // Cargar productos para el dropdown de autocompletado/sugerencias
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (e) {
        console.warn('Error loading search suggestions:', e);
      }
    }
    loadProducts();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false); // Ocultar dropdown al enviar formulario
    if (query.trim() === '') {
      if (onSearchChange) {
        onSearchChange('');
      } else {
        router.push('/productos');
      }
      return;
    }
    if (onSearchChange) {
      onSearchChange(query);
    } else {
      router.push(`/productos?search=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const suggestions = query.trim() === ''
    ? products.slice(0, 4) // Primeros 4 productos como sugerencias iniciales
    : products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  return (
    <>
      {/* 1. Utility Top Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-links">
            <Link href="/nosotros" className="top-bar-link">
              <Info size={12} style={{ display: 'inline', marginRight: '0.2rem' }} /> Empresa
            </Link>
            <Link href="/contacto" className="top-bar-link">
              <MapPin size={12} style={{ display: 'inline', marginRight: '0.2rem' }} /> Sucursales
            </Link>
            <Link href="/productos" className="top-bar-link">
              <Store size={12} style={{ display: 'inline', marginRight: '0.2rem' }} /> Tienda
            </Link>
          </div>
          <div className="top-bar-right">
            <a href="https://www.youtube.com/@josegarces3670" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Youtube size={14} style={{ color: '#ff0000' }} /> YouTube
            </a>
            <span>|</span>
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#25d366', fontWeight: 'bold' }}>
              <MessageSquare size={14} /> Soporte Ventas
            </a>
            <span>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={14} /> Llámanos: +56 2 2960 0000
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="header-main">
        <div className="header-container">


          {/* Logo SOTEEL */}
          <Link href="/" className="logo-wrapper">
            <div className="logo-main">
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

          {/* Search Bar Container with Autocomplete Dropdown */}
          <div className="search-bar-relative-container" style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
            <form className="search-bar-wrapper" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar conductores, protecciones, marcas o código..." 
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 250)} // delay allows clicking suggestion link before blur hides dropdown
              />
              <button type="submit" className="search-btn" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            {/* Panel de Autocompletado / Sugerencias de Productos */}
            {isFocused && suggestions.length > 0 && (
              <div className="search-suggestions-dropdown">
                <div className="suggestions-header">
                  {query.trim() === '' ? 'Productos Destacados' : 'Coincidencias en Catálogo'}
                </div>
                <ul className="suggestions-list">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <Link 
                        href={`/productos/${p.slug}`}
                        className="suggestion-item-link"
                      >
                        <img 
                          src={p.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=64&q=80'} 
                          alt={p.name} 
                          className="suggestion-item-img" 
                        />
                        <div className="suggestion-item-info">
                          <span className="suggestion-item-name">{p.name}</span>
                          <span className="suggestion-item-price">${p.price.toLocaleString('es-CL')}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="header-actions">
            <Link href="/cotizador" className="header-action-item" style={{ textDecoration: 'none', color: 'var(--secondary)' }} aria-label="Cotiza en Línea">
              <FileText size={18} />
              <span>Cotiza en Línea</span>
            </Link>
            <button className="header-action-item" onClick={() => setIsCartOpen(true)} aria-label="Carrito">
              <div className="cart-icon-wrapper">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
              </div>
              <span>Carro</span>
            </button>
            {/* Hamburger Menu Toggle (Mobile Only, ahora a la derecha) */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú de Navegación"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Detailed Category Subheader */}
      <nav className="nav-menu">
        <div className="nav-menu-container">
          <ul className="nav-list">
            <li>
              <Link href="/" className={`nav-item-link ${pathname === '/' ? 'active' : ''}`}>
                Inicio
              </Link>
            </li>
            <li className="nav-item-has-megamenu">
              <span className="nav-item-link nav-item-link-orange" style={{ cursor: 'pointer' }}>
                Ver Productos <ChevronDown size={12} style={{ color: 'var(--primary)' }} />
              </span>
              <div className="megamenu-panel">
                <div className="megamenu-grid">
                  <div className="megamenu-col">
                    <h3>Insumos Eléctricos</h3>
                    <ul>
                      <li><Link href="/productos">Ver Todos los Insumos</Link></li>
                      <li><Link href="/productos/enchufe-de-piso-4-puestos">Enchufe Piso 4 Puestos</Link></li>
                      <li><Link href="/productos/enchufe-de-piso-2-puestos">Enchufe Piso 2 Puestos</Link></li>
                      <li><Link href="/productos/toma-de-enchufe-multifuncional">Toma de Enchufe Multifuncional</Link></li>
                    </ul>
                  </div>
                  <div className="megamenu-col">
                    <h3>Conectividad y Orden</h3>
                    <ul>
                      <li><Link href="/productos/cargador-inalambrico-para-cubierta-usb-a-usb-c">Cargadores Empotrables</Link></li>
                      <li><Link href="/productos/ordenador-de-cables">Ordenadores de Cables</Link></li>
                      <li><Link href="/productos/transferencia-automatica-monofasica-ats-63a">Transferencias Automáticas ATS</Link></li>
                    </ul>
                  </div>
                  <div className="megamenu-col">
                    <h3>Torres Inteligentes y Solar</h3>
                    <ul>
                      <li><Link href="/productos/torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta-app-tuya">Torre Tuya Smart App</Link></li>
                      <li><Link href="/productos/torre-de-enchufe-pop-up-neumatico-3-tomas-enchufe-2-cargas-usb">Torre Neumática 3 Tomas</Link></li>
                      <li><Link href="/productos/torre-de-enchufe-pop-up-motorizado-3-tomas-enchufe-2-cargas-usb-1-cargador-inalambrico-para-cubierta">Torre Motorizada 3 Tomas</Link></li>
                      <li><Link href="/productos/torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-hdmi-para-oficinas">Torre Motorizada HDMI</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link href="/productos?category=conductores" className={`nav-item-link ${isConductorActive ? 'active' : ''}`}>
                Conductores Eléctricos
              </Link>
            </li>
            <li>
              <Link href="/productos?category=iluminacion" className="nav-item-link">
                Iluminación
              </Link>
            </li>
            <li>
              <Link href="/productos?category=canalizacion" className="nav-item-link">
                Canalización
              </Link>
            </li>
            <li>
              <Link href="/productos?category=control" className="nav-item-link">
                Control y Potencia
              </Link>
            </li>
            <li>
              <Link href="/productos?category=solar" className={`nav-item-link ${pathname === '/productos' && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('category') === 'solar' ? 'active' : ''}`}>
                Nuevas Energías
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-main" style={{ fontSize: '1.4rem', width: 'fit-content', gap: '0.2rem' }}>
            <span>S</span>
            <span className="logo-o-bolt"><Zap className="logo-zap-icon" style={{ width: '1.2rem', height: '1.2rem' }} /></span>
            <span>T</span>
            <span>E</span>
            <span>E</span>
            <span>L</span>
          </div>
          <button 
            className="close-drawer-btn" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-drawer-body">
          {/* Buscador Móvil dentro de la hamburguesa */}
          <div className="mobile-search-container-relative" style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <form className="search-bar-wrapper" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar productos..." 
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 250)}
              />
              <button type="submit" className="search-btn" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            {/* Panel de Autocompletado Móvil */}
            {isFocused && suggestions.length > 0 && (
              <div className="search-suggestions-dropdown" style={{ top: '100%' }}>
                <ul className="suggestions-list">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <Link 
                        href={`/productos/${p.slug}`}
                        className="suggestion-item-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsFocused(false);
                        }}
                        style={{ padding: '0.6rem 0.8rem' }}
                      >
                        <span className="suggestion-item-name" style={{ fontSize: '0.75rem' }}>{p.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ul className="mobile-nav-list">
            <li>
              <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/productos" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Ver todos los productos
              </Link>
            </li>
            <li className="mobile-divider">Categorías</li>
            <li>
              <Link href="/productos?category=conductores" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Conductores Eléctricos
              </Link>
            </li>
            <li>
              <Link href="/productos?category=iluminacion" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Iluminación
              </Link>
            </li>
            <li>
              <Link href="/productos?category=canalizacion" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Canalización
              </Link>
            </li>
            <li>
              <Link href="/productos?category=control" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Control y Potencia
              </Link>
            </li>
            <li>
              <Link href="/productos?category=solar" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Nuevas Energías
              </Link>
            </li>
            <li className="mobile-divider">Empresa</li>
            <li>
              <Link href="/nosotros" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Contacto / Sucursales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}
