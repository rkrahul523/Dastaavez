

export function getMeaningFullNames(key: string){
 let foundKey=''
    
    switch (key) {
        case 'creation_date':
            foundKey= 'Created On'
            break;
        case 'docket':
            foundKey= 'Docket No'
            break;
        case 'document_type':
            foundKey= 'Document Type'
            break;
        case 'file_station':
            foundKey= 'File Station'
            break;
        case 'file_status':
            foundKey= 'File Status'
            break;
        case 'priority':
            foundKey= 'Priority'
            break;
        case 'file_title':
            foundKey= 'File Title'
            break;
        case 'sent_to':
            foundKey= 'Sent To'
            break;
        case 'subject_area':
            foundKey= 'Subject Area'
            break;
        case 'fts_id':
            foundKey= 'FTS ID'
            break;
        case 'sent_date':
            foundKey= 'Sent Date'
            break;
    
        default:
            foundKey= 'details'
            break;
    }

    return foundKey;
} 



export const viewingAllowedCreation=[
    "creation_date",
    "docket",
    "document_type",
    "file_station",
    "file_status",
    "file_title",
    "fts_id",
    "priority",
    "sent_date",
    "subject_area",
    "sent_to",
]

