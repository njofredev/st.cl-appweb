const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const csvPath = 'c:/Users/Nicolito/Desktop/Sandbox/st.cl-appweb/capturassoteel/csvproductos/productos-soteel.csv.csv';
const envPath = path.join(__dirname, '..', '.env');

// Read database URL
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
if (!dbUrlMatch) {
  console.error("No se encontró DATABASE_URL en el archivo .env");
  process.exit(1);
}
const connectionString = dbUrlMatch[1];

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function parseCSV(text) {
  const result = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n' || char === '\r') {
        row.push(cell);
        cell = '';
        if (row.length > 1 || row[0] !== '') {
          result.push(row);
        }
        row = [];
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        cell += char;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell);
    result.push(row);
  }
  return result;
}

// Clean HTML helper
function cleanHTML(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // remove tags
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function main() {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvContent);
  const headers = rows[0];

  const nameIdx = headers.indexOf('Nombre');
  const skuIdx = headers.indexOf('SKU');
  const imagesIdx = headers.indexOf('Imágenes');
  const descIdx = headers.indexOf('Descripción');
  const shortDescIdx = headers.indexOf('Descripción corta');

  console.log("Limpiando base de datos anterior...");
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Creando categorías...");
  const catElectricidad = await prisma.category.create({
    data: { name: 'Electricidad', slug: 'electricidad' }
  });
  const catGeneral = await prisma.category.create({
    data: { name: 'Todas las categorías', slug: 'todas-las-categorias' }
  });

  // Map of our 13 products with their actual price, stock and category slug
  const PRODUCTS_CONFIG = [
    { sku: 'STL_ENCHUFE PISO DOBLE-1', price: 59990, stock: 6, categoryId: catElectricidad.id, slug: 'enchufe-de-piso-4-puestos', fallbackName: 'Enchufe de piso 4 puestos' },
    { sku: 'STL_ENCHUFE PISO DOBLE', price: 39990, stock: 8, categoryId: catElectricidad.id, slug: 'enchufe-de-piso-2-puestos', fallbackName: 'Enchufe de piso 2 puestos' },
    { sku: 'STL_ TORRE MOTORIZADA HDMI', price: 279990, stock: 5, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-hdmi-para-oficinas', fallbackName: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + HDMI PARA OFICINAS' },
    { sku: 'STL-GN10503U2', price: 207990, stock: 6, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-pop-up-neumatico-3-tomas-enchufe-2-cargas-usb', fallbackName: 'TORRE DE ENCHUFE POP UP NEUMATICO 3 TOMAS ENCHUFE + 2 CARGAS USB' },
    { sku: 'STL_ TORRE TUYA SMART', price: 299990, stock: 1, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta-app-tuya', fallbackName: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + 1 PARLANTE BLUETOOTH PARA CUBIERTA + APP TUYA' },
    { sku: 'STL_ZCM3', price: 22990, stock: 33, categoryId: catElectricidad.id, slug: 'cargador-inalambrico-para-cubierta-usb-a-usb-c', fallbackName: 'Cargador Inalámbrico para Cubierta + USB-A + USB-C' },
    { sku: 'STL_LK-FG750A', price: 25990, stock: 5, categoryId: catElectricidad.id, slug: 'ordenador-de-cables', fallbackName: 'ORDENADOR DE CABLES' },
    { sku: 'STL_LK-DMS-702', price: 199990, stock: 4, categoryId: catElectricidad.id, slug: 'toma-de-enchufe-multifuncional', fallbackName: 'TOMA DE ENCHUFE MULTIFUNCIONAL' },
    { sku: 'STL_GN10503U2', price: 39990, stock: 82, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-vertical-pop-up', fallbackName: 'TORRE DE ENCHUFE VERTICAL POP UP' },
    { sku: 'STL_STL_GN10503U2', price: 279990, stock: 4, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-pop-up-motorizado-3-tomas-enchufe-2-cargas-usb-1-cargador-inalambrico-para-cubierta', fallbackName: 'TORRE DE ENCHUFE POP UP MOTORIZADO 3 TOMAS ENCHUFE + 2 CARGAS USB + 1 CARGADOR INALAMBRICO (WIRELESS) PARA CUBIERTA' },
    { sku: 'STL_GN10503U2 M2', price: 149990, stock: 0, categoryId: catElectricidad.id, slug: 'torre-de-enchufe-pop-up-motorizado-2-enchufes-2-usb-1-cargador-inalambrico-1-parlante-bluetooth-para-cubierta', fallbackName: 'TORRE DE ENCHUFE POP UP MOTORIZADO 2 ENCHUFES + 2 USB + 1 CARGADOR INALAMBRICO (WIRELESS) + 1 PARLANTE BLUETOOTH PARA CUBIERTA' },
    { sku: 'STL_ATS01-2018', price: 79990, stock: 2, categoryId: catElectricidad.id, slug: 'transferencia-automatica-monofasica-ats-63a', fallbackName: 'TRANSFERENCIA AUTOMÁTICA MONOFÁSICA ATS 63A' },
    { sku: 'STL-02-2', price: 49990, stock: 2, categoryId: catGeneral.id, slug: 'dispensador-de-liquidos-stl-02-2', fallbackName: 'DISPENSADOR DE LÍQUIDOS, STL-02-2' }
  ];

  console.log("Relacionando productos del CSV...");
  const seededProducts = [];

  for (const config of PRODUCTS_CONFIG) {
    // Find matching row in CSV
    let csvRow = rows.find(r => r[skuIdx]?.trim() === config.sku);
    
    // If not matched by SKU, try matching by name
    if (!csvRow) {
      csvRow = rows.find(r => r[nameIdx]?.trim().toLowerCase() === config.fallbackName.toLowerCase());
    }

    let name = config.fallbackName;
    let description = 'Insumo eléctrico SOTEEL de alta calidad.';
    let imageUrl = null;

    if (csvRow) {
      name = csvRow[nameIdx] || name;
      const shortDesc = cleanHTML(csvRow[shortDescIdx]);
      const fullDesc = cleanHTML(csvRow[descIdx]);
      description = shortDesc ? `${shortDesc} ${fullDesc}`.trim() : (fullDesc || description);
      
      const imagesField = csvRow[imagesIdx];
      if (imagesField) {
        const urls = imagesField.split(',').map(url => url.trim());
        imageUrl = urls[0] || null;
      }
    }

    const created = await prisma.product.create({
      data: {
        name,
        slug: config.slug,
        description,
        price: config.price,
        stock: config.stock,
        imageUrl,
        categoryId: config.categoryId
      }
    });

    seededProducts.push({
      id: created.id,
      name: created.name,
      slug: created.slug,
      description: created.description,
      price: created.price,
      stock: created.stock,
      imageUrl: created.imageUrl,
      categoryName: config.categoryId === catElectricidad.id ? 'Electricidad' : 'Todas las categorías'
    });
  }

  // Save the list of parsed products to a JSON file so we can update frontend files easily
  fs.writeFileSync(
    path.join(__dirname, '..', 'scratch', 'parsed_products.json'),
    JSON.stringify(seededProducts, null, 2),
    'utf8'
  );

  console.log("¡Base de datos sembrada con éxito con las imágenes y descripciones reales del CSV!");
}

main()
  .catch((e) => {
    console.error("Error seeding from CSV:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
