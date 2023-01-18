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
    BlogCardsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule ,
     ]
})
export class DashboardModule { }