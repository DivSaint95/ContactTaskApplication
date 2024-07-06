
//===============================================================================
// © 2021 ThinkAI Apps.  All rights reserved.
// Original Author: Atul Badgujar
// Original Date: 26 Feb 2021
//==============================================================================


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../Common/Directive/sort-directive';

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [SortPipe],
    exports: [SortPipe
    ],
    providers: [],
})
export class SharedComponentModule {
}
