'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Zap, ChevronUp, Phone, Truck, Shield, Search, ChevronLeft, ChevronRight, CreditCard, Store, ShoppingBag, Landmark, Hammer, ArrowRight, UserCheck } from 'lucide-react';
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
  isFavorite?: boolean;
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
    isFavorite: false,
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
    isFavorite: false,
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
    isFavorite: true,
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
    isFavorite: false,
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
    isFavorite: true,
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
    isFavorite: false,
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
    isFavorite: false,
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
    isFavorite: false,
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
    isFavorite: false,
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
    isFavorite: true,
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
    isFavorite: false,
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
    isFavorite: false,
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
    isFavorite: false,
  }
];

const HERO_SLIDES = [
  {
    subtitle: "Eficiencia y Potencia",
    title: <>Soluciones <span style={{ color: 'var(--primary)' }}>Fotovoltaicas</span> y Energía Solar</>,
    desc: "Encuentra inversores, paneles y cables diseñados para el máximo rendimiento de tus instalaciones de nuevas energías.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    subtitle: "Calidad Certificada",
    title: <>Conductores y <span style={{ color: 'var(--primary)' }}>Canalizaciones</span> Eléctricas</>,
    desc: "Cables de cobre y aluminio certificados, libres de halógeno para garantizar máxima seguridad y durabilidad en tus proyectos.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    subtitle: "Innovación y Confort",
    title: <>Domótica y <span style={{ color: 'var(--primary)' }}>Automatización</span> Inteligente</>,
    desc: "Lleva tu hogar u oficina al siguiente nivel con nuestras torres de enchufe motorizadas y dispositivos con integración Tuya Smart.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=80",
  }
];

