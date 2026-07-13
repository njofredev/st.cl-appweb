'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderId');
  const message = searchParams.get('message');

  const getStatusDetails = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle2 size={64} className="result-success" style={{ margin: '0 auto' }} />,
          title: '¡Pago Exitoso!',
          class: 'result-success',
          description: `Tu pago ha sido procesado con éxito por Transbank. Tu orden de compra es: ${orderId || ''}.`,
          subtext: 'Te hemos enviado un correo con los detalles de tu compra y coordinaremos el despacho a la brevedad.',
        };
      case 'failed':
        return {
          icon: <XCircle size={64} className="result-failed" style={{ margin: '0 auto' }} />,
          title: 'Pago Rechazado',
          class: 'result-failed',
          description: 'La transacción fue rechazada o no pudo ser completada por Transbank.',
          subtext: 'Por favor, verifica el saldo de tu tarjeta o intenta con otro método de pago.',
        };
      case 'cancelled':
        return {
          icon: <AlertTriangle size={64} className="result-failed" style={{ margin: '0 auto' }} />,
          title: 'Transacción Cancelada',
          class: 'result-failed',
          description: 'Has cancelado el proceso de pago en Webpay.',
          subtext: 'Si lo deseas, puedes volver a intentar la compra desde tu carrito.',
        };
      case 'not-found':
        return {
          icon: <AlertTriangle size={64} className="result-failed" style={{ margin: '0 auto' }} />,
          title: 'Orden no encontrada',
          class: 'result-failed',
          description: 'No pudimos localizar el registro de esta orden de compra.',
          subtext: 'Por favor contáctanos si crees que esto es un error.',
        };
      case 'error':
      default:
        return {
          icon: <AlertTriangle size={64} className="result-failed" style={{ margin: '0 auto' }} />,
          title: 'Error de Comunicación',
          class: 'result-failed',
          description: message || 'Ocurrió un error inesperado al procesar la confirmación con Transbank.',
          subtext: 'Por favor, comunícate con soporte de Soteel para verificar el estado de tu pago.',
        };
    }
  };

  const details = getStatusDetails();

  return (
    <div className="result-card">
      <div className="result-icon">{details.icon}</div>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--secondary)' }}>{details.title}</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>{details.description}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{details.subtext}</p>
      
      <Link href="/" className="btn-primary">
        Volver al Catálogo
      </Link>
    </div>
  );
}

export default function PaymentResult() {
  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Suspense fallback={<div>Cargando resultado del pago...</div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
