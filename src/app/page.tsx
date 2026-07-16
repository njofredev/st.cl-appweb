'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Zap, ChevronUp, Phone, Truck, Shield, Search, ChevronLeft, ChevronRight, CreditCard, Store, ShoppingBag, Landmark, Hammer, ArrowRight, UserCheck, FileText } from 'lucide-react';
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
  const [showMap, setShowMap] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);

  // Estados y Ref para animar al llegar con scroll el CTA de Tuya Smart
  const [isTuyaVisible, setIsTuyaVisible] = useState(false);
  const tuyaSectionRef = useRef<HTMLElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    // Sincronizar nuestra referencia flotante para evitar saltos al reanudar
    scrollPosRef.current = scrollLeft;

    const singleWidth = scrollWidth / 5;

    // Si nos movemos muy a la izquierda (cerca de la copia 1), saltar a la derecha
    if (scrollLeft < singleWidth * 1.5) {
      carouselRef.current.scrollLeft = scrollLeft + singleWidth;
      scrollPosRef.current = scrollLeft + singleWidth;
    }
    // Si nos movemos muy a la derecha (cerca de la copia 5), saltar a la izquierda
    else if (scrollLeft > singleWidth * 3.5) {
      carouselRef.current.scrollLeft = scrollLeft - singleWidth;
      scrollPosRef.current = scrollLeft - singleWidth;
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
    if (isHeroHovered) return;
    const slideTimer = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [currentSlide, isHeroHovered]);

  // Observador de intersección para animar la sección de Tuya Smart al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTuyaVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (tuyaSectionRef.current) {
      observer.observe(tuyaSectionRef.current);
    }

    return () => {
      if (tuyaSectionRef.current) {
        observer.unobserve(tuyaSectionRef.current);
      }
    };
  }, []);

  // Ticker constante y ultra smooth hacia la izquierda (contenido desplazándose a la izquierda)
  useEffect(() => {
    if (isHovered || filteredProducts.length === 0) return;

    let animationId: number;

    if (carouselRef.current) {
      scrollPosRef.current = carouselRef.current.scrollLeft;
    }

    const animate = () => {
      if (carouselRef.current) {
        // Incrementar la posición flotante precisa
        scrollPosRef.current += 0.35;
        // Asignarla al elemento (el navegador la redondeará internamente al pixel/subpixel pero mantendremos la fracción)
        carouselRef.current.scrollLeft = scrollPosRef.current;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [products, isHovered, filteredProducts.length]);

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
            <span>3 Cuotas Sin Interés vía <strong style={{ color: '#792688' }}>Webpay</strong> <strong style={{ color: '#cb137b' }}>Plus</strong></span>
          </div>
          <div className="usp-item">
            <Store size={16} className="usp-icon" />
            <span>Retiro en Bodega</span>
          </div>
          <div className="usp-item">
            <Phone size={16} className="usp-icon" />
            <span>Cotizaciones y Asistencia Técnica</span>
          </div>
        </div>
      </div>

      {/* Hero Banner (Ancho completo con Carrusel Deslizante Infinito) */}
      <section
        className="hero-carousel-wrapper"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
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
          <h2 className="section-title" style={{ margin: 0 }}>Productos <span style={{ color: 'var(--primary)' }}>Destacados</span></h2>
        </div>

        {searchQuery && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Resultados para "{searchQuery}"</div>}

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
        >
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="carousel-infinite-container"
            style={{
              display: 'flex',
              gap: '2rem',
              overflowX: 'auto',
              scrollSnapType: 'none',
              padding: '0.5rem 0.25rem 2.5rem'
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
      <section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5.5rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(227, 82, 5, 0.08)', color: 'var(--primary)', padding: '0.4rem 1.25rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
              Proceso de Compra y Cotización
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              ¿Cómo <span style={{ color: 'var(--primary)' }}>comprar</span> o <span style={{ color: 'var(--primary)' }}>cotizar</span> en Soteel?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
              Te ofrecemos dos canales rápidos e integrados para abastecer tus proyectos eléctricos de forma ágil y 100% segura.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>

            {/* PATH A: Compra Directa */}
            <div className="process-card-group" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(227, 82, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--secondary)', margin: 0 }}>Ruta 1: Compra Directa</h3>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Carro de Compras 100% Online</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Selecciona en Catálogo</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Navega por la tienda, ajusta las cantidades que necesitas en la ventana modal y agrégalas al carro.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Paga Seguro con Webpay</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Finaliza la transacción con tarjeta de débito o crédito mediante pasarela Webpay protegida de forma instantánea.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Despacho o Retiro en Sucursal</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Retira sin costo en nuestro punto de entrega La Reina o recibe a domicilio con despacho rápido a todo Chile.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link href="/productos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.85rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.88rem', textDecoration: 'none', transition: 'var(--transition)' }} className="btn-primary-hover-glow">
                  Explorar Tienda <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* PATH B: Cotización Formal */}
            <div className="process-card-group" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(227, 82, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--secondary)', margin: 0 }}>Ruta 2: Cotización Formal</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Presupuestos Rápidos en PDF</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Arma tu Lista de Materiales</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Agrega insumos a la planilla del cotizador profesional, introduce tus datos y configura el formato de tu cotización.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Genera y Descarga en PDF</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Revisa la hoja de cotización formateada para carta e imprímela o guárdala en formato PDF al instante sin costos.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', flexShrink: 0, marginTop: '2px' }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.35rem' }}>Coordina Pago y Despacho</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Envía el documento descargado para aprobación y coordina la facturación y entrega directamente con tu ejecutivo.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link href="/cotizador" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.85rem', backgroundColor: 'var(--secondary)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.88rem', textDecoration: 'none', transition: 'var(--transition)' }} className="btn-secondary-hover-glow">
                  Cotizar en Línea <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tuya Smart CTA Section */}
      <section ref={tuyaSectionRef} style={{ backgroundColor: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '5rem 2rem', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left Side: Info & Badges */}
            <div className={isTuyaVisible ? "animate-fade-up" : ""} style={{ opacity: isTuyaVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(227, 82, 5, 0.15)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                <Zap size={14} /> Smart Home
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', lineHeight: '1.15', marginBottom: '1.25rem' }}>
                Controla tus dispositivos <span style={{ color: 'var(--primary)' }}>Soteel Smart</span> desde tu celular
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Nuestras torres <strong>pop-up inteligentes</strong> y <strong>enchufes motorizados</strong> son totalmente compatibles con la aplicación <strong>Tuya Smart / Smart Life</strong>. Administra la energía de tus espacios, programa encendidos y monitorea el consumo de manera remota mediante conexión Wi-Fi de forma ágil y 100% integrada.
              </p>

              {/* Badges container */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="https://apps.apple.com/es/app/tuya-smart-life-smart-living/id1034649547"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', height: '46px', width: '138px', transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src="/appstore_badge.png"
                    alt="Descargar en App Store"
                    style={{ height: '46px', width: '138px', display: 'block', borderRadius: '5px' }}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.tuya.smart&hl=es_CL"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', height: '52px', width: '140px', transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src="/playstore_badge.png"
                    alt="Descargar en Google Play Store"
                    style={{ height: '52px', width: '140px', display: 'block', borderRadius: '5px' }}
                  />
                </a>
              </div>
            </div>

            {/* Right Side: Tuya App Image Display */}
            <div style={{ display: 'flex', justifyContent: 'center', opacity: isTuyaVisible ? 1 : 0, transition: 'opacity 0.3s ease' }} className={isTuyaVisible ? "animate-scale-up" : ""}>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '380px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <img
                  src="/tuya_app_display.jpg"
                  alt="Tuya Smart Application Control"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sucursal de Entrega Section */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)', padding: '5.5rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(227, 82, 5, 0.08)', color: 'var(--primary)', padding: '0.4rem 1.25rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
              Punto de Retiro Oficial
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              Retira tus compras en <span style={{ color: 'var(--primary)' }}>Mr.Storage</span> La Reina
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
              Visítanos para retirar tus pedidos web sin costo de envío o coordinar tus proyectos directamente en nuestro punto de entrega.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3.5rem', alignItems: 'stretch' }}>
            {/* Google Maps / Photo Display Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem', width: 'fit-content' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {showMap ? 'Mapa de Ubicación' : 'Vista de la Sucursal'}
                </span>
              </div>
              <div style={{ flex: 1, minHeight: '350px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
                {showMap ? (
                  <>
                    <iframe
                      src="https://maps.google.com/maps?cid=327407928017815889&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '350px', display: 'block' }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mr. Storage La Reina Location Map"
                    ></iframe>
                    <button
                      onClick={() => setShowMap(false)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '30px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transition: 'var(--transition)'
                      }}
                      className="btn-secondary-hover-glow"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      Ver Foto
                    </button>
                  </>
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '350px' }}>
                    <img
                      src="/mr-storage-la-reina-2.webp"
                      alt="Mr. Storage La Reina Sucursal de Entrega"
                      style={{ width: '100%', height: '100%', minHeight: '350px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      zIndex: 10
                    }}>
                      <button
                        onClick={() => setShowMap(true)}
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '50px',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 4px 15px rgba(227, 82, 5, 0.4)',
                          transition: 'var(--transition-spring)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                        className="btn-primary-hover-glow"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
                        Ver Mapa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Branch Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                  Detalles del Punto de Retiro
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(227, 82, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dirección</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Av. Jorge Alessandri Rodríguez 364, La Reina, Región Metropolitana (Complejo Mr. Storage, Bodega Soteel).</p>
                    </div>
                  </li>

                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(227, 82, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Horario de Atención</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Lunes a Viernes: 9:00 hrs a 18:00 hrs (Horario continuado). Sábados, domingos y festivos cerrado.</p>
                    </div>
                  </li>

                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(227, 82, 5, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instrucciones de Retiro</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>Estacionamiento gratuito disponible. Presenta tu número de cotización o boleta en portería y dirígete al sector de entregas.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.google.com/maps?cid=327407928017815889"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none', transition: 'var(--transition)' }}
                  className="btn-primary-hover-glow"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
                  Cómo Llegar
                </a>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none' }}
                  className="btn-whatsapp-style"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  Coordinar Retiro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Section */}
      <section style={{ padding: '5.5rem 2rem', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(227, 82, 5, 0.08)', color: 'var(--primary)', padding: '0.4rem 1.25rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
              Proyectos de Confianza
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              Nuestros <span style={{ color: 'var(--primary)' }}>Clientes</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
              Nos enorgullece colaborar con empresas líderes en el rubro inmobiliario y de construcción, garantizando insumos eléctricos de la más alta calidad.
            </p>
          </div>

          <div className="logo-ticker-container">
            <div className="logo-ticker-track">
              {/* Slide 1: Wood */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/wood-logo.svg" alt="Wood Inmobiliaria" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 2: NALP */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/nalp-logo.svg" alt="NALP Constructora" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 3: Fuegos */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/fuegos-logo.svg" alt="Fuegos" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 4: Proyekta */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/proyekta-logo.svg" alt="Proyekta" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 5: Espiral */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/espiral-logo.svg" alt="Espiral" className="ticker-logo-img" />
                </div>
              </div>

              {/* Duplicado para Scroll Infinito */}
              {/* Slide 6: Wood */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/wood-logo.svg" alt="Wood Inmobiliaria" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 7: NALP */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/nalp-logo.svg" alt="NALP Constructora" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 8: Fuegos */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/fuegos-logo.svg" alt="Fuegos" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 9: Proyekta */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/proyekta-logo.svg" alt="Proyekta" className="ticker-logo-img" />
                </div>
              </div>

              {/* Slide 10: Espiral */}
              <div className="ticker-logo-card">
                <div className="ticker-logo-img-wrapper">
                  <img src="/espiral-logo.svg" alt="Espiral" className="ticker-logo-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Shared Footer */}
      <Footer />



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
