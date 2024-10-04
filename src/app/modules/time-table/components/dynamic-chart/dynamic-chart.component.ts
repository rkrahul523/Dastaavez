import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  providers: [
    NgbActiveModal,
]
})
export class DynamicChartComponent implements OnInit {
  @Input() barChartData: any=[];
  @Input() barChartLabels: any=[];
  @Input() submittedData: any=[];

  public barChartOptions: any = {
    responsive: true,
    hover: {
      mode: null // Disable hover effect
    }
  };
  
  public barChartType: any = 'bar';
  public barChartLegend = true;


  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: any = 'pie';
  public pieChartColors = [
    {
      backgroundColor:[
        '#0f5011',  // Green for A+
        '#6dec71',  // Light green for A
        '#083a63',  // Amber for B+
        '#4ba7f3',  // Blue for B
        '#756b0f',  // Deep orange for C+
        '#ffeb34',  // Yellow for C
        '#F44336'   // Red for F
      ]
    }
  ];

  // Optional settings for pie chart (can be customized)
  public pieChartOptions:any = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };

  constructor(  private ngbModal: NgbActiveModal,){

  }

  ngOnInit(){
  if(this.submittedData.length){
    const data= this.calculateBarChart();
    setTimeout(()=>{
      this.barChartData = data.datasets;
      this.barChartLabels = data.labels;
    })
    
  }
  }

 

  dismissModal(){
    this.ngbModal.dismiss();
  }


  calculateBarChart(){
    var subData= this.submittedData;

const subject = new Set<string>();
subData.forEach((student: any) => {
    Object.keys(student).forEach(key => {
        if (key !== 'roll' && key !== 'sgpa' && key !== 'calSGPA' && key !== 'isMiss' && key !== 'isError' ) {
            subject.add(key); // Add unique subjects dynamically
        }
    });
});

const subjects = Array.from(subject); // Subject codes for the x-axis (e.g., 'ME401', 'ME402', etc.)
  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C',"F"];

  this.pieChartLabels= grades;
  // Initialize dataset for each grade
  const dataset = grades.map(grade => ({
    data: Array(subjects.length).fill(0), // initialize data array with zeroes
    label: grade,
   backgroundColor: this.getBack(grade), // Example function to get background color
    // borderColor: '#1E88E5',
    // borderWidth: 2
  }));
  
  // Loop through subData to count each grade for each subject
  subData.forEach((student: any) => {
    subjects.forEach((subject, index) => {
      const grade = student[subject]; // get the grade for this subject
      const gradeIndex = grades.indexOf(grade); // find the grade index in the dataset
      if (gradeIndex !== -1) {
        dataset[gradeIndex].data[index]++; // increment the count for this grade at the subject index
      }
    });
  });



  const piedata: any=[]

  dataset.forEach((numbers:any)=>{
    const sum = numbers.data.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0);
    piedata.push(sum)
// console.log(sum);
  })

  this.pieChartData=piedata;

return {
    labels: subjects, // Subject codes (x-axis)
    datasets: dataset   // Each student's grades for each subject

}



  }






  



  getBack(grade: any) {
    let backgroundColor;
    
    switch (grade) {
      case 'A+':
        backgroundColor = '#0f5011'; // Green for A+
        break;
      case 'A':
        backgroundColor = '#6dec71'; // Light green for A
        break;
      case 'B+':
        backgroundColor = '#083a63'; // Amber for B+
        break;
      case 'B':
        backgroundColor = '#4ba7f3'; // Orange for B
        break;
      case 'C+':
        backgroundColor = '#756b0f'; // Deep orange for C+
        break;
      case 'C':
        backgroundColor = '#ffeb34'; // Red for C
        break;
      case 'F':
        backgroundColor = '#F44336'; // Red for C
        break;
   
  
    }
    return backgroundColor;
}


// Function to dynamically extract object keys (for table headers)
getKeys(item: any) {
  return Object.keys(item);
}

// Method to generate PDF and download it
downloadPDF() {
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Extract the dynamic subject codes
  const firstRecord = this.submittedData[0];
  const dynamicHeaders = Object.keys(firstRecord).filter(key => key !== 'roll' && key !== 'sgpa' && key !== 'calSGPA');
  
  // Full headers for the table
  const headers = ['Roll', 'SGPA', ...dynamicHeaders, 'calSGPA'];

  // Set title
  doc.setFontSize(16);
  doc.text('Marks Verification Sheet', 10, 10);

  // Set date and subject
  const today = new Date();
  const date = today.toLocaleDateString();
  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 260, 10, { align: 'right' });
  doc.setFontSize(14);
  doc.text('Subject: ___________', 10, 20);

  doc.setFontSize(12);
      // Table settings
      const startX = 5;
      const startY = 40;
      const rowHeight = 10; // Height of each row
  
      // Define column widths (giving "Roll" column more width)
      const colWidths = [32, 18, ...Array(dynamicHeaders.length).fill(19), 18]; // "Roll" column wider than others
  
      let currentY = startY;
  
      // Draw headers
      headers.forEach((header, index) => {
        doc.text(header, startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0) + colWidths[index] / 2, currentY + rowHeight / 2, { align: 'center', baseline: 'middle' });
        doc.rect(startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0), currentY - rowHeight, colWidths[index], rowHeight); // Draw header cell
      });
  
      currentY += rowHeight; // Move to the next row
  
      // Loop through the data and add to the table
      this.submittedData.forEach((student: any, rowIndex:any) => {
        if (currentY + rowHeight > doc.internal.pageSize.height - 20) {
          // If we are reaching the end of the page, add a new page
          doc.addPage();
          currentY = startY; // Reset Y position for the new page
  
          // Redraw table headers on new page
          headers.forEach((header, index) => {
            doc.text(header, startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0) + colWidths[index] / 2, currentY + rowHeight / 2, { align: 'center', baseline: 'middle' });
            doc.rect(startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0), currentY - rowHeight, colWidths[index], rowHeight); // Draw header cell
          });
  
          currentY += rowHeight; // Move to the next row
        }
  
        // Draw student data row by row
        const studentRow = [
          student.roll.toString(),
          student.sgpa.toString(),
          ...dynamicHeaders.map(header => student[header]), // Dynamically map subject data
          student.calSGPA.toString()
        ];
  
        studentRow.forEach((data, colIndex) => {
          doc.text(data, startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0) + colWidths[colIndex] / 2, currentY + rowHeight / 2, { align: 'center', baseline: 'middle' });
          doc.rect(startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), currentY - rowHeight, colWidths[colIndex], rowHeight); // Draw data cell
        });
  
        currentY += rowHeight; // Move to the next row
      });
  

   // Footer (Verifier's signature at the bottom)
   doc.setFontSize(12);
   doc.text('Verifier Signature: __________________', 10, doc.internal.pageSize.height - 10);


  // Save the PDF
  doc.save('verification_sheet.pdf');
}


}
