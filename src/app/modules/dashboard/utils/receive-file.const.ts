export const RECEIVED_FILE_COLUMS = [
    {
        headerName: '',
        width: 10,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        supressSorting: true,
        supressToolPanel: true,
        pinned: true,
        supressMenu: true,
        filter: false,
        lockPosition: true,
        lockVisibile: true,
        suppressSizeToFit : false,
        colId: 'action',
        field: "checkbox",
    },
    {
        headerName: "Docket No",
        field: "docket",
        filter: 'agTextColumnFilter',
        sortable: true,
        width:350,
        menuTabs: ['filterMenuTab'],
        //   suppressMenu: false ,
    },
    {
        headerName: "FTS ID",
        field: "fts_id",
        width:200,
        sortable: true,
        filter: false,
    },
    {
        headerName: "File Title",
        colId: 'title',
        field: 'file_title',
        width:200,
    },
    {
        headerName: "File Status",
        width:600,
        field: 'file_status',   
    },
    {
        headerName: "Document Type",
        width:600,
        field: 'document_type',   
    },
    {
        headerName: "Subject Area",
        width:200,
        field: 'subject_area',   
    },
    {
        headerName: "File Station",
        field: "file_station",
        width:200,
        sortable: true,
    },
    {
        headerName: "Priority",
        field: "priority",
        width:200,
        sortable: true,
    },
    {
        headerName: "Received On",
        field: "received_date",
        width:200,
        sortable: true,
    },
    {
        headerName: "Sent To",
        field: "sent_to",
        width:200,
        sortable: true,
    },
    {
        headerName: "Sent On",
        field: "sent_date",
        width:200,
        sortable: true,
    },




   
]