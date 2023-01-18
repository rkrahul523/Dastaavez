import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardRoutingModule } from './dashboard.routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule  ]
})
export class DashboardModule { }
