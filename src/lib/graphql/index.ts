
export interface SortOptions<F> {
    oderBy? : F,
    sortOrder?: SortOrder,
    pageSize? : number,
    page? : number,
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}