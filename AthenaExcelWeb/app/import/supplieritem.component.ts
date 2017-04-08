// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/*
  This file defines a component that enables a import functionality for
  the Word document. 
*/

import { Component, }  from '@angular/core';
import { Router } from '@angular/router';

import { FabricTextFieldWrapperComponent } from '../shared/office-fabric-component-wrappers/fabric.textfield.wrapper.component';
import { ButtonComponent } from '../shared/button/button.component';
import { NavigationHeaderComponent} from '../shared/navigation-header/navigation.header.component';
import { BrandFooterComponent} from '../shared/brand-footer/brand.footer.component';


// The SettingsStorageService provides CRUD operations on application settings..
import { SettingsStorageService } from '../services/settings-storage/settings.storage.service';
import { ExcelSpreadsheetService } from '../services/excel-spreadsheet/excel.spreadsheet.service';
import { AthenaApiService } from '../services/athena-api/athena.api.service';

@Component({
    templateUrl: 'app/import/supplieritem.component.html',
    styleUrls: ['app/import/supplieritem.component.css'],
    providers: [AthenaApiService, ExcelSpreadsheetService]
})
export class SupplierItemComponent {

  

    constructor(private settingsStorage: SettingsStorageService,
        private spreadSheet: ExcelSpreadsheetService,
        private router: Router) { }


    get(subject: string): void {
        this.spreadSheet.addApiData(subject);
    }
}
