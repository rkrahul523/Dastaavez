export enum IRegisteredStatus{
    CREATED='Created',
    APPROVED='Approved',
    REJECTED='Rejected',
    DELETED='Deleted'
}


export enum IUserStatus{
    ACTIVE= 'Active',
    INACTIVE= 'Inactive',
}





export enum IRoles{
    SUPERVISOR='Supervisor',
    DIRECTOR='Director',
    STAFF='Staff'
}

export const normalRoles=[
    IRoles.SUPERVISOR,
    IRoles.STAFF,
]







export interface IManageRoles{
        u_id : number,
        user_name: string,
        name: string ,
        role: string, 
        department : string,
        status?:string ,
        issave?: boolean    
        is_active?: boolean    
}