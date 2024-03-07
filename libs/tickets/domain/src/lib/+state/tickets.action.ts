import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Flight } from '../entities/flight';

export const ticketActions = createActionGroup({
  source: 'tickets',
  events: {
    'flights filter changed': props<{ from: string, to: string }>(),
    'flights search triggered': props<{ from: string, to: string }>(),
    'flights load': props<{ from: string, to: string }>(),
    'flights loaded': props<{ flights: Flight[] }>(),
    'flight upate': props<{ flight: Flight }>(),
    'flights clear': emptyProps(),
  }
});
