import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountModel} from '../account.model';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-accounts-edit',
  templateUrl: './accounts-edit.component.html',
  styleUrls: ['./accounts-edit.component.css']
})
export class AccountsEditComponent implements OnInit {
  editMode = false;

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newAccount = new AccountModel(0, value.name, value.size, value.industry, value.website);
    this.accountService.addAccount(newAccount);
    this.editMode = false;
    f.reset();
  }

  onCreate() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }
}
