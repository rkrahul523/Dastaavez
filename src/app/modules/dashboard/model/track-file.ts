export interface ITrackFile{
    status: string,
    updatedon: string,
    updatedby: string | number,
    name?:string,
    department?:string,
    comments: string,
    remarks: string, 
    order:number,
    action_department:string,
    filetitle:string,
}