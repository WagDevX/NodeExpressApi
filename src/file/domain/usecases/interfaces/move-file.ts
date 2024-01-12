export interface MoveFileUseCase {
    execute(id: number, parentFolder: number) : Promise<boolean>
}