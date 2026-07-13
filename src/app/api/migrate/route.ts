import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Función para normalizar los nombres a Capitalizado + Minúsculas con excepciones
function normalizeName(name: string): string {
  if (!name) return name;
  const uppercaseWords = new Set(['usb', 'hdmi', 'led', 'ats', 'wifi', 'app', 'clp', 'ip54', 'ip66', 'id']);
  const lowercaseExceptions = new Set(['de', 'el', 'la', 'los', 'las', 'en', 'para', 'con', 'y', 'o', 'un', 'una', 'vía', 'por']);
  
  return name
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (word.length === 0) return '';
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      if (uppercaseWords.has(cleanWord.toLowerCase())) {
        return word.toUpperCase();
      }
      if (index > 0 && lowercaseExceptions.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      if (word.includes('-')) {
        return word
          .split('-')
          .map(part => part.length > 0 ? part.charAt(0).toUpperCase() + part.slice(1) : '')
          .join('-');
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products } = body;

    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Debe proporcionar un array de productos bajo la clave "products"' },
        { status: 400 }
      );
    }

    const results = {
      imported: 0,
      updated: 0,
      errors: 0,
      details: [] as string[],
    };

    for (const wpProduct of products) {
      try {
        const wpId = wpProduct.id;
        const rawName = wpProduct.name || wpProduct.title?.rendered || 'Producto sin nombre';
        const name = normalizeName(rawName);
        // WooCommerce usualmente expone name y price directamente, WP común expone title/content
        const description = wpProduct.description || wpProduct.content?.rendered || '';
        
        // Limpiar o parsear el precio (WooCommerce expone price como string)
        let price = 0;
        if (wpProduct.price) {
          price = Math.round(parseFloat(wpProduct.price));
        } else if (wpProduct.regular_price) {
          price = Math.round(parseFloat(wpProduct.regular_price));
        }

        // Slug
        const slug = wpProduct.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Obtener imagen principal
        let imageUrl = null;
        if (wpProduct.images && wpProduct.images.length > 0) {
          imageUrl = wpProduct.images[0].src;
        } else if (wpProduct.featured_media_url) {
          imageUrl = wpProduct.featured_media_url;
        }

        // Obtener o crear Categoría
        let categoryId = null;
        if (wpProduct.categories && wpProduct.categories.length > 0) {
          // WooCommerce usa un array de objetos con name/slug
          const catName = wpProduct.categories[0].name || 'General';
          const catSlug = wpProduct.categories[0].slug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          
          const category = await prisma.category.upsert({
            where: { slug: catSlug },
            update: { name: catName },
            create: { name: catName, slug: catSlug },
          });
          categoryId = category.id;
        }

        // Upsert del Producto
        const existing = await prisma.product.findUnique({
          where: { wordpressId: wpId },
        });

        if (existing) {
          await prisma.product.update({
            where: { wordpressId: wpId },
            data: {
              name,
              slug,
              description,
              price: price || existing.price,
              imageUrl: imageUrl || existing.imageUrl,
              categoryId,
            },
          });
          results.updated++;
        } else {
          // Si el slug ya existe pero no por wordpressId, generamos uno único
          let uniqueSlug = slug;
          let counter = 1;
          while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
          }

          await prisma.product.create({
            data: {
              wordpressId: wpId,
              name,
              slug: uniqueSlug,
              description,
              price,
              imageUrl,
              categoryId,
              stock: 10, // Stock inicial por defecto
            },
          });
          results.imported++;
        }
      } catch (err: any) {
        results.errors++;
        results.details.push(`Error en producto ${wpProduct.name || wpProduct.id}: ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      summary: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error procesando la solicitud: ' + error.message },
      { status: 500 }
    );
  }
}
