import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { d, ff } from './r';

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
        if (key !== 'roll' && key !== 'sgpa' && key !== 'calSGPA') {
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



}
