// doc-generator.service.ts
import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, TableLayoutType } from 'docx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class DocGeneratorService {

  constructor() {}

  // Generate and save the document
  async generateAndSaveDocument(): Promise<void> {
    try {
      const doc = this.createDocument();
      const blob = await Packer.toBlob(doc);
      FileSaver.saveAs(blob, 'allotment_of_subjects.docx');
    } catch (error) {
      console.error('Error generating or saving document:', error);
      throw new Error('Failed to generate or save document');
    }
  }

  // Create the document based on the uploaded data
  private createDocument(): Document {
    return new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Allotment of Subjects (Semester July-December 2024-2025)',
                  bold: true,
                  size: 36,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Department of Foundry and Forge Technology',
                  size: 24,
                  italics: true,
                }),
              ],
            }),
            this.createCourseTable(),
          ],
        },
      ],
    });
  }

  // Create a table to represent course data
  private createCourseTable(): Table {
    // Define the data for the table
    const courses = [
      ['Sr.No.', 'Course name', 'Credits', 'L', 'T', 'P', 'Instructor’s Name', 'Load (Hrs.)'],
      ['1.1', 'Engineering Science', '4', '3', '0', '2', 'Dr. E. Hemachandran', '5'],
      ['1.2', 'Engineering Mechanics', '4', '3', '1', '0', 'Dr. N.K Singh', '4'],
      ['1.3', 'Introduction to Materials Engineering', '4', '3', '0', '2', 'Dr. Rajat Upadhyay', '5'],
      // Add more rows as necessary
    ];
  
    // Define column widths in points (1 point = 1/72 inches, DXA = 1/1440 inches)
    const columnWidths = [1000, 6000, 1000, 800, 800, 800, 4500, 1000]; // Fixed widths in DXA
  
    // Create table rows
    const tableRows: TableRow[] = courses.map((course) => {
      return new TableRow({
        children: course.map((cellText, index) => {
          return new TableCell({
            width: { size: columnWidths[index], type: WidthType.DXA },
            children: [new Paragraph(cellText)],
          });
        }),
      });
    });
  
    // Return the table with fixed layout to prevent auto-resizing
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows,
      layout: TableLayoutType.FIXED, // Force fixed table layout
    });
  }
  
  
}
