import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, ColDef, SideBarDef, GridOptions } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { RECEIVED_FILE_COLUMS } from '../../utils/receive-file.const';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service';
import { ISendFile } from '../../model/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonActionTemplateComponent } from '../common-action-template/common-action-template.component';
import { d } from './xt';
import { FilesDetailsComponent } from '../files-details/files-details.component';

@Component({
  selector: 'app-receive-file',
  templateUrl: './receive-file.component.html',
  styleUrls: ['./receive-file.component.scss']
})
export class ReceiveFileComponent implements OnInit {

  active = 1;
  ftsId: any

  modules = AllModules;
  components: any;

  gridApi: GridApi
  gridColumnApi: ColumnApi

  pageSize = 10;

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
  columnDefs = RECEIVED_FILE_COLUMS;

  rowData = []; //d
  bbb = [
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
    private api: ApiService,
    private ngbModal: NgbModal,
  ) { }

  ngOnInit(): void {
  }






  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.getReceivedFileDetails();
   // this.onPageSizeChanged();
  }


  exportAsExcel(onlySelected?: boolean): void {
    const selectedData = this.gridApi.getSelectedRows();
    if (onlySelected && !selectedData.length) {
      this.warnToast('Please select a record');
      return;
    }

    if (!this.rowData.length) {
      this.warnToast('Records are empty!!');
      return;
    }


    this.gridApi.exportDataAsExcel({
      fileName: 'fts_data',
      sheetName: 'File Tracking System',
      rowHeight: 30,
      headerRowHeight: 40,
      onlySelected,
      columnKeys: this.generateColumnsForExcel(),
      processCellCallback: function (params) {
        // if (params.column.getColId() === 'currentPrice') {
        //   return params.value?.amount + ' ' + params.value?.currency;
        // }
        return params.value;
      }
    })
  }

  generateColumnsForExcel(): string[] {
    const keys = this.gridColumnApi
      .getAllDisplayedColumns()
      .map(column => column.getColId())

    // const amountIndex: number = keys.findIndex(column => column === 'newPrice');
    // keys.splice(amountIndex + 1, 0, 'currency');
    return keys.slice(1);
  }




  getReceivedFileDetails() {
    this.api.getReceivedFileDetails().subscribe((res: any) => {
      if (res && res.status) {
        this.rowData = res.data;
        setTimeout(() => {
          this.gridColumnApi.autoSizeAllColumns();
          this.onPageSizeChanged();
        })

      } else {
        this.rowData = [];
      }

    })
  }


  private warnToast(message: string) {
    this.toastr.info(message, 'Receive File Info', {
      timeOut: 3000,
    })
  }
  private successToast(message: string) {
    this.toastr.success(message, 'Receive File Info', {
      timeOut: 3000,
    })
  }
  private errorToast(message: string) {
    this.toastr.error(message, 'Receive File Info', {
      timeOut: 3000,
    })
  }

  sendfile() {

    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length) {
      const unsentData = selectedData.filter(res => !res.sent_to);
      if (unsentData.length) {
        const modalRef = this.ngbModal.open(CommonActionTemplateComponent, {
          size: "xl",
          keyboard: false,
          backdrop: true
        });

        modalRef.componentInstance.sendFileIdentifier = ISendFile.SEND_RECEIVED_FILES;
        modalRef.componentInstance.fileToSend = unsentData;

        modalRef.componentInstance.sentFileStatus.subscribe((sentFileStatus: any) => {
          if (sentFileStatus && sentFileStatus.status) {
            this.getReceivedFileDetails();
          }
        })


      } else {
        this.warnToast('Selected Files are already Sent/Operational');
      }



    } else {
      this.warnToast('Please select a File');
    }


  }



  formulateRecords(comments: string, previousStatus: string, fileData: any) {
    let file = [
      {
        key: `File ${previousStatus} with Message`,
        value: comments
      }
    ]

    Object.keys(fileData).forEach((key: string) => {
      let fileKey = {
        key: key,
        value: fileData[key]
      }

      file.push(fileKey)
    })
    return file;
  }


  openReceiveModal() {
    if (this.ftsId.length) {
      const ftsId = { fts_id: this.ftsId }
      this.api.checkFile(ftsId).subscribe((res: any) => {
        if (res && res.status) {
          this.api.successToast(res.message, 'File Status');
          const checkedFileData = res.data;
          const viewFileData = this.formulateRecords(checkedFileData.comments, checkedFileData.previousStatus, checkedFileData.fileData)

          const modalRef = this.ngbModal.open(FilesDetailsComponent, {
            size: "lg",
            keyboard: false,
            backdrop: true
          });
          modalRef.componentInstance.details = viewFileData;
          modalRef.componentInstance.users = checkedFileData.availableUser;
          modalRef.componentInstance.fts_id = this.ftsId;

          modalRef.componentInstance.fileStatus.subscribe((fileStatus: any) => {
            if (fileStatus) {
              if(fileStatus.status){
              if (fileStatus.action == 'Received') {
                //this.active =1;
                this.api.successToast(fileStatus.message, 'Receive File')
                this.getReceivedFileDetails();
                // this.getAllFiles();
              }
            }else{
              this.api.errorToast(fileStatus.message, 'Receive File')
            }
            }
          })
        } else {
          this.api.errorToast(res.message, 'Unauthorised')
        }
      })


    } else {
      this.warnToast('Selected Files are already Sent/Operational');
    }
  }

  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }

}
