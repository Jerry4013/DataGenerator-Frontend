import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PagingService} from '../shared/paging.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges, OnDestroy {

  numbers: number[] = [];
  private pageSub: Subscription;
  @Input() public totalPages: number;
  @Input() currentPage: number;
  constructor(private pagingService: PagingService) { }

  ngOnInit() {
    this.pageSub = this.pagingService.pageChanged.subscribe(totalPage => {
      this.totalPages = totalPage;
      this.numbers = [];
      for (let i = 0; i < this.totalPages; i++) {
        this.numbers.push(i + 1);
      }
    });
  }

  ngOnDestroy(): void {
    this.pageSub.unsubscribe();
  }

  onPageSelected(page: number) {
    this.pagingService.pageSelected.next(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.numbers = [];
    for (let i = 0; i < this.totalPages; i++) {
      this.numbers.push(i + 1);
    }
  }

}
