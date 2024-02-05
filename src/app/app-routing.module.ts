import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './modules/shared/full/full.component';
import { ROUTE_PATH } from './modules/shared/models/route-path';
import { AuthenticationGuard } from './modules/shared/services/authentication.guard';
import { TypeLayoutComponent } from './modules/typing/type-layout/type-layout.component';
import { TypingHeaderComponent } from './modules/typing/typing-header/typing-header.component';


const dastaavezroutes:  Routes = [{
  path: '',
  component: FullComponent,
  children: [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
      path: 'home',
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
  ]
}

  ]

  const typingRoutes:  Routes = [
    {
      path:'',
      component: TypingHeaderComponent
    },
    {
    path: 'typing',
    component: TypeLayoutComponent
  }]









const routes: Routes = [
  {
    path: ROUTE_PATH.LOGIN,  
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: ROUTE_PATH.HOME,
    component: FullComponent,
    canActivate: [AuthenticationGuard] ,
   
    children: [
      { path: '', redirectTo: ROUTE_PATH.DASHBOARD, pathMatch: 'full' },
      {
        path: ROUTE_PATH.DASHBOARD,
        canLoad:[AuthenticationGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: ROUTE_PATH.LOGIN,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(typingRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
