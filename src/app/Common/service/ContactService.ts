import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";
import { BaseService } from "./baseServices";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ContactModel } from "src/app/Model/ContactModel";


@Injectable({ providedIn: 'root' })
export class ContactService extends BaseService {

    constructor(http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
        super(http);
        this.handleError = httpErrorHandler.createHandleError('ContactService');
    }

    // method to GET contact list data
    public getContactList(): Observable<Array<ContactModel>> {
        const url: string = environment.ContactServiceURL + 'Contact';
        return this.get<Array<ContactModel>>(url, null, 'getContactList');
    }

    // method to GET contact data by ID
    public getContactDetailById(id: any): Observable<ContactModel> {
        const url: string = environment.ContactServiceURL + 'Contact' + '/' + id;
        return this.get<ContactModel>(url, null, 'getContactDetailById');
    }

    // method to ADD contact data
    public addContactData(contactModel: ContactModel): Observable<string> {
        let url: string = environment.ContactServiceURL + 'Contact'
        return this.post<ContactModel>(url, contactModel, null, "addContactData");
    }

    // method to UPDATE contact data 
    public updateContactData(id: any, contactModel: ContactModel): Observable<string> {
        let url: string = environment.ContactServiceURL + 'Contact/' + id;
        return this.put<ContactModel>(url, contactModel, null, "updateContactData");
    }

    // method to DELETE contact data
    public deleteContactData(id: Number): Observable<string> {
        let url: string = environment.ContactServiceURL + 'Contact' + '/' + id;
        return this.delete(url, id, "deleteContactData");
    }
}