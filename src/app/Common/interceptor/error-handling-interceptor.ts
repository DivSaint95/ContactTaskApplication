import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ResponseModel } from 'src/app/Model/response/response-model';
import { ErrorResponseModel } from 'src/app/Model/response/Error-response-model';



@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor() { }
  respons: ResponseModel = new ResponseModel();
  errorResponse: ErrorResponseModel = new ErrorResponseModel();
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //  return next.handle(request);

    const token: any = localStorage.getItem('token');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request).pipe(retry(1),

      catchError((error: HttpErrorResponse) => {

        this.respons = error.error;
        this.errorResponse = error.error;


        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {

          // client-side error
          // if(error.error =  'Unauthorized'){
          //   let errorMessage = 'Please Enter Valid UserName & Password.';
          // } else {
          //   let errorMessage = '';
          // }

          errorMessage = `Error: ${error.error.error.MessageList}`;

        } else {
          // server-side error

          // errorMessage = `Please Enter Valid UserName & Password.`;
          // client-side error

          if (error.error.status === 401) {
            errorMessage = `Please Enter Valid UserName & Password.`;
          } else {
            errorMessage = `We Are Unable To Process Your Request Please Try Again Later \nView Error Details Below: \nError Code: ${this.respons.status}\nMessage: ${this.respons.message}`;
          }
        }

        window.alert(errorMessage);

        return throwError(errorMessage);

      })

    )

  }

}

