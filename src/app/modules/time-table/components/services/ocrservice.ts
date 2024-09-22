// src/app/services/ocr.service.ts
import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  constructor() {}

  // Function to process OCR on an image
  processImage(image: File): Promise<any> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        image,
        'eng', // You can specify the language here
        {
          logger: (m) => console.log(m), // Optional: for logging the OCR progress
        }
      )
      .then(({ data }) => {
        resolve(data); // Returning the OCR result
      })
      .catch((error) => {
        reject(error); // Handle errors
      });
    });
  }
}
