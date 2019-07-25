import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountsService} from '../../accounts/accounts.service';
import {AccountModel} from '../../accounts/account.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactId: number;
  account: AccountModel;
  totalPages: number;
  currentPage: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountsService: AccountsService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.contactId = +params.contactid;
        }
      );
    this.account = this.accountsService.getAccount(this.accountsService.currentAccountId);
  }

  onBack() {
    this.router.navigate(['/accounts', this.accountsService.currentAccountId, 'contact']);
  }

  onPageRefreshed(pageData: { totalPages: number; currentPage: number }) {
    this.totalPages = pageData.totalPages;
    this.currentPage = pageData.currentPage;
  }
}
