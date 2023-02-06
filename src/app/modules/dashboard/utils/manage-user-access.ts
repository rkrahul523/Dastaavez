


// { "u_id": 1, "name": "Rahul kumar", "department": "Academic", "user_name": "test", "role": "Director" }
// who can able to delete

import { IRoles } from '../model/user';

export const accessToDelete=[
    IRoles.DIRECTOR,
    // IRoles.SUPERVISOR,
]


export const routeAccessToManageUsers=[
    IRoles.DIRECTOR,
    IRoles.SUPERVISOR,
]




