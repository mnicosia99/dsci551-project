import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coc } from '../Coc';
import { Shelter } from '../Shelter';
import { Shelters } from '../Shelters';
import { CocSummaries } from '../CocSummaries';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  shelters: Shelter[] = [];
  cocs: Coc[] = [];
  loadingShelters: boolean = true;
  loadingCocs: boolean = true;
  a: TreeNode[] = [];
  expanded: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetRequestShelters().subscribe((shelters: Shelters) => {
      this.shelters = shelters.shelters;
      if (shelters != null) {
        shelters.shelters.forEach(shelter => {
          this.a.push({
            expanded: false,
            data: {
              shelter_name: shelter.shelter_name,
              address: shelter.address,
              phone_number: shelter.phone_number,
              county: shelter.county
            },
            children: [{
              data: { description: shelter.description}
            }]
          });
        });
      }
      this.loadingShelters = false;
    });
    this.dataService.sendGetRequestCocSummaries().subscribe((cocSummaries: CocSummaries) => {
      this.cocs = cocSummaries.coc_summaries;
      this.cocs.forEach(coc => {
        console.log(coc)
        let result = "";
        coc.counties.forEach(county => {
          result += county + ", ";
        });
        const lastIndex = result.lastIndexOf(", ");
        const replaced = result.substring(0, lastIndex);
        coc.county_list = replaced;
      });
      this.loadingCocs = false;
    });
  }
}