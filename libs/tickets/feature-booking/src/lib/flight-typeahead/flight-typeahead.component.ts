import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { EMPTY, Observable, catchError, debounceTime, delay, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-flight-typeahead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.scss',
})
export class FlightTypeaheadComponent {
  private flightService = inject(FlightService);

  protected control = new FormControl('', { nonNullable: true });
  protected flights$ = this.initFlightStream();
  protected loading = false;

  private initFlightStream(): Observable<Flight[]> {
    /**
     * Stream 1: Input User Interactions - City name
     *  - Trigger
     *  - Data/State Provider
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      // Side-Effect: Callstate
      tap(() => this.loading = true),
      /**
       * Stream 2: HTTP Backend API Call - Array of Flights
       *  - Data/State Provider
       */
      switchMap(city => this.load(city).pipe(
        catchError(() => of([]))
      )),
      // Side-Effect: Callstate
      tap(() => this.loading = false),
      // Transformation
      map(flights => [{
        id: 999,
        from: 'London',
        to: 'Oslo',
        date: new Date().toISOString(),
        delayed: true
      }].concat(flights))
    );
  }

  private load(city: string): Observable<Flight[]> {
    return this.flightService.find(city, '');
  }
}
