import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PagingService} from '../shared/paging.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  totalPages: number;
  currentPage: number;

  constructor(private route: ActivatedRoute,
              private pageServices: PagingService) { }

  ngOnInit() {
    // this.route.url
    //   .subscribe(
    //     () => {
    //       console.log('Hi' + this.pageServices.currentNumberOfPages);
    //       this.pageServices.pageChanged.next(this.pageServices.currentNumberOfPages);
    //     }
    //   );
  }

  onPageRefreshed(pageData: { totalPages: number; currentPage: number }) {
    this.totalPages = pageData.totalPages;
    this.currentPage = pageData.currentPage;
  }
}
