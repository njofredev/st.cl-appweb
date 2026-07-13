import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    // Retornar vacío en vez de error 500 para permitir fallback local en el frontend
    return NextResponse.json([]);
  }
}
