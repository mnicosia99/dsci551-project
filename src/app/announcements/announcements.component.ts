import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Shelter} from '../Shelter';
import {Shelters} from '../Shelters';
import {DataService} from '../data.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

import { ColumnFilterFormElement } from 'primeng/table';

@Component({
    templateUrl: './announcements.component.html',
})
export class AnnouncementComponent {

    announcements: Shelter[] = [];
    loading: boolean = true;

    constructor(private dataService: DataService, public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig, private cd: ChangeDetectorRef) { 

    }

    ngOnInit() {
        this.dataService.sendGetRequestShelters().subscribe((shelters: Shelters) => {
            if (shelters != null) {
                shelters.shelters.forEach(shelter => {
                    if (shelter.volunteer != undefined || shelter.volunteer != undefined) {
                        this.announcements.push(shelter)
                    }
                });
            }
            this.loading = false;
        });
    }
}

