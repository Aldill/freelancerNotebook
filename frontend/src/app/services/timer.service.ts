import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { EntryDTO } from '../models/EntryDTO';
import { EntriesService } from './entries.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  savedEntry: EntryDTO;
  timerSeconds: number;
  totalSeconds: number;
  timeLeft$: Observable<number>;

  toggleTimer$ = new BehaviorSubject<boolean>(true);

  constructor(private entryService: EntriesService) {
    this.timerSeconds = 0;
    this.totalSeconds = 0;
    this.savedEntry = {} as EntryDTO;
    this.timeLeft$ = interval(1000).pipe(
      switchMap((data) => this.toggleTimer$),
      filter((value) => value),
      map((data) => {
        this.timerSeconds = this.timerSeconds - 1;
        return this.timerSeconds;
      })
    );
  }

  saveEntry(): void {
    const newDate = new Date(this.savedEntry.startDate);
    this.savedEntry.endDate = new Date(
      newDate.setSeconds(
        newDate.getSeconds() + (this.totalSeconds - this.timerSeconds)
      )
    ).toISOString();
    this.entryService.saveEntry(this.savedEntry);
  }

  addEntry(entry: EntryDTO, seconds: number): void {
    this.timerSeconds = seconds;
    this.totalSeconds = seconds;
    this.savedEntry = entry;
  }

  startTimer(): void {
    this.toggleTimer$.next(true);
  }

  stopTimer(): void {
    this.toggleTimer$.next(false);
  }
}
