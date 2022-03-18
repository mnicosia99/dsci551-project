import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocSummaries } from './CocSummaries';
import { Coc } from './Coc';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cocs: Coc[] = [];

  private REST_API_SERVER_COCS = "https://llxt3t7f38.execute-api.us-west-1.amazonaws.com/dev/cocs";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequestCocSummaries() {
    return this.httpClient.get<CocSummaries>(this.REST_API_SERVER_COCS);
  }
}
