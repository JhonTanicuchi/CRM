import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisoComponent } from './permiso/permiso.component';

import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'permiso',component: PermisoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
