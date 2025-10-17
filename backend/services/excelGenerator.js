// ================================================================

// services/excelGenerator.js
import ExcelJS from "exceljs";
import path from "path";

class ExcelGenerator {
  async generateExcel(tableData, options = {}) {
    if (!tableData || tableData.length === 0) {
      throw new Error("No data provided for Excel generation");
    }

    const { sheetName = "Sheet1", includeHeaders = true } = options;

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Add data to worksheet
    tableData.forEach((row, rowIndex) => {
      const excelRow = worksheet.addRow(row);

      // Style headers
      if (includeHeaders && rowIndex === 0) {
        excelRow.font = { bold: true };
        excelRow.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE0E0E0" },
        };
      }
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = Math.min(maxLength + 2, 50); // Max width of 50
    });

    return workbook;
  }

  async saveExcelFile(workbook, filename) {
    const filePath = path.join("uploads/excel", filename);

    try {
      await workbook.xlsx.writeFile(filePath);
      console.log(`Excel file saved: ${filePath}`);
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save Excel file: ${error.message}`);
    }
  }

  generateFileName(originalName) {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1000);
    const baseName = path.parse(originalName).name;
    return `${baseName}_${timestamp}_${random}.xlsx`;
  }
}

const excelGenerator = new ExcelGenerator();
export default excelGenerator;
