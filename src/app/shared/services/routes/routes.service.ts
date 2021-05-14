import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@app/env';
import {RouteDTO} from '../../../core/models/route';
import {ApiResponse} from '../../../core/models/api-response';

@Injectable({
    providedIn: 'root'
})
export class RoutesService {
    protected readonly baseApiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllRoutes(): Observable<ApiResponse<RouteDTO[]>> {
        return this.http.get<ApiResponse<RouteDTO[]>>(this.baseApiUrl);
    }

    getRouteByUUID(uuid: string): Observable<ApiResponse<RouteDTO>> {
        return this.http.get<ApiResponse<RouteDTO>>(`${this.baseApiUrl}/${uuid}`);
    }

    createRoute(route: RouteDTO): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(this.baseApiUrl, route);
    }

    updateRoute(route: Partial<RouteDTO>, uuid: string): Observable<ApiResponse<string>>  {
        return this.http.put<ApiResponse<string>>(`${this.baseApiUrl}/${uuid}`, route);
    }

    deleteRoute(uuid: any): Observable<ApiResponse<string>> {
        return this.http.delete<ApiResponse<string>>(`${this.baseApiUrl}/${uuid}`);
    }

    getRouteForIp(ip: any, mostSpecific?: boolean): Observable<ApiResponse<{ via: RouteDTO, routed: boolean}>>{
        let params: HttpParams;
        if (typeof(mostSpecific) === 'boolean') {
            params = params.set('most-specific', `${mostSpecific}`);
        }
        return this.http.get<ApiResponse<{ via: RouteDTO, routed: boolean}>>(`${this.baseApiUrl}`, {
            params
        });
    }
}
