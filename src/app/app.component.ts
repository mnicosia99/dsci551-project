import { Component } from '@angular/core';
import { AnnouncementComponent } from './announcements/announcements.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService]
})
export class AppComponent {
  title = 'sample-project';

  constructor(public dialogService: DialogService) { }

  show() {
    const ref = this.dialogService.open(AnnouncementComponent, {
        header: 'Announcements',
        width: '90%',
        height: '80%',
        dismissableMask: true
    });
  }
}
