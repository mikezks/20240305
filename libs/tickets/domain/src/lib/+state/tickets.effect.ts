import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FlightService } from "../infrastructure/flight.service";
import { ticketActions } from "./tickets.action";
import { map, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketEffects {
  private actions = inject(Actions);
  private flightService = inject(FlightService);

  loadFlights = createEffect(
    /**
     * Stream 1: Redux Action w/ Payload - from, to
     *  - Trigger
     *  - Data/State Provider
     */
    () => this.actions.pipe(
      // Filtering
      ofType(
        ticketActions.flightsLoad,
        ticketActions.flightsFilterChanged,
        ticketActions.flightsSearchTriggered
      ),
      /**
       * Stream 2: HTTP Backend API Call - Array of Flights
       *  - Data/State Provider
       */
      switchMap(action => this.flightService.find(
        action.from,
        action.to
      )),
      // Transformation: Data/State -> Action
      map(flights => ticketActions.flightsLoaded({ flights}))
    )
  );
}
