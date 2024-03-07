import { createSelector } from "@ngrx/store";
import { ticketsFeature } from "./tickets.reducer";

export const selectFilteredFlights = createSelector(
  // Selectors
  ticketsFeature.selectFlights,
  ticketsFeature.selectHide,
  // Projector
  (flights, hide) => flights.filter(
    flight => !hide.includes(flight.id)
  )
);
