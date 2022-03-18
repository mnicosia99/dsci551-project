import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../User';
import { Message } from '../Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  users: User[] = [];
  messages: Message[] = [];
  loadingUsers: boolean = true;
  loadingMessages: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }
}