import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { price, stock } = body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        price: price !== undefined ? parseInt(price) : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 });
  }
}
