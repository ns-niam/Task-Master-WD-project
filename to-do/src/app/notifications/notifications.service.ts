import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notification } from '../models';
import { TeamService } from '../create-team/create-team.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://127.0.0.1:8000/api';

    constructor(
        private http: HttpClient,
        private teamService: TeamService
    ) { }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/notifications/`)
            .pipe(
                catchError(this.teamService.handleError)
            );
    }

    createNotification(notificationData: Notification): Observable<Notification> {
        return this.http.post<Notification>(`${this.apiUrl}/notifications/`, notificationData)
            .pipe(
                catchError(this.teamService.handleError)
            );
    }

    updateNotification(id: number, notificationData: Notification): Observable<Notification> {
        return this.http.put<Notification>(`${this.apiUrl}/notifications/${id}/`, notificationData)
            .pipe(
                catchError(this.teamService.handleError)
            );
    }

    deleteNotification(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/notifications/${id}/`)
            .pipe(
                catchError(this.teamService.handleError)
            );
    }

    getNotification(id: number): Observable<Notification> {
        return this.http.get<Notification>(`${this.apiUrl}/notifications/${id}/`)
            .pipe(
                catchError(this.teamService.handleError)
            );
    }

    getNotificationsByUserId(id: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/notifications/users/${id}/`)
            .pipe(
                catchError(this.teamService.handleError)
            )
    }
}
