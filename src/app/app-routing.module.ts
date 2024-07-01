import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'contact', 
    pathMatch: 'full' 
  }, 
  { 
    path: 'contact', 
    loadChildren: () =>  
import('./contact-list/contact-list.module').then(m => m.ContactListModule) 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
