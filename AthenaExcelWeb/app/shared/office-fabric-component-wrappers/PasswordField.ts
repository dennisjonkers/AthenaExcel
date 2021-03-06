// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

"use strict";

// Modification to default file: Remove the wrapping namespace when you use the 
// file in an Angular 2 application. It is not needed and namespaces don't play 
// well with modules in Angular 2.

//namespace fabric {

module PasswordConsts {
    export enum Type {
        Placeholder,
        Underlined
    }
}


/**
 * Password Field Plugin
 *
 * Adds basic demonstration functionality to .ms-TextField components.
 */
export class PasswordField {

    private _container: HTMLElement;
    public _textField: HTMLInputElement;
    private _textFieldLabel: HTMLElement;
    private _type: PasswordConsts.Type[];

    /**
     *
     * @param {HTMLDivElement} container - the target container for an instance of TextField
     * @constructor
     */
    constructor(container: HTMLElement) {
        this._container = container;
        this._type = [];
        this._textField = <HTMLInputElement>this._container.querySelector(".ms-TextField-field");
        this._textFieldLabel = <HTMLElement>this._container.querySelector(".ms-Label");
        this._setTextFieldType();
        this._addListeners();
    }

    /** Populate _type with various kinds of text fields */
    private _setTextFieldType(): void {
        if (this._container.classList.contains("ms-TextField--placeholder")) {
            this._type.push(PasswordConsts.Type.Placeholder);
        }
        if (this._container.classList.contains("ms-TextField--underlined")) {
            this._type.push(PasswordConsts.Type.Underlined);
        }
    }

    /** Add event listeners according to the type(s) of text field */
    private _addListeners(): void {

        /** Placeholder - hide/unhide the placeholder  */
        if (this._type.indexOf(PasswordConsts.Type.Placeholder) >= 0) {
            this._textField.addEventListener("focus", (event: MouseEvent) => {
                this._textFieldLabel.style.display = "none";
            });
            // Modify default Fabric code to ensure that the text box gets focus when the 
            // the placeholder text itself is clicked.
            this._textFieldLabel.addEventListener("click", (event: MouseEvent) => {
                this._textField.focus();
            });
            this._textField.addEventListener("blur", (event: MouseEvent) => {
                // Show only if no value in the text field
                if (this._textField.value.length === 0) {
                    this._textFieldLabel.style.display = "block";
                }
            });
        }
        /** Underlined - adding/removing a focus class  */
        if (this._type.indexOf(PasswordConsts.Type.Underlined) >= 0) {
            this._textField.addEventListener("focus", (event: MouseEvent) => {
                this._container.classList.add("is-active");
            });
            this._textField.addEventListener("blur", (event: MouseEvent) => {
                this._container.classList.remove("is-active");
            });
        }
    }
}
//}