export default function Home() {
  const { addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  // Estados para el Modal de Selección de Cantidad
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 312; // 280px width + 32px (2rem) gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current || filteredProducts.length === 0) return;
    const { scrollLeft, scrollWidth } = carouselRef.current;
    const singleWidth = scrollWidth / 5;

    // Si nos movemos muy a la izquierda (cerca de la copia 1), saltar a la derecha
    if (scrollLeft < singleWidth * 1.5) {
      carouselRef.current.scrollLeft = scrollLeft + singleWidth;
    }
    // Si nos movemos muy a la derecha (cerca de la copia 5), saltar a la izquierda
    else if (scrollLeft > singleWidth * 3.5) {
      carouselRef.current.scrollLeft = scrollLeft - singleWidth;
    }
  };

  // Inicializar scroll al centro (copia del medio de las 5 disponibles)
  useEffect(() => {
    if (carouselRef.current && filteredProducts.length > 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          const { scrollWidth } = carouselRef.current;
          carouselRef.current.scrollLeft = (scrollWidth / 5) * 2;
        }
      }, 100);
    }
  }, [products]);

  const handleModalConfirm = (quantity: number) => {
    if (selectedModalProduct) {
      addToCart(selectedModalProduct);
      if (quantity > 1) {
        updateQuantity(selectedModalProduct.id, quantity - 1);
      }
      setIsCartOpen(true);
    }
  };

  const goToSlide = (nextSlide: number) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(nextSlide);
  };

  // Intervalo para el carrusel infinito del Hero
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  // Ticker constante y ultra smooth hacia la izquierda (contenido desplazándose a la izquierda)
  useEffect(() => {
    if (isHovered || filteredProducts.length === 0) return;

    let animationId: number;
    const animate = () => {
      if (carouselRef.current) {
        // Avance constante de 0.8px por frame (desplazamiento continuo a la izquierda)
        carouselRef.current.scrollLeft += 0.8;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [products, isHovered]);

  // Cargar productos reales de la base de datos si existen
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((p: any, idx: number) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              category: p.category?.name || 'General',
              description: p.description || '',
              price: p.price,
              stock: p.stock,
              imageUrl: p.imageUrl,
              isFavorite: idx % 3 === 0,
            }));
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.warn('Usando catálogo fallback local:', err);
      }
    }
    fetchProducts();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Shared Header */}
      <Header onSearchChange={setSearchQuery} />

      {/* USP Ribbon */}
      <div className="usp-ribbon">
        <div className="usp-container">
          <div className="usp-item">
            <Truck size={16} className="usp-icon" />
            <span>Despacho rápido a todo Chile</span>
          </div>
          <div className="usp-item">
            <CreditCard size={16} className="usp-icon" />
            <span>3 Cuotas Sin Interés vía Webpay Plus</span>
          </div>
          <div className="usp-item">
            <Store size={16} className="usp-icon" />
            <span>Retiro en Tienda</span>
          </div>
          <div className="usp-item">
            <Phone size={16} className="usp-icon" />
            <span>Cotizaciones y Asistencia Técnica</span>
          </div>
        </div>
      </div>

      {/* Hero Banner (Ancho completo con Carrusel Deslizante Infinito) */}
      <section className="hero-carousel-wrapper">
        <div className="hero-slides-container">
          {HERO_SLIDES.map((slide, idx) => {
            let slideClass = '';
            if (idx === currentSlide) {
              slideClass = 'active';
            } else if (idx === prevSlide && prevSlide !== currentSlide) {
              slideClass = 'exit';
            } else {
              slideClass = 'next';
            }

            return (
              <div
                key={idx}
                className={`hero-slide ${slideClass}`}
              >
                {/* Fondo de imagen separado para aplicar zoom sin alterar el texto */}
                <div
                  className="hero-slide-bg"
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${slide.image}')` }}
                />
                <div className="hero-banner-content">
                  <span className="hero-subtitle-top">{slide.subtitle}</span>
                  <h2 className="hero-main-title">{slide.title}</h2>
                  <p className="hero-desc">{slide.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles Minimalistas en la Derecha (Flechas Grandes Blancas) */}
        <div className="carousel-controls-right-minimal">
          <button
            className="carousel-arrow-minimal"
            onClick={() => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            className="carousel-arrow-minimal"
            onClick={() => goToSlide((currentSlide + 1) % HERO_SLIDES.length)}
            aria-label="Siguiente slide"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      </section>

      {/* Destacados Section */}
      <main className="container" style={{ paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Nuestros <span style={{ color: 'var(--primary)' }}>Destacados</span></h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => scrollCarousel('left')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', backgroundColor: 'white', color: 'var(--secondary)', cursor: 'pointer', transition: 'var(--transition)' }}
              className="carousel-nav-btn"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', backgroundColor: 'white', color: 'var(--secondary)', cursor: 'pointer', transition: 'var(--transition)' }}
              className="carousel-nav-btn"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {searchQuery && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Resultados para "{searchQuery}"</div>}

        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="carousel-infinite-container"
            style={{
              display: 'flex',
              gap: '2rem',
              overflowX: 'auto',
              scrollSnapType: 'none',
              padding: '0.5rem 0.25rem 2.5rem',
              scrollBehavior: 'smooth'
            }}
          >
            {[...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts].map((product, idx) => (
              <article
                className="product-card"
                key={`${product.id}-${idx}`}
                style={{ flex: '0 0 280px' }}
              >
                {product.isFavorite && (
                  <div className="badge-favorite">Destacado</div>
                )}
                <Link href={`/productos/${product.slug}`} className="product-img-wrapper" style={{ display: 'block', cursor: 'pointer' }}>
                  {product.imageUrl ? (
                    <img
                      className="product-img"
                      src={product.imageUrl.replace('http://', 'https://')}
                      alt={product.name}
                    />
                  ) : (
                    <div className="product-placeholder">
                      <Zap size={24} style={{ marginBottom: '0.5rem' }} />
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
                  <Link href={`/productos/${product.slug}`} style={{ textDecoration: 'none' }}>
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
              <div style={{ flex: '1 0 100%', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                No se encontraron productos destacados.
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Link
            href="/productos"
            className="btn-primary ver-tienda-btn-home"
            style={{ fontSize: '0.9rem', padding: '0.75rem 2.5rem', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', borderRadius: 'var(--radius-sm)', color: '#ffffff', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }}
          >
            <Store size={16} /> Ver tienda
          </Link>
        </div>
      </main>

      {/* Cómo Comprar Section */}
      <section style={{ backgroundColor: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '0.75rem' }}>Cómo comprar</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>Realiza tus compras de forma fácil y 100% segura en cuatro simples pasos</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', position: 'relative' }}>
                <Search size={24} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Explora el catálogo</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Navega por nuestra selección de insumos, torres pop-up y tableros eléctricos certificados.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', position: 'relative' }}>
                <ShoppingBag size={24} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Elige tus productos</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Ajusta las cantidades que necesitas en nuestra ventana modal y agrégalas al carro de compras.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', position: 'relative' }}>
                <UserCheck size={24} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Datos y Facturación</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Rellena la información básica de despacho y facturación de manera segura.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', position: 'relative' }}>
                <CreditCard size={24} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Pago Seguro y Despacho</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Completa el pago vía Webpay con débito o crédito y retira en tienda o recibe a domicilio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section style={{ padding: '5rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '0.75rem' }}>Proyectos</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>Respaldando la infraestructura eléctrica de grandes empresas e instaladores autorizados a lo largo de todo Chile.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="project-card-home">
              <Landmark style={{ color: 'var(--primary)', marginBottom: '1.25rem' }} size={32} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Ingeniería Eje Central</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Suministro de torres de enchufe pop-up y canalizaciones eléctricas avanzadas para modernas oficinas corporativas en Las Condes.</p>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="project-card-home">
              <Zap style={{ color: 'var(--primary)', marginBottom: '1.25rem' }} size={32} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Instalaciones SEC Valparaíso</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Provisión de dispositivos de protección monofásica ATS y conductores de cobre certificados para proyectos de viviendas residenciales.</p>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="project-card-home">
              <Store style={{ color: 'var(--primary)', marginBottom: '1.25rem' }} size={32} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Solar del Sur SpA</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Apoyo en el equipamiento solar y conectores libres de halógeno para plantas de energía renovable no convencional de baja escala.</p>
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)' }} className="project-card-home">
              <Hammer style={{ color: 'var(--primary)', marginBottom: '1.25rem' }} size={32} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>Constructora Alto Santiago</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Alianza estratégica para el despacho programado de material de ferretería eléctrica e insumos de iluminación habitacional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        className="whatsapp-float"
        href="https://wa.me/56912345678"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <Phone size={24} style={{ fill: 'white' }} />
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Subir">
          <ChevronUp size={20} />
        </button>
      )}

      {/* Cart Drawer */}
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
