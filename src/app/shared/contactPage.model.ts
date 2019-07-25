import {ContactModel} from './contact.model';

export class ContactPageModel {
  constructor(public totalPages: number,
              public totalElements: number,
              public currentPage: number,
              public numberOfElements: number,
              public contactModels: ContactModel[]) {}
}
