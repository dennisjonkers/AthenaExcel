import { Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Request, RequestMethod, Headers} from '@angular/http';

import { SettingsStorageService } from '../settings-storage/settings.storage.service';

@Injectable()
export class AuthenticationService {

    constructor(private settingsStorage: SettingsStorageService, private http: Http) {
    }

    //  serviceBase: string = 'https://start.athena-online.nl/api/';
    serviceBase: string = 'http://localhost/Athena.JSAuthentication.API/';

    storeUser(username: string) {
        this.settingsStorage.store("AthenaExcelUser", username);
    }

    storePassword(password: string) {
        this.settingsStorage.store("AthenaExcelPwd", password);
    }

    fetchuser(): string {
        return this.settingsStorage.fetch("AthenaExcelUser");
    }

    fetchpassword(): string {
        return this.settingsStorage.fetch("AthenaExcelPwd");
    }

    trylogin() {
        let dataliteral: string = "grant_type=password&DB=1&Username=" + this.fetchuser() + "&Password=" + this.fetchpassword();

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let requestOptions = new RequestOptions({ headers: headers });
        console.log(dataliteral);
        this.http.post(this.serviceBase + 'token', dataliteral, requestOptions)
            .subscribe(
            data => this.saveResponse(data.json()),
            err => console.log(err),
            () => console.log('Authentication Complete')
            );

    }

    saveResponse(response: any) {
        if (response) {
            console.log(response.access_token);

            this.settingsStorage.store("authorizationData", 'Bearer ' + response.access_token);
        }
    }
}