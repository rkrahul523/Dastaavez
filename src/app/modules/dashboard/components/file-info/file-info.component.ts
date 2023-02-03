import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules, ColumnsToolPanelModule } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, GridOptions, ColDef, SideBarDef } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FILE_INFO_COLUMS } from '../../utils/file-info.const';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileComponent } from '../create-file/create-file.component';
import { ApiService } from '../../services/api-service';
import { CommonActionTemplateComponent } from '../common-action-template/common-action-template.component';
import { ToastrService } from 'ngx-toastr';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss']
})
export class FileInfoComponent implements OnInit {

  modules = AllModules;
  active = 1;

  stepperIndex = 1;

  frameworkComponents = {
    actionControlRenderer: ActionRendererComponent,
  }
  components: any;
  formcontent = null;
  createdFileData: any

  gridApi: GridApi
  gridColumnApi: ColumnApi

  pageSize = 10;

  @ViewChild('file-info') grid!: AgGridAngular;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 40,
    // allow every column to be aggregated
    //enableValue: true,
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
    minWidth: 40,
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
  columnDefs: any[] = [];

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
    private toast: ToastrService
  ) { }
  // constructor( private gridApi: GridApi,
  // private  gridColumnApi: ColumnApi) {}

  ngOnInit(): void {
    this.createColumns();
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
          onClick: this.onBtnClick1.bind(this),
          label: 'Click oo'
        }
      },
    ]

    const finalColumn = [...columns, ...FILE_INFO_COLUMS]
    this.columnDefs = finalColumn;
  }

  onBtnClick1(fileEvent: any) {
    if (fileEvent.event == "Send") {
      this.sendfile([fileEvent.rowData]);
    }
    if (fileEvent.event == "Modify") {
      this.modifyfile([fileEvent.rowData]);
    }



    //  this.rowDataClicked1 = e.rowData;
  }

  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;


    this.getAllFiles();
  }


  saveFormValue(formcontent: any) {
    this.formcontent = formcontent
  }



  getAllFiles() {
    this.api.getCreatedFileDetails().subscribe((res: any) => {
      this.rowData = res.data;
      setTimeout(() => {
        this.gridColumnApi.autoSizeAllColumns();
        this.onPageSizeChanged();
      })
    })

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
    return keys.slice(2);
  }


  modifyfile(data: any) {
    const modalRef = this.ngbModal.open(CreateFileComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });

    const formValue = {
      file_title: data[0].file_title,
      document_type: data[0].document_type,
      subject_area: data[0].subject_area,
      priority: data[0].priority,
      file_station: data[0].file_station,
      comments: data[0].docket,
      d_department: data[0].docket,
      d_year: data[0].docket,
      d_fileType: data[0].docket
    }


    modalRef.componentInstance.formValue = formValue;
    modalRef.componentInstance.openedViaModal = true;
    modalRef.componentInstance.openedViaModalData = data[0];

    //   @Input() actionType='Create';
    // @Input() formValue=null;

    modalRef.componentInstance.createdFileStatus.subscribe((createdFileStatus: any) => {
      if (createdFileStatus && createdFileStatus.status) {
        this.getAllFiles();
      }
    })

  }

  sendfile(rowdata: any = null) {

    const selectedData = rowdata ? rowdata : this.gridApi.getSelectedRows();
    if (selectedData.length) {
      const unsentData = selectedData.filter((res: any) => !res.sent_to);
      if (unsentData.length) {
        const modalRef = this.ngbModal.open(CommonActionTemplateComponent, {
          size: "xl",
          keyboard: false,
          backdrop: true
        });

        modalRef.componentInstance.fileToSend = unsentData;

        modalRef.componentInstance.sentFileStatus.subscribe((sentFileStatus: any) => {
          if (sentFileStatus && sentFileStatus.status) {
            this.getAllFiles();
          }
        })


      } else {
        this.warnToast('Selected Files are already Sent/Operational');
      }



    } else {
      this.warnToast('Please select a File');
    }


  }


  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }


  private warnToast(message: any) {
    this.toast.info(message, 'File Info', {
      timeOut: 3000,
    });
  }



  fileStatus(message: any) {
    if (message && message.status) {
      this.createdFileData = message.data[0];
      this.route(3);

    }
  }

  route(index: any, direct = false) {
    if (direct) {
      if (this.stepperIndex == 3 && (index == 1 || index == 2)) {
        this.stepperIndex = 1;
        return;
      }

      if (index < this.stepperIndex)
        this.stepperIndex = index;
    } else {
      this.stepperIndex = index;
    }
  }


  viewCreatedFileTab() {
    this.stepperIndex=1;
    this.active = 2;
  }

}
