import {Component, OnInit} from '@angular/core';
import {AccountModel} from '../accounts/account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AccountsService} from '../accounts/accounts.service';
import {ContactsService} from '../contacts/contacts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account: AccountModel;

  constructor(private route: ActivatedRoute,
              private accountsService: AccountsService,
              private router: Router,
              private contactService: ContactsService) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.account = data.account;
        }
      );
    this.accountsService.currentAccountId = this.account.accountId;
  }

  onBack() {
    this.router.navigate(['/accounts']);
  }

  onContacts() {
    this.contactService.refreshContacts(this.account.accountId);
  }
}
