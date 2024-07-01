//===============================================================================
// © 2021 ThinkAI Apps.  All rights reserved.
// Original Author: Atul Badgujar
// Original Date: 26 Feb 2021
//==============================================================================


import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

//import { MessageService } from './message.service';
import { throwError } from 'rxjs';
//import { EwpError } from '../../core/exception/ewp-error';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
    <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable(
)
export class HttpErrorHandlerService {
    private messageService: any = null;
    constructor() { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
        return (error: HttpErrorResponse): Observable<T> => {

            console.error(error); // log to console instead

            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            console.error(`${serviceName}: ${operation} failed: ${message}`)


            this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);

            return of(result);
            // return  throwError('Something bad happened; please try again later.');        
        };
    }

    // private handleHttpError(httpError: any) {
    //     let errorMsg: string = '';
    //     const statusCode: number = httpError.status;

    //     // When error status is undefined
    //     if (statusCode === undefined) {
    //         return '';
    //     }
    //     switch (statusCode) {

    //         // Server Error
    //         case 500: {
    //          //   const ewpError: EwpError = <EwpError>JSON.parse(httpError._body);
    //             //errorMsg = this.ProcessServerError(ewpError, methodName, sendErrorEmail);
    //             break;
    //         }
    //         // Bad Reqeust
    //         case 404: {
    //             const msg: string = 'Bad server request url: ' + httpError.url;
    //             const error: Error = new Error(msg);
    //             this.log(error);
    //             break;
    //         }
    //         // Unauthorized
    //         case 401: {
    //             const msg: string = 'Unauthorized server request.';
    //             const error: Error = new Error(msg);
    //             this.log(error);
    //             break;
    //         }
    //         // When session is expired
    //         default: {
    //             // this.reportUnhandleError();
    //             // $('.sa-confirm-button-container').click(function () {
    //             //     window.location.reload(true);
    //             // });
    //         }
    //     }
    // }

    log(error: any) {
        // Log the error to the console
        console.error(error);


    }
}
