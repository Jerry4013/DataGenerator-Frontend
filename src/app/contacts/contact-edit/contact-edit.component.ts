import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../contacts.service';
import {ContactModel} from '../../shared/contact.model';
import {AccountModel} from '../../accounts/account.model';
import {AccountsService} from '../../accounts/accounts.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  createMode = false;
  titles = ['', 'Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Sir', 'Dr', 'Lady'];
  maritalStatus = ['', 'Single', 'Married', 'Divorced',
    'Widow(er)', 'Separated', 'Remarried', 'Common-law', 'Significant', 'Other'];
  account: AccountModel;

  constructor(private contactService: ContactsService,
              private accountsService: AccountsService) { }

  ngOnInit() {
    this.account = this.accountsService.getAccount(+this.accountsService.currentAccountId);
  }

  onCreateMode() {
    this.createMode = true;
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newContact = new ContactModel(0, value.firstName, value.lastName, value.fullName, value.title,
    value.email, value.sex, value.maritalStatus, value.department, value.dateOfBirth, this.account);
    this.contactService.addContact(newContact);
    this.createMode = false;
    f.reset();
  }

  onCancel() {
    this.createMode = false;
  }
}
