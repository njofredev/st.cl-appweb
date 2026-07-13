const fs = require('fs');
const path = require('path');

const parsedProductsPath = path.join(__dirname, 'parsed_products.json');
const products = JSON.parse(fs.readFileSync(parsedProductsPath, 'utf8'));

// Format products for home page (page.tsx) and catalog page (productos/page.tsx)
const formattedHomeProducts = products.map((p, idx) => ({
  id: `soteel-prod-${idx + 1}`,
  name: p.name,
  slug: p.slug,
  category: p.categoryName,
  description: p.description.replace(/\r/g, '').replace(/\n/g, '\\n').replace(/"/g, '\\"'),
  price: p.price,
  stock: p.stock,
  imageUrl: p.imageUrl,
  isFavorite: [2, 4, 9].includes(idx) // Keep some as favorites
}));

const formattedDetailProducts = products.map((p, idx) => ({
  id: `soteel-prod-${idx + 1}`,
  name: p.name,
  slug: p.slug,
  category: p.categoryName,
  description: p.description.replace(/\r/g, '').replace(/\n/g, '\\n').replace(/"/g, '\\"'),
  price: p.price,
  stock: p.stock,
  imageUrl: p.imageUrl
}));

// Function to generate the JS representation of products array
function generateJSArray(arr) {
  let out = '[\n';
  arr.forEach((item, idx) => {
    out += '  {\n';
    Object.keys(item).forEach(key => {
      const val = item[key];
      if (typeof val === 'string') {
        out += `    ${key}: "${val}",\n`;
      } else {
        out += `    ${key}: ${val},\n`;
      }
    });
    out += idx === arr.length - 1 ? '  }\n' : '  },\n';
  });
  out += ']';
  return out;
}

// 1. Update src/app/page.tsx
const pagePath = 'c:/Users/Nicolito/Desktop/Sandbox/st.cl-appweb/src/app/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');
const initialStart = pageContent.indexOf('const INITIAL_PRODUCTS: Product[] = [');
const initialEnd = pageContent.indexOf('];', initialStart) + 2;

if (initialStart !== -1 && initialEnd !== -1) {
  const newArray = `const INITIAL_PRODUCTS: Product[] = ${generateJSArray(formattedHomeProducts)};`;
  pageContent = pageContent.substring(0, initialStart) + newArray + pageContent.substring(initialEnd);
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log("Updated page.tsx fallbacks");
} else {
  console.error("Could not find INITIAL_PRODUCTS block in page.tsx");
}

// 2. Update src/app/productos/page.tsx
const catalogPath = 'c:/Users/Nicolito/Desktop/Sandbox/st.cl-appweb/src/app/productos/page.tsx';
let catalogContent = fs.readFileSync(catalogPath, 'utf8');
const catStart = catalogContent.indexOf('const INITIAL_PRODUCTS: Product[] = [');
const catEnd = catalogContent.indexOf('];', catStart) + 2;

if (catStart !== -1 && catEnd !== -1) {
  const newArray = `const INITIAL_PRODUCTS: Product[] = ${generateJSArray(formattedDetailProducts)};`;
  catalogContent = catalogContent.substring(0, catStart) + newArray + catalogContent.substring(catEnd);
  fs.writeFileSync(catalogPath, catalogContent, 'utf8');
  console.log("Updated productos/page.tsx fallbacks");
} else {
  console.error("Could not find INITIAL_PRODUCTS block in productos/page.tsx");
}

// 3. Update src/app/productos/[slug]/page.tsx
const detailPath = 'c:/Users/Nicolito/Desktop/Sandbox/st.cl-appweb/src/app/productos/[slug]/page.tsx';
let detailContent = fs.readFileSync(detailPath, 'utf8');
const detStart = detailContent.indexOf('const FALLBACK_PRODUCTS: Product[] = [');
const detEnd = detailContent.indexOf('];', detStart) + 2;

if (detStart !== -1 && detEnd !== -1) {
  const newArray = `const FALLBACK_PRODUCTS: Product[] = ${generateJSArray(formattedDetailProducts)};`;
  detailContent = detailContent.substring(0, detStart) + newArray + detailContent.substring(detEnd);
  fs.writeFileSync(detailPath, detailContent, 'utf8');
  console.log("Updated [slug]/page.tsx fallbacks");
} else {
  console.error("Could not find FALLBACK_PRODUCTS block in [slug]/page.tsx");
}
