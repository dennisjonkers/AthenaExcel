import { Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Request, RequestMethod, Headers} from '@angular/http';

import { SettingsStorageService } from '../settings-storage/settings.storage.service';

import {Observable} from "RxJS/Rx";

@Injectable()
export class AthenaApiService {

    constructor(private settingsStorage: SettingsStorageService, private http: Http) {
        console.log('Api Service created.', http);

    }

    //serviceBase: string = 'https://start.athena-online.nl/api/';
    serviceBase: string = 'http://localhost/Athena.JSAuthentication.API/';
    data: any;

    describe(objectName: string): Observable<any> {

        let headers = new Headers({ 'Authorization': this.settingsStorage.fetch('authorizationData') });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers });

        console.log(this.serviceBase + 'api/' + objectName + '/Definition');

        return this.http.get(this.serviceBase + 'api/' + objectName + '/Definition', requestOptions);
    }

    list(objectName: string): Observable<any> {

        let headers = new Headers({ 'Authorization': this.settingsStorage.fetch('authorizationData') });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers });

        console.log(this.serviceBase + 'api/' + objectName + '/List');

        return this.http.get(this.serviceBase + 'api/' + objectName + '/List', requestOptions);
    }
}