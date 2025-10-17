// services/excelGenerator.js
import ExcelJS from "exceljs";
import path from "path";

class ExcelGenerator {
  async generateExcel(tableData, options = {}) {
    if (!tableData || tableData.length === 0) {
      throw new Error("No data provided for Excel generation");
    }

    const { sheetName = "Sheet1", includeHeaders = true } = options;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    tableData.forEach((row, rowIndex) => {
      const excelRow = worksheet.addRow(row);

      if (includeHeaders && rowIndex === 0) {
        excelRow.font = { bold: true };
        excelRow.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE0E0E0" },
        };
      }
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const val = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, val.length);
      });
      column.width = Math.min(maxLength + 2, 50);
    });

    return workbook;
  }

  // Return Excel as a buffer instead of saving to disk
  async getExcelBuffer(workbook) {
    return await workbook.xlsx.writeBuffer();
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
