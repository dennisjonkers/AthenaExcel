// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
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
/*
  This file defines a component that enables a import functionality for
  the Word document.
*/
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// The SettingsStorageService provides CRUD operations on application settings..
var settings_storage_service_1 = require('../services/settings-storage/settings.storage.service');
var excel_spreadsheet_service_1 = require('../services/excel-spreadsheet/excel.spreadsheet.service');
var athena_api_service_1 = require('../services/athena-api/athena.api.service');
var SupplierItemComponent = (function () {
    function SupplierItemComponent(settingsStorage, spreadSheet, router) {
        this.settingsStorage = settingsStorage;
        this.spreadSheet = spreadSheet;
        this.router = router;
    }
    SupplierItemComponent.prototype.get = function (subject) {
        this.spreadSheet.addApiData(subject);
    };
    SupplierItemComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/import/supplieritem.component.html',
            styleUrls: ['app/import/supplieritem.component.css'],
            providers: [athena_api_service_1.AthenaApiService, excel_spreadsheet_service_1.ExcelSpreadsheetService]
        }), 
        __metadata('design:paramtypes', [settings_storage_service_1.SettingsStorageService, excel_spreadsheet_service_1.ExcelSpreadsheetService, router_1.Router])
    ], SupplierItemComponent);
    return SupplierItemComponent;
}());
exports.SupplierItemComponent = SupplierItemComponent;
//# sourceMappingURL=supplieritem.component.js.map