'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Zap, Shield, Plus, Minus, ArrowLeft, CheckCircle2, Award, Truck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

// Función para parsear, limpiar duplicados y separar la instalación
function parseProductDescription(desc: string) {
  if (!desc) return { cleanDesc: '', installation: '' };
  
  // Normalizar saltos de línea escapados
  let normalized = desc.replaceAll('\\n', '\n');

  // Eliminar etiquetas y descargas de Ficha Técnica
  let cleaned = normalized
    .replace(/Descargar Ficha técnica/gi, '')
    .replace(/Ficha técnica/gi, '')
    .trim();
    
  let cleanDesc = cleaned;
  let installation = '';
  
  // Separar sección de instalación
  const installIndex = cleaned.search(/Instalación:/i);
  if (installIndex !== -1) {
    cleanDesc = cleaned.substring(0, installIndex).trim();
    // Extraer todo el contenido después de "Instalación:"
    installation = cleaned.substring(installIndex + 12).trim();
  }
  
  // Limpiar duplicaciones si existe la palabra "Descripción:"
  const descHeaderIndex = cleanDesc.search(/Descripción:/i);
  if (descHeaderIndex !== -1) {
    cleanDesc = cleanDesc.substring(0, descHeaderIndex).trim();
  }
  
  return { cleanDesc, installation };
}

