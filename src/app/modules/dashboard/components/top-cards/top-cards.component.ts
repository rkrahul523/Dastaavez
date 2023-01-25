import { Component, OnInit } from '@angular/core';
import { topcard, topcards } from './top-cards-data';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[];

  constructor(private api: ApiService) {

    this.topcards = topcards;
  }

  ngOnInit(): void {

    this.getDashboardData();

  }


  getDashboardData() {
    this.api.getDashboardData().subscribe((res: any) => {


      if (res && res?.data?.file_info) {
        const fileInfo = res?.data?.file_info;
        let sumAllFiles = 0;
        let topcard = this.topcards;
        fileInfo.forEach((element: any) => {

          switch (element.file_status) {
            case 'Operational':
              topcard[0].title = element.count;
              sumAllFiles += parseInt(element.count)
              break
            case 'Sent':
              topcard[1].title = element.count;
              sumAllFiles += parseInt(element.count)
              break;

            default:
              sumAllFiles += parseInt(element.count)
              break;
          }
        });
        topcard[3].title = sumAllFiles.toString();
        this.topcards = topcard;


      }


    })
  }

}
