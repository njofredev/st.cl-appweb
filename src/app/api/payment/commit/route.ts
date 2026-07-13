import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webpay } from '@/lib/webpay';

async function handleCommit(token: string, host: string, protocol: string) {
  try {
    // 1. Confirmar transacción con Transbank
    const commitResponse = await webpay.commit(token);

    // 2. Comprobar si fue exitosa (response_code == 0)
    const isSuccess = commitResponse.response_code === 0;

    // 3. Buscar orden asociada al token
    const order = await prisma.order.findUnique({
      where: { token },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.redirect(`${protocol}://${host}/payment/result?status=not-found`);
    }

    if (isSuccess) {
      // Actualizar estado de orden a PAID
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' },
      });

      // Descontar stock de productos
      for (const item of order.items) {
        if (item.productId) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      return NextResponse.redirect(`${protocol}://${host}/payment/result?status=success&orderId=${order.id}`);
    } else {
      // Actualizar estado a FAILED
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      });

      return NextResponse.redirect(`${protocol}://${host}/payment/result?status=failed&orderId=${order.id}`);
    }
  } catch (error: any) {
    console.error('Error al confirmar transacción:', error);
    return NextResponse.redirect(`${protocol}://${host}/payment/result?status=error&message=${encodeURIComponent(error.message)}`);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token_ws');

  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';

  if (!token) {
    return NextResponse.redirect(`${protocol}://${host}/payment/result?status=cancelled`);
  }

  return handleCommit(token, host, protocol);
}

export async function POST(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';

  try {
    const formData = await request.formData();
    const token = formData.get('token_ws') as string;

    if (!token) {
      return NextResponse.redirect(`${protocol}://${host}/payment/result?status=cancelled`);
    }

    return handleCommit(token, host, protocol);
  } catch (e) {
    // Si no es form data, intentar search params
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token_ws');

    if (!token) {
      return NextResponse.redirect(`${protocol}://${host}/payment/result?status=cancelled`);
    }

    return handleCommit(token, host, protocol);
  }
}
