import { IDepartment } from './all-departments';


export enum IPriority {
    NORMAL = 'Normal',
    URGENT = 'Urgent',
    IMMEDIATE = 'Immediate'
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
    RECEIVED = 'Received',
    OPERATIONAL = 'Operational',
    STORED = 'Stored',
    REJECTED = 'Rejected',
    DECLINED = 'Declined',
    DELETED='Deleted'
}

export enum IFileStation {
    ACROSS = 'Across Department',
    WITHIN = 'Within Department'
}
export enum ISendFile {
    SEND_RECEIVED_FILES = 'send-received-files',
    // WITHIN = 'Within Department'
}

export const fileStatusText = {
    CREATED: 'Created',
    SENT: 'Sent',
    CLOSED: 'Closed',
    OPERATIONAL: 'Operational',
    STORED: 'Stored',
    REJECTED: 'Rejected',
    RECEIVED: 'Received',
    DECLINED: 'Declined',
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






