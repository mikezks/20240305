import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription, share, tap, timer } from 'rxjs';

@Component({
  selector: 'app-flight-typeahead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.scss',
})
export class FlightTypeaheadComponent implements OnDestroy {
  timer$ = timer(0, 2_000).pipe(
    tap(value => console.log('Producing ...', value)),
    // share()
  );
  subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.timer$.subscribe(console.log)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
