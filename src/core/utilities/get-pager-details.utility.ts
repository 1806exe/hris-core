import { Pager } from '../interfaces/pager.interface';

export function getPagerDetails(queryParams: any): Pager {
  return {
    page: queryParams ? queryParams.page || 1 : 1,
    pageSize: queryParams ? queryParams.pageSize || 50 : 50,
    pageCount: 0,
    total: 0,
    nextPage: '',
  };
}
