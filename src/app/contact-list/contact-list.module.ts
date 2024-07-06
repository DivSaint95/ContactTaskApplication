import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactListRoutingModule } from './contact-list-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactListAddComponent } from './contact-list-add/contact-list-add.component';
import { ContactListUpdateComponent } from './contact-list-update/contact-list-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentModule } from '../Shared/shared-component.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    ContactListComponent,
    ContactListAddComponent,
    ContactListUpdateComponent
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    ContactListRoutingModule,
    RouterModule,
    NgbModule,
    SharedComponentModule,
    ToastrModule.forRoot(),
    
    
  ]
})
export class ContactListModule { }
