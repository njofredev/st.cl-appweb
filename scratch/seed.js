const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read database URL from .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
if (!dbUrlMatch) {
  console.error("No se encontró DATABASE_URL en el archivo .env");
  process.exit(1);
}
const connectionString = dbUrlMatch[1];
console.log("Conectando a la base de datos...");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: 'Electricidad', slug: 'electricidad' },
  { name: 'Todas las categorías', slug: 'todas-las-categorias' }
];

const PRODUCTS = [
  {
    name: 'Enchufe de piso 4 puestos',
    slug: 'enchufe-de-piso-4-puestos',
    description: 'Enchufe de piso de 4 puestos de alta resistencia.',
    price: 59990,
    stock: 6,
    categorySlug: 'electricidad'
  },
  {
    name: 'Enchufe de piso 2 puestos',
    slug: 'enchufe-de-piso-2-puestos',
    description: 'Enchufe de piso de 2 puestos de alta resistencia.',
    price: 39990,
    stock: 8,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + HDMI PARA OFICINAS',
    slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-hdmi-para-oficinas',
    description: 'Torre de enchufe pop up motorizado con 2 enchufes, 2 USB, 1 cargador inalámbrico y HDMI para oficinas.',
    price: 279900,
    stock: 5,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE POP UP NEUMATICO 3 TOMAS ENCHUFE + 2 CARGAS USB',
    slug: 'torre-de-enchufe-pop-up-neumatico-3-tomas-enchufe-2-cargas-usb',
    description: 'Torre de enchufe pop up neumático con 3 tomas de enchufe y 2 cargas USB.',
    price: 207990,
    stock: 6,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + 1 PARLANTE BLUETOOTH PARA CUBIERTA + APP TUYA',
    slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta-app-tuya',
    description: 'Torre de enchufe inteligente motorizada con 2 enchufes, 2 USB, cargador inalámbrico, parlante Bluetooth y control por App Tuya.',
    price: 299990,
    stock: 1,
    categorySlug: 'electricidad'
  },
  {
    name: 'Cargador Inalámbrico para Cubierta + USB-A + USB-C',
    slug: 'cargador-inalambrico-para-cubierta-usb-a-usb-c',
    description: 'Cargador inalámbrico para cubierta con puertos USB-A y USB-C.',
    price: 22990,
    stock: 33,
    categorySlug: 'electricidad'
  },
  {
    name: 'ORDENADOR DE CABLES',
    slug: 'ordenador-de-cables',
    description: 'Ordenador y organizador de cables de oficina.',
    price: 25990,
    stock: 5,
    categorySlug: 'electricidad'
  },
  {
    name: 'TOMA DE ENCHUFE MULTIFUNCIONAL',
    slug: 'toma-de-enchufe-multifuncional',
    description: 'Toma de enchufe multifuncional.',
    price: 199990,
    stock: 4,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE VERTICAL POP UP',
    slug: 'torre-de-enchufe-vertical-pop-up',
    description: 'Torre de enchufe vertical pop up.',
    price: 39990,
    stock: 82,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE POP UP MOTORIZADO 3 TOMAS ENCHUFE + 2 CARGAS USB + 1 CARGADOR INALAMBRICO (WIRELESS) PARA CUBIERTA',
    slug: 'torre-de-enchufe-pop-up-motorizado-3-tomas-enchufe-2-cargas-usb-1-cargador-inalambrico-para-cubierta',
    description: 'Torre de enchufe pop up motorizado con 3 tomas, 2 cargas USB y cargador inalámbrico.',
    price: 279990,
    stock: 4,
    categorySlug: 'electricidad'
  },
  {
    name: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + 1 PARLANTE BLUETOOTH PARA CUBIERTA',
    slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta',
    description: 'Torre de enchufe pop up motorizado con 2 enchufes, 2 USB, cargador inalámbrico y parlante Bluetooth.',
    price: 149990,
    stock: 0,
    categorySlug: 'electricidad'
  },
  {
    name: 'TRANSFERENCIA AUTOMÁTICA MONOFÁSICA ATS 63A',
    slug: 'transferencia-automatica-monofasica-ats-63a',
    description: 'Sistema de transferencia automática monofásica ATS 63A.',
    price: 79990,
    stock: 2,
    categorySlug: 'electricidad'
  },
  {
    name: 'DISPENSADOR DE LÍQUIDOS, STL-02-2',
    slug: 'dispensador-de-liquidos-stl-02-2',
    description: 'Dispensador automático de líquidos modelo STL-02-2.',
    price: 49990,
    stock: 2,
    categorySlug: 'todas-las-categorias'
  }
];

async function main() {
  console.log("Limpiando base de datos anterior...");
  // Clear order items first to avoid foreign key violations
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  
  console.log("Creando categorías...");
  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug
      }
    });
    categoryMap[cat.slug] = created.id;
  }

  console.log("Creando productos...");
  for (const prod of PRODUCTS) {
    await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        categoryId: categoryMap[prod.categorySlug]
      }
    });
  }

  console.log("¡Base de datos sembrada con éxito con los 13 productos!");
}

main()
  .catch((e) => {
    console.error("Error al sembrar:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
