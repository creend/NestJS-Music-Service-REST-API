export enum SortTypes {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface FindQuery {
  perPage?: number;
  page?: number;
  title?: string;
  sort?: SortTypes;
}
