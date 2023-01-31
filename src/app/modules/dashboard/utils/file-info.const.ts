export const FILE_INFO_COLUMS = [
    
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
        width:350,
        // sortable: true,
        // filter: false,
    },
    {
        headerName: "File Title",
        colId: 'title',
        field: 'file_title',
        width:200,
        /* valueFormatter will not be included in the export file, processCellCallback in exportAsExcel() will handle formatting for this column */
        //   valueFormatter:(params: any) => {
        //     const currentPrice = params.data.currentPrice;
        //     return this.formatWithCurrency(currentPrice.amount, currentPrice.currency);
        //   }  
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
        headerName: "Created On",
        field: "creation_date",
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




    // {
    //     headerName: "New price",
    //     colId: 'newPrice',
    //     field: 'newPrice.amount',
    //     /* valueFormatter will not be included in the export file */
    //     //   valueFormatter:(params: any) => { 
    //     //     const newPrice = params.data.newPrice;
    //     //     return this.formatWithCurrency(newPrice.amount, newPrice.currency);
    //     //   }  
    // },
    // {
    //     /* this column is used only in the export file, it is hidden from the table and all menus */
    //     headerName: 'Currency',
    //     colId: 'currency',
    //     field: 'newPrice.currency',
    //     hide: true,
    //     suppressColumnsToolPanel: true,
    //     suppressFiltersToolPanel: true
    // },
]