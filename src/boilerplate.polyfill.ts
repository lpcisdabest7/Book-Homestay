import 'source-map-support/register';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-redundant-type-constituents
  export type Todo = any & { _todoBrand: undefined };
  export interface IPagination {
    page: number;
    limit: number;
    skip: number;
    orderBy: string;
    orderType: string;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
}
