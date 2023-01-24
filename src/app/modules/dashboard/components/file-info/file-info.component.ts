import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, GridOptions, ColDef, SideBarDef } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileComponent } from '../create-file/create-file.component';
import { ApiService } from '../../services/api-service';
import { CommonActionTemplateComponent } from '../common-action-template/common-action-template.component';
import { ToastrService } from 'ngx-toastr';
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

  pageSize = 10;

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
    suppressColumnVirtualisation: true
    // CALLBACKS
    // getRowHeight: () => 25
  }
  columnDefs = FILE_INFO_COLUMS;

  rowData = [
    {
      docket: 'NITP/ee',
      fts_id: 'FTS01',
      file_title: 'Project Purchase',
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
  constructor(private ngbModal: NgbModal,
    private api: ApiService,
    private toast:ToastrService
  ) { }
  // constructor( private gridApi: GridApi,
  // private  gridColumnApi: ColumnApi) {}

  ngOnInit(): void {
  }


  createColumns() {

  }

  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;


    this.getAllFiles();
  }




  getAllFiles() {
    this.api.getCreatedFileDetails().subscribe((res: any) => {
      this.rowData = res.data;
      this.gridColumnApi.autoSizeAllColumns();
      this.onPageSizeChanged();
    })

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
  createfile() {
    const modalRef = this.ngbModal.open(CreateFileComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });


    modalRef.componentInstance.createdFileStatus.subscribe((createdFileStatus: any) => {
      if (createdFileStatus && createdFileStatus.status) {
        this.getAllFiles();
      }
    })

  }

  sendfile() {

     const selectedData = this.gridApi.getSelectedRows();
     if(selectedData.length){
          const unsentData=selectedData.filter(res=> !res.sent_to);
          if(unsentData.length){
            const modalRef = this.ngbModal.open(CommonActionTemplateComponent, {
              size: "xl",
              keyboard: false,
              backdrop: true
            });

            modalRef.componentInstance.fileToSend=unsentData;

            modalRef.componentInstance.sentFileStatus.subscribe((sentFileStatus: any) => {
              if (sentFileStatus && sentFileStatus.status) {
                this.getAllFiles();
              }
            })

                 
          }else{
            this.warnToast('Selected Files are already Sent/Operational');
          }

          

     }else{
      this.warnToast('Please select a File');
     }


  }


  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }


  private warnToast(message: any){
    this.toast.info(message, 'File Info', {
      timeOut: 3000,
    });
  }



}
