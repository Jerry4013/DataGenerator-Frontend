import {AccountModel} from './account.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CommonreturntypeModel} from '../shared/commonreturntype.model';

export class AccountsService {
  private accounts: AccountModel[] = [];
  accountsChanged = new Subject<AccountModel[]>();
  public currentAccountId: number;

  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.accounts.slice();
  }

  refreshAccounts(): AccountModel[] {
    this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/account/getAccounts',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
        if (responseData.status === 'success') {
          return responseData.data;
        }
      }))
      .subscribe(data => {
        this.accounts = (data as AccountModel[]);
        this.accountsChanged.next(this.accounts.slice());
      });
    return this.accounts.slice();
  }

  addAccount(account: AccountModel) {
    this.http
      .post<CommonreturntypeModel>(
        'http://localhost:8090/account/create',
        account,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
          if (responseData.status === 'success') {
            return responseData.data;
          }
      }))
      .subscribe( res => {
        this.accounts.push(res as AccountModel);
        this.accountsChanged.next(this.accounts.slice());
    });
  }

  getAccount(id: number) {
    const account = this.accounts.find(
      (s) => {
        return s.accountId === id;
      }
    );
    return account;
  }
}
