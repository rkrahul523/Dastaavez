export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        class: 'bg-info',
        icon: 'bi bi-bell',
        task: 'Create, Edit, Send, Delete a File',
        time: ''
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Track a File using FTS ID',
        time: ''
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-bag-check',
        task: 'See your Profile in My Profile section',
        time: ''
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: 'Manage roles of Users by Manage Roles Section',
        time: ''
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-person',
        task: 'Manage user by Manage Users Section',
        time: ''
    },

] 