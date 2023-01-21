import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, GridOptions, ColDef, SideBarDef } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
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

  @ViewChild('file-info') grid!: AgGridAngular;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 40,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: false,
    sortable: false,
    suppressMenu: true ,
    filter: false,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 20,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressRowGroups: true,
                suppressValues: true,
                supressSideButtons: false,
                supressColumnFilter: false,
                supressColumnSelectAll: false,
                supressColumnExpandAll: false,
            }
        }
    ]
}
gridOptions : GridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    
    pagination: true,
    rowSelection: 'multiple',

    // EVENTS
    // Add event handlers
    onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => console.log('The grid is now ready'),

    // CALLBACKS
   // getRowHeight: () => 25
}
  columnDefs = FILE_INFO_COLUMS;

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
