'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Plus, Trash2, Printer, ArrowLeft, Check, FileText, Percent, ShoppingCart, User, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  slug?: string;
}

interface QuoteItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isCustom: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "soteel-prod-1",
    name: "Enchufe de Piso 4 Puestos",
    category: "Electricidad",
    description: "Facilita el acceso de conexión de aparatos eléctricos.",
    price: 59990,
    stock: 10,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-10.png"
  },
  {
    id: "soteel-prod-2",
    name: "Enchufe de Piso 2 Puestos",
    category: "Electricidad",
    description: "Facilita el acceso de conexión de aparatos eléctricos.",
    price: 39990,
    stock: 15,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-3-1.png"
  },
  {
    id: "soteel-prod-3",
    name: "Torre de Enchufe Pop Up Motorizado 2 Enchufes + 2 USB + 1 Cargador Inalámbrico + HDMI",
    category: "Electricidad",
    description: "Apertura Automática touch con múltiples conexiones.",
    price: 279990,
    stock: 5,
    imageUrl: "http://soteel.cl/wp-content/uploads/2024/08/WhatsApp-Image-2025-07-06-at-23.15-Photoroo-copia-e1752105910251.png"
  },
  {
    id: "soteel-prod-4",
    name: "Torre de Enchufe Pop Up Neumatico 3 Tomas Enchufe + 2 Cargas USB",
    category: "Electricidad",
    description: "Apertura Automática touch neumática.",
    price: 207990,
    stock: 8,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-4-e1752105732282.png"
  },
  {
    id: "soteel-prod-5",
    name: "Cargador Inalámbrico para Cubierta + Usb-A + Usb-C",
    category: "Electricidad",
    description: "Fácil armado e instalación en escritorios y cubiertas.",
    price: 22990,
    stock: 50,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/049-1.jpg"
  },
  {
    id: "soteel-prod-6",
    name: "Ordenador de Cables Vertical Modular",
    category: "Electricidad",
    description: "Facilita el acceso de conexión ordenando tus cables.",
    price: 25990,
    stock: 20,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/048.jpg"
  },
  {
    id: "soteel-prod-7",
    name: "Transferencia Automática Monofásica ATS 63a",
    category: "Electricidad",
    description: "Minimizado del dispositivo, opción automática y manual.",
    price: 79990,
    stock: 12,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/D_NQ_NP_2X_954944-MLC52287756154_112022-F.png"
  }
];

