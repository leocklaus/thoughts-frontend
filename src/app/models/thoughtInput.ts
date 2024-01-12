export interface thoughtInput {
    content: string,
    type: "ORIGINAL" | "REPLY"
    originalThoughtUuid?: string
}