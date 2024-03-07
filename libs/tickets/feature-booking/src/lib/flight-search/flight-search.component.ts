import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { Flight, ticketActions } from '@flight-demo/tickets/domain';
import { Store } from '@ngrx/store';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { selectFilteredFlights } from './../../../../domain/src/lib/+state/tickets.selector';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  private store = inject(Store);

  from = 'London';
  to = 'New York';
  flights$ = this.store.select(selectFilteredFlights);
  selectedFlight: Flight | undefined;

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    // Reset properties
    this.selectedFlight = undefined;

    this.store.dispatch(
      ticketActions.flightsLoad({
        from: this.from,
        to: this.to
      })
    );
  }

  select(f: Flight): void {
    this.selectedFlight = { ...f };
  }
}
