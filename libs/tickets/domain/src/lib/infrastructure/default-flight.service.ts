import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Flight } from '../entities/flight';
import { FlightService } from './flight.service';
import { ConfigService } from '@flight-demo/shared/util-config';


@Injectable()
export class DefaultFlightService implements FlightService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private flightCountSubject = new BehaviorSubject<number>(0);
  flightCount$: Observable<number> = this.flightCountSubject.asObservable();
  private flights = new BehaviorSubject<Flight[]>([]);
  flights$: Observable<Flight[]> = this.flights.asObservable();

  find(from: string, to: string): Observable<Flight[]> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { from, to };

    return this.http.get<Flight[]>(url, { headers, params }).pipe(
      tap(flights => this.flightCountSubject.next(flights.length)),
      tap(flights => this.flights.next(flights))
    );
  }

  findById(id: string): Observable<Flight> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { id };

    return this.http.get<Flight>(url, { headers, params });
  }
}
