

export enum IPriority {
    NORMAL = 'Normal',
    URGENT = 'Urgent',
    IMMEDIATE = 'Immediate'
}
export enum IDepartment {
    ACADEMIC = 'Academic',
    ACCOUNTS = 'Accounts & Finance',
    ESTABLISHMENT = 'Establishment',
    PROCUREMENT = 'Procurement',
    CHEMISTRY='Chemistry'
}
export enum IShortDepartment {
    ACADEMIC = 'AC',
    ACCOUNTS = 'AF',
    ESTABLISHMENT = 'ES',
    PROCUREMENT = 'PR',
    CHEMISTRY='CH'
}

export enum ISubjectArea {
    ACADEMIC = 'Academic',
    FINANCE = 'Finance & Accounts',
    ESTABLISHMENT = 'Establishment',
    PURCHASE = 'Purchase and Works',
    CONSTRUCTION = 'Construction and Maintainance'
}


export enum IDocType {
    ENVELOPE = 'Closed Envelope',
    DOCUMENT = 'Open Document',
    FILE = 'File Cover',
    LETTER = 'Letter'
}
export enum IFileStatus {
    CREATED = 'Created',
    SENT = 'Sent',
    CLOSED = 'Closed',
    OPERATIONAL = 'Operational',
    STORED = 'Stored'
}

export enum IFileStation {
    ACROSS = 'Across Department',
    WITHIN = 'Within Department'
}
export enum ISendFile {
    SEND_RECEIVED_FILES = 'send-received-files',
    // WITHIN = 'Within Department'
}



export interface IFileInfo {
    docket?: string,
    fts_id?: string,
    file_title?: string,
    file_status?: IFileStatus,
    document_type?: IDocType,
    subject_area: ISubjectArea,
    priority: IPriority,
    file_station: IFileStation,
    creation_date: string,
    sent_to?: IDepartment,
    sent_date?: string,
    comments?: string,
}


export const ActiveDepartments=[
    IDepartment.ACADEMIC,
    IDepartment.ACCOUNTS,
    IDepartment.CHEMISTRY,
    IDepartment.ESTABLISHMENT,
    IDepartment.PROCUREMENT
]
export const shortNameDepartment=[
    IShortDepartment.ACADEMIC,
    IShortDepartment.ACCOUNTS,
    IShortDepartment.CHEMISTRY,
    IShortDepartment.ESTABLISHMENT,
    IShortDepartment.PROCUREMENT
]




