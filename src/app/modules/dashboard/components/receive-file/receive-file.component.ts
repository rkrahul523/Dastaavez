import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, ColDef, SideBarDef, GridOptions } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { RECEIVED_FILE_COLUMS } from '../../utils/receive-file.const';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service';
import { ISendFile, IFileStatus } from '../../model/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonActionTemplateComponent } from '../common-action-template/common-action-template.component';
import { d } from './xt';
import { FilesDetailsComponent } from '../files-details/files-details.component';
import { IFileSection } from '../../model/section';
import { IModalAction } from '../../model/action';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { viewingAllowedFetched } from '../../model/received-file';
import { getMeaningFullNames } from '../../model/created-file';

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

  frameworkComponents = {
    actionControlRenderer: ActionRendererComponent,
  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 40,
    // allow every column to be aggregated
    enableValue: true,
    floatingFilter: true,
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
  columnDefs: any = [];

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
    this.createColumns();
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

  sendfile(data: any) {

    const selectedData = data;
    if (selectedData.length) {
      const unsentData = selectedData.filter((res: any) => res.file_status == IFileStatus.CREATED || res.file_status == IFileStatus.REJECTED);
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
            this.api.successToast(sentFileStatus.message, 'Send Fileß')
            this.getReceivedFileDetails();
          }else{
            this.api.errorToast(sentFileStatus.message, 'Send File Error');
          }
        })
      } else {
        this.warnToast('Selected Files are already Sent/Operational');
      }
    } else {
      this.warnToast('Please select a File');
    }


  }



  formulateRecords(fileData: any, lastComment: any = null) {
    let file: any = [];
    if (lastComment) {
      file = [
        {
          key: `File ${lastComment.status} with Message`,
          value: lastComment.comments
        },
        {
          key: `${lastComment.status} By`,
          value: `${lastComment.name} (${lastComment.department})`
        },
        {
          key: `${lastComment.status} Date`,
          value: `${lastComment.updatedon}`
        }
      ]
    }

    Object.keys(fileData).forEach((key: string) => {
      if(viewingAllowedFetched.includes(key))
      {
      let fileKey = {
        key: getMeaningFullNames(key),
        value: fileData[key]
      }

      file.push(fileKey)
    }
    })
    return file;
  }



  createColumns() {


    const columns = [
      {
        headerName: '',
        width: 40,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        supressSorting: true,
        supressToolPanel: true,
        pinned: true,
        supressMenu: true,
        filter: false,
        lockPosition: true,
        lockVisibile: true,
        suppressSizeToFit: false,
        colId: 'check',
        field: "checkbox",
      },
      {
        headerName: 'File Action',
        colId: 'action',
        width: 300,
        pinned: true,
        filter: false,
        cellRenderer: 'actionControlRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          label: IFileSection.RECEIVE
        }
      },
    ]

    const finalColumn = [...columns, ...RECEIVED_FILE_COLUMS]
    this.columnDefs = finalColumn;
  }

  onBtnClick(fileEvent: any) {
    if (fileEvent.event == "Send") {
      this.sendfile([fileEvent.rowData]);
    }
    // if (fileEvent.event == "Modify") {
    //   this.modifyfile([fileEvent.rowData]);
    // }
    if (fileEvent.event == "View") {
      this.viewFileStatus(fileEvent.rowData);
    }
    //  this.rowDataClicked1 = e.rowData;
  }


  viewFileStatus(rowData: any) {
    if (rowData.file_status == IFileStatus.REJECTED || rowData.file_status == IFileStatus.RECEIVED) {
      // fetch last comments
      const fts = { fts_id: rowData.fts_id }
      this.api.getLastComment(fts).subscribe((res: any) => {
        if (res && res.status) {
          const lastCommentData = res.data.lastComment;
          this.openViewModal(rowData, lastCommentData)
        } else {
          this.api.errorToast(res.message, 'View File Error')
        }
      })
    } else {
      this.openViewModal(rowData)
    }
  }

  openViewModal(details: any, lastComment = null){
    const modalRef = this.ngbModal.open(FilesDetailsComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });
    modalRef.componentInstance.details = this.formulateRecords(details, lastComment);
    modalRef.componentInstance.modalActionType =IModalAction.VIEW;
  }


  openReceiveModal() {
    if (this.ftsId.length) {
      const ftsId = { fts_id: this.ftsId }
      this.api.checkFile(ftsId).subscribe((res: any) => {
        if (res && res.status) {
          this.api.successToast(res.message, 'File Status');
          const checkedFileData = res.data;
          const formatted=  checkedFileData.lastComment;

          const viewFileData = this.formulateRecords(checkedFileData.fileData, formatted)

          const modalRef = this.ngbModal.open(FilesDetailsComponent, {
            size: "lg",
            keyboard: false,
            backdrop: true
          });
          modalRef.componentInstance.details = viewFileData;
          modalRef.componentInstance.users = checkedFileData.availableUser;
          modalRef.componentInstance.receiveId = formatted && 'receiveId' in formatted ? formatted.receiveId: null;
   
          
          modalRef.componentInstance.fts_id = this.ftsId;

          modalRef.componentInstance.fileStatus.subscribe((fileStatus: any) => {
            if (fileStatus) {
              if(fileStatus.status){
              if (fileStatus.action == 'Received' || fileStatus.action == 'Rejected') {
                //this.active =1;
             //   this.api.successToast(fileStatus.message, 'File Info')
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
