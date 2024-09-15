// excel-generator.service.ts
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelGeneratorService {

  constructor() {}

  // Generate and save the Excel file
  generateAndSaveExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Allotment of Subjects');

    // Add Heading Row
    worksheet.mergeCells('A1:H1');
    const headingRow = worksheet.getCell('A1');
    headingRow.value = 'Allotment of Subjects (Semester July-December 2024-2025)';
    headingRow.font = { bold: true, size: 14 };
    headingRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Add subheading
    worksheet.mergeCells('A2:H2');
    const subheadingRow = worksheet.getCell('A2');
    subheadingRow.value = 'Department of Foundry and Forge Technology';
    subheadingRow.font = { italic: true };
    subheadingRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Add column headers
    worksheet.addRow([''])
    worksheet.addRow(['Sr.No.', 'Course name', 'Credits', 'L', 'T', 'P', 'Instructor’s Name', 'Load (Hrs.)']);
    const headerRow = worksheet.getRow(4);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add 50 rows of course data
    for (let i = 1; i <= 50; i++) {
      worksheet.addRow([
        `${i}.1`,                             // Sr.No.
        `Course ${i}`,                        // Course name
        `${Math.floor(Math.random() * 4) + 3}`, // Credits
        `${Math.floor(Math.random() * 4)}`,   // L
        `${Math.floor(Math.random() * 2)}`,   // T
        `${Math.floor(Math.random() * 2) + 1}`, // P
        `Instructor ${i}`,                    // Instructor's Name
        `${Math.floor(Math.random() * 6) + 2}`, // Load (Hrs.)
      ]);
    }

    // Apply styles to each data row (word wrap, text center, and borders)
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 4) {  // Skip headers
        row.eachCell((cell) => {
          cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    // Set column widths
    worksheet.columns = [
      { width: 10 },  // Sr.No.
      { width: 30 },  // Course name
      { width: 10 },  // Credits
      { width: 5 },   // L
      { width: 5 },   // T
      { width: 5 },   // P
      { width: 30 },  // Instructor's Name
      { width: 10 },  // Load (Hrs.)
    ];

    // Generate the Excel file and trigger download
    workbook.xlsx.writeBuffer().then((data: BlobPart) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, 'allotment_of_subjects.xlsx');
    });
  }
}
