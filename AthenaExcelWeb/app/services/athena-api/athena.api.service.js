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
var AthenaApiService = (function () {
    function AthenaApiService(settingsStorage, http) {
        this.settingsStorage = settingsStorage;
        this.http = http;
        //serviceBase: string = 'https://start.athena-online.nl/api/';
        this.serviceBase = 'http://localhost/Athena.JSAuthentication.API/';
        console.log('Api Service created.', http);
    }
    AthenaApiService.prototype.describe = function (objectName) {
        var headers = new http_1.Headers({ 'Authorization': this.settingsStorage.fetch('authorizationData') });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        console.log(this.serviceBase + 'api/' + objectName + '/Definition');
        return this.http.get(this.serviceBase + 'api/' + objectName + '/Definition', requestOptions);
    };
    AthenaApiService.prototype.list = function (objectName) {
        var headers = new http_1.Headers({ 'Authorization': this.settingsStorage.fetch('authorizationData') });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        var requestOptions = new http_1.RequestOptions({ headers: headers });
        console.log(this.serviceBase + 'api/' + objectName + '/List');
        return this.http.get(this.serviceBase + 'api/' + objectName + '/List', requestOptions);
    };
    AthenaApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [settings_storage_service_1.SettingsStorageService, http_1.Http])
    ], AthenaApiService);
    return AthenaApiService;
}());
exports.AthenaApiService = AthenaApiService;
//# sourceMappingURL=athena.api.service.js.map