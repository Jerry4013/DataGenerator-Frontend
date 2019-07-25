import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {InteractionModel} from '../../../shared/interaction.model';
import {InteractionService} from '../../../shared/interaction.service';
import {Subscription} from 'rxjs';
import {InteractionvoModel} from '../../../shared/interactionvo.model';
import {AccountsService} from '../../../accounts/accounts.service';
import {PagingService} from '../../../shared/paging.service';
import {InteractionPageModel} from '../../../shared/interactionPage.model';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent implements OnInit, OnDestroy {
  @Input() contactId: number;
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
    this.interactionService.getInteractionsByContactId(this.contactId, this.currentPage)
      .subscribe(data => {
        this.copyDataAndEmit(data as InteractionPageModel);
      });

    // When select a page
    this.pageSelected = this.pagingService.pageSelected.subscribe(page => {
      this.currentPage = page;
      this.interactionService.getInteractionsByContactId(this.contactId, page)
        .subscribe(data => {
          this.copyDataAndEmit(data as InteractionPageModel);
        });
    });

    this.interactionSub = this.interactionService.interactionsChanged
      .subscribe(() => {
        this.interactionService.getInteractionsByContactId(this.contactId, this.currentPage)
          .subscribe(data => {
            this.copyDataAndEmit(data as InteractionPageModel);
          });
      });
    // this.interactionService.getInteractionsByContactId(this.contactId)
    //   .subscribe(data => {
    //     this.interactions = (data as InteractionModel[]);
    //   });
    // this.interactionSub = this.interactionService.interactionsChanged
    //   .subscribe(() => {
    //     this.interactionService.getInteractionsByContactId(this.contactId)
    //       .subscribe(data => {
    //         this.interactions = (data as InteractionModel[]);
    //       });
    //   });
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
