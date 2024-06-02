export const employeeList=[
    
    {
    name:"N.K. Singh",
    designation:"",
    id:1
},
    {
    name:"K.K. Singh",
    designation:"",
    id:2
},
    {
    name:"R.K. Odhar",
    designation:"",
    id:3
},
    {
    name:"Nandita Gupta",
    designation:"",
    id:4
},
    {
    name:"Manoj Kumar",
    designation:"",
    id:5
},
    {
    name:"Amitesh Kumar",
    designation:"",
    id:6
},
    {
    name:"Ajit Kr Pramanick",
    designation:"",
    id:7
},
    {
    name:"Vineet Chak",
    designation:"",
    id:8
},
    {
    name:"Deepak Kumar",
    designation:"",
    id:9
},
    {
    name:"Himanshu Khandelwal",
    designation:"",
    id:10
},
    {
    name:"R. Rahul Kulkarni",
    designation:"",
    id:11
},
    {
    name:"Vivek S Ayar",
    designation:"",
    id:12
},
    {
    name:"E. Hemachandran",
    designation:"",
    id:13
},
    {
    name:"Sunny Singhania",
    designation:"",
    id:14
},
    {
    name:"Anas Ahmad Siddique",
    designation:"",
    id:15
},
    {
    name:"Pavitra Singh",
    designation:"",
    id:16
},
    {
    name:"Shankar Behera",
    designation:"",
    id:17
},
    {
    name:"Chandan Kumar",
    designation:"",
    id:18
},
    {
    name:"Pran Kumar",
    designation:"",
    id:19
},
    {
    name:"Raju Ram",
    designation:"",
    id:20
},
    {
    name:"Jitray Munda",
    designation:"",
    id:21
},
    {
    name:"Munna Prasad",
    designation:"",
    id:22
},
    {
    name:"Rahul kumar",
    designation:"",
    id:23
},
    {
    name:"Md. Firoz",
    designation:"",
    id:24
},
    {
    name:"Divesher Mukhiyar",
    designation:"",
    id:25
},
    {
    name:"Vishal Kumar",
    designation:"",
    id:26
},


]




export function getEmployeeName(id:number){
     const foundIndex= employeeList.findIndex(res=> res.id==id);
     if(foundIndex>-1){
         return employeeList[foundIndex].name;
     }else{
         return ""
     }
}