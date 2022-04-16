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
  expandedCoc: boolean = false;
  options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white'
        }
      }
    }
  };

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
        coc.demographic_data_gender = {
          labels: ["Female", "Male", "Non-Conforming", "Transgender"],
          datasets: [
            {
              data: [
                coc.homeless_breakdown.gender["female"], 
                coc.homeless_breakdown.gender["male"], 
                coc.homeless_breakdown.gender["gender_nonconforming"],
                coc.homeless_breakdown.gender["transgender"]],
              backgroundColor: ["#7FFFD4", "#FFE4C4", "#FF7F50", "#6495ED"],
              color: ["#000000", "#000000", "#000000", "#000000"]
            }
          ]
        }
        coc.demographic_data_race = {
          labels: ["African American", "Native American", "White", "Asian", "Multiple Races", "Pacific Islander"],
          datasets: [
            {
              data: [
                coc.homeless_breakdown.race["african_american"], 
                coc.homeless_breakdown.race["native_american"], 
                coc.homeless_breakdown.race["white"],
                coc.homeless_breakdown.race["asian"],
                coc.homeless_breakdown.race["multiple_races"],
                coc.homeless_breakdown.race["pacific_islander"]],
              backgroundColor: ["#7FFFD4", "#FFE4C4", "#FF7F50", "#6495ED", "#FF8C00","#B8860B"]
            }
          ]
        }
        
        coc.demographic_data_age = {
          labels: ["18-24", "Under 18", "Over 24"],
          datasets: [
            {
              data: [
                coc.homeless_breakdown.age["18_to_24"], 
                coc.homeless_breakdown.age["under_18"], 
                coc.homeless_breakdown.age["over_24"]],
              backgroundColor: ["#7FFFD4", "#FFE4C4", "#FF7F50"]
            }
          ]
        }

        coc.demographic_data_ethnicity = {
          labels: ["Hispanic/Latino", "Non-Hispanic/Latino"],
          datasets: [
            {
              data: [
                coc.homeless_breakdown.ethnicity["hispanic_latino"], 
                coc.homeless_breakdown.ethnicity["non_hispanic_latino"]],
              backgroundColor: ["#7FFFD4", "#FFE4C4"]
            }
          ]
        }

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