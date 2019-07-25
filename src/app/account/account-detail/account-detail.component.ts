import {Component, Input, OnInit} from '@angular/core';
import {AccountModel} from '../../accounts/account.model';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  @Input() accountDetail: AccountModel;

  constructor() { }

  ngOnInit() {

  }

}
