
//===============================================================================
// © 2021 ThinkAI Apps.  All rights reserved.
// Original Author: Atul Badgujar
// Original Date: 26 Feb 2021
//==============================================================================


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from '../Common/Components/delete-alert/delete-alert.component';

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [DeleteAlertComponent],
    exports: [DeleteAlertComponent
    ],
    providers: [],
})
export class SharedComponentModule {
}
