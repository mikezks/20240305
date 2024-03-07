import { createFeature, createReducer, on } from "@ngrx/store";
import { Flight } from "../entities/flight";
import { ticketActions } from "./tickets.action";

export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
  hide: number[];
}

export const initialTicketsState: TicketsState = {
  flights: [],
  basket: {},
  tickets: {},
  hide: [1246]
};


export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialTicketsState,

    on(ticketActions.flightsLoaded, (state, action) => ({
      ...state,
      flights: action.flights
    })),
  )
})
