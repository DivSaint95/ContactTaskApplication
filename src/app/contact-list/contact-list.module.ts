import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactListRoutingModule } from './contact-list-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactListAddComponent } from './contact-list-add/contact-list-add.component';
import { ContactListUpdateComponent } from './contact-list-update/contact-list-update.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactListComponent,
    ContactListAddComponent,
    ContactListUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContactListRoutingModule,
    
  ]
})
export class ContactListModule { }
