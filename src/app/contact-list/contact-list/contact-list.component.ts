import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContactService } from 'src/app/service/ContactService';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {


  public getcontactlistData: any[] = [];

  filteredData: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  filterText: string | any = '';

  constructor(public contactService: ContactService) {

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

  get paginatedData(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.page = page;
  }

  onFilterChange(): void {
    this.filteredData = this.getcontactlistData.filter((item:any) => 
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.totalItems = this.filteredData.length;
    this.page = 1;
  }

}
