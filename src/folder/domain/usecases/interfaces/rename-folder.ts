export interface RenameFolderUseCase {
  execute(id: number, name: string): Promise<boolean>;
}
