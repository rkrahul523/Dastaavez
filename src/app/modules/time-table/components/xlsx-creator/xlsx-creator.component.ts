import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { subjectCodes, GRADES } from '../../model/grades';
import { tableKeys } from './tablekeys';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-xlsx-creator',
  templateUrl: './xlsx-creator.component.html',
  styleUrls: ['./xlsx-creator.component.scss']
})
export class XlsxCreatorComponent implements OnInit {
  jsonFileContent: any = null;
  xlsxJsonContent: any = [];
  jsonError: string | null = null;
  xlsxError: string | null = null;
  currentSub: any=[];

  

  keyIndexNo: any={}



  ngOnInit(){

  }

  // Event handler for JSON file upload
  onJsonUpload(event: any): void {
    const file = event.target.files[0];
    this.jsonError = null;
    
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.jsonFileContent = JSON.parse(e.target.result);
          const res: number= this.identifyCode(this.jsonFileContent);
          this.currentSub= subjectCodes[res-1];
        
        } catch (error) {
          this.jsonError = 'Invalid JSON format';
        }
      };
      reader.readAsText(file);
    } else {
      this.jsonError = 'Please upload a valid JSON file';
    }
  }

  // Event handler for XLSX file upload
  onXlsxUpload(event: any): void {
    const file = event.target.files[0];
    this.xlsxError = null;

    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert worksheet to JSON (Key-Value pairs using first row as keys)
        this.xlsxJsonContent = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Process and convert to key-value pair based on the first row
        if (this.xlsxJsonContent.length > 1) {
          const keys = this.xlsxJsonContent[0]; // First row contains keys
          const values = this.xlsxJsonContent.slice(1); // Subsequent rows contain values


          keys.forEach((res: any,index:number)=>{
           if(tableKeys.includes(res)){
            this.keyIndexNo[`${res}`]= index;
           }
          })

          // Convert to key-value pair objects
          // this.xlsxJsonContent = values.map((row: any[]) => {
          //   const obj: any = {};
          //   keys.forEach((key: string, index: number) => {
          //     obj[key] = row[index] && row[index]!=0 ? row[index] : '';
          //   });
          //   return obj;
          // });
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.xlsxError = 'Please upload a valid XLSX file';
    }
  }

 

  identifyCode(Data:any):number{

    const eachsubjects=Data[0].grades.map((v:any)=> v.subcode);
   const indexof= subjectCodes.findIndex((t:any)=> (t.sub.map((v:any)=> v.subcode)).every((s:any)=> eachsubjects.includes(s)))
     return indexof>-1 ? indexof+1 : 1;
 
   }
 
  

getGradePoints(grade:string){
  const filter= GRADES.filter(v=> v.grade==grade);
  if(filter.length){
   return filter[0].point
  }
  return 0;
}


   calculate(){
    const finalData=[...this.xlsxJsonContent] ;
    const marksData= [...this.jsonFileContent];

    finalData.forEach((markEntry, index) => {
      if(index!=0){
          // Find the corresponding student in finalOutput

          const REGN_NO= 'REGN_NO' in this.keyIndexNo ? finalData[index][this.keyIndexNo['REGN_NO']] : 0;


      let studentOutput = marksData.find((output: any) => REGN_NO == output.roll);
      if (studentOutput) {
          // Set SGPA
            const SGPA= 'SGPA' in this.keyIndexNo ? this.keyIndexNo['SGPA'] : 0;
            finalData[index][SGPA]= studentOutput.sgpa.toString();
            
          
  
          // Iterate through each grade entry for the student
          studentOutput.grades.forEach((gradeObj: any, ind: number) => {
              // Find the matching subject details
              const subject = this.currentSub.sub.find((sub: any) => sub.subcode === gradeObj.subcode);
              if (subject) {
                  const gradePoints = this.getGradePoints(gradeObj.grade);
                  const creditPoints = subject.credit * gradePoints;
                  
                  finalData[index][this.keyIndexNo[`SUB${ind + 1}NM`]] =subject.name;
                  // markEntry[`SUB${index + 1}NM`] = subject.name;
                
                  // Fill in the subject details in the final output
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}`] ]= subject.subcode;
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}_GRADE`] ]= gradeObj.grade;
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}_GRADE_POINTS`]] = gradePoints.toString();
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}_CREDIT`] ]= subject.credit.toString();
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}_CREDIT_POINTS`]] = creditPoints.toString();
                   finalData[index][this.keyIndexNo[`SUB${ind + 1}_TYPE`]] = subject.type;
              }
          });
      }

      }
   
  });



return finalData;
   }


  // Action to handle both uploads when "Create" button is clicked
  onCreate(): void {
    if (this.jsonFileContent && this.xlsxJsonContent) {

      try{
        const result= this.calculate();
        this.exportToExcel(result)
      }catch(e){
        alert("ERRor occured")
      }
   
     
      alert('Files processed successfully!');
    } else {
      alert('Please upload both JSON and XLSX files');
    }
  }


  exportToExcel(data: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data); // Convert array of arrays to sheet
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] }; // Create a workbook

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // Convert workbook to binary array
    this.saveAsExcelFile(excelBuffer, "ExportedFile"); // Save file
  }

  // Helper method to save the file
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }


}
