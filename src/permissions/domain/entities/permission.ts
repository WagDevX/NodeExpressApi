export interface Permission {
  id: number;
  userId: number;
  folderId: number;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}
