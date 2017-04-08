// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

/*
  This file defines an instructions component for a task pane page. It is based on
  the instruction-step sample, created by the Modern Assistance Experience Developer 
  Docs team. Along with other samples, it is in the Office-Add-in-UX-Design-Patterns-Code 
  repo:  https://github.com/OfficeDev/Office-Add-in-UX-Design-Patterns-Code
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../shared/button/button.component';
import { IInstructionStep } from './IInstructionStep';

@Component({
    templateUrl: 'app/instructions/instruction-steps.component.html',
    styleUrls: ['app/instructions/instruction-steps.component.css']  
})
export class InstructionStepsComponent { 

    private title: string = "WELCOME";
    private addin_description: string = "The Athena Online Excel plugin helps you to extract data, manipulate data and import data from your online environment.";
    private steps_intro: string = "Just take these steps:";
    private steps: Array<IInstructionStep> =
    [{ step_number: 1, content: "Select the data you wish to aquire from Athena-Online, with the aquire option." },
        { step_number: 2, content: "Add remove or update your data in the import grid in Excel." },
        { step_number: 3, content: "Import the data into Athena-Online." },
        { step_number: 4, content: "If everything oke you will get all green lights, if validation failed nothing will be changed." }];

    constructor(private router: Router) { }

}

