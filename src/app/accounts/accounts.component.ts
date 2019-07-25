import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountsService} from './accounts.service';
import {AccountModel} from './account.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: AccountModel[] = this.accountService.refreshAccounts();
  accountSubscription: Subscription;

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
    this.accountSubscription = this.accountService.accountsChanged
      .subscribe(
        (accounts: AccountModel[]) => {
          this.accounts = accounts;
        }
      );
    this.accounts = this.accountService.getAccounts();
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

}
