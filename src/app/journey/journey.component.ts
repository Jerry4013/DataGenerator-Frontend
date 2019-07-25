import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  totalPages: number;
  currentPage: number;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {

  }

  onPageRefreshed(pageData: { totalPages: number; currentPage: number }) {
    this.totalPages = pageData.totalPages;
    this.currentPage = pageData.currentPage;
  }
}
