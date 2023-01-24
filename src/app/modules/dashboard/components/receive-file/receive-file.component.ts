import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, ColDef, SideBarDef, GridOptions } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { RECEIVED_FILE_COLUMS } from '../../utils/receive-file.const';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-receive-file',
  templateUrl: './receive-file.component.html',
  styleUrls: ['./receive-file.component.scss']
})
export class ReceiveFileComponent implements OnInit {
  ftsId : any

  modules = AllModules;
  components: any;

  gridApi: GridApi
  gridColumnApi: ColumnApi

  pageSize=10;

  @ViewChild('receive-file-info') grid!: AgGridAngular;

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
  columnDefs = RECEIVED_FILE_COLUMS;

  rowData = [
  //   {
  //     docket:'NITP/ee',
  //     fts_id: 'FTS01',
  //     file_title:'Project Purchase',
  //     file_status: 'created',
  //     document_type: 'Envelope',
  //     subject_area: 'EE',
  //     priority: 'Normal',
  //     file_station: 'Across Department',
  //     received_date: '25/01/2023 17:53',
  //     sent_to: 'EE',
  //     sent_date: '26/01/2023 17:53'
  // }
  ];

  constructor(private toastr: ToastrService,
    private api: ApiService
    ) { }

  ngOnInit(): void {
  }
  


  receiveFile(){
   this.api.receiveFile(this.ftsId).subscribe((res: any) => {
    if (res ) {
      if(res.status){
      this.successToast(res.message);
      }else{
        this.errorToast(res.message);
      }
    }
  }
   )

  }


  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.getReceivedFileDetails();
    
    //this.onPageSizeChanged();
  }




  getReceivedFileDetails(){
   this.api.getReceivedFileDetails().subscribe((res: any) => {
    if(res && res.status){
      this.rowData = res.data;
      setTimeout(()=>{
        this.gridColumnApi.autoSizeAllColumns();
       // this.onPageSizeChanged();
      })
     
    }else{
      this.rowData = [];
    }
  
  })
  }


  private warnToast(message: string){
    this.toastr.info(message, 'Receive File Info', {
      timeOut: 3000,})
  }
  private successToast(message: string){
    this.toastr.success(message, 'Receive File Info', {
      timeOut: 3000,})
  }
  private errorToast(message: string){
    this.toastr.error(message, 'Receive File Info', {
      timeOut: 3000,})
  }

  sendfile(){
    
  }

}
