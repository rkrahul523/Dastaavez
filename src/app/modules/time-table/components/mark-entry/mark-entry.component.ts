import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GRADES, SUBJECTS } from '../../model/grades';

@Component({
  selector: 'app-mark-entry',
  templateUrl: './mark-entry.component.html',
  styleUrls: ['./mark-entry.component.scss']
})
export class MarkEntryComponent implements OnInit {

  jsonData: any;

  gradeForm: FormGroup;
  xlsxData:any=[]
  submittedData: any[] = [];  // Holds the data for the table
  gradesip=GRADES;
  subjects=SUBJECTS

  originaldata:any=[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gradeForm = this.fb.group({
      roll: ['', Validators.required],
      sgpa: ['', Validators.required],
      // subjectCode: ['', Validators.required],
      grades: this.fb.array([])
    });
    this.addForm()
  }

  addForm(){
    this.subjects.forEach((res:any)=>{
     this.addGrade(res.subcode,res.credit)
    })
    this.gradeForm.updateValueAndValidity();
  }

  // Getter for the form array
  get grades() {
    return this.gradeForm.get('grades') as FormArray;
  }

  // Create the grade form group
  createGradeForm(subcode:string,credit:number): FormGroup {
    return this.fb.group({
      subcode: [subcode, ],
      grade: ['', Validators.required],
      credit: [subcode, ],
      point: ['', ]
    });
  }

  // Add a new grade form field
  addGrade(subcode:string,credit:number) {
    this.grades.push(this.createGradeForm(subcode, credit));
  }

  // Remove a grade form field
  removeGrade(index: number) {
    this.grades.removeAt(index);
  }

  // Submit form and add data to the table
  onSubmit() {

    if (this.gradeForm.valid) {
      const gradeForm=this.gradeForm.value;
      const indexof= this.originaldata.findIndex((c:any)=> c.roll==gradeForm.roll )
      if(indexof>-1){
        alert("Already Added")
        return;
      }
 this.originaldata.push(this.gradeForm.value)
      const final={roll:gradeForm.roll, sgpa: gradeForm.sgpa}
      let gradeMapping: any = {};

      gradeForm.grades.forEach((item:any )=> {
    // Use subcode as key, grade as value
    gradeMapping[item.subcode] = item.grade;
});
      this.submittedData.push({...final, ...gradeMapping});
      // this.gradeForm.reset();  // Reset form after submission
      // Reset the form array
      // while (this.grades.length > 0) {
      //   this.grades.removeAt(0);
      // }
     // this.grades.push(this.createGradeForm());
    }
  }

  // Download data as JSON
  downloadAsJson() {
    const jsonData = JSON.stringify(this.originaldata, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data.json');
  }

  // Download data as XLSX
  downloadAsExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.xlsxData);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'data.xlsx');
  }


  formulateDataasTable(data: any): any{
    const tableData:any=[];

    data.forEach((tab:any)=>{
      const final={roll:tab.roll, sgpa: tab.sgpa}
      let gradeMapping: any = {};

      tab.grades.forEach((item:any )=> {
    // Use subcode as key, grade as value
      gradeMapping[item.subcode] = item.grade;
      });
      tableData.push({...final, ...gradeMapping})
    })
   return tableData;
  }

  formulateDataasXLSX(data: any): any{
    const tableData:any=[];

    data.forEach((tab:any)=>{
      const final={roll:tab.roll, sgpa: tab.sgpa}
      let gradeMapping: any = {};

      tab.grades.forEach((item:any )=> {
    // Use subcode as key, grade as value
      gradeMapping[item.subcode] = item.grade;
      gradeMapping[item.subcode+`_point`] = this.getPoint(item.grade);

      });
      tableData.push({...final, ...gradeMapping})
    })
   return tableData;
  }

  getPoint(grade:string){
    const filter= GRADES.filter(v=> v.grade==grade);
    if(filter.length){
     return filter[0].point
    }
    return 0;
  }

 
  // Handle file upload and read JSON file
  onFileUpload(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const jsonString = fileReader.result as string;
      try {
        this.jsonData = JSON.parse(jsonString);
        this.submittedData= this.formulateDataasTable(this.jsonData);
        this.xlsxData= this.formulateDataasXLSX(this.jsonData);
        alert('JSON file loaded successfully');
      } catch (error) {
        alert('Invalid JSON file');
      }
    };

    fileReader.readAsText(file);
  }


  getGradeClass(grade: string): string {
    switch (grade) {
      case 'A+':
        return 'grade-excellent marks'; // Green for excellent grades
      case 'A':
        return 'grade-excellent-low marks'; // Green for excellent grades
      case 'B+':
        return 'grade-good marks'; // Blue for good grades
      case 'B':
        return 'grade-good-low marks'; // Blue for good grades
      case 'C+':
        return 'grade-average marks'; // Yellow for average grades
      case 'C':
        return 'grade-average-low marks'; // Yellow for average grades
      case 'F':
        return 'grade-fail marks'; // Red for failing grades
      default:
        return ''; // No specific class for other grades
    }
  }

}



