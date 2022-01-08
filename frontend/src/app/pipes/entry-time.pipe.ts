import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entryTime',
})
export class EntryTimePipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): string {
    const [startDate, endDate] = value;
    const summary =
      new Date(endDate).getTime() / (1000 * 60) -
      new Date(startDate).getTime() / (1000 * 60);
    return `${summary.toFixed()} minutes`;
  }
}
