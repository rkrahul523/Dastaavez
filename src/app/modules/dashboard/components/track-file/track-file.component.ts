import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';
import { ITrackFile } from '../../model/track-file';

@Component({
  selector: 'app-track-file',
  templateUrl: './track-file.component.html',
  styleUrls: ['./track-file.component.scss']
})
export class TrackFileComponent implements OnInit {


  ftsID = ''


  trackingData: ITrackFile[] = []

  trackingData1 = [{
    status: "CREATED",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rk',
    comments: 'e',
    remarks: '',
    order: 1,
    action_department: ''
  },
  {
    status: "SENT",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'sk',
    comments: 'e',
    remarks: '',
    order: 2,
    action_department: 'EE'
  },
  {
    status: "RECEIVE",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rhhk',
    comments: 'e',
    remarks: '',
    order: 3,
    action_department: 'EE'
  },
  {
    status: "RECEIVE",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rhhk',
    comments: 'e',
    remarks: '',
    order: 3,
    action_department: 'EE'
  },
  {
    status: "RECEIVE",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rhhk',
    comments: 'e',
    remarks: '',
    order: 3,
    action_department: 'EE'
  },
  {
    status: "RECEIVE",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rhhk',
    comments: 'e',
    remarks: '',
    order: 3,
    action_department: 'EE'
  },
  {
    status: "RECEIVE",
    updatedon: '25/01/2023 15:24',
    updatedby: '1',
    name: 'rhhk',
    comments: 'e',
    remarks: '',
    order: 3,
    action_department: 'EE'
  },



  ]

  loaderFlag: boolean;

  constructor(private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.loaderFlag = true;
    this.trackingData=[];
    this.api.trackFile(this.ftsID).subscribe((res: any) => {
      this.loaderFlag = false;
      if (res && res.status) {
        this.trackingData = res.data[0].data;
      } else {
        this.toastr.info(res.message, 'File Info', {
          timeOut: 3000,
        });
      }



    })


  }





}
