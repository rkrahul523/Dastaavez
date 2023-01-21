export const FILE_INFO_COLUMS=[
    {
headerName:'',
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
colId:'action',

    },
    {
      headerName: "Product",
      field: "product",
      filter: 'agTextColumnFilter',
    sortable: true,
    menuTabs:['filterMenuTab'],
      suppressMenu: false ,
    },
    {
      headerName: "Country",
      field: "country"
    },
    {
      headerName: "Current price",
      colId: 'currentPrice',
      field: 'currentPrice',
      /* valueFormatter will not be included in the export file, processCellCallback in exportAsExcel() will handle formatting for this column */
    //   valueFormatter:(params: any) => {
    //     const currentPrice = params.data.currentPrice;
    //     return this.formatWithCurrency(currentPrice.amount, currentPrice.currency);
    //   }  
    },
    {
      headerName: "New price",
      colId: 'newPrice',
      field: 'newPrice.amount',
      /* valueFormatter will not be included in the export file */
    //   valueFormatter:(params: any) => { 
    //     const newPrice = params.data.newPrice;
    //     return this.formatWithCurrency(newPrice.amount, newPrice.currency);
    //   }  
    },
    {
      /* this column is used only in the export file, it is hidden from the table and all menus */
      headerName: 'Currency',
      colId: 'currency',
      field: 'newPrice.currency',
      hide: true,
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true
    },
  ]