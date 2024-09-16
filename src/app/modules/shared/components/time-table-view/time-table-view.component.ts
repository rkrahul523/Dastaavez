import { Component, OnInit } from '@angular/core';
import { TimeTableApiService } from 'src/app/modules/time-table/services/time-api-service';
import { employeeList } from 'src/app/modules/leave-tracking/model/employee-list';

@Component({
  selector: 'app-time-table-view',
  templateUrl: './time-table-view.component.html',
  styleUrls: ['./time-table-view.component.scss']
})
export class TimeTableViewComponent implements OnInit {



  adcFoundry=[
    {
    head: "Introduction tomaterial engineering",
    short:"IME",
    sub: "Dr. Amitesh Kumar",
    startTime:10,
    endTime:11,
    colspan: 1
  }
]
adcForge=[
    {
    head: "Introduction tomaterial engineering",
    short:"IME",
    sub: "Dr. Amitesh Kumar",
    startTime:10,
    endTime:11,
    colspan: 1
  }
]

btechpiesem1:any=[];
btechpiesem3:any=[];
btechpiesem5:any=[];

btechce1:any=[]
btechce3:any=[]
btechce5:any=[]

currentDay="FRI";
fetchedData:any=[]
avlFaculty:any=[]
occFaculty:any=[]


days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


  constructor(private api: TimeTableApiService) { }

  ngOnInit(): void {
    const currentTime = this.getAbbreviatedDayOfWeek(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })));
  

    this.currentDay= currentTime;
        
    this.getAllTime()
  }



  getAllTime(){
    
    this.api.getAlltime().subscribe((res: any) => {
      if (res && res.status) {

       this.fetchedData= res.data;
       this.calculateTimeTable();

        //console.log(res)
        // this.rowData = res.data;
        // setTimeout(() => {
        //   // this.gridColumnApi.autoSizeAllColumns();
        //   this.onPageSizeChanged();
        // })

      } else {
        // this.rowData = [];
      }

    })
  }


  changeDay(Day:string){
    this.currentDay= Day;
    this.calculateTimeTable()
  }

  

  calculateTimeTable(){
    this.fetchedData.forEach((element: any) => {

    

      // ADC_FORGE_SEM_1
      // BTECH_PIE_SEM_1
      // BTECH_PIE_SEM_3
  
  
      if('ADC_FOUNDRY_SEM_1' in element){
        const daydata= element.ADC_FOUNDRY_SEM_1[`${this.currentDay}`]
        this.adcFoundry= this.organiseSessions(daydata)
      }
      if('ADC_FORGE_SEM_1' in element){
        const daydata= element.ADC_FORGE_SEM_1[`${this.currentDay}`]
        this.adcForge= this.organiseSessions(daydata)
      }
      if('BTECH_PIE_SEM_1' in element){
        const daydata= element.BTECH_PIE_SEM_1[`${this.currentDay}`]
        this.btechpiesem1= this.organiseSessions(daydata)
      }
      if('BTECH_PIE_SEM_3' in element){
        const daydata= element.BTECH_PIE_SEM_3[`${this.currentDay}`]
        this.btechpiesem3= this.organiseSessions(daydata)
      }
      if('BTECH_PIE_SEM_5' in element){
        const daydata= element.BTECH_PIE_SEM_5[`${this.currentDay}`]
        this.btechpiesem5= this.organiseSessions(daydata)
      }
       
     });

     this.calculateAvlFaculty();
  }

  calculateAvlFaculty(){

    const all=employeeList.map(v=> v.name);
    const list=[...this.facultyisAvilable(this.adcFoundry), ...this.facultyisAvilable(this.adcForge),
      ...this.facultyisAvilable(this.btechpiesem1),
      ...this.facultyisAvilable(this.btechpiesem3),
      ...this.facultyisAvilable(this.btechpiesem5),
    ]
    const uniqueOcc = list.filter((value, index, self) => self.indexOf(value) === index);

    this.occFaculty= uniqueOcc//all.filter(item => !list.includes(item));
    this.avlFaculty= all.filter(item => !uniqueOcc.includes(item));

  }

  facultyisAvilable(list:any){
    if(!list){
      return [];
    }
    const filter= list.filter((v:any)=>this.isTimeBetween(v.startTime,v.endTime)).map((v:any)=> v.sub);

    return filter;

  }

  isTimeBetween(startHour:any, endHour: any) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Create Date objects for the start and end times
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0); // Set to startHour:00:00

    const endTime = new Date();
    endTime.setHours(endHour, 0, 0, 0); // Set to endHour:00:00

    // Check if current time is between startTime and endTime
    return now >= startTime && now < endTime;
}


organiseSessions(sessions: any){
  if(!sessions){
    return
  }
  const sortedSessions = sessions.sort((a: any, b: any) => a.startTime - b.startTime);

 let final: any=[];
let endTime=0

 sortedSessions.forEach((element: any,index: any) => {
   let startTime=9;

   if(index==0){
   if(element.startTime ==9){
     endTime= element.endTime;
    final.push(element)
   }else{
const before={
      "head": '',
      "sub": '',
      "course": element.course,
      "short": '',
      "startTime": 9,
      "endTime": element.startTime,
      "day": element.day
}
final.push(before)
    final.push(element)
     endTime= element.endTime;
   }
   }
   else{
     
     if(endTime == element.startTime){
       final.push(element)
       endTime= element.endTime;
     }else{
       const before={
      "head": '',
      "sub": '',
      "course": element.course,
      "short": '',
      "startTime": endTime,
      "endTime": element.startTime,
      "day": element.day
}
final.push(before)
    final.push(element)
     endTime= element.endTime;
       
     }
     
   }
   
 });

return final;
}



getAbbreviatedDayOfWeek(date: any) {
  // Array of abbreviated day names
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  const dayIndex = date.getDay();
  
  // Return the abbreviated day name
  return daysOfWeek[dayIndex];
}
}
