"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var settings_storage_service_1 = require('../settings-storage/settings.storage.service');
var AuthenticationService = (function () {
    function AuthenticationService(settingsStorage, http) {
        this.settingsStorage = settingsStorage;
        this.http = http;
        //  serviceBase: string = 'https://start.athena-online.nl/api/';
        this.serviceBase = 'http://localhost/Athena.JSAuthentication.API/';
    }
    AuthenticationService.prototype.storeUser = function (username) {
        this.settingsStorage.store("AthenaExcelUser", username);
    };
    AuthenticationService.prototype.storePassword = function (password) {
        this.settingsStorage.store("AthenaExcelPwd", password);
    };
    AuthenticationService.prototype.fetchuser = function () {
        return this.settingsStorage.fetch("AthenaExcelUser");
    };
    AuthenticationService.prototype.fetchpassword = function () {
        return this.settingsStorage.fetch("AthenaExcelPwd");
    };
    AuthenticationService.prototype.trylogin = function () {
        var _this = this;
        var dataliteral = "grant_type=password&DB=1&Username=" + this.fetchuser() + "&Password=" + this.fetchpassword();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        console.log(dataliteral);
        this.http.post(this.serviceBase + 'token', dataliteral, requestOptions)
            .subscribe(function (data) { return _this.saveResponse(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Authentication Complete'); });
    };
    AuthenticationService.prototype.saveResponse = function (response) {
        if (response) {
            console.log(response.access_token);
            this.settingsStorage.store("authorizationData", 'Bearer ' + response.access_token);
        }
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [settings_storage_service_1.SettingsStorageService, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map