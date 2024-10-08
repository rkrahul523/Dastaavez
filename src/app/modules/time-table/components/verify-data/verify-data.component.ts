import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


interface MasterStudent {
  roll: number;
  sgpa: number;
  [key: string]: any;  // For dynamic subject fields
}

interface CompareStudent {
  roll: string;
  SGPA: string;
  [key: string]: any;  // For dynamic subject fields
}

@Component({
  selector: 'app-verify-data',
  templateUrl: './verify-data.component.html',
  styleUrls: ['./verify-data.component.scss'],
  providers: [
    NgbActiveModal,
]
})
export class VerifyDataComponent implements OnInit {
  @Input() submittedData: any=[];
  @Input() transformedData: any=[];
  masterData :Record<string, any>[] = []

  constructor(  private ngbModal: NgbActiveModal,){

  }
  ngOnInit(): void {
    if(this.submittedData.length &&  this.transformedData.length){
      this.compareStudentData(this.submittedData, this.transformedData)
    }
  }


  compareStudentData(masterData: MasterStudent[], compareData: CompareStudent[]) {
    // Loop through each student in the master data
    masterData.forEach(Student => {
      let masterStudent=Student;
      if('isMiss' in masterStudent){
        masterStudent['isMiss']=false;
      }
      if('isError' in masterStudent){
        masterStudent['isError']=false;
      }
      // Find the corresponding student in compareData by roll number
      const compareStudent = compareData.find(cs => cs.roll === String(masterStudent.roll));
  
      
      // If student is not found in the compare data, mark as missing
      if (!compareStudent) {
        masterStudent['isMiss'] = true;
        this.masterData.push(masterStudent);
        return; // Skip further processing for this student
      }
  
      // Compare SGPA
      if (String(masterStudent.sgpa) !== compareStudent.SGPA) {
        masterStudent['isError'] = true;
      }
  
      // Loop through master student's subjects and compare the grades
      for (const key in masterStudent) {
        if (key !== 'roll' && key !== 'sgpa' && key !== 'calSGPA' && key !== 'isError' && key !== 'isMiss' && key !== 'errorDetail') {
          // Compare each subject grade
          if (compareStudent[key] !== undefined) {
            if (masterStudent[key] !== compareStudent[key]) {
              masterStudent['isError'] = true; // Grade mismatch
              if('errorDetail' in masterStudent){
                masterStudent['errorDetail'].push(`Grade Mismatch of ${key}`)
              }else{
                masterStudent['errorDetail']= [`Grade Mismatch of ${key}`]
              }
            }
          } else {
            masterStudent['isError'] = true; // Subject code missing in compare data
            if('errorDetail' in masterStudent){
              masterStudent['errorDetail'].push(`Subject missiong ${key}`)
            }else{
              masterStudent['errorDetail']= [`Subject missiong ${key}`]
            }
          }
        }
      }

      this.masterData.push(masterStudent);

    });


    
  }




  getSubjectHeaders(data: any[]): string[] {
    const headers: Set<string> = new Set();
  
    data.forEach(student => {
      Object.keys(student).forEach(key => {
        if (key !== 'roll' && key !== 'sgpa' && key !== 'isError' && key !== 'isMiss' && key !== 'calSGPA' && key !== 'errorDetail') {
          headers.add(key);
        }
      });
    });
  
    return Array.from(headers);
  }
  
}
