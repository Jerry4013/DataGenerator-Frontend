import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ContactsService} from './contacts.service';
import {AccountsService} from '../accounts/accounts.service';
import {ContactModel} from '../shared/contact.model';

@Injectable()
export class ContactResolverService implements Resolve<ContactModel> {

    constructor(private contactService: ContactsService,
                private accountsService: AccountsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactModel> | Promise<ContactModel> | ContactModel {
      this.contactService.refreshContacts(this.accountsService.currentAccountId);
      return this.contactService.getContact(+route.params.contactid);
    }

}
