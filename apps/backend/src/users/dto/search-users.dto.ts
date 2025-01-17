export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface QueryDto {
  limit: number;
  radius: number;
  startAfter?: string;
  orderBy?: string;
  orderDirection?: OrderDirection;
  name?: string;
  zip?: string;
}
