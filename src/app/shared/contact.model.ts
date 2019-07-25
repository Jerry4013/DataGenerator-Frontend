import {AccountModel} from '../accounts/account.model';

export class ContactModel {
  constructor(public contactId: number,
              public firstName: string,
              public lastName: string,
              public fullName: string,
              public title: string,
              public email: string,
              public sex: number,
              public maritalStatus: number,
              public department: string,
              public dateOfBirth: Date,
              public account: AccountModel) {}
}
