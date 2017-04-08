// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in root of repo.
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
  This file defines a settings view. It is based on
  the settings sample, created by the Modern Assistance Experience Developer
  Docs team. Along with other samples, it is in the Office-Add-in-UX-Design-Patterns-Code
  repo:  https://github.com/OfficeDev/Office-Add-in-UX-Design-Patterns-Code
*/
var core_1 = require('@angular/core');
// The SettingsStorageService provides CRUD operations on application settings.
var settings_storage_service_1 = require('../services/settings-storage/settings.storage.service');
var authentication_service_1 = require('../services/authentication/authentication.service');
var athena_api_service_1 = require('../services/athena-api/athena.api.service');
var SettingsComponent = (function () {
    function SettingsComponent(settingsStorage, authentication) {
        this.settingsStorage = settingsStorage;
        this.authentication = authentication;
    }
    SettingsComponent.prototype.ngAfterViewInit = function () {
        var currentInstructionSetting = this.settingsStorage.fetch("AthenaExcelAddinShowInstructions");
        // Ensure that when the settings view loads, the radio button selection matches
        // the user's current setting.
        if (currentInstructionSetting === "OnlyFirstTime") {
            this.alwaysRadioButton.nativeElement.removeAttribute("checked");
            this.onlyFirstTimeRadioButton.nativeElement.setAttribute("checked", "checked");
        }
    };
    SettingsComponent.prototype.onRadioButtonSelected = function (specificSetting, value) {
        this.settingsStorage.store(specificSetting, value);
    };
    SettingsComponent.prototype.onUsernameTextEntered = function (message) {
        this.authentication.storeUser(message);
    };
    SettingsComponent.prototype.onPasswordTextEntered = function (message) {
        this.authentication.storePassword(message);
    };
    SettingsComponent.prototype.onLogin = function (message) {
        this.authentication.trylogin();
        this.bearer.nativeElement.innerHTML = "Loggedin";
    };
    __decorate([
        core_1.ViewChild('always'), 
        __metadata('design:type', core_1.ElementRef)
    ], SettingsComponent.prototype, "alwaysRadioButton", void 0);
    __decorate([
        core_1.ViewChild('onlyFirstTime'), 
        __metadata('design:type', core_1.ElementRef)
    ], SettingsComponent.prototype, "onlyFirstTimeRadioButton", void 0);
    __decorate([
        core_1.ViewChild('bearer'), 
        __metadata('design:type', core_1.ElementRef)
    ], SettingsComponent.prototype, "bearer", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings-component',
            templateUrl: 'app/settings/settings.component.html?version=1.0',
            styleUrls: ['app/settings/settings.component.css'],
            providers: [authentication_service_1.AuthenticationService, athena_api_service_1.AthenaApiService]
        }), 
        __metadata('design:paramtypes', [settings_storage_service_1.SettingsStorageService, authentication_service_1.AuthenticationService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map