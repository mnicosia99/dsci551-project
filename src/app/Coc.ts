import { Demographc } from "./Demographc";
import { HomelessBreakdown } from "./HomelessBreakdown";

export class Coc {
    coc!: string;
    coc_name!: string;
    state!: string;
    hud_grant_total!: number;
    counties!: string[];
    county_list!: string;
    total_homeless!: number;
    data_year!: number;
    homeless_breakdown!: HomelessBreakdown;
    demographic_data_age!: any;
    demographic_data_race!: any;
    demographic_data_ethnicity!: any;
    demographic_data_gender!: any;
  }