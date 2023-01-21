import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, GridOptions, ColDef, SideBarDef } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileComponent } from '../create-file/create-file.component';
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

  pageSize=10;

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
    resizable: true,
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
    suppressHorizontalScroll: false,
    suppressColumnVirtualisation:true
    // CALLBACKS
   // getRowHeight: () => 25
}
  columnDefs = FILE_INFO_COLUMS;

  rowData = [
    {
      docket:'NITP/ee',
      fts_id: 'FTS01',
      file_title:'Project Purchase',
      file_status: 'created',
      document_type: 'Envelope',
      subject_area: 'EE',
      priority: 'Normal',
      file_station: 'Across Department',
      creation_date: '25/01/2023 17:53',
      sent_to: 'EE',
      sent_date: '26/01/2023 17:53'
  }
  ];
constructor( private ngbModal : NgbModal,
  ) {}
  // constructor( private gridApi: GridApi,
  // private  gridColumnApi: ColumnApi) {}

  ngOnInit(): void {
  }


createColumns(){

}

  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridColumnApi.autoSizeAllColumns();
    this.onPageSizeChanged();
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
createfile(){
const modelRef = this.ngbModal.open(CreateFileComponent,{
  size:"xl",
  keyboard:false,
  backdrop:true
});

}


onPageSizeChanged() {
  this.gridApi.paginationSetPageSize(Number(this.pageSize));
}



}
