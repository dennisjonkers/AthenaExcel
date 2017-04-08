// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in root of repo.

/*
  This file defines the routes of the application. 
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierItemComponent } from './import/supplieritem.component';
import { InstructionStepsComponent } from './instructions/instruction-steps.component';
import { SettingsComponent } from './settings/settings.component'; 

function fetchInstructionSetting() : string {
    return window.localStorage.getItem("AthenaExcelAddinShowInstructions");
}

function setRoutesArray(): any {
  let routesArray: any = [
      { path: 'instruction-steps', component: InstructionStepsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'supplieritem', component: SupplierItemComponent }
  ];

  let defaultRoute: any = { path: '', redirectTo: '/instruction-steps', pathMatch: 'full'};

  // If a user has set the application to skip the instruction view,
  // then set the default route to the search and replace view.
  if(fetchInstructionSetting() === "OnlyFirstTime") {
       defaultRoute = { path: '', redirectTo: '/supplieritem', pathMatch: 'full'}
  }
  routesArray.unshift(defaultRoute);
  return routesArray;
}

const routes: Routes = setRoutesArray();

@NgModule({
  imports: [ RouterModule.forRoot(routes,
                                  // Use hash location strategy in an Office Add-in
                                  {useHash: true}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {} 