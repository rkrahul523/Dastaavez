import { IRoles } from '../model/user';



export const accessToEditDepartment=[
    IRoles.DIRECTOR,
    // IRoles.SUPERVISOR,
]
// export const accessToEditRole=[
//     IRoles.DIRECTOR,
//     // IRoles.SUPERVISOR,
// ]

// manage route access to manage roles
export const routeAccessToManageRoles=[
    IRoles.DIRECTOR,
    IRoles.SUPERVISOR,
]



export const avlRolesForDirector=[
    IRoles.DIRECTOR,
    IRoles.SUPERVISOR,
    IRoles.STAFF,
]
  export const avlRolesForSupervisor=[
    IRoles.SUPERVISOR,
    IRoles.STAFF,
]
  export const activeRoleText={
    SUPERVISOR:  IRoles.SUPERVISOR,
    STAFF: IRoles.STAFF,
    DIRECTOR: IRoles.DIRECTOR
  }
