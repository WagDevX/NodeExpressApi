export interface DeleteFolderUseCase {
  execute(id: number): Promise<boolean>;
}
