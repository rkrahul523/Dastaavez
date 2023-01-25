export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '...',
        subtitle: 'Files Operational'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '...',
        subtitle: 'Files Pending'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '...',
        subtitle: 'Files Deleted'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '...',
        subtitle: 'Files Created'
    },

] 