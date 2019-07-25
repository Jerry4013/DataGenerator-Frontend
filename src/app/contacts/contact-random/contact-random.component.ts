import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountModel} from '../../accounts/account.model';
import {AccountsService} from '../../accounts/accounts.service';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'app-contact-random',
  templateUrl: './contact-random.component.html',
  styleUrls: ['./contact-random.component.css']
})
export class ContactRandomComponent implements OnInit {
  account: AccountModel;
  randomMode = false;

  constructor(private contactService: ContactsService,
              private accountsService: AccountsService) { }

  ngOnInit() {
    this.account = this.accountsService.getAccount(+this.accountsService.currentAccountId);
  }

  onRandomMode() {
    this.randomMode = true;
  }

  onsubmitRandom(fr: NgForm) {
    const value = fr.value;
    this.contactService.addRandomContacts(value.amount, this.account.accountId);
    this.randomMode = false;
  }

  onCancel() {
    this.randomMode = false;
  }
}
