import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER_USERS = "http://mnicosia.tech:4202/Users";
  private REST_API_SERVER_MESSAGES = "http://mnicosia.tech:4202/Messages";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequestUsers(){
    return this.httpClient.get(this.REST_API_SERVER_USERS);
  }
  public sendGetRequestMessages(){
    return this.httpClient.get(this.REST_API_SERVER_MESSAGES);
  }
}
