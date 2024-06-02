import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi, ColumnApi, ColDef, SideBarDef, GridOptions } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ActionRendererComponent } from 'src/app/modules/dashboard/components/action-renderer/action-renderer.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/modules/dashboard/services/api-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFileSection } from 'src/app/modules/dashboard/model/section';
import { RECEIVED_FILE_COLUMS } from 'src/app/modules/dashboard/utils/receive-file.const';
import { DAK_COLUMS } from '../../model/dak-colums';
import { DateRangeFilterDakComponent } from '../date-range-filter/date-range-filter.component';
import { ActionRendererDakComponent } from '../action-renderer/action-renderer.component';
import { IAction } from '../../model/action-type';
import { DakApiService } from '../../services/dak-api-service';
import { ModifyDakComponent } from '../modify-dak/modify-dak.component';
import { ViewDakComponent } from '../view-dak/view-dak.component';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';

@Component({
  selector: 'app-digital-dak',
  templateUrl: './digital-dak.component.html',
  styleUrls: ['./digital-dak.component.scss']
})
export class DigitalDakComponent implements OnInit {
  
  active = 1;
  ftsId: any

  modules = AllModules;
  components: any;

  gridApi: GridApi
  gridColumnApi: ColumnApi

  pageSize = 10;

  @ViewChild('receive-file-info') grid!: AgGridAngular;

  frameworkComponents = {
    actionControlRenderer: ActionRendererDakComponent,
    customDateRange: DateRangeFilterDakComponent
  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
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
    minWidth: 50,
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
    getRowHeight: () => 45,
    autoSizePadding:50
    
  }
  columnDefs: any = [];

  rowData = [
    {
      book: 1,
    centrakDak: 111,
    dak_title: "for mechanization of materials of industrial emgineering",
    dak_details:"for purpose of industrial engineering",
    sender:"anas a siddique",
    senderId:"1",
    receiver:"director",
    date:"24/04/2023",
    comments:"test",
    last_updated_date:"25//09/2024"
    }
  ]; //d

  constructor(private toastr: ToastrService,
    private api: DakApiService,
    private ngbModal: NgbModal,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.createColumns();
    this.getAllFiles();
  }


  getAllFiles(){
    this.api.getAllDak().subscribe((res: any) => {
      if (res && res.status) {
        this.rowData = res.data;
        setTimeout(() => {
          // this.gridColumnApi.autoSizeAllColumns();
          this.onPageSizeChanged();
        })

      } else {
        this.rowData = [];
      }

    })
  }




  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit(90)
   // this.onPageSizeChanged();
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
        hide:true,
        suppressSizeToFit: false,
        colId: 'check',
        field: "checkbox",
      },
      {
        headerName: 'File Action',
        colId: 'action',
        width: 200,
        pinned: true,
        filter: false,
        cellRenderer: 'actionControlRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          label: IFileSection.RECEIVE
        }
      },
    ]

    const finalColumn = [...columns, ...DAK_COLUMS]
    this.columnDefs = finalColumn;
  }


  onBtnClick(fileEvent: any) {
    if (fileEvent.event == IAction.VIEW) {
      this.viewFile([fileEvent.rowData]);
    }
    if (fileEvent.event ==IAction.MODIFY) {
      this.modifyfile([fileEvent.rowData]);
    }
    if (fileEvent.event == IAction.DELETE) {
      this.deleteFile(fileEvent.rowData);
    }
    //  this.rowDataClicked1 = e.rowData;
  }


  viewFile(data: any){

    const modalRef = this.ngbModal.open(ViewDakComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });
    modalRef.componentInstance.dakData = data[0];
    modalRef.componentInstance.createdDakStatus.subscribe((createdDakStatus: any) => {
      if (createdDakStatus && createdDakStatus.status) {
        this.getAllFiles();
      }
    })

  }

  modifyfile(data: any) {
    const modalRef = this.ngbModal.open(ModifyDakComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });
    const formValue = {
      book: data[0].book,
      centrakDak: data[0].centrakDak,
      dak_title: data[0].dak_title,
      dak_details: data[0].dak_details,
      senderId: data[0].senderId,
      receiver: data[0].receiver,
    }

    modalRef.componentInstance.isModify = true;
    modalRef.componentInstance.formValue = formValue;

    //   @Input() actionType='Create';
    // @Input() formValue=null;

    modalRef.componentInstance.createdDakStatus.subscribe((createdDakStatus: any) => {
      if (createdDakStatus && createdDakStatus.status) {
        this.getAllFiles();
      }
    })

  }


  deleteFile(fileData: any) {
    this.api.deleteDak(fileData.book).subscribe((res: any) => {
      if (res && res.status) {
        // const lastCommentData = res.data.lastComment;
        this.api.successToast(res.message, 'Deleted Dak');
        this.getAllFiles();
      } else {
        this.api.errorToast(res.message, 'Delete Dak Error')
      }
    })
  }


  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }

  addDak(){
    const modalRef = this.ngbModal.open(ModifyDakComponent, {
      size: "lg",
      keyboard: false,
      backdrop: true
    });

    modalRef.componentInstance.isModify = false;

    //   @Input() actionType='Create';
    // @Input() formValue=null;

    modalRef.componentInstance.createdDakStatus.subscribe((createdDakStatus: any) => {
      if (createdDakStatus && createdDakStatus.status) {
        this.getAllFiles();
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

    // console.log(this.generateColumnsForExcel())

    // return

    this.gridApi.exportDataAsExcel({
      fileName: 'Dak_data',
      sheetName: 'Digital Dak',
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
      .getAllColumns()
      .map(column => column.getColId())

    // const amountIndex: number = keys.findIndex(column => column === 'newPrice');
    // keys.splice(amountIndex + 1, 0, 'currency');
    return keys.slice(2);
  }


  logout(){
    this.authService.logout();
  }
}
