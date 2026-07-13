const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// 1. Helper function to normalize product names to Title Case with custom rules
function normalizeName(name) {
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

async function main() {
  console.log("Normalizando nombres de productos...");

  // 2. Normalize scratch/parsed_products.json
  const parsedProductsPath = path.join(__dirname, 'parsed_products.json');
  if (fs.existsSync(parsedProductsPath)) {
    console.log("Normalizando parsed_products.json...");
    const productsJson = JSON.parse(fs.readFileSync(parsedProductsPath, 'utf8'));
    const normalizedJson = productsJson.map(p => ({
      ...p,
      name: normalizeName(p.name)
    }));
    fs.writeFileSync(parsedProductsPath, JSON.stringify(normalizedJson, null, 2), 'utf8');
    console.log("¡parsed_products.json actualizado!");
  }

  // 3. Connect to database and normalize DB records
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
    
    if (dbUrlMatch) {
      const connectionString = dbUrlMatch[1];
      console.log("Conectando a la base de datos PostgreSQL...");
      
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      const prisma = new PrismaClient({ adapter });
      
      try {
        const dbProducts = await prisma.product.findMany();
        console.log(`Encontrados ${dbProducts.length} productos en la base de datos.`);
        
        let updatedCount = 0;
        for (const p of dbProducts) {
          const newName = normalizeName(p.name);
          if (newName !== p.name) {
            await prisma.product.update({
              where: { id: p.id },
              data: { name: newName }
            });
            updatedCount++;
          }
        }
        
        console.log(`¡Base de datos actualizada! Nombres normalizados en ${updatedCount} productos.`);
      } catch (err) {
        console.error("Error al actualizar la base de datos:", err);
      } finally {
        await prisma.$disconnect();
        await pool.end();
      }
    } else {
      console.log("DATABASE_URL no encontrada en .env, saltando actualización de base de datos.");
    }
  } else {
    console.log("Archivo .env no encontrado, saltando actualización de base de datos.");
  }
}

main().catch(console.error);
