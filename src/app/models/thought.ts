export interface thought {
    uuid: string,
    content: string,
    type: string,
    userUUID: string,
    username: string,
    firstname: string,
    lastname: string,
    createdAt: string,
    commentsCount: number,
    likesCount: number,
    likedByUser: boolean
}