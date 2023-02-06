import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, ColDef, SideBarDef, GridOptions } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { RECEIVED_FILE_COLUMS } from '../../utils/receive-file.const';
import { d } from '../receive-file/xt';
import { DEPARTMENT_FILES_COLUMS } from '../../utils/department-file';

@Component({
  selector: 'app-department-files',
  templateUrl: './department-files.component.html',
  styleUrls: ['./department-files.component.scss']
})
export class DepartmentFilesComponent implements OnInit {


  modules = AllModules;
  components: any;

  gridApi: GridApi
  gridColumnApi: ColumnApi

  pageSize = 10;

  @ViewChild('department-file-info') grid!: AgGridAngular;

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
    suppressMenu: true,
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
  gridOptions: GridOptions = {
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
    suppressColumnVirtualisation: true,
    // CALLBACKS
    getRowHeight: () => 45
  }
  columnDefs = DEPARTMENT_FILES_COLUMS;

  rowData = d; //d


  constructor() { }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
   // this.getReceivedFileDetails();
   // this.onPageSizeChanged();
  }


  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }


}
