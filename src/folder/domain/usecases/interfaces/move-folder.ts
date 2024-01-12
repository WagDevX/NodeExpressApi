export interface MoveFolderUseCase {
  execute(id: number, parentFolder: number): Promise<boolean>;
}
