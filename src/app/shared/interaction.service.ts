import {InteractionModel} from './interaction.model';
import {CommonreturntypeModel} from './commonreturntype.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IaparamsModel} from './iaparams.model';

export class InteractionService {
  interactionsChanged = new Subject<InteractionModel[]>();

  constructor(private http: HttpClient) {}

  addInteraction(interactionModel: InteractionModel) {
    this.http
      .post<CommonreturntypeModel>(
        'http://localhost:8090/interaction/create',
        interactionModel,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }))
      .subscribe( res => {
        this.interactionsChanged.next();
      });
  }

  getIaTypes(comm?: string) {
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/iamapping/getiatypes',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: new HttpParams().set('comm', comm)
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }));
  }

  getCommMediums(iaType?: string) {
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/iamapping/getcommmediums',
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'}),
          params: new HttpParams().set('iatype', iaType)
        }
      ).pipe(map(responseData => {
        if (responseData.status === 'success') {
          return responseData.data;
        }
      }));
  }

  getInteractionsByContactId(contactId: number, page: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('contactId', String(contactId));
    myParams = myParams.append('page', String(page));
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/interaction/getbycontactid',
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

  getInteractionsByAccountId(accountId: number, page: number) {
    let myParams = new HttpParams();
    myParams = myParams.append('accountId', String(accountId));
    myParams = myParams.append('page', String(page));
    return this.http
      .get<CommonreturntypeModel>(
        'http://localhost:8090/interaction/getbyaccountid',
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

  addRandomInteractionsWithContact(params: IaparamsModel) {
    this.http
      .post<CommonreturntypeModel>(
        'http://localhost:8090/interaction/randombycontact',
        params,
        {
          headers: new HttpHeaders({ 'withCredentials': 'true'})
        }
      ).pipe(map(responseData => {
      if (responseData.status === 'success') {
        return responseData.data;
      }
    }))
      .subscribe( res => {
        this.interactionsChanged.next();
      });
  }
}