const FALLBACK_PRODUCTS: Product[] = [
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

function getTechnicalSpecs(productName: string): { label: string; value: string }[] {
  const name = productName.toLowerCase();
  const specs: { label: string; value: string }[] = [];

  if (name.includes('enchufe de piso')) {
    specs.push(
      { label: 'Tipo de Instalación', value: 'Empotrable en Piso/Losa' },
      { label: 'Material', value: 'Aleación Metálica Inoxidable de Alta Resistencia' },
      { label: 'Toma Corriente', value: '10/16A 250V~ Estándar Chileno' },
      { label: 'Grado de Protección', value: 'IP44 (Cerrado)' },
      { label: 'Puestos / Módulos', value: name.includes('4') ? '4 Módulos independientes' : '2 Módulos independientes' }
    );
  } else if (name.includes('torre de enchufe') || name.includes('torre enchufe')) {
    specs.push(
      { label: 'Sistema de Apertura', value: name.includes('motorizado') ? 'Motorizado automático One-Touch' : name.includes('neumatico') ? 'Amortiguación Neumática Pop-up' : 'Manual Retráctil' },
      { label: 'Material Chasis', value: 'Aluminio Reforzado Anodizado y ABS Ignífugo' },
      { label: 'Tomas de Corriente', value: name.includes('3 tomas') || name.includes('3') ? '3 Tomas 10/16A 250V~' : '2 Tomas 10/16A 250V~' },
      { label: 'Carga USB', value: '2 Puertos USB-A 5V 2.1A' },
      { label: 'Cargador Inalámbrico', value: name.includes('cargador inalambrico') || name.includes('wireless') ? 'Qi Wireless Fast Charge 10W (en tapa superior)' : 'No aplica' },
      { label: 'Conectividad Bluetooth', value: name.includes('parlante bluetooth') ? 'Parlante Bluetooth 5.0 Estéreo integrado' : 'No aplica' },
      { label: 'Integración Smart (Wi-Fi)', value: name.includes('tuya') ? 'Compatible con App Tuya Smart / Alexa / Google Home' : 'No aplica' },
      { label: 'Diámetro de Perforación', value: '100 mm' }
    );
  } else if (name.includes('cargador inalámbrico') || name.includes('cargador inalambrico')) {
    specs.push(
      { label: 'Tipo', value: 'Cargador de Cubierta Empotrable' },
      { label: 'Tecnología Wireless', value: 'Qi Wireless Fast Charge 10W/15W' },
      { label: 'Puertos Físicos', value: '1x USB-A (QuickCharge) + 1x USB-C (Power Delivery)' },
      { label: 'Diámetro de Perforación', value: '80 mm estándar' },
      { label: 'Material', value: 'Plástico ABS ignífugo con superficie antideslizante' }
    );
  } else if (name.includes('transferencia')) {
    specs.push(
      { label: 'Tipo de Dispositivo', value: 'Interruptor de Transferencia Automática (ATS)' },
      { label: 'Corriente Nominal', value: '63A' },
      { label: 'Voltaje Nominal', value: '220V AC 50Hz (Monofásico)' },
      { label: 'Tiempo de Conmutación', value: '< 8 milisegundos' },
      { label: 'Tipo de Montaje', value: 'Riel DIN Standard 35mm' },
      { label: 'Modos de Control', value: 'Manual y Automático' }
    );
  } else if (name.includes('ordenador')) {
    specs.push(
      { label: 'Tipo', value: 'Organizador Flexible de Cables para Escritorio' },
      { label: 'Material', value: 'Polímero articulado ABS libre de halógenos' },
      { label: 'Longitud', value: '750 mm ajustable' },
      { label: 'Base de Soporte', value: 'Base metálica pesada auto-estabilizante' }
    );
  } else if (name.includes('toma de enchufe multifuncional')) {
    specs.push(
      { label: 'Tipo', value: 'Caja Organizadora y Multitoma premium' },
      { label: 'Material', value: 'Polímero reforzado e ignífugo' },
      { label: 'Configuración', value: 'Multitoma integrada de alta resistencia' }
    );
  } else {
    specs.push(
      { label: 'Modelo/Código', value: 'STL-Serie Profesional' },
      { label: 'Material de Fabricación', value: 'Materiales certificados de grado industrial' },
      { label: 'Certificación de Seguridad', value: 'Protocolos SEC (Superintendencia de Electricidad y Combustibles)' }
    );
  }

  return specs;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart, updateQuantity, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dbLoading, setDbLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'specs' | 'safety' | 'shipping'>('specs');

  useEffect(() => {
    async function fetchProductData() {
      try {
        setDbLoading(true);
        const res = await fetch(`/api/products`);
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
            setAllProducts(mapped);
            
            const found = mapped.find((p: any) => p.slug === slug);
            if (found) {
              setProduct(found);
              setDbLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('DB no disponible, usando fallback local.');
      }
      
      const localFound = FALLBACK_PRODUCTS.find(p => p.slug === slug);
      if (localFound) {
        setProduct(localFound);
      }
      setDbLoading(false);
    }
    
    if (slug) fetchProductData();
  }, [slug]);

  if (dbLoading) {
    return (
      <>
        <Header />
        <div className="container" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
          <div className="loading-spinner" style={{ border: '3px solid rgba(255, 115, 0, 0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Cargando ficha técnica del producto...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
          <AlertTriangle size={48} style={{ color: 'var(--primary)', marginBottom: '1.5rem', margin: '0 auto' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)' }}>Producto no encontrado</h2>
          <p style={{ margin: '1rem auto 2rem', maxWidth: '400px', color: 'var(--text-muted)' }}>Lo sentimos, no pudimos localizar el insumo eléctrico o accesorio solicitado.</p>
          <Link href="/productos" className="btn-primary" style={{ padding: '0.8rem 2rem', textDecoration: 'none' }}>Volver al Catálogo</Link>
        </div>
        <Footer />
      </>
    );
  }

  const specs = getTechnicalSpecs(product.name);
  const { cleanDesc, installation } = parseProductDescription(product.description);
  
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQtyChange = (delta: number) => {
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) {
        alert(`Stock máximo disponible es ${product.stock}`);
        return product.stock;
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    addToCart(product);
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <>
      <Header />

      <main className="container" style={{ padding: '3.5rem 2rem' }}>
        <Link href="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2.5rem', transition: 'var(--transition)' }} className="back-link-hover">
          <ArrowLeft size={14} /> Volver al catálogo de insumos
        </Link>

        <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/3', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
              {product.imageUrl ? (
                <img src={product.imageUrl.replace('http://', 'https://')} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }} className="zoom-on-hover" />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Zap size={72} style={{ color: 'var(--primary)', marginBottom: '1.5rem', margin: '0 auto' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--secondary)' }}>SOTEEL INSUMOS</span>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>Ficha Técnica en Preparación</p>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)' }}>Original Soteel</h4>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Calidad garantizada</p>
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Truck size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)' }}>Despacho Seguro</h4>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Envíos a todo Chile</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', fontWeight: '800', marginBottom: '0.5rem' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 850, color: 'var(--secondary)', lineHeight: '1.25', marginBottom: '1rem' }}>
              {product.name}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span className="price-tag" style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--secondary)' }}>
                ${product.price.toLocaleString('es-CL')}
              </span>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--success-light)', color: 'var(--success-dark)', fontWeight: '800', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                IVA incluido
              </span>
            </div>

            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
              {cleanDesc}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: product.stock > 0 ? 'var(--success)' : 'var(--error)', marginBottom: '2.5rem' }}>
              <CheckCircle2 size={16} /> 
              <span>{product.stock > 0 ? `En Stock: ${product.stock} unidades listas para despacho` : 'Agotado Temporalmente'}</span>
            </div>

            {product.stock > 0 && (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-alt)', overflow: 'hidden' }}>
                  <button onClick={() => handleQtyChange(-1)} style={{ background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', color: 'var(--secondary)', display: 'flex', alignItems: 'center' }} aria-label="Disminuir"><Minus size={12} /></button>
                  <span style={{ width: '35px', textAlign: 'center', fontSize: '0.95rem', fontWeight: '800', color: 'var(--secondary)' }}>{quantity}</span>
                  <button onClick={() => handleQtyChange(1)} style={{ background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer', color: 'var(--secondary)', display: 'flex', alignItems: 'center' }} aria-label="Aumentar"><Plus size={12} /></button>
                </div>
                <button
                  className="checkout-btn"
                  onClick={handleAddToCart}
                  style={{ flex: 1, padding: '0.9rem', fontSize: '0.95rem', fontWeight: '800' }}
                >
                  Agregar al Carro de Compras
                </button>
              </div>
            )}

            <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }}>
              <Shield size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.15rem' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.25rem' }}>Garantía Técnica SOTEEL</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Este dispositivo cumple con las normativas e instrucciones técnicas chilenas para instalaciones eléctricas residenciales y comerciales de alto estándar.</p>
              </div>
            </div>

          </div>
        </div>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
            <button 
              onClick={() => setActiveTab('specs')}
              style={{ padding: '0.75rem 0.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'specs' ? '2.5px solid var(--primary)' : '2.5px solid transparent', color: activeTab === 'specs' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: activeTab === 'specs' ? 'bold' : '500', fontSize: '0.95rem', cursor: 'pointer', transition: 'var(--transition)' }}
            >
              Ficha Técnica
            </button>
            <button 
              onClick={() => setActiveTab('safety')}
              style={{ padding: '0.75rem 0.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'safety' ? '2.5px solid var(--primary)' : '2.5px solid transparent', color: activeTab === 'safety' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: activeTab === 'safety' ? 'bold' : '500', fontSize: '0.95rem', cursor: 'pointer', transition: 'var(--transition)' }}
            >
              Instalación y Seguridad
            </button>
            <button 
              onClick={() => setActiveTab('shipping')}
              style={{ padding: '0.75rem 0.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'shipping' ? '2.5px solid var(--primary)' : '2.5px solid transparent', color: activeTab === 'shipping' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: activeTab === 'shipping' ? 'bold' : '500', fontSize: '0.95rem', cursor: 'pointer', transition: 'var(--transition)' }}
            >
              Despachos y Garantías
            </button>
          </div>

          <div style={{ padding: '0.5rem' }}>
            {activeTab === 'specs' && (
              <div className="tab-pane">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem' }}>Especificaciones del Producto</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'var(--surface-alt)' : 'transparent' }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--secondary)', width: '35%' }}>{spec.label}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="tab-pane" style={{ lineHeight: '1.6', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {installation && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
                      Instrucciones de Instalación
                    </h3>
                    <div style={{ whiteSpace: 'pre-line', padding: '1.25rem', backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                      {installation}
                    </div>
                  </div>
                )}
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={18} style={{ color: 'var(--primary)' }} /> Recomendaciones Generales de Seguridad
                </h3>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><strong>Personal Autorizado:</strong> Se recomienda encarecidamente que la instalación de dispositivos empotrables (torres pop-up, enchufes de piso) sea efectuada por un instalador eléctrico certificado por la SEC.</li>
                  <li><strong>Desconexión Previa:</strong> Antes de manipular, cablear o instalar cualquiera de estos productos, asegúrese de interrumpir el suministro de energía eléctrica desde el tablero general (automático principal).</li>
                  <li><strong>Humedad y Salpicaduras:</strong> Evite la instalación de enchufes y torres en áreas propensas a acumulación directa de agua o humedad excesiva sin la debida canalización estanca.</li>
                  <li><strong>Capacidad Eléctrica:</strong> Respete los valores nominales de amperaje especificados en la ficha técnica para prevenir sobrecargas en la red domiciliaria.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane" style={{ lineHeight: '1.6', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>Políticas de Despacho y Devoluciones</h3>
                <p style={{ marginBottom: '1rem' }}>En <strong>SOTEEL</strong> gestionamos tus pedidos con rapidez y seguridad para que tus proyectos no se detengan:</p>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><strong>Cobertura de Envíos:</strong> Realizamos despachos a todo Chile a través de servicios courier líderes y transporte certificado.</li>
                  <li><strong>Plazos de Entrega:</strong> Los despachos dentro de la Región Metropolitana se realizan en un plazo de 24 a 48 horas hábiles. Para otras regiones, el plazo estimado es de 3 a 5 días hábiles.</li>
                  <li><strong>Garantía Legal:</strong> Todos nuestros insumos y productos cuentan con garantía legal de 6 meses frente a defectos de fabricación, presentando tu boleta o factura de compra.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '2rem' }}>
              Productos recomendados
            </h2>
            <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {relatedProducts.map((p) => (
                <article className="product-card" key={p.id}>
                  <Link href={`/productos/${p.slug}`} className="product-img-wrapper" style={{ display: 'block', cursor: 'pointer' }}>
                    {p.imageUrl ? (
                      <img className="product-img" src={p.imageUrl.replace('http://', 'https://')} alt={p.name} />
                    ) : (
                      <div className="product-placeholder">
                        <Zap size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>SOTEEL</span>
                      </div>
                    )}
                  </Link>
                  <div className="product-info">
                    <span className="product-category">{p.category}</span>
                    <Link href={`/productos/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                      <h3 className="product-name" style={{ cursor: 'pointer' }}>{p.name}</h3>
                    </Link>
                    <span className="product-price">${p.price.toLocaleString('es-CL')}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(p)}
                    >
                      Añadir al carro
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
