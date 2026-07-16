'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Zap, LayoutGrid, SlidersHorizontal, Search } from 'lucide-react';
import Link from 'next/link';
import QuantityModal from '@/components/QuantityModal';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  slug: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "soteel-prod-1",
    name: "Enchufe de Piso 4 Puestos",
    slug: "enchufe-de-piso-4-puestos",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión de aparatos eléctricos.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Diseño y materiales muy resistentes a golpes.\n 	Fácil armado e instalación.\n 	Apertura mecánica.\n 	Garantía 1 año.\n Instalación:\n\n 	Precablear en obra bajo piso.\n 	Instalar la caja y taparla con cartón o similar para que no quede cubierta de concreto en el caso de dicha aplicación.\n 	Confirmar que haya suficiente espacio.\n 	Introduzca el enchufe en el orificio.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n",
    price: 59990,
    stock: 6,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-10.png",
  },
  {
    id: "soteel-prod-2",
    name: "Enchufe de Piso 2 Puestos",
    slug: "enchufe-de-piso-2-puestos",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión de aparatos eléctricos.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Diseño y materiales muy resistentes a golpes.\n 	Fácil armado e instalación.\n 	Apertura mecánica.\n 	Garantía 1 año.\n Instalación:\n\n 	Precablear en obra bajo piso.\n 	Instalar la caja y taparla con cartón o similar para que no quede cubierta de concreto en el caso de dicha aplicación.\n 	Confirmar que haya suficiente espacio.\n 	Introduzca el enchufe en el orificio.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n",
    price: 39990,
    stock: 8,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-3-1.png",
  },
  {
    id: "soteel-prod-3",
    name: "Torre de Enchufe Pop Up Motorizado 2 Enchufes + 2 USB + 1 Cargador Inalambrico (wireless) + HDMI para Oficinas",
    slug: "torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-hdmi-para-oficinas",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Garantía 6 meses.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 95 a 105 mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n",
    price: 279990,
    stock: 5,
    imageUrl: "http://soteel.cl/wp-content/uploads/2024/08/WhatsApp-Image-2025-07-06-at-23.15-Photoroo-copia-e1752105910251.png",
  },
  {
    id: "soteel-prod-4",
    name: "Torre de Enchufe Pop Up Neumatico 3 Tomas Enchufe + 2 Cargas USB",
    slug: "torre-de-enchufe-pop-up-neumatico-3-tomas-enchufe-2-cargas-usb",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Garantía 1 año.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 87 a 95mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado.\n",
    price: 207990,
    stock: 6,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-4-e1752105732282.png",
  },
  {
    id: "soteel-prod-5",
    name: "Torre de Enchufe Pop Up Motorizado 2 Enchufes + 2 USB + 1 Cargador Inalambrico (wireless) + 1 Parlante Bluetooth para Cubierta + APP Tuya",
    slug: "torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta-app-tuya",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Aplicación Tuya Smart.\n 	Garantía 1 año.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 128 a 135mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n",
    price: 299990,
    stock: 1,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Sin-titulo-1_Mesa-de-trabajo-1-copia-8.png",
  },
  {
    id: "soteel-prod-6",
    name: "Cargador Inalámbrico para Cubierta + Usb-A + Usb-C",
    slug: "cargador-inalambrico-para-cubierta-usb-a-usb-c",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Stock disponible.\n 	Garantía 1 año.\n 	Fácil armado e instalación.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 60mm.\n 	Introduzca el enchufe en el orificio.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado.\n",
    price: 22990,
    stock: 33,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/049-1.jpg",
  },
  {
    id: "soteel-prod-7",
    name: "Ordenador de Cables",
    slug: "ordenador-de-cables",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio ocultando los cables.\n 	La espina del cable del escritorio cabe perfectamente debajo de un escritorio.\n 	Se fija a una arandela o se atornilla a la parte inferior del escritorio.\n 	Se pueden agregar o quitar segmentos modulares flexibles para adaptarse a la aplicación deseada.\n 	 2 compartimientos para la separación de cables.\n Instalación:\n\n 	Presentar la espina vertical donde se requiere instalar.\n 	Si requiere menor largo retire los segmentos modulares hasta que tenga el largo suficiente para que se pueda fijar en el piso y la base inferior del mueble.\n 	Marque con la misma plantilla del producto las perforaciones a realizar. Perfore u luego fije la espina vertical en la posición deseada.\n 	Pase los cables y ordene.\nSe recomienda que el cableado de corrientes débiles quede en un compartimiento distinto al cableado eléctrico.\n",
    price: 25990,
    stock: 5,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/048.jpg",
  },
  {
    id: "soteel-prod-8",
    name: "Toma de Enchufe Multifuncional",
    slug: "toma-de-enchufe-multifuncional",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Garantía 1 año.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo según modelo a instalar.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Introduzca el enchufe en el orificio.\n 	Presione el riel de sujeción.\n 	Conecte los enchufe a la fuente de alimentación y los distintos periféricos.\n\n[embed]https://www.youtube.com/shorts/--HKDav3BEA[/embed]",
    price: 199990,
    stock: 4,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/046-1.jpg",
  },
  {
    id: "soteel-prod-9",
    name: "Torre de Enchufe Vertical Pop Up",
    slug: "torre-de-enchufe-vertical-pop-up",
    category: "Electricidad",
    description: "Descargar Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Manual.\n 	Garantía 6 meses.\n Descripción:\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Manual.\n 	Garantía 6 meses.\n\nInstalación:\n\n 	Hacer la perforación en la superficie de trabajo de 60mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n",
    price: 39990,
    stock: 82,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/torre-pop-up-e1752106193229.png",
  },
  {
    id: "soteel-prod-10",
    name: "Torre de Enchufe Pop Up Motorizado 3 Tomas Enchufe + 2 Cargas USB + 1 Cargador Inalambrico (wireless) para Cubierta",
    slug: "torre-de-enchufe-pop-up-motorizado-3-tomas-enchufe-2-cargas-usb-1-cargador-inalambrico-para-cubierta",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Garantía 6 meses.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 95 a 100 mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n[embed]https://www.youtube.com/watch?v=QEanmjgyicE&feature=emb_title[/embed]\n\n",
    price: 279990,
    stock: 4,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/WhatsApp-Image-2025-07-06-at-23.15-Photoroom.png",
  },
  {
    id: "soteel-prod-11",
    name: "Torre de Enchufe Pop Up Motorizado 2 Enchufes + 2 USB + 1 Cargador Inalambrico (wireless) + 1 Parlante Bluetooth para Cubierta",
    slug: "torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Facilita el acceso de conexión para aparatos de cocina y escritorio.\n 	Cuando esta sin uso se guarda en forma compacta.\n 	Fácil armado e instalación.\n 	Apertura Automática touch.\n 	Garantía 1 año.\n Instalación:\n\n 	Hacer la perforación en la superficie de trabajo de 95mm.\n 	Confirmar que haya suficiente espacio debajo de la superficie para ocultar la unidad cuando este guardada.\n 	Retire el anillo de bloqueo girándolo en sentido contrario a las manillas del reloj.\n 	Introduzca el enchufe en el orificio.\n 	Coloque el anillo de bloqueo girándolo en el sentido de las agujas del reloj para apretarlo.\n 	Conecte el enchufe a la fuente de alimentación utilizando el enchufe pre-cableado\n\n \n\n[embed]https://www.youtube.com/watch?v=pk8MY3GIJ48&feature=emb_title[/embed]",
    price: 149990,
    stock: 0,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/Copia-de-torre-de-enchufe-g-5.png",
  },
  {
    id: "soteel-prod-12",
    name: "Transferencia Automática Monofásica ATS 63a",
    slug: "transferencia-automatica-monofasica-ats-63a",
    category: "Electricidad",
    description: "Ficha técnica\n\n 	Minimizado del dispositivo en comparación de otras alternativas.\n 	Opción de operación Manual o Automática.\n 	Fácil Instalación.\n 	Garantía 1 año.\n Instalación:\n\n 	Corte la energía de la Red y de Equipo de respaldo.\n 	Montar sobre riel Din de sujeción dentro del gabinete destinado para el ATS.\n 	Cablear desde proyección principal de la Red hasta la entrada Main del ATS.\n 	Cablear desde protección de equipo de respaldo hasta la entrada Input GEN.\n 	Una vez puesto los cables tanto de la Red como del equipo de Respaldo. Deberá puentear, ya sea directamente o en la barra de alimentación general, ambas salidas del ATS.\n 	Una vez teniendo todo conectado vuelva a revisar nuevamente y conecte la energía Principal de la red y del equipo de respaldo.\n 	Nota: El equipo de respaldo debe tener una fase independiente hacia el control desde la protección principal.\n 	Este ATS puede ser usado en instalaciones combinadas RED y Generación Fotovoltaicas Aisladas.\n",
    price: 79990,
    stock: 2,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/D_NQ_NP_2X_954944-MLC52287756154_112022-F.png",
  },
  {
    id: "soteel-prod-13",
    name: "Dispensador de Líquidos. Stl-02-2",
    slug: "dispensador-de-liquidos-stl-02-2",
    category: "Todas las categorías",
    description: "Ficha técnica\n\n 	Facilita el uso diario de detergentes, jabones, shampoo, y otros líquidos de uso diario.\n 	Mejora el uso de los espacios conservando la estética con modelos y materiales sofisticados.\n 	Garantía 1 año.\n 	Fácil armado e instalación.\n 	Apertura mediante Push.\n Instalación:\n\n1. Hacer la perforación en la superficie de trabajo de 2,8 a 3 cm.\n2. Retirar el deposito de liquido y tuerca de fijación.\n3. Insertar dispensador en el orificio realizado y por abajo poner la tuerca de sujeción con los oring correspondientes,\npresionar con la mano de manera firme pero no forzando.\n\nNota: Se recomienda el uso de herramienta adecuada según la superficie de instalación, metal-Piedra-Cuarzo y Loza.",
    price: 49990,
    stock: 2,
    imageUrl: "http://soteel.cl/wp-content/uploads/2019/12/024.jpg",
  }
];

