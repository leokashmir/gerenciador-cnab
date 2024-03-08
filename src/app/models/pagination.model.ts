export interface PaginationModel{

  content: [];
  pageable: Pageable;
  last: false;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable{
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
export interface Sort{
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}


