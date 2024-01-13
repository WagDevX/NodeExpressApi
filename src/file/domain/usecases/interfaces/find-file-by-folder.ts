export interface FindFileByFolderUseCase {
    execute(id: number) : Promise<boolean>
}