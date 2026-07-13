import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webpay } from '@/lib/webpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito de compras está vacío' }, { status: 400 });
    }

    // Buscar productos en la base de datos para calcular el total real (por seguridad)
    let total = 0;
    const itemsWithDetails = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json({ error: `Producto no encontrado: ${item.productId}` }, { status: 400 });
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Stock insuficiente para ${product.name}` }, { status: 400 });
      }

      total += product.price * item.quantity;
      itemsWithDetails.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Generar códigos de orden únicos
    const buyOrder = `SOT-${Date.now()}`;
    const sessionId = `SES-${Math.random().toString(36).substring(2, 9)}`;

    // URL de retorno en nuestra app a la que Transbank enviará al cliente
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const returnUrl = `${protocol}://${host}/api/payment/commit`;

    // Iniciar transacción en Webpay
    const wpResponse = await webpay.create(buyOrder, sessionId, total, returnUrl);

    // Crear orden en estado PENDING
    await prisma.order.create({
      data: {
        buyOrder,
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        total,
        status: 'PENDING',
        token: wpResponse.token,
        items: {
          create: itemsWithDetails,
        },
      },
    });

    return NextResponse.json({
      success: true,
      token: wpResponse.token,
      url: wpResponse.url,
    });
  } catch (error: any) {
    console.error('Error al crear orden o transacción de pago:', error);
    return NextResponse.json({ error: 'Error procesando el pago: ' + error.message }, { status: 500 });
  }
}
