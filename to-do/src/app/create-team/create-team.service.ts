import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Team } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createTeam(teamData: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiUrl}/teams/`, teamData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTeam(id: number, teamData: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/teams/${id}/`, teamData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/teams/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/teams/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
