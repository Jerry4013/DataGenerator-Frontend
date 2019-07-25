import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ContactModel} from '../../shared/contact.model';
import {ContactsService} from '../contacts.service';
import {AccountModel} from '../../accounts/account.model';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../accounts/accounts.service';
import {ActivatedRoute} from '@angular/router';
import {PagingService} from '../../shared/paging.service';
import {InteractionPageModel} from '../../shared/interactionPage.model';
import {ContactPageModel} from '../../shared/contactPage.model';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: ContactModel[] = [];
  account: AccountModel;
  accountId: number;
  totalPages: number;
  totalElements: number;
  currentPage = 1;
  pageSelected: Subscription;
  contactsSub: Subscription;
  @Output() pageRefreshed = new EventEmitter<{totalPages: number, currentPage: number}>();

  constructor(private contactService: ContactsService,
              private accountsService: AccountsService,
              private route: ActivatedRoute,
              private pagingService: PagingService) { }

  ngOnInit() {
    this.account = this.accountsService.getAccount(+this.accountsService.currentAccountId);
    this.accountId = this.accountsService.currentAccountId;

    // First time come to this component
    this.contactService.getContacts(this.account.accountId, this.currentPage)
      .subscribe(data => {
        this.copyDataAndEmit(data as ContactPageModel);
      });

    // When select a page
    this.pageSelected = this.pagingService.pageSelected.subscribe(page => {
      this.currentPage = page;
      this.contactService.getContacts(this.accountId, page)
        .subscribe(data => {
          this.copyDataAndEmit(data as ContactPageModel);
        });
    });

    this.contactsSub = this.contactService.contactsChanged
      .subscribe(() => {
        this.contactService.getContacts(this.accountId, this.currentPage)
          .subscribe(data => {
            this.copyDataAndEmit(data as ContactPageModel);
          });
      });

    // this.contactSubscription = this.contactService.contactsChanged
    //   .subscribe(
    //     (contacts: ContactModel[]) => {
    //       this.contacts = contacts;
    //     }
    //   );
    //
    // this.route.url
    //   .subscribe(
    //     () => {
    //       this.contacts = this.contactService.getLocalContacts();
    //     }
    //   );
    //
    // this.pagingService.pageSelected.subscribe(page => {
    //   this.contactService.getContactPage(this.account.accountId, page);
    // });
  }

  copyDataAndEmit(data: ContactPageModel) {
    this.totalPages = data.totalPages;
    this.totalElements = data.totalElements;
    this.currentPage = data.currentPage;
    this.contacts = data.contactModels;
    this.pageRefreshed.emit({totalPages: this.totalPages, currentPage: this.currentPage});
  }

  ngOnDestroy(): void {
    this.contactsSub.unsubscribe();
    this.pageSelected.unsubscribe();
  }

}
