import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  transform(value: number | null, ...args: unknown[]): string {
    if (!value) {
      return `00:00:00`;
    }
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = (value % 3600) % 60;

    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}
