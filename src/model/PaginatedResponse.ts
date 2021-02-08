export class PaginatedResponse<T> {
  data: T[];
  moreAvailable: boolean;

  constructor(d: T[], more: boolean) {
    this.data = d;
    this.moreAvailable = more;
  }
}

export interface PaginationInfo {
  moreAvailable: boolean;
  pageNumber: number;
}

export const initialPaginationInfo: PaginationInfo = {
  moreAvailable: true,
  pageNumber: 0,
};

export interface PaginationData<T> {
  data: T[];
  pagination: PaginationInfo;
}
