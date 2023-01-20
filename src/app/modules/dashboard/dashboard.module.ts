import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { TopSellingComponent } from './components/top-selling/top-selling.component';
import { TopCardsComponent } from './components/top-cards/top-cards.component';
import { BlogCardsComponent } from './components/blog-cards/blog-cards.component';
import { SharedUtilityModule } from '../shared/modules/shared-util.module';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { CreateFileComponent } from './components/create-file/create-file.component';
import { ReceiveFileComponent } from './components/receive-file/receive-file.component';
import { AgGridModule } from '@ag-grid-community/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SideBarComponent,
    DashboardPageComponent,
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    BlogCardsComponent,
    FileInfoComponent,
    CreateFileComponent,
    ReceiveFileComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule ,
    SharedUtilityModule,
    AgGridModule.withComponents([FileInfoComponent]),
     ]
})
export class DashboardModule { }
