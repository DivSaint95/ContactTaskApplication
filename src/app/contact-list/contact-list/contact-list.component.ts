import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContactService } from 'src/app/Common/service/ContactService';
import { ToastNotificationService } from 'src/app/Common/service/toastnotification.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {


  public getcontactlistData: any[] = [];

  // Para for filter
  filteredData: any[] = [];
  filterText: string | any = '';

  // pata for pagination
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  pageSizes: number[] = [10, 25, 50];

  // para for add/update/delete
  public openAddModel: boolean = false;
  public openEditModel: boolean = false;
  public openDeleteModel: boolean = false;
  public EditId: number | any;

  constructor(private contactService: ContactService,private toastNotificationService: ToastNotificationService) {

  }

  ngOnInit(): void {
    // Simulate fetching data
    this.getListdata()
    this.filteredData = [...this.getcontactlistData];
    this.totalItems = this.filteredData.length;
  }

  // method to get list data

  public getListdata() {
    this.contactService.getContactList().subscribe(res => {
      this.getcontactlistData = res;
      console.log(' this.getcontactlistData', this.getcontactlistData)
    })
  }

  get paginatedItems() {
    const filtered = this.filteredItems();
    this.totalItems = filtered.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return filtered.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
  }


  onFilterChange(): void {
    this.filteredData = this.getcontactlistData.filter((item: any) =>
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.totalItems = this.filteredData.length;
    this.page = 1;
  }
  onPageSizeChange() {
    this.page = 1; // Reset to first page when page size changes
  }


  filteredItems() {
    if (!this.filterText) {
      return this.getcontactlistData;
    }

    return this.getcontactlistData.filter(item => {
      return Object.keys(item).some(key => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(this.filterText.toLowerCase());
      });
    });
  }

  openAddModal() {
    this.openAddModel = true;
  }

  closeAddModal(event: any) {
    this.openAddModel = false;
    this.getListdata()
    this.paginatedItems;
  }

  openEditModal(id: any) {
    this.EditId = id
    this.openEditModel = true;
  }

  closeEditModal(event: any) {
    this.openEditModel = false;
    this.getListdata()
    this.paginatedItems;
  }

  public onDeleteData(id:any){
    this.contactService.deleteContactData(id).subscribe(res => {
      this.getListdata()
      this.paginatedItems;
      this.toastNotificationService.success('Data deleted sucessfully')
    })
  }
}
