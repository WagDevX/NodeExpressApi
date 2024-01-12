export interface CreateFileUseCase {
    execute(id, number, name: string) : Promise<boolean>
}