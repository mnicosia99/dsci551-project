import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocSummaries } from './CocSummaries';
import { Shelters } from './Shelters';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER_COCS = "https://llxt3t7f38.execute-api.us-west-1.amazonaws.com/dev/cocs";
  private REST_API_SERVER_SHELTERS = "https://llxt3t7f38.execute-api.us-west-1.amazonaws.com/dev/cocs/shelter";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequestCocSummaries() {
    return this.httpClient.get<CocSummaries>(this.REST_API_SERVER_COCS);
  }

  public sendGetRequestShelters() {
    return this.httpClient.get<Shelters>(this.REST_API_SERVER_SHELTERS);
  }
}
