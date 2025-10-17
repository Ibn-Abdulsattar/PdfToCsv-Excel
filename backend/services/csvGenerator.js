// services/csvGenerator.js
import { Buffer } from "buffer";
import path from "path";

class CSVGenerator {
  generateCSV(tableData, options = {}) {
    if (!tableData || tableData.length === 0) {
      throw new Error("No data provided for CSV generation");
    }

    const { includeHeaders = true, delimiter = ",", enclosure = '"' } = options;

    let csvContent = "";

    tableData.forEach((row, index) => {
      if (!includeHeaders && index === 0) return;

      const csvRow = row
        .map((cell) => {
          let processed = (cell || "").toString();

          if (
            processed.includes(delimiter) ||
            processed.includes("\n") ||
            processed.includes(enclosure)
          ) {
            processed = processed.replace(
              new RegExp(enclosure, "g"),
              enclosure + enclosure
            );
            processed = enclosure + processed + enclosure;
          }

          return processed;
        })
        .join(delimiter);

      csvContent += csvRow + "\n";
    });

    return csvContent.trim();
  }

  // Instead of saving to disk, return a Buffer for download
  generateCSVBuffer(tableData, options = {}) {
    const csvContent = this.generateCSV(tableData, options);
    return Buffer.from(csvContent, "utf8");
  }

  generateFileName(originalName) {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1000);
    const baseName = path.parse(originalName).name;
    return `${baseName}_${timestamp}_${random}.csv`;
  }
}

const csvGenerator = new CSVGenerator();
export default csvGenerator;
