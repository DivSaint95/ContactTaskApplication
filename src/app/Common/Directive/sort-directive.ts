import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(items: any[], sortColumn: string, sortDirection: string): any[] {
    if (!items || !sortColumn || !sortDirection) {
      return items;
    }

    return items.sort((a, b) => {
      const aValue = a[sortColumn] ? a[sortColumn].toString().toLowerCase() : '';
      const bValue = b[sortColumn] ? b[sortColumn].toString().toLowerCase() : '';

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
