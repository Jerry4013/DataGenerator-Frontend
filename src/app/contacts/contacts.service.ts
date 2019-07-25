import {CommonreturntypeModel} from '../shared/commonreturntype.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ContactModel} from '../shared/contact.model';
import {ContactPageModel} from '../shared/contactPage.model';
import {Injectable} from '@angular/core';
import {PagingService} from '../shared/paging.service';

@Injectable()
export class ContactsService {
  contactsChanged = new Subject<ContactModel[]>();
  public currentContactId: number;

  constructor(private http: HttpClient,
              private pagingService: PagingService) {}

  private contacts: ContactModel[] = [];

  getLocalContacts() {
    return this.contacts.slice();
  }

  getContact(id: number) {
    const contact = this.contacts.find(
      (s) => {
        return s.contactId === id;
      }
    );
    return contact;
  }

  addContact(contactModel: ContactModel) {
    this.http
      .post<CommonreturntypeModel>(
        'http://localhost:8090/contact/create',
        contactModel,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }))
      .subscribe( res => {
        this.contacts.push(res as ContactModel);
        this.contactsChanged.next(this.contacts.slice());
      });
  }

  refreshContacts(accountId: number): ContactModel[] {
    let myParams = new HttpParams();
    myParams = myParams.append('accountid', String(accountId));
    myParams = myParams.append('page', '1');
    this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/contact/getContacts',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }))
      .subscribe(data => {
        this.contacts = (data as ContactPageModel).contactModels;
        this.pagingService.currentNumberOfPages = (data as ContactPageModel).totalPages;
        this.pagingService.pageChanged.next((data as ContactPageModel).totalPages);
        this.contactsChanged.next(this.contacts.slice());
      });
    return this.contacts.slice();
  }

  getContacts(accountId: number, page: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('accountid', String(accountId));
    myParams = myParams.append('page', String(page));
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/contact/getContacts',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }));
  }

  getContactPage(accountId: number, page: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('accountid', String(accountId));
    myParams = myParams.append('page', String(page));
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/contact/getContacts',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: myParams
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    })).subscribe(data => {
        this.contacts = (data as ContactPageModel).contactModels;
        this.pagingService.currentNumberOfPages = (data as ContactPageModel).totalPages;
        this.pagingService.pageChanged.next((data as ContactPageModel).totalPages);
        this.contactsChanged.next(this.contacts.slice());
      });
  }

  addRandomContacts(amount: number, account: number) {
    let ranParams = new HttpParams();
    ranParams = ranParams.append('amount', String(amount));
    ranParams = ranParams.append('account', String(account));
    this.http
      .post<CommonreturntypeModel>(
        'http://localhost:8090/contact/createrandom',
        {},
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: ranParams
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }))
      .subscribe( res => {
        this.refreshContacts(account);
        this.contactsChanged.next(this.contacts.slice());
      });
  }

}
