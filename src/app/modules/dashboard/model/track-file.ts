export interface ITrackFile{
    status: string,
    updatedon: string,
    updatedby: string | number,
    name?:string,
    comments: string,
    remarks: string, 
    order:number,
    action_department:string
}