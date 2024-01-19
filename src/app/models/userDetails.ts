export interface userDetails {
    uuid: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: string,
    follows: number,
    followers: number,
    postsCount: number,
    bio: string,
    loggedUser: boolean,
    followedByLoggedUser: boolean,
}

export interface userResponse {
    content: userDetails[],
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