export default function CotizadorPage() {
  const [catalog, setCatalog] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Wizard states
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteNumber, setQuoteNumber] = useState('');

  // Client Info States
  const [clientName, setClientName] = useState('');
  const [clientRut, setClientRut] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // Quote Conditions
  const [validity] = useState('15 días corridos');
  const [paymentMethod] = useState('Transferencia Bancaria (50% anticipado, 50% contra entrega)');
  const [deliveryTime] = useState('2 a 3 días hábiles en Santiago');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [notes] = useState('Los precios indicados no incluyen costos de despacho fuera de Santiago a menos que se indique lo contrario. El montaje de equipos no está incluido.');

  // Load products from DB API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCatalog(data);
          }
        }
      } catch (err) {
        console.warn('Usando catálogo local de contingencia', err);
      }
    }
    fetchProducts();

    // Auto-generate Date & Quote Number
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setQuoteDate(dateStr);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    setQuoteNumber(`COT-${year}${month}-${random}`);
  }, []);

  // Filter Catalog
  const filteredCatalog = catalog.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Add Catalog Item
  const handleAddCatalogItem = (product: Product) => {
    setQuoteItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        isCustom: false
      }];
    });
  };

  // Modify Item Price
  const handleUpdatePrice = (id: string, newPriceStr: string) => {
    const price = parseInt(newPriceStr.replace(/\D/g, ''), 10) || 0;
    setQuoteItems(prev => prev.map(item => 
      item.id === id ? { ...item, price } : item
    ));
  };

  // Modify Item Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setQuoteItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  // Direct Input Quantity
  const handleInputQuantity = (id: string, qtyStr: string) => {
    const qty = parseInt(qtyStr, 10) || 1;
    setQuoteItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item
    ));
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== id));
  };

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const subtotalNeto = quoteItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountVal = Math.round(subtotalNeto * (discountPercent / 100));
  const netAfterDiscount = subtotalNeto - discountVal;
  const iva = Math.round(netAfterDiscount * 0.19);
  const total = netAfterDiscount + iva;

  const handlePrint = () => {
    window.print();
  };

  const inlineStyles = `
    .cotizador-layout-root {
      background-color: #f4f6f8;
      min-height: 100vh;
      font-family: 'Outfit', sans-serif;
      color: #222;
    }

    .container {
      max-width: 1200px !important;
      margin: 0 auto !important;
      padding: 2.5rem 2rem !important;
      box-sizing: border-box !important;
    }

    /* Top Bar Editor Options */
    .editor-top-bar {
      background: #ffffff;
      padding: 1.25rem 1.5rem;
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      border: 1px solid #e2e8f0;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .editor-title-group h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.2rem 0;
    }

    .editor-title-group p {
      font-size: 0.85rem;
      color: #666;
      margin: 0;
    }

    .editor-actions-group {
      display: flex;
      gap: 0.8rem;
    }

    .btn-action-primary {
      background-color: var(--primary, #E35205);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), background-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-action-primary:hover:not(:disabled) {
      background-color: var(--primary-hover, #c44300);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 20px rgba(227, 82, 5, 0.15);
    }

    .btn-action-primary:active:not(:disabled) {
      transform: translateY(0) scale(0.98);
    }

    .btn-action-primary:disabled {
      background-color: #cbd5e1;
      color: #94a3b8;
      cursor: not-allowed;
    }

    .btn-action-secondary {
      background-color: #1a202c;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), background-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-action-secondary:hover {
      background-color: #2d3748;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 20px rgba(26, 32, 44, 0.15);
    }

    .btn-action-secondary:active {
      transform: translateY(0) scale(0.98);
    }

    .btn-action-success {
      background-color: #10b981;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), background-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-action-success:hover {
      background-color: #059669;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
    }

    .btn-action-success:active {
      transform: translateY(0) scale(0.98);
    }

    /* Two Column Layout */
    .editor-workspace {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 992px) {
      .editor-workspace {
        grid-template-columns: 1fr;
      }
    }

    .editor-card {
      background: #ffffff;
      padding: 1.75rem;
      border-radius: 16px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.03);
      border: 1px solid #e2e8f0;
      margin-bottom: 2rem;
    }

    .editor-card:last-child {
      margin-bottom: 0;
    }

    .card-heading {
      font-size: 1.1rem;
      font-weight: 700;
      color: #111;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 0.75rem;
    }

    .card-heading::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 18px;
      background-color: var(--primary, #E35205);
      border-radius: 2px;
    }

    /* Form Controls */
    .form-row-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 576px) {
      .form-row-grid-2 {
        grid-template-columns: 1fr;
      }
    }

    .form-field-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.25rem;
    }

    .form-field-group label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input-text {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 0.65rem 0.9rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-family: inherit;
      color: #1e293b;
      transition: all 0.15s ease;
      width: 100%;
      box-sizing: border-box;
    }

    .form-input-text-static {
      background-color: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 0.65rem 0.9rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-family: inherit;
      color: #64748b;
      width: 100%;
      box-sizing: border-box;
      min-height: 38px;
      display: flex;
      align-items: center;
    }

    .form-input-text:focus {
      outline: none;
      background-color: #ffffff;
      border-color: var(--primary, #E35205);
      box-shadow: 0 0 0 3px rgba(227, 82, 5, 0.12);
    }

    /* Catalog search list */
    .search-container {
      position: relative;
      margin-bottom: 1.25rem;
    }

    .search-icon-inside {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }

    .search-input-field {
      padding-left: 2.25rem !important;
    }

    .catalog-results-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      max-height: 380px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    @media (max-width: 768px) {
      .catalog-results-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .catalog-item-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 0.75rem;
      border-radius: 12px;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      gap: 0.75rem;
    }

    .catalog-item-card:hover {
      border-color: var(--primary, #E35205);
      background: #ffffff;
      transform: translateY(-4px) scale(1.015);
      box-shadow: 0 8px 24px rgba(227, 82, 5, 0.08);
    }

    .catalog-item-media {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
      background: #ffffff;
      border: 1px solid #f1f5f9;
    }

    .catalog-item-details {
      flex: 1;
      min-width: 0;
    }

    .catalog-item-name {
      font-size: 0.8rem;
      font-weight: 700;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.15rem;
    }

    .catalog-item-price {
      font-size: 0.78rem;
      color: #64748b;
      font-weight: 600;
    }

    .catalog-item-price-val {
      color: #0f172a;
      font-weight: 700;
    }

    .catalog-btn-add {
      background-color: #ffeedd;
      color: var(--primary, #E35205);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1), background-color 0.2s ease, color 0.2s ease;
    }

    .catalog-btn-add:hover {
      background-color: var(--primary, #E35205);
      color: white;
      transform: scale(1.15) rotate(90deg);
    }

    .catalog-btn-add:active {
      transform: scale(0.95);
    }

    /* Items Cart List */
    .cart-items-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 420px;
      overflow-y: auto;
      padding-right: 0.25rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cart-item-row {
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 1rem;
      animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: transform 0.3s ease, background-color 0.2s ease;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .cart-item-row:hover {
      background-color: #f8fafc;
      transform: translateX(4px);
    }

    .cart-item-row:last-child {
      border-bottom: none;
      padding-bottom: 0.5rem;
    }

    .cart-item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .cart-item-badge {
      display: inline-block;
      font-size: 0.62rem;
      text-transform: uppercase;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .cart-item-badge.catalog {
      background-color: #f1f5f9;
      color: #64748b;
    }

    .cart-item-badge.custom {
      background-color: #ecfdf5;
      color: #059669;
    }

    .cart-item-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
      line-height: 1.4;
    }

    .cart-item-actions-qty {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f8fafc;
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      margin-top: 0.5rem;
    }

    .cart-item-subtotal {
      font-size: 0.8rem;
      font-weight: 600;
      color: #475569;
    }

    .qty-controls-group {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 0.1rem;
    }

    .qty-btn {
      border: none;
      background: transparent;
      color: #475569;
      width: 24px;
      height: 24px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      border-radius: 4px;
    }

    .qty-btn:hover {
      background-color: #f1f5f9;
    }

    .qty-input {
      width: 32px;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 700;
      border: none;
      color: #0f172a;
    }

    .qty-input:focus {
      outline: none;
    }

    .btn-delete-item {
      color: #94a3b8;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0.3rem;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-delete-item:hover {
      color: #ef4444;
      background-color: #fef2f2;
    }

    /* Totals Card Slate */
    .totals-panel-dark {
      background: #0f172a;
      color: #ffffff;
      padding: 1.75rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
    }

    .totals-panel-heading {
      font-size: 1.05rem;
      font-weight: 700;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.75rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .discount-inline-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 0.75rem;
      border-radius: 10px;
      margin-bottom: 1.25rem;
      border: 1px solid #334155;
    }

    .discount-inline-form label {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 600;
    }

    .discount-inline-input {
      background: #090d16;
      border: 1px solid #475569;
      color: white;
      width: 60px;
      text-align: center;
      padding: 0.25rem;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .totals-breakdown-rows {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .total-row-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #cbd5e1;
    }

    .total-row-item.highlight-discount {
      color: #f43f5e;
    }

    .totals-final-net-row {
      border-top: 1px dashed #334155;
      margin-top: 1rem;
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .totals-final-net-row span:first-child {
      font-weight: 700;
      color: #94a3b8;
      font-size: 0.9rem;
    }

    .total-accent-price {
      color: var(--primary, #E35205);
      font-size: 1.75rem;
      font-weight: 800;
      line-height: 1;
    }

    /* A4 Printable Quote Design */
    .formal-print-preview-center {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
    }

    .formal-quote-paper {
      background: #ffffff;
      width: 100%;
      max-width: 800px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      border-radius: 12px;
      padding: 3rem;
      color: #1e293b;
    }

    .quote-sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--primary, #E35205);
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }

    .quote-sheet-logo-area {
      flex: 1;
    }

    .quote-logo-text {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 0.1rem;
      line-height: 1;
    }

    .quote-logo-text span.orange-accent {
      color: var(--primary, #E35205);
    }

    .quote-sub-logo-text {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #64748b;
      margin-top: 0.2rem;
    }

    .quote-emisor-info {
      font-size: 0.75rem;
      color: #475569;
      margin-top: 1rem;
      line-height: 1.5;
    }

    .quote-emisor-info p {
      margin: 0;
    }

    .quote-doc-details-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 1.25rem;
      border-radius: 12px;
      text-align: right;
      min-width: 250px;
    }

    .quote-doc-details-card h2 {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--primary, #E35205);
      margin: 0 0 0.25rem 0;
    }

    .quote-doc-details-card .quote-num-label {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .quote-doc-meta-table {
      font-size: 0.75rem;
      color: #475569;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .quote-meta-row {
      display: flex;
      justify-content: space-between;
    }

    .quote-meta-row span.meta-title {
      font-weight: 600;
      color: #0f172a;
    }

    .quote-client-section {
      background: #f8fafc;
      border: 1px solid #f1f5f9;
      padding: 1.25rem;
      border-radius: 12px;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2rem;
      margin-bottom: 2.5rem;
      font-size: 0.75rem;
    }

    .quote-client-col h3 {
      font-size: 0.65rem;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 1px;
      margin: 0 0 0.6rem 0;
    }

    .quote-client-details p {
      margin: 0 0 0.35rem 0;
      color: #334155;
    }

    .quote-client-details .client-company-strong {
      font-size: 0.9rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    /* Items Sheet Table */
    .quote-items-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.78rem;
      margin-bottom: 2.5rem;
    }

    .quote-items-table th {
      background-color: #0f172a;
      color: #ffffff;
      padding: 0.75rem 1rem;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.68rem;
      letter-spacing: 0.5px;
    }

    .quote-items-table th:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    .quote-items-table th:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      text-align: right;
    }

    .quote-items-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }

    .quote-items-table td.text-right {
      text-align: right;
    }

    .quote-items-table td.font-bold {
      font-weight: 700;
      color: #0f172a;
    }

    .quote-items-table tbody tr:hover {
      background-color: #fafbfc;
    }

    /* Quote summary bottom */
    .quote-bottom-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 2.5rem;
      border-top: 1px solid #e2e8f0;
      padding-top: 1.5rem;
    }

    .quote-transfer-box h4 {
      font-size: 0.75rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }

    .quote-transfer-info {
      font-size: 0.7rem;
      color: #475569;
      line-height: 1.5;
      background: #f8fafc;
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid #f1f5f9;
    }

    .quote-transfer-info p {
      margin: 0;
    }

    .quote-totals-formal-table {
      font-size: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .quote-totals-formal-row {
      display: flex;
      justify-content: space-between;
      color: #475569;
    }

    .quote-totals-formal-row.discount-red {
      color: #e11d48;
    }

    .quote-totals-formal-row.total-bold {
      border-top: 1px solid #e2e8f0;
      padding-top: 0.6rem;
      margin-top: 0.4rem;
      font-weight: 800;
      color: #0f172a;
      font-size: 0.9rem;
    }

    .quote-totals-formal-row.total-bold span.total-orange {
      color: var(--primary, #E35205);
      font-size: 1.15rem;
    }

    .quote-terms-box {
      margin-top: 2.5rem;
      border-top: 1px solid #f1f5f9;
      padding-top: 1.5rem;
      font-size: 0.68rem;
      color: #64748b;
      line-height: 1.5;
    }

    .quote-terms-box h4 {
      font-size: 0.7rem;
      font-weight: 800;
      color: #475569;
      margin: 0 0 0.6rem 0;
      text-transform: uppercase;
    }

    .quote-terms-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .quote-terms-item p {
      margin: 0;
    }

    .quote-terms-item span.term-label {
      font-weight: 700;
      color: #475569;
    }

    .quote-notes-box {
      border-top: 1px solid #f1f5f9;
      padding-top: 0.5rem;
      font-style: italic;
    }

    .quote-sheet-footer {
      margin-top: 3.5rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.65rem;
      color: #94a3b8;
    }

    /* Progress Steps Indicator */
    .steps-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 1.25rem 2rem;
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
      border: 1px solid #e2e8f0;
      margin-bottom: 2rem;
    }

    .step-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .step-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #f1f5f9;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      border: 2px solid #e2e8f0;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1), background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    }

    .step-item.active .step-circle {
      background-color: var(--primary, #E35205);
      border-color: var(--primary, #E35205);
      color: #ffffff;
      transform: scale(1.1);
      box-shadow: 0 0 0 4px rgba(227, 82, 5, 0.15);
    }

    .step-item.completed .step-circle {
      background-color: #ecfdf5;
      border-color: #10b981;
      color: #10b981;
    }

    .step-text {
      display: flex;
      flex-direction: column;
    }

    .step-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #64748b;
      transition: color 0.25s ease;
    }

    .step-item.active .step-title {
      color: #0f172a;
    }

    .step-item.completed .step-title {
      color: #10b981;
    }

    .step-desc {
      font-size: 0.7rem;
      color: #94a3b8;
    }

    .step-connector-line {
      flex: 1;
      height: 2px;
      background-color: #e2e8f0;
      margin: 0 1.5rem;
      transition: background-color 0.25s ease;
    }

    .step-connector-line.completed {
      background-color: #10b981;
    }

    /* Print Settings */
    @media print {
      body {
        background: white !important;
        color: black !important;
        font-size: 11px !important;
      }
      .logo-o-bolt, .logo-sub {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      .formal-quote-paper {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      .container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
      }
      .quote-sheet-header {
        margin-bottom: 1rem !important;
        padding-bottom: 1rem !important;
      }
      .quote-client-section {
        margin-bottom: 1.5rem !important;
        padding: 1rem !important;
        gap: 1rem !important;
      }
      .quote-items-table {
        margin-bottom: 1.5rem !important;
      }
      .quote-items-table td, .quote-items-table th {
        padding: 0.5rem 0.75rem !important;
      }
      .quote-bottom-grid {
        gap: 1.5rem !important;
        padding-top: 1rem !important;
      }
      .quote-terms-box {
        margin-top: 1.5rem !important;
        padding-top: 1rem !important;
      }
      .quote-terms-grid {
        gap: 1rem !important;
        margin-bottom: 0.5rem !important;
      }
      .quote-sheet-footer {
        margin-top: 2rem !important;
      }
      @page {
        size: letter;
        margin: 1.2cm 1.5cm;
      }
    }
  `;

  return (
    <div className={`cotizador-layout-root`}>
      <div className="no-print">
        <Header />
      </div>

      {/* Inyección nativa de CSS plano para evitar que Next.js/Turbopack ignore style-jsx */}
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

      {/* Contenido Principal con clase .container oficial del sitio */}
      <main className="container">
        
        {/* Toggle Modo Vista Previa / Editor */}
        <div className="no-print editor-top-bar">
          <div className="editor-title-group">
            <h1>
              <FileText style={{ color: 'var(--primary)' }} />
              Cotizador Profesional SOTEEL
            </h1>
            <p>
              {isPreviewMode 
                ? 'Vista previa de la cotización formal en formato Carta para imprimir o guardar como PDF' 
                : 'Completa los pasos para armar una cotización formal y generar el documento'
              }
            </p>
          </div>
          {isPreviewMode && (
            <div className="editor-actions-group">
              <button 
                onClick={() => setIsPreviewMode(false)}
                className="btn-action-secondary"
              >
                <ArrowLeft size={16} />
                Volver a Edición
              </button>
              <button 
                onClick={handlePrint}
                className="btn-action-success"
              >
                <Printer size={16} />
                Imprimir / PDF
              </button>
            </div>
          )}
        </div>

        {/* INDICADOR DE PASOS (SOLO EN EDICIÓN) */}
        {!isPreviewMode && (
          <div className="no-print steps-container">
            <div 
              className={`step-item ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <div className="step-circle">
                {currentStep > 1 ? <Check size={16} /> : 1}
              </div>
              <div className="step-text">
                <span className="step-title">Productos</span>
                <span className="step-desc">Seleccionar ítems</span>
              </div>
            </div>

            <div className={`step-connector-line ${currentStep > 1 ? 'completed' : ''}`} />

            <div 
              className={`step-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
              onClick={() => quoteItems.length > 0 && setCurrentStep(2)}
              style={{ opacity: quoteItems.length === 0 ? 0.5 : 0.9, cursor: quoteItems.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              <div className="step-circle">
                {currentStep > 2 ? <Check size={16} /> : 2}
              </div>
              <div className="step-text">
                <span className="step-title">Cliente</span>
                <span className="step-desc">Datos de facturación</span>
              </div>
            </div>

            <div className={`step-connector-line ${currentStep > 2 ? 'completed' : ''}`} />

            <div 
              className={`step-item ${currentStep === 3 ? 'active' : ''}`}
              onClick={() => quoteItems.length > 0 && clientName && clientCompany && setCurrentStep(3)}
              style={{ opacity: (quoteItems.length === 0 || !clientName || !clientCompany) ? 0.5 : 0.9, cursor: (quoteItems.length === 0 || !clientName || !clientCompany) ? 'not-allowed' : 'pointer' }}
            >
              <div className="step-circle">3</div>
              <div className="step-text">
                <span className="step-title">Revisión</span>
                <span className="step-desc">Resumen y PDF</span>
              </div>
            </div>
          </div>
        )}

        {/* MODO EDICIÓN */}
        {!isPreviewMode && (
          <div className="no-print">
            
            {/* PASO 1: SELECCIÓN DE PRODUCTOS */}
            {currentStep === 1 && (
              <div className="editor-workspace">
                <div className="workspace-left">
                  {/* Buscador de Catálogo */}
                  <div className="editor-card">
                    <h3 className="card-heading">
                      Buscar en el Catálogo de SOTEEL
                    </h3>
                    <div className="search-container">
                      <Search className="search-icon-inside" size={18} />
                      <input 
                        type="text" 
                        placeholder="Escribe nombre de producto o categoría..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input-text search-input-field"
                      />
                    </div>

                    {/* Listado Resultados de Catálogo */}
                    <div className="catalog-results-grid">
                      {filteredCatalog.map(product => (
                        <div 
                          key={product.id}
                          className="catalog-item-card"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                            <img 
                              src={product.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=64&q=80'} 
                              alt={product.name} 
                              className="catalog-item-media"
                            />
                            <div className="catalog-item-details">
                              <h4 className="catalog-item-name" title={product.name}>
                                {product.name}
                              </h4>
                              <span className="catalog-item-price">
                                Neto: <span className="catalog-item-price-val">${product.price.toLocaleString('es-CL')}</span>
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAddCatalogItem(product)}
                            className="catalog-btn-add"
                            title="Agregar a la cotización"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ))}

                      {filteredCatalog.length === 0 && (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                          No encontramos productos que coincidan con tu búsqueda.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="workspace-right">
                  {/* Cart items list card */}
                  <div className="editor-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Ítems en Cotización</h3>
                      <span style={{ backgroundColor: '#ffeedd', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {quoteItems.length} {quoteItems.length === 1 ? 'ítem' : 'ítems'}
                      </span>
                    </div>

                    {quoteItems.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                        No has agregado ningún producto a la cotización aún.
                      </div>
                    ) : (
                      <div className="cart-items-wrapper">
                        {quoteItems.map((item) => (
                          <div key={item.id} className="cart-item-row">
                            <div className="cart-item-header">
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <span className={`cart-item-badge ${item.isCustom ? 'custom' : 'catalog'}`}>
                                  {item.isCustom ? 'Manual' : 'Catálogo'}
                                </span>
                                <h4 className="cart-item-title">{item.name}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>P. Unit Neto:</span>
                                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>
                                    ${item.price.toLocaleString('es-CL')}
                                  </span>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="btn-delete-item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="cart-item-actions-qty">
                              <span className="cart-item-subtotal">Subtotal: ${ (item.price * item.quantity).toLocaleString('es-CL') }</span>
                              <div className="qty-controls-group">
                                <button 
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  className="qty-btn"
                                >
                                  -
                                </button>
                                <input 
                                  type="text" 
                                  value={item.quantity}
                                  onChange={(e) => handleInputQuantity(item.id, e.target.value)}
                                  className="qty-input"
                                />
                                <button 
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  className="qty-btn"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Totales */}
                  <div className="totals-panel-dark">
                    <h3 className="totals-panel-heading">
                      <Percent size={18} style={{ color: 'var(--primary)' }} />
                      Subtotal Estimado
                    </h3>
                    <div className="totals-breakdown-rows" style={{ gap: '0.5rem' }}>
                      <div className="total-row-item">
                        <span>Items seleccionados:</span>
                        <span style={{ fontWeight: '600', color: '#fff' }}>
                          {quoteItems.reduce((acc, item) => acc + item.quantity, 0)} uds
                        </span>
                      </div>
                      <div className="total-row-item">
                        <span>Total Neto (Estimado):</span>
                        <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>
                          ${subtotalNeto.toLocaleString('es-CL')}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCurrentStep(2)}
                      disabled={quoteItems.length === 0}
                      className="btn-action-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }}
                    >
                      Siguiente: Datos de Cliente
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: INFORMACIÓN DEL CLIENTE */}
            {currentStep === 2 && (
              <div className="editor-workspace" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                <div className="editor-card">
                  <h3 className="card-heading">
                    Información del Cliente
                  </h3>
                  <div className="form-row-grid-2">
                    <div className="form-field-group">
                      <label>Nombre de Contacto</label>
                      <input 
                        type="text" 
                        placeholder="Juan Pérez"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                    <div className="form-field-group">
                      <label>Empresa / Razón Social</label>
                      <input 
                        type="text" 
                        placeholder="Constructora S.A."
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                  </div>
                  <div className="form-row-grid-2">
                    <div className="form-field-group">
                      <label>RUT Empresa</label>
                      <input 
                        type="text" 
                        placeholder="12.345.678-9"
                        value={clientRut}
                        onChange={(e) => setClientRut(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                    <div className="form-field-group">
                      <label>Correo Electrónico</label>
                      <input 
                        type="email" 
                        placeholder="cliente@correo.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                  </div>
                  <div className="form-row-grid-2">
                    <div className="form-field-group">
                      <label>Teléfono</label>
                      <input 
                        type="text" 
                        placeholder="+56 9 1234 5678"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                    <div className="form-field-group">
                      <label>Dirección Comercial</label>
                      <input 
                        type="text" 
                        placeholder="Av. Providencia 1234, Oficina 501"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className="form-input-text"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
                    <button 
                      onClick={() => setCurrentStep(1)} 
                      className="btn-action-secondary"
                    >
                      Atrás: Productos
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)} 
                      disabled={!clientName.trim() || !clientCompany.trim()}
                      className="btn-action-primary"
                      title={(!clientName.trim() || !clientCompany.trim()) ? "Ingresa al menos Nombre de Contacto y Empresa para continuar" : ""}
                    >
                      Siguiente: Revisar Cotización
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: REVISIÓN Y TOTALES */}
            {currentStep === 3 && (
              <div className="editor-workspace">
                <div className="workspace-left">
                  {/* Resumen Cliente */}
                  <div className="editor-card">
                    <h3 className="card-heading">
                      Datos del Cliente
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
                      <div>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Contacto:</span> {clientName}</p>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Empresa:</span> {clientCompany}</p>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>RUT:</span> {clientRut || '(No especificado)'}</p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Email:</span> {clientEmail || '(No especificado)'}</p>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Teléfono:</span> {clientPhone || '(No especificado)'}</p>
                        <p style={{ margin: '0 0 0.4rem 0' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Dirección:</span> {clientAddress || '(No especificado)'}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                      <button onClick={() => setCurrentStep(2)} className="btn-action-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
                        Editar Datos
                      </button>
                    </div>
                  </div>

                  {/* Condiciones Comerciales Estáticas */}
                  <div className="editor-card">
                    <h3 className="card-heading">
                      Condiciones Comerciales
                    </h3>
                    <div className="form-row-grid-2">
                      <div className="form-field-group">
                        <label>Validez de la Cotización</label>
                        <div className="form-input-text-static">{validity}</div>
                      </div>
                      <div className="form-field-group">
                        <label>Forma de Pago</label>
                        <div className="form-input-text-static">{paymentMethod}</div>
                      </div>
                    </div>
                    <div className="form-field-group">
                      <label>Plazo de Entrega</label>
                      <div className="form-input-text-static">{deliveryTime}</div>
                    </div>
                    <div className="form-field-group">
                      <label>Notas / Observaciones</label>
                      <div className="form-input-text-static" style={{ whiteSpace: 'pre-line', minHeight: '80px', alignItems: 'flex-start', paddingTop: '0.65rem' }}>
                        {notes}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="workspace-right">
                  {/* Resumen de items (Solo Lectura) */}
                  <div className="editor-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>Productos Cotizados</h3>
                      <span style={{ backgroundColor: '#ffeedd', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {quoteItems.length} uds
                      </span>
                    </div>

                    <div className="cart-items-wrapper" style={{ maxHeight: '260px' }}>
                      {quoteItems.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', margin: 0, color: '#1e293b' }}>{item.name}</h4>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              {item.quantity} ud(s) x ${item.price.toLocaleString('es-CL')}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                            ${(item.price * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totales y Descuento */}
                  <div className="totals-panel-dark">
                    <h3 className="totals-panel-heading">
                      <Percent size={18} style={{ color: 'var(--primary)' }} />
                      Cálculo de Totales ($ CLP)
                    </h3>

                    {/* Control Descuento */}
                    <div className="discount-inline-form">
                      <label>Aplicar Descuento (%):</label>
                      <input 
                        type="number" 
                        min="0"
                        max="100"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                        className="discount-inline-input"
                      />
                    </div>

                    <div className="totals-breakdown-rows">
                      <div className="total-row-item">
                        <span>Subtotal Neto:</span>
                        <span style={{ fontWeight: '600', color: '#fff' }}>${subtotalNeto.toLocaleString('es-CL')}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="total-row-item highlight-discount">
                          <span>Descuento ({discountPercent}%):</span>
                          <span style={{ fontWeight: '600' }}>-${discountVal.toLocaleString('es-CL')}</span>
                        </div>
                      )}
                      <div className="total-row-item">
                        <span>Monto Neto Afecto:</span>
                        <span style={{ fontWeight: '600', color: '#fff' }}>${netAfterDiscount.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="total-row-item">
                        <span>IVA (19%):</span>
                        <span style={{ fontWeight: '600', color: '#fff' }}>${iva.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="totals-final-net-row">
                        <span>TOTAL COTIZADO:</span>
                        <span className="total-accent-price">${total.toLocaleString('es-CL')}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsPreviewMode(true)}
                      className="btn-action-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }}
                    >
                      <FileText size={18} />
                      Generar Cotización Formal
                    </button>

                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="btn-action-secondary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#334155' }}
                    >
                      Atrás: Datos de Cliente
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* MODO VISTA PREVIA (A4/CARTA PRINTABLE PREVIEW) */}
        {isPreviewMode && (
          <div className="formal-print-preview-center">
            <div className="formal-quote-paper">
              
              {/* Encabezado: Logo y Datos Emisor */}
              <div className="quote-sheet-header">
                <div className="quote-sheet-logo-area">
                  <div className="logo-wrapper">
                    <div className="logo-main" style={{ fontSize: '2.2rem' }}>
                      <span>S</span>
                      <span className="logo-o-bolt" style={{ width: '0.85em', height: '0.85em' }}><Zap className="logo-zap-icon" /></span>
                      <span>T</span>
                      <span>E</span>
                      <span>E</span>
                      <span>L</span>
                    </div>
                    <div className="logo-sub" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                      SOLUCIONES EN ELECTRICIDAD
                    </div>
                  </div>
                  <div className="quote-emisor-info">
                    <p style={{ fontWeight: '700', color: '#0f172a' }}>SOTEEL SpA</p>
                    <p>RUT: 76.543.210-K</p>
                    <p>Dirección: Av. Nueva Providencia 1881, Providencia</p>
                    <p>Contacto: contacto@soteel.cl | +56 9 1234 5678</p>
                    <p>Santiago - Chile</p>
                  </div>
                </div>

                <div className="quote-doc-details-card">
                  <h2>COTIZACIÓN</h2>
                  <div className="quote-num-label">{quoteNumber}</div>
                  
                  <div className="quote-doc-meta-table">
                    <div className="quote-meta-row">
                      <span className="meta-title">Fecha Emisión:</span>
                      <span>{quoteDate}</span>
                    </div>
                    <div className="quote-meta-row">
                      <span className="meta-title">Validez:</span>
                      <span>{validity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Cliente */}
              <div className="quote-client-section">
                <div className="quote-client-col">
                  <h3>CLIENTE / FACTURACIÓN</h3>
                  <div className="quote-client-details">
                    {clientCompany && <p className="client-company-strong">{clientCompany}</p>}
                    {clientName && <p><span style={{ fontWeight: '600' }}>Atención:</span> {clientName}</p>}
                    {clientRut && <p><span style={{ fontWeight: '600' }}>RUT:</span> {clientRut}</p>}
                    {clientAddress && <p><span style={{ fontWeight: '600' }}>Dirección:</span> {clientAddress}</p>}
                  </div>
                </div>

                <div className="quote-client-col" style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div className="quote-client-details">
                    {clientEmail && <p><span style={{ fontWeight: '600' }}>Email:</span> {clientEmail}</p>}
                    {clientPhone && <p><span style={{ fontWeight: '600' }}>Teléfono:</span> {clientPhone}</p>}
                  </div>
                </div>
              </div>

              {/* Tabla de Artículos */}
              <div style={{ marginBottom: '2rem' }}>
                <table className="quote-items-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Detalle / Producto / Servicio</th>
                      <th style={{ textAlign: 'right' }}>Cant.</th>
                      <th style={{ textAlign: 'right' }}>Precio Unit ($)</th>
                      <th style={{ textAlign: 'right' }}>Subtotal ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteItems.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: '600' }}>{item.name}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">${item.price.toLocaleString('es-CL')}</td>
                        <td className="text-right font-bold">${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totales */}
              <div className="quote-bottom-grid">
                <div className="quote-transfer-box">
                  <h4>DATOS DE TRANSFERENCIA SOTEEL SpA</h4>
                  <div className="quote-transfer-info">
                    <p><span style={{ fontWeight: '600', color: '#334155' }}>Banco:</span> Banco de Crédito e Inversiones (BCI)</p>
                    <p><span style={{ fontWeight: '600', color: '#334155' }}>Tipo Cuenta:</span> Cuenta Corriente</p>
                    <p><span style={{ fontWeight: '600', color: '#334155' }}>N° Cuenta:</span> 1234567890</p>
                    <p><span style={{ fontWeight: '600', color: '#334155' }}>RUT:</span> 76.543.210-K</p>
                    <p><span style={{ fontWeight: '600', color: '#334155' }}>Email pagos:</span> administracion@soteel.cl</p>
                  </div>
                </div>

                <div className="quote-totals-formal-table">
                  <div className="quote-totals-formal-row">
                    <span>Subtotal Neto:</span>
                    <span>${subtotalNeto.toLocaleString('es-CL')}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="quote-totals-formal-row discount-red">
                      <span>Descuento ({discountPercent}%):</span>
                      <span>-${discountVal.toLocaleString('es-CL')}</span>
                    </div>
                  )}
                  <div className="quote-totals-formal-row">
                    <span>Monto Neto Afecto:</span>
                    <span>${netAfterDiscount.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="quote-totals-formal-row">
                    <span>IVA (19%):</span>
                    <span>${iva.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="quote-totals-formal-row total-bold">
                    <span>TOTAL:</span>
                    <span className="total-orange">${total.toLocaleString('es-CL')}</span>
                  </div>
                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', textAlign: 'right', margin: '0.2rem 0 0 0' }}>
                    Precios en CLP (Pesos Chilenos)
                  </p>
                </div>
              </div>

              {/* Condiciones al pie */}
              <div className="quote-terms-box">
                <h4>Condiciones de Venta:</h4>
                <div className="quote-terms-grid">
                  <div className="quote-terms-item">
                    <p><span className="term-label">Forma de Pago:</span></p>
                    <p>{paymentMethod}</p>
                  </div>
                  <div className="quote-terms-item">
                    <p><span className="term-label">Plazo de Entrega:</span></p>
                    <p>{deliveryTime}</p>
                  </div>
                  <div className="quote-terms-item">
                    <p><span className="term-label">Validez Oferta:</span></p>
                    <p>{validity}</p>
                  </div>
                </div>
                {notes && (
                  <div className="quote-notes-box">
                    <p><span className="term-label">Notas:</span> {notes}</p>
                  </div>
                )}
              </div>

              {/* Firma y Contacto */}
              <div className="quote-sheet-footer">
                <div>
                  <p>Documento generado digitalmente por SOTEEL Cotizador.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p>SOTEEL Soluciones Eléctricas</p>
                  <p>www.soteel.cl</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
