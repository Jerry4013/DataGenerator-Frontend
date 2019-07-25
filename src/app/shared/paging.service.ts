import {Subject} from 'rxjs';

export class PagingService {
  pageChanged = new Subject<number>();
  pageSelected = new Subject<number>();
  totalElementsChanged = new Subject<number>();

  currentNumberOfPages: number;


}
