import paginate from '@/pagination.util';
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() audits;
  @Input() label: string;
  @Input() pageSize = 10;
  @Input() maxPages = 100;
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;
  @Output() onItemClick: EventEmitter<any> = new EventEmitter();

  private currentPage = 1;
  private pages: Array<number>;
  private startIndex: number;
  private endIndex: number;

  ngOnInit() {
    this.calculateIndexes();
  }

  calculateIndexes() {
    const pagination = paginate(
      this.audits.length,
      this.currentPage,
      this.pageSize,
      this.maxPages
    );
    this.currentPage = pagination.currentPage;
    this.pages = pagination.pages;
    this.startIndex = pagination.startIndex;
    this.endIndex = pagination.endIndex;
  }

  previous(e) {
    e.preventDefault();
    this.currentPage--;
    this.calculateIndexes();
  }

  next(e) {
    e.preventDefault();
    this.currentPage++;
    this.calculateIndexes();
  }

  setCurrent(e, page) {
    e.preventDefault();
    this.currentPage = page;
    this.calculateIndexes();
  }

  getLabel(i) {
    return this.audits[i][this.label];
  }

  onClick(item) {
    this.onItemClick.emit(item);
  }

}
