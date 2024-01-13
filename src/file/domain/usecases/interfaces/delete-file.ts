export interface DeleteFileUseCase {
    execute(id: number) : Promise<boolean>;
}