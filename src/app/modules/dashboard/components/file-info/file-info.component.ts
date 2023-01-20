import { Component, OnInit } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi } from '@ag-grid-community/core';
@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss']
})
export class FileInfoComponent implements OnInit {

  modules = AllModules;
  components: any;

  gridApi: GridApi
  gridColumnApi: ColumnApi
  columnDefs = [
    {
      headerName: "Product",
      field: "product",
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
      valueFormatter:(params: any) => {
        const currentPrice = params.data.currentPrice;
        return this.formatWithCurrency(currentPrice.amount, currentPrice.currency);
      }  
    },
    {
      headerName: "New price",
      colId: 'newPrice',
      field: 'newPrice.amount',
      /* valueFormatter will not be included in the export file */
      valueFormatter:(params: any) => { 
        const newPrice = params.data.newPrice;
        return this.formatWithCurrency(newPrice.amount, newPrice.currency);
      }  
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
  ];

  rowData = [
    {
      product: "Toyota Celica",
      currentPrice: {amount: 29000, currency: 'USD'},
      newPrice: {amount: 30000, currency: 'USD'},
      country: "Japan"
    },
    {
      product: "Ford Mondeo",
      currentPrice: {amount: 36000, currency: 'USD'},
      newPrice: {amount: 38000, currency: 'USD'},
      currency: '$',
      country: "USA"
    },
    {
      product: "Porsche Boxster",
      currentPrice: {amount: 62000, currency: 'EUR'},
      newPrice: {amount: 60000, currency: 'EUR'},
      currency: '€',
      country: "Germany"
    }
  ];

  // constructor( private gridApi: GridApi,
  // private  gridColumnApi: ColumnApi) {}

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  exportAsExcel(filename?: string): void {
    this.gridApi.exportDataAsExcel({
      columnKeys: this.generateColumnsForExcel(),
      processCellCallback: function (params) {
        if (params.column.getColId() === 'currentPrice') {
          return params.value?.amount + ' ' + params.value?.currency;
        }
        return params.value;
      }
    })
  }

  generateColumnsForExcel(): string[] {
    const keys = this.gridColumnApi
      .getAllDisplayedColumns()
      .map(column => column.getColId())

    const amountIndex: number = keys.findIndex(column => column === 'newPrice');
    keys.splice(amountIndex + 1, 0, 'currency');
 
  return keys;
}

formatWithCurrency(amount: number, code: string): any {
  switch (code) {
    case 'USD': return amount + ' $';
    case 'EUR': return amount + ' €';
    return amount + '';
  }
}

}
