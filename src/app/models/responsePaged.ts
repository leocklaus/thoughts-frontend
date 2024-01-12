import { thought } from "./thought";

export interface responsePage {
    content: thought[],
    pageable: pageable,
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: sort,
    numberOfElements: number,
    first: boolean,
    empty: boolean

}

interface pageable {
    pageNumber: number,
        pageSize: number,
        sort: sort,
        offset: number,
        paged: boolean,
        unpaged: boolean
}

interface sort {
        sorted: boolean,
        empty: boolean,
        unsorted: boolean
}

export interface pagination {
    pageable: pageable,
    totalPages: number,
    totalElements: number,
    last: boolean,
    numberOfElements: number,
    first: boolean,
    empty: boolean
}