const CATEGORIES = [
  'Todos',
  'Conductores Eléctricos',
  'Iluminación',
  'Canalización',
  'Control y Potencia',
  'Ferretería Eléctrica',
  'Seguridad Industrial',
  'Energía Solar'
];

function CatalogContent() {
  const { addToCart, updateQuantity, setIsCartOpen } = useCart();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(350000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Estados para el Modal de Selección de Cantidad
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleModalConfirm = (quantity: number) => {
    if (selectedModalProduct) {
      addToCart(selectedModalProduct);
      if (quantity > 1) {
        updateQuantity(selectedModalProduct.id, quantity - 1);
      }
      setIsCartOpen(true);
    }
  };

  // URL Params Filtering
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) setSearchQuery(searchParam);

    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const catVal = categoryParam.toLowerCase();
      if (catVal === 'conductores' || catVal === 'electricidad') setSelectedCategory('Conductores Eléctricos');
      else if (catVal === 'iluminacion') setSelectedCategory('Iluminación');
      else if (catVal === 'canalizacion') setSelectedCategory('Canalización');
      else if (catVal === 'control') setSelectedCategory('Control y Potencia');
      else if (catVal === 'solar') setSelectedCategory('Energía Solar');
      else if (catVal === 'ferreteria') setSelectedCategory('Ferretería Eléctrica');
      else if (catVal === 'seguridad') setSelectedCategory('Seguridad Industrial');
      else if (catVal === 'todas-las-categorias') setSelectedCategory('Todos');
    }
  }, [searchParams]);

  // Cargar productos de la DB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((p: any) => ({
              id: p.id,
              name: p.name,
              category: p.category?.name || 'General',
              description: p.description || '',
              price: p.price,
              stock: p.stock,
              imageUrl: p.imageUrl,
              slug: p.slug
            }));
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.warn('Usando catálogo fallback local:', err);
      }
    }
    fetchProducts();
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category mapping logic based on product name keywords
    let matchesCategory = true;
    if (selectedCategory !== 'Todos') {
      const name = p.name.toLowerCase();
      const cat = selectedCategory;
      if (cat === 'Conductores Eléctricos') {
        matchesCategory = name.includes('cable') || name.includes('alambre') || name.includes('conductor') || p.category === 'Conductores';
      } else if (cat === 'Canalización') {
        matchesCategory = name.includes('ordenador') || name.includes('enchufe de piso') || name.includes('toma de enchufe') || name.includes('cargador') || name.includes('enchufe piso');
      } else if (cat === 'Control y Potencia') {
        matchesCategory = name.includes('transferencia') || name.includes('ats') || name.includes('motorizado') || name.includes('neumatico');
      } else if (cat === 'Energía Solar') {
        matchesCategory = name.includes('tuya') || name.includes('smart') || name.includes('ats') || name.includes('solar');
      } else if (cat === 'Iluminación') {
        matchesCategory = name.includes('foco') || name.includes('led') || name.includes('iluminacion');
      } else {
        matchesCategory = p.category === cat;
      }
    }
    
    const matchesPrice = p.price <= maxPrice;
    
    // Brand logic
    const brandLower = p.name.toLowerCase();
    const isTuya = brandLower.includes('tuya');
    const isSoteel = !isTuya;
    const matchesBrand = selectedBrands.length === 0 || 
                         (selectedBrands.includes('Tuya') && isTuya) || 
                         (selectedBrands.includes('Soteel') && isSoteel);
                         
    const matchesStock = !onlyInStock || p.stock > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // relevancia / orden original de bd
  });

  const renderFilters = () => {
    return (
      <>
        {/* Box 1: Categorías de Productos */}
        <div className="sidebar-box">
          <div className="sidebar-box-header">
            Productos
          </div>
          <ul className="sidebar-category-list">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button 
                  className={`sidebar-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // Opcionalmente podemos cerrar el drawer al seleccionar categoría en mobile,
                    // pero es mejor dejar que el usuario aplique múltiples filtros.
                  }}
                >
                  <span>{cat}</span>
                  <span className="plus-icon">{selectedCategory === cat ? '−' : '+'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: Filtrar por */}
        <div className="sidebar-box">
          <div className="sidebar-box-header">
            Filtrar por
          </div>
          
          {/* Filter Section: Rango de Precio */}
          <div className="filter-section">
            <div className="filter-section-title">
              Rango de Precio
            </div>
            <div className="filter-price-slider">
              <input 
                type="range" 
                min="20000" 
                max="350000" 
                step="5000"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="price-labels">
                <span>$20.000</span>
                <span>Max: ${maxPrice.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>

          {/* Filter Section: Marcas */}
          <div className="filter-section">
            <div className="filter-section-title">
              Marcas
            </div>
            <ul className="filter-checkbox-list">
              <li>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes('Soteel')} 
                    onChange={() => toggleBrand('Soteel')}
                  />
                  <span>Soteel</span>
                </label>
              </li>
              <li>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes('Tuya')} 
                    onChange={() => toggleBrand('Tuya')}
                  />
                  <span>Tuya Smart</span>
                </label>
              </li>
            </ul>
          </div>

          {/* Filter Section: Stock */}
          <div className="filter-section">
            <div className="filter-section-title">
              Disponibilidad
            </div>
            <ul className="filter-checkbox-list">
              <li>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={onlyInStock} 
                    onChange={() => setOnlyInStock(!onlyInStock)}
                  />
                  <span>Solo en Stock ({products.filter(p => p.stock > 0).length})</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const activeFiltersCount = 
    (selectedCategory !== 'Todos' ? 1 : 0) +
    (maxPrice < 350000 ? 1 : 0) +
    (selectedBrands.length) +
    (onlyInStock ? 1 : 0);

  return (
    <>
      <Header onSearchChange={setSearchQuery} initialSearchQuery={searchQuery} />

      <main className="container catalog-container">
        
        {/* Panel Lateral Filtros (Gobantes/Rhona Inspired) */}
        <aside className="catalog-sidebar">
          {renderFilters()}
        </aside>

        {/* Listado de Productos */}
        <div>
          <div className="catalog-header">
            <h1 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LayoutGrid size={20} /> Catálogo de Insumos
            </h1>
            <div className="catalog-header-actions">
              {/* Dropdown de ordenamiento */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--secondary)',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
                className="sort-select"
              >
                <option value="relevance">Relevancia</option>
                <option value="name-asc">Nombre: A a la Z</option>
                <option value="name-desc">Nombre: Z a la A</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }} className="products-count">
                {filteredProducts.length} productos encontrados
              </span>
            </div>
          </div>

          {/* Botón flotante de filtro móvil */}
          <button 
            className="mobile-filter-floating-btn" 
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filtrar</span>
            {activeFiltersCount > 0 && (
              <span className="filter-badge-count">{activeFiltersCount}</span>
            )}
          </button>

          {/* Mobile Filter Drawer Overlay & Drawer */}
          {isFilterDrawerOpen && (
            <div 
              className="mobile-filter-drawer-overlay" 
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <div 
                className="mobile-filter-drawer" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-filter-drawer-header">
                  <h2>Filtros</h2>
                  <button 
                    className="close-drawer-btn" 
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="mobile-filter-drawer-body">
                  {renderFilters()}
                </div>
                <div className="mobile-filter-drawer-footer" style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--border)', padding: '1rem' }}>
                  <button 
                    className="reset-filters-btn" 
                    style={{
                      flex: '1',
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--secondary)',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onClick={() => {
                      setSelectedCategory('Todos');
                      setMaxPrice(350000);
                      setSelectedBrands([]);
                      setOnlyInStock(false);
                      setSearchQuery('');
                    }}
                  >
                    Restablecer
                  </button>
                  <button 
                    className="apply-filters-btn" 
                    style={{ flex: '1.8' }}
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    Ver {filteredProducts.length} productos
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="products-grid">
            {sortedProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <Link href={`/productos/${product.slug}`} className="product-img-wrapper" style={{ display: 'block', cursor: 'pointer' }}>
                  {product.imageUrl ? (
                    <img className="product-img" src={product.imageUrl.replace('http://', 'https://')} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">
                      <Zap size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>SOTEEL</span>
                    </div>
                  )}
                  <div className="product-card-overlay">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Search size={16} /> Ficha Técnica
                    </span>
                  </div>
                </Link>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <Link href={`/productos/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <h3 className="product-name" style={{ cursor: 'pointer' }}>{product.name}</h3>
                  </Link>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0 1rem' }}>
                    <span className="product-price" style={{ margin: 0 }}>${product.price.toLocaleString('es-CL')}</span>
                    <span style={{ fontSize: '0.72rem', color: product.stock > 0 ? 'var(--success)' : 'var(--error)', fontWeight: '800', backgroundColor: product.stock > 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                    </span>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      setSelectedModalProduct(product);
                      setIsModalOpen(true);
                    }}
                    disabled={product.stock === 0}
                    style={{ opacity: product.stock === 0 ? 0.6 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    {product.stock > 0 ? 'Añadir al carro' : 'Sin stock'}
                  </button>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
                No se encontraron productos coincidentes en esta categoría.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <QuantityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedModalProduct}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div>Cargando Catálogo de Soteel...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
