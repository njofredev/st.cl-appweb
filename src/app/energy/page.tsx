'use client';

import { useState } from 'react';
import { 
  Shield, 
  Workflow, 
  Wrench, 
  FileCheck, 
  Sun, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Send,
  Building,
  ClipboardCheck,
  TrendingUp,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export default function SoteelEnergyPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [service, setService] = useState('Ingeniería');
  const [submitted, setSubmitted] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
      alert('¡Gracias! Tu solicitud de cotización ha sido recibida por la división de Energía.');
    }, 1200);
  };

  const servicesData = [
    {
      num: "01",
      title: "Ingeniería & Consultoría Eléctrica",
      desc: "Diseño integral de redes de baja y media tensión, coordinación de protecciones y control de proyectos mediante carta Gantt avanzada y software de simulación.",
      tags: ["Planos Autocad", "Carta Gantt", "Cálculo de Cargas"],
      icon: <Workflow size={24} />
    },
    {
      num: "02",
      title: "Construcción & Montaje Industrial",
      desc: "Instalación de subestaciones eléctricas, tendido de alimentadores principales, tableros generales de distribución y canalizaciones industriales pesadas con maquinarias idóneas.",
      tags: ["Tableros Generales", "Subestaciones", "Media Tensión"],
      icon: <Wrench size={24} />
    },
    {
      num: "03",
      title: "Normalizaciones & Inspecciones ITO",
      desc: "Evaluación técnica independiente de obras eléctricas en ejecución o existentes. Levantamiento de observaciones e informes de mejoras termográficas y de puesta a tierra.",
      tags: ["Informes Técnicos", "ITO", "Termografías"],
      icon: <Shield size={24} />
    },
    {
      num: "04",
      title: "Energías Renovables ERNC / Netbilling",
      desc: "Desarrollo completo de plantas generadoras solares fotovoltaicas residenciales y comerciales bajo la Ley de Netbilling 20.571, inyectando excedentes a la red.",
      tags: ["Paneles Fotovoltaicos", "Inversores", "Certificación TE-4"],
      icon: <Sun size={24} />
    },
    {
      num: "05",
      title: "Infraestructura para Electromovilidad",
      desc: "Diseño, montaje y puesta en marcha de cargadores de vehículos eléctricos para flotas comerciales o residenciales de acuerdo al Pliego Técnico RIC 15 de la SEC.",
      tags: ["Cargadores Inteligentes", "Pliego RIC 15", "TE-6 SEC"],
      icon: <Zap size={24} />
    }
  ];

  const inlineStyles = `
    /* Technical typography and layout in Light Mode */
    .blueprint-hero {
      padding: 6rem 2rem;
      border-bottom: 1px solid var(--energy-border);
      position: relative;
    }

    .blueprint-grid-title {
      font-size: 0.75rem;
      font-family: monospace;
      color: var(--energy-primary);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .blueprint-grid-title::before {
      content: '//';
      font-weight: bold;
    }

    .blueprint-hero-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    @media (max-width: 992px) {
      .blueprint-hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .editorial-heading {
      font-size: 3.8rem;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -1.5px;
      color: var(--energy-secondary);
      margin: 0 0 1.5rem 0;
    }

    .editorial-heading span {
      font-weight: 400;
      color: #64748b;
      display: block;
      font-size: 2.8rem;
      letter-spacing: -0.5px;
      margin-top: 0.5rem;
    }

    @media (max-width: 576px) {
      .editorial-heading {
        font-size: 2.5rem;
      }
      .editorial-heading span {
        font-size: 1.8rem;
      }
    }

    .editorial-paragraph {
      font-size: 1.05rem;
      line-height: 1.7;
      color: #475569;
      margin: 0 0 2.5rem 0;
      max-width: 600px;
    }

    /* Technical details display card (Light Version) */
    .tech-console-card {
      border: 1px solid var(--energy-border);
      border-radius: 12px;
      background-color: #f8fafc;
      padding: 2rem;
      position: relative;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
    }

    .tech-console-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--energy-border);
      padding-bottom: 0.85rem;
      margin-bottom: 1.5rem;
      font-family: monospace;
      font-size: 0.7rem;
      color: #64748b;
    }

    .tech-console-header span.tag {
      color: var(--energy-primary);
      font-weight: bold;
    }

    .console-spec-row {
      display: flex;
      justify-content: space-between;
      padding: 0.65rem 0;
      border-bottom: 1px dashed var(--energy-border);
      font-size: 0.85rem;
    }

    .console-spec-row:last-child {
      border-bottom: none;
    }

    .console-spec-label {
      color: #64748b;
      font-family: monospace;
    }

    .console-spec-val {
      color: var(--energy-secondary);
      font-weight: 700;
    }

    /* SCROLLING SECTIONS */
    .energy-section-blueprint {
      padding: 7rem 2rem;
      border-bottom: 1px solid var(--energy-border);
    }

    .section-editorial-header {
      max-width: 1200px;
      margin: 0 auto 5rem auto;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 3rem;
      align-items: flex-end;
    }

    @media (max-width: 768px) {
      .section-editorial-header {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 3rem;
      }
    }

    .section-editorial-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--energy-secondary);
      letter-spacing: -0.5px;
      margin: 0;
      line-height: 1.1;
    }

    .section-editorial-desc {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    /* INTERACTIVE HORIZONTAL ROW SERVICES */
    .services-rows-container {
      max-width: 1200px;
      margin: 0 auto;
      border-top: 1px solid var(--energy-border);
    }

    .service-row-item {
      display: flex;
      padding: 2.5rem 0;
      border-bottom: 1px solid var(--energy-border);
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
      gap: 2rem;
    }

    .service-row-left {
      width: 80px;
      font-size: 1.5rem;
      font-weight: 300;
      font-family: monospace;
      color: #94a3b8;
      transition: color 0.25s ease;
    }

    .service-row-middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .service-row-middle h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--energy-secondary);
      margin: 0;
      transition: color 0.25s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .service-row-icon {
      color: #94a3b8;
      transition: color 0.25s ease, transform 0.25s ease;
    }

    .service-row-body-expand {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.6;
      max-width: 750px;
    }

    .service-row-item.active {
      padding-bottom: 3.5rem;
    }

    .service-row-item.active .service-row-left {
      color: var(--energy-primary);
    }

    .service-row-item.active .service-row-middle h3 {
      color: var(--energy-primary);
    }

    .service-row-item.active .service-row-icon {
      color: var(--energy-primary);
      transform: rotate(45deg);
    }

    .service-row-item.active .service-row-body-expand {
      max-height: 150px;
      opacity: 1;
      margin-top: 1rem;
    }

    .service-row-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 1rem;
    }

    .service-row-tag {
      font-size: 0.7rem;
      font-weight: 700;
      color: #475569;
      background-color: #f1f5f9;
      border: 1px solid var(--energy-border);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    /* SEC DECLARATIONS LAYOUT */
    .sec-block-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 992px) {
      .sec-block-grid {
        grid-template-columns: 1fr;
      }
    }

    .sec-spec-card {
      background-color: #ffffff;
      border: 1px solid var(--energy-border);
      border-radius: 12px;
      padding: 2.25rem 2rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .sec-spec-card:hover {
      border-color: var(--energy-primary);
      box-shadow: 0 10px 30px rgba(227, 82, 5, 0.04);
    }

    .sec-spec-card .code-label {
      font-family: monospace;
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--energy-primary);
      margin-bottom: 0.5rem;
    }

    .sec-spec-card h3 {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--energy-secondary);
      margin: 0 0 1rem 0;
      line-height: 1.4;
    }

    .sec-spec-card p {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    /* PORTFOLIO ASYMMETRIC GRID */
    .projects-editorial-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
    }

    @media (max-width: 992px) {
      .projects-editorial-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .project-editorial-item {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .project-image-box {
      background-color: #f1f5f9;
      border: 1px solid var(--energy-border);
      border-radius: 14px;
      overflow: hidden;
      aspect-ratio: 16/10;
      position: relative;
    }

    .project-tag-float {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background-color: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(4px);
      color: #ffffff;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 0.3rem 0.75rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .project-image-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.95;
      transition: all 0.5s ease;
    }

    .project-editorial-item:hover .project-image-box img {
      transform: scale(1.05);
      opacity: 1;
    }

    .project-meta-top {
      display: flex;
      justify-content: space-between;
      font-family: monospace;
      font-size: 0.72rem;
      color: #64748b;
    }

    .project-meta-top span.client {
      color: var(--energy-primary);
      font-weight: bold;
    }

    .project-editorial-item h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--energy-secondary);
      margin: 0;
    }

    .project-editorial-item p {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }

    /* LIGHT MINIMALIST FORM */
    .form-container-technical {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 4rem;
    }

    @media (max-width: 992px) {
      .form-container-technical {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .form-tech-fields {
      background-color: #ffffff;
      border: 1px solid var(--energy-border);
      border-radius: 14px;
      padding: 3rem;
      box-sizing: border-box;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
    }

    @media (max-width: 576px) {
      .form-tech-fields {
        padding: 1.75rem;
      }
    }

    .form-tech-input-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 576px) {
      .form-tech-input-group {
        grid-template-columns: 1fr;
      }
    }

    .form-tech-field {
      display: flex;
      flex-direction: column;
    }

    .form-tech-field label {
      font-family: monospace;
      font-size: 0.68rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }

    .form-tech-input {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
      font-family: inherit;
      color: var(--energy-secondary);
      transition: all 0.25s ease;
    }

    .form-tech-input:focus {
      outline: none;
      border-color: var(--energy-primary);
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(227, 82, 5, 0.12);
    }

    .btn-tech-submit {
      background-color: var(--energy-primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 0.9rem 2rem;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      box-shadow: 0 4px 12px rgba(227, 82, 5, 0.15);
    }

    .btn-tech-submit:hover:not(:disabled) {
      background-color: var(--energy-primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(227, 82, 5, 0.25);
    }
  `;

  return (
    <div className="energy-page-root">
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

      {/* 1. HERO SECTION */}
      <section id="inicio" className="blueprint-hero">
        <div className="blueprint-hero-content">
          <div>
            <div className="blueprint-grid-title">
              Soteel Energy División
            </div>
            <h1 className="editorial-heading">
              Ingeniería y Proyectos 
              <span>Eléctricos Industriales</span>
            </h1>
            <p className="editorial-paragraph">
              Desarrollamos soluciones integrales de montaje industrial, energías renovables no convencionales (ERNC), normalizaciones y consultoría especializada de alto nivel.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#contacto" className="btn-tech-submit" style={{ width: 'auto', textDecoration: 'none' }}>
                Cotizar Proyecto <ArrowRight size={16} />
              </a>
              <a href="#servicios" className="energy-nav-item" style={{ borderBottom: 'none', color: '#64748b', textDecoration: 'none' }}>
                Conocer Servicios ➔
              </a>
            </div>
          </div>

          <div>
            <div className="tech-console-card">
              <div className="tech-console-header">
                <span>ESTADO DE OPERACIÓN</span>
                <span className="tag">// ACTIVO</span>
              </div>
              
              <div className="console-spec-row">
                <span className="console-spec-label">Proyectos ejecutados</span>
                <span className="console-spec-val">45+</span>
              </div>
              
              <div className="console-spec-row">
                <span className="console-spec-label">Aprobación SEC</span>
                <span className="console-spec-val">100%</span>
              </div>

              <div className="console-spec-row">
                <span className="console-spec-label">Contratos en marcha</span>
                <span className="console-spec-val">6 Activos</span>
              </div>

              <div className="console-spec-row">
                <span className="console-spec-label">Colaboradores</span>
                <span className="console-spec-val">100 en Terreno</span>
              </div>

              <div className="console-spec-row">
                <span className="console-spec-label">Cobertura técnica</span>
                <span className="console-spec-val">Nivel Nacional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (HORIZONTAL INTERACTIVE ROWS) */}
      <section id="servicios" className="energy-section-blueprint">
        <div className="section-editorial-header">
          <div>
            <span className="blueprint-grid-title">02. Qué hacemos</span>
            <h2 className="section-editorial-title">Áreas de Experiencia</h2>
          </div>
          <p className="section-editorial-desc">
            Diseñamos e implementamos sistemas de distribución eléctrica y energías renovables, alineados estrictamente con las regulaciones SEC y exigencias internacionales.
          </p>
        </div>

        <div className="services-rows-container">
          {servicesData.map((s, index) => (
            <div 
              key={index} 
              className={`service-row-item ${activeRow === index ? 'active' : ''}`}
              onClick={() => setActiveRow(activeRow === index ? null : index)}
            >
              <div className="service-row-left">
                {s.num}
              </div>
              <div className="service-row-middle">
                <h3>
                  {s.title}
                  <span className="service-row-icon">➔</span>
                </h3>
                
                <div className="service-row-body-expand">
                  <p style={{ margin: 0 }}>{s.desc}</p>
                  <div className="service-row-tags">
                    {s.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="service-row-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEC SECTION */}
      <section id="sec" className="energy-section-blueprint">
        <div className="section-editorial-header">
          <div>
            <span className="blueprint-grid-title">03. Regulaciones</span>
            <h2 className="section-editorial-title">Trámites y Acreditación SEC</h2>
          </div>
          <p className="section-editorial-desc">
            Realizamos el proceso completo de ingeniería, presentación de documentos, pruebas en terreno y tramitación oficial ante la SEC para garantizar la seguridad de su obra.
          </p>
        </div>

        <div className="sec-block-grid">
          {/* TE1 */}
          <div className="sec-spec-card">
            <span className="code-label">TE1</span>
            <h3>Declaración de Instalaciones de Alumbrado y Fuerza</h3>
            <p>
              Obligatorio para la obtención de patentes municipales, aumentos de capacidad de empalmes y recepción final de edificaciones residenciales o comerciales.
            </p>
          </div>

          {/* TE4 */}
          <div className="sec-spec-card">
            <span className="code-label">TE4</span>
            <h3>Declaración Netbilling (Ley 20.571)</h3>
            <p>
              Habilita de forma legal la inyección de excedentes de energía generados por sistemas fotovoltaicos o eólicos a la red de distribución eléctrica.
            </p>
          </div>

          {/* TE6 */}
          <div className="sec-spec-card">
            <span className="code-label">TE6</span>
            <h3>Infraestructura de Electromovilidad</h3>
            <p>
              Declaración técnica obligatoria para la puesta en servicio de cargadores y electrolineras de vehículos eléctricos de acuerdo al Pliego RIC 15.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="proyectos" className="energy-section-blueprint">
        <div className="section-editorial-header">
          <div>
            <span className="blueprint-grid-title">04. Obras</span>
            <h2 className="section-editorial-title">Proyectos Ejecutados</h2>
          </div>
          <p className="section-editorial-desc">
            Revisa algunos de los desafíos de ingeniería eléctrica y energías renovables desarrollados con éxito por nuestra división.
          </p>
        </div>

        <div className="projects-editorial-grid">
          {/* Proyecto 1: BMW Bilbao */}
          <div className="project-editorial-item">
            <div className="project-image-box">
              <span className="project-tag-float">Fuerza & Tableros</span>
              <img 
                src="https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&w=600&q=80" 
                alt="BMW Francisco Bilbao" 
              />
            </div>
            <div className="project-meta-top">
              <span>PROYECTO: MONTAJE</span>
              <span className="client">CLIENTE: BMW CHILE</span>
            </div>
            <h3>Habilitación Eléctrica Integral Francisco Bilbao</h3>
            <p>
              Diseño, canalizaciones, cableado y habilitación eléctrica de salas de venta, oficinas comerciales y talleres automotrices de BMW en Providencia.
            </p>
          </div>

          {/* Proyecto 2: BMW Electromovilidad */}
          <div className="project-editorial-item" style={{ marginTop: '2.5rem' }}>
            <div className="project-image-box">
              <span className="project-tag-float">Electromovilidad</span>
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" 
                alt="Cargadores BMW" 
              />
            </div>
            <div className="project-meta-top">
              <span>PROYECTO: ELECTRO-MOVILIDAD</span>
              <span className="client">CLIENTE: BMW CHILE</span>
            </div>
            <h3>Infraestructura de Carga Eléctrica de Alta Potencia</h3>
            <p>
              Implementación de cargadores de alta velocidad para vehículos eléctricos y tramitación de certificación SEC TE-6 en sucursales de BMW.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="nosotros" className="energy-section-blueprint">
        <div className="blueprint-hero-content" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <div>
            <span className="blueprint-grid-title">05. Compañía</span>
            <h2 className="editorial-heading" style={{ fontSize: '2.5rem' }}>
              Excelencia Técnica 
              <span>para Sectores Exigentes</span>
            </h2>
            <p className="editorial-paragraph">
              Soteel SpA está compuesta por profesionales con amplia trayectoria corporativa. Decidimos unificar esfuerzos para entregar prácticas de alto nivel técnico en proyectos de media y baja tensión de manera ágil y personalizada.
            </p>
            <p className="editorial-paragraph" style={{ color: '#64748b' }}>
              Trabajamos diariamente preservando el medio ambiente, optimizando consumos energéticos y privilegiando rigurosamente la seguridad y salud ocupacional de nuestros colaboradores en terreno.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid var(--energy-border)', padding: '2.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '800', color: 'var(--energy-primary)' }}>Nuestros Compromisos</h3>
            
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--energy-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                <strong>Seguridad Primero:</strong> Cuidamos a nuestro personal y a tus instalaciones mediante exhaustivos análisis de riesgos previos.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--energy-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                <strong>Sustentabilidad Activa:</strong> Promovemos el uso eficiente de energías limpias (ERNC) en el sector productivo nacional.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--energy-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                <strong>Eficiencia en Plazos:</strong> Planificación computarizada precisa para cumplir rigurosamente con los plazos de entrega pactados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contacto" className="energy-section-blueprint" style={{ backgroundColor: '#f8fafc' }}>
        <div className="form-container-technical">
          <div>
            <span className="blueprint-grid-title" style={{ color: 'var(--energy-primary)' }}>Contacto Comercial</span>
            <h2 className="editorial-heading" style={{ fontSize: '2.5rem' }}>Hablemos de tu Proyecto</h2>
            <p className="editorial-paragraph">
              Coméntanos cuáles son los requerimientos eléctricos, estudios o montajes que necesita tu negocio y nuestro equipo comercial te responderá a la brevedad.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569', fontSize: '0.88rem' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} style={{ color: 'var(--energy-primary)' }} /> Dominica 552, Recoleta, Santiago.</p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} style={{ color: 'var(--energy-primary)' }} /> contacto@soteel.cl</p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} style={{ color: 'var(--energy-primary)' }} /> +56 9 2198 4990</p>
            </div>
          </div>

          <div className="form-tech-fields">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--energy-secondary)', margin: '0 0 0.5rem 0' }}>Solicitar Cotización Técnica</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 2rem 0' }}>Envíanos un mensaje y asignaremos a un profesional especialista a tu requerimiento.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-tech-input-group">
                <div className="form-tech-field">
                  <label>Nombre y Apellido</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Marcelo Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-tech-input"
                  />
                </div>
                <div className="form-tech-field">
                  <label>Empresa</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Constructora Limitada"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="form-tech-input"
                  />
                </div>
              </div>

              <div className="form-tech-input-group">
                <div className="form-tech-field">
                  <label>Correo Electrónico</label>
                  <input 
                    type="email" 
                    required
                    placeholder="contacto@empresa.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-tech-input"
                  />
                </div>
                <div className="form-tech-field">
                  <label>Teléfono de Contacto</label>
                  <input 
                    type="text" 
                    required
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-tech-input"
                  />
                </div>
              </div>

              <div className="form-tech-field" style={{ marginBottom: '1.5rem' }}>
                <label>Área del Proyecto</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="form-tech-input"
                  style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                >
                  <option value="Ingeniería">Ingeniería & Consultoría Eléctrica</option>
                  <option value="Montaje">Montaje Eléctrico Industrial</option>
                  <option value="ITO">Mantención & Normalización (ITO)</option>
                  <option value="Fotovoltaico">Energía Solar Fotovoltaica / Netbilling</option>
                  <option value="Electromovilidad">Cargadores de Vehículos Eléctricos</option>
                  <option value="Certificacion">Certificaciones SEC (TE1, TE4, TE6)</option>
                </select>
              </div>

              <div className="form-tech-field" style={{ marginBottom: '2rem' }}>
                <label>Detalles del Proyecto / Comentarios</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describa de forma general las necesidades de su obra..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-tech-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={submitted}
                className="btn-tech-submit"
              >
                <Send size={16} />
                {submitted ? 'Enviando solicitud...' : 'Enviar Solicitud de Cotización ➔'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
