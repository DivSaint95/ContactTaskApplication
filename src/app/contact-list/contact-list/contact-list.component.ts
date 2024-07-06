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
  filteredData: any[] = [];
  filterText: string = '';

  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  pageSizes: number[] = [10, 25, 50];

  public openAddModel: boolean = false;
  public openEditModel: boolean = false;
  public openDeleteModel: boolean = false;
  public EditId: number | null = null;
  public sortColumn: string = '';
  public sortDirection: string = 'asc';

  constructor(private contactService: ContactService, private toastNotificationService: ToastNotificationService) { }

  ngOnInit(): void {
    this.getListdata();
  }

  public getListdata() {
    this.contactService.getContactList().subscribe(res => {
      this.getcontactlistData = res;
      this.filteredData = [...this.getcontactlistData];
      this.totalItems = this.filteredData.length;
      this.sortAndPaginate();
    });
  }

  get paginatedItems() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredData.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.sortAndPaginate();
  }

  onFilterChange(): void {
    this.filteredData = this.getcontactlistData.filter(item => 
      Object.keys(item).some(key => 
        item[key] && item[key].toString().toLowerCase().includes(this.filterText.toLowerCase())
      )
    );
    this.totalItems = this.filteredData.length;
    this.page = 1;
    this.sortAndPaginate();
  }

  onPageSizeChange(): void {
    this.page = 1;
    this.sortAndPaginate();
  }

  openAddModal(): void {
    this.openAddModel = true;
  }

  closeAddModal(event: any): void {
    this.openAddModel = false;
    this.getListdata();
  }

  openEditModal(id: any): void {
    this.EditId = id;
    this.openEditModel = true;
  }

  closeEditModal(event: any): void {
    this.openEditModel = false;
    this.getListdata();
  }

  onDeleteData(id: any): void {
    this.contactService.deleteContactData(id).subscribe(res => {
      this.getListdata();
      this.toastNotificationService.success('Data deleted successfully');
    });
  }

  
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;
    this.sortAndPaginate();
  }

  private sortAndPaginate(): void {
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        if (aValue < bValue) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    this.totalItems = this.filteredData.length;
  }}
