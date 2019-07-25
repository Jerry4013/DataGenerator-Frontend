import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AccountModel} from './account.model';
import {Observable} from 'rxjs';
import {AccountsService} from './accounts.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountResolverService implements Resolve<AccountModel> {

  constructor(private accountService: AccountsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountModel> | Promise<AccountModel> | AccountModel {
    this.accountService.refreshAccounts();
    return this.accountService.getAccount(+route.params.id);
  }
}
