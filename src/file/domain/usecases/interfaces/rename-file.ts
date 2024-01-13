export interface RenameFileUseCase {
    execute(id: number, name: string) : Promise<boolean>
}