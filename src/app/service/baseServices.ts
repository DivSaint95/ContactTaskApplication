//===============================================================================
// © 2021 ThinkAI Apps.  All rights reserved.
// Original Author: Atul Badgujar
// Original Date: 26 Feb 2021
//==============================================================================


import { Observable } from "rxjs";
import { HttpHeaders, HttpClient, } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { HandleError } from "./http-error-handler.service";


export abstract class BaseService {

    protected handleError: HandleError | any;

    constructor(private http: HttpClient) {
    }

    protected get<T>(url: string, httpOptions: any, actionMethodName: string): Observable<any> {

        httpOptions = this.setRequestOptions(httpOptions);
        url = this.appendTimeInUrl(url);

        return this.http.get<T>(url, httpOptions)
            .pipe(
                catchError(this.handleError(actionMethodName, []))
            );
    }

    protected getList<T>(url: string, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        url = this.appendTimeInUrl(url);

        return this.http.get<Array<T>>(url, httpOptions).pipe(
            catchError(this.handleError(actionMethodName, []))
        );
    }

    protected async getAsync<T>(url: string, httpOptions: any, actionMethodName: string) {
        httpOptions = this.setRequestOptions(httpOptions);
        url = this.appendTimeInUrl(url);

        return await this.http.get<T>(url, httpOptions).toPromise();
    }

    /**
     * Executes the post request with given uri parameters and header values.
     * @param url: The reqeust URI. 
     * @param data: The reqeust object. 
     * @param args: The request argument. 
     */
    protected post<T>(url: string, data: T, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        url = this.appendTimeInUrl(url);
        return this.http.post<T>(url, data, httpOptions);//.pipe(
    }

    /**
     * Executes the put request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param data: The reqesut object.
     * @param args: The reqesut argument.
     */
    protected put<T>(url: string, data: any, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        url = this.appendTimeInUrl(url);

        return this.http.put<T>(url, data, httpOptions).pipe(
            catchError(this.handleError(actionMethodName, []))
        );
    }

    /**
    * Executes the put request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param data: The reqesut object.
     * @param args: The reqesut argument.
     */
    protected delete(url: string, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);

        url = this.appendTimeInUrl(url);

        return this.http.delete(url, httpOptions).pipe(
            catchError(this.handleError(actionMethodName, []))
        );
    }

    private setRequestOptions(httpOptions: any): any {
        if (httpOptions == null) {
            httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
        }
        return httpOptions;
    }

    private appendTimeInUrl(url: string): string {
        return url;
    }


}