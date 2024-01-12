export interface File {
    id?: number,
    fileName : string,
    downloadUrl: string, 
    owner: number,
    extension: string,
    size: number,
    parentFolder?: number
}