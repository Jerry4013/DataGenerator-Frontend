import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {InteractionService} from '../shared/interaction.service';
import {AccountsService} from '../accounts/accounts.service';
import {InteractionvoModel} from '../shared/interactionvo.model';
import {InteractionPageModel} from '../shared/interactionPage.model';
import {PagingService} from '../shared/paging.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit, OnDestroy {
  interactionSub: Subscription;
  totalPages: number;
  totalElements: number;
  currentPage = 1;
  pageSelected: Subscription;
  @Output() pageRefreshed = new EventEmitter<{totalPages: number, currentPage: number}>();

  interactions: InteractionvoModel[] = [];

  constructor(private interactionService: InteractionService,
              private accountsService: AccountsService,
              private pagingService: PagingService) { }

  ngOnInit() {
    // First time come to this component
    this.interactionService.getInteractionsByAccountId(this.accountsService.currentAccountId, this.currentPage)
      .subscribe(data => {
        this.copyDataAndEmit(data as InteractionPageModel);
      });

    // When select a page
    this.pageSelected = this.pagingService.pageSelected.subscribe(page => {
      this.currentPage = page;
      this.interactionService.getInteractionsByAccountId(this.accountsService.currentAccountId, page)
        .subscribe(data => {
          this.copyDataAndEmit(data as InteractionPageModel);
        });
    });

    this.interactionSub = this.interactionService.interactionsChanged
      .subscribe(() => {
        this.interactionService.getInteractionsByAccountId(this.accountsService.currentAccountId, this.currentPage)
          .subscribe(data => {
            this.copyDataAndEmit(data as InteractionPageModel);
          });
      });
  }

  copyDataAndEmit(data: InteractionPageModel) {
    this.totalPages = data.totalPages;
    this.totalElements = data.totalElements;
    this.currentPage = data.currentPage;
    this.interactions = data.interactionVOS;
    this.pageRefreshed.emit({totalPages: this.totalPages, currentPage: this.currentPage});
  }

  ngOnDestroy(): void {
    this.interactionSub.unsubscribe();
    this.pageSelected.unsubscribe();
  }

}
