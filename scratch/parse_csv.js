const fs = require('fs');
const path = require('path');

const csvPath = 'c:/Users/Nicolito/Desktop/Sandbox/st.cl-appweb/capturassoteel/csvproductos/productos-soteel.csv.csv';
const content = fs.readFileSync(csvPath, 'utf8');

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

const rows = parseCSV(content);
const headers = rows[0];
const nameIdx = headers.indexOf('Nombre');
const skuIdx = headers.indexOf('SKU');
const imagesIdx = headers.indexOf('Imágenes');
const descIdx = headers.indexOf('Descripción');
const shortDescIdx = headers.indexOf('Descripción corta');
const priceIdx = headers.indexOf('Precio normal');
const salePriceIdx = headers.indexOf('Precio rebajado');

// Let's print out all rows to see their Names and SKUs
rows.forEach((r, i) => {
  if (i === 0) return;
  console.log(`Row ${i}: "${r[nameIdx]}" | SKU: "${r[skuIdx]}" | Normal Price: "${r[priceIdx]}" | Sale Price: "${r[salePriceIdx]}"`);
});
