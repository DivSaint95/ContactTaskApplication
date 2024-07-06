import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/Common/service/ContactService';
import { ToastNotificationService } from 'src/app/Common/service/toastnotification.service';

@Component({
  selector: 'app-contact-list-update',
  templateUrl: './contact-list-update.component.html',
  styleUrls: ['./contact-list-update.component.scss']
})
export class ContactListUpdateComponent {

  @Output() closeEditModal = new EventEmitter;
  @Input() EditID: number | any;

  // // para for form control
  public updateContactFrom: FormGroup | any;
  public isIdDisabled: boolean = true;
  public idEdit: any;

  public getContactData: any = {};

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,private toastNotificationService: ToastNotificationService,) {

  }

  ngOnInit(): void {
    this.idEdit = this.EditID
    console.log('data')
    this.isIdDisabled = true
    this.formControl();
    this.getContactDatabyID()
  }



  onClose() {
    this.closeEditModal.emit()
  }


  /**
   * funtion to
   * add from control and validation
   */
  formControl() {
    this.updateContactFrom = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  } // add validation end ..

  public getContactDatabyID() {
    this.contactService.getContactDetailById(this.idEdit).subscribe(res => {
      this.getContactData = res;
      this.setFormValue();
    })
  }

  setFormValue() {
    this.updateContactFrom.patchValue({
      id: this.getContactData.id,
      firstName: this.getContactData.firstName,
      lastName: this.getContactData.lastName,
      email: this.getContactData.email
    })
  }

  saveData() {
    if (this.updateContactFrom.invalid) {
      alert(`Please fill all the details`)
      return;
    }
    let formValue = this.updateContactFrom.value
    this.contactService.updateContactData(this.idEdit, formValue).subscribe(res => {
      this.toastNotificationService.success('Data updated sucessfully')
      this.onClose()
      
    })
  }

}
