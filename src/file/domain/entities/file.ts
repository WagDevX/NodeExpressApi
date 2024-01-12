export interface File {
    id?: number,
    fileName : string,
    downloadUrl: string, 
    owner: number,
    parentFolder?: number
}