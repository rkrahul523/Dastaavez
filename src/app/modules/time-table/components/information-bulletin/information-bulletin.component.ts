import { Component, OnInit } from '@angular/core';
import { OcrService } from '../services/ocrservice';

@Component({
  selector: 'app-information-bulletin',
  templateUrl: './information-bulletin.component.html',
  styleUrls: ['./information-bulletin.component.scss']
})
export class InformationBulletinComponent implements OnInit {



  ocrResult: any;
  jsonOutput: any;

  constructor(private ocrService: OcrService) {}
  ngOnInit(): void {
  }




  // Method to handle image file upload
  onFileSelected1(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.ocrService.processImage(file).then((result) => {
        this.ocrResult = result.text; // Extracted text from the image

        // Convert the result to a JSON format
        this.jsonOutput = {
          extractedText: this.ocrResult,
          words: result.words.map((word: any) => ({
            text: word.text,
            confidence: word.confidence
          })),
          confidence: result.confidence
        };

        console.log('OCR Result:', this.ocrResult);
        console.log('JSON Output:', this.jsonOutput);
      }).catch((error) => {
        console.error('Error during OCR processing:', error);
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Process the image using Tesseract.js
      this.ocrService.processImage(file).then((result) => {
        this.ocrResult = result.text;

        // Convert the extracted text into a JSON object
        this.jsonOutput = this.convertToJSON(this.ocrResult);

        console.log('OCR Result:', this.ocrResult);
        console.log('JSON Output:', this.jsonOutput);
      }).catch((error) => {
        console.error('Error processing image:', error);
      });
    }
  }

  // Convert the OCR text to a JSON object
  convertToJSON(text: string): any {
    const json: any = {};
    const lines = text.split('\n');
    
    // Example: Simple parsing based on assumptions from your example
    for (const line of lines) {
      if (line.includes('Name')) {
        json['name'] = line.split(':')[1].trim();
      }
      if (line.includes('Father')) {
        json['father_name'] = line.split(':')[1].trim();
      }
      if (line.includes('Mother')) {
        json['mother_name'] = line.split(':')[1].trim();
      }
      if (line.includes('Roll No')) {
        json['roll_number'] = line.split(':')[1].trim();
      }
      // Add more parsing rules as needed
    }
    return json;
  }

}
