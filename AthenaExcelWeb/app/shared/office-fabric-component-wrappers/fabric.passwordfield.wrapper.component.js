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
  The file defines an Angular 2 component to wrap the Fabric TextField component.
*/
var core_1 = require('@angular/core');
// Import the default Fabric implementation of TextField
var PasswordField_1 = require('./PasswordField');
var FabricPasswordFieldWrapperComponent = (function () {
    function FabricPasswordFieldWrapperComponent(element) {
        this.element = element;
        this.value = "";
        // Create an event to run when the user enters text in the text field.
        this.textEntered = new core_1.EventEmitter();
    }
    // After the textfield has fully rendered, create a Fabric TextField object for it.
    FabricPasswordFieldWrapperComponent.prototype.ngAfterViewInit = function () {
        var componentElement = this.element.nativeElement.children[0];
        this.field = new PasswordField_1.PasswordField(componentElement);
    };
    // When the user changes the text field's contents, pull the new value up from the 
    // Fabric component to the Angular 2 component, and tell the parent view about
    // the event.
    FabricPasswordFieldWrapperComponent.prototype.onValueChanged = function () {
        this.value = this.field._textField.value;
        this.textEntered.emit(this.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FabricPasswordFieldWrapperComponent.prototype, "innerlabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FabricPasswordFieldWrapperComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FabricPasswordFieldWrapperComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FabricPasswordFieldWrapperComponent.prototype, "textEntered", void 0);
    FabricPasswordFieldWrapperComponent = __decorate([
        core_1.Component({
            selector: 'of-passwordfield',
            templateUrl: 'app/shared/office-fabric-component-wrappers/fabric.passwordfield.wrapper.component.html',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FabricPasswordFieldWrapperComponent);
    return FabricPasswordFieldWrapperComponent;
}());
exports.FabricPasswordFieldWrapperComponent = FabricPasswordFieldWrapperComponent;
//# sourceMappingURL=fabric.passwordfield.wrapper.component.js.map