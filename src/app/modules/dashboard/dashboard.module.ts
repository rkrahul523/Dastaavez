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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackFileComponent } from './components/track-file/track-file.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonActionTemplateComponent } from './components/common-action-template/common-action-template.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionRendererComponent } from './components/action-renderer/action-renderer.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';


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
    TrackFileComponent,
    CommonActionTemplateComponent,
    ActionRendererComponent,
    ManageRolesComponent,
    ManageUsersComponent,
    SearchFilterPipe
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    SharedUtilityModule,
    NgbModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModalModule,
    AgGridModule.withComponents([FileInfoComponent]),
     ]
})
export class DashboardModule { }
