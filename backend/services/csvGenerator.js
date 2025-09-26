// services/csvGenerator.js
import fs from "fs/promises";
import path from "path";

class CSVGenerator {
  generateCSV(tableData, options = {}) {
    if (!tableData || tableData.length === 0) {
      throw new Error("No data provided for CSV generation");
    }

    const { includeHeaders = true, delimiter = ",", enclosure = '"' } = options;

    let csvContent = "";

    // Process each row
    tableData.forEach((row, index) => {
      // Skip first row if not including headers and it's the first row
      if (!includeHeaders && index === 0) {
        return;
      }

      const csvRow = row
        .map((cell) => {
          let processedCell = (cell || "").toString();

          // If cell contains delimiter, newline, or enclosure, wrap in quotes
          if (
            processedCell.includes(delimiter) ||
            processedCell.includes("\n") ||
            processedCell.includes(enclosure)
          ) {
            // Escape existing enclosure characters
            processedCell = processedCell.replace(
              new RegExp(enclosure, "g"),
              enclosure + enclosure
            );
            processedCell = enclosure + processedCell + enclosure;
          }

          return processedCell;
        })
        .join(delimiter);

      csvContent += csvRow + "\n";
    });

    return csvContent.trim();
  }

  async saveCSVFile(csvContent, filename) {
    const filePath = path.join("uploads/csv", filename);

    try {
      await fs.writeFile(filePath, csvContent, "utf8");
      console.log(`CSV file saved: ${filePath}`);
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save CSV file: ${error.message}`);
    }
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
