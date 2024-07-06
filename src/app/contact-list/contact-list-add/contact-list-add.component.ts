import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/Common/service/ContactService';
import { ToastNotificationService } from 'src/app/Common/service/toastnotification.service';

@Component({
  selector: 'app-contact-list-add',
  templateUrl: './contact-list-add.component.html',
  styleUrls: ['./contact-list-add.component.scss']
})
export class ContactListAddComponent {
  @Output() closeAddModal = new EventEmitter;

  // // para for form control
  public addContactFrom: FormGroup | any;
  public isIdDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,private toastNotificationService: ToastNotificationService) {

  }

  ngOnInit(): void {
    this.isIdDisabled = true
    console.log('data')
    this.formControl();
  }
  // function to close model
  onClose() {
    this.closeAddModal.emit()
  }


  /**
   * funtion to
   * add from control and validation
   */
  formControl() {
    this.addContactFrom = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  } // add validation end ..

  saveData() {
    if (this.addContactFrom.invalid) {
      alert(`Please fill all the details`)
      return;
    }
    let formValue = this.addContactFrom.value
    this.contactService.addContactData(formValue).subscribe(res => {
      this.onClose();
      this.toastNotificationService.success('Data added sucessfully')
    })
  }
}
