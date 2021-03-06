export interface IPaginationBaseState {
    itemsPerPage: number;
    sort: string;
    order: string;
    activePage: number;
}
export declare const getSortState: (location: any, itemsPerPage: any) => IPaginationBaseState;